'use strict';
module.exports = (sequelize, DataTypes) => {
    var Order = sequelize.define('Order', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        items: DataTypes.INTEGER,
    });
    return Order;
}
