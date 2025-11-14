// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function IssuedBooks({ userId }) {
//   const [issuedBooks, setIssuedBooks] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`/api/issued/user/${userId}`)
//       .then((res) => setIssuedBooks(res.data))
//       .catch((err) => console.error(err));
//   }, [userId]);

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg border-0 rounded-3">
//         <div className="card-header bg-primary text-white text-center">
//           <h3 className="mb-0">📚 My Issued Books</h3>
//         </div>
//         <div className="card-body">
//           {issuedBooks.length === 0 ? (
//             <p>No books issued yet.</p>
//           ) : (
//             <table className="table table-hover table-striped align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>📖 Title</th>
//                   <th>🖋 Author</th>
//                   <th>📅 Issue Date</th>
//                   <th>🔄 Return Date</th>
//                   <th>✅ Returned</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {issuedBooks.map((book) => (
//                   <tr key={book.id}>
//                     <td>{book.bookTitle}</td>
//                     <td>{book.bookAuthor}</td>
//                     <td>{book.issueDate}</td>
//                     <td>{book.returnDate || "-"}</td>
//                     <td>
//                       {book.returned ? (
//                         <span className="badge bg-success">Yes</span>
//                       ) : (
//                         <span className="badge bg-danger">No</span>
//                       )}
//                     </td>
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












// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function IssuedBooks({ userId }) {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`/api/issued/user/${userId}`)
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
//     <div className="container mt-5">
//       <div className="card shadow-lg border-0 rounded-3">
//         <div className="card-header bg-primary text-white text-center">
//           <h3 className="mb-0">📚 My Issued Books</h3>
//         </div>
//         <div className="card-body">
//           {issuedBooks.length === 0 ? (
//             <p className="text-center">No books issued yet.</p>
//           ) : (
//             <table className="table table-hover table-striped align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>📖 Title</th>
//                   <th>🖋 Author</th>
//                   <th>📅 Issue Date</th>
//                   <th>🔄 Return Date</th>
//                   <th>✅ Returned</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {issuedBooks.map((book) => (
//                   <tr key={book.id}>
//                     <td>{book.bookTitle}</td>
//                     <td>{book.bookAuthor}</td>
//                     <td>{new Date(book.issueDate).toLocaleDateString()}</td>
//                     <td>{book.returnDate ? new Date(book.returnDate).toLocaleDateString() : "-"}</td>
//                     <td>
//                       {book.returned ? (
//                         <span className="badge bg-success">Yes</span>
//                       ) : (
//                         <span className="badge bg-danger">No</span>
//                       )}
//                     </td>
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









export default function IssuedBooks({ userId, issuedBooks }) {
  if (!issuedBooks || issuedBooks.length === 0) {
    return (
      <div className="container mt-5">
        <p className="text-center mt-5">No books issued yet.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-primary text-white text-center">
          <h3 className="mb-0">📚 My Issued Books</h3>
        </div>
        <div className="card-body">
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
        </div>
      </div>
    </div>
  );
}
