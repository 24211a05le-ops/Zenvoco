import axios from "axios";

const DEFAULT_URL = import.meta.env.DEV ? "http://127.0.0.1:8000" : "https://zenvoco.onrender.com";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  
  // Attach the Live Server Access Key to bypass the new backend middleware
  req.headers["X-Live-Server-Key"] = import.meta.env.VITE_LIVE_SERVER_KEY || "zenvoco-secure-key-24211a05le";
  
  return req;
});

export default API;