'use strict';
module.exports = (sequelize, DataTypes) => {
    const WarehouseItems = sequelize.define('WarehouseItems', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Warehouses',
                key: 'id'
            }
        },
        itemType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        itemDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });

    WarehouseItems.associate = function(models) {
        WarehouseItems.belongsTo(models.Warehouse, { foreignKey: 'warehouseId' });
    };

    return WarehouseItems;
};
