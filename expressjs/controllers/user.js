
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

// (TODO) Adjust sign up functionality...
const createUser = async function (user) {
    const { username, firstname, lastname, password, phone, email, warehouse, warehouseId } = user;
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    if (!username || !firstname || !lastname || !phone || !email || !password) {
        throw new Error('Missing required fields');
    }
    
    const encPassword = generateHash(password);

    // Check if username or email already exists
    const checkUserQuery = `SELECT * FROM Users WHERE username = '${username}' OR email = '${email}'`;
    const existingUsers = await mysql.postquery(checkUserQuery);

    if (existingUsers.length > 0) {
        if (existingUsers.some(user => user.username === username)) {
            throw new Error('Username is already taken');
        }
        if (existingUsers.some(user => user.email === email)) {
            throw new Error('Email is already taken');
        }
    }

    let query = '';
    if (warehouse === 'yes' && warehouseId) {
        query = `INSERT INTO Users (username, firstname, lastname, password, phone, email, createdAt, updatedAt, isWarehouser, warehouseId) VALUES ('${username}', '${firstname}', '${lastname}', '${encPassword}', '${phone}', '${email}', '${now}', '${now}', '1', '${warehouseId}')`;
    } else {
        query = `INSERT INTO Users (username, firstname, lastname, password, phone, email, createdAt, updatedAt, isWarehouser) VALUES ('${username}', '${firstname}', '${lastname}', '${encPassword}', '${phone}', '${email}', '${now}', '${now}', '0')`;
    }

    const result = await mysql.postquery(query);
    if (!result) {
        throw new Error('Error creating user');
    }
    
    return result;
};

exports.signup = async function (req, res, next) {
    try {
        await createUser(req.body);
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                return res.status(201).json({ message: 'User created successfully' });
            });
        })(req, res, next);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

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

