
import axios from "axios";
import Cookies from "js-cookie"; 
import { API_BASE_URL } from "../constant/constantBaseUrl";
const api = axios.create({
  baseURL: API_BASE_URL,
});

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
