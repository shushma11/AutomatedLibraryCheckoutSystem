import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
      }}
    >
      <div className="row w-100">
        {/* Left Half - Image */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <motion.img
            src="/images/firstImg.png"
            alt="Library"
            className="img-fluid rounded shadow-lg"
            style={{
              maxHeight: "80%",
              objectFit: "cover",
              borderRadius: "20px",
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
          />
        </div>

        {/* Right Half - Content */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-start p-5">
          <motion.h1
            className="fw-bold mb-3"
            style={{ fontSize: "2.8rem", color: "#2c3e50", lineHeight: "1.3" }}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <br /> Library Management System
          </motion.h1>

          <motion.p
            className="text-muted mb-4"
            style={{ fontSize: "1.2rem" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            📚 Manage books, track records, and make library access smarter.
          </motion.p>

          <motion.div
            className="d-flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/signUp"
              className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
              style={{ fontWeight: "500" }}
            >
              🚀 Get Started
            </Link>
            <Link
              to="/login"
              className="btn btn-outline-primary px-4 py-2 rounded-pill"
              style={{ fontWeight: "500" }}
            >
              🔑 Login
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
