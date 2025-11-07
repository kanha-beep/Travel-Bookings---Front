import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api.js";
import { useState } from "react";
import { WrapAsync } from "../utils/WrapAsync.js";
export default function SingleSlots({
  navigate,
  user,
  msg,
  setMsg,
  setMsgType,
  msgType,
}) {
  // const [slotRole, setSlotRole] = useState("");
  const [slots, setSlots] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getSingleSlots = WrapAsync(
      async () => {
        const res = await api.get(`/slots/single-slots/${id}`);
        console.log("single slots: ", res?.data);
        setSlots(res?.data?.slots);
        // setSlotRole(res?.data?.slots?.owner?.role);
        return res;
      },
      setMsg,
      setMsgType
    );
    getSingleSlots();
  }, []);
  const handleDelete = async (id) => {
    const res = await api.delete(`/slots/${id}/delete`);
    console.log("deleted slots: ", res?.data);
    navigate(`/all-slots`);
  };
  console.log("single slots: ", slots);
  console.log("user in single: ", user?.role);
  console.log("role single slots: ", user?.role);
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
        
        {slots ? (
          <div className="row">
            {/* Image Gallery */}
            <div className="col-lg-8 mb-4">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                {slots?.images && slots.images.length > 0 ? (
                  <div id="slotCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {slots.images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <img
                            src={`http://localhost:3000/uploads/${image}`}
                            className="d-block w-100"
                            alt={slots.title}
                            style={{ height: '400px', objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                    {slots.images.length > 1 && (
                      <>
                        <button className="carousel-control-prev" type="button" data-bs-target="#slotCarousel" data-bs-slide="prev">
                          <span className="carousel-control-prev-icon"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#slotCarousel" data-bs-slide="next">
                          <span className="carousel-control-next-icon"></span>
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-gradient d-flex align-items-center justify-content-center" style={{ height: '400px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <i className="fas fa-image text-white" style={{ fontSize: '4rem', opacity: 0.5 }}></i>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Card */}
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: '20px' }}>
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <h3 className="fw-bold text-primary mb-2">${slots?.price || '299'}</h3>
                    <p className="text-muted mb-0">per person</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-map-marker-alt text-danger me-2"></i>
                      <span className="fw-semibold">{slots?.location}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-phone text-success me-2"></i>
                      <span>{slots?.number}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="fas fa-user text-info me-2"></i>
                      <span>Hosted by {slots?.owner?.name}</span>
                    </div>
                  </div>

                  {user?.role === "user" && (
                    <div className="d-grid mb-3">
                      <button
                        className="btn btn-primary btn-lg rounded-3"
                        onClick={() =>
                          navigate(`/new-bookings`, {
                            state: {
                              _id: slots._id,
                              owner: slots?.owner?._id,
                              price: slots?.price,
                              title: slots?.title,
                              number: slots?.number,
                              location: slots?.location,
                              food: slots?.food,
                              description: slots?.description,
                              images: slots?.images,
                            },
                          })
                        }
                      >
                        <i className="fas fa-calendar-plus me-2"></i>
                        Book Now
                      </button>
                    </div>
                  )}

                  {user?.role === "owner" && (
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-outline-primary rounded-3"
                        onClick={() => navigate(`/${slots?._id}/edit-slots`)}
                      >
                        <i className="fas fa-edit me-2"></i>
                        Edit Slot
                      </button>
                      <button 
                        className="btn btn-outline-danger rounded-3"
                        onClick={() => handleDelete(slots?._id)}
                      >
                        <i className="fas fa-trash me-2"></i>
                        Delete Slot
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-5">
                  <div className="row">
                    <div className="col-lg-8">
                      <h1 className="fw-bold text-dark mb-4">{slots?.title}</h1>
                      
                      <div className="mb-4">
                        <h5 className="fw-bold mb-3">
                          <i className="fas fa-info-circle me-2 text-primary"></i>
                          Description
                        </h5>
                        <p className="text-muted lh-lg">{slots?.description}</p>
                      </div>

                      {slots?.food && (
                        <div className="mb-4">
                          <h5 className="fw-bold mb-3">
                            <i className="fas fa-utensils me-2 text-warning"></i>
                            Food & Dining
                          </h5>
                          <p className="text-muted">{slots.food}</p>
                        </div>
                      )}

                      <div className="row g-4">
                        <div className="col-md-6">
                          <div className="bg-light rounded-3 p-3">
                            <div className="d-flex align-items-center">
                              <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                <i className="fas fa-star text-primary"></i>
                              </div>
                              <div>
                                <h6 className="fw-bold mb-0">4.8 Rating</h6>
                                <small className="text-muted">Based on 124 reviews</small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="bg-light rounded-3 p-3">
                            <div className="d-flex align-items-center">
                              <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                                <i className="fas fa-shield-alt text-success"></i>
                              </div>
                              <div>
                                <h6 className="fw-bold mb-0">Verified Host</h6>
                                <small className="text-muted">Trusted provider</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="fas fa-search text-muted" style={{ fontSize: '4rem' }}></i>
            </div>
            <h3 className="text-muted mb-3">Slot Not Found</h3>
            <p className="text-muted mb-4">The slot you're looking for doesn't exist or has been removed.</p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/all-slots')}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back to All Slots
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
