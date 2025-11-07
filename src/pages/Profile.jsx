import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { api } from "../api";
import { WrapAsync } from "../utils/WrapAsync.js";

export default function Profile({ msg, setMsg, setMsgType, msgType }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserDetails = WrapAsync(
      async () => {
        const res = await api.get("/auth/me");
        // console.log("user details: ", res?.data);
        setUser(res?.data?.user);
        return res;
      },
      setMsg,
      setMsgType
    );
    getUserDetails();
  }, []);
  // console.log("user: ", user);
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
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Profile Header */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-0">
                <div className="bg-gradient text-white p-4 rounded-top-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                  <div className="d-flex align-items-center">
                    <div className="bg-white bg-opacity-20 rounded-circle p-4 me-4">
                      <i className="fas fa-user text-white" style={{fontSize: '2.5rem'}}></i>
                    </div>
                    <div>
                      <h2 className="fw-bold mb-2">{user?.name || 'Loading...'}</h2>
                      <p className="mb-0 opacity-75">
                        <i className="fas fa-envelope me-2"></i>
                        {user?.email || 'Loading...'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-light rounded-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="fas fa-id-badge text-primary"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">User ID</small>
                          <span className="fw-semibold">{user?._id?.slice(-8) || 'Loading...'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center p-3 bg-light rounded-3">
                        <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="fas fa-user-tag text-success"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">Role</small>
                          <span className="badge bg-success px-3 py-2">
                            {user?.role || 'Loading...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Actions */}
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-header bg-white border-0 p-4">
                <h5 className="fw-bold mb-0">
                  <i className="fas fa-cog me-2 text-primary"></i>
                  Account Settings
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <button className="btn btn-outline-primary w-100 py-3">
                      <i className="fas fa-edit me-2"></i>
                      Edit Profile
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-outline-secondary w-100 py-3">
                      <i className="fas fa-key me-2"></i>
                      Change Password
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-outline-info w-100 py-3">
                      <i className="fas fa-bell me-2"></i>
                      Notifications
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-outline-warning w-100 py-3">
                      <i className="fas fa-shield-alt me-2"></i>
                      Privacy Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="row g-4 mt-2">
              <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 text-center h-100">
                  <div className="card-body p-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                      <i className="fas fa-calendar-check text-primary fs-4"></i>
                    </div>
                    <h4 className="fw-bold text-primary mb-1">12</h4>
                    <p className="text-muted mb-0">Total Bookings</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 text-center h-100">
                  <div className="card-body p-4">
                    <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                      <i className="fas fa-star text-success fs-4"></i>
                    </div>
                    <h4 className="fw-bold text-success mb-1">4.8</h4>
                    <p className="text-muted mb-0">Average Rating</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 text-center h-100">
                  <div className="card-body p-4">
                    <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                      <i className="fas fa-clock text-info fs-4"></i>
                    </div>
                    <h4 className="fw-bold text-info mb-1">2</h4>
                    <p className="text-muted mb-0">Years Member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
