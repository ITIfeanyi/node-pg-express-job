const dbQuery = require("../../config/dbQuery");

async function findSingleCustomer(id) {
  try {
    const text = "SELECT * FROM customers WHERE customer_id = $1";
    const value = [id];
    const { rows } = await dbQuery.query(text, value);
    return { rows };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  findSingleCustomer,
};
