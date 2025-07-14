const express = require("express");
const router = express.Router();
const { search } = require("../controllers/medicineController");
const db = require("../config/db");

// GET /api/medicines/search?name=Paracetamol
// ✅ GET /api/medicines/pharmacies — Return distinct pharmacies
router.get("/all", (req, res) => {
  db.query("SELECT * FROM medicines", (err, results) => {
    if (err) {
      console.error("Error fetching all medicines:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

router.get("/pharmacies", (req, res) => {
  const query = `
    SELECT DISTINCT pharmacy_name, latitude, longitude
    FROM medicines
    WHERE pharmacy_name IS NOT NULL AND latitude IS NOT NULL AND longitude IS NOT NULL
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching pharmacies:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ Search medicines by name (partial match)
router.get("/search", (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: "Missing medicine name" });
  }

  const query = `
    SELECT * FROM medicines
    WHERE name LIKE ?
  `;
  db.query(query, [`%${name}%`], (err, results) => {
    if (err) {
      console.error("Search error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});



// POST /api/medicines/add — Add new medicine with pharmacy details
router.post("/add", (req, res) => {
  const { name, stock, pharmacy_name, latitude, longitude } = req.body;

  if (!name || !stock || !pharmacy_name || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.query(
    "INSERT INTO medicines (name, stock, pharmacy_name, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
    [name, stock, pharmacy_name, latitude, longitude],
    (err, result) => {
      if (err) {
        console.error("Error adding medicine:", err);
        return res.status(500).json({ error: "Failed to insert" });
      }
      res.json({ message: "Medicine added successfully" });
    }
  );
});

// PUT /api/medicines/update/:id — Update existing medicine
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, stock } = req.body;

  db.query(
    "UPDATE medicines SET name = ?, stock = ? WHERE id = ?",
    [name, stock, id],
    (err, result) => {
      if (err) {
        console.error("Error updating medicine:", err);
        return res.status(500).json({ error: "Update failed" });
      }
      res.json({ message: "Medicine updated" });
    }
  );
});

// DELETE /api/medicines/delete/:id — Delete medicine
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM medicines WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting medicine:", err);
      return res.status(500).json({ error: "Delete failed" });
    }
    res.json({ message: "Medicine deleted" });
  });
});

module.exports = router;
