import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { api } from "../api.js";
export default function Auth({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const role = location?.state;
  console.log("role: ", role);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const handleUserAuth = async () => {
    if (isLogin) {
      try {
        const res = await api.post("/auth/user/login", formData);
        console.log("user logged in: ", res?.data);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        localStorage.setItem("token", res?.data?.token);
        setIsLoggedIn(true);
        navigate("/all-slots");
      } catch (e) {
        console.log("error in login: ", e?.response?.data?.message);
        setIsLogin(false);
      }
    } else {
      try {
        const res = await api.post("/auth/user/register", formData);
        console.log("user registered in: ", res?.data);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        localStorage.setItem("token", res?.data?.token);
        setIsLoggedIn(true);
        navigate("/all-slots");
      } catch (e) {
        console.log("error in login: ", e?.response?.data?.message);
        setIsLogin(true);
      }
    }
  };
  const handleOwnerAuth = async () => {
    if (isLogin) {
      try {
        const res = await api.post("/auth/owner/login", formData);
        console.log("user logged in: ", res?.data);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        localStorage.setItem("token", res?.data?.token);
        setIsLoggedIn(true);
        navigate("/all-slots");
      } catch (e) {
        console.log("error in login: ", e?.response?.data?.message);
        setIsLogin(false);
      }
    } else {
      try {
        const res = await api.post("/auth/owner/register", formData);
        console.log("user registered in: ", res?.data);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        localStorage.setItem("token", res?.data?.token);
        setIsLoggedIn(true);
        navigate("/all-slots");
      } catch (e) {
        console.log("error in login: ", e?.response?.data?.message);
        setIsLogin(true);
      }
    }
  };
  return (
    <div>
      <div className="row">
        <div>
          <button onClick={() => setIsLogin(true)}>Login</button>
          <button onClick={() => setIsLogin(false)}>Register</button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (role === "owner") handleOwnerAuth();
            else handleUserAuth();
          }}
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </>
          )}
          <button>{isLogin ? "Login" : "Register"}</button>
          <Link onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create Account" : "Already a User"}
          </Link>
        </form>
      </div>
    </div>
  );
}
