import React, { useEffect, useState } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function BookScan() {
  const [isInsideLibrary, setIsInsideLibrary] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedBook, setScannedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Get roll number (from login)
  const rollNo = localStorage.getItem("rollNo");
  console.log(rollNo);

  // 🔹 Check RFID library entry
  useEffect(() => {
    async function checkLibraryStatus() {
      try {


      //   const res = await axios.post(
      //   "http://localhost:8080/api/books/scan",
      //   {
      //     isbn,
      //     rollNo,
      //   }
      // );
        const res = await axios.post(
          "http://localhost:8080/api/user/is-inside-library",
          { "rollNo":rollNo  }
        );
        console.log("Afterr");
        console.log(res.data);
        setIsInsideLibrary(res.data.insideLibrary);
      } catch {
        setError("Unable to verify library entry");
      }
    }
    checkLibraryStatus();
  }, [rollNo]);

  // 🔹 Start camera scanner
  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
        rememberLastUsedCamera: true,
      },
      false
    );

    scanner.render(
      (isbn) => {
        scanner.clear();
        handleScan(isbn);
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [showScanner]);

  // 🔹 Scan handler
  async function handleScan(isbn) {
    console.log("ISBN:" + isbn);
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/books/scan",
        {
          isbn,
          rollNo,
        }
      );
      console.log("Scanned Book details");
      console.log(scannedBook);
      setScannedBook(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Book not found or unavailable"
      );
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Confirm issue
//   async function confirmIssue() {
//     setLoading(true);
//     setError("");

//     try {
//       axios.post("/api/issued/issue-by-isbn", {
//   isbn: scannedIsbn,
//   rollNo: user.rollNo
// });


//       alert("Book issued successfully");
//       setScannedBook(null);
//       setShowScanner(false);
//     } catch {
//       setError("Failed to issue book");
//     } finally {
//       setLoading(false);
//     }
//   }


  async function confirmIssue() {
  setLoading(true);
  setError("");

  try {
    const userId = localStorage.getItem("userId"); // store this at login
    const rollNumber = localStorage.getItem("rollNo");

    const res = await axios.post(
      "http://localhost:8080/api/issued/issue",
      {
        userId: userId,
        bookId: scannedBook.id,   // book from scan API
        rollNumber: rollNumber
      }
    );

    alert(res.data);
    setScannedBook(null);
    setShowScanner(false);

  } catch (err) {
    console.log(err);
    setError(err.response?.data || "Failed to issue book");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-body text-center">

              <h3 className="mb-3">📚 Scan Book</h3>

              {!isInsideLibrary && (
                <div className="alert alert-danger">
                  You must enter the library to issue a book.
                </div>
              )}

              {isInsideLibrary && !showScanner && (
                <button
                  className="btn btn-primary w-100"
                  onClick={() => setShowScanner(true)}
                >
                  📷 Scan Book
                </button>
              )}

              {showScanner && (
                <div id="reader" className="my-3"></div>
              )}

              {loading && (
                <div className="spinner-border text-primary my-2"></div>
              )}

              {error && (
                <div className="alert alert-danger mt-2">{error}</div>
              )}

              {/* 🔹 Confirmation */}
              {scannedBook && (
                <div className="card mt-3">
                  <div className="card-body">
                    <h5 className="card-title">Confirm Issue</h5>

                    <p><b>Title:</b> {scannedBook.title}</p>
                    <p><b>Author:</b> {scannedBook.author}</p>
                    <p><b>ISBN:</b> {scannedBook.isbn}</p>
                    <p><b>Available:</b> {scannedBook.availableCount}</p>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success w-100"
                        onClick={confirmIssue}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-outline-danger w-100"
                        onClick={() => setScannedBook(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
