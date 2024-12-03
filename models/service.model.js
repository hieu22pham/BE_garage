const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB'); // Import sequelize instance

const Service = sequelize.define('Service', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'services',
    timestamps: false,  // Ensure Sequelize doesn't add createdAt/updatedAt
    underscored: true,  // Use snake_case for column names
});

module.exports = Service;
