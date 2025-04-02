
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";

const api = axios.create({
  baseURL: API_BASE_URL, // ✅ Ensures the correct API base URL
});

// Function to create a college
export const createCollege = async (collegeData) => {
  try {
    // Check if the data contains files (FormData) and set headers accordingly
    const headers = {};
    if (collegeData instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    console.log("📢 Sending Data to API:", collegeData);

    // ✅ Send request
    const response = await api.post("/api/college/create", collegeData, { headers });
    
    console.log("✅ API Response:", response.data);

    return response.data; // ✅ Return response data

  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);

    // Extract error message from backend response
    const errorMessage =
      error.response?.data?.message || // First check usrMsg
      error.response?.data?.usrMsg || // Then check message
      "An error occurred while creating the college."; // Fallback message

    console.error("🔴 Error Message:", errorMessage);


    if (error.response?.data?.errors) {
      console.error("🔴 Validation Errors:", error.response.data.errors);
      alert("Validation Errors: " + error.response.data.errors.join(", "));
    }else {
      alert(errorMessage); // Show the extracted error message
    }

    
    throw error.response?.data || new Error(errorMessage);
  }
};



