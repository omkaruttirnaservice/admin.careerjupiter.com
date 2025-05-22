import React, { useState, useEffect } from "react";
import { Plus, Trash, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { API_BASE_URL } from "../constant/constantBaseUrl";
const ClassCourses = () => {
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
        setCourses(response.data.courses || []);
      } catch (err) {
        setError("Failed to fetch courses.");
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
        courseType: [],
        duration: "",
        feeStructure: { amount: "", type: "Monthly" },
        scholarshipOrDiscounts: "",
        studyMaterialProvided: "No",
      },
    ]);
    setIsUpdated(true);
  };

  const removeCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
    setIsUpdated(true);
  };

  const handleChange = (e, index, field) => {
    const { name, value, type, checked } = e.target;
    const updatedCourses = [...courses];
    if (type === "checkbox") {
      if (checked) {
        updatedCourses[index].courseType.push(value);
      } else {
        updatedCourses[index].courseType = updatedCourses[
          index
        ].courseType.filter((type) => type !== value);
      }
    } else if (field.includes("feeStructure")) {
      updatedCourses[index].feeStructure[field.split(".")[1]] = value;
    } else {
      updatedCourses[index][name] = value;
    }
    setCourses(updatedCourses);
    setIsUpdated(true);
  };

  const saveCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/class/course/`, {
        classId,
        courses,
      });
      if (response.data.success) {
        // alert("Courses saved successfully!");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Courses saved successfully!",
          confirmButtonColor: "#28a745",
        });

        setIsUpdated(false);
      } else {
        setError(
          error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            error.response?.data.errMessage ||
            "Failed to save courses."
        );
      }
    } catch (error) {
      setError(error.response?.data?.usrMsg ||
        error.response?.data?.message ||
        error.response?.data?.errMsg ||
        "Failed to save courses.");

      Swal.fire({
        icon: "warning",
        title: "Save Failed",
        text: error.response?.data?.errMsg || error.response?.data?.usrMsg || "Failed to save courses",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-8 bg-white rounded-2xl shadow-xl max-w-5xl mx-auto relative border border-gray-200">
      <button
        onClick={() => navigate("/classes")}
        className="absolute top-4 right-4 text-red-600 text-3xl font-bold cursor-pointer"
      >
        &times;
      </button>
      <h3 className="text-3xl font-bold text-center text-blue-700 mb-6">
        📚 Manage Class Courses
      </h3>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="space-y-6">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300"
          >
            <label className="block text-lg font-medium">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={course.courseName}
              onChange={(e) => handleChange(e, index)}
              placeholder="Enter Course Name"
              className="border p-3 w-full rounded-md mb-4"
            />

            <label className="block text-lg font-medium">Course Type</label>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Online"
                  checked={course.courseType.includes("Online")}
                  onChange={(e) => handleChange(e, index, "courseType")}
                />
                Online
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Offline"
                  checked={course.courseType.includes("Offline")}
                  onChange={(e) => handleChange(e, index, "courseType")}
                />
                Offline
              </label>
            </div>

            <label className="block text-lg font-medium">Duration</label>
            <input
              type="text"
              name="duration"
              value={course.duration}
              onChange={(e) => handleChange(e, index)}
              placeholder="Enter Duration (e.g., 3 Months)"
              className="border p-3 w-full rounded-md mb-4"
            />

            <label className="block text-lg font-medium">Fee Amount</label>
            <input
              type="number"
              name="feeStructure.amount"
              value={course.feeStructure.amount}
              onChange={(e) => handleChange(e, index, "feeStructure.amount")}
              placeholder="Enter Fee Amount"
              className="border p-3 w-full rounded-md mb-4"
            />

            <label className="block text-lg font-medium">Fee Type</label>
            <select
              name="feeStructure.type"
              value={course.feeStructure.type}
              onChange={(e) => handleChange(e, index, "feeStructure.type")}
              className="border p-3 w-full rounded-md mb-4"
            >
              <option value="Monthly">Monthly</option>
              <option value="One-time">One-time</option>
            </select>

            <label className="block text-lg font-medium">
              Scholarship/Discount
            </label>
            <input
              type="text"
              name="scholarshipOrDiscounts"
              value={course.scholarshipOrDiscounts}
              onChange={(e) => handleChange(e, index)}
              placeholder="Enter Scholarship or Discount Details"
              className="border p-3 w-full rounded-md mb-4"
            />

            <label className="block text-lg font-medium">
              Study Material Provided
            </label>
            <select
              name="studyMaterialProvided"
              value={course.studyMaterialProvided}
              onChange={(e) => handleChange(e, index)}
              className="border p-3 w-full rounded-md mb-4"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <button
              onClick={() => removeCourse(index)}
              className="text-red-600 font-semibold hover:text-red-800 cursor-pointer"
            >
              Remove Course
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={addCourse}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          + Add Course
        </button>
        <button
          onClick={saveCourses}
          className={`px-6 py-2 rounded-lg text-white cursor-pointer ${
            isUpdated ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"
          }`}
          disabled={!isUpdated}
        >
          Save Courses
        </button>
      </div>
    </section>
  );
};

export default ClassCourses;
