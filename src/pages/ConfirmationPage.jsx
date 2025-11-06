import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ConfirmationPage({ user }) {
  console.log("user name who booked: ", user?.name);
  const navigate = useNavigate();
  const { state } = useLocation();
  const msg = state?.msg;
  // console.log(state?.msg);
  const details = state?.state?.slots;
  console.log("details", details);
  setTimeout(() => {
    navigate("/dashboard", { state: state?.role });
  }, 10000);
  return (
    <div className="container">
      {msg && (
        <p className="alert alert-success" role="alert">
          {msg}
        </p>
      )}
      <h1>Confirmation Page</h1>
      {user?.role === "user" && (
        <div>
          <h2>Booking Details:</h2>
          <p>Hello {user?.name}</p>
          <p>Check-in: {state?.bookings?.checkIn}</p>
          <p>Check-out: {state?.bookings?.checkOut}</p>
          <p>Number: {state?.bookings?.number}</p>
          <p>Members: {state?.bookings?.members}</p>
          <p>Your bookings is confirmed in {state?.title}</p>
        </div>
      )}
      {user?.role === "owner" && (
        <div>
          <h2>Slots Details:</h2>
          {Array.isArray(details?.images) &&
            details.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:3000/uploads/${image}`} // ✅ add proper path if needed
                alt={`Image ${index + 1}`}
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            ))}
          <p>Hello {user?.name}</p>
          <p>Your hotel name: {details?.title}</p>
          <p>Food: {details?.food}</p>
          <p>Number: {details?.number}</p>
          <p>Price: {details?.price}</p>
          <p>Location: {details?.location}</p>
        </div>
      )}
    </div>
  );
}
