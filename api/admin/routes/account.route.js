const express = require('express')
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const controller = require("../controller/account.controller")

router.post("/login", controller.login)
router.post("/checkToken", controller.checkToken)
router.get('/verify', authMiddleWare.requireAuth, controller.verifyAccount);
// router.post("/checkToken", controller.checkToken)

module.exports = router;