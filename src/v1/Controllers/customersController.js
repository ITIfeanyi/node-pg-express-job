const dbQuery = require("../../config/dbQuery");
const {
  handleEmailUniqueError,
  validateNameAndEmail,
} = require("../utils/handleValidationError");
const { handleError } = require("../utils/handleError");

module.exports = {
  getAllCustomers: async (req, res) => {
    try {
      const { rows } = await dbQuery.query("SELECT * FROM customers");
      return res.status(200).json({
        ok: true,
        customers: rows,
      });
    } catch (error) {
      return handleError(res);
    }
  },
  createCustomers: async (req, res) => {
    let {
      first_name,
      last_name,
      email,
      is_employee,
      is_affiliate,
      created_at,
    } = req.body;
    try {
      if (!first_name || !last_name || !email) {
        const err = validateNameAndEmail(first_name, last_name, email);
        return handleError(res, err, 400);
      } else if (!created_at) {
        created_at = new Date();
      }
      const text =
        "INSERT INTO customers(first_name, last_name, email, is_employee, is_affiliate, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
      const value = [
        first_name,
        last_name,
        email,
        is_employee,
        is_affiliate,
        created_at,
      ];

      const { rows } = await dbQuery.query(text, value);
      res.status(201).json({
        ok: true,
        newCustomer: rows,
      });
    } catch (error) {
      const err = handleEmailUniqueError(error);
      return handleError(res, err, 400);
    }
  },
  findCustomerById: async (req, res) => {
    try {
      const { id } = req.params;
      const text =
        "SELECT * FROM customers JOIN invoices USING(customer_id) JOIN orders USING(invoice_id) WHERE customer_id = $1";
      const value = [id];

      const { rows } = await dbQuery.query(text, value);

      if (rows.length <= 0) {
        return handleError(
          res,
          "Customer with the id " + id + " does not exist",
          404
        );
      }
      return res.status(200).json({
        ok: true,
        customer: rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
