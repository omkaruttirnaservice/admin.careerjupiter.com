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