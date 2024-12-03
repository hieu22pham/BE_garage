const express = require('express')
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const controller = require("../controller/service.controller")

router.get('/admin/services/get-all', controller.getALlService);
router.get('/admin/services/get-by-id/:id', controller.getServiceById);
router.post('/admin/services/create', controller.createService);
router.put('/admin/services/edit/:id', controller.editService);
router.delete('/admin/services/delete/:id', controller.deleteService);

module.exports = router;