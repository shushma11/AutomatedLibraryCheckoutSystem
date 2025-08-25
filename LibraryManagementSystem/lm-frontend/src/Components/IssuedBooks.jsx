import React from "react";

export default function IssuedBooks() {
  const issuedBooks = [
    { title: "Java Basics", issueDate: "2025-08-10", returnDate: "2025-08-20" },
    { title: "Spring Boot Guide", issueDate: "2025-08-15", returnDate: null }
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-primary text-white text-center">
          <h3 className="mb-0">📚 My Issued Books</h3>
        </div>
        <div className="card-body">
          <table className="table table-hover table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">📖 Title</th>
                <th scope="col">📅 Issue Date</th>
                <th scope="col">🔄 Return Date</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((book, index) => (
                <tr key={index}>
                  <td className="fw-semibold">{book.title}</td>
                  <td>{book.issueDate}</td>
                  <td>
                    {book.returnDate ? (
                      <span className="badge bg-success p-2">
                        {book.returnDate}
                      </span>
                    ) : (
                      <span className="badge bg-danger p-2">Not Returned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
