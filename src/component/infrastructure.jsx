

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
 const { collegeId: collegeIdFromParams } = useParams();
  const [collegeId, setCollegeId] = useState(null);
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
    const collegeIdFromCookie = getCookie("collegeID");
    const id = collegeIdFromParams || collegeIdFromCookie;
    
    if (id) {
      setCollegeId(id);
      console.log("College ID for infrastructure:", id);
      
      // If admin is accessing, store the collegeId in cookie temporarily
      if (role === "ADMIN" && collegeIdFromParams) {
        Cookies.set("collegeID", id, { expires: 1 }); // Expires in 1 day
      }
    } else {
      console.warn("College ID not found!");
      Swal.fire({
        icon: "error",
        title: "College ID Missing",
        text: "Please select a college first",
      });
      navigate(role === "ADMIN" ? "/colleges" : "/vendor-college");
    }
  }, [collegeIdFromParams, role, navigate]);

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
        if (!collegeId) {
          alert("Error: College ID is missing.");
          return;
        }

        setLoading(true);

        // Prepare the data in the correct format
        const formattedData = {
          collegeId,
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
          ? `${API_BASE_URL}/api/college/infrastructure/${collegeId}`
          : `${API_BASE_URL}/api/college/infrastructure`;

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
    if (!collegeId) return;

    const fetchInfrastructure = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/college/infrastructure/${collegeId}`
        );
if (data?.usrMsg) {
  const infrastructureData = Array.isArray(data.data?.infrastructure)
    ? data.data.infrastructure
    : [data.data?.infrastructure];


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
  }, [collegeId]);

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
    if (!collegeId) {
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
    onClick={() => navigate("/colleges")}
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

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import { useNavigate } from "react-router-dom";
// import { getCookie } from "../Utlis/cookieHelper";

// function Infrastructure() {
//   const navigate = useNavigate();
//   const [collegeId, setCollegeId] = useState(null);
//   const [infrastructures, setInfrastructures] = useState([]);
//   const [currentInfraIndex, setCurrentInfraIndex] = useState(-1); // -1 means new entry

//   useEffect(() => {
//     const collegeId = getCookie("collegeID");
//     if (collegeId) {
//       setCollegeId(collegeId);
//     } else {
//       console.warn("College ID not found in cookies!");
//     }
//   }, []);

//   const validationSchema = Yup.object({
//     campusArea: Yup.string().required("Campus area is required"),
//     numberOfClassrooms: Yup.number()
//       .min(1, "Must have at least 1 classroom")
//       .required("Required"),
//     numberOfLabs: Yup.number()
//       .min(1, "Must have at least 1 lab")
//       .required("Required"),
//     hostelAvailability: Yup.boolean().required("Select hostel availability"),
//     hostelDetails: Yup.string().nullable(),
//     canteenAndFoodServices: Yup.boolean().required(
//       "Select canteen availability"
//     ),
//     medicalFacilities: Yup.boolean().required("Select medical facilities"),
//     library: Yup.string().required("Library details are required"),
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
//       library: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         if (!collegeId) {
//           alert("Error: College ID is missing.");
//           return;
//         }

//         const formattedData = {
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

//         if (values.hostelAvailability && values.hostelDetails) {
//           formattedData.hostelDetails = values.hostelDetails;
//         }

//         let updatedInfrastructures = [...infrastructures];

//         if (currentInfraIndex === -1) {
//           // Add new infrastructure
//           updatedInfrastructures.push(formattedData);
//         } else {
//           // Update existing infrastructure
//           updatedInfrastructures[currentInfraIndex] = formattedData;
//         }

//         const response = await axios.put(
//           `${API_BASE_URL}/api/college/infrastructure/${collegeId}`,
//           { infrastructure: updatedInfrastructures }
//         );

//         console.log("✅ Infrastructure details saved:", response.data);
//         setInfrastructures(updatedInfrastructures);
//         alert("Infrastructure details saved!");
//         formik.resetForm();
//         setCurrentInfraIndex(-1);
//       } catch (error) {
//         console.error(
//           "Error saving infrastructure:",
//           error.response?.data || error.message
//         );
//         alert(
//           `Failed to save infrastructure details. Please try again. ${
//             error.response?.data?.message || error.response?.data.errMsg || "Unknown error"
//           }`
//         );
//       }
//     },
//   });

//   useEffect(() => {
//     if (!collegeId) return;

//     const fetchInfrastructure = async () => {
//       try {
//         const { data } = await axios.get(
//           `${API_BASE_URL}/api/college/infrastructure/${collegeId}`
//         );

//         if (data?.usrMsg?.infrastructure) {
//           setInfrastructures(data.usrMsg.infrastructure);
//         } else {
//           console.warn("No infrastructure data found.");
//           setInfrastructures([]);
//         }
//       } catch (error) {
//         console.error("Error fetching infrastructure data:", error);
//         setInfrastructures([]);
//       }
//     };

//     fetchInfrastructure();
//   }, [collegeId]);

//   const handleEdit = (index) => {
//     const infra = infrastructures[index];
//     formik.setValues({
//       campusArea: infra.campusArea || "",
//       numberOfClassrooms: infra.numberOfClassrooms?.toString() || "",
//       numberOfLabs: infra.numberOfLabs?.toString() || "",
//       sportsFacilities: infra.sportsFacilities || [],
//       hostelAvailability: infra.hostelAvailability || false,
//       hostelDetails: infra.hostelDetails || "",
//       canteenAndFoodServices: infra.canteenAndFoodServices || false,
//       medicalFacilities: infra.medicalFacilities || false,
//       transportFacility: infra.transportFacility || [],
//       library: infra.library?.size || "",
//     });

//     console.log("********",library);
//     setCurrentInfraIndex(index);
//   };

//   const handleDelete = async (index) => {
//     if (!collegeId) {
//       alert("College ID is missing!");
//       return;
//     }

//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this infrastructure data?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const updatedInfrastructures = infrastructures.filter((_, i) => i !== index);

//       const response = await axios.put(
//         `${API_BASE_URL}/api/college/infrastructure/${collegeId}`,
//         { infrastructure: updatedInfrastructures }
//       );

//       setInfrastructures(updatedInfrastructures);
//       alert("Infrastructure details deleted!");

//       if (currentInfraIndex === index) {
//         formik.resetForm();
//         setCurrentInfraIndex(-1);
//       }
//     } catch (error) {
//       console.error("Error deleting infrastructure:", error);
//       alert("Failed to delete infrastructure details.");
//     }
//   };

//   const handleAddNew = () => {
//     formik.resetForm();
//     setCurrentInfraIndex(-1);
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="relative w-[90%] max-w-[1200px] bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 mt-6 md:mt-10 rounded-lg shadow-xl border border-blue-200">
//         <button
//           onClick={() => navigate("/colleges")}
//           className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold transition-transform transform hover:scale-110 cursor-pointer"
//         >
//           &times;
//         </button>

//         <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">
//           {currentInfraIndex === -1 ? "🏗️ Add New Infrastructure" : "🏛️ Edit Infrastructure"}
//         </h2>

//         {/* Infrastructure List */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-blue-700 mb-4">Existing Infrastructure Entries</h3>
//           {infrastructures.length === 0 ? (
//             <p className="text-gray-500">No infrastructure entries yet</p>
//           ) : (
//             <div className="space-y-4">
//               {infrastructures.map((infra, index) => (
//                 <div key={index} className="bg-white p-4 rounded-lg shadow border border-blue-100">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h4 className="font-medium text-blue-800">
//                         {infra.campusArea || `Infrastructure #${index + 1}`}
//                       </h4>
//                       <p className="text-sm text-gray-600">
//                         {infra.numberOfClassrooms} Classrooms • {infra.numberOfLabs} Labs •
//                         {infra.hostelAvailability ? " Hostel Available" : " No Hostel"}
//                       </p>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(index)}
//                         className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(index)}
//                         className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Add New Button */}
//         <button
//           onClick={handleAddNew}
//           className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//         >
//           + Add New Infrastructure
//         </button>

//         {/* Infrastructure Form */}
//         {currentInfraIndex !== null && (
//           <form onSubmit={formik.handleSubmit} className="space-y-4">
//             {/* Campus Area */}
//             <div>
//               <label className="block text-lg text-blue-700 font-medium mb-1">
//                 Campus Area:
//               </label>
//               <input
//                 id="campusArea"
//                 type="text"
//                 name="campusArea"
//                 value={formik.values.campusArea}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
//                 placeholder="E.g. 250+ Acres"
//               />
//               {formik.touched.campusArea && formik.errors.campusArea && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.campusArea}
//                 </p>
//               )}
//             </div>

//             {/* Classrooms & Labs */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-lg text-blue-700 font-medium mb-1">
//                   Number of Classrooms:
//                 </label>
//                 <input
//                   id="numberOfClassrooms"
//                   type="number"
//                   name="numberOfClassrooms"
//                   value={formik.values.numberOfClassrooms}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
//                   placeholder="0"
//                 />
//                 {formik.touched.numberOfClassrooms &&
//                   formik.errors.numberOfClassrooms && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {formik.errors.numberOfClassrooms}
//                     </p>
//                   )}
//               </div>

//               <div>
//                 <label className="block text-lg text-blue-700 font-medium mb-1">
//                   Number of Labs:
//                 </label>
//                 <input
//                   id="numberOfLabs"
//                   type="number"
//                   name="numberOfLabs"
//                   value={formik.values.numberOfLabs}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
//                   placeholder="0"
//                 />
//                 {formik.touched.numberOfLabs && formik.errors.numberOfLabs && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {formik.errors.numberOfLabs}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Sports Facilities */}
//             <div>
//               <label className="block text-lg text-blue-700 font-medium mb-1">
//                 Sports Facilities Available:
//               </label>
//               <div className="flex gap-4">
//                 <label>
//                   <input
//                     id="sportsFacilities"
//                     type="checkbox"
//                     name="sportsFacilities"
//                     value="Indoor"
//                     checked={formik.values.sportsFacilities.includes("Indoor")}
//                     onChange={() => {
//                       formik.setFieldValue(
//                         "sportsFacilities",
//                         formik.values.sportsFacilities.includes("Indoor")
//                           ? formik.values.sportsFacilities.filter(
//                               (item) => item !== "Indoor"
//                             )
//                           : [...formik.values.sportsFacilities, "Indoor"]
//                       );
//                     }}
//                   />
//                   <span className="ml-2">Indoor</span>
//                 </label>

//                 <label>
//                   <input
//                     type="checkbox"
//                     name="sportsFacilities"
//                     value="Outdoor"
//                     checked={formik.values.sportsFacilities.includes("Outdoor")}
//                     onChange={() => {
//                       formik.setFieldValue(
//                         "sportsFacilities",
//                         formik.values.sportsFacilities.includes("Outdoor")
//                           ? formik.values.sportsFacilities.filter(
//                               (item) => item !== "Outdoor"
//                             )
//                           : [...formik.values.sportsFacilities, "Outdoor"]
//                       );
//                     }}
//                   />
//                   <span className="ml-2">Outdoor</span>
//                 </label>
//               </div>
//               {formik.touched.sportsFacilities &&
//               formik.errors.sportsFacilities ? (
//                 <div className="text-red-500 text-sm mt-1">
//                   {formik.errors.sportsFacilities}
//                 </div>
//               ) : null}
//             </div>

//             {/* Library Section */}
//             <div>
//               <label className="block text-lg text-blue-700 font-medium mb-1">
//                 Library:
//               </label>
//               <input
//                 type="text"
//                 name="library"
//                 value={formik.values.library || ""}
//                 onChange={formik.handleChange}
//                 className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
//                 placeholder="eg. Books, Digital Access, Research Papers"
//               />
//               {formik.touched.library && formik.errors.library && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {formik.errors.library}
//                 </p>
//               )}
//             </div>

//             {/* Hostel Availability */}
//             <div>
//               <label className="block text-lg text-blue-700 font-medium mb-1">
//                 Hostel Availability:
//               </label>
//               <select
//                 id="hostelAvailability"
//                 name="hostelAvailability"
//                 value={formik.values.hostelAvailability}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
//               >
//                 <option value="" disabled hidden>
//                   Select
//                 </option>
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//               {formik.touched.hostelAvailability &&
//                 formik.errors.hostelAvailability && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {formik.errors.hostelAvailability}
//                   </p>
//                 )}
//             </div>

//             {/* Hostel Details */}
//             {formik.values.hostelAvailability === "true" && (
//               <div>
//                 <label className="block text-lg text-blue-700 font-medium mb-1">
//                   Hostel Details:
//                 </label>
//                 <input
//                   id="hostelDetails"
//                   type="text"
//                   name="hostelDetails"
//                   value={formik.values.hostelDetails}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
//                   placeholder="eg. Separate for Boys & Girls"
//                 />
//                 {formik.touched.hostelDetails && formik.errors.hostelDetails && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {formik.errors.hostelDetails}
//                   </p>
//                 )}
//               </div>
//             )}

//             <div className="grid grid-cols-2 gap-6">
//               {/* Canteen & Medical Facilities */}
//               <div>
//                 <label className="block text-lg text-blue-700 font-medium mb-1">
//                   Canteen and Food Services:
//                 </label>
//                 <select
//                   name="canteenAndFoodServices"
//                   {...formik.getFieldProps("canteenAndFoodServices")}
//                   className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
//                 >
//                   <option value="" disabled hidden>
//                     Select
//                   </option>
//                   <option value="true">Available</option>
//                   <option value="false">Not Available</option>
//                 </select>
//                 {formik.touched.canteenAndFoodServices &&
//                 formik.errors.canteenAndFoodServices ? (
//                   <div className="text-red-500 text-sm mt-1">
//                     {formik.errors.canteenAndFoodServices}
//                   </div>
//                 ) : null}
//               </div>

//               <div>
//                 <label className="block text-lg text-blue-700 font-medium mb-1">
//                   Medical Facilities:
//                 </label>
//                 <select
//                   name="medicalFacilities"
//                   {...formik.getFieldProps("medicalFacilities")}
//                   className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
//                 >
//                   <option value="" disabled hidden>
//                     Select
//                   </option>
//                   <option value="true">Available</option>
//                   <option value="false">Not Available</option>
//                 </select>
//                 {formik.touched.medicalFacilities &&
//                 formik.errors.medicalFacilities ? (
//                   <div className="text-red-500 text-sm mt-1">
//                     {formik.errors.medicalFacilities}
//                   </div>
//                 ) : null}
//               </div>
//             </div>

//             {/* Transport Facility */}
//             <div>
//               <label className="block text-lg text-blue-700 font-medium mb-1">
//                 Transport Facilities:
//               </label>
//               <div className="flex gap-4 text-md">
//                 {["University Bus", "Public Transport Nearby"].map((option) => (
//                   <label key={option}>
//                     <input
//                       id="transportFacility"
//                       type="checkbox"
//                       name="transportFacility"
//                       value={option}
//                       checked={formik.values.transportFacility.includes(option)}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         formik.setFieldValue(
//                           "transportFacility",
//                           formik.values.transportFacility.includes(value)
//                             ? formik.values.transportFacility.filter(
//                                 (item) => item !== value
//                               )
//                             : [...formik.values.transportFacility, value]
//                         );
//                       }}
//                     />
//                     <span className="ml-2">{option}</span>
//                   </label>
//                 ))}
//               </div>
//               {formik.touched.transportFacility &&
//               formik.errors.transportFacility ? (
//                 <div className="text-red-500 text-sm mt-1">
//                   {formik.errors.transportFacility}
//                 </div>
//               ) : null}
//             </div>

//             <div className="flex mt-4 justify-end gap-5">
//               <button
//                 type="submit"
//                 className="w-30 bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
//               >
//                 {currentInfraIndex === -1 ? "Add" : "Update"}
//               </button>

//               {currentInfraIndex !== -1 && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     formik.resetForm();
//                     setCurrentInfraIndex(-1);
//                   }}
//                   className="bg-gray-500 text-white w-25 px-4 py-2 rounded-lg justify-end hover:bg-gray-600 transition duration-300 cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Infrastructure;
