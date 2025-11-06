import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="row">
        <div className="cols-lg-xl">
          <ul className="d-flex flex-column">
            <Link to="/dashboard" className="text-decoration-none ms-2">
              Dashboard
            </Link>
            <Link to="/" className="text-decoration-none ms-2">
              Home
            </Link>
            <Link to="/profile" className="text-decoration-none ms-2">
              Profile
            </Link>
            <Link to="/all-slots" className="text-decoration-none ms-2">
              All Slots
            </Link>
            <Link to="/new-slots" className="text-decoration-none ms-2">
              New Slots
            </Link>
            <Link to="/new-bookings" className="text-decoration-none ms-2">
              New Bookings
            </Link>
            <button
              // to="#"
              onClick={() => navigate(`/auth`, { state: "owner" })}
              className="text-decoration-none ms-2"
            >
              Register Owner
            </button>
            <button
              // to="#"
              onClick={() => navigate(`/auth`, { state: "owner" })}
              className="text-decoration-none ms-2"
            >
              Login Owner
            </button>
            <button
              // to="#"
              onClick={() => navigate(`/auth`, { state: "user" })}
              className="text-decoration-none ms-2"
            >
              Register User
            </button>
            <button
              // to="#"
              onClick={() => navigate(`/auth`, { state: "user" })}
              className="text-decoration-none ms-2"
            >
              Login User
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth");
              }}
              className="text-decoration-non ms-2"
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
