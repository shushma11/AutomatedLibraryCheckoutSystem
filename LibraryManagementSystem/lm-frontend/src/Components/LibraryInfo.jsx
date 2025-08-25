import React from "react";

export default function LibraryInfo() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center fw-bold">📚 Library Information</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg rounded-4 border-0">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Total Seats</h5>
                <span className="badge bg-primary fs-6">100</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Students Inside</h5>
                <span className="badge bg-success fs-6">25</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Last Updated</h5>
                <span className="text-muted">24 Aug 2025, 11:00 AM</span>
              </div>
            </div>
            <div className="card-footer bg-light text-center">
              <small className="text-secondary">
                Stay disciplined. Quiet study zone. 🤫
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
