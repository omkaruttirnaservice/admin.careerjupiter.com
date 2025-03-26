

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




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { FaEye, FaEdit, FaPauseCircle, FaPlus } from "react-icons/fa"; // Added FaPlus icon
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";

// const TableDetails = () => {
//   const [collegeData, setCollegeData] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

//   // Mapping categories and types to tag colors
//   const categoryColorMapping = {
//     HSC: "bg-blue-200",
//     Diploma: "bg-pink-200",
//     Engineering: "bg-yellow-200",
//     Pharmacy: "bg-red-200",
//   };

//   const typeColorMapping = {
//     Government: "bg-green-200",
//     Private: "bg-purple-200",
//     Autonomous: "bg-red-200",
//   };

//   // GET request to fetch college data
//   useEffect(() => {
//     axios
      
    
//     (`${API_BASE_URL}/api/college/all`)
//       .then((response) => {
//         if (response.data.success) {
//           try {
//             const parsedData = JSON.parse(response.data.data); // Parse the stringified data
//             setCollegeData(parsedData.colleges); // Set the colleges data
//             setLoading(false);
//           } catch (error) {
//             console.error("Error parsing data:", error);
//             setLoading(false);
//           }
//         } else {
//           console.error("Failed to fetch colleges:", response.data.usrMsg);
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching college data:", error);
//         setLoading(false);
//       });
//   }, []); // Empty array ensures this only runs once on component mount
//   const navigate = useNavigate();

//   // Modal Close Handler
//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   // Open Profile Modal
//   const handleViewProfile = (item) => {
//     setSelectedItem(item);
//     setModalOpen(true);
//   };

//   // Delete Handler
//   const handleDelete = (item) => {
//     setCollegeData(collegeData.filter((college) => college._id !== item._id));
//   };

//   // Add Course Handler
//   const handleAddCourse = (college) => {
//     // Handle the logic for adding a course for a particular college
//     console.log("Add course for college:", college);
//     // You could open a modal, redirect to another page, or trigger some other action
//   };

//   // Filter the data based on search term
//   const filteredData = collegeData.filter((row) => {
//     return (
//       row.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.affiliatedUniversity
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       row.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.collegeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       `${row.location.lat}, ${row.location.lng}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       row.contactDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.websiteURL.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.establishedYear.toString().includes(searchTerm) ||
//       row.accreditation.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   // Table Columns with Custom Cell for Tags
//   const columns = [
//     {
//       name: "College Name",
//       selector: (row) => row.collegeName,
//       sortable: true,
//     },
//     {
//       name: "Affiliated University",
//       selector: (row) => row.affiliatedUniversity,
//       sortable: true,
//     },
//     {
//       name: "College Category",
//       selector: (row) => row.Category,
//       sortable: true,
//       cell: (row) => {
//         const tagColor =
//           categoryColorMapping[row.Category] || "bg-gray-200";
//         return (
//           <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
//             {row.Category}
//           </span>
//         );
//       },
//     },
//     {
//       name: "College Type",
//       selector: (row) => row.collegeType,
//       sortable: true,
//       cell: (row) => {
//         const tagColor = typeColorMapping[row.collegeType] || "bg-gray-200";
//         return (
//           <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
//             {row.collegeType}
//           </span>
//         );
//       },
//     },
//     {
//       name: "Location",
//       selector: (row) => `${row.location.lat}, ${row.location.lng}`,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) =>
//         `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`,
//       sortable: true,
//     },
//     {
//       name: "Contact",
//       selector: (row) => row.contactDetails,
//     },
//     {
//       name: "Website",
//       selector: (row) => (
//         <button
//           onClick={() => window.open(row.websiteURL, "_blank")}
//           className="text-white bg-blue-600 hover:bg-blue-800 py-1 px-3 rounded-md"
//         >
//           Visit Website
//         </button>
//       ),
//     },
//     {
//       name: "Established Year",
//       selector: (row) => row.establishedYear,
//     },
//     {
//       name: "Accreditation",
//       selector: (row) => row.accreditation,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex space-x-2">
//           <button
//             className="text-blue-600 hover:text-blue-800"
//             onClick={() => handleViewProfile(row)}
//           >
//             <FaEye size={20} />
//           </button>
//           <button
//             className="text-yellow-600 hover:text-yellow-800"
//             onClick={() => console.log("Edit:", row)}
//           >
//             <FaEdit size={20} />
//           </button>
//           <button
//             className="text-red-600 hover:text-red-800"
//             onClick={() => handleDelete(row)}
//           >
//             <FaPauseCircle size={20} />
//           </button>

//           <button
//             className="text-green-600 hover:text-green-800"
//             onClick={() => navigate(`/colleges/courses/${row._id}`)} // Navigate to the Add Course page with the college ID
//           >
//             <FaPlus size={20} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <section>
//       <div className="bg-blue-50 py-4 px-2">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-blue-700">College List</h2>
//           <div className="ml-4">
//             <input
//               type="text"
//               placeholder="Search colleges..."
//               className="px-4 py-2 border rounded-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <DataTable
//           columns={columns}
//           data={filteredData}
//           pagination
//           highlightOnHover
//           responsive
//           progressPending={loading}
//           progressComponent={<div>Loading...</div>}
//           customStyles={{
//             headRow: {
//               style: {
//                 backgroundColor: "#3b82f6",
//                 color: "white",
//               },
//             },
//             headCells: {
//               style: {
//                 fontWeight: "bold",
//               },
//             },
//             rows: {
//               style: {
//                 backgroundColor: "#f0f9ff",
//                 color: "#1e3a8a",
//                 borderBottom: "1px solid #3b82f6",
//               },
//             },
//             pagination: {
//               style: {
//                 backgroundColor: "#f0f9ff",
//               },
//             },
//           }}
//         />
//       </div>
//     </section>
//   );
// };

// export default TableDetails;


// src/components/TableDetails.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { FaEye, FaEdit, FaPauseCircle, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import InfoCard from "../Component/InfoCard"; // Import the InfoCard component

// const TableDetails = () => {
//   const [collegeData, setCollegeData] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const categoryColorMapping = {
//     HSC: "bg-blue-200",
//     Diploma: "bg-pink-200",
//     Engineering: "bg-yellow-200",
//     Pharmacy: "bg-red-200",
//   };

//   const typeColorMapping = {
//     Government: "bg-green-200",
//     Private: "bg-purple-200",
//     Autonomous: "bg-red-200",
//     Deemed: "bg-pink-200"
//   };

//   // Fetch data from API
//   useEffect(() => {
//     axios
//       .get(`${API_BASE_URL}/api/college/all`)
//       .then((response) => {
//         if (response.data.success) {
//           const parsedData = JSON.parse(response.data.data);
//           setCollegeData(parsedData.colleges);
//           setLoading(false);
//         } else {
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching college data:", error);
//         setLoading(false);
//       });
//   }, []);

//   const navigate = useNavigate();

//   // Handle modal close
//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedItem(null);
//   };

//   // Handle View Profile click
//   const handleViewProfile = (item) => {
//     setSelectedItem(item);
//     setModalOpen(true);
//   };

//   const handleDelete = (item) => {
//     setCollegeData(collegeData.filter((college) => college._id !== item._id));
//   };

//   const filteredData = collegeData.filter((row) => {
//     return (
//       row.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.affiliatedUniversity
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       row.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.collegeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       `${row.location.lat}, ${row.location.lng}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       row.contactDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.websiteURL.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.establishedYear.toString().includes(searchTerm) ||
//       row.accreditation.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const columns = [
//     {
//       name: "College Name",
//       selector: (row) => row.collegeName,
//       sortable: true,
//     },
//     {
//       name: "Affiliated University",
//       selector: (row) => row.affiliatedUniversity,
//       sortable: true,
//     },
//     {
//       name: "College Category",
//       selector: (row) => row.Category,
//       sortable: true,
//       cell: (row) => {
//         const tagColor =
//           categoryColorMapping[row.Category] || "bg-gray-200";
//         return (
//           <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
//             {row.Category}
//           </span>
//         );
//       },
//     },
//     {
//       name: "College Type",
//       selector: (row) => row.collegeType,
//       sortable: true,
//       cell: (row) => {
//         const tagColor = typeColorMapping[row.collegeType] || "bg-gray-200";
//         return (
//           <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
//             {row.collegeType}
//           </span>
//         );
//       },
//     },
//     {
//       name: "Location",
//       selector: (row) => `${row.location.lat}, ${row.location.lng}`,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) =>
//         `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`,
//       sortable: true,
//     },
//     {
//       name: "Contact",
//       selector: (row) => row.contactDetails,
//       sortable: true,
//     },
//     {
//       name: "Website",
//       selector: (row) => (
//         <button
//           onClick={() => window.open(row.websiteURL, "_blank")}
//           className="text-white bg-blue-600 hover:bg-blue-800 py-1 px-3 rounded-md"
//         >
//           Visit Website
//         </button>
//       ),
//     },
//     {
//       name: "Established Year",
//       selector: (row) => row.establishedYear,
//       sortable: true,
//     },
//     {
//       name: "Accreditation",
//       selector: (row) => row.accreditation,
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex space-x-2">
//           <button
//             className="text-blue-600 hover:text-blue-800"
//             onClick={() => handleViewProfile(row)}
//           >
//             <FaEye size={20} />
//           </button>
//           <button
//             className="text-yellow-600 hover:text-yellow-800"
//             onClick={() => console.log("Edit:", row)}
//           >
//             <FaEdit size={20} />
//           </button>
//           <button
//             className="text-red-600 hover:text-red-800"
//             onClick={() => handleDelete(row)}
//           >
//             <FaPauseCircle size={20} />
//           </button>
//           <button
//             className="text-green-600 hover:text-green-800"
//             onClick={() => navigate(`/colleges/courses/${row._id}`)}
//           >
//             <FaPlus size={20} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <section>
//       <div className="bg-blue-50 py-4 px-2">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-blue-700">College List</h2>
//           <div className="ml-4">
//             <input
//               type="text"
//               placeholder="Search colleges..."
//               className="px-4 py-2 border rounded-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <DataTable
//           columns={columns}
//           data={filteredData}
//           pagination
//           highlightOnHover
//           responsive
//           progressPending={loading}
//           progressComponent={<div>Loading...</div>}
//           customStyles={{
//             headRow: {
//               style: {
//                 backgroundColor: "#3b82f6",
//                 color: "white",
//               },
//             },
//             headCells: {
//               style: {
//                 fontWeight: "bold",
//               },
//             },
//             rows: {
//               style: {
//                 backgroundColor: "#f0f9ff",
//                 color: "#1e3a8a",
//                 borderBottom: "1px solid #3b82f6",
//               },
//             },
//             pagination: {
//               style: {
//                 backgroundColor: "#f0f9ff",
//               },
//             },
//           }}
//         />

//         {/* Render InfoCard modal */}
//         {modalOpen && (
//           <InfoCard collegeData={selectedItem} onClose={handleCloseModal} />
//         )}
//       </div>
//     </section>
//   );
// };

// export default TableDetails;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { FaEye, FaEdit, FaPauseCircle, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import InfoCard from "../Component/InfoCard"; // Import the InfoCard component
// import EditCollegeDetails from "../Component/EditCollegeDetails"; // Import the EditCollegeDetails component

// const TableDetails = () => {
//   const [collegeData, setCollegeData] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);  // Track Edit Modal
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const categoryColorMapping = {
//     HSC: "bg-blue-200",
//     Diploma: "bg-pink-200",
//     Engineering: "bg-yellow-200",
//     Pharmacy: "bg-red-200",
//   };

//   const typeColorMapping = {
//     Government: "bg-green-200",
//     Private: "bg-purple-200",
//     Autonomous: "bg-red-200",
//     Deemed: "bg-pink-200"
//   };

//   // Fetch data from API
//   useEffect(() => {
//     axios
//       .get(`${API_BASE_URL}/api/college/all`)
//       .then((response) => {
//         if (response.data.success) {
//           const parsedData = JSON.parse(response.data.data);
//           setCollegeData(parsedData.colleges);
//           setLoading(false);
//         } else {
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching college data:", error);
//         setLoading(false);
//       });
//   }, []);

//   const navigate = useNavigate();

//   // Handle modal close
//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedItem(null);
//   };

//   // Handle View Profile click
//   const handleViewProfile = (item) => {
//     setSelectedItem(item);
//     setModalOpen(true);
//   };

//   // Handle Edit click
//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     setEditModalOpen(true);
//   };

//   // Handle Save from EditCollegeDetails
//   const handleSaveEdit = (updatedData) => {
//     setCollegeData((prevData) =>
//       prevData.map((college) =>
//         college._id === updatedData._id ? updatedData : college
//       )
//     );
//     setEditModalOpen(false); // Close the Edit Modal
//   };

//   const handleDelete = (item) => {
//     setCollegeData(collegeData.filter((college) => college._id !== item._id));
//   };

//   const filteredData = collegeData.filter((row) => {
//     return (
//       row.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.affiliatedUniversity
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       row.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.collegeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       `${row.location.lat}, ${row.location.lng}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       row.contactDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.websiteURL.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.establishedYear.toString().includes(searchTerm) ||
//       row.accreditation.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const columns = [
//     {
//       name: "College Name",
//       selector: (row) => row.collegeName,
//       sortable: true,
//     },
//     {
//       name: "Affiliated University",
//       selector: (row) => row.affiliatedUniversity,
//       sortable: true,
//     },
//     {
//       name: "College Category",
//       selector: (row) => row.Category,
//       sortable: true,
//       cell: (row) => {
//         const tagColor =
//           categoryColorMapping[row.Category] || "bg-gray-200";
//         return (
//           <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
//             {row.Category}
//           </span>
//         );
//       },
//     },
//     {
//       name: "College Type",
//       selector: (row) => row.collegeType,
//       sortable: true,
//       cell: (row) => {
//         const tagColor = typeColorMapping[row.collegeType] || "bg-gray-200";
//         return (
//           <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
//             {row.collegeType}
//           </span>
//         );
//       },
//     },
//     {
//       name: "Location",
//       selector: (row) => `${row.location.lat}, ${row.location.lng}`,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) =>
//         `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`,
//       sortable: true,
//     },
//     {
//       name: "Contact",
//       selector: (row) => row.contactDetails,
//       sortable: true,
//     },
//     {
//       name: "Website",
//       selector: (row) => (
//         <button
//           onClick={() => window.open(row.websiteURL, "_blank")}
//           className="text-white bg-blue-600 hover:bg-blue-800 py-1 px-3 rounded-md"
//         >
//           Visit Website
//         </button>
//       ),
//     },
//     {
//       name: "Established Year",
//       selector: (row) => row.establishedYear,
//       sortable: true,
//     },
//     {
//       name: "Accreditation",
//       selector: (row) => row.accreditation,
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex space-x-2">
//           <button
//             className="text-blue-600 hover:text-blue-800"
//             onClick={() => handleViewProfile(row)}
//           >
//             <FaEye size={20} />
//           </button>
//           <button
//             className="text-yellow-600 hover:text-yellow-800"
//             onClick={() => handleEdit(row)}  // Open EditCollegeDetails
//           >
//             <FaEdit size={20} />
//           </button>
//           <button
//             className="text-red-600 hover:text-red-800"
//             onClick={() => handleDelete(row)}
//           >
//             <FaPauseCircle size={20} />
//           </button>
//           <button
//             className="text-green-600 hover:text-green-800"
//             onClick={() => navigate(`/colleges/courses/${row._id}`)}
//           >
//             <FaPlus size={20} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <section>
//       <div className="bg-blue-50 py-4 px-2">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-blue-700">College List</h2>
//           <div className="ml-4">
//             <input
//               type="text"
//               placeholder="Search colleges..."
//               className="px-4 py-2 border rounded-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <DataTable
//           columns={columns}
//           data={filteredData}
//           pagination
//           highlightOnHover
//           responsive
//           progressPending={loading}
//           progressComponent={<div>Loading...</div>}
//           customStyles={{
//             headRow: {
//               style: {
//                 backgroundColor: "#3b82f6",
//                 color: "white",
//               },
//             },
//             headCells: {
//               style: {
//                 fontWeight: "bold",
//               },
//             },
//             rows: {
//               style: {
//                 backgroundColor: "#f0f9ff",
//                 color: "#1e3a8a",
//                 borderBottom: "1px solid #3b82f6",
//               },
//             },
//             pagination: {
//               style: {
//                 backgroundColor: "#f0f9ff",
//               },
//             },
//           }}
//         />

//         {/* Render InfoCard modal */}
//         {modalOpen && (
//           <InfoCard collegeData={selectedItem} onClose={handleCloseModal} />
//         )}

//         {/* Render EditCollegeDetails modal */}
//         {editModalOpen && (
//           <EditCollegeDetails
//             collegeData={selectedItem}
//             onSave={handleSaveEdit}
//             onCancel={() => setEditModalOpen(false)}
//           />
//         )}
//       </div>
//     </section>
//   );
// };

// export default TableDetails;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { FaEye, FaEdit, FaPauseCircle, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import InfoCard from "../Component/InfoCard"; // Import the InfoCard component
// import EditCollegeDetails from "../Component/EditCollegeDetails"; // Import the EditCollegeDetails component

// const TableDetails = () => {
//   const [collegeData, setCollegeData] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);  // Track Edit Modal
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const categoryColorMapping = {
//     HSC: "bg-blue-200",
//     Diploma: "bg-pink-200",
//     Engineering: "bg-yellow-200",
//     Pharmacy: "bg-red-200",
//   };

//   const typeColorMapping = {
//     Government: "bg-green-200",
//     Private: "bg-purple-200",
//     Autonomous: "bg-red-200",
//     Deemed: "bg-pink-200"
//   };

//   // Fetch data from API
//   useEffect(() => {
//     axios
//       .get(`${API_BASE_URL}/api/college/all`)
//       .then((response) => {
//         if (response.data.success) {
//           const parsedData = JSON.parse(response.data.data);
//           setCollegeData(parsedData.colleges);
//           setLoading(false);
//         } else {
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching college data:", error);
//         setLoading(false);
//       });
//   }, []);

//   const navigate = useNavigate();

//   // Handle modal close
//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedItem(null);
//   };

//   // Handle View Profile click
//   const handleViewProfile = (item) => {
//     setSelectedItem(item);
//     setModalOpen(true);
//   };

//   // Handle Edit click
//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     setEditModalOpen(true);
//   };

//   // Handle Save from EditCollegeDetails
//   const handleSaveEdit = (updatedData) => {
//     // Make a PATCH request to update the data in the backend
//     axios
//       .patch(`${API_BASE_URL}/api/college/update/${updatedData._id}`, updatedData)
//       .then((response) => {
//         if (response.data.success) {
//           // Update local state with the updated college data
//           setCollegeData((prevData) =>
//             prevData.map((college) =>
//               college._id === updatedData._id ? updatedData : college
//             )
//           );
//           setEditModalOpen(false); // Close the Edit Modal
//         } else {
//           alert("Failed to update college details");
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating college data:", error);
//         alert("Error updating college details");
//       });
//   };

//   const handleDelete = (item) => {
//     setCollegeData(collegeData.filter((college) => college._id !== item._id));
//   };

//   const filteredData = collegeData.filter((row) => {
//     return (
//       row.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.affiliatedUniversity
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       row.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.collegeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       `${row.location.lat}, ${row.location.lng}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}` 
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       row.contactDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.websiteURL.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.establishedYear.toString().includes(searchTerm) ||
//       row.accreditation.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const columns = [
//     {
//       name: "College Name",
//       selector: (row) => row.collegeName,
//       sortable: true,
//     },
//     {
//       name: "Affiliated University",
//       selector: (row) => row.affiliatedUniversity,
//       sortable: true,
//     },
//     {
//       name: "College Category",
//       selector: (row) => row.Category,
//       sortable: true,
//       cell: (row) => {
//         const tagColor =
//           categoryColorMapping[row.Category] || "bg-gray-200";
//         return (
//           <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
//             {row.Category}
//           </span>
//         );
//       },
//     },
//     {
//       name: "College Type",
//       selector: (row) => row.collegeType,
//       sortable: true,
//       cell: (row) => {
//         const tagColor = typeColorMapping[row.collegeType] || "bg-gray-200";
//         return (
//           <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
//             {row.collegeType}
//           </span>
//         );
//       },
//     },
//     {
//       name: "Location",
//       selector: (row) => `${row.location.lat}, ${row.location.lng}`,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) =>
//         `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`,
//       sortable: true,
//     },
//     {
//       name: "Contact",
//       selector: (row) => row.contactDetails,
//       sortable: true,
//     },
//     {
//       name: "Website",
//       selector: (row) => (
//         <button
//           onClick={() => window.open(row.websiteURL, "_blank")}
//           className="text-white bg-blue-600 hover:bg-blue-800 py-1 px-3 rounded-md"
//         >
//           Visit Website
//         </button>
//       ),
//     },
//     {
//       name: "Established Year",
//       selector: (row) => row.establishedYear,
//       sortable: true,
//     },
//     {
//       name: "Accreditation",
//       selector: (row) => row.accreditation,
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex space-x-2">
//           <button
//             className="text-blue-600 hover:text-blue-800"
//             onClick={() => handleViewProfile(row)}
//           >
//             <FaEye size={20} />
//           </button>
//           <button
//             className="text-yellow-600 hover:text-yellow-800"
//             onClick={() => handleEdit(row)}  // Open EditCollegeDetails
//           >
//             <FaEdit size={20} />
//           </button>
//           <button
//             className="text-red-600 hover:text-red-800"
//             onClick={() => handleDelete(row)}
//           >
//             <FaPauseCircle size={20} />
//           </button>
//           <button
//             className="text-green-600 hover:text-green-800"
//             onClick={() => navigate(`/colleges/courses/${row._id}`)}
//           >
//             <FaPlus size={20} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <section>
//       <div className="bg-blue-50 py-4 px-2">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-blue-700">College List</h2>
//           <div className="ml-4">
//             <input
//               type="text"
//               placeholder="Search colleges..."
//               className="px-4 py-2 border rounded-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <DataTable
//           columns={columns}
//           data={filteredData}
//           pagination
//           highlightOnHover
//           responsive
//           progressPending={loading}
//           progressComponent={<div>Loading...</div>}
//           customStyles={{
//             headRow: {
//               style: {
//                 backgroundColor: "#3b82f6",
//                 color: "white",
//               },
//             },
//             headCells: {
//               style: {
//                 fontWeight: "bold",
//               },
//             },
//             rows: {
//               style: {
//                 backgroundColor: "#f0f9ff",
//                 color: "#1e3a8a",
//                 borderBottom: "1px solid #3b82f6",
//               },
//             },
//             pagination: {
//               style: {
//                 backgroundColor: "#f0f9ff",
//               },
//             },
//           }}
//         />

//         {/* Render InfoCard modal */}
//         {modalOpen && (
//           <InfoCard collegeData={selectedItem} onClose={handleCloseModal} />
//         )}

//         {/* Render EditCollegeDetails modal */}
//         {editModalOpen && (
//           <EditCollegeDetails
//             collegeData={selectedItem}
//             onSave={handleSaveEdit}
//             onCancel={() => setEditModalOpen(false)}
//           />
//         )}
//       </div>
//     </section>
//   );
// };

// export default TableDetails;





// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl"; // Ensure this constant is correctly defined

// const Infrastructure = () => {
//   const { collegeId } = useParams();
//   const [formData, setFormData] = useState({
//     campusArea: "",
//     numberOfClassrooms: "",
//     numberOfLabs: "",
//     sportsFacilities: [],
//     hostelAvailability: "",
//     hostelDetails: "",
//     canteenAndFoodServices: "",
//     medicalFacilities: "",
//     transportFacility: [],
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   // Fetch infrastructure details
//   useEffect(() => {
//     const fetchInfrastructure = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/college/infrastructure/${collegeId}`
//         );
//         if (response.data) {
//           setFormData({
//             ...response.data,
//             sportsFacilities: response.data.sportsFacilities || [],
//             transportFacility: response.data.transportFacility || [],
//             hostelDetails: response.data.hostelDetails || "", // Ensure it remains controlled
//           });
//           setIsEditing(true);
//         }
//       } catch (error) {
//         console.error("Error fetching infrastructure data:", error);
//       }
//     };

//     fetchInfrastructure();
//   }, [collegeId]);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: checked
//           ? [...prev[name], value]
//           : prev[name].filter((item) => item !== value),
//       }));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const navigate = useNavigate();

//   // Function to handle update
//   const handleUpdate = async () => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/college/infrastructure/${collegeId}`,
//         formData
//       );
//       alert("Infrastructure updated successfully!");
//     } catch (error) {
//       console.error("Error updating infrastructure:", error);
//       alert("Failed to update infrastructure.");
//     }
//   };

//   // Function to handle delete
//   const handleDelete = async () => {
//     if (
//       window.confirm("Are you sure you want to delete this infrastructure?")
//     ) {
//       try {
//         await axios.delete(
//           `${API_BASE_URL}/api/college/infrastructure/${collegeId}`
//         );
//         alert("Infrastructure deleted successfully!");
//         navigate("/"); // Redirect after delete
//       } catch (error) {
//         console.error("Error deleting infrastructure:", error);
//         alert("Failed to delete infrastructure.");
//       }
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         await axios.put(
//           `${API_BASE_URL}/api/college/infrastructure/${collegeId}`,
//           formData
//         );
//         alert("Infrastructure updated successfully!");
//       } else {
//         await axios.post(`${API_BASE_URL}/api/college/infrastructure/`, {
//           ...formData,
//           collegeId,
//         });
//         alert("Infrastructure added successfully!");
//         setIsEditing(true);
//       }
//     } catch (error) {
//       console.error("Error saving infrastructure data:", error);
//       alert("Failed to save infrastructure details.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-blue-100 p-6 mt-10 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-blue-800 mb-4">
//         {isEditing
//           ? "Edit Infrastructure Details"
//           : "Add Infrastructure Details"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Campus Area */}
//         <div>
//           <label className="block text-blue-700 font-medium">
//             Campus Area:
//           </label>
//           <input
//             type="text"
//             name="campusArea"
//             value={formData.campusArea}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//             required
//             placeholder="250+ Acres"
//           />
//         </div>

//         {/* Classrooms & Labs */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-blue-700 font-medium">
//               Number of Classrooms:
//             </label>
//             <input
//               type="number"
//               name="numberOfClassrooms"
//               value={formData.numberOfClassrooms}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//               required
//               placeholder="100"
//             />
//           </div>
//           <div>
//             <label className="block text-blue-700 font-medium">
//               Number of Labs:
//             </label>
//             <input
//               type="number"
//               name="numberOfLabs"
//               value={formData.numberOfLabs}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//               required
//               placeholder="50"
//             />
//           </div>
//         </div>

//         {/* Sports Facilities */}
//         <div>
//           <label className="block text-blue-700 font-medium">
//             Sports Facilities Available:
//           </label>
//           <div className="flex gap-4">
//             <label>
//               <input
//                 type="checkbox"
//                 name="sportsFacilities"
//                 value="Indoor"
//                 checked={Array.isArray(formData.sportsFacilities) && formData.sportsFacilities.includes("Indoor")}
//                 onChange={handleChange}
//               />
//               <span className="ml-2">Indoor</span>
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="sportsFacilities"
//                 value="Outdoor"
//                 checked={Array.isArray(formData.sportsFacilities) && formData.sportsFacilities.includes("Outdoor")}
//                 onChange={handleChange}
//               />
//               <span className="ml-2">Outdoor</span>
//             </label>
//           </div>
//         </div>

//         {/* Hostel Availability */}
//         <div>
//           <label className="block text-blue-700 font-medium">
//             Hostel Availability:
//           </label>
//           <select
//             name="hostelAvailability"
//             value={formData.hostelAvailability}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//             required
//           >
//             <option value="">Select</option>
//             <option value="true">Yes</option>
//             <option value="false">No</option>
//           </select>
//         </div>

//         {/* Hostel Details */}
//         {formData.hostelAvailability === "true" && (
//           <div>
//             <label className="block text-blue-700 font-medium">
//               Hostel Details:
//             </label>
//             <input
//               type="text"
//               name="hostelDetails"
//               value={formData.hostelDetails}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//               required
//               placeholder="Separate for Boys & Girls"
//             />
//           </div>
//         )}

//         {/* Canteen & Medical Facilities */}
//         <div>
//           <label className="block text-blue-700 font-medium">
//             Canteen and Food Services:
//           </label>
//           <select
//             name="canteenAndFoodServices"
//             value={formData.canteenAndFoodServices}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//             required
//           >
//             <option value="">Select</option>
//             <option value="true">Available</option>
//             <option value="false">Not Available</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-blue-700 font-medium">
//             Medical Facilities:
//           </label>
//           <select
//             name="medicalFacilities"
//             value={formData.medicalFacilities}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//             required
//           >
//             <option value="">Select</option>
//             <option value="true">Available</option>
//             <option value="false">Not Available</option>
//           </select>
//         </div>

//         {/* Transport Facility */}
//         <div>
//           <label className="block text-blue-700 font-medium">
//             Transport Facilities:
//           </label>
//           <div className="flex gap-4">
//             <label>
//               <input
//                 type="checkbox"
//                 name="transportFacility"
//                 value="University Bus"
//                 checked={Array.isArray(formData.transportFacility) && formData.transportFacility.includes("University Bus")}
//                 onChange={handleChange}
//               />
//               <span className="ml-2">University Bus</span>
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 name="transportFacility"
//                 value="Public Transport Nearby"
//                 checked={Array.isArray(formData.transportFacility) && formData.transportFacility.includes("Public Transport Nearby")}
//                 onChange={handleChange}
//               />
//               <span className="ml-2">Public Transport Nearby</span>
//             </label>
//           </div>
//         </div>

//         <div className="flex mt-4 justify-end gap-5">
//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-30 bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition duration-300"
//         >
//           {isEditing ? "Update" : "Add "}
//         </button>

//         {/* <button
//           onClick={handleUpdate}
//           className="bg-yellow-500 text-white w-25 px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
//         >
//           Update
//         </button> */}

//         <button
//           onClick={handleDelete}
//           className="bg-red-500 text-white w-25 px-4 py-2 rounded-lg justify-end hover:bg-red-600 transition duration-300"
//         >
//           Delete
//         </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Infrastructure;




// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl"; // Ensure this constant is correctly defined

// const Infrastructure = () => {
//   const { collegeId } = useParams();
  
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     campusArea: "",
//     numberOfClassrooms: "0",
//     numberOfLabs: "0",
//     sportsFacilities: [],
//     hostelAvailability: "false",
//     hostelDetails: "",
//     canteenAndFoodServices: "false",
//     medicalFacilities: "false",
//     transportFacility: [],
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   // Fetch infrastructure details
//   useEffect(() => {
//     const fetchInfrastructure = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/college/infrastructure/${collegeId}`
//         );
//         if (response.data) {
//           setFormData({
//             campusArea: response.data.campusArea || "",
//             numberOfClassrooms: String(response.data.numberOfClassrooms || "0"),
//             numberOfLabs: String(response.data.numberOfLabs || "0"),
//             sportsFacilities: response.data.sportsFacilities || [],
//             hostelAvailability: response.data.hostelAvailability || "false",
//             hostelDetails: response.data.hostelDetails || "",
//             canteenAndFoodServices: response.data.canteenAndFoodServices || "false",
//             medicalFacilities: response.data.medicalFacilities || "false",
//             transportFacility: response.data.transportFacility || [],
//           });
//           setIsEditing(true);
//         }
//       } catch (error) {
//         console.error("Error fetching infrastructure data:", error);
//       }
//     };

//     fetchInfrastructure();
//   }, [collegeId]);

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "checkbox") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: checked
//           ? [...prev[name], value]
//           : prev[name].filter((item) => item !== value),
//       }));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Handle submit (Add / Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         await axios.put(
//           `${API_BASE_URL}/api/college/infrastructure/${collegeId}`,
//           formData
//         );
//         alert("Infrastructure updated successfully!");
//       } else {
//         await axios.post(`${API_BASE_URL}/api/college/infrastructure/`, {
//           ...formData,
//           collegeId,
//         });
//         alert("Infrastructure added successfully!");
//         setIsEditing(true);
//       }
//     } catch (error) {
//       console.error("Error saving infrastructure data:", error);
//       alert("Failed to save infrastructure details.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-blue-100 p-6 mt-10 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-blue-800 mb-4">
//         {isEditing ? "Edit Infrastructure Details" : "Add Infrastructure Details"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Campus Area */}
//         <div>
//           <label className="block text-blue-700 font-medium">
//             Campus Area:
//           </label>
//           <input
//             type="text"
//             name="campusArea"
//             value={formData.campusArea}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//             placeholder="250+ Acres"
//           />
//         </div>

//         {/* Classrooms & Labs */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-blue-700 font-medium">
//               Number of Classrooms:
//             </label>
//             <input
//               type="number"
//               name="numberOfClassrooms"
//               value={formData.numberOfClassrooms}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//               placeholder="100"
//             />
//           </div>
//           <div>
//             <label className="block text-blue-700 font-medium">
//               Number of Labs:
//             </label>
//             <input
//               type="number"
//               name="numberOfLabs"
//               value={formData.numberOfLabs}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//               placeholder="50"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex mt-4 justify-end gap-5">
//           <button
//             type="submit"
//             className="w-30 bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             {isEditing ? "Update" : "Add "}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Infrastructure;



// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";

// function Placement() {
//   const { collegeId } = useParams();
//   const [formData, setFormData] = useState({
//     placementPercentage: 0,
//     topRecruiters: [],
//     highestPackage: 0,
//     internshipOpportunities: false,
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (!collegeId) return;

//     const fetchPlacement = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/college/placement/${collegeId}`);
//         if (response.data && response.data.usrMsg) {
//           const placementData = response.data.usrMsg;
//           setFormData({
//             placementPercentage: placementData.placementPercentage || 0,
//             topRecruiters: placementData.topRecruiters || [],
//             highestPackage: placementData.highestPackage || 0,
//             internshipOpportunities: placementData.internshipOpportunities || false,
//           });
//           setIsEditing(true);
//         }
//       } catch (error) {
//         console.error("Error fetching placement data:", error);
//       }
//     };

//     fetchPlacement();
//   }, [collegeId]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: checked,
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: type === "number" ? parseFloat(value) : value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = isEditing
//         ? `${API_BASE_URL}/api/college/placement/${collegeId}`
//         : `${API_BASE_URL}/api/college/placement/`;

//       const method = isEditing ? "put" : "post";

//       const response = await axios({
//         method,
//         url,
//         data: { collegeId, ...formData },
//       });

//       console.log("Placement details saved successfully:", response.data);
//       alert("Placement details saved!");
//     } catch (error) {
//       console.error("Error saving placement details:", error);
//     }
//   };

//   const handleDelete = () => {
//     const confirmRemove = window.confirm("Are you sure you want to clear the form?");
//     if (!confirmRemove) return;
//     setFormData({
//       placementPercentage: "",
//       topRecruiters: [],
//       highestPackage: "",
//       internshipOpportunities: false,
//     });
//     setIsEditing(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-blue-100 p-6 mt-10 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold text-blue-800 mb-4">
//         {isEditing ? "Edit Placement Details" : "Add Placement Details"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Placement Percentage */}
//         <div>
//           <label className="block text-blue-700 font-medium">Placement Percentage:</label>
//           <input
//             type="number"
//             name="placementPercentage"
//             value={formData.placementPercentage}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//             required
//             placeholder="50"
//           />
//         </div>

//         {/* Highest Package */}
//         <div>
//           <label className="block text-blue-700 font-medium">Highest Package (LPA):</label>
//           <input
//             type="number"
//             name="highestPackage"
//             value={formData.highestPackage}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//             required
//             placeholder="8.2"
//           />
//         </div>

//         {/* Internship Opportunities */}
//         <div>
//           <label className="block text-blue-700 font-medium">Internship Opportunities:</label>
//           <input
//             type="checkbox"
//             name="internshipOpportunities"
//             checked={formData.internshipOpportunities}
//             onChange={handleChange}
//           />
//           <span className="ml-2">Available</span>
//         </div>

//         {/* Top Recruiters */}
//         <div>
//           <label className="block text-blue-700 font-medium">Top Recruiters:</label>
//           <input
//             type="text"
//             name="topRecruiters"
//             value={formData.topRecruiters.join(", ")}
//             onChange={(e) => setFormData({ ...formData, topRecruiters: e.target.value.split(", ") })}
//             className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//             required
//             placeholder="TCS, Infosys"
//           />
//         </div>

//         <div className="flex mt-4 justify-end gap-5">
//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-30 bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             {isEditing ? "Update" : "Add"}
//           </button>
//           <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
//             Delete
//           </button>

//         </div>
//       </form>
//     </div>
//   );
// }

// export default Placement;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const PlacementSchema = Yup.object().shape({
//   placementPercentage: Yup.number()
//     .min(0, "Must be at least 0%")
//     .max(100, "Cannot exceed 100%")
//     .required("Placement Percentage is required"),
//   highestPackage: Yup.number()
//     .min(0, "Must be a positive number")
//     .required("Highest Package is required"),
//   topRecruiters: Yup.string()
//     .required("At least two recruiters are required")
//     .test("is-valid-list", "Enter at least two recruiters, separated by commas", (value) => {
//       return value.split(",").map((r) => r.trim()).filter(Boolean).length >= 2;
//     }),
//   internshipOpportunities: Yup.boolean(),
// });

// function Placement() {
//   const { collegeId } = useParams();
//   const [initialValues, setInitialValues] = useState({
//     placementPercentage: "",
//     highestPackage: "",
//     topRecruiters: "",
//     internshipOpportunities: false,
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (!collegeId) return;

//     const fetchPlacement = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/college/placement/${collegeId}`);
//         if (response.data && response.data.usrMsg) {
//           const placementData = response.data.usrMsg;
//           setInitialValues({
//             placementPercentage: placementData.placementPercentage || "",
//             highestPackage: placementData.highestPackage || "",
//             topRecruiters: placementData.topRecruiters ? placementData.topRecruiters.join(", ") : "",
//             internshipOpportunities: placementData.internshipOpportunities || false,
//           });
//           setIsEditing(true);
//         }
//       } catch (error) {
//         console.error("Error fetching placement data:", error);
//       }
//     };

//     fetchPlacement();
//   }, [collegeId]);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const url = isEditing
//         ? `${API_BASE_URL}/api/college/placement/${collegeId}`
//         : `${API_BASE_URL}/api/college/placement/`;

//       const method = isEditing ? "put" : "post";

//       const response = await axios({
//         method,
//         url,
//         data: {
//           collegeId,
//           ...values,
//           topRecruiters: values.topRecruiters.split(",").map((r) => r.trim()), // Convert to array
//         },
//       });

//       console.log("Placement details saved successfully:", response.data);
//       alert("Placement details saved!");
//     } catch (error) {
//       console.error("Error saving placement details:", error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-blue-100 p-6 mt-10 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold text-blue-800 mb-4">
//         {isEditing ? "Edit Placement Details" : "Add Placement Details"}
//       </h2>

//       <Formik
//         initialValues={initialValues}
//         enableReinitialize
//         validationSchema={PlacementSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form className="space-y-4">
//             {/* Placement Percentage */}
//             <div>
//               <label className="block text-blue-700 font-medium">Placement Percentage:</label>
//               <Field
//                 type="number"
//                 name="placementPercentage"
//                 className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//               />
//               <ErrorMessage name="placementPercentage" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             {/* Highest Package */}
//             <div>
//               <label className="block text-blue-700 font-medium">Highest Package (LPA):</label>
//               <Field
//                 type="number"
//                 name="highestPackage"
//                 className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//               />
//               <ErrorMessage name="highestPackage" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             {/* Internship Opportunities */}
//             <div className="flex items-center">
//               <Field type="checkbox" name="internshipOpportunities" className="mr-2" />
//               <label className="text-blue-700 font-medium">Internship Opportunities Available</label>
//             </div>

//             {/* Top Recruiters */}
//             <div>
//               <label className="block text-blue-700 font-medium">Top Recruiters:</label>
//               <Field
//                 type="text"
//                 name="topRecruiters"
//                 className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//                 placeholder="TCS, Infosys"
//               />
//               <ErrorMessage name="topRecruiters" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             {/* Buttons */}
//             <div className="flex mt-4 justify-end gap-5">
//             <button
//   type="button"
//   onClick={(e, { resetForm }) => resetForm({
//     values: {
//       placementPercentage: "",
//       highestPackage: "",
//       topRecruiters: "",
//       internshipOpportunities: false,
//     }
//   })}
//   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
// >
//   Clear
// </button>

//               {/* <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-30 bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition duration-300"
//               >
//                 {isSubmitting ? "Saving..." : isEditing ? "Update" : "Add"}
//               </button> */}
//               <button
//                 type="reset"
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
//               >
//                 Clear
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default Placement;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import {
//   FaEye,
//   FaEdit,
//   FaPauseCircle,
//   FaPlus,
//   FaBuilding,
//   FaBriefcase,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import InfoCard from "../Component/InfoCard";
// import EditCollegeDetails from "../Component/EditCollegeDetails";
// import Infrastructure from "../Component/Infrastructure";
// import Placement from "../Component/Placement";

// const CollegeTableDetails = () => {
//   const [collegeData, setCollegeData] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [infraModalOpen, setInfraModalOpen] = useState(false);
//   const [placementModalOpen, setPlacementModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     axios
//       .get(`${API_BASE_URL}/api/college/all`)
//       .then((response) => {
//         if (response.data.success) {
//           // const parsedData = JSON.parse();
//           setCollegeData(response.data.data.colleges);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching college data:", error);
//         setLoading(false);
//       });
//   }, []);

//   const navigate = useNavigate();

//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     setEditModalOpen(true);
//   };

//   const handleSaveEdit = (updatedData) => {
//     axios
//       .patch(
//         `${API_BASE_URL}/api/college/update/${updatedData._id}`,
//         updatedData
//       )
//       .then((response) => {
//         if (response.data.success) {
//           setCollegeData((prevData) =>
//             prevData.map((college) =>
//               college._id === updatedData._id ? updatedData : college
//             )
//           );
//           setEditModalOpen(false);
//         } else {
//           alert("Failed to update college details");
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating college data:", error);
//         alert("Error updating college details");
//       });
//   };

//   const columns = [
//     {
//       name: "College Name",
//       selector: (row) => row.collegeName,
//       sortable: true,
//     },
//     {
//       name: "Affiliated University",
//       selector: (row) => row.affiliatedUniversity,
//       sortable: true,
//     },
//     {
//       name: "Location",
//       selector: (row) => `${row.location.lat}, ${row.location.lng}`,
//       sortable: true,
//     },
//     {
//       name: "Address",
//       selector: (row) =>
//         `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`,
//       sortable: true,
//     },
//     { name: "Contact", selector: (row) => row.contactDetails, sortable: true },
//     {
//       name: "Website",
//       selector: (row) =>
//         row.websiteURL ? (
//           <a
//             href={row.websiteURL}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600"
//           >
//             Visit
//           </a>
//         ) : (
//           "N/A"
//         ),
//     },
//     {
//       name: "Established Year",
//       selector: (row) => row.establishedYear,
//       sortable: true,
//     },
//     {
//       name: "Accreditation",
//       selector: (row) => row.accreditation,
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex space-x-2">
//           <button className="text-blue-600" onClick={() => handleEdit(row)}>
//             <FaEdit size={20} />
//           </button>
//           <button
//             className="text-green-600"
//             onClick={() => navigate(`/colleges/courses/${row._id}`)}
//           >
//             <FaPlus size={20} />
//           </button>
//           <button
//             className="text-purple-600"
//             onClick={() => {
//               setSelectedItem(row);
//               setInfraModalOpen(true);
//             }}
//           >
//             <FaBuilding size={20} />
//           </button>
//           <button
//             className="text-orange-600"
//             onClick={() => {
//               setSelectedItem(row);
//               setPlacementModalOpen(true);
//             }}
//           >
//             <FaBriefcase size={20} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <section>
//       <div className="bg-blue-50 py-4 px-2">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-blue-700">College List</h2>
//           <input
//             type="text"
//             placeholder="Search colleges..."
//             className="px-4 py-2 rounded-md border-blue-600 border-2"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <DataTable
//           columns={columns}
//           data={collegeData}
//           pagination
//           highlightOnHover
//           responsive
//           progressPending={loading}
//           progressComponent={<div>Loading...</div>}
//         />
//         {editModalOpen && (
//           <EditCollegeDetails
//             collegeData={selectedItem}
//             onSave={handleSaveEdit}
//             onCancel={() => setEditModalOpen(false)}
//           />
//         )}
//         {infraModalOpen && (
//           <Infrastructure
//             collegeId={selectedItem._id}
//             onClose={() => setInfraModalOpen(false)}
//           />
//         )}
//         {placementModalOpen && (
//           <Placement
//             collegeId={selectedItem._id}
//             onClose={() => setPlacementModalOpen(false)}
//           />
//         )}
//       </div>
//     </section>
//   );
// };

// export default CollegeTableDetails;





// import { Link } from 'react-router-dom';
// import { 
//     HomeIcon, 
//     UsersIcon, 
//     FolderIcon, 
//     CalendarIcon, 
//     InboxIcon, 
//     ChartBarIcon, 
//     OfficeBuildingIcon, 
//     BriefcaseIcon 
// } from '@heroicons/react/outline';

// // Navigation Items
// const navigation = [
//     { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
//     { name: 'Manage Universities & Colleges', href: '/colleges', icon: UsersIcon, current: false },
//     { name: 'Add Details', href: '/add-college', icon: FolderIcon, current: false },
//     { name: 'Excel Data Upload', href: '/upload-excel', icon: CalendarIcon, current: false },
//     { name: 'Reports & Analytics', href: '/reports', icon: InboxIcon, current: false },
//     { name: 'View Profile', href: '/profile', icon: ChartBarIcon, current: false },
//     { name: 'Infrastructure', href: '/infrastructure', icon: OfficeBuildingIcon, current: false },
//     { name: 'Placement', href: '/placement', icon: BriefcaseIcon, current: false },
// ];

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
// }

// const SideMenu = () => {
//     return (
//         <>
//             <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
//                 <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto bg-indigo-700">
//                     <div className="flex items-center flex-shrink-0 px-4">
//                         {/* Logo */}
//                         <img
//                             className="h-10 w-10"
//                             src="https://cdn-icons-png.flaticon.com/128/4345/4345672.png"
//                             alt="Logo"
//                         />
//                     </div>

//                     <nav className="mt-5 flex-1 px-2 space-y-1">
//                         {/* Navigation SideMenu */}
//                         {navigation.map((item) => (
//                             <Link
//                                 key={item.name}
//                                 to={item.href}
//                                 className={classNames(
//                                     item.current
//                                         ? 'bg-indigo-800 text-white'
//                                         : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
//                                     'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
//                                 )}
//                             >
//                                 <item.icon
//                                     className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
//                                     aria-hidden="true"
//                                 />
//                                 {item.name}
//                             </Link>
//                         ))}
//                     </nav>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SideMenu;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import React Router
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query
// import Root from "./Component/Root"; // Import Root component
// import Login from "./Pages/Login"; // Import Login page
// import CollegeTableDetails from "./Pages/CollegeTableDetails"; // Import TableDetails page
// import MultiStepForm from "./Pages/AddNewCollege";
// import UploadExcel from "./Pages/UploadExcel"; // Import UploadExcel page
// import ReportandAnalytics from "./Pages/ReportandAnalytics"; // Import ReportandAnalytics page
// import AdminDashboard from "./Pages/AdminDashboard"; // Import AdminDashboard page
// import ProfilePage from "./Pages/ProfilePage"; // Import ProfilePage
// import CollegeCourses from "./Courses/CollegeCourses"; // Import CollegeCourses page
// import EditCollegeDetails from "../src/Component/EditCollegeDetails";
// import AddUniversity from "./University/AddUniversity";
// import EditUniversity from "./University/EditUniversity"; // Import EditUniversity component

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Root />}>
//             <Route index element={<Login />} /> {/* Default route */}
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="colleges" element={<CollegeTableDetails />} />
//             <Route path="add-college" element={<MultiStepForm />} />
//             <Route path="upload-excel" element={<UploadExcel />} />
//             <Route path="reports" element={<ReportandAnalytics />} />
//             <Route path="profile" element={<ProfilePage />} />
//             <Route path="colleges/courses/:collegeId" element={<CollegeCourses />} />
//             <Route path="collegeCourses" element={<CollegeCourses />} />
//             <Route path="/edit-college/:id" element={<EditCollegeDetails />} />
//             <Route path="university" element={<AddUniversity />} />
//             <Route path="/edit-university/:id" element={<EditUniversity />} />
//           </Route>
//         </Routes>
//       </Router>
//     </QueryClientProvider>
//   );
// }

// export default App;





  // const handleCheckboxChange = (e, field) => {
  //   const { value, checked } = e.target;
  //   formik.setFieldValue(
  //     field,
  //     checked
  //       ? [...formik.values[field], value] // Add value if checked
  //       : formik.values[field].filter((item) => item !== value) // Remove if unchecked
  //   );
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     admissionStartDate: formData.admissionStartDate,
  //     admissionEndDate: formData.admissionEndDate,
  //     lastYearCutoffMarks: parseInt(formData.lastYearCutoffMarks) || 0,
  //     scholarshipsAvailable: formData.scholarshipsAvailable, // Array
  //     quotaSystem: formData.quotaSystem // Array
  //   };

  //   console.log("📢 Final Payload to API:", payload);

  //   axios.post(`${API_BASE_URL}/api/college/create`, payload)
  //     .then(response => {
  //       console.log("✅ College Created Successfully", response.data);
  //       alert("🎉 College Created Successfully!");

  //           // Reset Form After Success
  //     setFormData({
  //       admissionStartDate: "",
  //       admissionEndDate: "",
  //       lastYearCutoffMarks: "",
  //       scholarshipsAvailable: [],
  //       quotaSystem: []
  //     });
  //     })
  //     .catch(error => {
  //       console.error("❌ Error Creating College", error.response?.data || error);
  //       // ❌ Show Error Alert
  //     alert(`❌ Error: ${error.response?.data?.message || "Failed to create college"}`);

  //     });
  // };

  //   const handleSubmit = async (values) => {
  //     // Ensure all required fields are present
  //     const validData = {
  //       name: values.name || "", // Add default values if empty
  //       email_id: values.email_id || "",
  //       Category: values.Category || "General",
  //       collegeType: values.collegeType || "Private",
  //       establishedYear: values.establishedYear || new Date().getFullYear(),
  //       accreditation: values.accreditation || "NAAC A+", // Check allowed values
  //       admissionProcess: values.admissionProcess || "Online",
  //       admissionEntranceDetails: {
  //         lastYearCutoffMarks:
  //           values.admissionEntranceDetails?.lastYearCutoffMarks || 0,
  //         admissionStartDate:
  //           values.admissionEntranceDetails?.admissionStartDate || "",
  //         admissionEndDate:
  //           values.admissionEntranceDetails?.admissionEndDate || "",
  //       },
  //       image: typeof values.image === "string" ? values.image : "", // Ensure it's a string
  //     };

  //     // Check if any required field is empty
  //     if (!validData.email_id || !validData.name || !validData.Category) {
  //       toast.error("Please fill all required fields.");
  //       return;
  //     }
  //     // ✅ Append Gallery Images (if present)
  // if (values.imageGallery && values.imageGallery.length > 0) {
  //   values.imageGallery.forEach((file, index) => {
  //     if (file instanceof File) {
  //       formData.append(`imageGallery`, file); // ✅ Sends multiple images
  //     }
  //   });
  // }

  //     try {
  //       await createCollege(validData);
  //       toast.success("College created successfully!");
  //     } catch (error) {
  //       toast.error("Failed to create college. Check form fields.");
  //       console.error("Submit Error:", error);
  //     }
  //   };

  // const mutation = useMutation({
  //   mutationFn: createCollege,
  //   onMutate: () => {
  //     toast.info("Submitting college details...");
  //   },
  //   onSuccess: () => {
  //     toast.success("College created successfully!");
  //     alert("Successfully saved");
  //     formik.resetForm();
  //     setLocation(defaultLocation);
  //   },
  //   onError: (error) => {
  //     toast.error(error.response?.data?.message || "Submission failed");
  //   },
  // });

  // const searchLocation = (locationName) => {
  //   if (!locationName) {
  //     toast.error("Please enter a location to search");
  //     return;
  //   }