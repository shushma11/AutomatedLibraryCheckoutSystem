import React, { useState } from "react";
import axios from "axios";

export default function BookIssueModal({ book, userId, onClose, onIssued }) {
  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);

  if (!book) return null;

  const handleIssue = async () => {
    if (!rollNumber.trim()) {
      alert("Please enter your Roll Number!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/issued/issue",
        {
          userId: userId,
          bookId: book.id,
          rollNumber: rollNumber
        }
      );

      alert(res.data);
      onIssued();   // refresh books in parent
      onClose();    // close modal
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Error issuing book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">📘 Confirm Book Issue</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <p><strong>Book:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn || "N/A"}</p>
            <p><strong>Available Count:</strong> {book.count}</p>

            <div className="mt-3">
              <label className="form-label fw-semibold">Enter Your Roll Number</label>
              <input
                type="text"
                className="form-control"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Ex: 22K61A05H4"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleIssue}
              disabled={loading}
            >
              {loading ? "Processing..." : "Take Book"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
