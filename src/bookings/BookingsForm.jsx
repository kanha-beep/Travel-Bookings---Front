import React from "react";
import { useState } from "react";
import { api } from "../api.js";
import { WrapAsync } from "../utils/WrapAsync.js";
import { DateRange } from "react-date-range"; // ✅ Must import from react-date-range
import "react-date-range/dist/styles.css"; // ✅ Base styles required
import "react-date-range/dist/theme/default.css";
import { useLocation } from "react-router-dom";

export default function BookingsForm({
  navigate,
  user,
  msg,
  setMsg,
  setMsgType,
  msgType,
}) {
  const location = useLocation();
  const slotsId = location?.state?._id;
  const title = location?.state?.title;
  console.log("slotsId: ", slotsId, title, user);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    number: "",
    members: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const handleSubmit = WrapAsync(
    async (e) => {
      e.preventDefault();
      console.log("form data: ", { ...formData, slotsId });
      const res = await api.post("/bookings/new", { ...formData, slotsId });
      console.log("booking created in form: ", res?.data);
      navigate("/confirm", { state: { ...res?.data, title } });
      return res;
    },
    setMsg,
    setMsgType
  );
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
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="fw-bold text-dark mb-3">
                <i className="fas fa-calendar-plus me-3 text-primary"></i>
                Book Your Adventure
              </h1>
              <p className="text-muted lead">
                Complete your booking for <span className="fw-bold text-primary">{title}</span>
              </p>
            </div>

            {/* Booking Form */}
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-header bg-gradient text-white p-4 rounded-top-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <h4 className="fw-bold mb-0">
                  <i className="fas fa-edit me-2"></i>
                  Booking Details
                </h4>
              </div>
              
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  {/* Phone Number */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold mb-2">
                      <i className="fas fa-phone me-2 text-primary"></i>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter your phone number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Date Range Picker */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold mb-3">
                      <i className="fas fa-calendar-alt me-2 text-primary"></i>
                      Select Your Travel Dates
                    </label>
                    <div className="border rounded-3 p-3 bg-white">
                      <DateRange
                        ranges={[
                          {
                            startDate: formData.checkIn
                              ? new Date(formData.checkIn)
                              : new Date(),
                            endDate: formData.checkOut
                              ? new Date(formData.checkOut)
                              : new Date(),
                            key: "selection",
                          },
                        ]}
                        onChange={(ranges) => {
                          setFormData((p) => ({
                            ...p,
                            checkIn: ranges.selection.startDate,
                            checkOut: ranges.selection.endDate,
                          }));
                        }}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        direction="horizontal"
                        className="w-100"
                      />
                    </div>
                  </div>

                  {/* Number of Members */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold mb-2">
                      <i className="fas fa-users me-2 text-primary"></i>
                      Number of Travelers
                    </label>
                    <select
                      className="form-select form-select-lg rounded-3"
                      name="members"
                      value={formData.members}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select number of travelers</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5 People</option>
                      <option value="6">6+ People</option>
                    </select>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-light rounded-3 p-4 mb-4">
                    <h6 className="fw-bold mb-3">
                      <i className="fas fa-receipt me-2 text-primary"></i>
                      Booking Summary
                    </h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Destination:</span>
                          <span className="fw-semibold">{title}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Travelers:</span>
                          <span className="fw-semibold">{formData.members || '0'} People</span>
                        </div>
                      </div>
                      <div className="col-12">
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">Total Amount:</span>
                          <span className="fw-bold text-primary fs-5">
                            ${(formData.members * 299) || '299'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg py-3 rounded-3">
                      <i className="fas fa-credit-card me-2"></i>
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Security Notice */}
            <div className="text-center mt-4">
              <p className="text-muted small">
                <i className="fas fa-shield-alt me-1 text-success"></i>
                Your booking is secured with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
