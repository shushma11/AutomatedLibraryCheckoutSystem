// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Html5QrcodeScanner } from "html5-qrcode";

// export default function ReturnBook() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { book, userId } = location.state || {};

//   const [isInsideLibrary, setIsInsideLibrary] = useState(false);
//   const [showScanner, setShowScanner] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [scannedIsbn, setScannedIsbn] = useState(null);

//   const rollNo = localStorage.getItem("rollNo");

//   // ❌ Safety check
//   useEffect(() => {
//     if (!book || !userId) {
//       navigate("/issued-books");
//     }
//   }, [book, userId, navigate]);

//   // 🔹 Check library entry (RFID)
//   useEffect(() => {
//     async function checkLibraryStatus() {
//       try {
//         const res = await axios.post(
//           "http://localhost:8080/api/user/is-inside-library",
//           { rollNo }
//         );
//         setIsInsideLibrary(res.data.insideLibrary);
//       } catch {
//         setError("Unable to verify library entry");
//       }
//     }
//     checkLibraryStatus();
//   }, [rollNo]);

//   // 🔹 Camera scanner
//   useEffect(() => {
//     if (!showScanner) return;

//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: 250 },
//       false
//     );

//     scanner.render(
//       (isbn) => {
//         scanner.clear();
//         setScannedIsbn(isbn);
//         handleReturn(isbn);
//       },
//       () => {}
//     );

//     return () => {
//       scanner.clear().catch(() => {});
//     };
//   }, [showScanner]);

//   // 🔹 Return API call
//   async function handleReturn(isbn) {
//     setLoading(true);
//     setError("");

//     console.log(book);
//     // Check scanned book matches selected book
//     console.log(isbn+"  "+book.isbn);
//     if (isbn !== book.isbn) {
//       setError("❌ This is NOT the correct book!");
//       setLoading(false);
//       return;
//     }

//     const token = localStorage.getItem("jwtToken");

//     try {
//         console.log("Return "+rollNo+"userID "+userId+"bookId "+book.bookId);
//       const res = await axios.post(
//   `http://localhost:8080/api/issued/return/${userId}/${book.bookId}`,
//   { rollNumber: rollNo }
// );

//       console.log(res.data)
//       alert(res.data);
//       navigate("/issued-books");
//     } catch (err) {
//       setError(err.response?.data || "Failed to return book");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="container py-4">
//       <div className="row justify-content-center">
//         <div className="col-md-6">

//           <div className="card shadow">
//             <div className="card-body text-center">

//               <h3 className="mb-3">📚 Return Book</h3>

//               <p><b>Book:</b> {book?.bookTitle}</p>
//               <p><b>Author:</b> {book?.bookAuthor}</p>
//               <p><b>Expected ISBN:</b> {book?.isbn}</p>

//               {!isInsideLibrary && (
//                 <div className="alert alert-danger">
//                   You must enter the library to return a book.
//                 </div>
//               )}

//               {isInsideLibrary && !showScanner && (
//                 <button
//                   className="btn btn-primary w-100"
//                   onClick={() => setShowScanner(true)}
//                 >
//                   📷 Scan Book to Return
//                 </button>
//               )}

//               {showScanner && <div id="reader" className="my-3"></div>}

//               {loading && (
//                 <div className="spinner-border text-primary my-2"></div>
//               )}

//               {scannedIsbn && (
//                 <div className="alert alert-info">
//                   Scanned ISBN: {scannedIsbn}
//                 </div>
//               )}

//               {error && (
//                 <div className="alert alert-danger mt-2">{error}</div>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }










import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ReturnBook() {
  const location = useLocation();
  const navigate = useNavigate();

  const { book, userId } = location.state || {};

  const [isInsideLibrary, setIsInsideLibrary] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scannedIsbn, setScannedIsbn] = useState(null);

  const rollNo = localStorage.getItem("rollNo");

  // 🔐 Safety check
  useEffect(() => {
    if (!book || !userId) {
      navigate("/issued-books");
    }
  }, [book, userId, navigate]);

  // 🔄 Auto-refresh library entry status (every 5 seconds)
  useEffect(() => {
    async function checkLibraryStatus() {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/user/is-inside-library",
          { rollNo }
        );
        setIsInsideLibrary(res.data.insideLibrary);
      } catch {
        setError("Unable to verify library entry");
      }
    }

    checkLibraryStatus();
    const interval = setInterval(checkLibraryStatus, 5000);
    return () => clearInterval(interval);
  }, [rollNo]);

  // 📷 QR Scanner
  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (isbn) => {
        scanner.clear();
        setScannedIsbn(isbn);
        handleReturn(isbn);
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [showScanner]);

  // 🔄 Return API
  async function handleReturn(isbn) {
    setLoading(true);
    setError("");

    if (isbn !== book.isbn) {
      setError("❌ This is NOT the correct book!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/issued/return/${userId}/${book.bookId}`,
        { rollNumber: rollNo }
      );

      alert(res.data);
      navigate("/issued-books");
    } catch (err) {
      setError(err.response?.data || "Failed to return book");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">

          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 text-center">

              <h3 className="fw-bold mb-3">📚 Return Book</h3>

              {/* Book Info */}
              <div className="bg-light rounded-3 p-3 mb-3 text-start">
                <p className="mb-1"><b>Title:</b> {book?.bookTitle}</p>
                <p className="mb-1"><b>Author:</b> {book?.bookAuthor}</p>
                <p className="mb-0"><b>Expected ISBN:</b> {book?.isbn}</p>
              </div>

              {/* Library Status */}
              <div className="mb-3">
                {isInsideLibrary ? (
                  <span className="badge bg-success fs-6">
                    ✅ Inside Library
                  </span>
                ) : (
                  <span className="badge bg-danger fs-6">
                    ❌ Outside Library
                  </span>
                )}
              </div>

              {!isInsideLibrary && (
                <div className="alert alert-warning">
                  Please scan your RFID at the library entrance.
                  <br />
                  <small className="text-muted">
                    (Status auto-refreshes every few seconds)
                  </small>
                </div>
              )}

              {isInsideLibrary && !showScanner && (
                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={() => setShowScanner(true)}
                >
                  📷 Scan Book to Return
                </button>
              )}

              {showScanner && (
                <div className="border rounded-3 p-3 mt-3">
                  <div id="reader"></div>
                </div>
              )}

              {loading && (
                <div className="spinner-border text-primary my-3"></div>
              )}

              {scannedIsbn && (
                <div className="alert alert-info mt-3">
                  Scanned ISBN: <b>{scannedIsbn}</b>
                </div>
              )}

              {error && (
                <div className="alert alert-danger mt-3">{error}</div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
