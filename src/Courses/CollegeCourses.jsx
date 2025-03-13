import React, { useState, useEffect } from "react";
import { Plus, Trash, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CollegeCourses = () => {
  const { collegeId } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false); // Track if any course is updated
  const navigate = useNavigate(); // Initialize navigation

  // Fetch courses from the API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/college/course/${collegeId}`
        );
        const data =
          typeof response.data.data === "string"
            ? JSON.parse(response.data.data)
            : response.data.data;
        if (data && data.courses) {
          setCourses(data.courses); // Prefill the courses if they exist
        } else {
          setCourses([]);
        }
      } catch (err) {
        setError(
          "Failed to fetch courses. Please check the console for more details."
        );
        console.error("Error fetching courses:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [collegeId]);

  // Add an empty course when the "Add Course" button is clicked
  const addCourse = () => {
    setCourses([
      ...courses,
      {
        courses: [
          {
            name: "",
            duration: "",
            annualFees: "",
            category: "SSC",
            eligibility: "",
          },
        ],
      },
    ]);
    setIsUpdated(true); // Mark as updated when new course is added
  };

  // Remove the course by its index and delete it from the API
  // Remove the course by its id and delete it from the API
  // const removeCourse = async (courseId) => {
  //   try {
  //     setLoading(true);
  //     await axios.delete(`${API_BASE_URL}/api/college/course/${collegeId}/${courseId}`);
  //     setCourses(courses.filter((course) => course.id !== courseId)); // Remove the course from the state
  //     alert("Course deleted successfully!");
  //     setIsUpdated(true); // Mark as updated when course is removed
  //   } catch (err) {
  //     setError("Failed to delete the course. Please check the console for more details.");
  //     console.error("Error deleting course:", err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Remove the course by its index
  const removeCourse = (courseIndex) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(courseIndex, 1); // Remove the course at the specified index
    setCourses(updatedCourses); // Update the state
    setIsUpdated(true); // Mark as updated
  };

  // Update the course field on change
  const handleChange = (e, courseIndex, field) => {
    const { name, value } = e.target;
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].courses[0][name] = value; // Update the course at the dynamic index
    setCourses(updatedCourses);
    setIsUpdated(true); // Mark as updated when any field is changed
  };

  // Save the course data
  const saveCourses = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    // Validate that all courses have the required fields
    const validCourses = courses.filter((course) => {
      return (
        course.courses[0].name &&
        course.courses[0].duration &&
        course.courses[0].annualFees
      );
    });

    if (validCourses.length === 0) {
      setError("All fields (name, duration, and annual fees) are required.");
      setLoading(false);
      return;
    }

    const courseData = {
      collegeId,
      courses: validCourses.map((course) => ({
        name: course.courses[0].name,
        duration: Number(course.courses[0].duration), // Ensure duration is a number
        annualFees: Number(course.courses[0].annualFees), // Ensure annualFees is a number
        category: course.courses[0].category,
        eligibility: course.courses[0].eligibility,
      })),
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/college/course/create`,
        courseData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Courses saved successfully!");
        setCourses([]); // Clear the courses after successful save
      } else {
        setError("Failed to save courses: " + response.data.message);
      }
    } catch (error) {
      setError(error.message);
      console.error(
        "Error saving courses:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Update courses if any changes are made
  const updateCourses = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    const courseData = {
      collegeId,
      courses: courses.map((course) => ({
        name: course.courses[0].name,
        duration: Number(course.courses[0].duration),
        annualFees: Number(course.courses[0].annualFees),
        category: course.courses[0].category,
        eligibility: course.courses[0].eligibility,
      })),
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/college/course/${collegeId}`,
        courseData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Courses updated successfully!");
      } else {
        setError("Failed to update courses.");
      }
    } catch (error) {
      setError(error.message);
      console.error(
        "Error updating courses:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-light-blue rounded-xl shadow-md relative">
      {/* Close Button (X) */}
      <button
        onClick={() => navigate("/colleges")} // Navigate to CollegeTableDetails page
        className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-xl font-bold"
      >
        &times; {/* Unicode 'X' symbol */}
      </button>  

      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-blue-600">Add Courses</h3>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="space-y-6">
        {courses.map((course, courseIndex) => (
          <motion.div
            key={courseIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-blue-600">Course Name</label>
                <input
                  type="text"
                  name="name"
                  value={course.courses[0]?.name || ""}
                  onChange={(e) => handleChange(e, courseIndex, "name")}
                  className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-blue-600">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={course.courses[0]?.duration || ""}
                  onChange={(e) => handleChange(e, courseIndex, "duration")}
                  className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-blue-600">Annual Fees</label>
                <input
                  type="text"
                  name="annualFees"
                  value={course.courses[0]?.annualFees || ""}
                  onChange={(e) => handleChange(e, courseIndex, "annualFees")}
                  className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-blue-600">Category</label>
                <select
                  name="category"
                  value={course.courses[0]?.category || "SSC"}
                  onChange={(e) => handleChange(e, courseIndex, "category")}
                  className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SSC">SSC</option>
                  <option value="HSC">HSC</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-blue-600">Eligibility</label>
                <input
                  type="text"
                  name="eligibility"
                  value={course.courses[0]?.eligibility || ""}
                  onChange={(e) => handleChange(e, courseIndex, "eligibility")}
                  className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => removeCourse(courseIndex)} // Pass courseIndex to removeCourse
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                <Trash className="mr-2" size={20} /> Remove Course
              </button>

              {/* <button
                onClick={() => removeCourse(course.id)} // Pass course.id to removeCourse
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                <Trash className="mr-2" size={20} /> Remove Course
              </button> */}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={addCourse}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          <Plus className="mr-2" size={20} /> Add Course
        </button>
        <button
          onClick={isUpdated ? updateCourses : saveCourses}
          className={`${
            isUpdated ? "bg-green-600" : "bg-gray-400"
          } text-white px-6 py-2 rounded-lg`}
          disabled={!isUpdated}
        >
          {isUpdated ? "Update Course" : "Save Course"}
        </button>
      </div>
    </section>
  );
};

export default CollegeCourses;
