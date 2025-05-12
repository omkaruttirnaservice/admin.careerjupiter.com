import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UniversityInfrastructure() {
  const { universityId } = useParams();
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
    //   is: true,
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
      numberOfClassrooms: "",
      numberOfLabs: "",
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
        if (!universityId) {
          alert("Error: University ID is missing.");
          return;
        }

        // Prepare formatted data
        const formattedData = {
          universityId,
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
          ? `${API_BASE_URL}/api/university/infrastructure/${universityId}`
          : `${API_BASE_URL}/api/university/infrastructure/`;

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
            error.response?.data?.message ||  error.response?.data.errMessage || "Unknown error"
          }`
        );
      }
    },
  });

  useEffect(() => {
    if (!universityId) return;

    const fetchInfrastructure = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/university/infrastructure/${universityId}`
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
  }, [universityId]);

  const handleDelete = async () => {
    if (!universityId) {
      alert("University ID is missing!");
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
    <div className="flex justify-center ">
    <div className="relative w-[90%] max-w-[1200px] bg-blue-100 p-6 mt-10 rounded-lg shadow-lg">
       {/* Close Button (X) */}
       <button
        onClick={() => navigate("/university-details")} // Navigate to CollegeTableDetails page
        className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-xl font-bold cursor-pointer"
      >
        &times; {/* Unicode 'X' symbol */}
      </button>

      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        {isEditing
          ? "Edit University Infrastructure"
          : "Add University Infrastructure"}
      </h2>
       
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-blue-700 font-medium">
            Campus Area:
          </label>
          <input
            type="text"
            name="campusArea"
            value={formik.values.campusArea}
            onChange={formik.handleChange}
            className="w-full p-2 border border-blue-300 rounded-lg"
            placeholder="eg. 250 Acres"
          />
          {formik.touched.campusArea && formik.errors.campusArea && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.campusArea}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-700 font-medium">
              Classrooms:
            </label>
            <input
              type="number"
              name="numberOfClassrooms"
              value={formik.values.numberOfClassrooms}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="0"
            />
            {formik.touched.numberOfClassrooms &&
              formik.errors.numberOfClassrooms && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.numberOfClassrooms}
                </p>
              )}
          </div>

          <div>
            <label className="block text-blue-700 font-medium">Labs:</label>
            <input
              type="number"
              name="numberOfLabs"
              value={formik.values.numberOfLabs}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="0"
            />
            {formik.touched.numberOfLabs && formik.errors.numberOfLabs && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.numberOfLabs}
              </p>
            )}
          </div>
        </div>

        {/* Library Section */}
        <div>
          <label className="block text-blue-700 font-medium">Library:</label>
          <input
            type="text"
            name="library"
            value={formik.values.library || ""}
            onChange={formik.handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="eg. Books, Digital Access, Research Papers"
          />
          {formik.touched.library && formik.errors.library && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.library}</p>
          )}
        </div>

        {/* Sports Facilities */}
        <div>
          <label className="block text-blue-700 font-medium">
            Sports Facilities:
          </label>
          <div className="flex gap-4">
            {["Indoor", "Outdoor"].map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={formik.values.sportsFacilities.includes(option)}
                  onChange={() => {
                    const updatedFacilities =
                      formik.values.sportsFacilities.includes(option)
                        ? formik.values.sportsFacilities.filter(
                            (item) => item !== option
                          )
                        : [...formik.values.sportsFacilities, option];
                    formik.setFieldValue("sportsFacilities", updatedFacilities);
                  }}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
          {formik.touched.sportsFacilities && formik.errors.sportsFacilities ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.sportsFacilities}
            </div>
          ) : null}
        </div>

        <div>
          <label className="block text-blue-700 font-medium">
            Hostel Availability:
          </label>
          <select
            name="hostelAvailability"
            value={formik.values.hostelAvailability.toString()}
            onChange={(e) =>
              formik.setFieldValue(
                "hostelAvailability",
                e.target.value === "true"
              )
            }
            className="w-full p-2 border rounded-lg"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          {formik.touched.hostelAvailability &&
            formik.errors.hostelAvailability && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.hostelAvailability}
              </p>
            )}
        </div>

        {formik.values.hostelAvailability && (
          <div>
            <label className="block text-blue-700 font-medium">
              Hostel Details:
            </label>
            <input
              type="text"
              name="hostelDetails"
              value={formik.values.hostelDetails}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="eg. Separate for Boys & Girls"
            />
            {formik.touched.hostelDetails && formik.errors.hostelDetails && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.hostelDetails}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-blue-700 font-medium">
            Canteen Availability:
          </label>
          <select
            name="canteenAndFoodServices"
            value={formik.values.canteenAndFoodServices.toString()}
            onChange={(e) =>
              formik.setFieldValue(
                "canteenAndFoodServices",
                e.target.value === "true"
              )
            }
            className="w-full p-2 border rounded-lg"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          {formik.touched.canteenAndFoodServices &&
          formik.errors.canteenAndFoodServices ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.canteenAndFoodServices}
            </div>
          ) : null}
        </div>

        {/* Medical Facilities */}
        <div>
          <label className="block text-blue-700 font-medium">
            Medical Facilities:
          </label>
          <select
            name="medicalFacilities"
            value={formik.values.medicalFacilities.toString()}
            onChange={(e) =>
              formik.setFieldValue(
                "medicalFacilities",
                e.target.value === "true"
              )
            }
            className="w-full p-2 border rounded-lg"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          {formik.touched.medicalFacilities &&
          formik.errors.medicalFacilities ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.medicalFacilities}
            </div>
          ) : null}
        </div>

        {/* Transport Facility */}
        <div>
          <label className="block text-blue-700 font-medium">
            Transport Facilities:
          </label>
          <div className="flex gap-4">
            {["University Bus", "Public Transport Nearby"].map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={formik.values.transportFacility.includes(option)}
                  onChange={() => {
                    const updatedTransport =
                      formik.values.transportFacility.includes(option)
                        ? formik.values.transportFacility.filter(
                            (item) => item !== option
                          )
                        : [...formik.values.transportFacility, option];
                    formik.setFieldValue("transportFacility", updatedTransport);
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
          <button
            type="submit"
            className="w-30 bg-blue-600 text-white font-semibold p-2 rounded-lg cursor-pointer"
          >
            {isEditing ? "Update" : "Add"}
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

export default UniversityInfrastructure;
