// HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to MediConnect</h2>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")} style={{ marginLeft: "10px" }}>
        Register
      </button>
    </div>
  );
}

export default HomePage;
