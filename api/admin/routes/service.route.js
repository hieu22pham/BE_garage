const express = require('express')
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const controller = require("../controller/service.controller")

router.get('/get-all-service', controller.getALlService);
router.get('/get-service-by-id/:id', controller.getServiceById);
router.post('/create-service', controller.createService);
router.put('/edit-service/:id', controller.editService);
router.delete('/delete-service/:id', controller.deleteService);

module.exports = router;