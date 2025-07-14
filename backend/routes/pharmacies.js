const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/pharmacies — returns all pharmacy names and coordinates
router.get("/", (req, res) => {
  db.query("SELECT name, latitude, longitude FROM pharmacies", (err, results) => {
    if (err) {
      console.error("Error fetching pharmacies:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
  });
});

module.exports = router;
