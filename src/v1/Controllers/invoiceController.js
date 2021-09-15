const format = require("pg-format");
const dbQuery = require("../../config/dbQuery");
const { checkIfPriceHasZero } = require("../utils/checkIfPriceZero");
const { findSingleCustomer } = require("../utils/findcustomer");
const { handleError } = require("../utils/handleError");
const { calTotal_Percentage } = require("../utils/handleTotal_Percentage");

module.exports = {
  createInvoice: async (req, res) => {
    try {
      const { id } = req.params;
      const { bill } = req.body;
      const check_price = checkIfPriceHasZero(bill);

      if (check_price) {
        return res.status(400).json({
          ok: false,
          message: "price field can not be zero",
        });
      }
      const { rows } = await findSingleCustomer(id);
      if (rows.length < 1) {
        return handleError(res, "Unauthorized", 401);
      }
      const {
        discount_type,
        totalAfterDiscount,
        totalBeforeDiscount,
        discountValue,
        customer,
        discountPercent,
      } = calTotal_Percentage(bill, rows);

      const text =
        "INSERT INTO invoices(customer_id, discount_percentage, discount_type) VALUES($1, $2, $3) RETURNING *";
      const value = [customer.customer_id, discountPercent, discount_type];
      const invoice = await dbQuery.query(text, value);

      let orderItems = [];
      bill.forEach((item) => {
        orderItems.push([
          invoice.rows[0].invoice_id,
          item.product_name,
          item.product_price,
        ]);
      });
      const query = format(
        "INSERT INTO orders(invoice_id, product_name, product_price) VALUES %L",
        orderItems
      );
      await dbQuery.query(query);

      res.status(200).json({
        discount_type,
        totalBeforeDiscount,
        discountValue,
        totalAfterDiscount,
        customer,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
