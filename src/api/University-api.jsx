// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://192.168.1.5:5000",
// });

// // Fetch university details by ID
// const getUniversityById = async (id) => {
//   const response = await api.get(`/api/university/${id}`);
//   return response.data;
// };

// // Update university details
// const updateUniversity = (id, data) => {
//   return api.put(`/api/university/${id}`, data);
// };

// // Create a new university
// const createUniversity = (data) => {
//   return api.post("/api/university/", data);
// };

// // Export all functions properly
// export { getUniversityById, updateUniversity, createUniversity };


import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";

export const api = axios.create({
  baseURL: API_BASE_URL, // Use the imported constant instead of hardcoding
});

// Fetch university details by ID
const getUniversityById = async (id) => {
  try {
    const response = await api.get(`/api/university/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Fetch Error:", error.response?.data || error);
    throw error;
  }
};

// Update university details
const updateUniversity = async (id, data) => {
  try {
    if (!id) throw new Error("❌ Error: University ID is missing");

    const response = await api.put(`/api/university/update/${id}`, data); // ✅ Corrected URL
    console.log("✅ University updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update Error:", error.response?.data || error);
    throw error;
  }
};

// Create a new university
const createUniversity = async (data) => {
  try {
    const response = await api.post("/api/university/create/", data);
    return response.data;
  } catch (error) {
    console.error("❌ Create Error:", error.response?.data || error);
    throw error;
  }
};

// Export all functions properly
export { getUniversityById, updateUniversity, createUniversity };
