import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.5:5000",
});

// Fetch university details by ID
const getUniversityById = async (id) => {
  const response = await api.get(`/api/university/${id}`);
  return response.data;
};

// Update university details
const updateUniversity = (id, data) => {
  return api.put(`/api/university/${id}`, data);
};

// Create a new university
const createUniversity = (data) => {
  return api.post("/api/university/", data);
};

// Export all functions properly
export { getUniversityById, updateUniversity, createUniversity };
