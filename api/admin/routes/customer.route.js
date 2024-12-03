const express = require('express')
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")

const controller = require("../controller/customer.controller")

router.get('/get-all', controller.getAllCustomers);
router.get('/get-by-id/:id', controller.getCustomerById);
router.post('/create', controller.createCustomer);
router.put('/edit/:id', controller.editCustomer);
router.delete('/delete/:id', controller.deleteCustomer);

module.exports = router;
