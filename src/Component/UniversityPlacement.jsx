import React, { useEffect, useState } from "react";
import { useFormik } from "formik"; // ✅ Import Formik
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function UniversityPlacement() {
  const defaultValues = {
    placementPercentage: "",
    highestPackage: "",
    internshipOpportunities: false,
    topRecruiters: [],
  };

    const formik = useFormik({
      initialValues: defaultValues,  });

  const { universityId } = useParams(); // Get universityId from URL
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Initialize navigation


  // **Validation Schema using Yup**
  const validationSchema = Yup.object().shape({
    placementPercentage: Yup.number()
      .min(1, "Required")
      .max(100, "Cannot exceed 100")
      .required("Placement percentage is required"),
    highestPackage: Yup.number()
      .min(1, "Required")
      .typeError("Highest package must be a number")
      .required("Highest package is required"),
    topRecruiters: Yup.array()
      .of(Yup.string().required("Recruiter name cannot be empty"))
      .min(1, "At least one recruiter is required")
      .required("Top recruiters are required"),
  });

  // **Fetch Placement Data**
  useEffect(() => {
    if (!universityId) return;

    const fetchPlacement = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/university/placement/${universityId}`
        );
        if (response.data && response.data.usrMsg) {
          const placementData = response.data.usrMsg;
          setInitialValues({
            placementPercentage: String(placementData.placementPercentage || ""),
            highestPackage: String(placementData.highestPackage || ""),
            topRecruiters: Array.isArray(placementData.topRecruiters)
              ? placementData.topRecruiters
              : [], // ✅ Ensure it's always an array
            internshipOpportunities:
              placementData.internshipOpportunities || false,
          });
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Error fetching placement data:", error);
      }
    };

    fetchPlacement();
  }, [universityId]);

  // **Handle Submit**
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const url = isEditing
        ? `${API_BASE_URL}/api/university/placement/${universityId}`
        : `${API_BASE_URL}/api/university/placement/`;
      const method = isEditing ? "put" : "post";

      await axios({
        method,
        url,
        data: {
          universityId,
          ...values,
          topRecruiters: values.topRecruiters.filter(
            (item) => item.trim() !== ""
          ), // ✅ Ensure it's a valid array
        },
      });

      console.log("Placement details saved successfully.");
      alert("Placement details saved!");
    } catch (error) {
      console.error(
        "Error saving placement details:",
        error.response?.data || error.message
      );
      alert("Failed to save placement details.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (resetForm) => {
    if (!universityId) {
      alert("University ID is missing!");
      return;
    }
  
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this placement data?"
    );
    if (!confirmDelete) return;
  
    try {
      // No API call needed, just clearing the form
      alert("Placement details deleted!");
  
      // Clear form using Formik
   resetForm({
    values: defaultValues,
   });
  
   
    // ✅ Ensure initialValues are reset to default to prevent reloading old data
    setInitialValues({ ...defaultValues });

      setIsEditing(false);
    } catch (error) {
      console.error("Error deleting placement details:", error);
      alert("Failed to delete placement details.");
    }
  };
  return (
    <div className="flex justify-center">
    <div className="relative w-[90%] max-w-[1200px]  mx-auto bg-blue-100 p-6 mt-10 rounded-lg shadow-lg">
       {/* Close Button (X) */}
    <button
      onClick={() => navigate("/university-details")}
      className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-xl font-bold cursor-pointer"
    >
      &times; {/* Unicode 'X' symbol */}
    </button>
    
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">
        {isEditing
          ? "Edit University Placement Details"
          : "Add University Placement Details"}
      </h2>

      {/* Formik Form */}
      <Formik
      key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form className="space-y-4">
            {/* Placement Percentage */}
            <div>
              <label className="block text-blue-700 font-medium">
                Placement Percentage:
              </label>
              <Field
                type="number"
                name="placementPercentage"
                className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
                placeholder="0"
              />
              <ErrorMessage
                name="placementPercentage"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Highest Package */}
            <div>
              <label className="block text-blue-700 font-medium">
                Highest Package (LPA):
              </label>
              <Field
                type="number"
                name="highestPackage"
                className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
                placeholder="eg 8.2"
              />
              <ErrorMessage
                name="highestPackage"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Internship Opportunities */}
            <div>
              <label className="block text-blue-700 font-medium">
                Internship Opportunities:
              </label>
              <Field type="checkbox" name="internshipOpportunities" />
              <span className="ml-2">Available</span>
            </div>

            {/* Top Recruiters */}
            <div>
              <label className="block text-blue-700 font-medium">
                Top Recruiters:
              </label>
              <Field name="topRecruiters">
                {({ field, form }) => (
                  <input
                    type="text"
                    value={field.value.join(", ")} // ✅ Convert array to a comma-separated string
                    onChange={(e) => {
                      const recruitersArray = e.target.value
                        .split(",")
                        .map((item) => item.trim());
                      form.setFieldValue("topRecruiters", recruitersArray); // ✅ Update as an array
                    }}
                    className="w-full p-2 border rounded-lg bg-blue-50 focus:ring focus:ring-blue-300"
                    placeholder="eg. Infosys, TCS, Bosch"
                  />
                )}
              </Field>
              <ErrorMessage
                name="topRecruiters"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex mt-4 justify-end gap-5">
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-30 bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                {isSubmitting ? "Saving..." : isEditing ? "Update" : "Add"}
              </button>

              {/* Clear Button (Resets Form) */}
              <button
                type="button"
                onClick={() => handleDelete(resetForm)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
}

export default UniversityPlacement;
