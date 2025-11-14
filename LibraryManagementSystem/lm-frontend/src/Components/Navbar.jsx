import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ role, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    onLogout(); // clears role, token, userId
    navigate("/login");
  };

  const showHomeButton = location.pathname === "/login" || location.pathname === "/signUp";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
          <span role="img" aria-label="book">📚</span>
          <span className="ms-2">Library Management System</span>
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {showHomeButton && (
              <li className="nav-item ms-3">
                <button
                  className="btn btn-outline-secondary btn-sm px-3 py-1 rounded-pill"
                  onClick={() => navigate("/")}
                >
                  🏠 Home
                </button>
              </li>
            )}

            {role === "ADMIN" && (
              <>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/admin">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/books">All Books</NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/library-info">Library Info</NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/admin/students">Students</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/admin/transactions">Transaction History</NavLink>
                </li>
              </>
            )}

            {role === "STUDENT" && (
              <>
              <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/student">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/books">All Books</NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/library-info">Library Info</NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/issued-books">My Issued Books</NavLink>
                </li>
              </>
            )}

            {!role && (
              <li className="nav-item ms-3">
                <NavLink className="btn btn-outline-light btn-sm px-3 py-1 rounded-pill" to="/login">
                  🔑 Login
                </NavLink>
              </li>
            )}

            {role && (
              <li className="nav-item ms-3 d-flex align-items-center">
                <span className="badge bg-info text-dark me-3 px-3 py-2 rounded-pill">{role}</span>
                <button className="btn btn-danger btn-sm px-3 py-1 rounded-pill shadow-sm" onClick={handleLogoutClick}>
                  🚪 Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
