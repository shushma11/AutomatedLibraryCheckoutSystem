import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== roleRequired) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
