import React from "react";
import { useState } from "react";
import { api } from "../api.js";
import { WrapAsync } from "../utils/WrapAsync.js";

export default function NewSlots({
  navigate,
  msg,
  setMsg,
  setMsgType,
  msgType,
}) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    images: [],
    price: 0,
    food: "",
    description: "",
    number: "",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((p) => ({ ...p, images: Array.from(files) }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };
  const handleSubmit = WrapAsync(
    async (e) => {
      e.preventDefault();
      // console.log("form data: ", formData);
      const form = new FormData();
      for (let key in formData) {
        if (key === "images") {
          formData.images.forEach((img) => form.append("images", img));
        } else {
          form.append(key, formData[key]);
        }
      }
      // console.log("new form: ", form);
      const res = await api.post("/slots/new", form);
      console.log("slot created: ", res?.data);
      setMsg(res?.data?.message);
      // navigate("/dashboard/user", { state: res?.data });
      navigate("/confirm", {
        state: { state: res?.data, msg },
        role: res?.data?.role,
      });
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
                <i className="fas fa-plus-circle me-3 text-primary"></i>
                Create New Travel Slot
              </h1>
              <p className="text-muted lead">
                Share your amazing destination with travelers around the world
              </p>
            </div>

            {/* Form Card */}
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-header bg-gradient text-white p-4 rounded-top-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <h4 className="fw-bold mb-0">
                  <i className="fas fa-edit me-2"></i>
                  Slot Details
                </h4>
              </div>
              
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Title */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-heading me-2 text-primary"></i>
                        Destination Title
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-3"
                        placeholder="e.g., Amazing Beach Resort in Goa"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Location */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-3"
                        placeholder="e.g., Goa, India"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Price */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-dollar-sign me-2 text-success"></i>
                        Price per Person
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text rounded-start-3">$</span>
                        <input
                          type="number"
                          className="form-control rounded-end-3"
                          placeholder="299"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Number */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-phone me-2 text-info"></i>
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-lg rounded-3"
                        placeholder="+1 234 567 8900"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Food Details */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-utensils me-2 text-warning"></i>
                        Food & Dining
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg rounded-3"
                        placeholder="e.g., All meals included, Local cuisine"
                        name="food"
                        value={formData.food}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Images */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-images me-2 text-purple"></i>
                        Upload Images
                      </label>
                      <div className="border-2 border-dashed border-primary rounded-3 p-4 text-center">
                        <input
                          type="file"
                          className="form-control"
                          name="images"
                          multiple
                          accept="image/*"
                          onChange={handleChange}
                          id="imageUpload"
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="imageUpload" className="cursor-pointer">
                          <i className="fas fa-cloud-upload-alt text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                          <p className="mb-0 text-muted">
                            Click to upload images or drag and drop
                          </p>
                          <small className="text-muted">PNG, JPG up to 10MB each</small>
                        </label>
                      </div>
                      {formData.images.length > 0 && (
                        <div className="mt-2">
                          <small className="text-success">
                            <i className="fas fa-check me-1"></i>
                            {formData.images.length} image(s) selected
                          </small>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-align-left me-2 text-secondary"></i>
                        Description
                      </label>
                      <textarea
                        className="form-control rounded-3"
                        rows="5"
                        placeholder="Describe your destination, activities, amenities, and what makes it special..."
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ resize: 'vertical' }}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg py-3 rounded-3">
                          <i className="fas fa-plus-circle me-2"></i>
                          Create Travel Slot
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center mt-4">
              <p className="text-muted small">
                <i className="fas fa-info-circle me-1"></i>
                Make sure all information is accurate before submitting
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
