import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Infrastructure() {
  const { collegeId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const validationSchema = Yup.object({
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

    library: Yup.string().required("Library details are required"), // ✅ Validation added
  });

  const formik = useFormik({
    initialValues: {
      campusArea: "",
      numberOfClassrooms: "", // Will convert to number on submit
      numberOfLabs: "", // Will convert to number on submit
      sportsFacilities: [],
      hostelAvailability: false,
      hostelDetails: "",
      canteenAndFoodServices: false,
      medicalFacilities: false,
      transportFacility: [],
      library: "", // ✅ New field for Library
    },

    validationSchema,

    onSubmit: async (values) => {
      try {
        if (!collegeId) {
          alert("Error: College ID is missing.");
          return;
        }

        // Prepare formatted data
        const formattedData = {
          collegeId,
          campusArea: values.campusArea || "",
          numberOfClassrooms: parseInt(values.numberOfClassrooms) || 0,
          numberOfLabs: parseInt(values.numberOfLabs) || 0,
          sportsFacilities: values.sportsFacilities || [],
          hostelAvailability: values.hostelAvailability,
          canteenAndFoodServices: values.canteenAndFoodServices,
          medicalFacilities: values.medicalFacilities,
          transportFacility: values.transportFacility || [],
          library: { size: values.library || "" },
        };

        // ✅ Remove hostelDetails if hostelAvailability is false OR empty
        if (values.hostelAvailability && values.hostelDetails) {
          formattedData.hostelDetails = values.hostelDetails;
        }

        const isUpdating = isEditing;
        const url = isUpdating
          ? `${API_BASE_URL}/api/college/infrastructure/${collegeId}`
          : `${API_BASE_URL}/api/college/infrastructure`;

        const methodType = isUpdating ? "put" : "post";

        const response = await axios({
          method: methodType,
          url,
          data: formattedData,
        });

        console.log("✅ Infrastructure details saved:", response.data);
        alert("Infrastructure details saved!");
      } catch (error) {
        console.error(
          "Error saving infrastructure:",
          error.response?.data || error.message
        );
        alert(
          `Failed to save infrastructure details. Please try again. ${
            error.response?.data?.message ||  error.response?.data.errMsg || "Unknown error"
          }`
        );
      }
    },
  });

  useEffect(() => {
    if (!collegeId) return;

    const fetchInfrastructure = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/college/infrastructure/${collegeId}`
        );

        if (data?.usrMsg) {
          const infraData = data.usrMsg;

          formik.setValues({
            campusArea: infraData.campusArea || "",
            numberOfClassrooms: infraData.numberOfClassrooms?.toString() || "",
            numberOfLabs: infraData.numberOfLabs?.toString() || "",
            sportsFacilities: infraData.sportsFacilities || [],
            hostelAvailability: infraData.hostelAvailability || false,
            hostelDetails: infraData.hostelDetails || "",
            canteenAndFoodServices: infraData.canteenAndFoodServices || false,
            medicalFacilities: infraData.medicalFacilities || false,
            transportFacility: infraData.transportFacility || [],
            library: infraData.library?.size || "", // ✅ Fetching library data
          });

          setIsEditing(true);
        } else {
          console.warn("No infrastructure data found.");
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Error fetching infrastructure data:", error);
      }
    };

    fetchInfrastructure();
  }, [collegeId]);

  const handleDelete = async () => {
    if (!collegeId) {
      alert("College ID is missing!");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this infrastructure data?"
    );
    if (!confirmDelete) return;

    try {
      // No API call needed, just clearing the form
      alert("Infrastructure details deleted!");

      // Clear form using Formik
      formik.setValues({
        campusArea: "",
        numberOfClassrooms: 0,
        numberOfLabs: 0,
        sportsFacilities: [],
        hostelAvailability: "false",
        hostelDetails: "",
        canteenAndFoodServices: "false",
        medicalFacilities: "false",
        transportFacility: [],
        library: "",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error deleting infrastructure:", error);
      alert("Failed to delete infrastructure details.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-[90%] max-w-[1200px]  bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 mt-6 md:mt-10 rounded-lg shadow-xl border border-blue-200">
        {/* Close Button (X) */}
        <button
          onClick={() => navigate("/colleges")} // Navigate to CollegeTableDetails page
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold transition-transform transform hover:scale-110 cursor-pointer"
        >
          &times; {/* Unicode 'X' symbol */}
        </button>
        <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">
          {isEditing
            ? "🏛️ Edit Infrastructure Details"
            : "🏗️ Add Infrastructure Details"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Campus Area */}
          <div>
            <label
              // htmlFor="campusArea"
              className="block text-lg text-blue-700 font-medium mb-1 "
            >
              Campus Area:
            </label>
            <input
              id="campusArea"
              type="text"
              name="campusArea"
              value={formik.values.campusArea}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
              placeholder="E.g. 250+ Acres"
            />
            {formik.touched.campusArea && formik.errors.campusArea && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.campusArea}
              </p>
            )}
          </div>

          {/* Classrooms & Labs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                // htmlFor="numberOfClassrooms"
                className="block text-lg text-blue-700 font-medium mb-1"
              >
                Number of Classrooms:
              </label>
              <input
                id="numberOfClassrooms"
                type="number"
                name="numberOfClassrooms"
                value={formik.values.numberOfClassrooms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
                placeholder="0"
              />
              {formik.touched.numberOfClassrooms &&
                formik.errors.numberOfClassrooms && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.numberOfClassrooms}
                  </p>
                )}
            </div>

            {/* Number of Labs */}
            <div>
              <label
                // htmlFor="numberOfLabs"
                className="block text-lg text-blue-700 font-medium mb-1"
              >
                Number of Labs:
              </label>
              <input
                id="numberOfLabs"
                type="number"
                name="numberOfLabs"
                value={formik.values.numberOfLabs}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
                placeholder="0"
              />
              {formik.touched.numberOfLabs && formik.errors.numberOfLabs && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.numberOfLabs}
                </p>
              )}
            </div>
          </div>

          {/* Sports Facilities */}
          <div>
            <label
              // htmlFor="sportsFacilities"
              className="block text-lg text-blue-700 font-medium mb-1"
            >
              Sports Facilities Available:
            </label>
            <div className="flex gap-4">
              <label>
                <input
                  id="sportsFacilities"
                  type="checkbox"
                  name="sportsFacilities"
                  value="Indoor"
                  checked={formik.values.sportsFacilities.includes("Indoor")}
                  onChange={() => {
                    formik.setFieldValue(
                      "sportsFacilities",
                      formik.values.sportsFacilities.includes("Indoor")
                        ? formik.values.sportsFacilities.filter(
                            (item) => item !== "Indoor"
                          )
                        : [...formik.values.sportsFacilities, "Indoor"]
                    );
                  }}
                  // checked={
                  //   Array.isArray(formData.sportsFacilities) &&
                  //   formData.sportsFacilities.includes("Indoor")
                  // }
                  // onChange={handleChange}
                />
                <span className="ml-2">Indoor</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="sportsFacilities"
                  value="Outdoor"
                  checked={formik.values.sportsFacilities.includes("Outdoor")}
                  onChange={() => {
                    formik.setFieldValue(
                      "sportsFacilities",
                      formik.values.sportsFacilities.includes("Outdoor")
                        ? formik.values.sportsFacilities.filter(
                            (item) => item !== "Outdoor"
                          )
                        : [...formik.values.sportsFacilities, "Outdoor"]
                    );
                  }}
                />
                <span className="ml-2">Outdoor</span>
              </label>
            </div>
            {formik.touched.sportsFacilities &&
            formik.errors.sportsFacilities ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.sportsFacilities}
              </div>
            ) : null}
          </div>

          {/* Library Section */}
          <div>
            <label className="block text-lg text-blue-700 font-medium mb-1">
              Library:
            </label>
            <input
              type="text"
              name="library"
              value={formik.values.library || ""}
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
              placeholder="eg. Books, Digital Access, Research Papers"
            />
            {formik.touched.library && formik.errors.library && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.library}
              </p>
            )}
          </div>

          {/* Hostel Availability */}
          <div>
            <label
              // htmlFor="hostelAvailability"
              className="block text-lg text-blue-700 font-medium mb-1"
            >
              Hostel Availability:
            </label>
            <select
              id="hostelAvailability"
              name="hostelAvailability"
              value={formik.values.hostelAvailability}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {formik.touched.hostelAvailability &&
              formik.errors.hostelAvailability && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.hostelAvailability}
                </p>
              )}
          </div>

          {/* Hostel Details */}
          {formik.values.hostelAvailability === "true" && (
            <div>
              <label
                // htmlFor="hostelDetails"
                className="block text-lg text-blue-700 font-medium mb-1"
              >
                Hostel Details:
              </label>
              <input
                id="hostelDetails"
                type="text"
                name="hostelDetails"
                value={formik.values.hostelDetails}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
                placeholder="eg. Separate for Boys & Girls"
              />
              {formik.touched.hostelDetails && formik.errors.hostelDetails && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.hostelDetails}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            {/* Canteen & Medical Facilities */}
            <div>
              <label
                // htmlFor="canteenAndFoodServices"
                className="block text-lg text-blue-700 font-medium mb-1"
              >
                Canteen and Food Services:
              </label>
              <select
                name="canteenAndFoodServices"
                {...formik.getFieldProps("canteenAndFoodServices")}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
              {formik.touched.canteenAndFoodServices &&
              formik.errors.canteenAndFoodServices ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.canteenAndFoodServices}
                </div>
              ) : null}
            </div>

            <div>
              <label
                // htmlFor="medicalFacilities"
                className="block text-lg text-blue-700 font-medium mb-1"
              >
                Medical Facilities:
              </label>
              <select
                name="medicalFacilities"
                {...formik.getFieldProps("medicalFacilities")}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-blue-50 focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
              {formik.touched.medicalFacilities &&
              formik.errors.medicalFacilities ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.medicalFacilities}
                </div>
              ) : null}
            </div>
          </div>

          {/* Transport Facility */}
          <div>
            <label
              // htmlFor="transportFacility"
              className="block text-lg text-blue-700 font-medium mb-1"
            >
              Transport Facilities:
            </label>
            <div className="flex gap-4 text-md">
              {["University Bus", "Public Transport Nearby"].map((option) => (
                <label key={option}>
                  <input
                    id="transportFacility"
                    type="checkbox"
                    name="transportFacility"
                    value={option}
                    checked={formik.values.transportFacility.includes(option)}
                    onChange={(e) => {
                      const value = e.target.value;
                      formik.setFieldValue(
                        "transportFacility",
                        formik.values.transportFacility.includes(value)
                          ? formik.values.transportFacility.filter(
                              (item) => item !== value
                            )
                          : [...formik.values.transportFacility, value]
                      );
                    }}
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
            {formik.touched.transportFacility &&
            formik.errors.transportFacility ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.transportFacility}
              </div>
            ) : null}
          </div>

          <div className="flex mt-4 justify-end gap-5">
            {/* Submit Button */}
            <button
              type="submit"
              className="w-30 bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
            >
              {isEditing ? "Update" : "Add "}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white w-25 px-4 py-2 rounded-lg justify-end hover:bg-red-600 transition duration-300 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Infrastructure;
