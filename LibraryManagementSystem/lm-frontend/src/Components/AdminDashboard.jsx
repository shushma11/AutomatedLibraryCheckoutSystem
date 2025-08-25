import React from "react";
import { Link } from "react-router-dom";
import { Book, Info } from "lucide-react"; 

export default function AdminDashboard() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-5 text-center"
        style={{ width: "600px", borderRadius: "15px" }}
      >
        <h2 className="mb-4 fw-bold text-primary">📊 Admin Dashboard</h2>
        <p className="text-muted mb-4">
          Manage books, update library info, and oversee the system.
        </p>

        <div className="d-flex justify-content-center gap-4">
          {/* All Books */}
          <Link
            to="/books"
            className="btn btn-outline-primary d-flex flex-column align-items-center p-4 shadow-sm"
            style={{ borderRadius: "12px", width: "180px", height: "150px" }}
          >
            <Book size={40} className="mb-2" />
            <span className="fw-semibold">All Books</span>
          </Link>

          {/* Library Info */}
          <Link
            to="/library-info"
            className="btn btn-outline-success d-flex flex-column align-items-center p-4 shadow-sm"
            style={{ borderRadius: "12px", width: "180px", height: "150px" }}
          >
            <Info size={40} className="mb-2" />
            <span className="fw-semibold">Library Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
