// export default function IssuedBooks({ userId, issuedBooks }) {
//   if (!issuedBooks || issuedBooks.length === 0) {
//     return (
//       <div className="container mt-5">
//         <p className="text-center mt-5">No books issued yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg border-0 rounded-3">
//         <div className="card-header bg-primary text-white text-center">
//           <h3 className="mb-0">📚 My Issued Books</h3>
//         </div>
//         <div className="card-body">
//           <table className="table table-hover table-striped align-middle">
//             <thead className="table-dark">
//               <tr>
//                 <th>📖 Title</th>
//                 <th>🖋 Author</th>
//                 <th>📅 Issue Date</th>
//                 <th>🔄 Return Date</th>
//                 <th>✅ Returned</th>
//               </tr>
//             </thead>
//             <tbody>
//               {issuedBooks.map((book) => (
//                 <tr key={book.id}>
//                   <td>{book.bookTitle}</td>
//                   <td>{book.bookAuthor}</td>
//                   <td>{new Date(book.issueDate).toLocaleDateString()}</td>
//                   <td>{book.returnDate ? new Date(book.returnDate).toLocaleDateString() : "-"}</td>
//                   <td>
//                     {book.returned ? (
//                       <span className="badge bg-success">Yes</span>
//                     ) : (
//                       <span className="badge bg-danger">No</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }












// export default function IssuedBooks({ userId }) {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [showReturnModal, setShowReturnModal] = useState(false);

//   const fetchIssuedBooks = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/issued/user/${userId}`);
//       setIssuedBooks(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchIssuedBooks();
//   }, [userId]);

//   const handleReturnClick = (book) => {
//     setSelectedBook(book);
//     setShowReturnModal(true);
//   };

//   return (
//     <div className="container mt-5">
//       {issuedBooks.length === 0 ? (
//         <p className="text-center mt-5">No books issued yet.</p>
//       ) : (
//         <div className="card shadow-lg border-0 rounded-3">
//           <div className="card-header bg-primary text-white text-center">
//             <h3 className="mb-0">📚 My Issued Books</h3>
//           </div>
//           <div className="card-body">
//             <table className="table table-hover table-striped align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>📖 Title</th>
//                   <th>🖋 Author</th>
//                   <th>📅 Issue Date</th>
//                   <th>🔄 Return Date</th>
//                   <th>✅ Returned</th>
//                   <th>Action</th>
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
//                     <td>
//                       {!book.returned && (
//                         <button
//                           className="btn btn-sm btn-warning"
//                           onClick={() => handleReturnClick(book)}
//                         >
//                           🔄 Return
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {showReturnModal && selectedBook && (
//         <BookReturnModal
//           book={selectedBook}
//           userId={userId}
//           onClose={() => setShowReturnModal(false)}
//           onReturned={fetchIssuedBooks} // refresh list immediately
//         />
//       )}
//     </div>
//   );
// }









// import React, { useState, useEffect } from "react";
// import BookReturnModal from "./BookReturnModel";
// import axios from "axios";



// export default function IssuedBooks({ userId }) {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [showReturnModal, setShowReturnModal] = useState(false);

//   const fetchIssuedBooks = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/issued/user/${userId}`);
//       setIssuedBooks(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchIssuedBooks();
//   }, [userId]);

//   const handleReturnClick = (book) => {
//     setSelectedBook(book);
//     setShowReturnModal(true);
//   };

//   // ✅ Add this function here
//   const handleReturn = async (bookId, rollNumber) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:8080/api/issued/return/${userId}/${bookId}`,
//         { rollNumber }
//       );
//       alert(res.data);
//       fetchIssuedBooks(); // Refresh the list immediately
//       setShowReturnModal(false); // Close the modal
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data || "Error returning book");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       {issuedBooks.length === 0 ? (
//         <p className="text-center mt-5">No books issued yet.</p>
//       ) : (
//         <div className="card shadow-lg border-0 rounded-3">
//           <div className="card-header bg-primary text-white text-center">
//             <h3 className="mb-0">📚 My Issued Books</h3>
//           </div>
//           <div className="card-body">
//             <table className="table table-hover table-striped align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>📖 Title</th>
//                   <th>🖋 Author</th>
//                   <th>📅 Issue Date</th>
//                   <th>🔄 Return Date</th>
//                   <th>✅ Returned</th>
//                   <th>Action</th>
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
//                     <td>
//                       {!book.returned && (
//                         <button
//                           className="btn btn-sm btn-warning"
//                           onClick={() => handleReturnClick(book)}
//                         >
//                           🔄 Return
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {showReturnModal && selectedBook && (
//         <BookReturnModal
//           book={selectedBook}
//           userId={userId}
//           onClose={() => setShowReturnModal(false)}
//           onReturned={handleReturn} 
//         />
//       )}
//     </div>
//   );
// }












//latest
// import React, { useState, useEffect } from "react";
// import BookReturnModel from "./BookReturnModel"
// import axios from "axios";

// export default function IssuedBooks({ userId }) {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [showReturnModal, setShowReturnModal] = useState(false);

//   // Fetch issued books for the user
//   const fetchIssuedBooks = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/issued/user/${userId}`);
//       setIssuedBooks(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchIssuedBooks();
//   }, [userId]);

//   // Open modal for returning book
//   const handleReturnClick = (book) => {
//     setSelectedBook(book);
//     setShowReturnModal(true);
//   };

//   // Handle actual return (called from modal)
//   const handleReturn = async (bookId, rollNumber) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:8080/api/issued/return/${userId}/${bookId}`,
//         { rollNumber } // ✅ must match backend field
//       );
//       alert(res.data);
//       fetchIssuedBooks(); // refresh list
//       setShowReturnModal(false); // close modal
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data || "Error returning book");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       {issuedBooks.length === 0 ? (
//         <p className="text-center mt-5">No books issued yet.</p>
//       ) : (
//         <div className="card shadow-lg border-0 rounded-3">
//           <div className="card-header bg-primary text-white text-center">
//             <h3 className="mb-0">📚 My Issued Books</h3>
//           </div>
//           <div className="card-body">
//             <table className="table table-hover table-striped align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>📖 Title</th>
//                   <th>🖋 Author</th>
//                   <th>📅 Issue Date</th>
//                   <th>🔄 Return Date</th>
//                   <th>✅ Returned</th>
//                   <th>Action</th>
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
//                     <td>
//                       {!book.returned && (
//                         <button
//                           className="btn btn-sm btn-warning"
//                           onClick={() => handleReturnClick(book)}
//                         >
//                           🔄 Return
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {showReturnModal && selectedBook && (
//         <BookReturnModel
//           book={selectedBook}
//           userId={userId}
//           onClose={() => setShowReturnModal(false)}
//           onReturned={handleReturn} // pass function
//         />
//       )}
//     </div>
//   );
// }












// 18th jan
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function IssuedBooks({ userId }) {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const navigate = useNavigate();

//   // Fetch issued books for the user
//   const fetchIssuedBooks = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/issued/user/${userId}`);
//       setIssuedBooks(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchIssuedBooks();
//   }, [userId]);

//   // 🔹 Navigate to camera return page
//   const handleReturnClick = (book) => {
//     navigate("/return-book", {
//       state: {
//         book,
//         userId
//       }
//     });
//   };

//   return (
//     <div className="container mt-5">
//       {issuedBooks.length === 0 ? (
//         <p className="text-center mt-5">No books issued yet.</p>
//       ) : (
//         <div className="card shadow-lg border-0 rounded-3">
//           <div className="card-header bg-primary text-white text-center">
//             <h3 className="mb-0">📚 My Issued Books</h3>
//           </div>
//           <div className="card-body">
//             <table className="table table-hover table-striped align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>📖 Title</th>
//                   <th>🖋 Author</th>
//                   <th>📅 Issue Date</th>
//                   <th>🔄 Return Date</th>
//                   <th>✅ Returned</th>
//                   <th>Action</th>
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
//                     <td>
//                       {!book.returned && (
//                         <button
//                           className="btn btn-sm btn-warning"
//                           onClick={() => handleReturnClick(book)}
//                         >
//                           🔄 Return
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }











import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function IssuedBooks({ userId }) {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch issued books for the user
  const fetchIssuedBooks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/issued/user/${userId}`
      );
      setIssuedBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, [userId]);

  // 🔹 Navigate to camera return page
  const handleReturnClick = (book) => {
    navigate("/return-book", {
      state: {
        book,
        userId,
      },
    });
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">📚 My Issued Books</h2>
        <p className="text-muted">
          View your borrowed books and return them when done
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" />
          <p className="text-muted">Loading your issued books...</p>
        </div>
      ) : issuedBooks.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">📭 No books issued yet</h5>
          <p className="small text-secondary">
            Once you issue a book, it will appear here.
          </p>
        </div>
      ) : (
        <div className="card border-0 shadow-lg rounded-4">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
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
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.map((book) => (
                    <tr key={book.id}>
                      <td className="fw-semibold">
                        {book.bookTitle}
                      </td>
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
                          <span className="badge rounded-pill bg-warning text-dark px-3">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="text-center">
                        {!book.returned ? (
                          <button
                            className="btn btn-sm btn-outline-primary rounded-pill px-3"
                            onClick={() => handleReturnClick(book)}
                          >
                            🔄 Return
                          </button>
                        ) : (
                          <span className="text-muted small">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
