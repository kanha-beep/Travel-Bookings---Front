import axios from "axios"
const FRONTEND_URL = import.meta.env.VITE_API_URL
export const api = axios.create({
    baseURL: FRONTEND_URL,
    withCredentials: true
})
console.log("Front url", FRONTEND_URL);
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
