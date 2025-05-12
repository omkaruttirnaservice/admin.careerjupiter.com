// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useFormik } from "formik"; // ✅ Import Formik
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { getCookie } from "../Utlis/cookieHelper";

// function Placement() {
//   const defaultValues = {
//     placementPercentage: "",
//     highestPackage: "",
//     internshipOpportunities: false,
//     topRecruiters: [],
//   };

//   const formik = useFormik({
//     initialValues: defaultValues,  });

//   // const { collegeId } = useParams();
//   const [initialValues, setInitialValues] = useState(defaultValues);
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate(); // Initialize navigation
//   const [collegeId, setCollegeId] = useState(null);


//   useEffect(() => {
//     const collegeId = getCookie("collegeID"); // Directly fetch collegeId from cookies
//   console.log("/////////////////",collegeId)
//     if (collegeId) {
//       setCollegeId(collegeId); // Set the retrieved collegeId in state
//     } else {
//       console.warn("College ID not found in cookies!"); // Log a warning if no collegeId found
//     }
//   }, []); // Only run this effect once when the component mounts

//   console.log("**********",collegeId)

//   //Validation Schema using Yup
//   const validationSchema = Yup.object().shape({
//     placementPercentage: Yup.number()
//       .min(1, "Required")
//       .max(100, "Cannot exceed 100")
//       .required("Placement percentage is required"),
//     highestPackage: Yup.number()
//       .min(1, "Required")
//       .typeError("Highest package must be a number")
//       .required("Highest package is required"),
//     topRecruiters: Yup.array()
//       .of(Yup.string().required("Recruiter name cannot be empty"))
//       .min(1, "At least one recruiter is required")
//       .required("Top recruiters are required"),
//   });

//   // Fetch Placement Data
//   useEffect(() => {
//     if (!collegeId) return;

//     const fetchPlacement = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/college/placement/${collegeId}`
//         );
//         if (response.data && response.data.data) {
//           const placementData = response.data.data;
//           setInitialValues({
//             placementPercentage: String(
//               placementData.placementPercentage || ""
//             ),
//             highestPackage: String(placementData.highestPackage || ""),
//             topRecruiters: Array.isArray(placementData.topRecruiters)
//             ? placementData.topRecruiters
//             : [], // ✅ Ensure it's always an array
//             internshipOpportunities:
//               placementData.internshipOpportunities || false,
//           });
//           setIsEditing(true);
//         }
//       } catch (error) {
//         console.error("Error fetching placement data:", error);
//       }
//     };

//     fetchPlacement();
//   }, [collegeId]);

//   //  Handle Submit
//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const url = isEditing
//         ? `${API_BASE_URL}/api/college/placement/${collegeId}`
//         : `${API_BASE_URL}/api/college/placement/`;
//       const method = isEditing ? "put" : "post";

//       await axios({
//         method,
//         url,
//         data: {
//           collegeId,
//           ...values,
//           topRecruiters: values.topRecruiters.filter((item) => item.trim() !== ""), // ✅ Ensure it's a valid array
//         },
//       });

//       console.log("Placement details saved successfully.");
//       alert("Placement details saved!");
//     } catch (error) {
//       console.error(
//         "Error saving placement details:",
//         error.response?.data || error.message
//       );
//       alert("Failed to save placement details.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (resetForm) => {
//     if (!collegeId) {
//       alert("College ID is missing!");
//       return;
//     }
  
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this placement data?"
//     );
//     if (!confirmDelete) return;
  
//     try {
//       // No API call needed, just clearing the form
//       alert("Placement details deleted!");
  
//       // Clear form using Formik
//    resetForm();
  
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error deleting placement details:", error);
//       alert("Failed to delete placement details.");
//     }
//   };
  

//   return (
//     <div className="flex justify-center">
//     <div className="relative w-[90%] max-w-[1200px] mx-auto bg-blue-100 p-6 mt-10 rounded-lg shadow-lg">
//        {/* Close Button (X) */}
//     <button
//       onClick={() => navigate("/colleges")}
//       className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-xl font-bold cursor-pointer"
//     >
//       &times; {/* Unicode 'X' symbol */}
//     </button>
    
//       <h2 className="text-2xl font-semibold text-blue-800 mb-4">
//         {isEditing ? "Edit Placement Details" : "Add Placement Details"}
//       </h2>

//       {/* Formik Form */}
//       <Formik
//         initialValues={initialValues}
//         enableReinitialize
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, resetForm }) => (
//           <Form className="space-y-4">
//             {/* Placement Percentage */}
//             <div>
//               <label className="block text-blue-700 font-medium">
//                 Placement Percentage:
//               </label>
//               <Field
//                 type="number"
//                 name="placementPercentage"
//                 className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//                 placeholder="0"
//               />
//               <ErrorMessage
//                 name="placementPercentage"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>

//             {/* Highest Package */}
//             <div>
//               <label className="block text-blue-700 font-medium">
//                 Highest Package (LPA):
//               </label>
//               <Field
//                 type="number"
//                 name="highestPackage"
//                 className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//                 placeholder="eg. 8.2"
//               />
//               <ErrorMessage
//                 name="highestPackage"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>

//             {/* Internship Opportunities */}
//             <div>
//               <label className="block text-blue-700 font-medium">
//                 Internship Opportunities:
//               </label>
//               <Field 
//               type="checkbox" 
//               name="internshipOpportunities" />
//               <span className="ml-2">Available</span>
//             </div>

//             {/* Top Recruiters */}
//             <div>
//               <label className="block text-blue-700 font-medium">
//                 Top Recruiters:
//               </label>
//               <Field name="topRecruiters">
//                   {({ field, form }) => (
//                     <input
//                       type="text"
//                       value={field.value.join(", ")} // ✅ Convert array to a comma-separated string
//                       onChange={(e) => {
//                         const recruitersArray = e.target.value.split(",").map((item) => item.trim());
//                         form.setFieldValue("topRecruiters", recruitersArray); // ✅ Update as an array
//                       }}
//                       className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
//                       placeholder="eg. Infosys, TCS, Bosch"
//                     />
//                   )}
//                 </Field>
//                 <ErrorMessage name="topRecruiters" component="div" className="text-red-500 text-sm" />
//             </div>

//             {/* Buttons */}
//             <div className="flex mt-4 justify-end gap-5">
//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-30 bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
//               >
//                 {isSubmitting ? "Saving..." : isEditing ? "Update" : "Add"}
//               </button>

//               {/* Clear Button (Resets Form) */}
//               {/* <button
//                 type="button"
//                 onClick={() => handleDelete(resetForm) }
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer"
//               >
//                 Clear
//               </button> */}
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//     </div>
//   );
// }

// export default Placement;


// import React, { useState, useEffect } from "react";
// import { Plus, Trash } from "lucide-react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import { useNavigate } from "react-router-dom";
// import { getCookie } from "../Utlis/cookieHelper";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// const Placement = () => {
//   const defaultPlacement = {
//     placementPercentage: "",
//     highestPackage: "",
//     internshipOpportunities: false,
//     topRecruiters: [],
//   };

//   const [placements, setPlacements] = useState([{ ...defaultPlacement }]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [collegeId, setCollegeId] = useState(null);

//   // Validation Schema
//   // const validationSchema = Yup.object().shape({
//   //   placementPercentage: Yup.number()
//   //     .min(1, "Required")
//   //     .max(100, "Cannot exceed 100")
//   //     .required("Placement percentage is required"),
//   //   highestPackage: Yup.number()
//   //     .min(1, "Required")
//   //     .required("Highest package is required"),
//   //   topRecruiters: Yup.array()
//   //     .of(Yup.string().required("Recruiter name cannot be empty"))
//   //     .min(1, "At least one recruiter is required"),
//   // });

//   const validationSchema = Yup.object().shape({
//     placements: Yup.array().of(
//       Yup.object().shape({
//         placementPercentage: Yup.number()
//           .min(1, "Min 1%")
//           .max(100, "Max 100%")
//           .required("Required"),
//         highestPackage: Yup.number()
//           .min(1, "Min 1 LPA")
//           .required("Required"),
//         topRecruiters: Yup.array()
//           .of(Yup.string().required("Recruiter name cannot be empty"))
//           .min(1, "At least one recruiter is required"),
//         internshipOpportunities: Yup.boolean(),
//       })
//     ),
//   });
  

//   // Fetch collegeId from cookie
//   useEffect(() => {
//     const id = getCookie("collegeID");
//     if (id) {
//       setCollegeId(id);
//     } else {
//       console.warn("College ID not found in cookies!");
//     }
//   }, []);

//   // Fetch placements data
//   // useEffect(() => {
//   //   if (!collegeId) return;

//   //   const fetchPlacements = async () => {
//   //     setLoading(true);
//   //     try {
//   //       const response = await axios.get(
//   //         `${API_BASE_URL}/api/college/placement/${collegeId}`
//   //       );
//   //       if (response.data?.data) {
//   //         const placementData = response.data.data;
//   //         console.log("*****************",placementData);
//   //         setPlacements([{
//   //           placementPercentage: String(placementData.placementPercentage || ""),
//   //           highestPackage: String(placementData.highestPackage || ""),
//   //           topRecruiters: Array.isArray(placementData.topRecruiters)
//   //             ? placementData.topRecruiters
//   //             : [],
//   //           internshipOpportunities: placementData.internshipOpportunities || false,
//   //         }]);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching placement data:", error);
//   //       setError("Failed to fetch placement data");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchPlacements();
//   // }, [collegeId]);

//   useEffect(() => {
//     if (!collegeId) return;
  
//     const fetchPlacements = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/college/placement/${collegeId}`
//         );
//         if (response.data?.data) {
//           const placementData = response.data.data;
//           console.log("*****************", placementData);
//           setPlacements([
//             {
//               placementPercentage: placementData.placementPercentage?.toString() || "",
//               highestPackage: placementData.highestPackage?.toString() || "",
//               topRecruiters: Array.isArray(placementData.topRecruiters)
//                 ? placementData.topRecruiters
//                 : [],
//               internshipOpportunities: Boolean(placementData.internshipOpportunities),
//             },
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching placement data:", error);
//         setError("Failed to fetch placement data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchPlacements();
//   }, [collegeId]);
  

//   // Add new placement
//   const addPlacement = () => {
//     // setPlacements([...placements, { ...defaultPlacement }]);
//     setFieldValue("placements", [...values.placements, defaultPlacement]);

//   };

//   // Remove placement by index
//   const removePlacement = (index) => {
//     if (placements.length <= 1) {
//       alert("You must have at least one placement entry");
//       return;
//     }
//     setPlacements(placements.filter((_, i) => i !== index));
//   };

//   // Handle form submission
//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Validate all placements
//       try {
//         await validationSchema.validate(values, { abortEarly: false });
//       } catch (validationError) {
//         setError(validationError.errors.join(", "));
//         return;
//       }

//       const url = placements.length > 0 && placements[0].placementPercentage
//         ? `${API_BASE_URL}/api/college/placement/${collegeId}`
//         : `${API_BASE_URL}/api/college/placement`;
      
//       const method = placements.length > 0 && placements[0].placementPercentage ? "put" : "post";

//       await axios({
//         method,
//         url,
//         // data: {
//         //   collegeId,
//         //   ...values,
//         //   topRecruiters: values.topRecruiters.filter(item => item.trim() !== "")
//         // }

//         data: {
//           collegeId,
//           placements: values.placements
//         }
        
//       });

//       alert("Placement details saved successfully!");
//     } catch (error) {
//       console.error("Error saving placement:", error);
//       setError(error.response?.data?.message || "Failed to save placement details");
//     } finally {
//       setLoading(false);
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 max-w-6xl mx-auto relative">
//       {/* Close Button */}
//       <button
//         onClick={() => navigate("/colleges")}
//         className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
//       >
//         &times;
//       </button>

//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-3xl font-bold text-blue-800 flex items-center">📊 Placement Details</h3>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       <Formik
//       initialValues={{ placements }}

//         // initialValues={placements.length > 0 ? placements[0] : defaultPlacement}
//         enableReinitialize
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, setFieldValue, isSubmitting }) => (
//           <Form className="space-y-6">
//             {placements.map((placement, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4"
//               >
//                 {/* Placement Percentage */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="flex flex-col">
//                     <label className="text-blue-700">Placement Percentage</label>
//                     <Field
//                       type="number"
//                       name={`placements[${index}].placementPercentage`}
//                       className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                       placeholder="0-100"
//                     />
//                     <ErrorMessage
//                       name="placementPercentage"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>

//                   {/* Highest Package */}
//                   <div className="flex flex-col">
//                     <label className="text-blue-700">Highest Package (LPA)</label>
//                     <Field
//                       type="number"
//                       // name="highestPackage"
//                       name={`placements[${index}].highestPackage`}
//                       className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                       placeholder="eg. 8.2"
//                     />
//                     <ErrorMessage
//                       name="highestPackage"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                 </div>

//                 {/* Internship Opportunities */}
//                 <div className="flex items-center">
//                   <Field
//                     type="checkbox"
//                     // name="internshipOpportunities"
//                     name={`placements[${index}].internshipOpportunities`}
//                     className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                   <label className="ml-2 text-blue-700">Internship Opportunities Available</label>
//                 </div>

//                 {/* Top Recruiters */}
//                 <div className="flex flex-col">
//                   <label className="text-blue-700">Top Recruiters (comma separated)</label>
//                   <Field name={`placements[${index}].topRecruiters`}>
//                     {({ field }) => (
//                       <input
//                         type="text"
//                         value={field.value.join(", ")}
//                         onChange={(e) => {
//                           const recruitersArray = e.target.value
//                             .split(",")
//                             .map(item => item.trim())
//                             .filter(item => item !== "");
//                           setFieldValue("topRecruiters", recruitersArray);
//                         }}
//                         className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                         placeholder="eg. Infosys, TCS, Bosch"
//                       />
//                     )}
//                   </Field>
//                   <ErrorMessage
//                     name="topRecruiters"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 {/* Remove Button */}
//                 {placements.length > 1 && (
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() => removePlacement(index)}
//                       className="flex items-center bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 cursor-pointer"
//                     >
//                       <Trash className="mr-2" size={20} /> Remove Placement
//                     </button>
//                   </div>
//                 )}
//               </motion.div>
//             ))}

//             {/* Action Buttons */}
//             <div className="mt-6 flex justify-between">
//               <button
//                 type="button"
//                 onClick={addPlacement}
//                 className="flex items-center bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer"
//               >
//                 <Plus className="mr-2" size={20} /> Add Placement
//               </button>

//               <button
//                 type="submit"
//                 disabled={isSubmitting || loading}
//                 className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-green-600 hover:bg-green-800 text-white disabled:bg-gray-400"
//               >
//                 {isSubmitting || loading ? "Saving..." : "💾 Save Placement"}
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </section>
//   );
// }

// export default Placement;

// import React, { useState, useEffect } from "react";
// import { Plus, Trash } from "lucide-react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import { useNavigate } from "react-router-dom";
// import { getCookie } from "../Utlis/cookieHelper";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// const Placement = () => {
//   const defaultPlacement = {
//     placementPercentage: "",
//     highestPackage: "",
//     internshipOpportunities: false,
//     topRecruiters: [],
//   };

//   const [placements, setPlacements] = useState([{ ...defaultPlacement }]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [collegeId, setCollegeId] = useState(null);

//   const validationSchema = Yup.object().shape({
//     placements: Yup.array().of(
//       Yup.object().shape({
//         placementPercentage: Yup.number()
//           .min(1, "Min 1%")
//           .max(100, "Max 100%")
//           .required("Required"),
//         highestPackage: Yup.number()
//           .min(1, "Min 1 LPA")
//           .required("Required"),
//         topRecruiters: Yup.array()
//           .of(Yup.string().required("Recruiter name cannot be empty"))
//           .min(1, "At least one recruiter is required"),
//         internshipOpportunities: Yup.boolean(),
//       })
//     ),
//   });

//   useEffect(() => {
//     const id = getCookie("collegeID");
//     if (id) {
//       setCollegeId(id);
//     } else {
//       console.warn("College ID not found in cookies!");
//     }
//   }, []);

//   useEffect(() => {
//     if (!collegeId) return;
  
//     const fetchPlacements = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/college/placement/${collegeId}`
//         );
//         if (response.data?.data) {
//           // const placementData = response.data.data;
//           const placementData =  response.data.data.newPlacement?.placement;;


//           console.log("Placement Data*****",placementData);
//           setPlacements([
//             {
//               placementPercentage: placementData.placementPercentage?.toString() || "",
//               highestPackage: placementData.highestPackage?.toString() || "",
//               topRecruiters: Array.isArray(placementData.topRecruiters)
//                 ? placementData.topRecruiters
//                 : [],
//               internshipOpportunities: Boolean(placementData.internshipOpportunities),
//             },
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching placement data:", error);
//         setError("Failed to fetch placement data");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchPlacements();
//   }, [collegeId]);

//   const addPlacement = () => {
//     setPlacements([...placements, { ...defaultPlacement }]);
//   };

//   const removePlacement = (index) => {
//     if (placements.length <= 1) {
//       alert("You must have at least one placement entry");
//       return;
//     }
//     setPlacements(placements.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const isUpdate = values.placements[0]?.placementPercentage;
//       const url = isUpdate
//         ? `${API_BASE_URL}/api/college/placement/${collegeId}`
//         : `${API_BASE_URL}/api/college/placement`;
//       const method = isUpdate ? "put" : "post";
      
//       // const url = placements.length > 0 && placements[0].placementPercentage
//       //   ? `${API_BASE_URL}/api/college/placement/${collegeId}`
//       //   : `${API_BASE_URL}/api/college/placement`;
      
//       // const method = placements.length > 0 && placements[0].placementPercentage ? "put" : "post";

//       await axios({
//         method,
//         url,
//         data: {
//           collegeId,
//           placementPercentage: values.placements[0].placementPercentage,
//           highestPackage: values.placements[0].highestPackage,
//           topRecruiters: values.placements[0].topRecruiters.filter(item => item.trim() !== ""),
//           internshipOpportunities: values.placements[0].internshipOpportunities
//         }
//       });

//       alert("Placement details saved successfully!");
//     } catch (error) {
//       console.error("Error saving placement:", error);
//       setError(error.response?.data?.message || "Failed to save placement details");
//     } finally {
//       setLoading(false);
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 max-w-6xl mx-auto relative">
//       <button
//         onClick={() => navigate("/colleges")}
//         className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
//       >
//         &times;
//       </button>

//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-3xl font-bold text-blue-800 flex items-center">📊 Placement Details</h3>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       <Formik
//         initialValues={{ placements }}
//         enableReinitialize
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, setFieldValue, isSubmitting }) => (
//           <Form className="space-y-6">
//             {values.placements.map((placement, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4"
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="flex flex-col">
//                     <label className="text-blue-700">Placement Percentage</label>
//                     <Field
//                       type="number"
//                       name={`placements.${index}.placementPercentage`}
//                       className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                       placeholder="0-100"
//                     />
//                     <ErrorMessage
//                       name={`placements.${index}.placementPercentage`}
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="text-blue-700">Highest Package (LPA)</label>
//                     <Field
//                       type="number"
//                       name={`placements.${index}.highestPackage`}
//                       className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                       placeholder="eg. 8.2"
//                     />
//                     <ErrorMessage
//                       name={`placements.${index}.highestPackage`}
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-center">
//                   <Field
//                     type="checkbox"
//                     name={`placements.${index}.internshipOpportunities`}
//                     className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                   <label className="ml-2 text-blue-700">Internship Opportunities Available</label>
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-blue-700">Top Recruiters (comma separated)</label>
//                   <Field
//                     name={`placements.${index}.topRecruiters`}
//                   >
//                     {({ field, form }) => (
//                       <input
//                         type="text"
//                         value={field.value.join(", ")}
//                         onChange={(e) => {
//                           const recruitersArray = e.target.value
//                             .split(",")
//                             .map(item => item.trim())
//                             .filter(item => item !== "");
//                           form.setFieldValue(`placements.${index}.topRecruiters`, recruitersArray);
//                         }}
//                         className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                         placeholder="eg. Infosys, TCS, Bosch"
//                       />
//                     )}
//                   </Field>
//                   <ErrorMessage
//                     name={`placements.${index}.topRecruiters`}
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 {values.placements.length > 1 && (
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() => removePlacement(index)}
//                       className="flex items-center bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 cursor-pointer"
//                     >
//                       <Trash className="mr-2" size={20} /> Remove Placement
//                     </button>
//                   </div>
//                 )}
//               </motion.div>
//             ))}

//             <div className="mt-6 flex justify-between">
//               <button
//                 type="button"
//                 onClick={addPlacement}
//                 className="flex items-center bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer"
//               >
//                 <Plus className="mr-2" size={20} /> Add Placement
//               </button>

//               <button
//                 type="submit"
//                 disabled={isSubmitting || loading}
//                 className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-green-600 hover:bg-green-800 text-white disabled:bg-gray-400"
//               >
//                 {isSubmitting || loading ? "Saving..." : "💾 Save Placement"}
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </section>
//   );
// }

// export default Placement;

import React, { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../Utlis/cookieHelper";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

const Placement = () => {
  const defaultPlacement = {
    placementPercentage: "",
    highestPackage: "",
    internshipOpportunities: false,
    topRecruiters: [],
  };
 const { collegeId: collegeIdFromParams } = useParams();
  const [placements, setPlacements] = useState([{ ...defaultPlacement }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [collegeId, setCollegeId] = useState(null);

 // Get user role and subrole
  const role = Cookies.get('role');
  const subrole = Cookies.get('subrole');

  const validationSchema = Yup.object().shape({
    placements: Yup.array().of(
      Yup.object().shape({
        placementPercentage: Yup.number()
          .min(1, "Min 1%")
          .max(100, "Max 100%")
          .required("Required"),
        highestPackage: Yup.number()
          .min(1, "Min 1 LPA")
          .required("Required"),
        topRecruiters: Yup.array()
          .of(Yup.string().required("Recruiter name cannot be empty"))
          .min(1, "At least one recruiter is required"),
        internshipOpportunities: Yup.boolean(),
      })
    ),
  });

 // Set collegeId from either URL params (admin) or cookies (vendor)
  useEffect(() => {
    const collegeIdFromCookie = getCookie('collegeID');
    const id = collegeIdFromParams || collegeIdFromCookie;
    
    if (id) {
      setCollegeId(id);
      console.log('College ID for placement:', id);
      
      // If admin is accessing, store the collegeId in cookie temporarily
      if (role === 'ADMIN' && collegeIdFromParams) {
        Cookies.set('collegeID', id, { expires: 1 }); // Expires in 1 day
      }
    } else {
      console.warn('College ID not found!');
      Swal.fire({
        icon: 'error',
        title: 'College ID Missing',
        text: 'Please select a college first',
      });
      navigate(role === 'ADMIN' ? '/colleges' : '/vendor-college');
    }
  }, [collegeIdFromParams, role, navigate]);


  // useEffect(() => {
  //   const id = getCookie("collegeID");
  //   if (id) {
  //     setCollegeId(id);
  //   } else {
  //     console.warn("College ID not found in cookies!");
  //   }
  // }, []);

  useEffect(() => {
    if (!collegeId) return;

    const fetchPlacements = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/college/placement/${collegeId}`
        );
        if (response.data?.data?.placement) {
          const placementData = response.data.data.placement;
          console.log("Placement Data*****", placementData);
        
          const formattedPlacements = placementData.map(item => ({
            placementPercentage: item.placementPercentage?.toString() || "",
            highestPackage: item.highestPackage?.toString() || "",
            topRecruiters: Array.isArray(item.topRecruiters)
              ? item.topRecruiters
              : [],
            internshipOpportunities: Boolean(item.internshipOpportunities),
          }));
        
          setPlacements(formattedPlacements.length > 0 
            ? formattedPlacements 
            : [{ ...defaultPlacement }]);
        }
        
      } catch (error) {
        console.error("Error fetching placement data:", error);
        setError("Failed to fetch placement data");
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, [collegeId]);

  const addPlacement = () => {
    setPlacements([...placements, { ...defaultPlacement }]);
  };

  const removePlacement = (index) => {
    if (placements.length <= 1) {
      // alert("You must have at least one placement entry");
      Swal.fire({
        icon: 'warning',
        title: 'Action Denied',
        text: 'You must have at least one placement entry.',
        confirmButtonColor: '#f5a623'
      });
      return;
    }
    setPlacements(placements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError(null);

      // Prepare the data in the required API format
      const placementData = {
        collegeId,
        placement: values.placements.map(placement => ({
          placementPercentage: Number(placement.placementPercentage),
          highestPackage: Number(placement.highestPackage),
          topRecruiters: placement.topRecruiters.filter(item => item.trim() !== ""),
          internshipOpportunities: placement.internshipOpportunities
        }))
      };

      // Determine if we're updating or creating
      const isUpdate = placements.some(p => p.placementPercentage !== "");
      const url = isUpdate
        ? `${API_BASE_URL}/api/college/placement/${collegeId}`
        : `${API_BASE_URL}/api/college/placement`;
      const method = isUpdate ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: placementData
      });

      console.log("Placement saved:", response.data);
       // ✅ Success Alert
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Placement details saved successfully!',
      confirmButtonColor: '#3085d6',
    });
      // alert("Placement details saved successfully!");
    } catch (error) {
      console.error("Error saving placement:", error);
      const errorMsg = error.response?.data?.message || error.response?.data?.errMsg ||error.response?.data?.usrMsg ||"Failed to save placement details";

      // ❌ Error Alert
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: errorMsg,
        confirmButtonColor: '#d33',
      });
  
      setError(errorMsg);
      // setError(error.response?.data?.message || "Failed to save placement details");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 max-w-6xl mx-auto relative">
   

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-blue-800 flex items-center">📊 Placement Details</h3>
      </div>

      {/* {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
          <strong>Error:</strong> {error}
        </div>
      )} */}

      <Formik
        initialValues={{ placements }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            {values.placements.map((placement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-blue-700">Placement Percentage</label>
                    <Field
                      type="number"
                      name={`placements.${index}.placementPercentage`}
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                      placeholder="0-100"
                    />
                    <ErrorMessage
                      name={`placements.${index}.placementPercentage`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-blue-700">Highest Package (LPA)</label>
                    <Field
                      type="number"
                      name={`placements.${index}.highestPackage`}
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                      placeholder="eg. 8.2"
                    />
                    <ErrorMessage
                      name={`placements.${index}.highestPackage`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name={`placements.${index}.internshipOpportunities`}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-blue-700">Internship Opportunities Available</label>
                </div>

                <div className="flex flex-col">
                  <label className="text-blue-700">Top Recruiter</label>
                  <Field
                    name={`placements.${index}.topRecruiters`}
                  >
                    {({ field, form }) => (
                      <input
                        type="text"
                        value={field.value.join(", ")}
                        onChange={(e) => {
                          const recruitersArray = e.target.value
                            .split(",")
                            .map(item => item.trim())
                            .filter(item => item !== "");
                          form.setFieldValue(`placements.${index}.topRecruiters`, recruitersArray);
                        }}
                        className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                        placeholder="eg. Infosys"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name={`placements.${index}.topRecruiters`}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {values.placements.length > 1 && (
                  <div>
                    <button
                      type="button"
                      onClick={() => removePlacement(index)}
                      className="flex items-center bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 cursor-pointer"
                    >
                      <Trash className="mr-2" size={20} /> Remove Placement
                    </button>
                  </div>
                )}
              </motion.div>
            ))}

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={addPlacement}
                className="flex items-center bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer"
              >
                <Plus className="mr-2" size={20} /> Add Placement
              </button>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-green-600 hover:bg-green-800 text-white disabled:bg-gray-400"
              >
                {isSubmitting || loading ? "Saving..." : "💾 Save Placement"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Placement;


// import React, { useState, useEffect } from "react";
// import { Plus, Trash } from "lucide-react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import { useNavigate } from "react-router-dom";
// import { getCookie } from "../Utlis/cookieHelper";

// function Placement() {
//   const defaultPlacement = {
//     placementPercentage: "",
//     highestPackage: "",
//     internshipOpportunities: false,
//     topRecruiters: [],
//   };

//   const [placements, setPlacements] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [collegeId, setCollegeId] = useState(null);

//   // Validation Schema using Yup
//   const validationSchema = {
//     placementPercentage: (value) => {
//       if (!value) return "Required";
//       const num = Number(value);
//       if (isNaN(num)) return "Must be a number";
//       if (num < 1) return "Must be at least 1";
//       if (num > 100) return "Cannot exceed 100";
//       return null;
//     },
//     highestPackage: (value) => {
//       if (!value) return "Required";
//       if (isNaN(Number(value))) return "Must be a number";
//       if (Number(value) < 1) return "Must be at least 1";
//       return null;
//     },
//     topRecruiters: (value) => {
//       if (!value || value.length === 0) return "At least one recruiter is required";
//       if (value.some(item => !item.trim())) return "Recruiter name cannot be empty";
//       return null;
//     }
//   };

//   // Fetch collegeId from cookie
//   useEffect(() => {
//     const id = getCookie("collegeID");
//     if (id) {
//       setCollegeId(id);
//     } else {
//       console.warn("College ID not found in cookies!");
//     }
//   }, []);

//   // Fetch placements data
//   useEffect(() => {
//     if (!collegeId) return;

//     const fetchPlacements = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/college/placement/${collegeId}`
//         );
//         if (response.data && response.data.data) {
//           const placementData = response.data.data;
//           setPlacements([{
//             placementPercentage: String(placementData.placementPercentage || ""),
//             highestPackage: String(placementData.highestPackage || ""),
//             topRecruiters: Array.isArray(placementData.topRecruiters)
//               ? placementData.topRecruiters
//               : [],
//             internshipOpportunities: placementData.internshipOpportunities || false,
//           }]);
//         }
//       } catch (error) {
//         console.error("Error fetching placement data:", error);
//         setError("Failed to fetch placement data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlacements();
//   }, [collegeId]);

//   // Add new placement
//   const addPlacement = () => {
//     setPlacements([...placements, { ...defaultPlacement }]);
//   };

//   // Remove placement by index
//   const removePlacement = (index) => {
//     setPlacements(placements.filter((_, i) => i !== index));
//   };

//   // Handle field changes
//   const handleChange = (e, index, field) => {
//     const { value, type, checked } = e.target;
//     setPlacements(prev => {
//       const updated = [...prev];
//       updated[index][field] = type === 'checkbox' ? checked : value;
//       return updated;
//     });
//   };

//   // Handle recruiter changes (comma-separated input)
//   const handleRecruitersChange = (e, index) => {
//     const value = e.target.value;
//     const recruitersArray = value.split(",").map(item => item.trim()).filter(item => item !== "");
//     setPlacements(prev => {
//       const updated = [...prev];
//       updated[index].topRecruiters = recruitersArray;
//       return updated;
//     });
//   };

//   // Validate all placements
//   const validatePlacements = () => {
//     for (const placement of placements) {
//       for (const [field, validator] of Object.entries(validationSchema)) {
//         const error = validator(placement[field]);
//         if (error) {
//           setError(`Invalid ${field}: ${error}`);
//           return false;
//         }
//       }
//     }
//     return true;
//   };

//   // Save or update placements
//   const savePlacements = async (isUpdate = false) => {
//     if (loading) return;
//     if (!validatePlacements()) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const url = isUpdate
//         ? `${API_BASE_URL}/api/college/placement/${collegeId}`
//         : `${API_BASE_URL}/api/college/placement/`;
//       const method = isUpdate ? "put" : "post";

//       const response = await axios({
//         method,
//         url,
//         data: {
//           collegeId,
//           ...placements[0], // Assuming single placement for now
//           topRecruiters: placements[0].topRecruiters.filter(item => item.trim() !== "")
//         }
//       });

//       console.log("Placement details saved successfully:", response.data);
//       alert("Placement details saved!");
//     } catch (error) {
//       console.error(
//         "Error saving placement details:",
//         error.response?.data || error.message
//       );
//       setError(
//         `Failed to save placement details: ${
//           error.response?.data?.message || "Please try again."
//         }`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 max-w-6xl mx-auto relative">
//       {/* Close Button */}
//       <button
//         onClick={() => navigate("/colleges")}
//         className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
//       >
//         &times;
//       </button>

//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-3xl font-bold text-blue-800 flex items-center">📊 Placement Details</h3>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       <div className="space-y-6">
//         {placements.map((placement, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4"
//           >
//             {/* Placement Percentage */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Placement Percentage</label>
//                 <input
//                   type="number"
//                   value={placement.placementPercentage}
//                   onChange={(e) => handleChange(e, index, "placementPercentage")}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                   placeholder="0-100"
//                 />
//                 {validationSchema.placementPercentage(placement.placementPercentage) && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {validationSchema.placementPercentage(placement.placementPercentage)}
//                   </p>
//                 )}
//               </div>

//               {/* Highest Package */}
//               <div className="flex flex-col">
//                 <label className="text-blue-700">Highest Package (LPA)</label>
//                 <input
//                   type="number"
//                   value={placement.highestPackage}
//                   onChange={(e) => handleChange(e, index, "highestPackage")}
//                   className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                   placeholder="eg. 8.2"
//                 />
//                 {validationSchema.highestPackage(placement.highestPackage) && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {validationSchema.highestPackage(placement.highestPackage)}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Internship Opportunities */}
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={`internship-${index}`}
//                 checked={placement.internshipOpportunities}
//                 onChange={(e) => handleChange(e, index, "internshipOpportunities")}
//                 className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//               />
//               <label htmlFor={`internship-${index}`} className="ml-2 text-blue-700">
//                 Internship Opportunities Available
//               </label>
//             </div>

//             {/* Top Recruiters */}
//             <div className="flex flex-col">
//               <label className="text-blue-700">Top Recruiters (comma separated)</label>
//               <input
//                 type="text"
//                 value={placement.topRecruiters.join(", ")}
//                 onChange={(e) => handleRecruitersChange(e, index)}
//                 className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
//                 placeholder="eg. Infosys, TCS, Bosch"
//               />
//               {validationSchema.topRecruiters(placement.topRecruiters) && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {validationSchema.topRecruiters(placement.topRecruiters)}
//                 </p>
//               )}
//             </div>

//             {/* Remove Button */}
//             {placements.length > 1 && (
//               <div>
//                 <button
//                   onClick={() => removePlacement(index)}
//                   className="flex items-center bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 cursor-pointer"
//                 >
//                   <Trash className="mr-2" size={20} /> Remove Placement
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-6 flex justify-between">
//         <button
//           onClick={addPlacement}
//           className="flex items-center bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer"
//         >
//           <Plus className="mr-2" size={20} /> Add Placement
//         </button>

//         <div className="flex gap-4">
//           <button
//             onClick={() => savePlacements(false)}
//             disabled={loading}
//             className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-green-600 hover:bg-green-800 text-white disabled:bg-gray-400"
//           >
//             {loading ? "Saving..." : "✅ Save Placement"}
//           </button>

//           <button
//             onClick={() => savePlacements(true)}
//             disabled={loading}
//             className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-blue-500 hover:bg-blue-700 text-white disabled:bg-gray-400"
//           >
//             {loading ? "Updating..." : "💾 Update Placement"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Placement;