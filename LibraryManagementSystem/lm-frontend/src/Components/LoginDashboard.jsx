import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginDashboard({ setRole, setToken, setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });

    const { token, role, id } = response.data;  // include userId

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", id);          // ok, stores as string
     

    setRole(role);
    setToken(token);
    setUserId(Number(id)); 

    if (role === "ADMIN") navigate("/admin");
    else if (role === "STUDENT") navigate("/student");
    else alert("Unknown role received.");

  } catch (error) {
    console.error(error);
    alert("Invalid credentials! Please try again.");
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "380px", borderRadius: "12px" }}>
        <h2 className="text-center mb-4 text-primary">Library Login</h2>

        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
