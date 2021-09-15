const { pool } = require("./db.development");

const createUserTable = async () => {
  try {
    const createUsers = `
     CREATE TABLE IF NOT EXISTS customers (
     customer_id SERIAL PRIMARY KEY ,
     first_name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     is_employee INT DEFAULT NULL,
     is_affiliate INT DEFAULT NULL,
     two_years_customer INT DEFAULT NULL,
     created_at DATE DEFAULT CURRENT_DATE
     )`;
    await pool.query(createUsers);
  } catch (error) {
    console.log(error);
  }
};

const createDiscountTable = async () => {
  try {
    const createDiscount = `
      CREATE TABLE IF NOT EXISTS discounts(
      discount_id SERIAL PRIMARY KEY,
      discount_type VARCHAR(50) UNIQUE NOT NULL,
      discount_percentage INT NOT NULL CHECK (discount_percentage >= 0)
      )`;
    await pool.query(createDiscount);
  } catch (error) {
    console.log(error);
  }
};

const createInvoiceTable = async () => {
  try {
    const createInvoice = `
    CREATE TABLE IF NOT EXISTS invoices(
    invoice_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    discount_percentage INT DEFAULT NULL,
    discount_type VARCHAR DEFAULT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    
    CONSTRAINT fk_customer
    FOREIGN KEY(customer_id) 
	  REFERENCES customers(customer_id)
	  ON DELETE CASCADE)`;

    await pool.query(createInvoice);
  } catch (error) {
    console.log(error);
  }
};

const createOrderTable = async () => {
  try {
    const createOrder = `
    CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    invoice_id INT NOT NULL, 
    product_name VARCHAR(50) NOT NULL,
    product_price INT NOT NULL CHECK (product_price > 0),
    created_at DATE DEFAULT CURRENT_DATE, 

    CONSTRAINT fk_invoice
    FOREIGN KEY(invoice_id) 
    REFERENCES invoices(invoice_id)
    ON DELETE CASCADE
  )`;
    await pool.query(createOrder);
  } catch (error) {
    console.log(error);
  }
};

const createAllTables = async () => {
  await createUserTable();
  await createDiscountTable();
  await createInvoiceTable();
  await createOrderTable();
};

module.exports = {
  createAllTables,
};
