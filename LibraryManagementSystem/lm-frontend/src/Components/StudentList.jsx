// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StudentIssuedBooks from "./StudentIssuedBooks";

// export default function StudentList() {
//   const [students, setStudents] = useState([]);
//   const [selectedStudentId, setSelectedStudentId] = useState(null);
//   const [selectedStudentName, setSelectedStudentName] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/user/students")
//       .then((res) => {
//         if (!Array.isArray(res.data)) {
//           console.error("Expected an array, got:", res.data);
//           return;
//         }
//         const sorted = res.data.sort((a, b) => a.rollNo.localeCompare(b.rollNo));
//         setStudents(sorted);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h3 className="mb-4">👩‍🎓 Students List</h3>
//       <table className="table table-hover table-striped align-middle">
//         <thead className="table-dark">
//           <tr>
//             <th>Roll No</th>
//             <th>Name</th>
//             <th>Year</th>
//             <th>Branch</th>
//             <th>Section</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student.id}>
//               <td>{student.rollNo}</td>
//               <td>{student.name}</td>
//               <td>{student.year}</td>
//               <td>{student.branch}</td>
//               <td>{student.section}</td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-primary"
//                   onClick={() => {
//                     setSelectedStudentId(student.id);
//                     setSelectedStudentName(student.name);
//                   }}
//                 >
//                   View Issued Books
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedStudentId && (
//         <StudentIssuedBooks
//           userId={selectedStudentId}
//           userName={selectedStudentName}
//           onClose={() => setSelectedStudentId(null)}
//         />
//       )}
//     </div>
//   );
// }








import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentIssuedBooks from "./StudentIssuedBooks";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filterYear, setFilterYear] = useState("Filter By Year");
  const [filterBranch, setFilterBranch] = useState("Filter By Branch");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/students")
      .then((res) => {
        if (!Array.isArray(res.data)) {
          console.error("Expected an array, got:", res.data);
          return;
        }
        const sorted = res.data.sort((a, b) => a.rollNo.localeCompare(b.rollNo));
        setStudents(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter students whenever filters/search change
  useEffect(() => {
    let temp = students;

    // Search by name
    if (searchName) {
      const query = searchName.toLowerCase();
      temp = temp.filter((s) => s.name.toLowerCase().includes(query));
    }

    // Filter by year
    if (filterYear !== "Filter By Year") {
      temp = temp.filter((s) => s.year === filterYear);
    }

    // Filter by branch
    if (filterBranch !== "Filter By Branch") {
      temp = temp.filter((s) => s.branch === filterBranch);
    }

    setFilteredStudents(temp);
  }, [students, searchName, filterYear, filterBranch]);

  // Get unique years and branches
  const uniqueYears = ["Filter By Year", ...new Set(students.map((s) => s.year))];
  const uniqueBranches = ["Filter By Branch", ...new Set(students.map((s) => s.branch))];

  return (
    <div className="container mt-5">
      <h3 className="mb-4">👩‍🎓 Students List</h3>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            {uniqueYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
          >
            {uniqueBranches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="table table-hover table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Year</th>
            <th>Branch</th>
            <th>Section</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>{student.year}</td>
                <td>{student.branch}</td>
                <td>{student.section}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setSelectedStudentId(student.id);
                      setSelectedStudentName(student.name);
                    }}
                  >
                    View Issued Books
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedStudentId && (
        <StudentIssuedBooks
          userId={selectedStudentId}
          userName={selectedStudentName}
          onClose={() => setSelectedStudentId(null)}
        />
      )}
    </div>
  );
}
