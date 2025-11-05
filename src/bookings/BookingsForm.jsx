import React from "react";
import { useState } from "react";
import { api } from "../api.js";
import { WrapAsync } from "../utils/WrapAsync.js";
import { DateRange } from "react-date-range"; // ✅ Must import from react-date-range
import "react-date-range/dist/styles.css"; // ✅ Base styles required
import "react-date-range/dist/theme/default.css";
import { useLocation } from "react-router-dom";

export default function BookingsForm({ navigate, user }) {
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
  const handleSubmit = WrapAsync(async (e) => {
    e.preventDefault();
    console.log("form data: ", { ...formData, slotsId });
    const res = await api.post("/bookings/new", { ...formData, slotsId });
    console.log("booking created in form: ", res?.data);
    navigate("/confirm", { state: { ...res?.data, title } });
  });
  return (
    <div>
      <h1>Book your slot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Phone number"
          name="number"
          value={formData.number}
          onChange={handleChange}
        />
        {/* <input
          type="date"
          placeholder="Enter Check In"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="Enter Enter Check out"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
        /> */}
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
        />
        <input
          type="number"
          placeholder="Enter Number of Members"
          name="members"
          value={formData.members}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-success">
          Book
        </button>
      </form>
    </div>
  );
}
