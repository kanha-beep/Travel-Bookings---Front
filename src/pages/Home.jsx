import React from "react";
import { Link } from "react-router-dom";
export default function Home({ msg, setMsg, user, navigate }) {
  return (
    <div>
      {msg && typeof msg === "string" && msg.trim() !== "" && (
        <div className="container mt-3">
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="fas fa-check-circle me-2"></i>
            {msg}
            <button type="button" className="btn-close" onClick={() => setMsg("")}></button>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="hero-section bg-gradient text-white py-5" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '60vh'}}>
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Discover Your Next Adventure
              </h1>
              <p className="lead mb-4">
                Book amazing travel experiences with ease. From exotic destinations to local getaways, 
                we have the perfect slots for your next journey.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/all-slots" className="btn btn-light btn-lg px-4">
                  <i className="fas fa-search me-2"></i>
                  Explore Slots
                </Link>
                {!user && (
                  <button 
                    onClick={() => navigate('/auth', { state: 'user' })}
                    className="btn btn-outline-light btn-lg px-4"
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Get Started
                  </button>
                )}
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <i className="fas fa-plane display-1 opacity-75"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="fw-bold mb-3">Why Choose Us?</h2>
              <p className="text-muted">Experience the best travel booking platform</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-calendar-check text-primary fs-2"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Easy Booking</h5>
                  <p className="text-muted">Book your travel slots in just a few clicks with our intuitive interface.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-shield-alt text-success fs-2"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Secure & Safe</h5>
                  <p className="text-muted">Your bookings and personal information are protected with top-level security.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-headset text-info fs-2"></i>
                  </div>
                  <h5 className="fw-bold mb-3">24/7 Support</h5>
                  <p className="text-muted">Get help whenever you need it with our round-the-clock customer support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-3">Ready to Start Your Journey?</h2>
              <p className="lead mb-4">
                Join thousands of travelers who trust us with their adventures.
              </p>
              {user ? (
                <Link to="/all-slots" className="btn btn-light btn-lg px-5">
                  <i className="fas fa-rocket me-2"></i>
                  Book Now
                </Link>
              ) : (
                <button 
                  onClick={() => navigate('/auth', { state: 'user' })}
                  className="btn btn-light btn-lg px-5"
                >
                  <i className="fas fa-user-plus me-2"></i>
                  Sign Up Today
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
