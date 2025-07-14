import React, { useEffect, useState } from "react";
import MedicineSearch from "./MedicineSearch";
import { jwtDecode } from "jwt-decode";
import MapView from "./MapView";
import AdminInventory from "./AdminInventory"; // ✅ Import admin section

function Dashboard() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // ✅ Admin state

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to access the dashboard.");
    window.location.href = "/";
  } else {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);  // 👈 ADD THIS LINE

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        setAuth(true);
        if (decoded.email === "admin@gmail.com") {
          setIsAdmin(true);
        }
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }

  setLoading(false);
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully.");
    window.location.href = "/";
  };

  if (loading) return <p>Loading...</p>;

  return auth ? (
    <div className="container">
      <h2>Welcome to MediConnect Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <MedicineSearch />
      <MapView />

      {/* ✅ Show AdminInventory if user is admin */}
      {isAdmin && (
        <>
          <hr />
          <AdminInventory />
        </>
      )}
    </div>
  ) : null;
}

export default Dashboard;
