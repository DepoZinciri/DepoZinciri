'use strict';
module.exports = (sequelize, DataTypes) => {
    var Item = sequelize.define('Item', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        itemType: DataTypes.STRING,
        itemDescription: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        expirationDate: DataTypes.DATE,
    });
    return Item;
}
