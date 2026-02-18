// import React from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import logo from "../assets/images/griet_logo.jpeg";

// export default function Navbar({ role, onLogout }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogoutClick = () => {
//     onLogout(); // clears role, token, userId
//     navigate("/login");
//   };

//   const showHomeButton = location.pathname === "/login" || location.pathname === "/signUp";

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
//       <div className="container-fluid">
//         <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
//   <img 
//     src={logo} 
//     alt="GRIET Logo" 
//     style={{ height: "55px", width: "350px", borderRadius:"5px"}} 
//   />
// </Link>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto align-items-center">
//             {showHomeButton && (
//               <li className="nav-item ms-3">
//                 <button
//                   className="btn btn-outline-secondary btn-sm px-3 py-1 rounded-pill"
//                   onClick={() => navigate("/")}
//                 >
//                   🏠 Home
//                 </button>
//               </li>
//             )}

//             {role === "ADMIN" && (
//               <>
//                 <li className="nav-item">
//                   <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/admin">Dashboard</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/books">All Books</NavLink>
//                 </li>
//                 {/* <li className="nav-item">
//                   <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/library-info">Library Info</NavLink>
//                 </li> */}
//                 <li className="nav-item">
//                   <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/admin/students">Students</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/admin/transactions">Transaction History</NavLink>
//                 </li>
//               </>
//             )}

//             {role === "STUDENT" && (
//               <>
//               <li className="nav-item">
//                   <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/student">Dashboard</NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/books">All Books</NavLink>
//                 </li>
//                 {/* <li className="nav-item">
//                   <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/library-info">Library Info</NavLink>
//                 </li> */}
//                 <li className="nav-item">
//                   <NavLink className={({ isActive }) => `nav-link ${isActive ? "active fw-bold text-info" : ""}`} to="/issued-books">My Issued Books</NavLink>
//                 </li>
//               </>
//             )}

//             {!role && (
//               <li className="nav-item ms-3">
//                 <NavLink className="btn btn-outline-light btn-sm px-3 py-1 rounded-pill" to="/login">
//                   🔑 Login
//                 </NavLink>
//               </li>
//             )}

//             {role && (
//               <li className="nav-item ms-3 d-flex align-items-center">
//                 <span className="badge bg-info text-dark me-3 px-3 py-2 rounded-pill">{role}</span>
//                 <button className="btn btn-danger btn-sm px-3 py-1 rounded-pill shadow-sm" onClick={handleLogoutClick}>
//                   🚪 Logout
//                 </button>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }




import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/griet_logo.jpeg";

export default function Navbar({ role, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  const showHomeButton =
    location.pathname === "/login" || location.pathname === "/signUp";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm sticky-top">
      <div className="container-fluid px-4">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="GRIET Logo"
            style={{
              height: "46px",
              maxWidth: "275px",
              objectFit: "contain",
              borderRadius: "5px",
            }}
          />
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">

            {showHomeButton && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                  onClick={() => navigate("/")}
                >
                  🏠 Home
                </button>
              </li>
            )}

            {/* ADMIN MENU */}
            {role === "ADMIN" && (
              <>
                <NavItem to="/admin" label="Dashboard" />
                <NavItem to="/books" label="All Books" />
                <NavItem to="/admin/students" label="Students" />
                {/* <NavItem to="/admin/transactions" label="Transactions" /> */}
              </>
            )}

            {/* STUDENT MENU */}
            {role === "STUDENT" && (
              <>
                <NavItem to="/student" label="Dashboard" />
                <NavItem to="/books" label="All Books" />
                <NavItem to="/issued-books" label="My Books" />
              </>
            )}

            {/* LOGIN */}
            {!role && (
              <li className="nav-item ms-2">
                <NavLink
                  className="btn btn-outline-light btn-sm rounded-pill px-3"
                  to="/login"
                >
                  🔑 Login
                </NavLink>
              </li>
            )}

            {/* ROLE + LOGOUT */}
            {role && (
              <li className="nav-item d-flex align-items-center ms-2">
                <span className="badge bg-info text-dark px-3 py-2 rounded-pill me-2">
                  {role}
                </span>
                <button
                  className="btn btn-danger btn-sm rounded-pill px-3"
                  onClick={handleLogoutClick}
                >
                  🚪 Logout
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

/* Reusable Nav Item */
function NavItem({ to, label }) {
  return (
    <li className="nav-item">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `nav-link px-3 ${
            isActive ? "active fw-semibold text-info" : ""
          }`
        }
      >
        {label}
      </NavLink>
    </li>
  );
}
