import React from "react";
import { useState } from "react";
import { WrapAsync } from "../utils/WrapAsync";
import { api } from "../api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditSlots({ navigate }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    images: [],
    price: 0,
    food: "",
    description: "",
    number: "",
  });
  useEffect(() => {
    const getSingleSlots = async () => {
      const res = await api.get(`/slots/single-slots/${id}`);
      // console.log("single slots: ", res?.data);
      setFormData(res?.data?.slots);
    };
    getSingleSlots();
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((p) => ({ ...p, images: Array.from(files) }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };
  const handleSubmit = WrapAsync(async (e) => {
    e.preventDefault();
    console.log("form data: ", formData);
    const form = new FormData();
    for (let key in formData) {
      if (key === "images") {
        formData.images.forEach((img) => form.append("images", img));
      } else {
        form.append(key, formData[key]);
      }
    }
    // console.log("new form: ", form);
    const res = await api.patch(`/slots/${id}/edit`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("slot updated: ", res?.data);
    navigate("/dashboard", { state: res?.data, role: res?.data?.role });
  });
  return (
    <div>
      <div>
        <h1>Edit Slots</h1>
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
    </div>
  );
}
