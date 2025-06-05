{/* Protected Routes for Vendor-Class */}
            {/* <Route element={<ProtectedRoute roleRequired="VENDOR" />}>
              <Route path="/vendor-class" element={<VendorLayout />}>
                <Route index element={<ClassVendorDashboard />} />
                <Route path="class-dashboard" element={<ClassVendorDashboard />} />
                <Route path="edit-vendor-class" element={<ManageClass />} />
                {/* <Route path="class-faculty" element={<FacultyManagement />} /> */}
            {/* <Route path="class-courses" element={<ClassCourses/>}/> */}
            {/* </Route>
              </Route> */}  
  
  

  // const verifyOtp = async () => {
  //   if (!otp || !referenceId) {
  //     Swal.fire("Error!", "OTP and Reference ID are required.", "error");
  //     return;
  //   }
  
  //   try {
  //     setLoading(true);
  
  //     let endpoint = `${API_BASE_URL}/api/auth/signup?role=ADMIN`;
  
  //     console.log("📌 Trying Admin Signup...");
  
  //     let response = await axios.post(endpoint, {
  //       mobile_no: mobileNo,
  //       reference_id: referenceId,
  //       otp: otp,
  //     });
  
  //     if (response.data.success) {
  //       console.log("✅ Admin Login Success");
  //       Swal.fire("Success!", "Logged in as Admin!", "success").then(()=>{
  //         const { token, userId } = response.data.data || {};
  //         setAuthCookies({ token, role: "ADMIN", userId });
    
  //         window.location.href = "/dashboard";
  //       });
  
       
  //       return;
  //     }
  //   } catch (error) {
  //     console.log("⚠️ Admin Login Failed. Trying Vendor...");
  //   }
  
  //   try {
  //     let vendorEndpoint = `${API_BASE_URL}/api/auth/signup?role=VENDOR&subrole=Class`;
  //     console.log("📌 Trying Vendor Signup...");
  
  //     let vendorResponse = await axios.post(vendorEndpoint, {
  //       mobile_no: mobileNo,
  //       reference_id: referenceId,
  //       otp: otp,
  //     });
  
  //     if (vendorResponse.data.success) {
  //       console.log("✅ Vendor Login Success");
  //       Swal.fire("Success!", "Logged in as Vendor!", "success").then(()=>{
  //         const { token, userId, classId } = vendorResponse.data.data || {};
  //         setAuthCookies({ token, role: "VENDOR", subrole: "Class", userId, classId });
    
  //         window.location.href = "/vendor-class/class-dashboard";
  //       });
  
       
  //       return;
  //     }
  //   } catch (error) {
  //     console.log("❌ Vendor Login Failed.");
  //     Swal.fire("Error!", "Invalid OTP or user not found!", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  
 // const validationSchema = Yup.object({
  //   infrastructure: Yup.array().of(
  //     Yup.object().shape({
  //       campusArea: Yup.string().required("Campus area is required"),
  //       numberOfClassrooms: Yup.number()
  //         .min(1, "Must have at least 1 classroom")
  //         .required("Required"),
  //       numberOfLabs: Yup.number()
  //         .min(1, "Must have at least 1 lab")
  //         .required("Required"),
  //       sportsFacilities: Yup.array().min(1, "Select at least one sports facility"),
  //       hostelAvailability: Yup.boolean().required("Select hostel availability"),
  //       hostelDetails: Yup.string().when("hostelAvailability", {
  //         is: true,
  //         then: (schema) => schema.required("Provide hostel details"),
  //         otherwise: (schema) => schema.notRequired(),
  //       }),
  //       canteenAndFoodServices: Yup.boolean().required("Select canteen availability"),
  //       medicalFacilities: Yup.boolean().required("Select medical facilities"),
  //       transportFacility: Yup.array().min(1, "Select at least one transport option"),
  //       library: Yup.string().required("Library details are required"),
  //     })
  //   ),
  // });

  // const validationSchema = Yup.object({
  //   // infrastructure: Yup.array().of(
  //   //   Yup.object().shape({
  //   //     campusArea: Yup.string().required("Campus area is required"),
  //   //     numberOfClassrooms: Yup.number()
  //   //       .min(1, "Must have at least 1 classroom")
  //   //       .required("Required"),
  //   //     numberOfLabs: Yup.number()
  //   //       .min(1, "Must have at least 1 lab")
  //   //       .required("Required"),
  //   //     sportsFacilities: Yup.array()
  //   //       .min(1, "Select at least one sports facility")
  //   //       .required("Required"),
  //   //     hostelAvailability: Yup.boolean().required(
  //   //       "Select hostel availability"
  //   //     ),
  //   //     hostelDetails: Yup.string().when("hostelAvailability", {
  //   //       is: true,
  //   //       then: (schema) =>
  //   //         schema.required(
  //   //           "Hostel details are required when hostel is available"
  //   //         ),
  //   //     }),
  //   //     canteenAndFoodServices: Yup.boolean().required(
  //   //       "Select canteen availability"
  //   //     ),
  //   //     medicalFacilities: Yup.boolean().required("Select medical facilities"),
  //   //     transportFacility: Yup.array()
  //   //       .min(1, "Select at least one transport option")
  //   //       .required("Required"),
  //   //     library: Yup.string().required("Library details are required"),
  //   //   })
  //   // ),
  // });

// import React, { useState, useEffect } from "react";
// import { Plus, Trash, CheckCheck } from "lucide-react";
// import { motion } from "framer-motion";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl"; 
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { getCookie } from "../Utlis/cookieHelper";

// const CollegeCourses = () => {
//   // const { collegeID } = useParams();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isUpdated, setIsUpdated] = useState(false); // Track if any course is updated
//   const navigate = useNavigate(); // Initialize navigation
// const [collegeId,setCollegeId] = useState(null);
// const [categoryData, setCategoryData] = useState([]);
// const [subCategories, setSubCategories] = useState([]);
// const [selectedCategory, setSelectedCategory] = useState("");
// const [selectedSubCategory, setSelectedSubCategory] = useState("");


//   //  const [collegeID, setCollegeId] = useState(null); // State for storing the collegeId
    
//       // Fetch the collegeId from cookies directly
//       useEffect(() => {
//         const collegeID = getCookie("collegeID"); // Directly fetch collegeId from cookies
//       console.log("/////////////////",collegeID)
//         if (collegeID) {
//           setCollegeId(collegeID); // Set the retrieved collegeId in state
//         } else {
//           console.warn("College ID not found in cookies!"); // Log a warning if no collegeId found
//         }
//       }, []); // Only run this effect once when the component mounts
    
//       useEffect(() => {
//         const fetchCategories = async () => {
//           try {
//             const response = await axios.get(`${API_BASE_URL}/api/college/search`);
//             const categories = response.data.categories || [];
//             setCategoryData(categories);
//           } catch (error) {
//             console.error("Failed to fetch college categories", error);
//           }
//         };
      
//         fetchCategories();
//       }, []);
      
      

//   // Fetch courses from the API on component mount
//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/college/course/${collegeId}`
//         );
  
//         const data = 
//           typeof response.data.data === "string"
//             ? JSON.parse(response.data.data)
//             : response.data.data;
        
//         // Access the nested courses array
//         if (data && data.courses && data.courses[0] && data.courses[0].courses) {
//           setCourses(data.courses[0].courses); // Now you are accessing the correct array
//           console.log("Courses Data:", data.courses[0].courses); // Check if both courses are fetched
//         } else {
//           setCourses([]);
//         }
//       } catch (err) {
//         setError("Failed to fetch courses.");
//         console.error("Error fetching courses:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, [collegeId]);
  

//   console.log("//////////",collegeId);

//   // Add an empty course when the "Add Course" button is clicked
//   const addCourse = () => {
//     setCourses([
//       ...courses,
//       {
//         courses: [
//           {
//             name: "",
//             duration: "",
//             annualFees: "",
//             category: "",
//             subCategories: [],
//             eligibility: "",
//           },
//         ],
//       },
//     ]);
//     setIsUpdated(true); // Mark as updated when new course is added
//   };

//   // Remove the course by its index and delete it from the API
//   // Remove the course by its id and delete it from the API
//   // const removeCourse = async (courseId) => {
//   //   try {
//   //     setLoading(true);
//   //     await axios.delete(`${API_BASE_URL}/api/college/course/${collegeId}/${courseId}`);
//   //     setCourses(courses.filter((course) => course.id !== courseId)); // Remove the course from the state
//   //     alert("Course deleted successfully!");
//   //     setIsUpdated(true); // Mark as updated when course is removed
//   //   } catch (err) {
//   //     setError("Failed to delete the course. Please check the console for more details.");
//   //     console.error("Error deleting course:", err.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // Remove the course by its index
//   const removeCourse = (courseIndex) => {
//     const updatedCourses = [...courses];
//     updatedCourses.splice(courseIndex, 1); // Remove the course at the specified index
//     setCourses(updatedCourses); // Update the state
//     setIsUpdated(true); // Mark as updated
//   };

//   // Update the course field on change
//   // const handleChange = (e, courseIndex, field) => {
//   //   const { name, value } = e.target;
//   //   const updatedCourses = [...courses];
//   //   updatedCourses[courseIndex].courses[0][name] = value; // Update the course at the dynamic index
//   //   setCourses(updatedCourses);
//   //   setIsUpdated(true); // Mark as updated when any field is changed
//   // };

//   const handleChange = (e, courseIndex, field) => {
//     const updatedCourses = [...courses];
//     updatedCourses[courseIndex][field] = e.target.value; // Update the correct course field
//     setCourses(updatedCourses); // Update state
//   };
  

//   // Save the course data
//   // const saveCourses = async () => {
//   //   if (loading) return;
//   //   setLoading(true);
//   //   setError(null);

//   //   // Validate that all courses have the required fields
//   //   const validCourses = courses.filter((course) => {
//   //     return (
//   //       course.courses[0].name &&
//   //       course.courses[0].duration &&
//   //       course.courses[0].annualFees
//   //     );
//   //   });

//   //   if (validCourses.length === 0) {
//   //     setError("All fields (name, duration, and annual fees) are required.");
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   const courseData = {
//   //     collegeID,
//   //     courses: validCourses.map((course) => ({
//   //       name: course.courses[0].name,
//   //       duration: Number(course.courses[0].duration), // Ensure duration is a number
//   //       annualFees: Number(course.courses[0].annualFees), // Ensure annualFees is a number
//   //       category: course.courses[0].category,
//   //       eligibility: course.courses[0].eligibility,
//   //     })),
//   //   };

//   //   try {
//   //     const response = await axios.post(
//   //       `${API_BASE_URL}/api/college/course/create`,
//   //       courseData,
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     if (response.data.success) {
//   //       alert("Courses saved successfully!");
//   //       setCourses([]); // Clear the courses after successful save
//   //     } else {
//   //       setError("Failed to save courses: " + response.data.message);
//   //     }
//   //   } catch (error) {
//   //     setError(error.message);
//   //     console.error(
//   //       "Error saving courses:",
//   //       error.response ? error.response.data : error.message
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   const saveCourses = async () => {
//     if (loading) return;
//     setLoading(true);
//     setError(null);
  
//     // Validate that all courses have the required fields
//     const validCourses = courses.filter((course) => {
//       return (
//         course.name &&
//         course.duration &&
//         course.annualFees
//       );
//     });
  
//     if (validCourses.length === 0) {
//       setError("All fields (name, duration, and annual fees) are required.");
//       setLoading(false);
//       return;
//     }
  
//     const courseData = {
//       collegeId,
//       courses: validCourses.map((course) => ({
//         name: course.name,
//         duration: Number(course.duration),
//         annualFees: Number(course.annualFees),
//         category: course.category,
//         subCategory: course.subCategory, 
//         eligibility: course.eligibility,
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
  
//       if (response.data.success) {
//         alert("Courses saved successfully!");
//         setCourses([]); // Clear the courses after successful save
//       } else {
//         setError("Failed to save courses: " + response.data.message);
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error("Error saving courses:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Update courses if any changes are made
//   // const updateCourses = async () => {
//   //   if (loading) return;
//   //   setLoading(true);
//   //   setError(null);

//   //   const courseData = {
//   //     collegeID,
//   //     courses: courses.map((course) => ({
//   //       name: course.courses[0].name,
//   //       duration: Number(course.courses[0].duration),
//   //       annualFees: Number(course.courses[0].annualFees),
//   //       category: course.courses[0].category,
//   //       eligibility: course.courses[0].eligibility,
//   //     })),
//   //   };

//   //   try {
//   //     const response = await axios.put(
//   //       `${API_BASE_URL}/api/college/course/${collegeID}`,
//   //       courseData,
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     if (response.data.success) {
//   //       alert("Courses updated successfully!");
//   //     } else {
//   //       setError("Failed to update courses.");
//   //     }
//   //   } catch (error) {
//   //     setError(error.message);
//   //     console.error(
//   //       "Error updating courses:",
//   //       error.response ? error.response.data : error.message
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   const updateCourses = async () => {
//     if (loading) return;
//     setLoading(true);
//     setError(null);
  
//     const courseData = {
//       collegeId,
//       courses: courses.map((course) => ({
//         name: course.name,
//         duration: Number(course.duration),
//         annualFees: Number(course.annualFees),
//         category: course.category,
//         subCategory: course.subCategory, 
//         eligibility: course.eligibility,
//       })),
//     };
  
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
//         alert("Courses updated successfully!");
//       } else {
//         setError("Failed to update courses.");
//       }
//     } catch (error) {
//       setError(error.message);
//       console.error("Error updating courses:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <section className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 max-w-6xl mx-auto relative">
//       {/* Close Button (X) */}
//       <button
//         onClick={() => navigate("/colleges")} // Navigate to CollegeTableDetails page
//         className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
//       >
//         &times; {/* Unicode 'X' symbol */}
//       </button>  
  
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-3xl font-bold text-blue-800 flex items-center">📚 Add Courses</h3>
//       </div>
  
//       {error && (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}
  
//       <div className="space-y-6">
//         {courses.map((course, courseIndex) => (
//           <motion.div
//             key={courseIndex}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Course Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={course.name || ""}
//                   onChange={(e) => handleChange(e, courseIndex, "name")}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Duration</label>
//                 <input
//                   type="text"
//                   name="duration"
//                   value={course.duration || ""}
//                   onChange={(e) => handleChange(e, courseIndex, "duration")}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                 />
//               </div>
//             </div>
  
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Annual Fees</label>
//                 <input
//                   type="text"
//                   name="annualFees"
//                   value={course.annualFees || ""}
//                   onChange={(e) => handleChange(e, courseIndex, "annualFees")}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                 />
//               </div>
//               <div className="mb-4 w-full">
//   <label className="block text-blue-800 font-semibold mb-2">
//     College Streams
//   </label>
//   <select
//     value={selectedCategory}
//     onChange={(e) => {
//       const selected = e.target.value;
//       setSelectedCategory(selected);

//       const selectedCategory = categoryData.find(
//         (item) => item.category === selected
//       );

//       // Set related subcategories dynamically
//       const subCats = selectedCategory?.subCategory?.filter(Boolean) || [];
//       setSubCategories(subCats); // Update subcategories state
//       setSelectedSubCategory(""); // Reset subcategory
//     }}
//     className="w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none transition-all border-gray-300 focus:ring-2 focus:ring-blue-400"
//   >
//     <option value="" disabled>
//       Select Category
//     </option>
//     {categoryData.map((item, index) => (
//       <option key={index} value={item.category}>
//         {item.category}
//       </option>
//     ))}
//   </select>
// </div>


// <div className="mb-3">
//   <label className="block text-blue-800 font-semibold mb-2">
//     Branch
//   </label>
//   <select
//     value={selectedSubCategory}
//     onChange={(e) => setSelectedSubCategory(e.target.value)}
//     className="w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none transition-all border-gray-300 focus:ring-2 focus:ring-blue-400"
//   >
//     <option value="" disabled>
//       Select SubCategory
//     </option>
//     {subCategories.map((sub, index) => (
//       <option key={index} value={sub}>
//         {sub}
//       </option>
//     ))}
//   </select>
// </div>

//             </div>
  
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Eligibility</label>
//                 <input
//                   type="text"
//                   name="eligibility"
//                   value={course.eligibility || ""}
//                   onChange={(e) => handleChange(e, courseIndex, "eligibility")}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                 />
//               </div>
//             </div>
  
//             <div>
//               <button
//                 onClick={() => removeCourse(courseIndex)} // Pass courseIndex to removeCourse
//                 className="flex items-center bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 cursor-pointer"
//               >
//                 <Trash className="mr-2" size={20} /> Remove Course
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
  
//       <div className="mt-6 flex justify-between">
//   <button
//     onClick={addCourse}
//     className="flex items-center bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer"
//   >
//     <Plus className="mr-2" size={20} /> Add Course
//   </button>

//   {isUpdated ? (
//     <button
//       onClick={updateCourses}
//       className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-green-600 hover:bg-green-800 text-white"
//     >
//       ✅ Update Course
//     </button>
//   ) : (
//     <button
//       onClick={updateCourses}
//       className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-blue-500 hover:bg-blue-700 text-white"
//     >
//       💾 Save Course
//     </button>
//   )}
// </div>

//     </section>
//   );
  
// };

// export default CollegeCourses;



// import React, { useState, useEffect } from "react";
// import { Plus, Trash } from "lucide-react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl"; 
// import { useNavigate } from "react-router-dom"; 
// import { getCookie } from "../Utlis/cookieHelper";
// import Swal from "sweetalert2";

// const CollegeCourses = () => {
//   const [courses, setCourses] = useState([]); // flat array of course objects
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isUpdated, setIsUpdated] = useState(false);
//   const navigate = useNavigate();
//   const [collegeId, setCollegeId] = useState(null);
//   const [categoryData, setCategoryData] = useState([]); // all categories from API

//   // Fetch collegeId from cookie
//   useEffect(() => {
//     const id = getCookie("collegeID");
//     console.log("Fetched collegeId:", id);
//     if (id) {
//       setCollegeId(id);
//     } else {
//       console.warn("College ID not found in cookies!");
//     }
//   }, []);

//   // Fetch categories from API (one time)
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/college/search`);
//         const cats = response.data.categories || [];
//         setCategoryData(cats);
//       } catch (error) {
//         console.error("Failed to fetch college categories", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch courses from the API using collegeId
//   useEffect(() => {
//     if (!collegeId) return;
//     const fetchCourses = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/college/course/${collegeId}`);
//         const data = typeof response.data.data === "string"
//           ? JSON.parse(response.data.data)
//           : response.data.data;
        
//         if (data && data.courses && data.courses[0] && Array.isArray(data.courses[0].courses)) {
//           const fetchedCourses = data.courses[0].courses.map(course => {
//             const cat = categoryData.find(item => item.category === course.category);
//             return { 
//               ...course, 
//               availableSubCategories: cat && cat.subCategory ? cat.subCategory.filter(Boolean) : [] 
//             };
//           });
//           setCourses(fetchedCourses);
//           console.log("Courses Data:", fetchedCourses);
//         } else {
//           setCourses([]);
//         }
//       } catch (err) {
//         setError("Failed to fetch courses.");
//         console.error("Error fetching courses:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, [collegeId, categoryData]); // re-run if collegeId or categoryData changes

//   // Add a new course with flat structure
//   const addCourse = () => {
//     setCourses(prev => [
//       ...prev,
//       {
//         name: "",
//         duration: "",
//         annualFees: "",
//         category: "",
//         subCategory: "",
//         eligibility: "",
//         availableSubCategories: []
//       }
//     ]);
//     setIsUpdated(true);
//   };

//   // Remove a course by index
//   const removeCourse = (index) => {
//     setCourses(prev => prev.filter((_, i) => i !== index));
//     setIsUpdated(true);
//   };

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/college/course/${collegeId}`);
//       if (res.data.success) {
//         setCourses(res.data.data.courses); // Or however the data structure is
//         setIsUpdated(true);
//       }
//     } catch (error) {
//       console.error("Failed to fetch courses:", error);
//     }
//   };
  

//   // Handle input changes for any field in the course object
//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     setCourses(prev => {
//       const updated = [...prev];
//       updated[index][name] = value;
//       // If the category changes, update availableSubCategories for that course
//       if(name === "category") {
//         const catObj = categoryData.find(item => item.category === value);
//         updated[index].availableSubCategories = catObj && catObj.subCategory 
//           ? catObj.subCategory.filter(Boolean)
//           : [];
//         // reset subCategory if category changes
//         updated[index].subCategory = "";
//       }
//       return updated;
//     });
//     setIsUpdated(true);
//   };

//   // Save courses using POST API
//   const saveCourses = async () => {
//     if (loading) return;
//     setLoading(true);
//     setError(null);

//     const validCourses = courses.filter(course =>
//       course.name && course.duration && course.annualFees && course.category
//     );
    
//     if (validCourses.length === 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "All fields (name, duration, annual fees, category) are required.",
//       });
//       // setError("All fields (name, duration, annual fees, category) are required.");
//       setLoading(false);
//       return;
//     }

//     const courseData = {
//       collegeId,
//       courses: validCourses.map(course => ({
//         name: course.name,
//         duration: Number(course.duration),
//         annualFees: Number(course.annualFees),
//         category: course.category,
//         subCategory: course.subCategory || "",
//         eligibility: course.eligibility
//       }))
//     };

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/college/course/create`,
//         courseData,
//         { headers: { "Content-Type": "application/json" } }
//       );
  
//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Courses Saved!",
//           text: "All courses have been saved successfully.",
//           confirmButtonColor: "#3085d6",
//           background: "#f9f9f9",
//         }).then(() => {
//           fetchCourses();     // Refresh courses
//           setCourses([]);     // Clear form
//         });
//         // alert("Courses saved successfully!");
//         // fetchCourses(); // ✅ Refetch to update UI
//         // setCourses([]); // Clear courses after save
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Failed to Save",
//           text: response.data.message || "Please Try Again",
//         });
//         // setError("Failed to save courses: " + response.data.message);
//       }
//     } catch (error) {
//       // setError(error.message);
//       Swal.fire({
//         icon: "warning",
//         title: "Error Occurred",
//         text: error.response?.data?.message || error.message || "Unknown error",
//       });
//       console.error("Error saving courses:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update courses using PUT API
//   const updateCourses = async () => {
//     if (loading) return;
//     setLoading(true);
//     setError(null);
  
//     const courseData = {
//       collegeId,
//       courses: courses.map(course => ({
//         name: course.name,
//         duration: Number(course.duration),
//         annualFees: Number(course.annualFees),
//         category: course.category,
//         subCategory: course.subCategory || "",
//         eligibility: course.eligibility,
//       }))
//     };
  
//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}/api/college/course/${collegeId}`,
//         courseData,
//         { headers: { "Content-Type": "application/json" } }
//       );
  
//       if (response.data.success) {
//         // alert("Courses updated successfully!");
//         Swal.fire({
//           icon: "success",
//           title: "Courses Updated!",
//           text: "The course list has been updated.",
//           confirmButtonColor: "#3085d6",
//           background: "#f9f9f9",
//         });
//       } else {
//         // setError("Failed to update courses.");
//         Swal.fire({
//           icon: "warning",
//           title: "Update Failed",
//           text: response.data.message || "Unable to update courses.",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "warning",
//         title: "Error Occurred",
//         text: error.response?.data?.message || error.message || "Unknown error",
//       });
//       // setError(error.message);
//       console.error("Error updating courses:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 max-w-6xl mx-auto relative">
//       {/* Close Button */}
//       {/* <button
//         onClick={() => navigate("/colleges")}
//         className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
//       >
//         &times;
//       </button> */}
  
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-3xl font-bold text-blue-800 flex items-center">📚 Add Courses</h3>
//       </div>
  
//       {/* {error && (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )} */}
  
//       <div className="space-y-6">
//         {courses.map((course, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4"
//           >
//             {/* Row for Course Name & Duration */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Course Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={course.name}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Duration</label>
//                 <input
//                   type="text"
//                   name="duration"
//                   value={course.duration}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                 />
//               </div>
//             </div>
  
//             {/* Row for Annual Fees and Category */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Annual Fees</label>
//                 <input
//                   type="text"
//                   name="annualFees"
//                   value={course.annualFees}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Category</label>
//                 <select
//                   name="category"
//                   value={course.category}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                 >
//                   <option value="">Select Category</option>
//                   {categoryData.map((item, i) => (
//                     <option key={i} value={item.category}>
//                       {item.category}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
  
//             {/* Row for Subcategory (Branch) */}
//             <div className="mb-4 w-full">
//               <label className="block text-blue-800 font-semibold mb-2">
//                 Branch
//               </label>
//               <select
//                 name="subCategory"
//                 value={course.subCategory}
//                 onChange={(e) => handleChange(e, index)}
//                 className="w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none transition-all border-gray-300 focus:ring-2 focus:ring-blue-400"
//               >
//                 <option value="" disabled>
//                   Select SubCategory
//                 </option>
//                 {(course.availableSubCategories || []).map((sub, i) => (
//                   <option key={i} value={sub}>
//                     {sub}
//                   </option>
//                 ))}
//               </select>
//             </div>
  
//             {/* Row for Eligibility */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Eligibility</label>
//                 <input
//                   type="text"
//                   name="eligibility"
//                   value={course.eligibility}
//                   onChange={(e) => handleChange(e, index)}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                 />
//               </div>
//             </div>
  
//             {/* Remove Course Button */}
//             <div>
//               <button
//                 onClick={() => removeCourse(index)}
//                 className="flex items-center bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 cursor-pointer"
//               >
//                 <Trash className="mr-2" size={20} /> Remove Course
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
  
//       {/* Add / Save / Update Buttons */}
//       <div className="mt-6 flex justify-between">
//   {/* Add Course Button */}
//   <button
//     onClick={addCourse}
//     className="flex items-center bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer"
//   >
//     <Plus className="mr-2" size={20} /> Add Course
//   </button>

//   <div className="flex gap-4">
//     {/* Save Button */}
//     <button
//       onClick={saveCourses}
//       className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-green-600 hover:bg-green-800 text-white cursor-pointer"
//     >
//       ✅ Save Course
//     </button>

//     {/* Update Button */}
//     <button
//       onClick={updateCourses}
//       className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer"
//     >
//       💾 Update Course
//     </button>
//   </div>
// </div>

//     </section>
//   );
// };

// export default CollegeCourses;
//  for COllege Courses 

// university Id set
// const universityID = getCookie("universityID");
// console.log("University ID:", universityID);


// IQ Test hadling excel error 

  // const handleExcelUpload = (event, setFieldValue) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setFileName(file.name);
  //     setFieldValue("excelFile", file);

  //     const reader = new FileReader();
  //     reader.readAsArrayBuffer(file);
  //     reader.onload = (e) => {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: "array" });
  //       const sheetName = workbook.SheetNames[0];
  //       const sheet = workbook.Sheets[sheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(sheet);

  //       if (jsonData.length === 0) {
  //         Swal.fire({
  //           icon: "warning",
  //           title: "Empty File",
  //           text: "The uploaded file contains no data. Please check and try again.",
  //           confirmButtonColor: "#f0ad4e",
  //         }).then(() => {
  //           setSelectedQuestions([]);
  //         });
  //       } else {
  //         let error = false;
  //         jsonData.some((question, index) => {
  //           if (question.question === undefined) {
  //             showWarnInQuestionUpload(index, "Main Question");
  //             error = true;
  //             return true;
  //           }

  //           if (question.optionA === undefined) {
  //             showWarnInQuestionUpload(index, "Option A");
  //             error = true;
  //             return true;
  //           }

  //           if (question.optionB === undefined) {
  //             showWarnInQuestionUpload(index, "Option B");
  //             error = true;
  //             return true;
  //           }

  //           if (question.optionC === undefined) {
  //             error = true;
  //             showWarnInQuestionUpload(index, "Option C");
  //             return true;
  //           }

  //           if (question.optionD === undefined) {
  //             error = true;
  //             showWarnInQuestionUpload(index, "Option D");
  //             return true;
  //           }

  //           if (question.marks === undefined) {
  //             error = true;
  //             showWarnInQuestionUpload(index, "Marks");
  //             return true;
  //           }

  //           if (question.chapterName === undefined) {
  //             error = true;
  //             showWarnInQuestionUpload(index, "Chapter Name");
  //             return true;
  //           }

  //           return false;
  //         });
  //         if (error === false) {
  //           Swal.fire({
  //             icon: "success",
  //             title: `${jsonData.length} Question Found.`,
  //             text: "All Question are perfect. Good to Go.",
  //             confirmButtonColor: "#28a745",
  //           }).then(() => {
  //             setSelectedQuestions(jsonData);
  //           });
  //         } else {
  //           fileRef.current.value = "";
  //           setSelectedQuestions([]);
  //         }
  //       }
  //     };
  //   }
  // };


  // import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl";
// import {
//   FaUniversity,
//   FaPhone,
//   FaInfoCircle,
//   FaCalendarAlt,
//   FaTags,
//   FaGlobe,
//   FaLayerGroup,
//   FaGraduationCap,
// } from "react-icons/fa";
// import { HiAcademicCap } from "react-icons/hi";
// import { getCookie } from "../utlis/cookieHelper";

// // const CollegeVendorDashboard = () => {

// const CollegeVendorDashboard = () => {
//     const [collegeDetails, setCollegeDetails] = useState(null);
//     const [collegeID, setCollegeID] = useState(null); // State for storing the collegeId

//     // Fetch the collegeId from cookies directly
//     useEffect(() => {
//       const collegeID = getCookie("collegeID"); // Directly fetch collegeId from cookies
//     console.log("/////////////////",collegeID)
//       if (collegeID) {
//         setCollegeID(collegeID); // Set the retrieved collegeId in state
//       } else {
//         console.warn("College ID not found in cookies!"); // Log a warning if no collegeId found
//       }
//     }, []); // Only run this effect once when the component mounts

//     console.log("**********",collegeID)
//     // Fetch college details when collegeID changes
//     useEffect(() => {
//       const fetchCollegeDetails = async () => {
//         if (!collegeID) return; // If collegeID is not available, do nothing

//         try {
//           const response = await axios.get(`${API_BASE_URL}/api/college/${collegeID}`);

//           const data = response?.data?.data?.college;
//           setCollegeDetails({
//             ...data,
//             address: Array.isArray(data?.address) ? data.address[0] : {},
//             imageGallery: Array.isArray(data?.imageGallery) ? data.imageGallery : [],
//             description: data?.info?.description || "No description available",
//           });
//         } catch (error) {
//           console.error("Error fetching college details:", error?.response?.data || error.message);
//         }
//       };

//       fetchCollegeDetails();
//     }, [collegeID]); // Re-fetch data whenever collegeID changes

// //   useEffect(() => {
// //     const storedCollegeId = getCookie("collegeID");
// //     if (storedCollegeId) {
// //       setCollegeID(storedCollegeId);
// //     } else {
// //       console.warn("College ID not found in cookies!");
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const fetchCollegeDetails = async () => {
// //       if (!collegeID) return;

// //       try {
// //         const response = await axios.get(`${API_BASE_URL}/api/college/${collegeID}`);

// //         console.log("**************",collegeID)
// //         const data = response.data?.data?.college;

// //         setCollegeDetails({
// //           ...data,
// //           address: Array.isArray(data?.address) ? data.address[0] : {},
// //           imageGallery: Array.isArray(data?.imageGallery) ? data.imageGallery : [],
// //           description: data?.info?.description || "No description available",
// //         });
// //       } catch (error) {
// //         console.error("Error fetching college details:", error?.response?.data || error.message);
// //       }
// //     };

// //     fetchCollegeDetails();
// //   }, [collegeID]);

//   return (
//     <div className="flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen p-4">
//       {/* Header */}
//       <div className="relative bg-gradient-to-br from-white/80 to-indigo-100/90 backdrop-blur-lg shadow-2xl p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 mb-8">
//         <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-xl">
//           <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[3px] animate-pulse" />
//           <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full bg-indigo-600">
//             <HiAcademicCap className="text-white text-5xl" />
//           </div>
//         </div>
//         <div className="text-center sm:text-left">
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
//             Welcome, <span className="text-indigo-600">{collegeDetails?.collegeName || "College Vendor"}</span> 👋
//           </h2>
//           <p className="text-lg text-gray-700 font-semibold">{collegeDetails?.affiliatedUniversity || "Affiliation"}</p>
//         </div>
//       </div>

//       {/* Info Grid */}
//       <div className="bg-white/80 shadow-xl p-4 rounded-2xl">
//         <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
//           <FaInfoCircle className="text-pink-500" /> College Details
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {[
//             {
//               title: "College Name",
//               value: collegeDetails?.collegeName,
//               icon: <FaUniversity className="text-blue-600 text-3xl" />,
//               bg: "from-blue-100 to-blue-200",
//             },
//             {
//               title: "Affiliated University",
//               value: collegeDetails?.affiliatedUniversity,
//               icon: <FaGraduationCap className="text-green-600 text-3xl" />,
//               bg: "from-green-100 to-green-200",
//             },
//             // {
//             //   title: "Contact Details",
//             //   value: collegeDetails?.contactDetails,
//             //   icon: <FaPhone className="text-purple-600 text-3xl" />,
//             //   bg: "from-orange-100 to-orange-200",
//             // },
//             {
//               title: "Established Year",
//               value: collegeDetails?.establishedYear,
//               icon: <FaCalendarAlt className="text-pink-600 text-3xl" />,
//               bg: "from-pink-100 to-pink-200",
//             },
//             {
//               title: "Website",
//               value: collegeDetails?.websiteURL,
//               icon: <FaGlobe className="text-indigo-600 text-3xl" />,
//               bg: "from-indigo-100 to-indigo-200",
//             },
//             {
//               title: "Keywords",
//               value:
//                 collegeDetails?.keywords?.length > 0
//                   ? collegeDetails.keywords.join(", ")
//                   : "N/A",
//               icon: <FaTags className="text-yellow-600 text-3xl" />,
//               bg: "from-yellow-100 to-yellow-200",
//             },
//             // {
//             //   title: "Category",
//             //   value:
//             //     collegeDetails?.category?.length > 0
//             //       ? collegeDetails.category.join(", ")
//             //       : "N/A",
//             //   icon: <FaLayerGroup className="text-rose-600 text-3xl" />,
//             //   bg: "from-rose-100 to-rose-200",
//             // },
//             {
//               title: "Entrance Exams",
//               value:
//                 collegeDetails?.entrance_exam_required?.length > 0
//                   ? collegeDetails.entrance_exam_required.join(", ")
//                   : "N/A",
//               icon: <FaGraduationCap className="text-teal-600 text-3xl" />,
//               bg: "from-teal-100 to-teal-200",
//             },
//           ].map((info, idx) => (
//             <div
//               key={idx}
//               className={`group bg-gradient-to-br ${info.bg} p-6 rounded-xl shadow-md flex items-start gap-4 hover:scale-105 transition duration-300`}
//             >
//               {info.icon}
//               <div>
//                 <h4 className="text-md font-bold text-gray-800">{info.title}</h4>
//                 <p className="text-gray-700 text-sm break-words">{info.value || "N/A"}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Description */}
//         <div className="bg-gradient-to-br from-fuchsia-100 to-violet-200 p-6 rounded-xl shadow-md mb-6">
//           <h4 className="text-md font-bold mb-2 text-violet-800 flex items-center gap-2">
//             <FaInfoCircle /> College Description
//           </h4>
//           <p className="text-gray-800 text-sm">{collegeDetails?.description}</p>
//         </div>

//         {/* Image Section */}
//         <div>
//           <h4 className="text-md font-bold text-gray-800 mb-4">College Image</h4>
//           {collegeDetails?.image ? (
//             <div className="relative group overflow-hidden rounded-xl shadow-md border-4 border-indigo-300 w-full sm:w-96">
//               <img
//                 src={`${API_BASE_URL}${collegeDetails.image}`}
//                 alt="College"
//                 className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
//               />
//             </div>
//           ) : (
//             <p className="text-gray-500 italic">No image available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollegeVendorDashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl";
// import {
//   FaUniversity,
//   FaPhone,
//   FaInfoCircle,
//   FaCalendarAlt,
//   FaTags,
//   FaGlobe,
//   FaLayerGroup,
//   FaGraduationCap,
//   FaTimes,
// } from "react-icons/fa";
// import { HiAcademicCap } from "react-icons/hi";
// import { getCookie } from "../utlis/cookieHelper";

// const tabs = [
//   { id: "basic", label: "Basic Info" },
//   { id: "keywords", label: "Keywords" },
//   { id: "exams", label: "Entrance Exams" },
// ];

// const CollegeVendorDashboard = () => {
//   const [collegeDetails, setCollegeDetails] = useState(null);
//   const [collegeID, setCollegeID] = useState(null);
//   const [activeTab, setActiveTab] = useState("basic");
//   const [lightboxIndex, setLightboxIndex] = useState(null);
//   //  const { college, courses, infrastructure, placements } = data;
//   const [readMore, setReadMore] = useState(false);

//   useEffect(() => {
//     const id = getCookie("collegeID");
//     if (id) setCollegeID(id);
//     else console.warn("College ID not found in cookies!");
//   }, []);

//   useEffect(() => {
//     if (!collegeID) return;

//     const fetchCollegeDetails = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/college/${collegeID}`);
//         const data = res.data?.data?.college;

//         setCollegeDetails({
//           ...data,
//           address: Array.isArray(data?.address) ? data.address[0] : {},
//           imageGallery: Array.isArray(data?.imageGallery) ? data.imageGallery : [],
//           description: data?.info?.description || "No description available",
//         });
//       } catch (error) {
//         console.error("Error fetching college details:", error?.response?.data || error.message);
//       }
//     };

//     fetchCollegeDetails();
//   }, [collegeID]);

//   if (!collegeDetails) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-indigo-600 font-semibold text-xl">
//         Loading College Details...
//       </div>
//     );
//   }

//   const { collegeName, affiliatedUniversity, establishedYear, websiteURL, keywords, entrance_exam_required, description, imageGallery } = collegeDetails;

//   return (
//     <div className="max-w-7xl mx-auto p-6 font-sans text-gray-800">
//       {/* Header/Hero */}
//       <div className="relative rounded-lg overflow-hidden shadow-lg mb-8">
//         <img
//           src={collegeDetails.image}
//           alt={collegeDetails.collegeName}
//           className="w-full h-60 object-cover"
//         />
//         <img
//           src={collegeDetails.logo}
//           alt="Logo"
//           className="absolute bottom-0 left-6 w-24 h-24 rounded-full border-4 border-white shadow-md -mb-12"
//         />
//       </div>
//       <div className="ml-32 mb-6">
//         <h1 className="text-4xl font-bold">{collegeDetails.collegeName}</h1>
//         <div className="flex space-x-3 mt-2">
//           <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//             {collegeDetails.category}
//           </span>
//           <span className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
//             Affiliated: {collegeDetails.affiliatedUniversity}
//           </span>
//         </div>
//       </div>

//       {/* Description */}
//       <p className="mb-4 max-w-3xl text-gray-700">
//         {readMore
//           ? collegeDetails.info.description
//           : collegeDetails.info.description.slice(0, 150) + '...'}
//         <button
//           onClick={() => setReadMore(!readMore)}
//           className="ml-2 text-blue-600 font-semibold underline hover:text-blue-800"
//         >
//           {readMore ? 'Show Less' : 'Read More'}
//         </button>
//       </p>

//       {/* Contact & Website Buttons */}
//       <div className="flex space-x-4 mb-12">
//         <a
//           href={`tel:${collegeDetails.contactDetails}`}
//           className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700"
//         >
//           Call: {collegeDetails.contactDetails}
//         </a>
//         <a
//           href={collegeDetails.websiteURL}
//           target="_blank"
//           rel="noreferrer"
//           className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700"
//         >
//           Visit Website
//         </a>
//         <a
//           href={`mailto:${collegeDetails.email_id}`}
//           className="bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-800"
//         >
//           Email Principal
//         </a>
//       </div>

//       {/* Key Info Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
//         <InfoCard title="Established" value={collegeDetails.establishedYear} icon="🎓" />
//         <InfoCard title="Accreditation" value={collegeDetails.accreditation} icon="🏅" />
//         <InfoCard title="Type" value={collegeDetails.collegeType} icon="🏛️" />
//         <InfoCard
//           title="Entrance Exams"
//           value={collegeDetails.entrance_exam_required.join(', ')}
//           icon="📝"
//         />
//         <InfoCard title="Category" value={collegeDetails.category} icon="📚" />
//       </div>

//       {/* Courses Section */}
//       {/* <section className="mb-12">
//         <h2 className="text-3xl font-semibold mb-6 border-b-2 border-blue-600 inline-block">
//           Courses Offered
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {courses[0].courses.map((course) => (
//             <CourseCard key={course._id} course={course} />
//           ))}
//         </div>
//       </section> */}

//       {/* Infrastructure */}
//       {/* <section className="mb-12">
//         <h2 className="text-3xl font-semibold mb-6 border-b-2 border-blue-600 inline-block">
//           Infrastructure
//         </h2>
//         <InfrastructureCard infrastructure={infrastructure.infrastructure[0]} />
//       </section> */}

//       {/* Placements */}
//       {/* <section className="mb-12">
//         <h2 className="text-3xl font-semibold mb-6 border-b-2 border-blue-600 inline-block">
//           Placements
//         </h2>
//         <PlacementCard placement={placements[0].placement[0]} />
//       </section> */}

//       {/* Address */}
//       {/* <section className="mb-12 max-w-3xl mx-auto">
//         <h2 className="text-3xl font-semibold mb-6 border-b-2 border-blue-600 inline-block">
//           Address & Contact
//         </h2>
//         <AddressCard address={collegeDetails.address[0]} />
//       </section> */}
//     </div>
//   );
// }

// function InfoCard({ title, value, icon }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
//       <div className="text-3xl">{icon}</div>
//       <div>
//         <h4 className="text-gray-500 text-sm">{title}</h4>
//         <p className="font-semibold text-lg">{value}</p>
//       </div>
//     </div>
//   );
// }

// function CourseCard({ course }) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//       <h3 className="text-xl font-bold mb-1">{course.name}</h3>
//       <div className="mb-2">
//         {course.subCategory.map((sc) => (
//           <span
//             key={sc}
//             className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2 text-xs font-semibold"
//           >
//             {sc}
//           </span>
//         ))}
//       </div>
//       <p className="mb-1">
//         <strong>Duration:</strong> {course.duration} years
//       </p>
//       <p className="mb-1">
//         <strong>Eligibility:</strong> {course.eligibility}
//       </p>
//       <p className="mb-1 font-semibold text-green-700">
//         Fees: ₹{(course.annualFees / 100000).toLocaleString()} Lakhs/year
//       </p>
//     </div>
//   );
// }

// function InfrastructureCard({ infrastructure }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//       <IconInfo icon="📚" title="Library" value={infrastructure.library.size} />
//       <IconInfo icon="🏫" title="Classrooms" value={infrastructure.numberOfClassrooms} />
//       <IconInfo icon="🔬" title="Labs" value={infrastructure.numberOfLabs} />
//       <IconInfo icon="🏅" title="Sports" value={infrastructure.sportsFacilities.join(', ')} />
//       <IconInfo icon="🏠" title="Hostel" value={infrastructure.hostelAvailability ? 'Available' : 'No'} />
//       <IconInfo icon="🍽️" title="Canteen" value={infrastructure.canteenAndFoodServices ? 'Yes' : 'No'} />
//       <IconInfo icon="🏥" title="Medical" value={infrastructure.medicalFacilities ? 'Yes' : 'No'} />
//       <IconInfo icon="🚌" title="Transport" value={infrastructure.transportFacility.join(', ')} />
//     </div>
//   );
// }

// function IconInfo({ icon, title, value }) {
//   return (
//     <div className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-blue-50 transition-colors">
//       <div className="text-2xl">{icon}</div>
//       <div>
//         <h5 className="font-semibold text-gray-600">{title}</h5>
//         <p className="text-gray-700">{value}</p>
//       </div>
//     </div>
//   );
// }

// function PlacementCard({ placement }) {
//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row md:items-center md:space-x-12">
//       <div className="text-center md:text-left mb-6 md:mb-0">
//         <h3 className="text-4xl font-bold text-green-600">{placement.placementPercentage}%</h3>
//         <p className="text-gray-500 font-semibold">Placement Rate</p>
//       </div>
//       <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Stat label="Top Recruiters" value={placement.topRecruiters} />
//         <Stat label="Highest Package (LPA)" value={placement.highestPackage} />
//         <Stat label="Internships" value={placement.internshipOpportunities ? 'Available' : 'Not Available'} />
//         <Stat label="Students Placed" value={placement.noOfStudents} />
//       </div>
//     </div>
//   );
// }

// function Stat({ label, value }) {
//   return (
//     <div>
//       <p className="font-semibold text-gray-700">{label}</p>
//       <p className="text-lg">{value}</p>
//     </div>
//   );
// }

// function AddressCard({ address }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <p className="mb-1 font-semibold">{address.line1}</p>
//       <p className="mb-1">{address.line2}</p>
//       <p className="mb-1">
//         {address.dist}, {address.taluka}, {address.state} - {address.pincode}
//       </p>
//       <p className="mb-1">Landmark: {address.nearbyLandmarks}</p>
//       <p className="mb-1">
//         Authorized Person: {address.autorizedName} ({address.designation})
//       </p>
//       <p>Phone: {address.autorizedPhono}</p>
//     </div>
//   );

// };

// export default CollegeVendorDashboard;

//college Vendot Dashboard cards



  // return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 md:p-3">
//       {/* ✅ Main Content */}
//       <div className="flex-1 flex justify-center">
//         <div className="flex flex-col md:flex-row min-h-screen md:p-4 relative bg-gradient-to-br from-blue-100 to-blue-300 overflow-hidden">
//           <div className="w-screen lg:w-[1100px] mx-auto bg-white shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border border-blue-500 rounded-xl">
//             {role === "ADMIN" && (
//               <button
//                 onClick={() => navigate("/colleges")}
//                 className="absolute top-7 right-9 text-red-600 hover:text-red-800 text-3xl font-bold cursor-pointer"
//               >
//                 &times;
//                 {/* <FiLogOut /> */}
//               </button>
//             )}

//             {/* ✅ Form Title */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md text-center rounded-xl">
//               <h2 className="text-2xl md:text-4xl font-bold">
//                 Update College Details
//               </h2>
//             </div>

//             {/* ✅ Form */}
//             <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
//                 {/* 🔹 Basic Details */}

//                 <InputField
//                   label="College Name"
//                   type="text"
//                   name="collegeName"
//                   formik={formik}
//                 />
//                 <InputField
//                   label="Affiliated University"
//                   name="affiliatedUniversity"
//                   type="text"
//                   placeholder="Enter University"
//                   formik={formik}
//                 />

//                 <SingleSelectDropdown
//                   label="College Type"
//                   name="collegeType"
//                   options={collegeTypes}
//                   formik={formik}
//                   placeholder="Select a College Type"
//                 />

//                 <div className="mb-4 w-full">
//                   <label className="block text-blue-800 font-semibold mb-2">
//                     College Category
//                   </label>
//                   <select
//                     name="category"
//                     value={formik.values.category}
//                     onChange={(e) => {
//                       const selected = e.target.value;
//                       formik.setFieldValue("category", selected);

//                       const selectedCategory = categoryData.find(
//                         (item) => item.category === selected
//                       );

//                       formik.setFieldValue("subCategory", []); // Reset subcategory
//                       setSubCategories(selectedCategory?.subCategory || []);

//                       formik.setFieldValue("entrance_exam_required", []); // Reset subcategory
//                       setEntranceExams(
//                         selectedCategory?.entrance_exam_required || []
//                       );
//                     }}
//                     className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none transition-all ${
//                       formik.touched.category && formik.errors.category
//                         ? "border-red-500 focus:ring-2 focus:ring-red-300"
//                         : "border-gray-300 focus:ring-2 focus:ring-blue-400"
//                     }`}
//                   >
//                     <option value="">Select Category</option>
//                     {categoryData.map((item, index) => (
//                       <option key={index} value={item.category}>
//                         {item.category}
//                       </option>
//                     ))}
//                   </select>

//                   {formik.touched.category && formik.errors.category && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {formik.errors.category}
//                     </p>
//                   )}
//                 </div>

//                 <div className="mb-3">
//                   <MultiSelectDropdown
//                     label="Branch"
//                     name="subCategory"
//                     options={subCategories}
//                     formik={formik}
//                   />

//                   <OtherField
//                     watchValue={formik.values.subCategory} // 👈 should match MultiSelectDropdown field
//                     triggerValue={["Other", "Others"]}
//                     onChange={(val) =>
//                       formik.setFieldValue("subCategoryOther", val)
//                     }
//                     name="subCategoryOther"
//                     error={formik.errors.subCategoryOther}
//                     touched={formik.touched.subCategoryOther}
//                   />
//                 </div>

//                 <InputField
//                   label="Year Established"
//                   type="number"
//                   name="establishedYear"
//                   formik={formik}
//                 />
//                 <InputField
//                   label="Website URL"
//                   type="text"
//                   name="websiteURL"
//                   formik={formik}
//                 />

//                 <MultiSelectField
//                   label="Keywords (Max 5)"
//                   name="keywords"
//                   formik={formik}
//                 />

//                 <div className="mb-3">
//                   <SingleSelectDropdown
//                     label="Accreditation"
//                     name="accreditation"
//                     options={accreditationOptions}
//                     formik={formik}
//                     placeholder="Select an Accreditation"
//                   />
//                   <OtherField
//                     watchValue={formik.values.accreditation} // 👈 should match MultiSelectDropdown field
//                     triggerValue={["Other", "Others"]}
//                     onChange={(val) =>
//                       formik.setFieldValue("accreditationOther", val)
//                     }
//                     name="accreditationOther"
//                     error={formik.errors.accreditationOther}
//                     touched={formik.touched.accreditationOther}
//                   />
//                 </div>

//                 <MultiSelectDropdown
//                   label="Entrance Exams Required"
//                   name="entrance_exam_required"
//                   options={entranceExams}
//                   formik={formik}
//                 />
//               </div>

//               {/* Address array */}
//               {formik.values.address.map((addr, index) => {
//                 const isEditing = editingIndex === index;

//                 return (
//                   <div
//                     key={index}
//                     className="p-6 mb-6 rounded-2xl shadow-xl bg-white border border-gray-200"
//                   >
//                     {/* If editing, show input form */}
//                     {isEditing ? (
//                       <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 mb-6">
//                         {/* Header */}
//                         <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2 rounded-md">
//                           <h3 className="text-white text-lg font-semibold">
//                             ✏ Editing Address {index + 1}
//                           </h3>
//                         </div>

//                         {/* Form Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           {[...formFields].map((field, idx) => (
//                             <div key={idx}>
//                               <label className="block text-sm font-semibold text-blue-800 mb-2">
//                                 {field.label}
//                               </label>
//                               <input
//                                 type="text"
//                                 name={`address[${index}].${field.name}`}
//                                 placeholder={field.placeholder}
//                                 value={addr[field.name]}
//                                 onChange={formik.handleChange}
//                                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                               />
//                               {formik.errors.address?.[index]?.[field.name] && (
//                                 <div className="text-red-500 text-sm mt-1">
//                                   {formik.errors.address[index][field.name]}
//                                 </div>
//                               )}
//                             </div>
//                           ))}
//                         </div>

//                         {/* Cancel Button */}
//                         <div className="mt-8 text-center justify-end flex gap-2">
//                           <button
//                             onClick={() => setEditingIndex(null)}
//                             className="text-white bg-green-500 hover:bg-green-600 transition px-6 py-2 text-sm font-medium rounded-md flex gap-2 cursor-pointer"
//                            type="button" // ✅ Prevent unintended submission
//                           >
//                             <span className="mt-1">
//                               <MdDone />
//                             </span>{" "}
//                             Done
//                           </button>

//                           <button
//                             onClick={() => setEditingIndex(null)}
//                             className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition flex gap-2 cursor-pointer"
//                            type="button" // ✅ Prevent unintended submission
//                           >
//                             <span className="mt-1">
//                               <FaWindowClose />
//                             </span>{" "}
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div
//                         key={index}
//                         className="relative bg-white border border-blue-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300 col-span-full"
//                       >
//                         <div className="space-y-1 text-gray-800 text-sm">
//                           <p className="font-medium">
//                             🏠 {addr.line1}, {addr.line2}
//                           </p>
//                           {addr.nearbyLandmarks && (
//                             <p>📍 Nearby: {addr.nearbyLandmarks}</p>
//                           )}
//                           <p>
//                             🗺️ {addr.taluka}, {addr.dist}, {addr.state} -{" "}
//                             {addr.pincode}
//                           </p>
//                           <p className="text-gray-600 text-xs mt-1">
//                             👤 {addr.autorizedName}{" "}
//                             {addr.designation && (
//                               <span className="ml-1 italic text-gray-500">
//                                 ({addr.designation})
//                               </span>
//                             )}{" "}
//                             &nbsp; 📞 {addr.autorizedPhono}
//                           </p>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex justify-end gap-3 mt-4">
//                           {/* Edit Button */}
//                           <button
//                             type="button"
//                             onClick={() => setEditingIndex(index)}
//                             className="bg-yellow-500 text-white text-xs px-4 py-1.5 rounded-md shadow-sm hover:bg-yellow-600 transition flex items-center gap-1 cursor-pointer"
//                           >
//                             ✏️ Edit
//                           </button>

//                           {/* Delete Button */}
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const updated = [...formik.values.address];
//                               updated.splice(index, 1);
//                               formik.setFieldValue("address", updated);
//                               if (editingIndex === index) setEditingIndex(null);
//                             }}
//                             className="bg-red-500 text-white text-xs px-4 py-1.5 rounded-md shadow-sm hover:bg-red-600 transition flex items-center gap-1 cursor-pointer"
//                           >
//                             🗑️ Remove
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}

//               {/* Add new address */}
//               <button
//                 type="button"
//                 onClick={() => setShowAddressModal(true)}
//                 className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 cursor-pointer"
//               >
//                 ➕ Add Address
//               </button>

//               <div className="mt-6">
//                 <h3 className="text-lg font-bold text-gray-800">
//                   College Banner Cover Image (JPG/JPEG/PNG)
//                 </h3>

//                 <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-4">
//                   {previewImage || formik.values.image ? (
//                     <img
//                       src={
//                         previewImage
//                           ? previewImage
//                           : typeof formik.values.image === "string"
//                           ? `${API_BASE_URL}${formik.values.image}`
//                           : ""
//                       }
//                       alt="College"
//                       className="relative w-80 h-40 object-cover rounded-lg shadow-md overflow-hidden before:absolute before:top-0 before:left-[-100%] 
//           before:w-full before:h-full before:bg-white before:opacity-20 before:rotate-6 before:transition-all hover:before:left-full mb-2"
//                     />
//                   ) : (
//                     <p className="text-gray-500 italic">No image available</p>
//                   )}
//                 </div>

//                 <div className="w-100">
//                   <FileUpload
//                     label="College Banner Cover Image (JPG/JPEG/PNG)"
//                     name="image"
//                     formik={formik}
//                   />
//                 </div>
//               </div>

//               {/* ✅ Submit Button */}
//               {/* <button
//                 type="submit"
//                 className="px-8 py-3 rounded-md shadow text-lg text-white font-semibold  transition bg-gradient-to-r from-blue-600 to-indigo-600  mt-6 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700  duration-300"
//               >
//                 Update Details
//               </button> */}

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   onClick={formik.handleSubmit}
//                   disabled={
//                     !(formik.isValid && formik.dirty) || formik.isSubmitting
//                   }
//                   // className="bg-indigo-600 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition cursor-pointer"
//                   className={`px-8 py-3 rounded-md shadow text-lg text-white font-semibold  transition ${
//                     formik.isValid && formik.dirty
//                       ? "bg-indigo-600 hover:bg-blue-700 cursor-pointer"
//                       : "bg-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   {formik.isSubmitting ? "Updating..." : "Update College"}
//                 </button>
//               </div>
//             </form>
//           </div>
//           <CollegeAddressModal
//             open={showAddressModal}
//             onClose={() => setShowAddressModal(false)}
//             onSave={(newAddress) => {
//               formik.setFieldValue("address", [
//                 ...(formik.values.address || []),
//                 newAddress,
//               ]);
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
  // Update college form 