// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { API_BASE_URL } from "../constant/constantBaseUrl";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// function UniversityInfrastructure() {
//   const { universityId } = useParams();
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate(); // Initialize navigation

//   const validationSchema = Yup.object({
//     campusArea: Yup.string().required("Campus area is required"),

//     numberOfClassrooms: Yup.number()
//       .min(1, "Must have at least 1 classroom")
//       .required("Required"),

//     numberOfLabs: Yup.number()
//       .min(1, "Must have at least 1 lab")
//       .required("Required"),

//     hostelAvailability: Yup.boolean().required("Select hostel availability"),

//     hostelDetails: Yup.string().nullable(), // ✅ No longer required when hostelAvailability is true
//     // hostelDetails: Yup.string().when("hostelAvailability", {
//     //   is: true,
//     //   then: (schema) => schema.required("Provide hostel details"),
//     // }),

//     canteenAndFoodServices: Yup.boolean().required(
//       "Select canteen availability"
//     ),

//     medicalFacilities: Yup.boolean().required("Select medical facilities"),

//     library: Yup.string().required("Library details are required"), // ✅ Validation added
//   });

//   const formik = useFormik({
//     initialValues: {
//       campusArea: "",
//       numberOfClassrooms: "",
//       numberOfLabs: "",
//       sportsFacilities: [],
//       hostelAvailability: false,
//       hostelDetails: "",
//       canteenAndFoodServices: false,
//       medicalFacilities: false,
//       transportFacility: [],
//       library: "", // ✅ New field for Library
//     },

//     validationSchema,

//     onSubmit: async (values) => {
//       try {
//         if (!universityId) {
//           alert("Error: University ID is missing.");
//           return;
//         }

//         // Prepare formatted data
//         const formattedData = {
//           universityId,
//           campusArea: values.campusArea || "",
//           numberOfClassrooms: parseInt(values.numberOfClassrooms) || 0,
//           numberOfLabs: parseInt(values.numberOfLabs) || 0,
//           sportsFacilities: values.sportsFacilities || [],
//           hostelAvailability: values.hostelAvailability,
//           canteenAndFoodServices: values.canteenAndFoodServices,
//           medicalFacilities: values.medicalFacilities,
//           transportFacility: values.transportFacility || [],
//           library: { size: values.library || "" },
//         };

//         // ✅ Remove hostelDetails if hostelAvailability is false OR empty
//         if (values.hostelAvailability && values.hostelDetails) {
//           formattedData.hostelDetails = values.hostelDetails;
//         }

//         const isUpdating = isEditing;
//         const url = isUpdating
//           ? `${API_BASE_URL}/api/university/infrastructure/${universityId}`
//           : `${API_BASE_URL}/api/university/infrastructure/`;

//         const methodType = isUpdating ? "put" : "post";

//         const response = await axios({
//           method: methodType,
//           url,
//           data: formattedData,
//         });

//         console.log("✅ Infrastructure details saved:", response.data);
//         alert("Infrastructure details saved!");
//       } catch (error) {
//         console.error(
//           "Error saving infrastructure:",
//           error.response?.data || error.message
//         );
//         alert(
//           `Failed to save infrastructure details. Please try again. ${
//             error.response?.data?.message ||  error.response?.data.errMessage || "Unknown error"
//           }`
//         );
//       }
//     },
//   });

//   useEffect(() => {
//     if (!universityId) return;

//     const fetchInfrastructure = async () => {
//       try {
//         const { data } = await axios.get(
//           `${API_BASE_URL}/api/university/infrastructure/${universityId}`
//         );

//         if (data?.usrMsg) {
//           const infraData = data.usrMsg;

//           formik.setValues({
//             campusArea: infraData.campusArea || "",
//             numberOfClassrooms: infraData.numberOfClassrooms?.toString() || "",
//             numberOfLabs: infraData.numberOfLabs?.toString() || "",
//             sportsFacilities: infraData.sportsFacilities || [],
//             hostelAvailability: infraData.hostelAvailability || false,
//             hostelDetails: infraData.hostelDetails || "",
//             canteenAndFoodServices: infraData.canteenAndFoodServices || false,
//             medicalFacilities: infraData.medicalFacilities || false,
//             transportFacility: infraData.transportFacility || [],
//             library: infraData.library?.size || "", // ✅ Fetching library data
//           });

//           setIsEditing(true);
//         } else {
//           console.warn("No infrastructure data found.");
//           setIsEditing(false);
//         }
//       } catch (error) {
//         console.error("Error fetching infrastructure data:", error);
//       }
//     };

//     fetchInfrastructure();
//   }, [universityId]);

//   const handleDelete = async () => {
//     if (!universityId) {
//       alert("University ID is missing!");
//       return;
//     }

//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this infrastructure data?"
//     );
//     if (!confirmDelete) return;

//     try {
//       // No API call needed, just clearing the form
//       alert("Infrastructure details deleted!");

//       // Clear form using Formik
//       formik.setValues({
//         campusArea: "",
//         numberOfClassrooms: 0,
//         numberOfLabs: 0,
//         sportsFacilities: [],
//         hostelAvailability: "false",
//         hostelDetails: "",
//         canteenAndFoodServices: "false",
//         medicalFacilities: "false",
//         transportFacility: [],
//         library: "",
//       });

//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error deleting infrastructure:", error);
//       alert("Failed to delete infrastructure details.");
//     }
//   };
//   return (
//     <div className="flex justify-center ">
//     <div className="relative w-[90%] max-w-[1200px] bg-blue-100 p-6 mt-10 rounded-lg shadow-lg">
//        {/* Close Button (X) */}
//        <button
//         onClick={() => navigate("/university-details")} // Navigate to CollegeTableDetails page
//         className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-xl font-bold cursor-pointer"
//       >
//         &times; {/* Unicode 'X' symbol */}
//       </button>

//       <h2 className="text-2xl font-semibold text-blue-900 mb-4">
//         {isEditing
//           ? "Edit University Infrastructure"
//           : "Add University Infrastructure"}
//       </h2>
       
//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-blue-700 font-medium">
//             Campus Area:
//           </label>
//           <input
//             type="text"
//             name="campusArea"
//             value={formik.values.campusArea}
//             onChange={formik.handleChange}
//             className="w-full p-2 border border-blue-300 rounded-lg"
//             placeholder="eg. 250 Acres"
//           />
//           {formik.touched.campusArea && formik.errors.campusArea && (
//             <p className="text-red-500 text-sm mt-1">
//               {formik.errors.campusArea}
//             </p>
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-blue-700 font-medium">
//               Classrooms:
//             </label>
//             <input
//               type="number"
//               name="numberOfClassrooms"
//               value={formik.values.numberOfClassrooms}
//               onChange={formik.handleChange}
//               className="w-full p-2 border rounded-lg"
//               placeholder="0"
//             />
//             {formik.touched.numberOfClassrooms &&
//               formik.errors.numberOfClassrooms && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.numberOfClassrooms}
//                 </p>
//               )}
//           </div>

//           <div>
//             <label className="block text-blue-700 font-medium">Labs:</label>
//             <input
//               type="number"
//               name="numberOfLabs"
//               value={formik.values.numberOfLabs}
//               onChange={formik.handleChange}
//               className="w-full p-2 border rounded-lg"
//               placeholder="0"
//             />
//             {formik.touched.numberOfLabs && formik.errors.numberOfLabs && (
//               <p className="text-red-500 text-sm mt-1">
//                 {formik.errors.numberOfLabs}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Library Section */}
//         <div>
//           <label className="block text-blue-700 font-medium">Library:</label>
//           <input
//             type="text"
//             name="library"
//             value={formik.values.library || ""}
//             onChange={formik.handleChange}
//             className="w-full p-2 border rounded-lg"
//             placeholder="eg. Books, Digital Access, Research Papers"
//           />
//           {formik.touched.library && formik.errors.library && (
//             <p className="text-red-500 text-sm mt-1">{formik.errors.library}</p>
//           )}
//         </div>

//         {/* Sports Facilities */}
//         <div>
//           <label className="block text-blue-700 font-medium">
//             Sports Facilities:
//           </label>
//           <div className="flex gap-4">
//             {["Indoor", "Outdoor"].map((option) => (
//               <label key={option}>
//                 <input
//                   type="checkbox"
//                   value={option}
//                   checked={formik.values.sportsFacilities.includes(option)}
//                   onChange={() => {
//                     const updatedFacilities =
//                       formik.values.sportsFacilities.includes(option)
//                         ? formik.values.sportsFacilities.filter(
//                             (item) => item !== option
//                           )
//                         : [...formik.values.sportsFacilities, option];
//                     formik.setFieldValue("sportsFacilities", updatedFacilities);
//                   }}
//                 />
//                 <span className="ml-2">{option}</span>
//               </label>
//             ))}
//           </div>
//           {formik.touched.sportsFacilities && formik.errors.sportsFacilities ? (
//             <div className="text-red-500 text-sm mt-1">
//               {formik.errors.sportsFacilities}
//             </div>
//           ) : null}
//         </div>

//         <div>
//           <label className="block text-blue-700 font-medium">
//             Hostel Availability:
//           </label>
//           <select
//             name="hostelAvailability"
//             value={formik.values.hostelAvailability.toString()}
//             onChange={(e) =>
//               formik.setFieldValue(
//                 "hostelAvailability",
//                 e.target.value === "true"
//               )
//             }
//             className="w-full p-2 border rounded-lg"
//           >
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
//           {formik.touched.hostelAvailability &&
//             formik.errors.hostelAvailability && (
//               <p className="text-red-500 text-sm mt-1">
//                 {formik.errors.hostelAvailability}
//               </p>
//             )}
//         </div>

//         {formik.values.hostelAvailability && (
//           <div>
//             <label className="block text-blue-700 font-medium">
//               Hostel Details:
//             </label>
//             <input
//               type="text"
//               name="hostelDetails"
//               value={formik.values.hostelDetails}
//               onChange={formik.handleChange}
//               className="w-full p-2 border rounded-lg"
//               placeholder="eg. Separate for Boys & Girls"
//             />
//             {formik.touched.hostelDetails && formik.errors.hostelDetails && (
//               <p className="text-red-500 text-sm mt-1">
//                 {formik.errors.hostelDetails}
//               </p>
//             )}
//           </div>
//         )}

//         <div>
//           <label className="block text-blue-700 font-medium">
//             Canteen Availability:
//           </label>
//           <select
//             name="canteenAndFoodServices"
//             value={formik.values.canteenAndFoodServices.toString()}
//             onChange={(e) =>
//               formik.setFieldValue(
//                 "canteenAndFoodServices",
//                 e.target.value === "true"
//               )
//             }
//             className="w-full p-2 border rounded-lg"
//           >
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
//           {formik.touched.canteenAndFoodServices &&
//           formik.errors.canteenAndFoodServices ? (
//             <div className="text-red-500 text-sm mt-1">
//               {formik.errors.canteenAndFoodServices}
//             </div>
//           ) : null}
//         </div>

//         {/* Medical Facilities */}
//         <div>
//           <label className="block text-blue-700 font-medium">
//             Medical Facilities:
//           </label>
//           <select
//             name="medicalFacilities"
//             value={formik.values.medicalFacilities.toString()}
//             onChange={(e) =>
//               formik.setFieldValue(
//                 "medicalFacilities",
//                 e.target.value === "true"
//               )
//             }
//             className="w-full p-2 border rounded-lg"
//           >
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
//           {formik.touched.medicalFacilities &&
//           formik.errors.medicalFacilities ? (
//             <div className="text-red-500 text-sm mt-1">
//               {formik.errors.medicalFacilities}
//             </div>
//           ) : null}
//         </div>

//         {/* Transport Facility */}
//         <div>
//           <label className="block text-blue-700 font-medium">
//             Transport Facilities:
//           </label>
//           <div className="flex gap-4">
//             {["University Bus", "Public Transport Nearby"].map((option) => (
//               <label key={option}>
//                 <input
//                   type="checkbox"
//                   value={option}
//                   checked={formik.values.transportFacility.includes(option)}
//                   onChange={() => {
//                     const updatedTransport =
//                       formik.values.transportFacility.includes(option)
//                         ? formik.values.transportFacility.filter(
//                             (item) => item !== option
//                           )
//                         : [...formik.values.transportFacility, option];
//                     formik.setFieldValue("transportFacility", updatedTransport);
//                   }}
//                 />
//                 <span className="ml-2">{option}</span>
//               </label>
//             ))}
//           </div>
//           {formik.touched.transportFacility &&
//           formik.errors.transportFacility ? (
//             <div className="text-red-500 text-sm mt-1">
//               {formik.errors.transportFacility}
//             </div>
//           ) : null}
//         </div>

//         <div className="flex mt-4 justify-end gap-5">
//           <button
//             type="submit"
//             className="w-30 bg-blue-600 text-white font-semibold p-2 rounded-lg cursor-pointer"
//           >
//             {isEditing ? "Update" : "Add"}
//           </button>

//           <button
//             type="button"
//             onClick={handleDelete}
//             className="bg-red-500 text-white w-25 px-4 py-2 rounded-lg justify-end hover:bg-red-600 transition duration-300 cursor-pointer"
//           >
//             Delete
//           </button>
//         </div>
//       </form>
//      </div>
//     </div>
//   );
// }

// export default UniversityInfrastructure;





import React, { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../utlis/cookieHelper";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Infrastructure = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
 const { universityId: universityIdFromParams } = useParams();
  const [universityId, setUniversityId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 // Get role and subrole
  const role = Cookies.get("role");
  const subrole = Cookies.get("subrole");

  // useEffect(() => {
  //   const collegeId = getCookie("collegeID");
  //   if (collegeId) {
  //     setCollegeId(collegeId);
  //     console.log("collegeId for infrastructure",collegeId);
  //   } else {
  //     console.warn("College ID not found in cookies!");
  //   }
  // }, []);

   // Set collegeId from either URL params (admin) or cookies (vendor)
  useEffect(() => {
    const universityIdFromCookie = getCookie("universityID");
    const id = universityIdFromParams || universityIdFromCookie;
    
    if (id) {
      setUniversityId(id);
      console.log("College ID for infrastructure:", id);
      
      // If admin is accessing, store the collegeId in cookie temporarily
      if (role === "ADMIN" && universityIdFromParams) {
        Cookies.set("universityID", id, { expires: 1 }); // Expires in 1 day
      }
    } else {
      console.warn("university ID not found!");
      Swal.fire({
        icon: "error",
        title: "university ID Missing",
        text: "Please select a University first",
      });
      navigate(role === "ADMIN" ? "/university" : "/vendor-college");
    }
  }, [universityIdFromParams, role, navigate]);

  const validationSchema = Yup.object({
        infrastructure: Yup.array().of(
          Yup.object().shape({
        campusArea: Yup.string().required("Campus area is required"),
    
        numberOfClassrooms: Yup.number()
          .min(1, "Must have at least 1 classroom")
          .required("Required"),
    
        numberOfLabs: Yup.number()
          .min(1, "Must have at least 1 lab")
          .required("Required"),
    
        hostelAvailability: Yup.boolean().required("Select hostel availability"),
    
        hostelDetails: Yup.string().nullable(), // ✅ No longer required when hostelAvailability is true
        // hostelDetails: Yup.string().when("hostelAvailability", {
        //   is: "true", // Change to true if `hostelAvailability` is a boolean
        //   then: (schema) => schema.required("Provide hostel details"),
        // }),
    
        canteenAndFoodServices: Yup.boolean().required(
          "Select canteen availability"
        ),
    
        medicalFacilities: Yup.boolean().required("Select medical facilities"),
    
        // library: Yup.string().required("Library details are required"), // ✅ Validation added
      })
    ),
    });
    
  const formik = useFormik({
    initialValues: {
      infrastructure: [
        {
          campusArea: "",
          numberOfClassrooms: "",
          numberOfLabs: "",
          sportsFacilities: [],
          hostelAvailability: false,
          hostelDetails: "",
          canteenAndFoodServices: false,
          medicalFacilities: false,
          transportFacility: [],
          library: { size: "" }, // ✅ fixed
        },
      ],
    },
    validationSchema,
    // onSubmit: async (values) => {
    //   try {
    //     if (!collegeId) {
    //       alert("Error: College ID is missing.");
    //       return;
    //     }

    //     const formattedData = values.infrastructure.map((infra) => ({
    //       campusArea: infra.campusArea || "",
    //       numberOfClassrooms: parseInt(infra.numberOfClassrooms) || 0,
    //       numberOfLabs: parseInt(infra.numberOfLabs) || 0,
    //       sportsFacilities: infra.sportsFacilities || [],
    //       hostelAvailability: infra.hostelAvailability,
    //       hostelDetails: infra.hostelAvailability ? infra.hostelDetails : "",
    //       canteenAndFoodServices: infra.canteenAndFoodServices,
    //       medicalFacilities: infra.medicalFacilities,
    //       transportFacility: infra.transportFacility || [],
    //       library: { size: infra.library || "" },
    //     }));

    //     const isUpdating = isEditing;
    //     const url = isUpdating
    //       ? `${API_BASE_URL}/api/college/infrastructure/${collegeId}`
    //       : `${API_BASE_URL}/api/college/infrastructure`;

    //     const methodType = isUpdating ? "put" : "post";

    //     const response = await axios({
    //       method: methodType,
    //       url,
    //       data: { collegeId, infrastructure: formattedData },
    //     });

    //     console.log("✅ Infrastructure details saved:", response.data);
    //     alert("Infrastructure details saved!");
    //     setIsEditing(true);
    //   } catch (error) {
    //     console.error(
    //       "Error saving infrastructure:",
    //       error.response?.data || error.message
    //     );
    //     alert(
    //       `Failed to save infrastructure details. Please try again. ${
    //         error.response?.data?.message || error.response?.data.errMsg || "Unknown error"
    //       }`
    //     );
    //   }
    // },

    onSubmit: async (values) => {
      try {
        if (!universityId) {
          alert("Error: College ID is missing.");
          return;
        }

        setLoading(true);

        // Prepare the data in the correct format
        const formattedData = {
          universityId,
          infrastructure: values.infrastructure.map((infra) => ({
            campusArea: infra.campusArea || "",
            numberOfClassrooms: parseInt(infra.numberOfClassrooms) || 0,
            numberOfLabs: parseInt(infra.numberOfLabs) || 0,
            sportsFacilities: infra.sportsFacilities || [],
            // hostelAvailability: infra.hostelAvailability,
            // hostelDetails: infra.hostelAvailability ? infra.hostelDetails : "",
            hostelAvailability: Boolean(infra.hostelAvailability),
            hostelDetails: infra.hostelAvailability ? infra.hostelDetails : "",
            canteenAndFoodServices: infra.canteenAndFoodServices,
            medicalFacilities: infra.medicalFacilities,
            transportFacility: infra.transportFacility || [],
            library: { size: infra.library.size || "" },
          })),
        };

        console.log("Formatted data ****",formattedData);
        const url = isEditing
          ? `${API_BASE_URL}/api/university/infrastructure/${universityId}`
          : `${API_BASE_URL}/api/university/infrastructure`;

        const method = isEditing ? "put" : "post";

        const response = await axios({
          method,
          url,
          data: formattedData,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("✅ Response:", response.data);
        if (response.data.success) {
          // alert(
          //   isEditing
          //     ? "Infrastructure updated successfully!"
          //     : "Infrastructure created successfully!"
          // );
          
          Swal.fire({
            icon: "success",
            title: isEditing ? "Infrastructure updated!" : "Infrastructure created!",
            text: response.data.message || "Saved successfully!",
          });
          
          setIsEditing(true);
        } else {
          throw new Error(
            response.data.errMsg || "Failed to save infrastructure"
          );
        }
      } catch (error) {
        console.error(
          "Error saving infrastructure:",
          error.response?.data || error.message
        );
        Swal.fire({
          icon: "warning",
          title: "Error saving infrastructure",
          text:
            error.response?.data?.message ||
            error.response?.data?.errMsg ||
            error.message ||
            "Please Try Again.",
        });
        
      } finally {
        setLoading(false);
      }
    },
  });

  // useEffect(() => {
  //   if (!collegeId) return;

  //   const fetchInfrastructure = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `${API_BASE_URL}/api/college/infrastructure/${collegeId}`
  //       );

  //       if (data?.usrMsg) {
  //         const infraData = data.usrMsg;
  //         const infrastructureArray = Array.isArray(infraData) ? infraData : [infraData];

  //         formik.setValues({
  //           infrastructure: infrastructureArray.map((infra) => ({
  //             campusArea: infra.campusArea || "",
  //             numberOfClassrooms: infra.numberOfClassrooms?.toString() || "",
  //             numberOfLabs: infra.numberOfLabs?.toString() || "",
  //             sportsFacilities: infra.sportsFacilities || [],
  //             hostelAvailability: infra.hostelAvailability || false,
  //             hostelDetails: infra.hostelDetails || "",
  //             canteenAndFoodServices: infra.canteenAndFoodServices || false,
  //             medicalFacilities: infra.medicalFacilities || false,
  //             transportFacility: infra.transportFacility || [],
  //             library: infra.library?.size || "",
  //           })),
  //         });

  //         setIsEditing(true);
  //       } else {
  //         console.warn("No infrastructure data found.");
  //         setIsEditing(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching infrastructure data:", error);
  //     }
  //   };

  //   fetchInfrastructure();
  // }, [collegeId]);

  useEffect(() => {
    if (!universityId) return;

 const fetchInfrastructure = async () => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/university/infrastructure/${universityId}`
    );

    if (data?.data?.infrastructure) {
      // Corrected: use `data.data.infrastructure` directly
      const infrastructureData = Array.isArray(data.data.infrastructure)
        ? data.data.infrastructure
        : [data.data.infrastructure];

      formik.setValues({
        infrastructure: infrastructureData.map((infra) => ({
          campusArea: infra.campusArea || "",
          numberOfClassrooms: infra.numberOfClassrooms?.toString() || "",
          numberOfLabs: infra.numberOfLabs?.toString() || "",
          sportsFacilities: infra.sportsFacilities || [],
          hostelAvailability: infra.hostelAvailability || false,
          hostelDetails: infra.hostelDetails || "",
          canteenAndFoodServices: infra.canteenAndFoodServices || false,
          medicalFacilities: infra.medicalFacilities || false,
          transportFacility: infra.transportFacility || [],
          library: { size: infra.library?.size || "" }, // ✅ fixed
        })),
      });

      setIsEditing(true);
    }
  } catch (error) {
    console.error("Error fetching infrastructure:", error);
  }
};


    fetchInfrastructure();
  }, [universityId]);

  const addInfrastructure = () => {
    formik.setValues({
      infrastructure: [
        ...formik.values.infrastructure,
        {
          campusArea: "",
          numberOfClassrooms: "",
          numberOfLabs: "",
          sportsFacilities: [],
          hostelAvailability: false,
          hostelDetails: "",
          canteenAndFoodServices: false,
          medicalFacilities: false,
          transportFacility: [],
          library: { size: "" }, // ✅ fixed
        },
      ],
    });
  };

  const removeInfrastructure = (index) => {
    const newInfrastructure = formik.values.infrastructure.filter(
      (_, i) => i !== index
    );
    formik.setValues({
      infrastructure: newInfrastructure,
    });
  };

  const handleDelete = async () => {
    if (!universityId) {
      // alert("College ID is missing!");
      Swal.fire({
        icon: "warning",
        title: "Missing College ID",
        text: "Please login again or check your college session.",
      });
      
      return;
    }

    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete all infrastructure data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    try {
      formik.setValues({
        infrastructure: [
          {
            campusArea: "",
            numberOfClassrooms: "",
            numberOfLabs: "",
            sportsFacilities: [],
            hostelAvailability: false,
            hostelDetails: "",
            canteenAndFoodServices: false,
            medicalFacilities: false,
            transportFacility: [],
            library: "",
          },
        ],
      });

      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Infrastructure details have been reset.",
      });
      // alert("Infrastructure details deleted!");
    } catch (error) {
      console.error("Error deleting infrastructure:", error);
      Swal.fire({
        icon: "warning",
        title: "Deletion failed",
        text: "Failed to delete infrastructure details.",
      });
      
    }
  };

  return (
    <section className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 max-w-6xl mx-auto relative">
      {/* Close Button */}
      {/* <button
        onClick={() => navigate("/colleges")}
        className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
      >
        &times;
      </button> */}
      {role === "ADMIN" && (
  <button
    onClick={() => navigate("/university-details")}
    className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
  >
    &times;
  </button>
)}


      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-blue-800 flex items-center">
          🏛 {isEditing ? "Edit Infrastructure" : "Add Infrastructure"}
        </h3>
      </div>
{/* 
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
          <strong>Error:</strong> {error}
        </div>
      )} */}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.values.infrastructure.map((infra, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4"
          >
            {/* Campus Area */}
            <div className="mb-4">
              <label className="block text-lg text-blue-700 font-medium mb-1">
                Campus Area:
              </label>
              <input
                type="text"
                name={`infrastructure[${index}].campusArea`}
                value={infra.campusArea}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:ring focus:ring-blue-300 focus:border-blue-500"
                placeholder="E.g. 250+ Acres"
              />
              {formik.touched.infrastructure?.[index]?.campusArea &&
                formik.errors.infrastructure?.[index]?.campusArea && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.infrastructure[index].campusArea}
                  </p>
                )}
            </div>

            {/* Classrooms & Labs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-lg text-blue-700 font-medium mb-1">
                  Number of Classrooms:
                </label>
                <input
                  type="number"
                  name={`infrastructure[${index}].numberOfClassrooms`}
                  value={infra.numberOfClassrooms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:ring focus:ring-blue-300 focus:border-blue-500"
                  placeholder="0"
                />
                {formik.touched.infrastructure?.[index]?.numberOfClassrooms &&
                  formik.errors.infrastructure?.[index]?.numberOfClassrooms && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.infrastructure[index].numberOfClassrooms}
                    </p>
                  )}
              </div>

              <div className="mb-4">
                <label className="block text-lg text-blue-700 font-medium mb-1">
                  Number of Labs:
                </label>
                <input
                  type="number"
                  name={`infrastructure[${index}].numberOfLabs`}
                  value={infra.numberOfLabs}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:ring focus:ring-blue-300 focus:border-blue-500"
                  placeholder="0"
                />
                {formik.touched.infrastructure?.[index]?.numberOfLabs &&
                  formik.errors.infrastructure?.[index]?.numberOfLabs && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.infrastructure[index].numberOfLabs}
                    </p>
                  )}
              </div>
            </div>

            {/* Sports Facilities */}
            {/* <div className="mb-4">
              <label className="block text-lg text-blue-700 font-medium mb-1">
                Sports Facilities Available:
              </label>
              <div className="flex gap-4">
                {["Indoor", "Outdoor"].map((facility) => (
                  <label key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`infrastructure[${index}].sportsFacilities`}
                      value={facility}
                      checked={formik.values.sportsFacilities?.includes("Indoor")}

                      onChange={(e) => {
                        const { checked, value } = e.target;
                        const newSportsFacilities = checked
                          ? [...infra.sportsFacilities, value]
                          : infra.sportsFacilities.filter(item => item !== value);
                        
                        formik.setFieldValue(
                          `infrastructure[${index}].sportsFacilities`,
                          newSportsFacilities
                        );
                      }}
                      className="mr-2"
                    />
                    {facility}
                  </label>
                ))}
              </div>
              {formik.touched.infrastructure?.[index]?.sportsFacilities &&
               formik.errors.infrastructure?.[index]?.sportsFacilities && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.infrastructure[index].sportsFacilities}
                </p>
              )}
            </div> */}

            <div className="mb-4">
              <label className="block text-lg text-blue-700 font-medium mb-1">
                Sports Facilities Available:
              </label>
              <div className="flex gap-4">
                {["Indoor", "Outdoor"].map((facility) => (
                  <label key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`infrastructure[${index}].sportsFacilities`}
                      value={facility}
                      checked={
                        formik.values.infrastructure?.[
                          index
                        ]?.sportsFacilities?.includes(facility) || false
                      }
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        const currentFacilities =
                          formik.values.infrastructure?.[index]
                            ?.sportsFacilities || [];

                        const updatedFacilities = checked
                          ? [...currentFacilities, value]
                          : currentFacilities.filter((item) => item !== value);

                        formik.setFieldValue(
                          `infrastructure[${index}].sportsFacilities`,
                          updatedFacilities
                        );
                      }}
                      className="mr-2"
                    />
                    {facility}
                  </label>
                ))}
              </div>
              {formik.touched.infrastructure?.[index]?.sportsFacilities &&
                formik.errors.infrastructure?.[index]?.sportsFacilities && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.infrastructure[index].sportsFacilities}
                  </p>
                )}
            </div>

            {/* Library */}
            <div className="mb-4">
              <label className="block text-lg text-blue-700 font-medium mb-1">
                Library:
              </label>
              <input
                type="text"
                name={`infrastructure[${index}].library.size`} // ✅ fixed name
  value={infra.library?.size || ""} // ✅ fixed value
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:ring focus:ring-blue-300 focus:border-blue-500"
                placeholder="eg. Books, Digital Access, Research Papers"
              />
              {formik.touched.infrastructure?.[index]?.library &&
                formik.errors.infrastructure?.[index]?.library && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.infrastructure[index].library}
                  </p>
                )}
            </div>

            {/* Hostel Availability */}
            {/* <div className="mb-4">
              <label className="block text-lg text-blue-700 font-medium mb-1">
                Hostel Availability:
              </label>
              <select
                name={`infrastructure[${index}].hostelAvailability`}
                value={infra.hostelAvailability}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:ring focus:ring-blue-300 focus:border-blue-500"
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
              {formik.touched.infrastructure?.[index]?.hostelAvailability &&
                formik.errors.infrastructure?.[index]?.hostelAvailability && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.infrastructure[index].hostelAvailability}
                  </p>
                )}
            </div>

            {/* Hostel Details (conditionally shown) */}
            {/* {infra.hostelAvailability && (
              <div className="mb-4">
                <label className="block text-lg text-blue-700 font-medium mb-1">
                  Hostel Details:
                </label>
                <input
                  type="text"
                  name={`infrastructure[${index}].hostelDetails`}
                  value={infra.hostelDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:ring focus:ring-blue-300 focus:border-blue-500"
                  placeholder="eg. Separate for Boys & Girls"
                />
                {formik.touched.infrastructure?.[index]?.hostelDetails &&
                  formik.errors.infrastructure?.[index]?.hostelDetails && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.infrastructure[index].hostelDetails}
                    </p>
                  )}
              </div>
            )} */}



{/* Hostel Availability */}
<div className="mb-4">
  <label className="block text-lg text-blue-700 font-medium mb-1">
    Hostel Availability:
  </label>
  <select
    name={`infrastructure[${index}].hostelAvailability`}
    value={infra.hostelAvailability}
    onChange={(e) => {
      const isAvailable = e.target.value === "true";
      formik.setFieldValue(
        `infrastructure[${index}].hostelAvailability`,
        isAvailable
      );
      // Clear details when disabling hostel
      if (!isAvailable) {
        formik.setFieldValue(
          `infrastructure[${index}].hostelDetails`,
          ""
        );
      }
    }}
    onBlur={formik.handleBlur}
    className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:ring focus:ring-blue-300 focus:border-blue-500"
  >
    <option value="false">Not Available</option>
    <option value="true">Available</option>
  </select>
  {formik.touched.infrastructure?.[index]?.hostelAvailability &&
    formik.errors.infrastructure?.[index]?.hostelAvailability && (
      <p className="text-red-500 text-sm mt-1">
        {formik.errors.infrastructure[index].hostelAvailability}
      </p>
    )}
</div>

{/* Hostel Details (conditionally shown) */}
{infra.hostelAvailability && (
  <div className="mb-4">
    <label className="block text-lg text-blue-700 font-medium mb-1">
      Hostel Details:
    </label>
    <input
      type="text"
      name={`infrastructure[${index}].hostelDetails`}
      value={infra.hostelDetails}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:ring focus:ring-blue-300 focus:border-blue-500"
      placeholder="eg. Separate for Boys & Girls"
    />
    {formik.touched.infrastructure?.[index]?.hostelDetails &&
      formik.errors.infrastructure?.[index]?.hostelDetails && (
        <p className="text-red-500 text-sm mt-1">
          {formik.errors.infrastructure[index].hostelDetails}
        </p>
      )}
  </div>
)}

            {/* Canteen and Medical Facilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-lg text-blue-700 font-medium mb-1">
                  Canteen and Food Services:
                </label>
                <select
                  name={`infrastructure[${index}].canteenAndFoodServices`}
                  value={infra.canteenAndFoodServices}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:ring focus:ring-blue-300 focus:border-blue-500"
                >
                  <option value={false}>Not Available</option>
                  <option value={true}>Available</option>
                </select>
                {formik.touched.infrastructure?.[index]
                  ?.canteenAndFoodServices &&
                  formik.errors.infrastructure?.[index]
                    ?.canteenAndFoodServices && (
                    <p className="text-red-500 text-sm mt-1">
                      {
                        formik.errors.infrastructure[index]
                          .canteenAndFoodServices
                      }
                    </p>
                  )}
              </div>

              <div className="mb-4">
                <label className="block text-lg text-blue-700 font-medium mb-1">
                  Medical Facilities:
                </label>
                <select
                  name={`infrastructure[${index}].medicalFacilities`}
                  value={infra.medicalFacilities}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-white focus:ring focus:ring-blue-300 focus:border-blue-500"
                >
                  <option value={false}>Not Available</option>
                  <option value={true}>Available</option>
                </select>
                {formik.touched.infrastructure?.[index]?.medicalFacilities &&
                  formik.errors.infrastructure?.[index]?.medicalFacilities && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.infrastructure[index].medicalFacilities}
                    </p>
                  )}
              </div>
            </div>

            {/* Transport Facility */}
            <div className="mb-4">
              <label className="block text-lg text-blue-700 font-medium mb-1">
                Transport Facilities:
              </label>
              <div className="flex gap-4">
                {["University Bus", "Public Transport Nearby"].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`infrastructure[${index}].transportFacility`}
                      value={option}
                      checked={infra.transportFacility.includes(option)}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        const newTransportFacility = checked
                          ? [...infra.transportFacility, value]
                          : infra.transportFacility.filter(
                              (item) => item !== value
                            );

                        formik.setFieldValue(
                          `infrastructure[${index}].transportFacility`,
                          newTransportFacility
                        );
                      }}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
              {formik.touched.infrastructure?.[index]?.transportFacility &&
                formik.errors.infrastructure?.[index]?.transportFacility && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.infrastructure[index].transportFacility}
                  </p>
                )}
            </div>

            {/* Remove Infrastructure Button */}
            {formik.values.infrastructure.length > 1 && (
              <div>
                <button
                  type="button"
                  onClick={() => removeInfrastructure(index)}
                  className="flex items-center bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 cursor-pointer"
                >
                  <Trash className="mr-2" size={20} /> Remove Infrastructure
                </button>
              </div>
            )}
          </motion.div>
        ))}

        {/* Add / Save / Delete Buttons */}
        <div className="mt-6 flex justify-between">
          {/* Add Infrastructure Button */}
          <button
            type="button"
            onClick={addInfrastructure}
            className="flex items-center bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer"
          >
            <Plus className="mr-2" size={20} /> Add Infrastructure
          </button>

          <div className="flex gap-4">
            {/* Delete Button */}
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-red-600 hover:bg-red-800 text-white"
              >
                🗑️ Delete All
              </button>
            )}

            {/* Save Button */}
            <button
              type="submit"
              className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-green-600 hover:bg-green-800 text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "💾 Save Infrastructure"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Infrastructure;