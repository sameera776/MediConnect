const db = require("../config/db");

const createUser = (email, password, callback) => {
  db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], callback);
};

const findUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

module.exports = { createUser, findUserByEmail };
