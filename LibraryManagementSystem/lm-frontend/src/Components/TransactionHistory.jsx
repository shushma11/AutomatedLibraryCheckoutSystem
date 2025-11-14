// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function TransactionHistory() {
//   const [transactions, setTransactions] = useState([]);
//   const [filteredTransactions, setFilteredTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [userFilter, setUserFilter] = useState("");
//   const [bookFilter, setBookFilter] = useState("");

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("http://localhost:8080/api/transactions/all")
//       .then((res) => {
//         const data = Array.isArray(res.data) ? res.data : [];
//         // Sort by timestamp descending
//         data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
//         setTransactions(data);
//         setFilteredTransactions(data);
//         setError("");
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to fetch transactions");
//         setTransactions([]);
//         setFilteredTransactions([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     let filtered = transactions;
//     if (userFilter) {
//       filtered = filtered.filter((t) =>
//         t.userName.toLowerCase().includes(userFilter.toLowerCase())
//       );
//     }
//     if (bookFilter) {
//       filtered = filtered.filter((t) =>
//         t.bookTitle.toLowerCase().includes(bookFilter.toLowerCase())
//       );
//     }
//     setFilteredTransactions(filtered);
//   }, [userFilter, bookFilter, transactions]);

//   if (loading) return <p className="text-center mt-5">Loading transactions...</p>;
//   if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg border-0 rounded-3">
//         <div className="card-header bg-primary text-white text-center">
//           <h3 className="mb-0">📜 Transaction History</h3>
//         </div>
//         <div className="card-body">
//           <div className="mb-3 d-flex gap-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Filter by User"
//               value={userFilter}
//               onChange={(e) => setUserFilter(e.target.value)}
//             />
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Filter by Book"
//               value={bookFilter}
//               onChange={(e) => setBookFilter(e.target.value)}
//             />
//           </div>
//           {filteredTransactions.length === 0 ? (
//             <p className="text-center">No transactions available.</p>
//           ) : (
//             <table className="table table-hover table-striped align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>ID</th>
//                   <th>User</th>
//                   <th>Book</th>
//                   <th>Action</th>
//                   <th>Timestamp</th>
//                   <th>Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTransactions.map((t) => (
//                   <tr key={t.transactionId}>
//                     <td>{t.transactionId}</td>
//                     <td>{t.userName}</td>
//                     <td>{t.bookTitle}</td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           t.actionType === "ISSUE"
//                             ? "bg-success"
//                             : "bg-danger"
//                         }`}
//                       >
//                         {t.actionType}
//                       </span>
//                     </td>
//                     <td>{new Date(t.timestamp).toLocaleString()}</td>
//                     <td>{t.remarks}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userFilter, setUserFilter] = useState("");
  const [bookFilter, setBookFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");

  // Fetch transactions
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/transactions/all")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        // Sort by timestamp descending
        data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setTransactions(data);
        setFilteredTransactions(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch transactions");
        setTransactions([]);
        setFilteredTransactions([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle filtering
  useEffect(() => {
    let filtered = transactions;

    if (userFilter) {
      filtered = filtered.filter((t) =>
        t.userName.toLowerCase().includes(userFilter.toLowerCase())
      );
    }
    if (bookFilter) {
      filtered = filtered.filter((t) =>
        t.bookTitle.toLowerCase().includes(bookFilter.toLowerCase())
      );
    }
    if (yearFilter) {
      filtered = filtered.filter((t) => t.userYear === yearFilter);
    }
    if (branchFilter) {
      filtered = filtered.filter((t) => t.userBranch === branchFilter);
    }

    setFilteredTransactions(filtered);
  }, [userFilter, bookFilter, yearFilter, branchFilter, transactions]);

  if (loading) return <p className="text-center mt-5">Loading transactions...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  // Collect unique years and branches for dropdowns
  const years = Array.from(new Set(transactions.map((t) => t.userYear))).sort();
  const branches = Array.from(new Set(transactions.map((t) => t.userBranch))).sort();

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-primary text-white text-center">
          <h3 className="mb-0">📜 Transaction History</h3>
        </div>
        <div className="card-body">
         <div className="mb-3 d-flex gap-2">
  <input
    type="text"
    className="form-control"
    placeholder="Filter by User"
    value={userFilter}
    onChange={(e) => setUserFilter(e.target.value)}
  />
  <input
    type="text"
    className="form-control"
    placeholder="Filter by Book"
    value={bookFilter}
    onChange={(e) => setBookFilter(e.target.value)}
  />
  <select
    className="form-select"
    value={yearFilter}
    onChange={(e) => setYearFilter(e.target.value)}
  >
    <option value="">All Years</option>
    {years.map((y) => (
      <option key={y} value={y}>{y}</option>
    ))}
  </select>
  <select
    className="form-select"
    value={branchFilter}
    onChange={(e) => setBranchFilter(e.target.value)}
  >
    <option value="">All Branches</option>
    {branches.map((b) => (
      <option key={b} value={b}>{b}</option>
    ))}
  </select>
</div>


          {filteredTransactions.length === 0 ? (
            <p className="text-center">No transactions available.</p>
          ) : (
            <table className="table table-hover table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Year</th>
                  <th>Branch</th>
                  <th>Book</th>
                  <th>Action</th>
                  <th>Timestamp</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.transactionId}>
                    <td>{t.transactionId}</td>
                    <td>{t.userRollNo}</td>
                    <td>{t.userName}</td>
                    <td>{t.userYear}</td>
                    <td>{t.userBranch}</td>
                    <td>{t.bookTitle}</td>
                    <td>
                      <span
                        className={`badge ${
                          t.actionType === "ISSUE" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {t.actionType}
                      </span>
                    </td>
                    <td>{new Date(t.timestamp).toLocaleString()}</td>
                    <td>{t.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
