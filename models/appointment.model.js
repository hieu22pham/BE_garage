const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB'); // Import sequelize instance

const Appointment = sequelize.define('Appointment', {
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    garage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    technician_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notes: {
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
    tableName: 'appointments',
    timestamps: false,  // Ensure Sequelize doesn't add createdAt/updatedAt
    underscored: true,  // Use snake_case for column names
});

module.exports = Appointment;
