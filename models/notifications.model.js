const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB'); // Import sequelize instance

const Notification = sequelize.define('Notification', {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
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
    tableName: 'notifications',
    timestamps: false,  // Ensure Sequelize doesn't add createdAt/updatedAt
    underscored: true,  // Use snake_case for column names
});

module.exports = Notification;
