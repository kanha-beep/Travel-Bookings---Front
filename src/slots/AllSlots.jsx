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
    <div>
      <div className="container">
        {msg && typeof msg === "string" && msg.trim() !== "" && (
          <h2
            className={`alert ${
              msgType === "success" ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {msg}
          </h2>
        )}
        <h1>All Slots</h1>
        {allSlots && allSlots ? (
          <>
            <div className="card" style={{ height: "10rem", width: "10rem" }}>
              {allSlots.map((slot) => (
                <div key={slot._id}>
                  {slot?.images?.length > 0 && (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${
                        slot.images[0]
                      }`}
                      alt="coming"
                      className="card-img-top"
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{slot.title}</h5>
                    <p className="card-text">{slot.description}</p>
                  </div>
                  <button onClick={() => navigate(`/${slot._id}/single-slots`)}>
                    View
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          "No Slots to show"
        )}
      </div>
    </div>
  );
}
