import React from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">📚 Student Dashboard</h2>
        <p className="text-muted text-center mb-4">
          Welcome to your library dashboard. Choose an option below:
        </p>
        <div className="d-grid gap-3">
          <Link to="/books" className="btn btn-outline-primary btn-lg rounded-pill shadow-sm">📖 View All Books</Link>
          {/* <Link to="/library-info" className="btn btn-outline-success btn-lg rounded-pill shadow-sm">🏛️ Library Info</Link> */}
          <Link to="/issued-books" className="btn btn-outline-warning btn-lg rounded-pill shadow-sm">📕 My Issued Books</Link>
        </div>
      </div>
    </div>
  );
}
