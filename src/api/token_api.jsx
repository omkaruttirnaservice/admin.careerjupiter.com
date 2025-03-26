import axios from "axios";

const API_BASE_URL = "http://192.168.1.12:5000"; // Replace with your base API URL
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTI2ODY0MmYxOTdhMzYwMTYzZWJiOSIsImlhdCI6MTc0MjkwNjc2OSwiZXhwIjoxNzQyOTEwMzY5fQ.3JeAdUcDJfno-SnT-ON0enwaEQPPSk-n74OQl4wRoJ4"; // Replace with actual token

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: TOKEN,
    // "Content-Type": "application/json",
  },
});

export default api;
