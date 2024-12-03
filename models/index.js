const { Sequelize, DataTypes } = require("sequelize");

// Cấu hình kết nối cơ sở dữ liệu
const sequelize = new Sequelize('garage_management', {
  host: '127.0.0.1', // Thay bằng địa chỉ host của bạn
  dialect: 'mysql',  // Hoặc 'postgres', 'sqlite', 'mssql' nếu bạn dùng database khác
  logging: false,    // Bỏ log các câu lệnh SQL (tuỳ chọn)
});

// Kiểm tra kết nối
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
