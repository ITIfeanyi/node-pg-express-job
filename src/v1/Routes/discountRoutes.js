const express = require("express");
const router = express.Router();
const {
  getAllDiscount,
  createDiscount,
  findDiscountByName,
} = require("../Controllers/discountController");

router.get("/getall/discount", getAllDiscount);
router.get("/specificpercentage/:name", findDiscountByName);

router.post("/creatediscount", createDiscount);

module.exports = router;
