import { API_BASE_URL } from "../../constant/constantBaseUrl";
import axios from "axios";

export const addExcel = async (id) => {
  const response = await axios.post(`${API_BASE_URL}/api/college/upload?file`);
  return response.data;
};