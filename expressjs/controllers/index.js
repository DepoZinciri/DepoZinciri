const fs = require('fs');
const path = require('path');
const models = require('../models');
const mapInfoData = JSON.parse(fs.readFileSync(path.join(__dirname, '../Data/MapInfo.json'), 'utf8'));
const mysql = require('./mysql');
const { INTEGER } = require('sequelize');
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
exports.getConfirmedRequests = function (req, res, next) {
    mysql.query('SELECT * FROM Requests WHERE confirmed = true', function (results) {
        res.json({ requests: results });
    });
}
exports.getNotConfirmedRequests = function (req, res, next) {
    mysql.query('SELECT * FROM Requests WHERE confirmed = false', function (results) {
        res.json({ requests: results });
    });
}
exports.getRequestsByStatus = function (req, res, next) {
    const status = req.params.status;
    mysql.query(`SELECT * FROM Requests WHERE status = '${status}'`, function (results) {
        res.json({ requests: results });
    });
}
exports.getRequestsWithWarehouse = function (req, res, next) {
    const warehouseid = req.params.warehouseid;
    mysql.query(`SELECT * FROM Requests WHERE warehouseId = ${warehouseid}`, function (results) {
        res.json({ requests: results });
    });
}
exports.getWarehouse = function (req, res, next) {
    const id = req.params.id;
    mysql.query(`SELECT * FROM Warehouses WHERE id = ${id}`, function (results) {
        res.json({ warehouse: results });
    });
}
exports.getItemsInWarehouse = function (req, res, next) {
    const id = req.params.id;
    mysql.query(`SELECT * FROM Items WHERE warehouseId = ${id}`, function (results) {
        res.json({ items: results });
    });
}
exports.getOrdersInWarehouse = function (req, res, next) {
    const id = req.params.id;
    mysql.query(`SELECT * FROM Orders WHERE warehouseId = ${id}`, function (results) {
        res.json({ orders: results });
    });
}

const createItem = async function (itemType, itemDescription, quantity) {
    if (!itemType || !itemDescription || !quantity ) {
        return 0;
    }
    try {
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log("1 record inserted");
        const query = `INSERT INTO Items (itemType, itemDescription, quantity, createdAt, updatedAt) 
               VALUES ('${itemType}', '${itemDescription}', ${quantity}, '${now}', '${now}')`;
        const result = await mysql.postquery(query).then((result) => {
            return result;
        }).catch((err) => {
            console.error('Error inserting record:', err);
            return 0;
        });
        return result[0].insertId
    } catch (err) {
        console.error('Error inserting record:', err);
        return 0;
    }
}

// TO DO it doesn't work
exports.createRequest = async function (req, res, next) {
    const { name, surname, phone, address, emergencyStatus, requestType, amount , itemDescription } = req.body;
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!name || !surname || !phone || !address || !emergencyStatus || !requestType || !amount || !itemDescription) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const itemId = await createItem(requestType, itemDescription, amount);
    if (itemId === 0) {
        return res.status(500).json({ error: 'Error creating item' });
    }
    const query = `INSERT INTO Requests (transactionId,dataHash,name, surname, phone, address, emergencyStatus, itemDescription, confirmed, requestType, amount,status,createdAt,updatedAt, itemId,warehouseId) VALUES ("transactionId", '${123}' ,'${name}', '${surname}', '${phone}', '${address}', '${emergencyStatus}', '${itemDescription}', '${false}','${requestType}', ${amount}, "not Approved", '${now}','${now}', ${itemId}, '${1}')`;
    mysql.query(query, function (results) {
        res.json({ message: 'Request created' });
    });
}


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