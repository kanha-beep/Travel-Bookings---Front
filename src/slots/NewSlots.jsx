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
    <div className="container">
      {msg !== "" && msg.trim() && (
        <div
          className={`alert ${
            msgType === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {msg}
        </div>
      )}
      <h1>Add Slots</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          name="images"
          multiple
          onChange={handleChange}
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Enter Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Food Details"
          name="food"
          value={formData.food}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Enter Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Your Number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}
