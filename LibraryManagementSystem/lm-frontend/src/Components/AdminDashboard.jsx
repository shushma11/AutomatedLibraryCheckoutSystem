// import React from "react";
// import { Link } from "react-router-dom";
// import { Book, Info, Users } from "lucide-react";

// export default function AdminDashboard() {
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card shadow-lg p-5 text-center" style={{ width: "600px", borderRadius: "15px" }}>
//         <h2 className="mb-4 fw-bold text-primary">📊 Admin Dashboard</h2>
//         <p className="text-muted mb-4">Manage books, update library info, and oversee the system.</p>

//         <div className="d-flex justify-content-center gap-4 flex-wrap">
//           <Link to="/books" className="btn btn-outline-primary d-flex flex-column align-items-center p-4 shadow-sm" style={{ borderRadius: "12px", width: "180px", height: "150px" }}>
//             <Book size={40} className="mb-2" />
//             <span className="fw-semibold">All Books</span>
//           </Link>

//           <Link to="/admin/students" className="btn btn-outline-warning d-flex flex-column align-items-center p-4 shadow-sm" style={{ borderRadius: "12px", width: "180px", height: "150px" }}>
//             <Users size={40} className="mb-2" />
//             <span className="fw-semibold">Students List</span>
//           </Link>

//           <Link to="/admin/transactions" className="btn btn-outline-dark d-flex flex-column align-items-center p-4 shadow-sm" style={{ borderRadius: "12px", width: "180px", height: "150px" }}>
//             <Users size={40} className="mb-2" />
//             <span className="fw-semibold">Transaction History</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


















import React from "react";
import { Link } from "react-router-dom";
import { Book, Users, History } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
        minHeight: "calc(100vh - 73px)"
      }}
    >
      <div
        className="card shadow-lg border-0 p-5"
        style={{
          maxWidth: "900px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary mb-2">
            📊 Admin Dashboard
          </h2>
          <p className="text-muted fs-5">
            Manage the library system efficiently
          </p>
        </div>


        

        {/* Dashboard Cards */}
        <div className="row g-4">

          {/* Library Info */}
          <div className="col-md-4">
            <Link
              to="/library-info"
              className="text-decoration-none"
            >
              <div
                className="card h-100 shadow-sm border-0 text-center p-4 dashboard-card"
                style={{ borderRadius: "16px" }}
              >
                <History size={48} className="text-dark mb-3" />
                <h5 className="fw-bold mb-2">Library Info</h5>
                <p className="text-muted small">
                  Get to know about the oocupancy
                </p>
              </div>
            </Link>
          </div>

          {/* All Books */}
          <div className="col-md-4">
            <Link
              to="/books"
              className="text-decoration-none"
            >
              <div
                className="card h-100 shadow-sm border-0 text-center p-4 dashboard-card"
                style={{ borderRadius: "16px" }}
              >
                <Book size={48} className="text-primary mb-3" />
                <h5 className="fw-bold mb-2">All Books</h5>
                <p className="text-muted small">
                  View, add, and manage library books
                </p>
              </div>
            </Link>
          </div>

          {/* Students */}
          <div className="col-md-4">
            <Link
              to="/admin/students"
              className="text-decoration-none"
            >
              <div
                className="card h-100 shadow-sm border-0 text-center p-4 dashboard-card"
                style={{ borderRadius: "16px" }}
              >
                <Users size={48} className="text-warning mb-3" />
                <h5 className="fw-bold mb-2">Students</h5>
                <p className="text-muted small">
                  View registered students and details
                </p>
              </div>
            </Link>
          </div>

          
        </div>
      </div>

      {/* Hover Effect */}
      <style>
        {`
          .dashboard-card {
            transition: all 0.3s ease;
          }
          .dashboard-card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 12px 25px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
}
