import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBookForm from "./AddBookForm";
import UpdateBookForm from "./UpdateBookForm";

export default function AllBooksPage({ role }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Branches");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchQuery, categoryFilter, onlyAvailable]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books/all");
      const data = Array.isArray(response.data) ? response.data : [];
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to load books.");
    }
  };

  const filterBooks = () => {
    let temp = books;

    // Search by title or author
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      temp = temp.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (categoryFilter !== "All Branches") {
      temp = temp.filter((b) => b.category === categoryFilter);
    }

    // Show only available
    if (onlyAvailable) {
      temp = temp.filter((b) => b.available);
    }

    setFilteredBooks(temp);
  };

  const uniqueCategories = ["All Branches", ...new Set(books.map((b) => b.category))];

  const handleDelete = async (bookId) => {
    const secretKey = prompt("Enter Admin Secret Key to Delete Book:");
    if (!secretKey) return;

    try {
      await axios.delete(`http://localhost:8080/api/books/delete/${bookId}`, {
        params: { secretKey },
      });
      alert("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book. Check your secret key.");
    }
  };

  const handleTakeBook = async (bookId) => {
    if (!userId) {
      alert("User not logged in!");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:8080/api/issued/issue/${userId}/${bookId}`
      );
      alert(res.data);

      setBooks((prev) =>
        prev.map((b) =>
          b.id === bookId
            ? { ...b, count: b.count > 0 ? b.count - 1 : 0, available: b.count > 1 }
            : b
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Error issuing book");
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📚 All Books</h2>
        {role === "ADMIN" && !editingBook && (
          <button
            className="btn btn-success"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "⬅️ Back" : "➕ Add Book"}
          </button>
        )}
      </div>

      {/* Add / Update Forms */}
      {showAddForm && role === "ADMIN" && !editingBook && (
        <AddBookForm
          onBookAdded={() => {
            fetchBooks();
            setShowAddForm(false);
          }}
        />
      )}
      {editingBook && role === "ADMIN" && (
        <UpdateBookForm
          book={editingBook}
          onBookUpdated={() => {
            fetchBooks();
            setEditingBook(null);
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-2 d-flex align-items-center">
          <input
            type="checkbox"
            id="availableOnly"
            checked={onlyAvailable}
            onChange={() => setOnlyAvailable(!onlyAvailable)}
          />
          <label htmlFor="availableOnly" className="ms-2 mb-0">
            Only Available
          </label>
        </div>
      </div>

      {/* Books Grid */}
      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="col-md-4 mb-4" key={book.id}>
              <div className="card shadow-lg h-100 border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark fw-bold">{book.title}</h5>
                  <p className="text-muted mb-1">✍️ Author: {book.author}</p>
                  <p className="text-muted mb-1">📗 Category: {book.category}</p>
                  <p className="text-muted mb-1">🔢 Count: {book.count}</p>
                  <p
                    className={`fw-semibold ${
                      book.available ? "text-success" : "text-danger"
                    }`}
                  >
                    {book.available ? "✅ Available" : "❌ Not Available"}
                  </p>

                  {/* Admin buttons */}
                  {role === "ADMIN" && (
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => setEditingBook(book)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(book.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}

                  {/* Student take book button */}
                  {role === "STUDENT" && userId && book.available && (
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => handleTakeBook(book.id)}
                    >
                      📖 Take Book
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-5">No books found.</p>
        )}
      </div>
    </div>
  );
}
