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
    <div className="container">
      {msg !== "" && msg.trim() && (
        <p
          className={`alert ${
            msgType === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {msg}
        </p>
      )}
      <h1>Single Slot</h1>
      {slots ? (
        <div key={slots._id}>
          <img src={`http://localhost:3000/${slots?.images.map((i) => i)}`} />
          <p>Name: {slots?.title}</p>
          <p>Owner: {slots?.owner?.name}</p>
          <p>Description: {slots?.description}</p>
          <p>Price: {slots?.price}</p>
          <p>Location: {slots?.location}</p>
          <p>number: {slots?.number}</p>
          {user?.role === "user" && (
            <button
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
                    images: slots?.images.map((i) => i),
                  },
                })
              }
            >
              Book
            </button>
          )}
        </div>
      ) : (
        "No Single Slots"
      )}
      {user?.role === "owner" ? (
        <>
          <button onClick={() => handleDelete(slots?._id)}>Delete Slots</button>
          <button onClick={() => navigate(`/${slots?._id}/edit-slots`)}>
            Edit Slots
          </button>
        </>
      ) : null}
    </div>
  );
}
