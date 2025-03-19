import axios from "axios";

const API_BASE_URL = "http://192.168.1.20:5000"; // Replace with your base API URL
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDdiNmRiOTBlNjAyNDYyYjRmZDM4NyIsImlhdCI6MTc0MjI3NDk5NCwiZXhwIjoxNzQyMjc4NTk0fQ.shiNqY_4Zto9GCFIh-6m10iLPe7wFt_sXkgjd8oueuM"; // Replace with actual token

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: TOKEN,
    // "Content-Type": "application/json",
  },
});

export default api;
