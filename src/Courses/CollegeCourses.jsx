// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Plus, Trash, CheckCheck } from "lucide-react";

// const CourseForm = () => {
//   const [courses, setCourses] = useState([
//     {
//       id: Date.now(),
//       name: "",
//       duration: "",
//       fees: "",
//       category: "",
//       eligibility: "",
//     },
//   ]);

//   // Handle adding a new course
//   const addCourse = () => {
//     setCourses([
//       ...courses,
//       {
//         id: Date.now(),
//         name: "",
//         duration: "",
//         fees: "",
//         category: "",
//         eligibility: "",
//       },
//     ]);
//   };

//   // Handle removing a course
//   const removeCourse = (id) => {
//     setCourses(courses.filter((course) => course.id !== id));
//   };

//   // Handle input change for each course
//   const handleInputChange = (id, field, value) => {
//     setCourses(
//       courses.map((course) =>
//         course.id === id ? { ...course, [field]: value } : course
//       )
//     );
//   };

//   // Handle saving the course data
//   const saveData = () => {
//     // Here, you can send the data to an API, save it in local storage, or log it to the console
//     console.log("Saved Data:", courses);
//     alert("Courses saved successfully!");
//   };

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <h1 className="text-3xl font-bold text-center mb-6">Add College Courses</h1>
//       <div className="space-y-6">
//         {courses.map((course, index) => (
//           <motion.div
//             key={course.id}
//             className="bg-white shadow-md rounded-lg p-5 border border-lightblue-300 relative"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//           >
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700">Course Name</label>
//                 <input
//                   type="text"
//                   value={course.name}
//                   onChange={(e) => handleInputChange(course.id, "name", e.target.value)}
//                   className="w-full border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Category</label>
//                 <input
//                   type="text"
//                   value={course.category}
//                   onChange={(e) => handleInputChange(course.id, "category", e.target.value)}
//                   className="w-full border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Duration (years)</label>
//                 <input
//                   type="number"
//                   value={course.duration}
//                   onChange={(e) => handleInputChange(course.id, "duration", e.target.value)}
//                   className="w-full border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Eligibility</label>
//                 <input
//                   type="text"
//                   value={course.eligibility}
//                   onChange={(e) => handleInputChange(course.id, "eligibility", e.target.value)}
//                   className="w-full border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div className="col-span-2">
//                 <label className="block text-gray-700">Annual Fees</label>
//                 <input
//                   type="number"
//                   value={course.fees}
//                   onChange={(e) => handleInputChange(course.id, "fees", e.target.value)}
//                   className="w-full border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             </div>
//             <button
//               onClick={() => removeCourse(course.id)}
//               className="absolute top-4 right-4 text-red-500 hover:text-red-700"
//             >
//               <Trash size={20} />
//             </button>
//           </motion.div>
//         ))}
//         <div className="flex justify-items-start gap-4">
//         <button
//           onClick={addCourse}
//           className="flex items-center bg-blue-600 text-white px-4 py-4 rounded-lg hover:bg-blue-700"
//         >
//           <Plus className="mr-2" /> Add Course
//         </button>

//         {/* Save Button */}
//         <button
//           onClick={saveData}
//           className="flex items-center bg-green-600 text-white px-4 py-4 rounded-lg hover:bg-green-700 "
//         >
//           <CheckCheck className ="mr-2" />
//           Save Data
//         </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseForm;


// import { useState, useEffect } from "react";
// // import axios from "axios";
// import { motion } from "framer-motion";
// import { Plus, Trash, CheckCheck } from "lucide-react";
// import { useParams } from "react-router-dom"; // Import useParams

// const CollegeCourse = () => {
//   const { collegeId } = useParams(); // Access collegeId from the URL
//   const [courses, setCourses] = useState([
//     {
//       id: Date.now(),
//       name: "",
//       duration: "",
//       fees: "",
//       category: "",
//       eligibility: "",
//     },
//   ]);


//   useEffect(() => {
//     // Fetch courses for the specific collegeId
//     const fetchCourses = async () => {
//       const response = await fetch(`/api/colleges/${collegeId}/courses`);
//       const data = await response.json();
//       setCourses(data.courses);
//     };

//     fetchCourses();
//   }, [collegeId]); 
//   // Example useEffect to fetch data based on collegeId (if needed)
//   // useEffect(() => {
   
//   //   // axios.get(`/api/courses/${collegeId}`).then(response => setCourses(response.data));

//   //   console.log("Fetching courses for collegeId:", collegeId);
//   // //  
//   // }, [collegeId]);

//   // Handle adding a new course
//   const addCourse = () => {
//     setCourses([
//       ...courses,
//       {
//         id: Date.now(),
//         name: "",
//         duration: "",
//         fees: "",
//         category: "",
//         eligibility: "",
//       },
//     ]);
//   };

//   // Handle removing a course
//   const removeCourse = (id) => {
//     setCourses(courses.filter((course) => course.id !== id));
//   };

//   // Handle form changes
//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedCourses = [...courses];
//     updatedCourses[index][name] = value;
//     setCourses(updatedCourses);
//   };

//   return (
//     <section className="p-4 bg-white rounded-xl shadow-md">
//       <div className="flex justify-between mb-6">
//         <h3 className="text-xl font-semibold">Add Courses for College ID: {collegeId}</h3> {/* Display the collegeId */}
//         <button
//           onClick={addCourse}
//           className="bg-blue-600 text-white px-3 py-2 rounded-lg"
//         >
//           <Plus className="inline mr-2" size={20} />
//           Add Course
//         </button>
//       </div>

//       <div className="space-y-6">
//         {courses.map((course, index) => (
//           <motion.div
//             key={course.id}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="space-y-4"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={course.name}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label>Duration</label>
//                 <input
//                   type="text"
//                   name="duration"
//                   value={course.duration}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label>Fees</label>
//                 <input
//                   type="text"
//                   name="fees"
//                   value={course.fees}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label>Category</label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={course.category}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label>Eligibility</label>
//                 <input
//                   type="text"
//                   name="eligibility"
//                   value={course.eligibility}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => removeCourse(course.id)}
//                 className="bg-red-600 text-white py-2 px-4 rounded-lg"
//               >
//                 <Trash className="mr-2" size={20} />
//                 Remove Course
//               </button>

//               <button className="bg-green-600 text-white py-2 px-4 rounded-lg">
//                 <CheckCheck className="mr-2" size={20} />
//                 Save Course
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CollegeCourse;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Plus, Trash, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

const CollegeCourses = () => {
  const { collegeId } = useParams(); // Get the collegeId from the URL
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    duration: "",
    fees: "",
    category: "",
    eligibility: "",
  });

  // Fetch courses for the specific collegeId
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`/api/colleges/${collegeId}/courses`);
      const data = await response.json();
      setCourses(data.courses); // Assuming the response returns courses as an array
    };

    fetchCourses();
  }, [collegeId]);

  // Handle adding a new course
  const addCourse = async () => {
    const response = await fetch(`/api/colleges/${collegeId}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    });

    const data = await response.json();
    setCourses([...courses, data.course]); // Add the new course to the state
    setNewCourse({ name: "", duration: "", fees: "", category: "", eligibility: "" }); // Reset form
  };

  // Handle removing a course
  const removeCourse = async (courseId) => {
    const response = await fetch(`/api/colleges/${collegeId}/courses/${courseId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setCourses(courses.filter(course => course.id !== courseId)); // Remove course from state
    }
  };

  // Handle input changes for new course
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <section className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between mb-6">
        <h3 className="text-xl font-semibold">Add Courses for College ID: {collegeId}</h3>
        <button onClick={addCourse} className="bg-blue-600 text-white px-3 py-2 rounded-lg">
          <Plus className="inline mr-2" size={20} />
          Add Course
        </button>
      </div>

      <div className="space-y-6">
        {/* Render existing courses */}
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={course.name}
                  className="mt-1 px-4 py-2 border rounded-md"
                  disabled
                />
              </div>

              <div className="flex flex-col">
                <label>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={course.duration}
                  className="mt-1 px-4 py-2 border rounded-md"
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label>Fees</label>
                <input
                  type="text"
                  name="fees"
                  value={course.fees}
                  className="mt-1 px-4 py-2 border rounded-md"
                  disabled
                />
              </div>

              <div className="flex flex-col">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={course.category}
                  className="mt-1 px-4 py-2 border rounded-md"
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label>Eligibility</label>
                <input
                  type="text"
                  name="eligibility"
                  value={course.eligibility}
                  className="mt-1 px-4 py-2 border rounded-md"
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => removeCourse(course.id)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                <Trash className="mr-2" size={20} />
                Remove Course
              </button>

              <button className="bg-green-600 text-white py-2 px-4 rounded-lg">
                <CheckCheck className="mr-2" size={20} />
                Save Course
              </button>
            </div>
          </motion.div>
        ))}

        {/* Form to add new course */}
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={newCourse.name}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={newCourse.duration}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label>Fees</label>
              <input
                type="text"
                name="fees"
                value={newCourse.fees}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={newCourse.category}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label>Eligibility</label>
              <input
                type="text"
                name="eligibility"
                value={newCourse.eligibility}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <button
            onClick={addCourse}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
          >
            <Plus className="mr-2" size={20} />
            Add New Course
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollegeCourses;
