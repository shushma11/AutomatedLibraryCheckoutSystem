// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Welcome() {
//   return (
//     <div
//       className="container-fluid d-flex align-items-center justify-content-center vh-100"
//       style={{
//         background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
//       }}
//     >
//       <div className="row w-100">
//         {/* Left Half - Image */}
//         <div className="col-md-6 d-flex justify-content-center align-items-center">
//           <motion.img
//             src="/images/firstImg.png"
//             alt="Library"
//             className="img-fluid rounded shadow-lg"
//             style={{
//               maxHeight: "80%",
//               objectFit: "cover",
//               borderRadius: "20px",
//             }}
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 1 }}
//             whileHover={{ scale: 1.05 }}
//           />
//         </div>

//         {/* Right Half - Content */}
//         <div className="col-md-6 d-flex flex-column justify-content-center align-items-start p-5">
//           <motion.h1
//             className="fw-bold mb-3"
//             style={{ fontSize: "2.8rem", color: "#2c3e50", lineHeight: "1.3" }}
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             Welcome to <br /> Library Management System
//           </motion.h1>

//           <motion.p
//             className="text-muted mb-4"
//             style={{ fontSize: "1.2rem" }}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             📚 Manage books, track records, and make library access smarter.
//           </motion.p>

//           <motion.div
//             className="d-flex gap-3"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             <Link
//               to="/signUp"
//               className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
//               style={{ fontWeight: "500" }}
//             >
//               🚀 Get Started
//             </Link>
//             <Link
//               to="/login"
//               className="btn btn-outline-primary px-4 py-2 rounded-pill"
//               style={{ fontWeight: "500" }}
//             >
//               🔑 Login
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }




















import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <div
      className="container-fluid d-flex align-items-center"
      style={{
        background:
          "linear-gradient(120deg, #e3f2fd 0%, #ffffff 50%, #f1f8ff 100%)",
          minHeight: "calc(100vh - 73px)" 
      }}
    >
      <div className="row w-100 align-items-center px-3 px-md-5">
        
        {/* Left Section – Image */}
        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
          <motion.img
            src="/images/firstImg.png"
            alt="Library Management"
            className="img-fluid shadow-lg"
            style={{
              maxHeight: "85vh",
              borderRadius: "24px",
            }}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.03 }}
          />
        </div>

        {/* Right Section – Content Card */}
        <div className="col-md-6 d-flex justify-content-center">
          <motion.div
            className="p-5 w-100"
            style={{
              maxWidth: "550px",
              borderRadius: "24px",
              // background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
              // boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            }}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h1
              className="fw-bold mb-3"
              style={{
                fontSize: "2rem",
                color: "#1f3c88",
                lineHeight: "1.3",
              }}
            >
              Welcome to <br />
              <span style={{ color: "#0d6efd" }}>
                Library Management System
              </span>
            </h1>

            <p
              className="text-muted mb-4"
              style={{ fontSize: "1rem" }}
            >
              📚 Simplify book management, track borrowing records, and make
              library access smarter and faster.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link
                to="/signUp"
                className="btn btn-primary btn-lg rounded-pill shadow-sm px-2.2"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="btn btn-outline-primary btn-lg rounded-pill px-2.2"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
