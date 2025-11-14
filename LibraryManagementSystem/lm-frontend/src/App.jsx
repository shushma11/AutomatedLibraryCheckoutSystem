import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./Components/Welcome";
import LoginSignup from "./Components/LoginSignup";
import AdminDashboard from "./Components/AdminDashboard";
import StudentDashboard from "./Components/StudentDashboard";
import AllBooksPage from "./Components/AllBooksPage";
import LibraryInfo from "./Components/LibraryInfo";
import Navbar from "./Components/Navbar";
import IssuedBooks from "./Components/IssuedBooks";
import LoginDashboard from "./Components/LoginDashboard";
import StudentList from "./Components/StudentList";
import ProtectedRoute from "./Components/ProtectedRoute";
import TransactionHistory from "./Components/TransactionHistory";
import axios from "axios";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : null
  );

  // LIFTED ISSUED BOOKS STATE
  const [issuedBooks, setIssuedBooks] = useState([]);

  // Fetch issued books
  const fetchIssuedBooks = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/issued/user/${userId}`);
      setIssuedBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setIssuedBooks([]);
    }
  };

  useEffect(() => {
    if (role) localStorage.setItem("role", role); else localStorage.removeItem("role");
    if (token) localStorage.setItem("token", token); else localStorage.removeItem("token");
    if (userId) localStorage.setItem("userId", userId); else localStorage.removeItem("userId");

    // Fetch issued books whenever userId changes
    fetchIssuedBooks();
  }, [role, token, userId]);

  const handleLogout = () => {
    setRole(null);
    setToken(null);
    setUserId(null);
    localStorage.clear();
    setIssuedBooks([]);
  };

  return (
    <Router>
      <Navbar role={role} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginDashboard setRole={setRole} setUserId={setUserId} setToken={setToken} />} />
        <Route path="/signUp" element={<LoginSignup />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute roleRequired="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <ProtectedRoute roleRequired="ADMIN">
            <StudentList />
          </ProtectedRoute>
        } />

        {/* Student Routes */}
        <Route path="/student" element={
          <ProtectedRoute roleRequired="STUDENT">
            <StudentDashboard userId={userId} />
          </ProtectedRoute>
        } />

        {/* Shared Pages */}
        <Route path="/books" element={
          <AllBooksPage
            role={role}
            userId={userId}
            issuedBooks={issuedBooks}
            refreshIssuedBooks={fetchIssuedBooks}
          />
        } />
        <Route path="/library-info" element={<LibraryInfo />} />
        <Route path="/issued-books" element={
          <IssuedBooks userId={userId} issuedBooks={issuedBooks} />
        } />

        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/admin/transactions" element={
  <ProtectedRoute roleRequired="ADMIN">
    <TransactionHistory />
  </ProtectedRoute>
} />

      </Routes>
    </Router>
  );
}

export default App;
