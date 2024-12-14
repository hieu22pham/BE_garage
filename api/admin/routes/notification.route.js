const express = require('express')
const router = express.Router();

const controller = require("../controller/notification.controller")

router.get("/admin/notification/get-all", controller.index)
router.post("/admin/notification/postQuickOrder", controller.PostQuickOrder)

module.exports = router;