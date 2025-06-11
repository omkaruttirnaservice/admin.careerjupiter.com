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
  const response = await axios.post(`${API_BASE_URL}/api/type/all`)
   
  return response.data
 
}
export const getTypeById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/type/${id}`);
  return response.data;
};
export const updateType = async ({ id, type }) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/type/${id}`,
    { type },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
};
export const deleteType = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/type/${id}`);
  return response.data;
};






