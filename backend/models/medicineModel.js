// Medicine model structure here
const db = require("../config/db");

const searchMedicines = (name, callback) => {
  db.query("SELECT * FROM medicines WHERE name LIKE ?", [`%${name}%`], callback);
};

module.exports = { searchMedicines };
