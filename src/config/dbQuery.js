const { pool } = require("./db.development");

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
