import React, { useEffect, useState } from 'react';

const CollegeTable = () => {
  const [collegeData, setCollegeData] = useState(null);

  // Fetch the JSON data when the component mounts
  useEffect(() => {
    fetch('./src/assets/collegeData.json')  // Adjust the path based on your actual folder structure
      .then((response) => response.json())
      .then((data) => setCollegeData(data))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  if (!collegeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        College Details
      </h1>
      <div className="overflow-x-auto bg-white border-2 border-blue-300 shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4">College Name</th>
              <th className="py-2 px-4">Affiliated University</th>
              <th className="py-2 px-4">College Category</th>
              <th className="py-2 px-4">College Type</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Contact</th>
              <th className="py-2 px-4">Website</th>
              <th className="py-2 px-4">Established Year</th>
              <th className="py-2 px-4">Accreditation</th>
              <th className="py-2 px-4">Admission Process</th>
              <th className="py-2 px-4">Application Form</th>
              <th className="py-2 px-4">Description</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="py-2 px-4">{collegeData.collegeName}</td>
              <td className="py-2 px-4">{collegeData.affiliatedUniversity}</td>
              <td className="py-2 px-4">{collegeData.collegeCategory}</td>
              <td className="py-2 px-4">{collegeData.collegeType}</td>
              <td className="py-2 px-4">{collegeData.location.lat}, {collegeData.location.lan}</td>
              <td className="py-2 px-4">
                {collegeData.address.line1}, {collegeData.address.line2}, {collegeData.address.dist}, {collegeData.address.state} - {collegeData.address.pincode}
              </td>
              <td className="py-2 px-4">{collegeData.contactDetails}</td>
              <td className="py-2 px-4">
                <a href={collegeData.websiteURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  {collegeData.websiteURL}
                </a>
              </td>
              <td className="py-2 px-4">{collegeData.establishedYear}</td>
              <td className="py-2 px-4">{collegeData.accreditation}</td>
              <td className="py-2 px-4">{collegeData.admissionProcess}</td>
              <td className="py-2 px-4">
                <a href={collegeData.applicationFormURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  Apply Here
                </a>
              </td>
              <td className="py-2 px-4">{collegeData.info.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollegeTable;



//Filly accessible Login Page

// import React, { useState } from 'react';
// import axios from 'axios'; // Import Axios

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setErrorMessage('Please fill out all fields.');
//       return;
//     }

//     setLoading(true); // Set loading state to true before making the request

//     try {
//       // Replace 'https://your-api-endpoint.com/login' with your actual API endpoint
//       const response = await axios.post('https://your-api-endpoint.com/login', {
//         email,
//         password,
//         rememberMe,
//       });

//       if (response.status === 200) {
//         // Successful login, handle response as needed
//         console.log('Login successful:', response.data);
//         // Optionally, clear the form or redirect the user
//         setEmail('');
//         setPassword('');
//         setRememberMe(false);
//       }
//     } catch (error) {
//       // Handle errors here (e.g., invalid login credentials)
//       console.error('Login error:', error);
//       setErrorMessage('Invalid email or password. Please try again.');
//     } finally {
//       setLoading(false); // Reset loading state after request completes
//     }
//   };

//   return (
//     <>
//       <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <img
//             className="mx-auto h-12 w-auto"
//             src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
//             alt="Workflow"
//           />
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Or{' '}
//             <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//               start your 14-day free trial
//             </a>
//           </p>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//             {errorMessage && (
//               <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
//                 {errorMessage}
//               </div>
//             )}
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={() => setRememberMe(!rememberMe)}
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                     Remember me
//                   </label>
//                 </div>

//                 <div className="text-sm">
//                   <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                     Forgot your password?
//                   </a>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#c8190ccf] hover:bg-[#b6180a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   disabled={loading} // Disable button while loading
//                 >
//                   {loading ? 'Logging in...' : 'Sign in'}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-3 gap-3">
//                 <div>
//                   <a
//                     href="#"
//                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                   >
//                     <span className="sr-only">Sign in with Facebook</span>
//                     <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
//                       <path
//                         fillRule="evenodd"
//                         d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                 </div>

//                 <div>
//                   <a
//                     href="#"
//                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                   >
//                     <span className="sr-only">Sign in with Twitter</span>
//                     <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
//                     </svg>
//                   </a>
//                 </div>

//                 <div>
//                   <a
//                     href="#"
//                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                   >
//                     <span className="sr-only">Sign in with GitHub</span>
//                     <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
//                       <path
//                         fillRule="evenodd"
//                         d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.986 1.029-2.684-.103-.253-.445-1.273-.138-2.658 0 0 .836-.269 2.73 1.031.79-.22 1.64-.327 2.477-.33.834 0 1.688.108 2.477.33 1.892-1.3 2.728-1.031 2.728-1.031.31 1.385-.035 2.405-.138 2.658.64.698 1.029 1.591 1.029 2.684 0 3.849-2.336 4.698-4.555 4.951.413.355.776.98.776 1.967 0 1.418-.013 2.544-.013 2.885 0 .268.183.578.684.482C17.137 18.197 20 14.425 20 10.017 20 4.484 15.523 0 10 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;



// import React, { useState, useEffect } from "react";
// import { Plus, Trash, CheckCheck } from "lucide-react";
// import { motion } from "framer-motion";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl"; // Assuming this is the base URL

// const CollegeCourses = () => {
//   const { collegeId } = useParams(); // The college ID is pulled from the URL parameters
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch the courses for the given college ID (GET request)
//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/college/course/${collegeId}`
//         );

//         const data = response.data; // Directly using the response data

//         if (data && data.courses) {
//           setCourses(data.courses); // Store the courses data into the state
//         } else {
//           throw new Error("Courses data not found.");
//         }
//       } catch (err) {
//         setError("Failed to fetch courses. Please check the console for more details.");
//         console.error("Error fetching courses:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [collegeId]); // Runs every time the collegeId changes

//   // Add a new empty course when the "Add Course" button is clicked
//   const addCourse = () => {
//     setCourses([
//       ...courses,
//       {
//         name: "",
//         duration: "",
//         annualFees: "",
//         category: "SSC",
//         eligibility: "",
//       },
//     ]);
//   };

//   const removeCourse = (index) => {
//     setCourses(courses.filter((_, i) => i !== index)); // Remove course by index
//   };

//   const handleChange = (e, courseIndex, field) => {
//     const { value } = e.target;
//     const updatedCourses = [...courses];
//     updatedCourses[courseIndex][field] = value; 
//     setCourses(updatedCourses);
//   };

//   const saveCourses = async () => {
//     if (loading) return; // Prevent multiple submissions while loading

//     setLoading(true);
//     setError(null);

//     const courseData = {
//       collegeId,
//       courses: courses.map((course) => ({
//         name: course.name,
//         duration: course.duration,
//         annualFees: course.annualFees, // Change fees to annualFees
//         category: course.category,
//         eligibility: course.eligibility,
//       })),
//     };

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/college/course/create`, // POST request to create courses
//         courseData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log(response.data);
//       alert("Courses saved successfully!");
//       setCourses([]); // Reset the courses list after saving
//     } catch (error) {
//       setError(error.message);
//       console.error("Error saving courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateCourses = async () => {
//     if (loading) return; // Prevent multiple submissions while loading

//     setLoading(true);
//     setError(null);

//     const courseData = {
//       collegeId,
//       courses: courses.map((course) => ({
//         name: course.name,
//         duration: course.duration,
//         annualFees: course.annualFees, // Change fees to annualFees
//         category: course.category,
//         eligibility: course.eligibility,
//         // Assuming each course has an id for updating
//         courseId: course.id, 
//       })),
//     };

//     console.log("Request Payload:", courseData); // Debugging payload

//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}/api/college/course/${collegeId}`, // PUT request to update courses
//         courseData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         const updatedData = response.data; // Directly using the response data
//         setCourses(updatedData.updatedCourse.courses); // Update courses with the new data
//         alert("Courses updated successfully!");
//       } else {
//         setError("Failed to update courses.");
//       }
//     } catch (error) {
//       setError(error.response ? error.response.data.message : error.message);
//       console.error("Error updating courses:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="p-4 bg-white rounded-xl shadow-md">
//       <div className="flex justify-between mb-6">
//         <h3 className="text-xl font-semibold">
//           Add Courses for College ID: {collegeId}
//         </h3>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       <div className="space-y-6">
//         {courses.map((course, courseIndex) => (
//           <motion.div
//             key={courseIndex} // Use courseIndex to dynamically handle each course
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
//                   value={course.name || ""} // Dynamically use course
//                   onChange={(e) => handleChange(e, courseIndex, 'name')} // Pass the course index and field name
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label>Duration</label>
//                 <input
//                   type="text"
//                   value={course.duration || ""}
//                   onChange={(e) => handleChange(e, courseIndex, 'duration')}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label>Annual Fees</label>
//                 <input
//                   type="text"
//                   value={course.annualFees || ""}
//                   onChange={(e) => handleChange(e, courseIndex, 'annualFees')}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label>Category</label>
//                 <select
//                   value={course.category || "SSC"}
//                   onChange={(e) => handleChange(e, courseIndex, 'category')}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 >
//                   <option value="SSC">SSC</option>
//                   <option value="HSC">HSC</option>
//                   <option value="Diploma">Diploma</option>
//                   <option value="Graduation">Graduation</option>
//                   <option value="Postgraduate">Postgraduate</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label>Eligibility</label>
//                 <input
//                   type="text"
//                   value={course.eligibility || ""}
//                   onChange={(e) => handleChange(e, courseIndex, 'eligibility')}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>
//             </div>

//             {/* Remove Button after each form */}
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => removeCourse(courseIndex)} // Remove course using the index
//                 className="bg-red-600 text-white py-2 px-4 rounded-lg"
//               >
//                 <Trash className="mr-2" size={20} />
//                 Remove Course
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Add Course Button and Update Button at the bottom */}
//       <div className="flex justify-between mt-6">
//         <button
//           onClick={addCourse}
//           className="bg-blue-600 text-white px-3 py-2 rounded-lg"
//         >
//           <Plus className="inline mr-2" size={20} />
//           Add Course
//         </button>

//         <div className="flex gap-4">
//           <button
//             onClick={saveCourses}
//             className="bg-green-600 text-white py-2 px-4 rounded-lg"
//             disabled={loading}
//           >
//             {loading ? (
//               "Saving..."
//             ) : (
//               <>
//                 <CheckCheck className="mr-2" size={20} /> Save Course
//               </>
//             )}
//           </button>

//           <button
//             onClick={updateCourses}
//             className="bg-yellow-600 text-white py-2 px-4 rounded-lg"
//             disabled={loading}
//           >
//             {loading ? (
//               "Updating..."
//             ) : (
//               <>
//                 <CheckCheck className="mr-2" size={20} /> Update Course
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CollegeCourses;



// import React, { useState, useEffect } from "react";
// import { Plus, Trash, CheckCheck } from "lucide-react";
// import { motion } from "framer-motion";
// import { useParams } from "react-router-dom";
// import axios from "axios"; // Import axios

// // Import the API base URL from the constants file
// import { API_BASE_URL } from "../Constant/constantBaseUrl"; // Update the path if needed

// const CollegeCourses = () => {
//   const { collegeId } = useParams(); // Get the collegeId from the URL
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false); // For loading state
//   const [error, setError] = useState(null); // For error state

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       setError(null); // Clear previous errors

//       try {
//         // Make the GET request with axios using the API base URL from environment
//         const response = await axios.get(`${API_BASE_URL}/api/college/course/${collegeId}`);

//         // Parse the response.data (it's a stringified JSON, so we need to parse it)
//         const data = JSON.parse(response.data.data);

//         // Assuming the data contains the courses array
//         if (data && data.courses) {
//           setCourses(data.courses);
//         } else {
//           throw new Error("Courses data not found.");
//         }
//       } catch (err) {
//         setError("Failed to fetch courses. Please check the console for more details.");
//         console.error("Error fetching courses:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [collegeId]);

//   // Handle adding a new course
//   const addCourse = () => {
//     setCourses([
//       ...courses,
//       {
//         name: "",
//         duration: "",
//         fees: "",
//         category: "SSC", // default category
//         eligibility: "",
//       },
//     ]);
//   };

//   // Handle removing a course
//   const removeCourse = (id) => {
//     setCourses(courses.filter((course) => course._id !== id));
//   };

//   // Handle form changes for a course
//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedCourses = [...courses];
//     updatedCourses[index][name] = value;
//     setCourses(updatedCourses);
//   };

//   // Function to handle saving courses to the backend (bulk update)
//   const saveCourses = async () => {
//     if (loading) return; // Prevent multiple submissions

//     setLoading(true); // Set loading to true
//     setError(null); // Clear any previous errors

//     // Prepare the course data to match the backend API expectations
//     const courseData = {
//       collegeId,
//       courses: courses.map(course => ({
//         _id: course._id,  // Send the course ID to update specific courses
//         name: course.name,
//         duration: course.duration,
//         annualFees: course.fees,  // Map 'fees' to 'annualFees'
//         category: course.category,
//         eligibility: course.eligibility,
//       })),
//     };

//     try {
//       const response = await axios.put(`${API_BASE_URL}/api/college/course/${collegeId}`, courseData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       // Log the response to check for successful submission
//       console.log(response.data);

//       alert("Courses saved successfully!");
//       setCourses([]); // Clear courses after successful submission
//     } catch (error) {
//       setError(error.message); // Show error message
//       console.error("Error saving courses:", error);
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <section className="p-4 bg-white rounded-xl shadow-md">
//       <div className="flex justify-between mb-6">
//         <h3 className="text-xl font-semibold">Add Courses for College ID: {collegeId}</h3>
//         <button onClick={addCourse} className="bg-blue-600 text-white px-3 py-2 rounded-lg">
//           <Plus className="inline mr-2" size={20} />
//           Add Course
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       <div className="space-y-6">
//         {courses.map((course, index) => (
//           <motion.div
//             key={course._id} // Use course._id instead of index to maintain stability in key
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
//                 <label>Annual Fees</label>
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
//                 <select
//                   name="category"
//                   value={course.category}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 >
//                   <option value="SSC">SSC</option>
//                   <option value="HSC">HSC</option>
//                   <option value="Diploma">Diploma</option>
//                   <option value="Graduation">Graduation</option>
//                   <option value="Postgraduate">Postgraduate</option>
//                 </select>
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
//                 onClick={() => removeCourse(course._id)} // Removed 'id' and used '_id' to match your data
//                 className="bg-red-600 text-white py-2 px-4 rounded-lg"
//               >
//                 <Trash className="mr-2" size={20} />
//                 Remove Course
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Save All Courses Button */}
//       <div className="flex justify-end mt-6">
//         <button
//           onClick={saveCourses}
//           className="bg-green-600 text-white py-2 px-4 rounded-lg"
//           disabled={loading}
//         >
//           {loading ? "Saving..." : <><CheckCheck className="mr-2" size={20} /> Save All Courses</>}
//         </button>
//       </div>
//     </section>
//   );
// };

// export default CollegeCourses;

// import React, { useState, useEffect } from "react";
// import { Plus, Trash, CheckCheck } from "lucide-react";
// import { motion } from "framer-motion";
// import { useParams } from "react-router-dom";

// const CollegeCourses = () => {
//   const { collegeId } = useParams(); // Get the collegeId from the URL
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false); // For loading state
//   const [error, setError] = useState(null); // For error state

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const response = await fetch(`/api/colleges/${collegeId}/courses`);
//       const data = await response.json();
//       setCourses(data.courses); // Assuming the response returns courses as an array
//     };

//     fetchCourses();
//   }, [collegeId]);

//   // Handle adding a new course
//   const addCourse = () => {

//     setCourses([
//       ...courses,
//       {
//         name: "",
//         duration: "",
//         fees: "",
//         category: "SSC", // default category
//         eligibility: "",
//       },
//     ]);
//   };

//   // Handle removing a course
//   const removeCourse = (id) => {
//     setCourses(courses.filter((course) => course.id !== id));
//   };

//   // Handle form changes for a course
//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedCourses = [...courses];
//     updatedCourses[index][name] = value;
//     setCourses(updatedCourses);
//   };

//   // Function to handle saving courses to the backend
//   const saveCourses = async () => {
//     if (loading) return; // Prevent multiple submissions

//     setLoading(true); // Set loading to true
//     setError(null); // Clear any previous errors

//     // Prepare the course data to match the backend API expectations
//     const courseData = {
//       collegeId,
//       courses: courses.map(course => ({
//         name: course.name,
//         duration: course.duration,
//         annualFees: course.fees,  // Map 'fees' to 'annualFees'
//         category: course.category,
//         eligibility: course.eligibility,
//       })),
//     };

//     try {
//       const response = await fetch("http://192.168.1.17:5000/api/college/course/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(courseData),
//       });

//       // Log the raw response text to inspect it
//       const responseText = await response.text();
//       console.log(responseText); // Log the raw response body

//       // Check if the response is not OK and throw an error if it's not
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} - ${responseText}`);
//       }

//       // Try parsing the response as JSON
//       const result = JSON.parse(responseText);
//       console.log(result);

//       alert("Courses saved successfully!");
//       setCourses([]); // Clear courses after successful submission
//     } catch (error) {
//       setError(error.message); // Show error message
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <section className="p-4 bg-white rounded-xl shadow-md">
//       <div className="flex justify-between mb-6">
//         <h3 className="text-xl font-semibold">Add Courses for College ID: {collegeId}</h3>
//         <button onClick={addCourse} className="bg-blue-600 text-white px-3 py-2 rounded-lg">
//           <Plus className="inline mr-2" size={20} />
//           Add Course
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       <div className="space-y-6">
//         {courses.map((course, index) => (
//           <motion.div
//             key={index}
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
//                 <label>Annual Fees</label>
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
//                 <select
//                   name="category"
//                   value={course.category}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 >
//                   <option value="SSC">SSC</option>
//                   <option value="HSC">HSC</option>
//                   <option value="Diploma">Diploma</option>
//                   <option value="Graduation">Graduation</option>
//                   <option value="Postgraduate">Postgraduate</option>
//                 </select>
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

//               <button
//                 onClick={saveCourses}
//                 className="bg-green-600 text-white py-2 px-4 rounded-lg"
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : <><CheckCheck className="mr-2" size={20} /> Save Course</>}
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CollegeCourses;



// The Main import React, { useState, useEffect } from "react";
// import { Plus, Trash, CheckCheck } from "lucide-react";
// import { motion } from "framer-motion";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";

// const CollegeCourses = () => {
//   const { collegeId } = useParams();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/college/course/${collegeId}`
//         );

//         const data = JSON.parse(response.data.data); // If the data is a string, you can parse it

//         if (data && data.courses) {
//           setCourses(data.courses); // Now we store the data in the courses state.
//         } else {
//           throw new Error("Courses data not found.");
//         }
//       } catch (err) {
//         setError("Failed to fetch courses. Please check the console for more details.");
//         console.error("Error fetching courses:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [collegeId]);

//   // Add an empty course when the "Add Course" button is clicked
//   const addCourse = () => {
//     setCourses([
//       ...courses,
//       {
//         courses: [
//           {
//             name: "",
//             duration: "",
//             annualFees: "", // Rename fees to annualFees
//             category: "SSC",
//             eligibility: "",
//           },
//         ],
//       },
//     ]);
//   };

//   // Remove the course by its id
//   const removeCourse = (index) => {
//     setCourses(courses.filter((_, i) => i !== index)); // Filter the course array by index
//   };

//   // Update the course field on change
//   const handleChange = (e, courseIndex, field) => {
//     const { name, value } = e.target;
//     const updatedCourses = [...courses];
//     updatedCourses[courseIndex].courses[0][name] = value; // Update the course at the dynamic index
//     setCourses(updatedCourses);
//   };

//   // Save the course data
//   const saveCourses = async () => {
//     if (loading) return;

//     setLoading(true);
//     setError(null);

//     const courseData = {
//       collegeId,
//       courses: courses.map((course) => ({
//         name: course.courses[0].name,
//         duration: course.courses[0].duration,
//         annualFees: course.courses[0].annualFees, // Change fees to annualFees
//         category: course.courses[0].category,
//         eligibility: course.courses[0].eligibility,
//       })),
//     };

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/college/course/create`,
//         courseData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log(response.data);

//       alert("Courses saved successfully!");
//       setCourses([]); // Clear the courses after successful save
//     } catch (error) {
//       setError(error.message);
//       console.error("Error saving courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update the course data
//   const updateCourses = async () => {
//     if (loading) return;

//     setLoading(true);
//     setError(null);

//     const courseData = {
//       collegeId,
//       courses: courses.map((course) => ({
//         name: course.courses[0].name,
//         duration: course.courses[0].duration,
//         annualFees: course.courses[0].annualFees, // Change fees to annualFees
//         category: course.courses[0].category,
//         eligibility: course.courses[0].eligibility,
//         courseId: course.courses[0].id, // Ensure the course ID is included if needed
//       })),
//     };

//     console.log("Request Payload:", courseData); // Debugging payload

//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}/api/college/course/${collegeId}`,
//         courseData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         const updatedData = JSON.parse(response.data.data); // Parse the updated course data
//         setCourses(updatedData.updatedCourse.courses); // Update courses with the new data
//         alert("Courses updated successfully!");
//       } else {
//         setError("Failed to update courses.");
//       }
//     } catch (error) {
//       setError(error.response ? error.response.data.message : error.message);
//       console.error("Error updating courses:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="p-4 bg-white rounded-xl shadow-md">
//       <div className="flex justify-between mb-6">
//         <h3 className="text-xl font-semibold">
//           Add Courses for College ID: {collegeId}
//         </h3>
//         <button
//           onClick={addCourse}
//           className="bg-blue-600 text-white px-3 py-2 rounded-lg"
//         >
//           <Plus className="inline mr-2" size={20} />
//           Add Course
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       <div className="space-y-6">
//         {courses.map((course, courseIndex) => (
//           <motion.div
//             key={courseIndex} // Use courseIndex to dynamically handle each course
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
//                   value={course.courses[0]?.name || ""} // Dynamically use course.courses[0]
//                   onChange={(e) => handleChange(e, courseIndex, 'name')} // Pass the course index and field name
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label>Duration</label>
//                 <input
//                   type="text"
//                   name="duration"
//                   value={course.courses[0]?.duration || ""}
//                   onChange={(e) => handleChange(e, courseIndex, 'duration')}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label>Annual Fees</label>
//                 <input
//                   type="text"
//                   name="annualFees" // Change fees to annualFees
//                   value={course.courses[0]?.annualFees || ""}
//                   onChange={(e) => handleChange(e, courseIndex, 'annualFees')}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label>Category</label>
//                 <select
//                   name="category"
//                   value={course.courses[0]?.category || "SSC"}
//                   onChange={(e) => handleChange(e, courseIndex, 'category')}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 >
//                   <option value="SSC">SSC</option>
//                   <option value="HSC">HSC</option>
//                   <option value="Diploma">Diploma</option>
//                   <option value="Graduation">Graduation</option>
//                   <option value="Postgraduate">Postgraduate</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label>Eligibility</label>
//                 <input
//                   type="text"
//                   name="eligibility"
//                   value={course.courses[0]?.eligibility || ""}
//                   onChange={(e) => handleChange(e, courseIndex, 'eligibility')}
//                   className="mt-1 px-4 py-2 border rounded-md"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => removeCourse(courseIndex)} // Remove course using the index
//                 className="bg-red-600 text-white py-2 px-4 rounded-lg"
//               >
//                 <Trash className="mr-2" size={20} />
//                 Remove Course
//               </button>

//               <button
//                 onClick={saveCourses}
//                 className="bg-green-600 text-white py-2 px-4 rounded-lg"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   "Saving..."
//                 ) : (
//                   <>
//                     <CheckCheck className="mr-2" size={20} /> Save Course
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={updateCourses}
//                 className="bg-yellow-600 text-white py-2 px-4 rounded-lg"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   "Updating..."
//                 ) : (
//                   <>
//                     <CheckCheck className="mr-2" size={20} /> Update Course
//                   </>
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CollegeCourses;