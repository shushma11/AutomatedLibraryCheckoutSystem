// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Html5QrcodeScanner } from "html5-qrcode";

// export default function BookScan() {
//   const [isInsideLibrary, setIsInsideLibrary] = useState(false);
//   const [showScanner, setShowScanner] = useState(false);
//   const [scannedBook, setScannedBook] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🔹 Get roll number (from login)
//   const rollNo = localStorage.getItem("rollNo");
//   console.log(rollNo);

//   // 🔹 Check RFID library entry
//   useEffect(() => {
//     async function checkLibraryStatus() {
//       try {

//         const res = await axios.post(
//           "http://localhost:8080/api/user/is-inside-library",
//           { "rollNo":rollNo  }
//         );
//         console.log("Afterr");
//         console.log(res.data);
//         setIsInsideLibrary(res.data.insideLibrary);
//       } catch {
//         setError("Unable to verify library entry");
//       }
//     }
//     checkLibraryStatus();
//   }, [rollNo]);

//   // 🔹 Start camera scanner
//   useEffect(() => {
//     if (!showScanner) return;

//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       {
//         fps: 10,
//         qrbox: 250,
//         rememberLastUsedCamera: true,
//       },
//       false
//     );

//     scanner.render(
//       (isbn) => {
//         scanner.clear();
//         handleScan(isbn);
//       },
//       () => {}
//     );

//     return () => {
//       scanner.clear().catch(() => {});
//     };
//   }, [showScanner]);

//   // 🔹 Scan handler
//   async function handleScan(isbn) {
//     console.log("ISBN:" + isbn);
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/books/scan",
//         {
//           isbn,
//           rollNo,
//         }
//       );
//       console.log("Scanned Book details");
//       console.log(scannedBook);
//       setScannedBook(res.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Book not found or unavailable"
//       );
//     } finally {
//       setLoading(false);
//     }
//   }







//   async function confirmIssue() {
//   setLoading(true);
//   setError("");

//   try {
//     const userId = localStorage.getItem("userId"); // store this at login
//     const rollNumber = localStorage.getItem("rollNo");

//     const res = await axios.post(
//       "http://localhost:8080/api/issued/issue",
//       {
//         userId: userId,
//         bookId: scannedBook.id,   // book from scan API
//         rollNumber: rollNumber
//       }
//     );

//     alert(res.data);
//     setScannedBook(null);
//     setShowScanner(false);

//   } catch (err) {
//     console.log(err);
//     setError(err.response?.data || "Failed to issue book");
//   } finally {
//     setLoading(false);
//   }
// }


//   return (
//     <div className="container py-4">
//       <div className="row justify-content-center">
//         <div className="col-md-6">

//           <div className="card shadow">
//             <div className="card-body text-center">

//               <h3 className="mb-3">📚 Scan Book</h3>

            
//               {!isInsideLibrary && (
//   <div className="alert alert-danger">
//     Please scan your RFID at library entrance first.
//   </div>
// )}

// {isInsideLibrary && (
//   <button
//     className="btn btn-primary"
//     onClick={() => setShowScanner(true)}
//   >
//     Scan Book QR
//   </button>
// )}


//               {showScanner && (
//                 <div id="reader" className="my-3"></div>
//               )}

//               {loading && (
//                 <div className="spinner-border text-primary my-2"></div>
//               )}

//               {error && (
//                 <div className="alert alert-danger mt-2">{error}</div>
//               )}

//               {/* 🔹 Confirmation */}
//               {scannedBook && (
//                 <div className="card mt-3">
//                   <div className="card-body">
//                     <h5 className="card-title">Confirm Issue</h5>

//                     <p><b>Title:</b> {scannedBook.title}</p>
//                     <p><b>Author:</b> {scannedBook.author}</p>
//                     <p><b>ISBN:</b> {scannedBook.isbn}</p>
//                     <p><b>Available:</b> {scannedBook.availableCount}</p>

//                     <div className="d-flex gap-2">
//                       <button
//                         className="btn btn-success w-100"
//                         onClick={confirmIssue}
//                       >
//                         Confirm
//                       </button>
//                       <button
//                         className="btn btn-outline-danger w-100"
//                         onClick={() => setScannedBook(null)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }















// 3/3/2026 -- the slow cam without uplaoding
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Html5QrcodeScanner } from "html5-qrcode";

// export default function BookScan() {
//   const [isInsideLibrary, setIsInsideLibrary] = useState(false);
//   const [showScanner, setShowScanner] = useState(false);
//   const [scannedBook, setScannedBook] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const rollNo = localStorage.getItem("rollNo");

//   /* 🔹 Check RFID library entry (AUTO REFRESH) */
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

//     // 🔁 Auto refresh every 5 seconds
//     const interval = setInterval(checkLibraryStatus, 5000);

//     // 🔁 Refresh when tab becomes active
//     const handleVisibility = () => {
//       if (!document.hidden) checkLibraryStatus();
//     };
//     document.addEventListener("visibilitychange", handleVisibility);

//     return () => {
//       clearInterval(interval);
//       document.removeEventListener("visibilitychange", handleVisibility);
//     };
//   }, [rollNo]);

//   /* 🔹 Start QR scanner */
//   useEffect(() => {
//     if (!showScanner) return;

//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       {
//         fps: 10,
//         qrbox: 250,
//         rememberLastUsedCamera: true,
//       },
//       false
//     );

//     scanner.render(
//       (isbn) => {
//         scanner.clear();
//         handleScan(isbn);
//       },
//       () => {}
//     );

//     return () => {
//       scanner.clear().catch(() => {});
//     };
//   }, [showScanner]);

//   /* 🔹 Scan handler */
//   async function handleScan(isbn) {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/books/scan",
//         { isbn, rollNo }
//       );
//       setScannedBook(res.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Book not found or unavailable");
//     } finally {
//       setLoading(false);
//     }
//   }

//   /* 🔹 Confirm Issue */
//   async function confirmIssue() {
//     setLoading(true);
//     setError("");

//     try {
//       const userId = localStorage.getItem("userId");
//       const rollNumber = localStorage.getItem("rollNo");

//       const res = await axios.post(
//         "http://localhost:8080/api/issued/issue",
//         {
//           userId,
//           bookId: scannedBook.id,
//           rollNumber,
//         }
//       );

//       alert(res.data);
//       setScannedBook(null);
//       setShowScanner(false);
//     } catch (err) {
//       setError(err.response?.data || "Failed to issue book");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">

//           <div className="card shadow-lg border-0 rounded-4">
//             <div className="card-body p-4 text-center">

//               <h3 className="fw-bold mb-3">📚 Book Issuing</h3>
//               <p className="text-muted mb-4">
//                 Step 1: Enter library → Step 2: Scan book QR
//               </p>

//               {/* Library Status */}
//               {!isInsideLibrary && (
//                 <div className="alert alert-danger">
//                   🚫 You are not inside the library.<br />
//                   Please scan your RFID at the entrance.
//                 </div>
//               )}

//               {isInsideLibrary && !showScanner && (
//                 <div className="alert alert-success">
//                   ✅ Library entry verified. You may scan a book.
//                 </div>
//               )}

//               {/* Scan Button */}
//               {isInsideLibrary && !showScanner && (
//                 <button
//                   className="btn btn-primary btn-lg w-100"
//                   onClick={() => setShowScanner(true)}
//                 >
//                   📷 Scan Book QR
//                 </button>
//               )}

//               {/* Scanner */}
//               {showScanner && (
//                 <div className="mt-4">
//                   <div
//                     id="reader"
//                     className="border rounded p-2"
//                   ></div>
//                   <small className="text-muted d-block mt-2">
//                     Align the QR code inside the box
//                   </small>
//                 </div>
//               )}

//               {/* Loading */}
//               {loading && (
//                 <div className="mt-3">
//                   <div className="spinner-border text-primary"></div>
//                 </div>
//               )}

//               {/* Error */}
//               {error && (
//                 <div className="alert alert-danger mt-3">
//                   {error}
//                 </div>
//               )}

//               {/* Confirm Card */}
//               {scannedBook && (
//                 <div className="card mt-4 border-0 shadow-sm">
//                   <div className="card-body text-start">
//                     <h5 className="fw-bold mb-3 text-center">
//                       📖 Confirm Book Issue
//                     </h5>

//                     <p><b>Title:</b> {scannedBook.title}</p>
//                     <p><b>Author:</b> {scannedBook.author}</p>
//                     <p><b>ISBN:</b> {scannedBook.isbn}</p>
//                     <p><b>Available:</b> {scannedBook.availableCount}</p>

//                     <div className="d-flex gap-2 mt-3">
//                       <button
//                         className="btn btn-success w-100"
//                         onClick={confirmIssue}
//                         disabled={loading}
//                       >
//                         ✅ Confirm
//                       </button>
//                       <button
//                         className="btn btn-outline-danger w-100"
//                         onClick={() => setScannedBook(null)}
//                       >
//                         ❌ Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }





























































import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function BookScan() {
  const [isInsideLibrary, setIsInsideLibrary] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedBook, setScannedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [manualIsbn, setManualIsbn] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);

  const rollNo = localStorage.getItem("rollNo");
  const scannerRef = useRef(null);

  /* ✅ Check RFID */
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

  /* 📷 START HTML5 CAMERA SCANNER */
  useEffect(() => {
    if (!showScanner) return;

    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      {
        fps: 20,
        qrbox: { width: 300, height: 120 }, // optimized for barcodes
        aspectRatio: 1.7
      },
      false
    );

    scannerRef.current.render(
      (decodedText) => {
        stopScanner();
        cleanAndScan(decodedText);
      },
      () => {}
    );

    return () => {
      stopScanner();
    };
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

  /* 🔹 Clean ISBN */
  const cleanAndScan = (text) => {
    const cleanIsbn = text
      .replace(/ISBN[:\s-]*/gi, "")
      .replace(/-/g, "")
      .trim();

    handleScan(cleanIsbn);
  };

  /* 🔹 Backend Scan */
  async function handleScan(isbn) {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/books/scan",
        { isbn, rollNo }
      );
      setScannedBook(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Book not found or unavailable");
    } finally {
      setLoading(false);
    }
  }

  /* 🖼 Upload Image (ZXing) */
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const reader = new BrowserMultiFormatReader();
      const result = await reader.decodeFromImageUrl(
        URL.createObjectURL(file)
      );

      cleanAndScan(result.getText());
    } catch {
      setError("Could not detect barcode from image");
    } finally {
      setLoading(false);
    }
  }

  /* ⌨ Manual ISBN */
  const handleManualSubmit = () => {
    if (!manualIsbn.trim()) {
      setError("Please enter ISBN");
      return;
    }

    cleanAndScan(manualIsbn);
  };

  /* 🔹 Confirm Issue */
  async function confirmIssue() {
    setLoading(true);
    setError("");

    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.post(
        "http://localhost:8080/api/issued/issue",
        {
          userId,
          bookId: scannedBook.id,
          rollNumber: rollNo,
        }
      );

      alert(res.data);
      setScannedBook(null);
    } catch (err) {
      setError(err.response?.data || "Failed to issue book");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="col-md-6 mx-auto">
        <div className="card shadow-lg rounded-4 p-4 text-center">
          <h3 className="fw-bold mb-3">📚 Book Issuing</h3>

          {!isInsideLibrary && (
            <div className="alert alert-danger">
              🚫 You are not inside the library.
            </div>
          )}

          {isInsideLibrary && !showScanner && !scannedBook && (
            <>
              <div className="alert alert-success">
                ✅ Library entry verified.
              </div>

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
                {showManualInput
                  ? "❌ Cancel Manual Entry"
                  : "⌨ Enter ISBN Manually"}
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
                    🔎 Search Book
                  </button>
                </div>
              )}
            </>
          )}

          {showScanner && (
            <div className="mt-3">
              <div id="reader"></div>

              <button
                className="btn btn-danger mt-3 w-100"
                onClick={stopScanner}
              >
                ❌ Stop Scanning
              </button>
            </div>
          )}

          {loading && (
            <div className="spinner-border text-primary mt-3"></div>
          )}

          {error && (
            <div className="alert alert-danger mt-3">{error}</div>
          )}

          {scannedBook && (
  <div className="card mt-4 p-3 text-start">
    <h5 className="text-center">📖 Confirm Book Issue</h5>

    <p><b>Title:</b> {scannedBook.title}</p>
    <p><b>Author:</b> {scannedBook.author}</p>
    <p><b>ISBN:</b> {scannedBook.isbn}</p>
    <p><b>Available:</b> {scannedBook.availableCount}</p>

    <div className="d-flex gap-2">
      <button
        className="btn btn-success w-100"
        onClick={confirmIssue}
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

        </div>
      </div>
    </div>
  );
}


// changing