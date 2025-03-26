// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl"; 

// const api = axios.create({
//   baseURL: API_BASE_URL, 
// });

// export const createCollege = (data) => {
//   return api.post("/api/college/create/", data);
// };



// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl"; 

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Function to create a college with better error handling
// export const createCollege = async (data) => {
//   try {
//     const response = await api.post("/api/college/create/", data);
//     return response.data; // Ensure only relevant data is returned
//   } catch (error) {
//     console.error("API Error:", error.response?.data || error.message);
//     throw error; // Ensure errors are properly caught in frontend
//   }
// };


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


    if (error.response?.data?.errors) {
      console.error("🔴 Validation Errors:", error.response.data.errors);
      alert("Validation Errors: " + error.response.data.errors.join(", "));
    }

    
    throw error.response?.data || new Error("An unknown error occurred");
  }
};



