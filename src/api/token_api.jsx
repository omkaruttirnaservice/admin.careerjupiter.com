// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";

// // const API_BASE_URL = "http://192.168.1.12:5000"; // Replace with your base API URL
// const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjdlY2M3ODRkMGY4MjY2YTgxNDhmNjhlIiwiaWF0IjoxNzQzNTcwODIwLCJleHAiOjE3NDM1NzQ0MjB9.s6u1u2FaemmbArcq8FH0eEmGGLMOboJNpSsY8cPB-H4"; // Replace with actual token

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     Authorization: TOKEN,
//     // "Content-Type": "application/json",
//   },
// });

// export default api;


import axios from "axios";
import Cookies from "js-cookie"; // Import for token handling
import { API_BASE_URL } from "../Constant/constantBaseUrl";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to dynamically set the token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Get token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set auth header dynamically
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
