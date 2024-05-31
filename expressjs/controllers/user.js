
let models = require('../models');
let bcrypt = require('bcryptjs');
const mysql = require('./mysql');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
//const { validateUser } = require('../validators/signup');
//const { isEmpty } = require('lodash');

const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}


const createUser = async function (user) {
    const { username, firstname, lastname,password,phone, email,warehouse,warehouseId } = user;
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!username || !firstname || !lastname || !phone || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const encPassword = generateHash(password)
    var query = '';
    if(warehouse == 'yes' && !warehouseId){
        query = `INSERT INTO Users (username, firstname, lastname,password,phone, email,createdAt,updatedAt,isWarehouser,warehouseId) VALUES ('${username}' ,'${firstname}', '${lastname}', '${encPassword}','${phone}', '${email}','${now}','${now}','${1}' ,'${warehouseId }')`;
    }else{
        query = `INSERT INTO Users (username, firstname, lastname,password,phone, email,createdAt,updatedAt,isWarehouser) VALUES ('${username}' ,'${firstname}', '${lastname}', '${encPassword}','${phone}', '${email}','${now}','${now}','${0}')`;
    }
    mysql.postquery(query, function (results) {
        res.json({ message: 'User created' });
    });
}


exports.signup = async function (req, res, next) {
    await createUser(req.body).then(result => {
        passport.authenticate('local', {
            successRedirect: '/',
            failuredRedirect: "/signup",
        })(req, res, next);
    })
}

exports.login = function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failuredRedirect: "/login",
    })(req, res, next);
}

exports.logout = function (req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return next(err);
            }
            res.redirect('/');
        });
      });

}

