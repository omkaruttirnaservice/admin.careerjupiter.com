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
