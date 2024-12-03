const express = require('express')
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const controller = require("../controller/service.controller")

router.get('/get-all-service', controller.getALlService);

module.exports = router;