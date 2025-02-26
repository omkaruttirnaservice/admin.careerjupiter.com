import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash } from "lucide-react";

const CourseForm = () => {
  const [courses, setCourses] = useState([{ id: Date.now(), name: "", duration: "", fees: "", category: "", eligibility: "" }]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: "", duration: "", fees: "", category: "", eligibility: "" }]);
  };

  const removeCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add College Courses</h1>
      <div className="space-y-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            className="bg-white shadow-md rounded-lg p-5 border border-lightblue-300 relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Course Name</label>
                <input type="text" className="w-full border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700">Category</label>
                <input type="text" className="w-full border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700">Duration (years)</label>
                <input type="number" className="w-full border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-gray-700">Eligibility</label>
                <input type="text" className="w-full border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700">Annual Fees</label>
                <input type="number" className="w-full border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
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
          onClick={addCourse}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2" /> Add Course
        </button>
      </div>
    </div>
  );
};

export default CourseForm;
