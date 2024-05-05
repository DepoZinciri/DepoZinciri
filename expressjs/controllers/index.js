const fs = require('fs');
const path = require('path');
const models = require('../models');
const mapInfoData = JSON.parse(fs.readFileSync(path.join(__dirname, '../Data/MapInfo.json'), 'utf8'));
const mysql = require('./mysql');

// (TODO:DepoZinciri): Written for to repleace auth function. 
exports.redirectByUserType = function(req, res, next) {
    var user = req.user;
    if (user) {
        if (user.type === 'warehouse') {
            // Redirect to warehouse page
            return res.json({ message: "Redirecting to warehouse page" });
        } else if (user.type === 'stk') {
            // Redirect to stk page
            return res.json({ message: "Redirecting to stk page" });
        } else {
            return res.json({ message: "Invalid user type" });
        }
    } else {
        return res.json({ message: "NOT_LOGGED_IN" });
    }
};


exports.auth = function (req, res, next) {
    var user = req.user
    if (user) {
        var username = user.firstname + " " + user.lastname;
        return res.json({ message: "LOGGED_IN", username: username });
    } else {
        return res.json({ message: "NOT_LOGGED_IN" });
    }
}

exports.getUser = function (req, res, next) {
    var user = req.user
    if (user) {
        return res.json({ user: user });
    }
}

// new database
exports.getRequests = function (req, res, next) {
    mysql.query('SELECT * FROM Requests', function (results) {
        res.json({ requests: results });
    });
}

// (TODO:DepoZinciri)
exports.createRequest = async function(req, res, next) {
    try {
        // Request Body
        const { name, surname, emergencyStatus, description, phone, address, requestType, amount } = req.body;
        console.log(req.body)
        // Create the request in the database
        const newRequest = await models.Request.create({
            name: name,
            surname: surname,
            phone: phone,
            address: address,
            emergencyStatus: emergencyStatus,
            desc: description,
            confirmed: false, // False by default
            requestType: requestType,
            amount: amount,
            status: 'nonConfirmed', // Set status to 'nonConfirmed' by default
        });

        // Respond with the newly created request
        return res.status(201).json({ message: 'Request created successfully', request: newRequest });
    } catch (error) {
        console.error('Error creating request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getConfirmedRequests = async function(req, res, next) {
    try {
        const confirmedRequests = await models.Request.findAll({
            where: { confirmed: true }
        });

        return res.json({ confirmedRequests });
    } catch (error) {
        console.error('Error retrieving confirmed requests:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getNotConfirmedRequests = async function(req, res, next) {
    try {
        const notConfirmedRequests = await models.Request.findAll({
            where: { confirmed: false }
        });

        return res.json({ notConfirmedRequests });
    } catch (error) {
        console.error('Error retrieving not confirmed requests:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Req must be the status which passed as a URL parameter
exports.getRequestsByStatus = async function(req, res, next) {
    try {
        const status = req.params.status; 
        const requests = await models.Request.findAll({
            where: { status: status } // Filter requests by the specified status
        });

        return res.json({ requests });
    } catch (error) {
        console.error('Error retrieving requests by status:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getRequestsWithWarehouse = async function(req, res, next) {
    try {
        const warehouseId = req.params.warehouseId; // Assuming the warehouse ID is passed as a URL parameter
        const warehouse = await models.Warehouse.findByPk(warehouseId);

        if (!warehouse) {
            return res.status(404).json({ error: 'Warehouse not found so no request listed' });
        }

        const requests = await models.Request.findAll({
            where: { warehouseId: warehouseId } // Filter requests by the warehouse ID
        });

        return res.json({ requests });
    } catch (error) {
        console.error('Error retrieving requests in warehouse:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getWarehouse = async function(req, res, next) {
    try {
        const warehouseId = req.params.id; // Assuming the ID is passed as a URL parameter
        const warehouse = await models.Warehouse.findByPk(warehouseId);

        if (!warehouse) {
            return res.status(404).json({ error: 'Warehouse not found' });
        }

        return res.json({ warehouse });
    } catch (error) {
        console.error('Error retrieving warehouse by ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getItemsInWarehouse = async function(req, res, next) {
    try {
        const warehouseId = req.params.warehouseId; // Assuming the warehouse ID is passed as a URL parameter
        const warehouse = await models.Warehouse.findByPk(warehouseId, {
            include: [{
                model: models.Item,
                through: { attributes: [] } // To exclude the join table attributes from the result
            }]
        });

        if (!warehouse) {
            return res.status(404).json({ error: 'Warehouse not found so no Items listed' });
        }

        const items = warehouse.Items;

        return res.json({ items });
    } catch (error) {
        console.error('Error retrieving items in warehouse:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getOrdersInWarehouse = async function(req, res, next) {
    try {
        const warehouseId = req.params.warehouseId; // Assuming the warehouse ID is passed as a URL parameter
        const warehouse = await models.Warehouse.findByPk(warehouseId);

        if (!warehouse) {
            return res.status(404).json({ error: 'Warehouse not found so no Orders listed' });
        }

        const orders = await models.Order.findAll({
            where: { WarehouseId: warehouseId } // Filter orders by the warehouse ID
        });

        return res.json({ orders });
    } catch (error) {
        console.error('Error retrieving orders in warehouse:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createDataHash = function (req, res, next) {
    return models.DataHash.create({
        hashValue: req.body.params.hashValue,
        operationId: req.body.params.operationId,
    }).then(() => {
        res.redirect('/');
    })
}

exports.getDataHash = function (req, res, next) {
    return models.DataHash.findOne({
        where: {
            operationId: req.params.id
        }
    }).then(datahash => {
        console.log(datahash);
        res.json({ datahash: datahash });
    })
}

exports.getMapInfo = function (req, res, next) {
    const city = req.params.city;
    const district = req.query.district;
    console.log(req.params)
    if (!city) {
        return res.status(400).json({ error: 'City parameter is missing' });
    }
    console.log(city);
    const cityInfo = mapInfoData[city];

    if (!cityInfo) {
        return res.status(404).json({ error: 'City not found' });
    }

    if (district) {
        res.json({ city: cityInfo ,});
    }else {
        res.json({ city: cityInfo });
    }
}