// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function StudentIssuedBooks({ userId, userName, onClose }) {
//   const [issuedBooks, setIssuedBooks] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`/api/issued/user/${userId}`)
//       .then((res) => setIssuedBooks(res.data))
//       .catch((err) => console.error(err));
//   }, [userId]);

//   return (
//     <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header bg-primary text-white">
//             <h5 className="modal-title">📚 {userName}'s Issued Books</h5>
//             <button className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             {issuedBooks.length === 0 ? (
//               <p>No books issued yet.</p>
//             ) : (
//               <table className="table table-hover table-striped align-middle">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>📖 Title</th>
//                     <th>🖋 Author</th>
//                     <th>📅 Issue Date</th>
//                     <th>🔄 Return Date</th>
//                     <th>✅ Returned</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {issuedBooks.map((book) => (
//                     <tr key={book.id}>
//                       <td>{book.bookTitle}</td>
//                       <td>{book.bookAuthor}</td>
//                       <td>{book.issueDate}</td>
//                       <td>{book.returnDate || "-"}</td>
//                       <td>
//                         {book.returned ? (
//                           <span className="badge bg-success">Yes</span>
//                         ) : (
//                           <span className="badge bg-danger">No</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//           <div className="modal-footer">
//             <button className="btn btn-secondary" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// import React from "react";

// export default function StudentIssuedBooks({ userName, issuedBooks, onClose }) {
//   return (
//     <div
//       className="modal d-block"
//       style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header bg-primary text-white">
//             <h5 className="modal-title">📚 {userName}'s Issued Books</h5>
//             <button className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             {issuedBooks && issuedBooks.length > 0 ? (
//               <table className="table table-hover table-striped align-middle">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>📖 Title</th>
//                     <th>🖋 Author</th>
//                     <th>📅 Issue Date</th>
//                     <th>🔄 Return Date</th>
//                     <th>✅ Returned</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {issuedBooks.map((book) => (
//                     <tr key={book.id}>
//                       <td>{book.bookTitle}</td>
//                       <td>{book.bookAuthor}</td>
//                       <td>{new Date(book.issueDate).toLocaleDateString()}</td>
//                       <td>
//                         {book.returnDate
//                           ? new Date(book.returnDate).toLocaleDateString()
//                           : "-"}
//                       </td>
//                       <td>
//                         {book.returned ? (
//                           <span className="badge bg-success">Yes</span>
//                         ) : (
//                           <span className="badge bg-danger">No</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>No books issued yet.</p>
//             )}
//           </div>
//           <div className="modal-footer">
//             <button className="btn btn-secondary" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }















// 18th jan
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function StudentIssuedBooks({ userId, userName, onClose }) {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!userId) return;

//     setLoading(true);
//     axios
//       .get(`http://localhost:8080/api/issued/user/${userId}`)
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           setIssuedBooks(res.data);
//         } else {
//           setIssuedBooks([]);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setIssuedBooks([]);
//       })
//       .finally(() => setLoading(false));
//   }, [userId]);

//   if (loading) return <p className="text-center mt-5">Loading issued books...</p>;

//   return (
//     <div
//       className="modal d-block"
//       style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header bg-primary text-white">
//             <h5 className="modal-title">📚 {userName}'s Issued Books</h5>
//             <button className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             {issuedBooks.length === 0 ? (
//               <p>No books issued yet.</p>
//             ) : (
//               <table className="table table-hover table-striped align-middle">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>📖 Title</th>
//                     <th>🖋 Author</th>
//                     <th>📅 Issue Date</th>
//                     <th>🔄 Return Date</th>
//                     <th>✅ Returned</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {issuedBooks.map((book) => (
//                     <tr key={book.id}>
//                       <td>{book.bookTitle}</td>
//                       <td>{book.bookAuthor}</td>
//                       <td>{new Date(book.issueDate).toLocaleDateString()}</td>
//                       <td>{book.returnDate ? new Date(book.returnDate).toLocaleDateString() : "-"}</td>
//                       <td>
//                         {book.returned ? (
//                           <span className="badge bg-success">Yes</span>
//                         ) : (
//                           <span className="badge bg-danger">No</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//           <div className="modal-footer">
//             <button className="btn btn-secondary" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
















import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentIssuedBooks({ userId, userName, onClose }) {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/issued/user/${userId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIssuedBooks(res.data);
        } else {
          setIssuedBooks([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setIssuedBooks([]);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div
          className="modal-content border-0 shadow-lg rounded-4"
          style={{ background: "rgba(255,255,255,0.95)" }}
        >
          {/* Header */}
          <div className="modal-header bg-primary text-white rounded-top-4">
            <div>
              <h5 className="modal-title fw-bold">
                📚 {userName}'s Issued Books
              </h5>
              <small className="opacity-75">
                Track your borrowed books and return status
              </small>
            </div>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body px-4 py-3">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary mb-3" />
                <p className="text-muted">Fetching issued books...</p>
              </div>
            ) : issuedBooks.length === 0 ? (
              <div className="text-center py-5">
                <h5 className="text-muted">📭 No books issued yet</h5>
                <p className="small text-secondary">
                  Once you issue a book, it will appear here.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead
                    className="table-dark position-sticky top-0"
                    style={{ zIndex: 1 }}
                  >
                    <tr>
                      <th>📖 Title</th>
                      <th>🖋 Author</th>
                      <th>📅 Issued On</th>
                      <th>🔄 Return Date</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuedBooks.map((book) => (
                      <tr key={book.id}>
                        <td className="fw-semibold">{book.bookTitle}</td>
                        <td>{book.bookAuthor}</td>
                        <td>
                          {new Date(book.issueDate).toLocaleDateString()}
                        </td>
                        <td>
                          {book.returnDate
                            ? new Date(book.returnDate).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="text-center">
                          {book.returned ? (
                            <span className="badge rounded-pill bg-success px-3">
                              Returned
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-danger px-3">
                              Not Returned
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer border-0">
            <button
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
