'use strict';
module.exports = (sequelize, DataTypes) => {
    var Request = sequelize.define('Request', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        transactionId: DataTypes.STRING,
        dataHash: DataTypes.INTEGER,
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        emergencyStatus: DataTypes.STRING,
        itemDescription: DataTypes.STRING,
        confirmed: DataTypes.STRING,
        requestType: DataTypes.STRING,
        amount: DataTypes.STRING,
        status: DataTypes.STRING,
        itemType: DataTypes.STRING,
        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Warehouses',
                key: 'id'
            }
        }
    });
    return Request;
}
