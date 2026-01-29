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

  // ❌ Safety check
  useEffect(() => {
    if (!book || !userId) {
      navigate("/issued-books");
    }
  }, [book, userId, navigate]);

  // 🔹 Check library entry (RFID)
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
  }, [rollNo]);

  // 🔹 Camera scanner
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

  // 🔹 Return API call
  async function handleReturn(isbn) {
    setLoading(true);
    setError("");

    console.log(book);
    // Check scanned book matches selected book
    console.log(isbn+"  "+book.isbn);
    if (isbn !== book.isbn) {
      setError("❌ This is NOT the correct book!");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("jwtToken");

    try {
        console.log("Return "+rollNo+"userID "+userId+"bookId "+book.bookId);
      const res = await axios.post(
  `http://localhost:8080/api/issued/return/${userId}/${book.bookId}`,
  { rollNumber: rollNo }
);

      console.log(res.data)
      alert(res.data);
      navigate("/issued-books");
    } catch (err) {
      setError(err.response?.data || "Failed to return book");
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

              <h3 className="mb-3">📚 Return Book</h3>

              <p><b>Book:</b> {book?.bookTitle}</p>
              <p><b>Author:</b> {book?.bookAuthor}</p>
              <p><b>Expected ISBN:</b> {book?.isbn}</p>

              {!isInsideLibrary && (
                <div className="alert alert-danger">
                  You must enter the library to return a book.
                </div>
              )}

              {isInsideLibrary && !showScanner && (
                <button
                  className="btn btn-primary w-100"
                  onClick={() => setShowScanner(true)}
                >
                  📷 Scan Book to Return
                </button>
              )}

              {showScanner && <div id="reader" className="my-3"></div>}

              {loading && (
                <div className="spinner-border text-primary my-2"></div>
              )}

              {scannedIsbn && (
                <div className="alert alert-info">
                  Scanned ISBN: {scannedIsbn}
                </div>
              )}

              {error && (
                <div className="alert alert-danger mt-2">{error}</div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
