const express = require('express')
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")
const uploadCloud = require("../middlewares/uploadCloud.middleware")
const multer = require("multer")
const upload = multer()

const controller = require("../controller/appointment.controller")

router.post('/admin/appointments/create', controller.createAppointment);
router.get('/admin/appointments/get-all', controller.getAllAppointments);
router.put("/admin/appointments/update/:id", controller.updateAppointment)
router.get('/admin/appointments/get-by-id/:id', controller.getAppointmentById);
router.put('/admin/appointments/edit/:id', controller.editAppointment);
router.delete('/admin/appointments/delete/:id', controller.deleteAppointment);

module.exports = router;