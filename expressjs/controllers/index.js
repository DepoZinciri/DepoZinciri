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
exports.getRequests = function c(req, res, next) {
    mysql.query('SELECT * FROM Requests', function (results) {
        res.json({ requests: results });
    });
}
createItem = async function (item) {
    const { itemtype, desc, quantity, expirationDate } = item;
    if (!itemtype || !desc || !quantity || !expirationDate) {
        return 0;
    }
    try {
        console.log("itemType: ", itemtype, "desc: ", desc, "quantity: ", quantity, "expirationDate: ", expirationDate);
        const result = await mysql.query("INSERT INTO `Items` (type, `desc`, quantity) VALUES (?, ?, ?);", ["a", desc, parseInt(quantity)]);
        console.log("1 record inserted");
        return result.id; // Assuming id is auto-generated
    } catch (err) {
        console.error('Error inserting record:', err);
        return 0;
    }
}
// TO DO it doesn't work
exports.createRequest = function (req, res, next) {
    const { name, surname, phone, address, emergencyStatus, description, requestType, amount } = req.body;
    if (!name || !surname || !phone || !address || !emergencyStatus || !description || !requestType || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    createItem({ itemtype: requestType, desc: description, quantity: amount, expirationDate: new Date() }).then((itemId) => {
        if (itemId === 0) {
            return res.status(500).json({ error: 'Error creating item' });
        }
        mysql.query("INSERT INTO `requests` (transactionId , dataHash,name, surname, phone, address, emergencyStatus, desc, confirmed,requestType,status,warehouseId itemid) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,?)", [,null,null,name, surname, phone, address, emergencyStatus, description, false,1,"Not approved", 0, itemId], function(err, result){
            if(err) {
                console.error('Error inserting record:', err);
                return res.status(500).json({ error: 'Error creating request' });
            }
            return res.json({ request: result });
        });
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