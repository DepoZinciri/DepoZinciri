'use strict';
module.exports = (sequelize, DataTypes) => {
    var Warehouse = sequelize.define('Warehouse', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        adress: DataTypes.STRING,
        totalCapacity: DataTypes.INTEGER,
        totalRate: DataTypes.INTEGER,
        victimNumber: DataTypes.INTEGER,
        city: DataTypes.STRING,
        orders: DataTypes.INTEGER,
    });
    return Warehouse;
}
