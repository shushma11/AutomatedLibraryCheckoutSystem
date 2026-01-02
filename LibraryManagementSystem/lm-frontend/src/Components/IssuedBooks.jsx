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













import React, { useState, useEffect } from "react";
import BookReturnModel from "./BookReturnModel"
import axios from "axios";

export default function IssuedBooks({ userId }) {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showReturnModal, setShowReturnModal] = useState(false);

  // Fetch issued books for the user
  const fetchIssuedBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/issued/user/${userId}`);
      setIssuedBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, [userId]);

  // Open modal for returning book
  const handleReturnClick = (book) => {
    setSelectedBook(book);
    setShowReturnModal(true);
  };

  // Handle actual return (called from modal)
  const handleReturn = async (bookId, rollNumber) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/issued/return/${userId}/${bookId}`,
        { rollNumber } // ✅ must match backend field
      );
      alert(res.data);
      fetchIssuedBooks(); // refresh list
      setShowReturnModal(false); // close modal
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Error returning book");
    }
  };

  return (
    <div className="container mt-5">
      {issuedBooks.length === 0 ? (
        <p className="text-center mt-5">No books issued yet.</p>
      ) : (
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
                  <th>Action</th>
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
                    <td>
                      {!book.returned && (
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleReturnClick(book)}
                        >
                          🔄 Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showReturnModal && selectedBook && (
        <BookReturnModel
          book={selectedBook}
          userId={userId}
          onClose={() => setShowReturnModal(false)}
          onReturned={handleReturn} // pass function
        />
      )}
    </div>
  );
}

