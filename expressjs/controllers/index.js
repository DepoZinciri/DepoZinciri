const fs = require('fs');
const path = require('path');
const models = require('../models');
const mapInfoData = JSON.parse(fs.readFileSync(path.join(__dirname, '../Data/MapInfo.json'), 'utf8'));

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