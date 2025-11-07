import { useEffect, useState } from "react";
import { api } from "../api.js";
import { WrapAsync } from "../utils/WrapAsync.js";
import { useLocation } from "react-router-dom";

export default function Dashboard({ user, msg, setMsg, setMsgType, msgType }) {
  const location = useLocation();
  setMsg(location?.state?.msg);
  console.log("msg in dashboard: ", location?.state?.msg);
  const [myBookings, setMyBookings] = useState({
    showBookings: "",
    countBookings: "",
  });
  console.log("role dashboard: ", user?.role);
  useEffect(() => {
    const getAllDetails = WrapAsync(
      async () => {
        if (user?.role === "owner") {
          const res = await api.get("/slots/dashboard/owner");
          console.log("all bookings of owner: ", res?.data);
          setMyBookings({
            showBookings: res?.data?.bookings,
            countBookings: res?.data?.countBookings,
          });
          console.log("show bookings: ", res?.data?.bookings);
          return res;
        }
        if (user?.role === "user") {
          const res = await api.get("/bookings/dashboard/user");
          console.log("all bookings: ", res?.data);
          setMyBookings({
            showBookings: res?.data?.bookings,
            countBookings: res?.data?.totalBookings,
          });
          return;
        }
      },
      setMsg,
      setMsgType
    );
    getAllDetails();
  }, []);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        {msg && typeof msg === "string" && msg.trim() !== "" && (
          <div className="row mb-4">
            <div className="col-12">
              <div
                className={`alert alert-dismissible fade show ${
                  msgType === "success" ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                <i className={`fas ${
                  msgType === "success" ? "fa-check-circle" : "fa-exclamation-triangle"
                } me-2`}></i>
                {msg}
                <button type="button" className="btn-close" onClick={() => setMsg("")}></button>
              </div>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="fw-bold text-dark mb-2">
                  <i className="fas fa-tachometer-alt me-3 text-primary"></i>
                  Dashboard
                </h1>
                <p className="text-muted">Welcome back, {user?.name || 'User'}!</p>
              </div>
              <div className="text-end">
                <span className="badge bg-primary fs-6 px-3 py-2">
                  <i className="fas fa-user me-2"></i>
                  {user?.role || 'User'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-lg-6 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 hover-card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                    <i className="fas fa-calendar-check text-primary fs-3"></i>
                  </div>
                  <div>
                    <h5 className="card-title fw-bold mb-1">Total Bookings</h5>
                    <p className="text-muted mb-0">Active reservations</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h2 className="fw-bold text-primary mb-0">
                    {myBookings.countBookings || '0'}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 hover-card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                    <i className="fas fa-chart-line text-success fs-3"></i>
                  </div>
                  <div>
                    <h5 className="card-title fw-bold mb-1">Revenue</h5>
                    <p className="text-muted mb-0">Total earnings</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h2 className="fw-bold text-success mb-0">
                    ${(myBookings.countBookings * 299) || '0'}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-header bg-white border-0 p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold mb-0">
                    <i className="fas fa-list me-2 text-primary"></i>
                    Recent Bookings
                  </h5>
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="fas fa-eye me-1"></i>
                    View All
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                {myBookings.showBookings && myBookings.showBookings.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="border-0 px-4 py-3">Booking ID</th>
                          <th className="border-0 px-4 py-3">Customer</th>
                          <th className="border-0 px-4 py-3">Date</th>
                          <th className="border-0 px-4 py-3">Status</th>
                          <th className="border-0 px-4 py-3">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myBookings.showBookings.slice(0, 5).map((booking, index) => (
                          <tr key={booking._id || index}>
                            <td className="px-4 py-3">
                              <span className="fw-semibold">#{booking._id?.slice(-6) || `BK${index + 1}`}</span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="d-flex align-items-center">
                                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                                  <i className="fas fa-user text-primary"></i>
                                </div>
                                {booking.userName || booking.user?.name || 'Customer'}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-muted">
                              {new Date(booking.createdAt || Date.now()).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <span className="badge bg-success rounded-pill">
                                <i className="fas fa-check me-1"></i>
                                Confirmed
                              </span>
                            </td>
                            <td className="px-4 py-3 fw-bold text-success">
                              ${booking.amount || '299'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="fas fa-calendar-times text-muted mb-3" style={{fontSize: '3rem'}}></i>
                    <h5 className="text-muted mb-2">No Bookings Yet</h5>
                    <p className="text-muted">Your recent bookings will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
