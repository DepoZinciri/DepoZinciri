var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let user = require('../controllers/user');

let { isLoggedIn } = require('../middleware/hasAuth.js');

router.post('/api/login', user.login);
router.post('/api/signup', user.signup);
router.get('/api/logout', user.logout);
router.get('/api/auth', index.auth);
router.get('/api/getUser', index.getUser);
router.get('/api/getMapInfo/:city', index.getMapInfo);
router.get('/api/getRequests', index.getRequests);

router.post('/api/create-datahash', index.createDataHash);
router.get('/api/getdatahash/:id', index.getDataHash);  //isLoggedIn eklencek

module.exports = router;


