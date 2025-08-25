import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Components/Welcome";
import LoginSignup from "./Components/LoginSignup";
import AdminDashboard from "./Components/AdminDashboard";
import AllBooksPage from "./Components/AllBooksPage";
import LibraryInfo from "./Components/LibraryInfo";
import Navbar from "./Components/Navbar";
import IssuedBooks from "./Components/IssuedBooks";
import StudentDashboard from "./Components/StudentDashboard";
import LoginDashboard from "./Components/LoginDashboard";

function App() {
  const [role, setRole] = useState(null);

  const handleLogout = () => setRole(null);

  return (
    <Router>
      <Navbar role={role} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginDashboard setRole={setRole} />} />
        <Route path="/signUp" element={<LoginSignup/>}/>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/books" element={<AllBooksPage role={role} />} />
        <Route path="/library-info" element={<LibraryInfo />} />
        <Route path="/issued-books" element={<IssuedBooks />} />
        <Route path="/student" element={<StudentDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
