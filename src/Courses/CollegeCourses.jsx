import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash } from "lucide-react";
import { AddCourses } from "../api/addCourses-api";

const CourseForm = () => {
  const {id} =  useParams()
  console.log(id,'--id')
  const collegeId = "65d7a4c5e4b0a2f3c8a1d7b2"; // Manually set college ID for testing

  const [courses, setCourses] = useState([
    {
      id: Date.now(),
      name: "",
      category: "",
      duration: "",
      eligibility: "",
      annualFees: "",
      placementDetails: [{ company: "", package: "" }],
    },
  ]);

  const categories = ["SSC", "HSC", "ITI", "Graduation", "PostGraduation"];
  const eligibilityOptions = ["SSC", "HSC", "ITI", "Graduation", "PostGraduation"];

  const AddCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now(),
        name: "",
        category: "",
        duration: "",
        eligibility: "",
        annualFees: "",
        placementDetails: [{ company: "", package: "" }],
      },
    ]);
  };

  const removeCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const handlePlacementChange = (courseId, index, field, value) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              placementDetails: course.placementDetails.map((placement, i) =>
                i === index ? { ...placement, [field]: value } : placement
              ),
            }
          : course
      )
    );
  };

  const addPlacement = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              placementDetails: [...course.placementDetails, { company: "", package: "" }],
            }
          : course
      )
    );
  };

  const removePlacement = (courseId, index) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              placementDetails: course.placementDetails.filter((_, i) => i !== index),
            }
          : course
      )
    );
  };

  const handleSubmit = async () => {
    if (!collegeId) {
      alert("Error: College ID is missing!");
      return;
    }

    console.log("Submitting courses for collegeId:", collegeId);
    
    try {
      await AddCourses(collegeId, courses);  // Calling the correct function
      alert("Courses added successfully!");
    } catch (error) {
      alert("Error adding courses: " + (error.response?.data?.usrMsg || error.message));
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add College Courses</h1>
      <div className="space-y-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            className="bg-white shadow-md rounded-lg p-5 border border-gray-300 relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Course Name"
                value={course.name}
                onChange={(e) => handleInputChange(course.id, "name", e.target.value)}
                className="w-full border rounded-md p-2"
              />
              <select
                value={course.category}
                onChange={(e) => handleInputChange(course.id, "category", e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Duration (years)"
                value={course.duration}
                onChange={(e) => handleInputChange(course.id, "duration", e.target.value)}
                className="w-full border rounded-md p-2"
              />
              <select
                value={course.eligibility}
                onChange={(e) => handleInputChange(course.id, "eligibility", e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select Eligibility</option>
                {eligibilityOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Annual Fees"
                value={course.annualFees}
                onChange={(e) => handleInputChange(course.id, "annualFees", e.target.value)}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Placement Details</h3>
              {course.placementDetails.map((placement, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Company"
                    value={placement.company}
                    onChange={(e) => handlePlacementChange(course.id, i, "company", e.target.value)}
                    className="w-full border rounded-md p-2"
                  />
                  <input
                    type="number"
                    placeholder="Package"
                    value={placement.package}
                    onChange={(e) => handlePlacementChange(course.id, i, "package", e.target.value)}
                    className="w-full border rounded-md p-2"
                  />
                  <button
                    onClick={() => removePlacement(course.id, i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addPlacement(course.id)}
                className="text-blue-500 hover:text-blue-700 mt-2"
              >
                + Add Placement
              </button>
            </div>
            <button
              onClick={() => removeCourse(course.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <Trash size={20} />
            </button>
          </motion.div>
        ))}
        <button
          onClick={AddCourse}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2" /> Add Course
        </button>
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CourseForm;
