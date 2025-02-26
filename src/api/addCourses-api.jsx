import axios from "axios";

const API_BASE_URL = "http://192.168.1.17:5000/api//course";

export const AddCourses = async (collegeId, courseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, {
      ...courseData,
      collegeId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding courses:", error.response?.data || error.message);
    throw error;
  }
};
