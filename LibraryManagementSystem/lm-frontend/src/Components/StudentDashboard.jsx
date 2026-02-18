// import React from "react";
// import { Link } from "react-router-dom";

// export default function StudentDashboard() {
//   return (
//     <div className="container mt-5 d-flex justify-content-center">
//       <h1>Hii</h1>
//       <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "600px", width: "100%" }}>
//         <h2 className="text-center mb-4 text-primary fw-bold">📚 Student Dashboard</h2>
//         <p className="text-muted text-center mb-4">
//           Welcome to your library dashboard. Choose an option below:
//         </p>
//         <div className="d-grid gap-3">
//           <Link to="/books" className="btn btn-outline-primary btn-lg rounded-pill shadow-sm">📖 View All Books</Link>
//           {/* <Link to="/library-info" className="btn btn-outline-success btn-lg rounded-pill shadow-sm">🏛️ Library Info</Link> */}
//           <Link to="/issued-books" className="btn btn-outline-warning btn-lg rounded-pill shadow-sm">📕 My Issued Books</Link>
//         </div>
//       </div>
//     </div>
//   );
// }







// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function StudentDashboard({ userId }) {
//   const [student, setStudent] = useState(null);

//   // Fetch student details
//   const fetchStudent = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/user/${userId}`);
//       console.log(res.data);
//       setStudent(res.data);

//       localStorage.setItem("rollNo", res.data.rollNumber);
//     } catch (err) {
//       console.error("Error fetching student:", err);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchStudent();
//     }
//   }, [userId]);

//   return (
//     <div className="container mt-5 d-flex flex-column align-items-center">
//       <h1>
//         Hii {student ? `${student.name} (${student.rollNumber})` : "Student"} 👋
//       </h1>

//       <div className="card shadow-lg p-4 rounded-4 mt-4" style={{ maxWidth: "600px", width: "100%" }}>
//         <h2 className="text-center mb-4 text-primary fw-bold">📚 Student Dashboard</h2>
//         <p className="text-muted text-center mb-4">
//           Welcome to your library dashboard. Choose an option below:
//         </p>
//         <div className="d-grid gap-3">
//           <Link to="/books" className="btn btn-outline-primary btn-lg rounded-pill shadow-sm">
//             📖 View All Books
//           </Link>
//           <Link to="/issued-books" className="btn btn-outline-warning btn-lg rounded-pill shadow-sm">
//             📕 My Issued Books
//           </Link>
//            <Link to="/scan-book" className="btn btn-outline-secondary btn-lg rounded-pill shadow-sm">
//             📕 Scan a Book
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function StudentDashboard({ userId }) {
  const [student, setStudent] = useState(null);

  // Fetch student details
  const fetchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user/${userId}`);
      console.log(res.data);
      setStudent(res.data);
      localStorage.setItem("rollNo", res.data.rollNumber);
    } catch (err) {
      console.error("Error fetching student:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchStudent();
    }
  }, [userId]);

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(135deg, #e3f2fd 0%, #f8fbff 50%, #ffffff 100%)",
          minHeight: "calc(100vh - 73px)"
      }}
    >
      <div className="w-100 d-flex flex-column align-items-center px-3">

        {/* Greeting */}
        <div className="text-center mb-4">
          <h1 className="fw-bold text-dark">
            Hi {student ? student.name : "Student"} 👋
          </h1>
          <p className="text-muted fs-5">
            {student ? `Roll No: ${student.rollNumber}` : "Loading your details..."}
          </p>
        </div>

        {/* Dashboard Card */}
        <div
          className="card p-5 rounded-4 shadow-lg"
          style={{
            maxWidth: "520px",
            width: "100%",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h2 className="text-center mb-2 text-primary fw-bold">
            📚 Student Dashboard
          </h2>

          <p className="text-center text-muted mb-4">
            Access your library features easily
          </p>

          <div className="d-grid gap-3">
            <Link
              to="/books"
              className="btn btn-outline-primary btn-lg rounded-pill shadow-sm"
            >
              📖 View All Books
            </Link>

            <Link
              to="/issued-books"
              className="btn btn-outline-warning btn-lg rounded-pill shadow-sm"
            >
              📕 My Issued Books
            </Link>

            <Link
              to="/library-info"
              className="btn btn-outline-secondary btn-lg rounded-pill shadow-sm"
            >
              📡 Library Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
