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
    <div>
      {msg && msg.trim() !== "" && (
        <div
          className={`alert ${
            msgType === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {msg}
        </div>
      )}
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Bookings</h5>
              <p className="card-text">{myBookings.showBookings}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Number of Bookings</h5>
              <p className="card-text">{myBookings.countBookings}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
