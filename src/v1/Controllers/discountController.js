const dbQuery = require("../../config/dbQuery");
const { handleError } = require("../utils/handleError");
const { handleDiscountValidation } = require("../utils/handleValidationError");

module.exports = {
  getAllDiscount: async (req, res) => {
    try {
      const text = "SELECT * FROM discounts";

      const { rows } = await dbQuery.query(text);
      return res.status(200).json({
        ok: true,
        allDiscount: rows,
      });
    } catch (error) {
      return handleError(res);
    }
  },
  createDiscount: async (req, res) => {
    try {
      const { discount_type, discount_percentage } = req.body;
      if (!discount_type || !discount_percentage) {
        const err = handleDiscountValidation(
          discount_type,
          discount_percentage
        );
        return handleError(res, err, 400);
      }

      const text =
        "INSERT INTO discounts(discount_type, discount_percentage) VALUES($1, $2) RETURNING *";
      const value = [discount_type, discount_percentage];

      const { rows } = await dbQuery.query(text, value);

      if (rows) {
        return res.status(201).json({
          ok: true,
          discount: rows,
        });
      }
    } catch (error) {
      return handleError(res);
    }
  },
  findDiscountByName: async (req, res) => {
    try {
      const { name } = req.params;
      if (!name) {
        return handleError(res, "No name was provided.", 400);
      }
      const text = "SELECT * FROM discounts WHERE discount_type = $1";
      const value = [name];

      const { rows } = await dbQuery.query(text, value);

      if (rows.length < 1) {
        return res.status(404).json({
          ok: false,
          message: "No discount type was found.",
        });
      }

      return res.status(200).json({
        ok: true,
        discount: rows,
      });
    } catch (error) {}
  },
};
