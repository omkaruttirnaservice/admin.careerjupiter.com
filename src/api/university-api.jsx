import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";

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


 const createUniversity = async (universityData) => {
  try {
    const headers = {};
    if (universityData instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    console.log("📢 Sending University Data:", universityData);

    const response = await api.post("/api/university/create", universityData, { headers });

    console.log("✅ University Created:", response.data);

    return response.data;

  } catch (error) {
    console.error("University API Error:", error.response?.data || error.message);

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.usrMsg ||
      error.response?.data?.errMsg ||
      "An error occurred while creating the university.";

    console.error("🔴 University Error Message:", errorMessage);

    if (error.response?.data?.errors) {
      console.error("🔴 Validation Errors:", error.response.data.errors);
      alert("Validation Errors: " + error.response.data.errors.join(", "));
    } else {
      alert(errorMessage);
    }

    throw error.response?.data || new Error(errorMessage);
  }
};


// Export all functions properly
export { getUniversityById, updateUniversity, createUniversity };
