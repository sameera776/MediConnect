import React, { useState } from "react";
import axios from "axios";

function MedicineSearch() {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/medicines/search?name=${name}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setResults(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching data");
    }
  };

  return (
    <div>
      <h2>🔎 Medicine Search</h2>
      <input
        type="text"
        placeholder="Enter medicine name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((med, idx) => (
          <li key={idx}>
            {med.name} - Stock: {med.stock || "N/A"} - Pharmacy: {med.pharmacy_name || "Unknown"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicineSearch;
