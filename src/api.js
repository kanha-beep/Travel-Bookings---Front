import axios from "axios"
const FRONTEND_URL = import.meta.env.VITE_API_URL
export const api = axios.create({
    baseURL: FRONTEND_URL,
    withCredentials: true
})
console.log("Front url", FRONTEND_URL);