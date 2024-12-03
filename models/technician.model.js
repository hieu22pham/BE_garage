const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB'); // Import sequelize instance

const Technician = sequelize.define('Technician', {
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: true,
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
    tableName: 'technicians',
    timestamps: false,  // Ensure Sequelize doesn't add createdAt/updatedAt
    underscored: true,  // Use snake_case for column names
});

module.exports = Technician;
