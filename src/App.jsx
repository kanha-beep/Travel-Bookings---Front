import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./auth/Auth.jsx";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AllSlots from "./slots/AllSlots.jsx";
import SingleSlots from "./slots/SingleSlots.jsx";
import NewSlots from "./slots/NewSlots.jsx";
import EditSlots from "./slots/EditSlots.jsx";
import { useState } from "react";
import { useEffect } from "react";
import BookingsForm from "./bookings/BookingsForm.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import Profile from "./pages/Profile.jsx";
import { WrapAsync } from "./utils/WrapAsync.js";
import { api } from "./api.js";
function App() {
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserDetails = WrapAsync(async () => {
      const res = await api.get("/auth/me");
      console.log("user details: ", res?.data);
      setUser(res?.data?.user);
    });
    getUserDetails();
  }, []);
  // console.log("user in app: ", user);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <>
      <Navbar navigate={navigate} />
      <Routes>
        <Route
          path="/auth"
          element={
            <Auth
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={setIsLoggedIn}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/"
          element={<Home navigate={navigate} user={user} />}
          msg={msg}
          setMsg={setMsg}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              isLoggedIn={isLoggedIn}
              navigate={navigate}
              user={user}
              msg={msg}
              setMsg={setMsg}
            />
          }
        />
        <Route
          path="/all-slots"
          element={
            <AllSlots
              navigate={navigate}
              user={user}
              msg={msg}
              setMsg={setMsg}
            />
          }
        />
        <Route
          path="/:id/single-slots"
          element={
            <SingleSlots
              navigate={navigate}
              user={user}
              msg={msg}
              setMsg={setMsg}
            />
          }
        />
        <Route
          path="/new-slots"
          element={
            <NewSlots
              navigate={navigate}
              user={user}
              msg={msg}
              setMsg={setMsg}
            />
          }
        />
        <Route
          path="/:id/edit-slots"
          element={
            <EditSlots
              navigate={navigate}
              user={user}
              msg={msg}
              setMsg={setMsg}
            />
          }
        />
        <Route
          path="/new-bookings"
          element={
            <BookingsForm navigate={navigate} msg={msg} setMsg={setMsg} />
          }
        />
        <Route
          path="/confirm"
          element={<ConfirmationPage user={user} msg={msg} setMsg={setMsg} />}
        />
        <Route
          path="/profile"
          element={<Profile user={user} msg={msg} setMsg={setMsg} />}
        />
      </Routes>
    </>
  );
}

export default App;
