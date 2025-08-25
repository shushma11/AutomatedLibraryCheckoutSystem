import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const [pname, setPname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollno, setRollno] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");

  const navigate = useNavigate();

  const handleSignUp = () => {
    if (role === "Admin" && email === "admin@library.com" && password === "admin123") {
      navigate("/admin");
    } else if (role === "Student" && email === "student1@griet.com" && password === "student123") {
      navigate("/student");
    } else {
      alert("Invalid credentials! Please try with test details below.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "420px", borderRadius: "12px" }}>
        <h2 className="text-center mb-4 text-success fw-bold">Sign Up</h2>

        {/* Role Selection */}
        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Student">Student</option>
        </select>

        {/* Name */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={pname}
          onChange={(e) => setPname(e.target.value)}
        />

        {/* Extra fields for Student */}
        {role === "Student" && (
          <>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Roll Number"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />
          </>
        )}

        {/* Email */}
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Sign Up Button */}
        <button
          className="btn btn-success w-100 mb-3"
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        {/* Fake Details */}
        {/* <div className="alert alert-info small text-center">
          <strong>Test Accounts:</strong> <br />
          👩‍💼 <b>Admin</b> → admin@library.com / admin123 <br />
          🎓 <b>Student</b> → student1@griet.com / student123
        </div> */}
      </div>
    </div>
  );
}
