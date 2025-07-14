import React, { useState } from "react";
import axios from "axios";

function SearchMedicines() {
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);

const handleSearch = async () => {
try {
const token = localStorage.getItem("token");
const res = await axios.get("http://localhost:5000/api/medicines/search", {
params: { name: query },
headers: { "x-auth-token": token },
});
setResults(res.data);
} catch (err) {
console.error("Search failed", err);
}
};

return (
<div>
<h2>Search for Medicine</h2>
<input
type="text"
placeholder="e.g. Paracetamol"
value={query}
onChange={(e) => setQuery(e.target.value)}
/>
<button onClick={handleSearch}>Search</button>
  <ul>
    {results.map((item, index) => (
      <li key={index}>
        {item.name} - {item.pharmacy_name} (Stock: {item.stock})
      </li>
    ))}
  </ul>
</div>
);
}

export default SearchMedicines;

