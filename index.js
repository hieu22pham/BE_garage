const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {connectDB} = require("./config/connectDB");
const routesAdmin = require("./api/admin/routes/index.route")
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

const server = http.createServer(app);

// Kết nối đến cơ sở dữ liệu
// database.connect()
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((error) => {
//     console.error("Database connection failed:", error);
//     process.exit(1); // Thoát nếu không kết nối được với DB
//   });

connectDB()

// Middleware
app.use(bodyParser.json());

app.use(cors({
}));
app.use(cookieParser());

routesAdmin(app);

// Định nghĩa các routes


// Khởi động server
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

