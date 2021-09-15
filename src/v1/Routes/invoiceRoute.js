const express = require("express");
const router = express.Router();
const { createInvoice } = require("../Controllers/invoiceController");

router.post("/invoice/:id", createInvoice);

module.exports = router;
