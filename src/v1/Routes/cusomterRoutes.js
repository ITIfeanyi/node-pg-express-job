const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  createCustomers,
  findCustomerById,
} = require("../Controllers/customersController");

router.get("/getall/customer", getAllCustomers);

router.get("/findcustomers/byid/:id", findCustomerById);

router.post("/createcustomers", createCustomers);

module.exports = router;
