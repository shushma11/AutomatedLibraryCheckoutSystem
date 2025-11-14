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

  if (loading) return <p className="text-center mt-5">Loading issued books...</p>;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">📚 {userName}'s Issued Books</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {issuedBooks.length === 0 ? (
              <p>No books issued yet.</p>
            ) : (
              <table className="table table-hover table-striped align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>📖 Title</th>
                    <th>🖋 Author</th>
                    <th>📅 Issue Date</th>
                    <th>🔄 Return Date</th>
                    <th>✅ Returned</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.bookTitle}</td>
                      <td>{book.bookAuthor}</td>
                      <td>{new Date(book.issueDate).toLocaleDateString()}</td>
                      <td>{book.returnDate ? new Date(book.returnDate).toLocaleDateString() : "-"}</td>
                      <td>
                        {book.returned ? (
                          <span className="badge bg-success">Yes</span>
                        ) : (
                          <span className="badge bg-danger">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
