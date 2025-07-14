import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function AdminInventory() {
  const [medicines, setMedicines] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editModeId, setEditModeId] = useState(null);

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    stock: 0,
    pharmacy_name: "",
    latitude: "",
    longitude: ""
  });

  const [editedMedicine, setEditedMedicine] = useState({});

  useEffect(() => {
    fetchMedicines();

    axios.get("http://localhost:5000/api/medicines/pharmacies")
      .then(res => setPharmacies(res.data))
      .catch(err => console.error("Error fetching pharmacies:", err));

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.email === "admin@gmail.com") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const fetchMedicines = () => {
    axios
      .get("http://localhost:5000/api/medicines/all")
      .then((res) => setMedicines(res.data))
      .catch((err) => console.error(err));
  };

  const handleAdd = () => {
    if (!newMedicine.name || !newMedicine.stock || !newMedicine.pharmacy_name) {
      alert("Please fill all fields.");
      return;
    }

    axios
      .post("http://localhost:5000/api/medicines/add", newMedicine)
      .then(() => {
        fetchMedicines();
        setNewMedicine({
          name: "",
          stock: 0,
          pharmacy_name: "",
          latitude: "",
          longitude: ""
        });
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/medicines/delete/${id}`)
      .then(() => fetchMedicines())
      .catch((err) => console.error(err));
  };

  const handleEditStart = (med) => {
    setEditModeId(med.id);
    setEditedMedicine({ name: med.name, stock: med.stock });
  };

  const handleEditCancel = () => {
    setEditModeId(null);
    setEditedMedicine({});
  };

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:5000/api/medicines/update/${id}`, editedMedicine)
      .then(() => {
        fetchMedicines();
        handleEditCancel();
      })
      .catch((err) => console.error(err));
  };

  if (!isAdmin) {
    return <p style={{ color: "red" }}>Access denied: Not an admin</p>;
  }

  return (
    <div className="container">
      <h2>Pharmacy Inventory (Admin)</h2>

      <h4>Add New Medicine</h4>
      <select
        value={newMedicine.pharmacy_name}
        onChange={(e) => {
          const selected = pharmacies.find(
            (p) => p.pharmacy_name === e.target.value
          );
          if (selected) {
            setNewMedicine({
              ...newMedicine,
              pharmacy_name: selected.pharmacy_name,
              latitude: selected.latitude,
              longitude: selected.longitude
            });
          }
        }}
      >
        <option value="">Select Pharmacy</option>
        {pharmacies.map((p, idx) => (
          <option key={idx} value={p.pharmacy_name}>
            {p.pharmacy_name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Medicine Name"
        value={newMedicine.name}
        onChange={(e) =>
          setNewMedicine({ ...newMedicine, name: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Stock"
        value={newMedicine.stock}
        onChange={(e) =>
          setNewMedicine({ ...newMedicine, stock: parseInt(e.target.value) })
        }
      />
      <button onClick={handleAdd}>➕ Add Medicine</button>

      <h4>Current Stock</h4>
      <ul>
        {medicines.map((med) => (
          <li key={med.id}>
            {editModeId === med.id ? (
              <>
                <input
                  type="text"
                  value={editedMedicine.name}
                  onChange={(e) =>
                    setEditedMedicine({ ...editedMedicine, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editedMedicine.stock}
                  onChange={(e) =>
                    setEditedMedicine({
                      ...editedMedicine,
                      stock: parseInt(e.target.value)
                    })
                  }
                />
                <button onClick={() => handleUpdate(med.id)}>✅ Save</button>
                <button onClick={handleEditCancel}>❌ Cancel</button>
              </>
            ) : (
              <>
                {med.name} ({med.stock}) — {med.pharmacy_name}
                <button onClick={() => handleEditStart(med)}>✏️ Edit</button>
                <button onClick={() => handleDelete(med.id)}>❌ Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminInventory;
