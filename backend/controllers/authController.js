const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

exports.register = (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    createUser(email, hash, (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ msg: "User registered" });
    });
  });
};

/*
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", email, password);  // 🔍 log input

  findUserByEmail(email, (err, results) => {
    console.log("User found:", results);  // 🔍 log db result

    if (err || results.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (!isMatch) {
        console.log("Password mismatch");  // 🔍 log mismatch
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);


      res.json({ token });
    });
  });
};
*/
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", email, password);

  findUserByEmail(email, (err, results) => {
    console.log("User found:", results);

    if (err || results.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (!isMatch) {
        console.log("Password mismatch");
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: results[0].id, email: results[0].email, role: results[0].role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    });
  });
};
