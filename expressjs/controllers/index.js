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

exports.createItem = async function (req, res, next) {
    const { itemType, itemDescription, quantity } = req.body;
    if (!itemType || !itemDescription || !quantity) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(itemType)
        console.log(itemDescription)
        console.log(quantity)
        console.log(now)
        console.log(now)
        console.log("1 record inserted");
        const query = `INSERT INTO Items (itemType, itemDescription, quantity, createdAt, updatedAt) 
               VALUES ('${itemType}', '${itemDescription}', ${quantity}, '${now}', '${now}')`;
        const result = await mysql.query(query);
        console.log(result)
        return res.status(201).json({ id: result[0].insertId})
    } catch (err) {
        console.error('Error inserting record:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// TO DO it doesn't work
exports.createRequest = function (req, res, next) {
    const { name, surname, phone, address, emergencyStatus, description, requestType, amount } = req.body;
    if (!name || !surname || !phone || !address || !emergencyStatus || !description || !requestType || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    createItem({ itemtype: requestType, itemDescription: description, quantity: amount, expirationDate: new Date() }).then((itemId) => {
        if (itemId === 0) {
            return res.status(500).json({ error: 'Error creating item' });
        }
        mysql.query("INSERT INTO `requests` (transactionId , dataHash,name, surname, phone, address, emergencyStatus, itemDescription, confirmed,requestType,status,warehouseId itemid) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,?)", [,null,null,name, surname, phone, address, emergencyStatus, description, false,1,"Not approved", 0, itemId], function(err, result){
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