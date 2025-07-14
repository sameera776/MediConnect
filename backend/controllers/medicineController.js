// Medicine controller logic here
const { searchMedicines } = require("../models/medicineModel");

exports.search = (req, res) => {
  const { name } = req.query;
  searchMedicines(name, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
