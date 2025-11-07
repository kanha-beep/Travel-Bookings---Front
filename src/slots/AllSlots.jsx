import { useNavigate } from "react-router-dom";
import React from "react";
import { api } from "../api.js";
import { useEffect } from "react";
import { WrapAsync } from "../utils/WrapAsync.js";
import { useState } from "react";
export default function AllSlots({ msg, setMsg, setMsgType, msgType }) {
  const navigate = useNavigate();
  const [allSlots, setAllSlots] = useState([]);
  useEffect(() => {
    const getAllSlots = WrapAsync(
      async () => {
        const res = await api.get("/slots/all-slots");
        console.log("all slots: ", res?.data);
        setAllSlots(res?.data?.slots);
      },
      setMsg,
      setMsgType
    );
    getAllSlots();
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
        
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="fw-bold text-dark mb-2">
                  <i className="fas fa-calendar-alt me-3 text-primary"></i>
                  Available Slots
                </h1>
                <p className="text-muted">Discover amazing travel destinations</p>
              </div>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/new-slots')}
              >
                <i className="fas fa-plus me-2"></i>
                Add New Slot
              </button>
            </div>
          </div>
        </div>

        {allSlots && allSlots.length > 0 ? (
          <div className="row g-4">
            {allSlots.map((slot) => (
              <div key={slot._id} className="col-lg-4 col-md-6">
                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card">
                  <div className="position-relative">
                    {slot?.images?.length > 0 ? (
                      <img
                        src={`http://localhost:3000/uploads/${slot.images[0]}`}
                        alt={slot.title}
                        className="card-img-top"
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div 
                        className="card-img-top bg-gradient d-flex align-items-center justify-content-center"
                        style={{ height: '250px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                      >
                        <i className="fas fa-image text-white fs-1 opacity-50"></i>
                      </div>
                    )}
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-primary rounded-pill px-3 py-2">
                        <i className="fas fa-star me-1"></i>
                        New
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold mb-3 text-truncate">{slot.title}</h5>
                    <p className="card-text text-muted mb-3" style={{ height: '60px', overflow: 'hidden' }}>
                      {slot.description}
                    </p>
                    
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="text-muted small">
                        <i className="fas fa-map-marker-alt me-1"></i>
                        {slot.location || 'Location TBD'}
                      </div>
                      <div className="fw-bold text-primary fs-5">
                        ${slot.price || '999'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer bg-transparent border-0 p-4 pt-0">
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-primary btn-lg rounded-3"
                        onClick={() => navigate(`/${slot._id}/single-slots`)}
                      >
                        <i className="fas fa-eye me-2"></i>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <div className="mb-4">
                  <i className="fas fa-calendar-times text-muted" style={{ fontSize: '4rem' }}></i>
                </div>
                <h3 className="text-muted mb-3">No Slots Available</h3>
                <p className="text-muted mb-4">There are currently no travel slots available. Check back later!</p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate('/new-slots')}
                >
                  <i className="fas fa-plus me-2"></i>
                  Create First Slot
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </div>
  );
}
