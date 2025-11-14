import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateBookForm({ book, onBookUpdated, onCancel }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [isbn, setIsbn] = useState(book.isbn || "");
  const [category, setCategory] = useState(book.category || "");
  const [count, setCount] = useState(book.count);
  const [secretKey, setSecretKey] = useState("");

  const handleUpdateBook = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title,
        author,
        isbn,
        category,
        count: parseInt(count),
        secretKey,
      };

      await axios.put(`http://localhost:8080/api/books/update/${book.id}`, payload);
      alert("Book updated successfully!");
      onBookUpdated(); // refresh book list
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book. Please check your secret key or inputs.");
    }
  };

  return (
    <form className="card p-4 mb-4 shadow-sm" onSubmit={handleUpdateBook}>
      <h4 className="text-warning fw-bold mb-3">Update Book</h4>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Count"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        required
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Admin Secret Key"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        required
      />

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-warning">
          Update
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
