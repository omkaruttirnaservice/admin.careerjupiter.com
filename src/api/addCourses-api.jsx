import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";

// const API_BASE_URL = "http://192.168.1.12:5000/api//course";

export const AddCourses = async (collegeId, courseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/college/course/create`, {
      ...courseData,
      collegeId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding courses:", error.response?.data || error.message);
    throw error;
  }
};
