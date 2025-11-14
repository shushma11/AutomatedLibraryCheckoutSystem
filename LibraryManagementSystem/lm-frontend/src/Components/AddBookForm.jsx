import React, { useState } from "react";
import axios from "axios";

export default function AddBookForm({ onBookAdded }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleAddBook = async (e) => {
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

      await axios.post("http://localhost:8080/api/books/add", payload);
      alert("Book added successfully!");
      onBookAdded(); // refresh book list
      setTitle("");
      setAuthor("");
      setIsbn("");
      setCategory("");
      setCount("");
      setSecretKey("");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please check your secret key or inputs.");
    }
  };

  return (
    <form className="card p-4 mb-4 shadow-sm" onSubmit={handleAddBook}>
      <h4 className="text-success fw-bold mb-3">Add New Book</h4>
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
      <button type="submit" className="btn btn-success w-100">
        Add Book
      </button>
    </form>
  );
}
