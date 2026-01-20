import axios from "axios";

const api = axios.create({
    // baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000", // backend URL
    baseURL: "http://localhost:3000", // backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
