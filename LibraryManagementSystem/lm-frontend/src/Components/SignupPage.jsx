//17th final
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";

// export default function LoginSignup() {
//   const [pname, setPname] = useState("");
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rollno, setRollno] = useState("");
//   const [year, setYear] = useState("");
//   const [branch, setBranch] = useState("");
//   const [section, setSection] = useState("");
//   const [secretKey, setSecretKey] = useState("");
//   const [rfidTagId, setRfidTagId] = useState("");
//   const [scanning, setScanning] = useState(false);

//   const navigate = useNavigate();
//   const pollRef = useRef(null);


//   // ================= SIGNUP =================
//   const handleSignUp = async () => {
//     try {
//       const payload = {
//         name: pname,
//         email,
//         password,
//         role,
//         secretKey,
//       };

//       if (role === "Student") {
//         payload.rollNo = rollno;
//         payload.year = year;
//         payload.branch = branch;
//         payload.section = section;
//         payload.rfidTagId = rfidTagId;
//       }

//       await axios.post(
//         "http://localhost:8080/api/auth/signup",
//         payload
//       );

//       alert("Signup successful!");
//       navigate("/login");
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//         "Signup failed"
//       );
//     }
//   };

  
// const handleScanRfid = async () => {

//   if (!secretKey) {
//     alert("Enter secret key first");
//     return;
//   }

//   setScanning(true);

//   try {
//     // STEP 1: Verify admin
//     await axios.post(
//       "http://localhost:8080/api/rfid/scan-admin",
//       { secretKey }
//     );
//   } catch {
//     alert("Secret key incorrect");
//     setScanning(false);
//     return;
//   }

//   // STEP 2: Poll for RFID (max 30 seconds)
//   let attempts = 0;

//   pollRef.current = setInterval(async () => {
//     attempts++;

//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/rfid/latest"
//       );

//       if (res.data.rfidTagId) {
//         setRfidTagId(res.data.rfidTagId);
//         clearInterval(pollRef.current);
//         setScanning(false);
//         alert("RFID captured successfully!");
//       }

//     } catch {
//       console.log("Waiting for RFID...");
//     }

//     // ⏱ STOP AFTER 30 SECONDS
//     if (attempts >= 15) {
//       clearInterval(pollRef.current);
//       setScanning(false);
//       alert("RFID scan timed out");
//     }

//   }, 2000);
// };


//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card shadow-lg p-4" style={{ width: "420px" }}>
//         <h2 className="text-center mb-4 text-success">Sign Up</h2>

//         {/* ROLE */}
//         <select
//           className="form-control mb-3"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="">Select Role</option>
//           <option value="Admin">Admin</option>
//           <option value="Student">Student</option>
//         </select>

//         {/* NAME */}
//         <input
//           className="form-control mb-3"
//           placeholder="Full Name"
//           value={pname}
//           onChange={(e) => setPname(e.target.value)}
//         />

//         {/* STUDENT FIELDS */}
//         {role === "Student" && (
//           <>
//             <input className="form-control mb-3" placeholder="Roll No"
//               value={rollno} onChange={(e) => setRollno(e.target.value)} />

//             <input className="form-control mb-3" placeholder="Year"
//               value={year} onChange={(e) => setYear(e.target.value)} />

//             <input className="form-control mb-3" placeholder="Branch"
//               value={branch} onChange={(e) => setBranch(e.target.value)} />

//             <input className="form-control mb-3" placeholder="Section"
//               value={section} onChange={(e) => setSection(e.target.value)} />

//             <button
//               className="btn btn-outline-primary mb-3"
//               disabled={scanning}
//               onClick={handleScanRfid}
//             >
//               {scanning ? "Scanning..." : "Scan RFID Card"}
//             </button>

//             <input
//               className="form-control mb-3"
//               placeholder="RFID Tag ID"
//               value={rfidTagId}
//               readOnly
//             />
//           </>
//         )}

//         {/* SECRET KEY */}
//         <input
//           type="password"
//           className="form-control mb-3"
//           placeholder="Secret Key"
//           value={secretKey}
//           onChange={(e) => setSecretKey(e.target.value)}
//         />

//         {/* EMAIL */}
//         <input
//           className="form-control mb-3"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* PASSWORD */}
//         <input
//           type="password"
//           className="form-control mb-3"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="btn btn-success w-100" onClick={handleSignUp}>
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// }









// 18th first try
// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [pname, setPname] = useState("");
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rollno, setRollno] = useState("");
//   const [year, setYear] = useState("");
//   const [branch, setBranch] = useState("");
//   const [section, setSection] = useState("");
//   const [secretKey, setSecretKey] = useState("");
//   const [rfidTagId, setRfidTagId] = useState("");
//   const [scanning, setScanning] = useState(false);

//   const navigate = useNavigate();
//   const pollRef = useRef(null);

//   // ================= SIGNUP =================
//   const handleSignUp = async () => {
//     try {
//       const payload = {
//         name: pname,
//         email,
//         password,
//         role,
//         secretKey,
//       };

//       if (role === "Student") {
//         payload.rollNo = rollno;
//         payload.year = year;
//         payload.branch = branch;
//         payload.section = section;
//         payload.rfidTagId = rfidTagId;
//       }

//       await axios.post("http://localhost:8080/api/auth/signup", payload);

//       alert("User created successfully!");
//       navigate("/login");
//     } catch (error) {
//       alert(error.response?.data?.message || "Signup failed");
//     }
//   };

//   // ================= RFID SCAN =================
//   const handleScanRfid = async () => {
//     if (!secretKey) {
//       alert("Enter secret key first");
//       return;
//     }

//     setScanning(true);

//     try {
//       await axios.post("http://localhost:8080/api/rfid/scan-admin", {
//         secretKey,
//       });
//     } catch {
//       alert("Secret key incorrect");
//       setScanning(false);
//       return;
//     }

//     let attempts = 0;

//     pollRef.current = setInterval(async () => {
//       attempts++;

//       try {
//         const res = await axios.get("http://localhost:8080/api/rfid/latest");

//         if (res.data.rfidTagId) {
//           setRfidTagId(res.data.rfidTagId);
//           clearInterval(pollRef.current);
//           setScanning(false);
//           alert("RFID captured successfully!");
//         }
//       } catch {}

//       if (attempts >= 15) {
//         clearInterval(pollRef.current);
//         setScanning(false);
//         alert("RFID scan timed out");
//       }
//     }, 2000);
//   };
//   return (
//   <div className="d-flex justify-content-center align-items-center bg-light"
//     style={{ minHeight: "calc(100vh - 75px)" }}
//   >
//     <div
//       className="card shadow-lg p-4"
//       style={{ width: "450px", maxHeight: "87vh" }}
//     >
//       <h3 className="text-center text-primary fw-bold">
//         🔐 Admin User Registration
//       </h3>
//       <p className="text-center text-muted mb-3">
//         Only admins can add new users
//       </p>

//       {/* ROLE */}
//       <select
//         className="form-select mb-3"
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//       >
//         <option value="">Select Role</option>
//         <option value="Admin">Admin</option>
//         <option value="Student">Student</option>
//       </select>

//       {/* BASIC DETAILS (ALWAYS VISIBLE) */}
//       <input
//         className="form-control mb-2"
//         placeholder="Full Name"
//         value={pname}
//         onChange={(e) => setPname(e.target.value)}
//       />

//       <input
//         className="form-control mb-2"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         className="form-control mb-2"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       /> 

//       <input
//         type="password"
//         className="form-control mb-3"
//         placeholder="Admin Secret Key"
//         value={secretKey}
//         onChange={(e) => setSecretKey(e.target.value)}
//       />

//       {/* STUDENT DETAILS (SCROLLABLE BOX) */}
//       {role === "Student" && (
//         <div
//           className="border rounded p-3 mb-3"
//           style={{
//             maxHeight: "230px",
//             overflowY: "auto",
//             backgroundColor: "#f8f9fa",
//           }}
//         >
//           <h6 className="text-secondary fw-bold mb-2">
//             🎓 Student Details
//           </h6>

//           <input
//             className="form-control mb-2"
//             placeholder="Roll No"
//             value={rollno}
//             onChange={(e) => setRollno(e.target.value)}
//           />

//           {/* <input
//             className="form-control mb-2"
//             placeholder="Year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           /> */}
//           <select
//   className="form-select mb-2"
//   value={year}
//   onChange={(e) => setYear(e.target.value)}
// >
//   <option value="" disabled>
//     Select Year
//   </option>
//   <option value="I">I</option>
//   <option value="II">II</option>
//   <option value="III">III</option>
//   <option value="IV">IV</option>
// </select>


//           <input
//             className="form-control mb-2"
//             placeholder="Branch"
//             value={branch}
//             onChange={(e) => setBranch(e.target.value)}
//           />

//           <input
//             className="form-control mb-2"
//             placeholder="Section"
//             value={section}
//             onChange={(e) => setSection(e.target.value)}
//           />

//           <button
//             className="btn btn-outline-primary w-100 mb-2"
//             disabled={scanning}
//             onClick={handleScanRfid}
//           >
//             {scanning ? "Scanning RFID..." : "📡 Scan RFID Card"}
//           </button>

//           <input
//             className="form-control"
//             placeholder="RFID Tag ID"
//             value={rfidTagId}
//             readOnly
//           />
//         </div>
//       )}

//       {/* SUBMIT */}
//       <button
//         className="btn btn-success w-100 fw-bold"
//         onClick={handleSignUp}
//         disabled={!role || !pname || !email || !password || !secretKey}
//       >
//         ➕ Create User
//       </button>
//     </div>
//   </div>
// );

  // return (
  //   <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  //     <div className="card shadow-lg p-4" style={{ width: "450px" }}>
  //       <h3 className="text-center text-primary fw-bold">
  //         🔐 Admin User Registration
  //       </h3>
  //       <p className="text-center text-muted mb-4">
  //         Only admins can add new users
  //       </p>

  //       {/* ROLE */}
  //       <select
  //         className="form-select mb-3"
  //         value={role}
  //         onChange={(e) => setRole(e.target.value)}
  //       >
  //         <option value="">Select Role</option>
  //         <option value="Admin">Admin</option>
  //         <option value="Student">Student</option>
  //       </select>

  //       {/* BASIC DETAILS */}
  //       <input
  //         className="form-control mb-3"
  //         placeholder="Full Name"
  //         value={pname}
  //         onChange={(e) => setPname(e.target.value)}
  //       />

  //       <input
  //         className="form-control mb-3"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />

  //       <input
  //         type="password"
  //         className="form-control mb-3"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />

  //       <input
  //         type="password"
  //         className="form-control mb-3"
  //         placeholder="Admin Secret Key"
  //         value={secretKey}
  //         onChange={(e) => setSecretKey(e.target.value)}
  //       />

  //       {/* STUDENT SECTION */}
  //       {role === "Student" && (
  //         <div className="border rounded p-3 mb-3 bg-light">
  //           <h6 className="text-secondary fw-bold mb-3">
  //             🎓 Student Details
  //           </h6>

  //           <input
  //             className="form-control mb-2"
  //             placeholder="Roll No"
  //             value={rollno}
  //             onChange={(e) => setRollno(e.target.value)}
  //           />

  //           <input
  //             className="form-control mb-2"
  //             placeholder="Year"
  //             value={year}
  //             onChange={(e) => setYear(e.target.value)}
  //           />

  //           <input
  //             className="form-control mb-2"
  //             placeholder="Branch"
  //             value={branch}
  //             onChange={(e) => setBranch(e.target.value)}
  //           />

  //           <input
  //             className="form-control mb-3"
  //             placeholder="Section"
  //             value={section}
  //             onChange={(e) => setSection(e.target.value)}
  //           />

  //           <button
  //             className="btn btn-outline-primary w-100 mb-2"
  //             disabled={scanning}
  //             onClick={handleScanRfid}
  //           >
  //             {scanning ? "Scanning RFID..." : "📡 Scan RFID Card"}
  //           </button>

  //           <input
  //             className="form-control"
  //             placeholder="RFID Tag ID"
  //             value={rfidTagId}
  //             readOnly
  //           />
  //         </div>
  //       )}

  //       <button
  //         className="btn btn-success w-100 fw-bold"
  //         onClick={handleSignUp}
  //         disabled={!role || !pname || !email || !password || !secretKey}
  //       >
  //         ➕ Create User
  //       </button>
  //     </div>
  //   </div>
  // );
// }















// 18th 2nd try

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [pname, setPname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollno, setRollno] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [rfidTagId, setRfidTagId] = useState("");
  const [scanning, setScanning] = useState(false);

  const navigate = useNavigate();
  const pollRef = useRef(null);

  // 🧹 Cleanup polling on unmount
  useEffect(() => {
    return () => clearInterval(pollRef.current);
  }, []);

  // ================= SIGNUP =================
  const handleSignUp = async () => {
    try {
      const payload = {
        name: pname,
        email,
        password,
        role,
        secretKey,
      };

      if (role === "Student") {
        payload.rollNo = rollno;
        payload.year = year;
        payload.branch = branch;
        payload.section = section;
        payload.rfidTagId = rfidTagId;
      }

      await axios.post("http://localhost:8080/api/auth/signup", payload);

      alert("User created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  // ================= RFID SCAN =================
  const handleScanRfid = async () => {
    if (!secretKey) {
      alert("Enter secret key first");
      return;
    }

    setScanning(true);

    try {
      await axios.post("http://localhost:8080/api/rfid/scan-admin", {
        secretKey,
      });
    } catch {
      alert("Secret key incorrect");
      setScanning(false);
      return;
    }

    let attempts = 0;

    pollRef.current = setInterval(async () => {
      attempts++;

      try {
        const res = await axios.get("http://localhost:8080/api/rfid/latest");

        if (res.data.rfidTagId) {
          setRfidTagId(res.data.rfidTagId);
          clearInterval(pollRef.current);
          setScanning(false);
          alert("RFID captured successfully!");
        }
      } catch {}

      if (attempts >= 15) {
        clearInterval(pollRef.current);
        setScanning(false);
        alert("RFID scan timed out");
      }
    }, 2000);
  };

  // ✅ Student validation
  const isStudentInvalid =
    role === "Student" &&
    (!rollno || !year || !branch || !section || !rfidTagId);

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "calc(100vh - 73px)" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "450px", maxHeight: "87vh" }}>
        <h3 className="text-center text-primary fw-bold">
          🔐 Admin User Registration
        </h3>
        <p className="text-center text-muted mb-3">
          Only admins can add new users
        </p>

        {/* ROLE */}
        <select
          className="form-select mb-3"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            // 🧹 clear student data when role changes
            setRollno("");
            setYear("");
            setBranch("");
            setSection("");
            setRfidTagId("");
          }}
        >
          <option value="">Select Whom to Add</option>
          <option value="Admin">Admin</option>
          <option value="Student">Student</option>
        </select>

        
        {role === "Admin" && (
  <>

          <input
          type="password"
          className="form-control mb-3"
          placeholder="Admin Secret Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
    <input
      className="form-control mb-2"
      placeholder="Full Name"
      value={pname}
      onChange={(e) => setPname(e.target.value)}
    />

    <input
      className="form-control mb-2"
      placeholder="Set Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      className="form-control mb-2"
      placeholder="Set Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </>
)}

        {/* STUDENT DETAILS */}
        {role === "Student" && (
          <div
            className="border rounded p-3 mb-3"
            style={{
              maxHeight: "230px",
              overflowY: "auto",
              backgroundColor: "#f8f9fa",
            }}
          >
            <h6 className="text-secondary fw-bold mb-2">
              🎓 Student Details
            </h6>

            <input
          type="password"
          className="form-control mb-3"
          placeholder="Admin Secret Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />

             <input
          className="form-control mb-2"
          placeholder="Full Name"
          value={pname}
          onChange={(e) => setPname(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Set Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Set Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
            <input
              className="form-control mb-2"
              placeholder="Roll No"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
            />

            <select
              className="form-select mb-2"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="" disabled>
                Select Year
              </option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>

            <input
              className="form-control mb-2"
              placeholder="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />

            <input
              className="form-control mb-2"
              placeholder="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />

            <button
              className="btn btn-outline-primary w-100 mb-2"
              disabled={scanning}
              onClick={handleScanRfid}
            >
              {scanning ? "Scanning RFID..." : "📡 Scan RFID Card"}
            </button>

            <input
              className="form-control"
              placeholder="RFID Tag ID"
              value={rfidTagId}
              readOnly
            />
          </div>
        )}

        {/* SUBMIT */}
        <button
          className="btn btn-success w-100 fw-bold"
          onClick={handleSignUp}
          disabled={
            !role ||
            !pname ||
            !email ||
            !password ||
            !secretKey ||
            isStudentInvalid
          }
        >
          ➕ Create User
        </button>
      </div>
    </div>
  );
}
















// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Student fields
//   const [rollNo, setRollNo] = useState("");
//   const [year, setYear] = useState("");
//   const [branch, setBranch] = useState("");
//   const [section, setSection] = useState("");

//   // Admin only
//   const [secretKey, setSecretKey] = useState("");

//   const navigate = useNavigate();

//   const handleSignUp = async () => {
//     try {
//       const payload = {
//         name,
//         email,
//         password,
//         role
//       };

//       if (role === "ADMIN") {
//         payload.secretKey = secretKey;
//       }

//       if (role === "STUDENT") {
//         payload.rollNo = rollNo;
//         payload.year = year;
//         payload.branch = branch;
//         payload.section = section;
//       }

//       await axios.post("http://localhost:8080/api/auth/signup", payload);

//       alert("Signup successful!");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data || "Signup failed");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card p-4 shadow" style={{ width: "420px" }}>
//         <h3 className="text-center mb-3">Signup</h3>

//         <select className="form-control mb-3" onChange={e => setRole(e.target.value)}>
//           <option value="">Select Role</option>
//           <option value="ADMIN">Admin</option>
//           <option value="STUDENT">Student</option>
//         </select>

//         <input className="form-control mb-3" placeholder="Name" onChange={e => setName(e.target.value)} />

//         {role === "STUDENT" && (
//           <>
//             <input className="form-control mb-2" placeholder="Roll No" onChange={e => setRollNo(e.target.value)} />
//             <input className="form-control mb-2" placeholder="Year" onChange={e => setYear(e.target.value)} />
//             <input className="form-control mb-2" placeholder="Branch" onChange={e => setBranch(e.target.value)} />
//             <input className="form-control mb-2" placeholder="Section" onChange={e => setSection(e.target.value)} />
//           </>
//         )}

//         {role === "ADMIN" && (
//           <input
//             type="password"
//             className="form-control mb-3"
//             placeholder="Admin Secret Key"
//             onChange={e => setSecretKey(e.target.value)}
//           />
//         )}

//         <input className="form-control mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
//         <input type="password" className="form-control mb-3" placeholder="Password" onChange={e => setPassword(e.target.value)} />

//         <button className="btn btn-success w-100" onClick={handleSignUp}>
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// }

















// ================= RFID SCAN (ADMIN ONLY) =================
//  const handleScanRfid = async () => {

//   if (!secretKey) {
//     alert("Enter secret key first");
//     return;
//   }

//   setScanning(true);

//   try {
//     // ✅ STEP 1: Validate admin secret key
//     await axios.post(
//       "http://localhost:8080/api/rfid/scan-admin",
//       { secretKey }
//     );

//     alert("Admin verified. Now scan RFID card on reader.");

//   } catch (err) {
//     alert("Secret key incorrect");
//     setScanning(false);
//     return;
//   }

//   // ✅ STEP 2: Poll backend for RFID scanned by Arduino
//   const interval = setInterval(async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/rfid/latest"
//       );

//       if (res.data.rfidTagId) {
//         setRfidTagId(res.data.rfidTagId);
//         clearInterval(interval);
//         setScanning(false);
//         alert("RFID captured successfully!");
//       }
//     } catch {
//       console.log("Waiting for RFID...");
//     }
//   }, 2000);
// };