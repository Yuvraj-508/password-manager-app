import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // your backend URL
});

// Attach token before every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
