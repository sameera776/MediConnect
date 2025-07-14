import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>MediConnect</h1>
      <RegisterForm />
      <hr />
      <LoginForm />
    </div>
  );
}

export default App;
