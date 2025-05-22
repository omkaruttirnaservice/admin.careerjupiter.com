import React, { useState, useEffect } from "react";
import { Plus, Trash, CheckCheck } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";

const ViewCourses = () => {
  const { classId } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/class/course/${classId}`
        );
        setCourses(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch courses.");
        console.error("Error fetching courses:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [classId]);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        courseName: "",
        courseType: "",
        duration: "",
        feeStructure: { amount: "", type: "" },
        scholarshipOrDiscounts: "",
        studyMaterialProvided: false,
      },
    ]);
    setIsUpdated(true);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
    setIsUpdated(true);
  };

  const handleChange = (e, index, field) => {
    const updatedCourses = [...courses];
    if (field.includes("feeStructure")) {
      updatedCourses[index].feeStructure[field.split(".")[1]] = e.target.value;
    } else {
      updatedCourses[index][field] = e.target.value;
    }
    setCourses(updatedCourses);
    setIsUpdated(true);
  };

  const saveCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/api/class/course/`, {
        classId,
        courses,
      });
      // alert("Courses saved successfully!");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Courses saved successfully!",
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      setError("Failed to save courses.");

      Swal.fire({
        icon: "warning",
        title: "Save Failed",
        text: "Failed to save courses.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${API_BASE_URL}/api/class/course/${classId}/`, {
        courses,
      });
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Courses updated successfully!",
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      setError("Failed to update courses.");

      Swal.fire({
        icon: "warning",
        title: "Update Failed",
        text: "Failed to update courses.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-8 bg-gray-50 rounded-xl shadow-xl border border-gray-200 max-w-6xl mx-auto">
      <button
        onClick={() => navigate("/class-dashboard")}
        className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
      >
        &times;
      </button>
      <h3 className="text-3xl font-bold text-gray-800">📚 Manage Courses</h3>
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      {courses.map((course, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4"
        >
          <input
            type="text"
            placeholder="Course Name"
            value={course.courseName}
            onChange={(e) => handleChange(e, index, "courseName")}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Course Type"
            value={course.courseType}
            onChange={(e) => handleChange(e, index, "courseType")}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Duration"
            value={course.duration}
            onChange={(e) => handleChange(e, index, "duration")}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Fee Amount"
            value={course.feeStructure.amount}
            onChange={(e) => handleChange(e, index, "feeStructure.amount")}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Fee Type"
            value={course.feeStructure.type}
            onChange={(e) => handleChange(e, index, "feeStructure.type")}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={() => removeCourse(index)}
            className="bg-red-600 text-white px-4 py-2 rounded  cursor-pointer"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-6 flex justify-between">
        <button
          onClick={addCourse}
          className="bg-blue-600 text-white px-6 py-2 rounded  cursor-pointer"
        >
          Add Course
        </button>
        <button
          onClick={isUpdated ? updateCourses : saveCourses}
          className="bg-green-600 text-white px-6 py-2 rounded  cursor-pointer"
        >
          {isUpdated ? "Update Courses" : "Save Courses"}
        </button>
      </div>
    </section>
  );
};

export default ViewCourses;
