import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { api } from "../api";
import { WrapAsync } from "../utils/WrapAsync.js";

export default function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserDetails = WrapAsync(async () => {
      const res = await api.get("/auth/me");
      console.log("user details: ", res?.data);
      setUser(res?.data?.user);
    });
    getUserDetails();
  }, []);
  console.log("user: ", user);
  return (
    <div>
      <h1>Profile</h1>
      <p>User name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role:  {user?.role}</p>
      <p>Id:  {user?._id}</p>
    </div>
  );
}
