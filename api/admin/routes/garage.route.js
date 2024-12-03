const express = require('express')
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const controller = require("../controller/garage.controller")

router.get('/admin/garages/get-all', controller.getAllGarages);
router.get('/admin/garages/get-by-id/:id', controller.getGarageById);
router.post('/admin/garages/create', controller.createGarage);
router.put('/admin/garages/edit/:id', controller.editGarage);
router.delete('/admin/garages/delete/:id', controller.deleteGarage);

module.exports = router;