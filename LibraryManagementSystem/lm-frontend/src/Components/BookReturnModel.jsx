// import React, { useState } from "react";
// import axios from "axios";

// export default function BookReturnModal({ book, userId, onClose, onReturned }) {
//   const [rollNo, setRollNo] = useState("");

//   const handleReturn = async () => {
//     if (!rollNo) {
//       alert("Please enter your Roll Number");
//       return;
//     }

//     try {
//       await axios.put(
//         `http://localhost:8080/api/issued/return/${userId}/${book.id}`,
//         { rollNumber }
//       );
//       alert(`Book "${book.bookTitle}" returned successfully!`);
//       onReturned(); // refresh issued books
//       onClose(); // close modal
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data || "Error returning book");
//     }
//   };

//   return (
//     <div className="modal d-block" tabIndex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content shadow-lg">
//           <div className="modal-header bg-primary text-white">
//             <h5 className="modal-title">Return Book</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <p><strong>Title:</strong> {book.bookTitle}</p>
//             <p><strong>Author:</strong> {book.bookAuthor}</p>
//             <p><strong>Issue Date:</strong> {new Date(book.issueDate).toLocaleDateString()}</p>
//             <div className="mb-3">
//               <label className="form-label">Your Roll Number</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={rollNo}
//                 onChange={(e) => setRollNo(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="modal-footer">
//             <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
//             <button className="btn btn-success" onClick={handleReturn}>Return Book</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";

export default function BookReturnModel({ book, userId, onClose, onReturned }) {
  const [rollNo, setRollNo] = useState("");

  const handleReturn = () => {
    if (!rollNo) {
      alert("Please enter your Roll Number");
      return;
    }

    // Call parent function with bookId and rollNumber
    onReturned(book.id, rollNo); // ✅ pass correct parameters
    onClose(); // close modal
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content shadow-lg">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Return Book</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Title:</strong> {book.bookTitle}</p>
            <p><strong>Author:</strong> {book.bookAuthor}</p>
            <p><strong>Issue Date:</strong> {new Date(book.issueDate).toLocaleDateString()}</p>
            <div className="mb-3">
              <label className="form-label">Your Roll Number</label>
              <input
                type="text"
                className="form-control"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-success" onClick={handleReturn}>Return Book</button>
          </div>
        </div>
      </div>
    </div>
  );
}
