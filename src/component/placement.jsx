import React, { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../utlis/cookieHelper";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Placement = () => {
  const defaultPlacement = {
    placementPercentage: "",
    highestPackage: "",
    internshipOpportunities: false,
    topRecruiters: "",
    noOfStudents: "",
  };

  const { collegeId: collegeIdFromParams } = useParams();
  const [placements, setPlacements] = useState([{ ...defaultPlacement }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [collegeId, setCollegeId] = useState(null);
  const navigate = useNavigate();

  const role = Cookies.get("role");
  const subrole = Cookies.get("subrole");

  const validationSchema = Yup.object().shape({
    placements: Yup.array().of(
      Yup.object().shape({
        placementPercentage: Yup.number()
          .min(1, "Min 1%")
          .max(100, "Max 100%")
          .required("Required"),
        highestPackage: Yup.number().min(1, "Min 1 LPA").required("Required"),
        noOfStudents: Yup.number().min(1).required("Required"),
        topRecruiters: Yup.string().required("Top recruiters required"),
        internshipOpportunities: Yup.boolean(),
      })
    ),
  });

  useEffect(() => {
    const collegeIdFromCookie = getCookie("collegeID");
    const id = collegeIdFromParams || collegeIdFromCookie;

    if (id) {
      setCollegeId(id);
      if (role === "ADMIN" && collegeIdFromParams) {
        Cookies.set("collegeID", id, { expires: 1 });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "College ID Missing",
        text: "Please select a college first",
      });
      navigate(role === "ADMIN" ? "/colleges" : "/vendor-college");
    }
  }, [collegeIdFromParams, role, navigate]);

  useEffect(() => {
    if (!collegeId) return;

    const fetchPlacements = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/college/placement/${collegeId}`
        );
        const placementData = response.data?.data?.placement || [];
        const formattedPlacements = placementData.map((item) => ({
          placementPercentage: item.placementPercentage?.toString() || "",
          highestPackage: item.highestPackage?.toString() || "",
          topRecruiters: item.topRecruiters || "",
          internshipOpportunities: Boolean(item.internshipOpportunities),
          noOfStudents: item.noOfStudents?.toString() || "",
        }));

        setPlacements(
          formattedPlacements.length > 0
            ? formattedPlacements
            : [{ ...defaultPlacement }]
        );
      } catch (error) {
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
      Swal.fire({
        icon: "info",
        title: "No Entries Found",
        text: "There are no placement entries to remove. Please add at least one before attempting to delete.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    setPlacements(placements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        collegeId,
        placement: values.placements.map((p) => ({
          placementPercentage: Number(p.placementPercentage),
          highestPackage: Number(p.highestPackage),
          topRecruiters: p.topRecruiters,
          internshipOpportunities: p.internshipOpportunities,
          noOfStudents: Number(p.noOfStudents),
        })),
      };

      const isUpdate = placements.some((p) => p.placementPercentage !== "");
      const url = isUpdate
        ? `${API_BASE_URL}/api/college/placement/${collegeId}`
        : `${API_BASE_URL}/api/college/placement`;
      const method = isUpdate ? "put" : "post";

      const response = await axios({ method, url, data: payload });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Placement details saved successfully!",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.errMsg ||
        error.response?.data?.usrMsg ||
        "Failed to save placement details";
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: errorMsg,
        confirmButtonColor: "#d33",
      });
      setError(errorMsg);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section className="p-8 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-2xl border border-blue-200 max-w-6xl mx-auto relative">
      {role === "ADMIN" && (
        <button
          onClick={() => navigate("/colleges")}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-3xl font-extrabold cursor-pointer"
          title="Close"
        >
          &times;
        </button>
      )}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-blue-800 flex items-center gap-2">
          📊 Placement Details
        </h2>
      </div>

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
                className="relative grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md border border-blue-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="col-span-full text-xl font-bold text-blue-700 mb-2">
                  🎓 Entry {index + 1}
                </h4>

                <div>
                  <label className="font-semibold text-blue-700">
                    Placement Percentage (%)
                  </label>
                  <Field
                    type="number"
                    name={`placements[${index}].placementPercentage`}
                    placeholder="Enter %"
                    className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name={`placements[${index}].placementPercentage`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-blue-700">
                    Highest Package (LPA)
                  </label>
                  <Field
                    type="number"
                    name={`placements[${index}].highestPackage`}
                    className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. 12"
                  />
                  <ErrorMessage
                    name={`placements[${index}].highestPackage`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-blue-700">
                    Top Recruiters
                  </label>
                  <Field
                    type="text"
                    name={`placements[${index}].topRecruiters`}
                    placeholder="e.g., TCS, Infosys"
                    className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name={`placements[${index}].topRecruiters`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-blue-700">
                    No. of Students Placed
                  </label>
                  <Field
                    type="number"
                    name={`placements[${index}].noOfStudents`}
                    className="w-full px-4 py-2 mt-1 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. 100"
                  />
                  <ErrorMessage
                    name={`placements[${index}].noOfStudents`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="col-span-full flex items-center gap-3 mt-2">
                  <Field
                    type="checkbox"
                    name={`placements[${index}].internshipOpportunities`}
                    className="w-5 h-5 accent-blue-600 rounded"
                  />
                  <label className="font-medium text-blue-700">
                    Internship Opportunities Available?
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => removePlacement(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  title="Remove Entry"
                >
                  <Trash size={20} />
                </button>
              </motion.div>
            ))}

            <div className="flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={addPlacement}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-2 rounded-full flex items-center gap-2 hover:shadow-md hover:scale-105 transition-transform"
              >
                <Plus size={20} />
                Add More
              </button>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-transform"
              >
                {loading ? "Saving..." : "Save Placement"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Placement;
