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
















// changes done on 03-07-2026
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

//   // 🔐 Safety check
//   useEffect(() => {
//     if (!book || !userId) {
//       navigate("/issued-books");
//     }
//   }, [book, userId, navigate]);

//   // 🔄 Auto-refresh library entry status (every 5 seconds)
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
//     const interval = setInterval(checkLibraryStatus, 5000);
//     return () => clearInterval(interval);
//   }, [rollNo]);

//   // 📷 QR Scanner
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

//   // 🔄 Return API
//   async function handleReturn(isbn) {
//     setLoading(true);
//     setError("");

//     if (isbn !== book.isbn) {
//       setError("❌ This is NOT the correct book!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/issued/return/${userId}/${book.bookId}`,
//         { rollNumber: rollNo }
//       );

//       alert(res.data);
//       navigate("/issued-books");
//     } catch (err) {
//       setError(err.response?.data || "Failed to return book");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-md-7">

//           <div className="card shadow-lg border-0 rounded-4">
//             <div className="card-body p-4 text-center">

//               <h3 className="fw-bold mb-3">📚 Return Book</h3>

//               {/* Book Info */}
//               <div className="bg-light rounded-3 p-3 mb-3 text-start">
//                 <p className="mb-1"><b>Title:</b> {book?.bookTitle}</p>
//                 <p className="mb-1"><b>Author:</b> {book?.bookAuthor}</p>
//                 <p className="mb-0"><b>Expected ISBN:</b> {book?.isbn}</p>
//               </div>

//               {/* Library Status */}
//               <div className="mb-3">
//                 {isInsideLibrary ? (
//                   <span className="badge bg-success fs-6">
//                     ✅ Inside Library
//                   </span>
//                 ) : (
//                   <span className="badge bg-danger fs-6">
//                     ❌ Outside Library
//                   </span>
//                 )}
//               </div>

//               {!isInsideLibrary && (
//                 <div className="alert alert-warning">
//                   Please scan your RFID at the library entrance.
//                   <br />
//                   <small className="text-muted">
//                     (Status auto-refreshes every few seconds)
//                   </small>
//                 </div>
//               )}

//               {isInsideLibrary && !showScanner && (
//                 <button
//                   className="btn btn-primary btn-lg w-100"
//                   onClick={() => setShowScanner(true)}
//                 >
//                   📷 Scan Book to Return
//                 </button>
//               )}

//               {showScanner && (
//                 <div className="border rounded-3 p-3 mt-3">
//                   <div id="reader"></div>
//                 </div>
//               )}

//               {loading && (
//                 <div className="spinner-border text-primary my-3"></div>
//               )}

//               {scannedIsbn && (
//                 <div className="alert alert-info mt-3">
//                   Scanned ISBN: <b>{scannedIsbn}</b>
//                 </div>
//               )}

//               {error && (
//                 <div className="alert alert-danger mt-3">{error}</div>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }





















// import React, { useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BrowserMultiFormatReader } from "@zxing/browser";
// import { Html5QrcodeScanner } from "html5-qrcode";

// export default function ReturnBook() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { book, userId } = location.state || {};

//   const [isInsideLibrary, setIsInsideLibrary] = useState(false);
//   const [showScanner, setShowScanner] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [manualIsbn, setManualIsbn] = useState("");
//   const [showManualInput, setShowManualInput] = useState(false);
//   const [scannedBook, setScannedBook] = useState(null);

//   const rollNo = localStorage.getItem("rollNo");
//   const scannerRef = useRef(null);

//   // Safety check
//   useEffect(() => {
//     if (!book || !userId) {
//       navigate("/issued-books");
//     }
//   }, [book, userId, navigate]);

//   // Check library entry
//   const checkLibraryStatus = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/user/is-inside-library",
//         { rollNo }
//       );
//       setIsInsideLibrary(res.data.insideLibrary);
//     } catch {
//       setError("Unable to verify library entry");
//     }
//   };

//   useEffect(() => {
//     checkLibraryStatus();
//   }, []);

//   // Clean ISBN
//   const cleanIsbn = (text) =>
//     text.replace(/ISBN[:\s-]*/gi, "").replace(/-/g, "").trim();

//   // Handle return
//   const handleReturn = async (isbn) => {
//     setLoading(true);
//     setError("");
//     setScannedBook({ ...book, isbn });

//     if (isbn !== book.isbn) {
//       setError("❌ This is NOT the correct book!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `http://localhost:8080/api/issued/return/${userId}/${book.bookId}`,
//         { rollNumber: rollNo }
//       );
//       alert(res.data);
//       navigate("/issued-books");
//     } catch (err) {
//       setError(err.response?.data || "Failed to return book");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // HTML5 QR Code Scanner
//   useEffect(() => {
//     if (!showScanner) return;

//     scannerRef.current = new Html5QrcodeScanner(
//       "reader",
//       { fps: 20, qrbox: { width: 300, height: 120 }, aspectRatio: 1.7 },
//       false
//     );

//     scannerRef.current.render(
//       (decodedText) => {
//         stopScanner();
//         handleReturn(cleanIsbn(decodedText));
//       },
//       () => {}
//     );

//     return () => stopScanner();
//   }, [showScanner]);

//   const stopScanner = () => {
//     try {
//       if (scannerRef.current) {
//         scannerRef.current.clear();
//         scannerRef.current = null;
//       }
//     } catch (err) {
//       console.error(err);
//     }
//     setShowScanner(false);
//   };

//   // ZXing for image upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setLoading(true);
//     setError("");

//     try {
//       const reader = new BrowserMultiFormatReader();
//       const result = await reader.decodeFromImageUrl(URL.createObjectURL(file));
//       handleReturn(cleanIsbn(result.getText()));
//     } catch {
//       setError("Could not detect barcode from image");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Manual ISBN
//   const handleManualSubmit = () => {
//     if (!manualIsbn.trim()) {
//       setError("Please enter ISBN");
//       return;
//     }
//     handleReturn(cleanIsbn(manualIsbn));
//   };

//   return (
//     <div className="container py-5">
//       <div className="col-md-6 mx-auto">
//         <div className="card shadow-lg rounded-4 p-4 text-center">
//           <h3 className="fw-bold mb-3">📚 Return Book</h3>

//           <div className="bg-light rounded-3 p-3 mb-3 text-start">
//             <p><b>Title:</b> {book?.bookTitle}</p>
//             <p><b>Author:</b> {book?.bookAuthor}</p>
//             <p><b>Expected ISBN:</b> {book?.isbn}</p>
//           </div>

//           {!isInsideLibrary && (
//             <div className="alert alert-danger">
//               🚫 You are not inside the library.
//             </div>
//           )}

//           {isInsideLibrary && !scannedBook && (
//             <>
//               <div className="alert alert-success">✅ Library entry verified</div>

//               <button
//                 className="btn btn-primary w-100 mb-2"
//                 onClick={() => setShowScanner(true)}
//               >
//                 📷 Scan Book Barcode
//               </button>

//               <label className="btn btn-outline-secondary w-100 mb-2">
//                 🖼 Upload Barcode Image
//                 <input
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   onChange={handleImageUpload}
//                 />
//               </label>

//               <button
//                 className="btn btn-outline-dark w-100 mt-2"
//                 onClick={() => setShowManualInput(!showManualInput)}
//               >
//                 {showManualInput ? "❌ Cancel Manual Entry" : "⌨ Enter ISBN Manually"}
//               </button>

//               {showManualInput && (
//                 <div className="mt-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter ISBN manually"
//                     value={manualIsbn}
//                     onChange={(e) => setManualIsbn(e.target.value)}
//                   />
//                   <button
//                     className="btn btn-dark w-100 mt-2"
//                     onClick={handleManualSubmit}
//                   >
//                     🔎 Return Book
//                   </button>
//                 </div>
//               )}
//             </>
//           )}

//           {showScanner && (
//             <div className="mt-3 border rounded-3 p-3">
//               <div id="reader"></div>
//               <button
//                 className="btn btn-danger w-100 mt-2"
//                 onClick={stopScanner}
//               >
//                 ❌ Stop Scanning
//               </button>
//             </div>
//           )}

//           {scannedBook && (
//             <div className="card mt-4 p-3 text-start">
//               <h5 className="text-center">📖 Confirm Return</h5>
//               <p><b>Title:</b> {scannedBook.bookTitle}</p>
//               <p><b>Author:</b> {scannedBook.bookAuthor}</p>
//               <p><b>ISBN:</b> {scannedBook.isbn}</p>

//               <div className="d-flex gap-2">
//                 <button
//                   className="btn btn-success w-100"
//                   onClick={() => handleReturn(scannedBook.isbn)}
//                 >
//                   ✅ Confirm
//                 </button>

//                 <button
//                   className="btn btn-secondary w-100"
//                   onClick={() => {
//                     setScannedBook(null);
//                     setError("");
//                   }}
//                 >
//                   ❌ Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           {loading && <div className="spinner-border text-primary mt-3"></div>}
//           {error && <div className="alert alert-danger mt-3">{error}</div>}
//         </div>
//       </div>
//     </div>
//   );
// }












import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ReturnBook() {
  const location = useLocation();
  const navigate = useNavigate();

  const { book, userId } = location.state || {};

  const [isInsideLibrary, setIsInsideLibrary] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [manualIsbn, setManualIsbn] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);
  const [scannedBook, setScannedBook] = useState(null);

  const rollNo = localStorage.getItem("rollNo");
  const scannerRef = useRef(null);

  // Safety check
  useEffect(() => {
    if (!book || !userId) navigate("/issued-books");
  }, [book, userId, navigate]);

  // Check library entry
  const checkLibraryStatus = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/is-inside-library",
        { rollNo }
      );
      setIsInsideLibrary(res.data.insideLibrary);
    } catch {
      setError("Unable to verify library entry");
    }
  };
  useEffect(() => {
    checkLibraryStatus();
  }, []);

  // Clean ISBN
  const cleanIsbn = (text) =>
    text.replace(/ISBN[:\s-]*/gi, "").replace(/-/g, "").trim();

  // Handle return
  const handleReturn = async (isbn) => {
    setLoading(true);
    setError("");
    setScannedBook({ ...book, isbn });

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
  };

  // HTML5 QR Code Scanner
  useEffect(() => {
    if (!showScanner) return;

    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 20, qrbox: { width: 300, height: 120 }, aspectRatio: 1.7 },
      false
    );

    scannerRef.current.render(
      (decodedText) => {
        const isbn = cleanIsbn(decodedText);

        if (isbn === book.isbn) {
          stopScanner();
          handleReturn(isbn);
        } else {
          setError("❌ This is NOT the correct book!");
        }
      },
      () => {}
    );

    return () => stopScanner();
  }, [showScanner]);

  const stopScanner = () => {
    try {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch (err) {
      console.error(err);
    }
    setShowScanner(false);
  };

  // ZXing for image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const reader = new BrowserMultiFormatReader();
      const result = await reader.decodeFromImageUrl(URL.createObjectURL(file));
      const isbn = cleanIsbn(result.getText());
      if (isbn === book.isbn) handleReturn(isbn);
      else setError("❌ This is NOT the correct book!");
    } catch {
      setError("Could not detect barcode from image");
    } finally {
      setLoading(false);
    }
  };

  // Manual ISBN
  const handleManualSubmit = () => {
    if (!manualIsbn.trim()) {
      setError("Please enter ISBN");
      return;
    }
    const isbn = cleanIsbn(manualIsbn);
    if (isbn === book.isbn) handleReturn(isbn);
    else setError("❌ This is NOT the correct book!");
  };

 return (
  <div className="container py-5">
    <div className="col-md-6 mx-auto">
      <div className="card shadow-lg rounded-4 p-4 text-center">
        <h3 className="fw-bold mb-3">📚 Return Book</h3>

        {/* Show book info only if scanner is not open and book is not scanned */}
        {!showScanner && !scannedBook && (
          <>
            <div className="bg-light rounded-3 p-3 mb-3 text-start">
              <p><b>Title:</b> {book?.bookTitle}</p>
              <p><b>Author:</b> {book?.bookAuthor}</p>
              <p><b>Expected ISBN:</b> {book?.isbn}</p>
            </div>

            {!isInsideLibrary && (
              <div className="alert alert-danger">🚫 You are not inside the library.</div>
            )}

            {isInsideLibrary && (
              <>
                <div className="alert alert-success">✅ Library entry verified</div>

                <button
                  className="btn btn-primary w-100 mb-2"
                  onClick={() => setShowScanner(true)}
                >
                  📷 Scan Book Barcode
                </button>

                <label className="btn btn-outline-secondary w-100 mb-2">
                  🖼 Upload Barcode Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </label>

                <button
                  className="btn btn-outline-dark w-100 mt-2"
                  onClick={() => setShowManualInput(!showManualInput)}
                >
                  {showManualInput ? "❌ Cancel Manual Entry" : "⌨ Enter ISBN Manually"}
                </button>

                {showManualInput && (
                  <div className="mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter ISBN manually"
                      value={manualIsbn}
                      onChange={(e) => setManualIsbn(e.target.value)}
                    />
                    <button
                      className="btn btn-dark w-100 mt-2"
                      onClick={handleManualSubmit}
                    >
                      🔎 Return Book
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Scanner view replaces all other content for full-page effect */}
        {showScanner && (
          <div className="text-center">
            <div id="reader"></div>
            <button
              className="btn btn-danger w-100 mt-3"
              onClick={stopScanner}
            >
              ❌ Stop Scanning
            </button>
          </div>
        )}

        {/* Confirm return card */}
        {scannedBook && (
          <div className="card mt-4 p-3 text-start">
            <h5 className="text-center">📖 Confirm Return</h5>
            <p><b>Title:</b> {scannedBook.bookTitle}</p>
            <p><b>Author:</b> {scannedBook.bookAuthor}</p>
            <p><b>ISBN:</b> {scannedBook.isbn}</p>

            <div className="d-flex gap-2">
              <button
                className="btn btn-success w-100"
                onClick={() => handleReturn(scannedBook.isbn)}
              >
                ✅ Confirm
              </button>

              <button
                className="btn btn-secondary w-100"
                onClick={() => {
                  setScannedBook(null);
                  setError("");
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        )}

        {/* Loading and error */}
        {loading && <div className="spinner-border text-primary mt-3"></div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  </div>
);

}
