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




































































// import React, { useState, useEffect } from "react";
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

// export default function Navbar({ role, onLogout }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [scrolled, setScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogoutClick = () => {
//     onLogout();
//     navigate("/login");
//   };

//   const showHomeButton =
//     location.pathname === "/login" || location.pathname === "/signUp";

//   const closeMenu = () => setIsMenuOpen(false);

//   // Styles
//   const styles = {
//     navbar: {
//       position: "sticky",
//       top: 0,
//       zIndex: 1000,
//       background: scrolled 
//         ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" 
//         : "linear-gradient(135deg, #1a1c1e 0%, #2c3e50 100%)",
//       backdropFilter: scrolled ? "blur(10px)" : "none",
//       boxShadow: scrolled 
//         ? "0 4px 30px rgba(0, 0, 0, 0.2)" 
//         : "0 2px 20px rgba(0, 0, 0, 0.1)",
//       transition: "all 0.3s ease",
//       padding: "0.6rem 0",
//     },

//     container: {
//       maxWidth: "1400px",
//       margin: "0 auto",
//       padding: "0 0.1rem",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },

//     // Logo Styles - Updated to text only
//     logoWrapper: {
//       textDecoration: "none",
//       transition: "transform 0.3s ease",
//       cursor: "pointer",
//     },

//     logoContainer: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "flex-start",
//     },

//     logoText: {
//       fontSize: "1.4rem",
//       fontWeight: "700",
//       background: "linear-gradient(135deg, #fff 0%, #3498db 100%)",
//       WebkitBackgroundClip: "text",
//       WebkitTextFillColor: "transparent",
//       letterSpacing: "0.5px",
//       lineHeight: "1.2",
//     },

//     logoSubtext: {
//       fontSize: "0.7rem",
//       color: "#95a5a6",
//       letterSpacing: "1px",
//       fontWeight: "400",
//       marginTop: "2px",
//     },

//     // Mobile Menu Toggle
//     menuToggle: {
//       display: "none",
//       flexDirection: "column",
//       justifyContent: "space-between",
//       width: "30px",
//       height: "21px",
//       background: "transparent",
//       border: "none",
//       cursor: "pointer",
//       padding: 0,
//       zIndex: 10,
//     },

//     menuToggleSpan: (index) => ({
//       width: "100%",
//       height: "3px",
//       background: "white",
//       borderRadius: "3px",
//       transition: "all 0.3s ease",
//       transform: isMenuOpen 
//         ? index === 0 
//           ? "rotate(45deg) translate(6px, 6px)" 
//           : index === 2 
//             ? "rotate(-45deg) translate(6px, -6px)" 
//             : "scale(0)"
//         : "none",
//       opacity: isMenuOpen && index === 1 ? 0 : 1,
//     }),

//     // Navigation Menu
//     navMenu: {
//       display: "flex",
//       alignItems: "center",
//       transition: "all 0.3s ease",
//     },

//     navList: {
//       display: "flex",
//       alignItems: "center",
//       gap: "0.5rem",
//       listStyle: "none",
//       margin: 0,
//       padding: 0,
//     },

//     // Nav Items
//     navItem: {
//       position: "relative",
//     },

//     // Home Button
//     homeBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       padding: "0.6rem 1rem",
//       background: "rgba(52, 152, 219, 0.1)",
//       border: "2px solid rgba(52, 152, 219, 0.3)",
//       borderRadius: "30px",
//       color: "#ecf0f1",
//       fontWeight: "500",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//     },

//     btnIcon: {
//       fontSize: "1rem",
//     },

//     // Auth Section
//     authSection: {
//       marginLeft: "1rem",
//     },

//     loginBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       padding: "0.6rem 1.5rem",
//       background: "linear-gradient(135deg, #3498db, #2980b9)",
//       border: "none",
//       borderRadius: "30px",
//       color: "white",
//       fontWeight: "600",
//       textDecoration: "none",
//       transition: "all 0.3s ease",
//       boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
//       cursor: "pointer",
//     },

//     userInfo: {
//       display: "flex",
//       alignItems: "center",
//       gap: "1rem",
//     },

//     roleBadge: (role) => ({
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       padding: "0.5rem 1rem",
//       background: role === "ADMIN" 
//         ? "linear-gradient(135deg, #f39c12, #e67e22)" 
//         : "linear-gradient(135deg, #2ecc71, #27ae60)",
//       borderRadius: "30px",
//       color: "white",
//       fontWeight: "600",
//       fontSize: "1rem",
//       boxShadow: role === "ADMIN" 
//         ? "0 4px 15px rgba(243, 156, 18, 0.3)" 
//         : "0 4px 15px rgba(46, 204, 113, 0.3)",
//     }),

//     roleIcon: {
//       fontSize: "1rem",
//     },

//     logoutBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "6px",
//       padding: "0.5rem 1.2rem",
//       background: "linear-gradient(135deg, #e74c3c, #c0392b)",
//       border: "none",
//       borderRadius: "30px",
//       color: "white",
//       fontWeight: "600",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//       boxShadow: "0 4px 15px rgba(231, 76, 60, 0.3)",
//     },
//   };

//   // Merge mobile styles
//   const isMobile = window.innerWidth <= 768;

//   return (
//     <nav style={styles.navbar}>
//       <div style={styles.container}>
//         {/* Logo Section - Text Only */}
//         <Link 
//           style={styles.logoWrapper} 
//           to="/" 
//           onClick={closeMenu}
//           onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
//           onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
//         >
//           <div style={styles.logoContainer}>
//             <span style={styles.logoText}>
//               Gokaraju Rangaraju Institute of Engineering and Technology
//             </span>
//           </div>
//         </Link>

//         {/* Mobile Menu Button */}
//         <button
//           style={{...styles.menuToggle, display: isMobile ? "flex" : "none"}}
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           <span style={styles.menuToggleSpan(0)}></span>
//           <span style={styles.menuToggleSpan(1)}></span>
//           <span style={styles.menuToggleSpan(2)}></span>
//         </button>

//         {/* Navigation Menu */}
//         <div style={{
//           ...styles.navMenu,
//           position: isMobile ? "fixed" : "static",
//           top: isMobile ? "80px" : "auto",
//           left: 0,
//           right: 0,
//           background: isMobile ? "linear-gradient(135deg, #1a1c1e 0%, #2c3e50 100%)" : "transparent",
//           padding: isMobile ? "2rem" : 0,
//           clipPath: isMobile 
//             ? isMenuOpen ? "circle(1000px at 100% 0%)" : "circle(0px at 100% 0%)"
//             : "none",
//           flexDirection: isMobile ? "column" : "row",
//           alignItems: isMobile ? "stretch" : "center",
//           pointerEvents: isMobile && !isMenuOpen ? "none" : "auto",
//         }}>
//           <ul style={{
//             ...styles.navList,
//             flexDirection: isMobile ? "column" : "row",
//             gap: isMobile ? "1rem" : "0.5rem",
//           }}>
//             {showHomeButton && (
//               <li style={styles.navItem}>
//                 <button
//                   style={{
//                     ...styles.homeBtn,
//                     width: isMobile ? "100%" : "auto",
//                     justifyContent: "center",
//                   }}
//                   onClick={() => {
//                     navigate("/");
//                     closeMenu();
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "rgba(52, 152, 219, 0.2)";
//                     e.currentTarget.style.borderColor = "#3498db";
//                     e.currentTarget.style.transform = "translateY(-2px)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "rgba(52, 152, 219, 0.1)";
//                     e.currentTarget.style.borderColor = "rgba(52, 152, 219, 0.3)";
//                     e.currentTarget.style.transform = "translateY(0)";
//                   }}
//                 >
//                   <span style={styles.btnIcon}>🏠</span>
//                   <span>Home</span>
//                 </button>
//               </li>
//             )}

//             {/* ADMIN MENU */}
//             {role === "ADMIN" && (
//               <>
//                 <NavItem 
//                   to="/admin" 
//                   label="Dashboard" 
//                   onClick={closeMenu}
//                   isMobile={isMobile}
//                 />
//                 <NavItem 
//                   to="/books" 
//                   label="All Books" 
//                   onClick={closeMenu}
//                   isMobile={isMobile}
//                 />
//                 <NavItem 
//                   to="/admin/students" 
//                   label="Students" 
//                   onClick={closeMenu}
//                   isMobile={isMobile}
//                 />
//               </>
//             )}

//             {/* STUDENT MENU */}
//             {role === "STUDENT" && (
//               <>
//                 <NavItem 
//                   to="/student" 
//                   label="Dashboard" 
//                   onClick={closeMenu}
//                   isMobile={isMobile}
//                 />
//                 <NavItem 
//                   to="/books" 
//                   label="All Books" 
//                   onClick={closeMenu}
//                   isMobile={isMobile}
//                 />
//                 <NavItem 
//                   to="/issued-books" 
//                   label="My Books" 
//                   onClick={closeMenu}
//                   isMobile={isMobile}
//                 />
//               </>
//             )}

//             {/* Auth Section */}
//             <li style={{
//               ...styles.authSection,
//               marginLeft: isMobile ? 0 : "1rem",
//               marginTop: isMobile ? "1rem" : 0,
//             }}>
//               {!role ? (
//                 <NavLink
//                   to="/login"
//                   style={{
//                     ...styles.loginBtn,
//                     width: isMobile ? "100%" : "auto",
//                     justifyContent: "center",
//                   }}
//                   onClick={closeMenu}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-2px)";
//                     e.currentTarget.style.boxShadow = "0 6px 20px rgba(52, 152, 219, 0.4)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow = "0 4px 15px rgba(52, 152, 219, 0.3)";
//                   }}
//                 >
//                   <span style={styles.btnIcon}>🔑</span>
//                   <span>Login</span>
//                 </NavLink>
//               ) : (
//                 <div style={{
//                   ...styles.userInfo,
//                   flexDirection: isMobile ? "column" : "row",
//                   gap: isMobile ? "0.8rem" : "1rem",
//                 }}>
//                   <span style={styles.roleBadge(role)}>
//                     <span style={styles.roleIcon}>
//                       {role === "ADMIN" ? "👑" : "👨‍🎓"}
//                     </span>
//                     {role}
//                   </span>
//                   <button
//                     style={{
//                       ...styles.logoutBtn,
//                       width: isMobile ? "100%" : "auto",
//                       justifyContent: "center",
//                     }}
//                     onClick={handleLogoutClick}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-2px)";
//                       e.currentTarget.style.boxShadow = "0 6px 20px rgba(231, 76, 60, 0.4)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)";
//                       e.currentTarget.style.boxShadow = "0 4px 15px rgba(231, 76, 60, 0.3)";
//                     }}
//                   >
//                     <span style={styles.btnIcon}>🚪</span>
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               )}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// /* Reusable Nav Item with animations */
// function NavItem({ to, label, onClick, isMobile }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <li style={{ position: "relative" }}>
//       <NavLink
//         to={to}
//         style={({ isActive }) => ({
//           position: "relative",
//           display: "inline-block",
//           padding: "0.3rem 1rem",
//           color: isActive ? "#3498db" : "#ecf0f1",
//           textDecoration: "none",
//           fontWeight: isActive ? "600" : "500",
//           fontSize: "1rem",
//           borderRadius: "8px",
//           transition: "all 0.3s ease",
//           overflow: "hidden",
//           cursor: "pointer",
//           width: isMobile ? "100%" : "auto",
//           textAlign: isMobile ? "center" : "left",
//         })}
//         onClick={onClick}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
//         <span style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           width: "100%",
//           height: isHovered ? "100%" : "0",
//           background: "linear-gradient(135deg, #3498db, #2980b9)",
//           transition: "height 0.3s ease",
//           opacity: 0.2,
//           zIndex: 0,
//         }}></span>
//       </NavLink>
//     </li>
//   );
// }













