import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginDashboard({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@library.com" && password === "admin123") {
      setRole("ADMIN");
      navigate("/admin");
    } else if (email === "student1@griet.com" && password === "student123") {
      setRole("STUDENT");
      navigate("/student");
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "380px", borderRadius: "12px" }}>
        <h2 className="text-center mb-4 text-primary">Library Login</h2>

        {/* Email */}
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Fake Login Info */}
        {/* <div className="alert alert-info small text-center" role="alert">
          <strong>Test Credentials:</strong> <br />
          👩‍💼 <b>Admin</b> → admin@library.com / admin123 <br />
          🎓 <b>Student</b> → student1@griet.com / student123
        </div> */}
      </div>
    </div>
  );
}
