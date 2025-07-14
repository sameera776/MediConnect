const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// Show your JWT_SECRET in console (for debug)
console.log("JWT_SECRET =", process.env.JWT_SECRET);

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
require("./config/db");

// Auth Routes
app.use("/api/auth", require("./routes/auth"));

// Medicine Routes (Make sure this line is BEFORE other medicine-related routes)
const medicineRoutes = require("./routes/medicine");
app.use("/api/medicines", medicineRoutes);

// Pharmacy Routes (if you want separate pharmacy endpoints)
const pharmacyRoutes = require("./routes/pharmacies");
app.use("/api/pharmacies", pharmacyRoutes);

// Server Start
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
