import React from "react";

export default function AllBooksPage({ role }) {
  const books = [
    { title: "Java Basics", author: "John Doe", available: true },
    { title: "Spring Boot Guide", author: "Jane Smith", available: false },
    { title: "React for Beginners", author: "Alex Ray", available: true },
    { title: "Data Structures in C", author: "Mark Spencer", available: true },
    { title: "Machine Learning 101", author: "Sara Lee", available: false },
    { title: "Python Crash Course", author: "Eric Matthes", available: true },
    { title: "Design Patterns", author: "Gamma et al.", available: true },
    { title: "Clean Code", author: "Robert C. Martin", available: false },
    { title: "Effective Java", author: "Joshua Bloch", available: true }
  ];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📚 All Books</h2>
        {role === "ADMIN" && (
          <button className="btn btn-success">➕ Add Book</button>
        )}
      </div>

      <div className="row">
        {books.map((book, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-lg h-100 border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-dark fw-bold">{book.title}</h5>
                <p className="text-muted mb-1">✍️ Author: {book.author}</p>
                <p
                  className={`fw-semibold ${
                    book.available ? "text-success" : "text-danger"
                  }`}
                >
                  {book.available ? "✅ Available" : "❌ Not Available"}
                </p>

                {role === "ADMIN" && (
                  <div className="mt-auto d-flex justify-content-between">
                    <button className="btn btn-warning btn-sm">
                      ✏️ Edit
                    </button>
                    <button className="btn btn-danger btn-sm">
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
