


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function LibraryInfo() {
//   const [data, setData] = useState({
//     totalSeats: 0,
//     studentsInside: 0,
//     lastUpdated: "",
//   });

//   const fetchLibraryInfo = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/library/info");
//       setData(res.data);
//     } catch (err) {
//       console.error("Failed to fetch library info", err);
//     }
//   };

//   useEffect(() => {
//     fetchLibraryInfo();

//     // auto refresh every 5 seconds
//     const interval = setInterval(fetchLibraryInfo, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="container-fluid mt-4 px-3 overflow-hidden">
//       <h2 className="mb-4 text-center fw-bold">📚 Library Information</h2>

//       <div className="row justify-content-center mx-0">
//         <div className="col-12 col-sm-10 col-md-6 col-lg-4">
//           <div className="card shadow-lg rounded-4 border-0">
//             <div className="card-body p-4">

//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="mb-0 text-truncate">Total Seats</h6>
//                 <span className="badge bg-primary fs-6">
//                   {data.totalSeats}
//                 </span>
//               </div>

//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="mb-0 text-truncate">Students Inside</h6>
//                 <span className="badge bg-success fs-6">
//                   {data.studentsInside}
//                 </span>
//               </div>

//               <div className="d-flex justify-content-between align-items-center">
//                 <h6 className="mb-0 text-truncate">Last Updated</h6>
//                 <small className="text-muted text-end">
//                   {data.lastUpdated
//                     ? new Date(data.lastUpdated).toLocaleString()
//                     : "--"}
//                 </small>
//               </div>

//             </div>

//             <div className="card-footer bg-light text-center">
//               <small className="text-secondary">
//                 Stay disciplined. Quiet study zone. 🤫
//               </small>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LibraryInfo() {
  const [data, setData] = useState({
    totalSeats: 0,
    studentsInside: 0,
    lastUpdated: "",
  });

  const fetchLibraryInfo = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/library/info");
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch library info", err);
    }
  };

  useEffect(() => {
    fetchLibraryInfo();
    const interval = setInterval(fetchLibraryInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Derived UI values (NO backend change)
  const availableSeats = data.totalSeats - data.studentsInside;
  const occupancyPercent =
    data.totalSeats > 0
      ? Math.round((data.studentsInside / data.totalSeats) * 100)
      : 0;

  const getStatus = () => {
    if (data.studentsInside >= data.totalSeats && data.totalSeats !== 0)
      return { label: "FULL", color: "danger" };
    if (occupancyPercent >= 80)
      return { label: "CROWDED", color: "warning" };
    return { label: "OPEN", color: "success" };
  };

  const status = getStatus();

  return (
    <div className="container-fluid mt-4 px-3">
      <h2 className="mb-4 text-center fw-bold">📚 Library Information</h2>

      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-7 col-lg-5">
          <div className="card shadow-lg rounded-4 border-0 overflow-hidden">
            <div className="card-body p-4">

              {/* Status */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="mb-0 fw-semibold">Library Status</h6>
                <span className={`badge bg-${status.color} fs-6 px-3 py-2`}>
                  {status.label}
                </span>
              </div>

              {/* Seats Info */}
              <div className="row text-center mb-4">
                <div className="col-4">
                  <h6 className="text-muted mb-1">Total</h6>
                  <h4 className="fw-bold text-primary">
                    {data.totalSeats}
                  </h4>
                </div>
                <div className="col-4">
                  <h6 className="text-muted mb-1">Inside</h6>
                  <h4 className="fw-bold text-success">
                    {data.studentsInside}
                  </h4>
                </div>
                <div className="col-4">
                  <h6 className="text-muted mb-1">Available</h6>
                  <h4 className="fw-bold text-dark">
                    {availableSeats >= 0 ? availableSeats : 0}
                  </h4>
                </div>
              </div>

              {/* Occupancy Progress */}
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small className="text-muted">Occupancy</small>
                  <small className="fw-semibold">{occupancyPercent}%</small>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                  <div
                    className={`progress-bar bg-${status.color}`}
                    role="progressbar"
                    style={{ width: `${occupancyPercent}%` }}
                  />
                </div>
              </div>

              {/* Last Updated */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <small className="text-muted">Last Updated</small>
                <small className="text-muted text-end">
                  {data.lastUpdated
                    ? new Date(data.lastUpdated).toLocaleString()
                    : "--"}
                </small>
              </div>

            </div>

            {/* Footer */}
            <div className="card-footer bg-light text-center">
              <small className="text-secondary">
                🟢 Live data • Auto-refresh every 5 seconds
              </small>
            </div>
          </div>

          {/* Note */}
          <p className="text-center text-muted mt-3 small">
            Maintain silence inside the library 🤫
          </p>
        </div>
      </div>
    </div>
  );
}
