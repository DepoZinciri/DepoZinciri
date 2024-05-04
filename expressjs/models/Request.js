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
        desc: DataTypes.STRING,
        confirmed: DataTypes.BOOLEAN,
        requestType: DataTypes.INTEGER,
        status: DataTypes.STRING,
    });
    return Request;
}
