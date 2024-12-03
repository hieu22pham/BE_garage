const express = require('express')
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const controller = require("../controller/account.controller")

router.post("/admin/accounts/login", controller.login)
router.post("/admin/accounts/checkToken", controller.checkToken)
// router.get('/admin/accounts/verify', authMiddleWare.requireAuth, controller.verifyAccount);
// router.post("/checkToken", controller.checkToken)

module.exports = router;