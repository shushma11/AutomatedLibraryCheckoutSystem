import React, { useState } from "react";
import axios from "axios";
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
  const [secretKey, setSecretKey] = useState(""); // now required for both roles
  const [rfidTagId, setRfidTagId] = useState(""); // for students

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Build signup payload
      const payload = {
        name: pname,
        email,
        password,
        role,
        secretKey, // always required
      };

      // Add student-specific fields
      if (role === "Student") {
        payload.rollNo = rollno;
        payload.year = year;
        payload.branch = branch;
        payload.section = section;
        payload.rfidTagId = rfidTagId; // student RFID
      }

      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        payload
      );

      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Signup failed! Secret key is incorrect");
      } else {
        alert("Signup failed! Please check your details.");
      }
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

        {/* Student-specific fields */}
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
            {/* RFID field */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="RFID Tag ID"
              value={rfidTagId}
              onChange={(e) => setRfidTagId(e.target.value)}
            />
          </>
        )}

        {/* Secret key input for both roles */}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Secret Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />

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

        {/* Submit */}
        <button className="btn btn-success w-100 mb-3" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
