var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let user = require('../controllers/user');

let { isLoggedIn } = require('../middleware/hasAuth.js');

router.post('/api/login', user.login);
router.post('/api/signup', user.signup);
router.get('/api/logout', user.logout);
router.get('/api/auth', index.auth);
//router.get('/api/getUser', index.getUser);
router.get('/api/getMapInfo/:city', index.getMapInfo);
router.get('/api/getRequests', index.getRequests);
router.get('/api/getConfirmedRequests', index.getConfirmedRequests);
router.get('/api/getNotConfirmedNeedRequests', index.getNotConfirmedNeedRequests);
router.get('/api/getNotConfirmedSupportRequests', index.getNotConfirmedSupportRequests);
router.get('/api/getRequestsByStatus/:status', index.getRequestsByStatus);
router.get('/api/getRequestsWithWarehouse/:warehouseid', index.getRequestsWithWarehouse);
router.get('/api/getWarehouse/:id', index.getWarehouse);
router.get('/api/getItemsInWarehouse/:id', index.getItemsInWarehouse);
router.get('/api/getOrdersInWarehouse/:id', index.getOrdersInWarehouse);
router.get('/api/getRequestById/:id', index.getRequestById);
router.get('/api/getItemById/:id', index.getItemById)
router.post('/api/confirmRequest', index.confirmRequest);
router.post('/api/create-datahash', index.createDataHash);
router.post('/api/create-request', index.createRequest);
router.post('/api')
//router.post('/api/create-item', index.createItem);
router.get('/api/getdatahash/:id', index.getDataHash);  //isLoggedIn eklencek

module.exports = router;


