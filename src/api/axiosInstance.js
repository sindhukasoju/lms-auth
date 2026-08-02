// src/api/axiosInstance.js
// NOTE: All API files now use mockService.js (demo mode).
// This file is kept for structure — axiosInstance is not used in demo mode.
// To re-enable real APIs: restore this file and update api/*.js imports.

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // placeholder — not used in demo mode
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
