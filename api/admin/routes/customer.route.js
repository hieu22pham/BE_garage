const express = require('express')
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const controller = require("../controller/customer.controller")

router.get('/admin/customers/get-all', controller.getAllCustomers);
router.get('/admin/customers/get-by-id/:id', controller.getCustomerById);
router.post('/admin/customers/create', controller.createCustomer);
router.put('/admin/customers/edit/:id', controller.editCustomer);
router.delete('/admin/customers/delete/:id', controller.deleteCustomer);

module.exports = router;