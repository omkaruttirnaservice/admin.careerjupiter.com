import axios from "axios";
import { API_BASE_URL } from "../../constant/constantBaseUrl";

export const createRoadmap = async (roadmapData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/type/create`,
    roadmapData,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
};

export const getAllType = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/type/all`)
    console.log(response.data)

  return response.data
  console.log(response.data)
}


// export const getAllRoadmaps = async () => {
//   const response = await axios.get(`${API_BASE_URL}/api/roadmap/all`);
//   return response.data.types;
// };

// // Fetch all types and subtypes
// export const getAllTypes = async () => {
//   const response = await axios.get(`${API_BASE_URL}/api/type/all`);
//   return response.data;
// };

// // Create new roadmap
// export const createNewRoadmap = async (roadmapData) => {
//   const response = await axios.post(`${API_BASE_URL}/api/roadmap/create`, roadmapData);
//   return response.data;
// };