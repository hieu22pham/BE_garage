const express = require('express')
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const controller = require("../controller/technician.controller")

router.get('/admin/technicians/get-all', controller.getAllTechnicians);
router.get('/admin/technicians/get-by-id/:id', controller.getTechnicianById);
router.post('/admin/technicians/create', controller.createTechnician);
router.put('/admin/technicians/edit/:id', controller.editTechnician);
router.delete('/admin/technicians/delete/:id', controller.deleteTechnician);

module.exports = router;