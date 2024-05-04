"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
// Test'e al, Docker kur.
// ENV Dosyası yapılıp oradan çekilebilir (TODO)
// docker run --name akys -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=akys -p 3306:3306 -d mysql

const env = "test"; //process.env.NODE_ENV || 'development';
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Define associations
const User = db['User'];
const Warehouse = db['Warehouse'];
const Item = db['Item'];
const Request = db['Request'];
const Order = db['Order'];

User.belongsTo(Warehouse, { foreignKey: 'warehouseId' }); // Ref: Users.warehouse > Warehouse.id
Warehouse.hasMany(User, { foreignKey: 'warehouseId' });

Warehouse.belongsToMany(Item, { through: 'WarehouseItem' }); // Ref: Warehouse.id <> İtems.id
Item.belongsToMany(Warehouse, { through: 'WarehouseItem' });

Request.belongsTo(Warehouse, { foreignKey: 'warehouseId' }); // Ref: Request.warehouseid > Warehouse.id
Warehouse.hasMany(Request, { foreignKey: 'warehouseId' });

Request.belongsTo(Item, { foreignKey: 'itemId' }); // Ref: Request.itemid > Item.id
Item.hasMany(Request, { foreignKey: 'itemId' });

Warehouse.hasMany(Order); 
Order.belongsTo(Warehouse);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
