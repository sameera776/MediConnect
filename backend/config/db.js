
const mysql = require("mysql2");

console.log("🚀 Attempting to connect to MySQL...");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",       // ✅ your MySQL username
  password: "Sam@0504",       // ✅ your MySQL password (put it here if needed)
  database: "mediconnect"
});

connection.connect(err => {
  if (err) {
    console.error("❌ MySQL connection error:", err.message);
    return;
  }
  console.log("✅ MySQL connected");
});

module.exports = connection;

