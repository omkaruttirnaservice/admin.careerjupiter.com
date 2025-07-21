import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../constant/constantBaseUrl";

const api = axios.create({
  baseURL: API_BASE_URL, 
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
    console.error("API Error:", error.response?.data || error.response?.data?.usrMsg || 
      error.response?.data.errMsg  );

    // Extract error message from backend response
    const errorMessage =
      error.response?.data?.message || 
      error.response?.data?.usrMsg || 
      error.response?.data.errMsg ||
      "Failed to create the college."; 

    console.error("🔴 Error Message:", errorMessage);

    if (error.response?.data?.errors) {
      console.error("🔴 Validation Errors:", error.response.data.errors);
      Swal.fire({
        icon: "warning",
        title: "Validation Errors",
        text: error.response.data.errors.join(", "),
      });
    }else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: errorMessage,
      });
    }

    throw error.response?.data || new Error(errorMessage);
  }
};



