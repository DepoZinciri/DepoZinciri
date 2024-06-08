const fs = require('fs');
const path = require('path');
const models = require('../models');
const mapInfoData = JSON.parse(fs.readFileSync(path.join(__dirname, '../Data/MapInfo.json'), 'utf8'));
const mysql = require('./mysql');
exports.auth = function (req, res, next) {
    var user = req.user
    if (user) {
        var username = user.firstname + " " + user.lastname;
        if(user.isWarehouser){
            return res.json({ message: "LOGGED_IN_WAREHOUSE", user: user });
        }else{
            return res.json({ message: "LOGGED_IN", user: user });
        }
    } else {
        return res.json({ message: "NOT_LOGGED_IN" });
    }
}


exports.findUser = function(req,res,next) {
    const password = req.body.password;
    const user = req.body.username;
    mysql.query(`SELECT * FROM Users WHERE username = '${user}' AND password = '${password} '`, function (results) {
        res.json({ user: results });
    });
}
exports.findUserbyUsername = async function(username){
    return await mysql.postquery(`SELECT * FROM Users WHERE username = '${username}'`, async function (results) {
        return  {user : results}
    })
}
exports.findUserbyId = async function(id){
    return mysql.postquery(`SELECT * FROM Users WHERE id = '${id}'`, async function (results) {
        return { user: results };
    });
}


exports.getRequests = function (req, res, next) {
    mysql.query('SELECT * FROM Requests', function (results) {
        res.json({ requests: results });
    });
}
exports.getRequestById = function (req, res, next) {
    const id = req.params.id;
    if(!id) return;
    mysql.query(`SELECT * FROM Requests WHERE id = ${id}`, function (results) {
        res.json({ request: results });
    });
}
exports.getConfirmedRequests = function (req, res, next) {
    mysql.query('SELECT * FROM Requests WHERE confirmed = true AND requestType = 1', function (results) {
        res.json({ requests: results });
    });
}
exports.getConfirmedSupportRequests = function (req, res, next) {
    mysql.query('SELECT * FROM Requests WHERE confirmed = true AND requestType = 2', function (results) {
        res.json({ requests: results });
    });
}
exports.getConfirmedRequestById = function (req, res, next) {
    const id = req.params.id;
    if(!id) return res.json({ error: 'Missing required fields' });
    mysql.query(`SELECT * FROM Requests WHERE id = ${id} AND confirmed = true`, function (results) {
        res.json({ request: results });
    });
}
exports.editConfirmNeed = function (req, res, next) {
    const {id, name, surname, requestType, amount, phone, address, emergencyStatus, status } = req.body;
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!name || !surname || !requestType || !amount || !phone || !address || !emergencyStatus || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    mysql.query(`UPDATE Requests SET name = '${name}', surname = '${surname}', requestType = '${requestType}', amount = ${amount}, phone = '${phone}', address = '${address}', emergencyStatus = '${emergencyStatus}', status = '${status}', updatedAt = '${now}' WHERE id = ${id}`, function (results) {
        res.json({ message: 'Request updated' });
    });
}
exports.editConfirmSupport = function (req, res, next) {
    const {id, name, surname, requestType, amount, phone, address, emergencyStatus, status } = req.body;
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!name || !surname || !requestType || !amount || !phone || !address || !emergencyStatus || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    mysql.query(`UPDATE Requests SET name = '${name}', surname = '${surname}', requestType = '${requestType}', amount = ${amount}, phone = '${phone}', address = '${address}', emergencyStatus = '${emergencyStatus}', status = '${status}', updatedAt = '${now}' WHERE id = ${id}`, function (results) {
        res.json({ message: 'Request updated' });
    });
}
exports.getNotConfirmedNeedRequests = function (req, res, next) {
    mysql.query('SELECT * FROM Requests WHERE confirmed = false AND requestType = 1', function (results) {
        res.setHeader('Cache-Control', 'no-store');
        res.json({ requests: results });
    });
};
exports.getNotConfirmedSupportRequests = function (req, res, next) {
    mysql.query('SELECT * FROM Requests WHERE confirmed = false AND requestType = 2', function (results) {
        res.json({ requests: results });
    });
}
exports.getRequestsByStatus = function (req, res, next) {
    const status = req.body.status;
    mysql.query(`SELECT * FROM Requests WHERE status = '${status}'`, function (results) {
        res.json({ requests: results });
    });
}
exports.getWarehousePendingRequests = function (req, res, next) {
    const warehouseId = req.body.warehouseId;
    mysql.query(`SELECT * FROM Requests WHERE status = 'Pending' AND warehouseId = ${warehouseId}`, function (results) {
        res.json({ requests: results });
    });
}
exports.getRequestsWithWarehouse = function (req, res, next) {
    const warehouseid = req.params.warehouseid;
    mysql.query(`SELECT * FROM Requests WHERE warehouseId = ${warehouseid}`, function (results) {
        res.json({ requests: results });
    });
}
exports.getWarehouseItems = async function (req, res, next) {
    const warehouseId = req.body.warehouseId;
    
    console.log("Warehouse ID:", warehouseId);  // Debugging statement
  
    if (!warehouseId) {
      return res.status(400).json({ error: 'Invalid warehouse ID' });
    }
  
    const getRequestsWithWarehouse = async function (warehouseId) {
      return await mysql.postquery(`SELECT * FROM Requests WHERE warehouseId = ${warehouseId}`, function (results) {
        return results;
      });
    };
  
    const items = await getRequestsWithWarehouse(warehouseId).then((results) => {
      if (results.length === 0) {
        return []; // Return an empty array if no results
      }
      return results[0].map((result) => {
        return result.itemId;
      });
    });
  
    if (items.length === 0) {
      return res.json({ items: [] }); // Return empty result if items array is empty
    }
  
    const sql = `SELECT * FROM Items WHERE id IN (${items.toString()})`;
    console.log(items);
    const results = await mysql.postquery(sql, items);
    res.json({ items: results[0] });
  };
  
  
exports.getWarehouse = function (req, res, next) {
    const id = req.params.id;
    mysql.query(`SELECT * FROM Warehouses WHERE id = ${id}`, function (results) {
        res.json({ warehouse: results });
    });
}
exports.getWarehouses = function (req, res, next) {
    mysql.query('SELECT * FROM Warehouses', function (results) {
        res.json({ warehouses: results });
    });
}
exports.getItemById = function (req, res, next) {
    const id = req.params.id;
    if(!id) return;
    mysql.query(`SELECT * FROM Items WHERE id = ${id}`, function (results) {
        res.json({ items: results });
    });
}
exports.updateSupportRequest = function (req, res, next) {
    const { id, name, surname, phone, address, requestType, amount, itemDescription,warehouseId } = req.body;
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!name || !surname || !phone || !address || !requestType || !amount || !itemDescription || !warehouseId) {
        return res.status(400).json({ error: ` missing field is ` });
    }
    mysql.query(`UPDATE Requests SET name = '${name}', surname = '${surname}', phone = '${phone}', address = '${address}', requestType = '${requestType}', amount = ${amount}, itemDescription = '${itemDescription}', updatedAt = '${now}', warehouseId = '${warehouseId}' WHERE id = ${id}`, function (results) {
        res.json({ message: 'Support Request updated' });
    });
}
exports.getItemsInWarehouse = function (req, res, next) {
    const id = req.params.id;
    mysql.query(`SELECT * FROM Items WHERE id = ${id}`, function (results) {
        res.json({ items: results });
    });
}
exports.confirmRequest = function (req, res, next) {
    const id = req.body.id;
    if(!id) return;
    mysql.query(`UPDATE Requests SET status = 'Confirmed', confirmed = true WHERE id = ${id}`, function (results) {
        res.json({ message: "Success" });
    });
}
exports.getOrdersInWarehouse = function (req, res, next) {
    const id = req.params.id;
    mysql.query(`SELECT * FROM Orders WHERE warehouseId = ${id}`, function (results) {
        res.json({ orders: results });
    });
}
exports.getIncomingSupports = function (req, res, next) {
    const warehouseId = req.params.id;
    mysql.query(`SELECT * FROM Requests WHERE warehouseId = ${warehouseId} AND requestType = 2 AND status = 'Confirmed'`, function (results) {
        res.json({ requests: results });
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

exports.createNeedRequest = async function (req, res, next) {
    const { name, surname, phone, address, emergencyStatus, requestType, itemType, amount, itemDescription } = req.body;
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!name || !surname || !phone || !address || !emergencyStatus || !requestType || !itemType || !amount || !itemDescription) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const itemId = await createItem(itemType, itemDescription, amount);
    if (itemId === 0) {
        return res.status(500).json({ error: 'Error creating item' });
    }
    const query = `INSERT INTO Requests (transactionId, dataHash, name, surname, phone, address, emergencyStatus, itemDescription, confirmed, requestType, amount, status, createdAt, updatedAt, itemId, warehouseId, itemType) VALUES ("transactionId", '123', '${name}', '${surname}', '${phone}', '${address}', '${emergencyStatus}', '${itemDescription}', '${false}', '${requestType}', ${amount}, "not Approved", '${now}', '${now}', ${itemId}, '1', '${itemType}')`;
    mysql.query(query, function (results) {
        res.json({ message: 'Need Request created' });
    });
}

exports.createSupportRequest = async function (req, res, next) {
    const { name, surname, phone, address, requestType, itemType, amount, itemDescription } = req.body;
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!name || !surname || !phone || !address || !requestType || !itemType || !amount || !itemDescription) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const itemId = await createItem(itemType, itemDescription, amount);
    if (itemId === 0) {
        return res.status(500).json({ error: 'Error creating item' });
    }
    const query = `INSERT INTO Requests (transactionId, dataHash, name, surname, phone, address, emergencyStatus, itemDescription, confirmed, requestType, amount, status, createdAt, updatedAt, itemId, warehouseId, itemType) VALUES ("transactionId", '123', '${name}', '${surname}', '${phone}', '${address}', '${"-"}', '${itemDescription}', '${false}', '${requestType}', ${amount}, "not Approved", '${now}', '${now}', ${itemId}, '2', '${itemType}')`;
    mysql.query(query, function (results) {
        res.json({ message: 'Support Request created' });
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
    console.log(req.params);
  
    if (!city) {
      return res.status(400).json({ error: 'City parameter is missing' });
    }
    console.log(city);
  
    const cityData = mapInfoData.data.find((item) => item.il_adi.toLowerCase() === city.toLowerCase());
  
    if (!cityData) {
      return res.status(404).json({ error: 'City not found' });
    }
  
    res.json({ city: cityData });
  };

  exports.deleteRequestById = async function (req, res, next) {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'Missing required fields' });

    try {
        const result = await models.Request.destroy({
            where: { id: id }
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json({ message: 'Request deleted successfully' });
    } catch (error) {
        console.error('Error deleting request:', error);
        res.status(500).json({ error: 'Error deleting request' });
    }
};
