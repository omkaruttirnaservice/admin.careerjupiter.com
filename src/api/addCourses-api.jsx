import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import Swal from "sweetalert2";

export const AddCourses = async (collegeId, courseData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/college/course/create`,
      {
        ...courseData,
        collegeId,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to add courses:",
      error.response?.data || error.message
    );
    Swal.fire(
      error.response?.data?.message ||
        error.response?.data?.usrMsg ||
        error.response?.data.errMessage ||
        "Couldn’t Add Courses — Please Try Again"
    );
    throw error;
  }
};
