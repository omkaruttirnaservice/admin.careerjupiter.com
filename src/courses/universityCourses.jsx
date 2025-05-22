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
import Select from "react-select"; // For multi-select dropdown
import Cookies from "js-cookie";

const UniversityCourses = () => {
  const defaultCourse = {
    name: "",
    duration: "",
    annualFees: "",
    category: "",
    subCategory: [],
    eligibility: "",
    choiceCode: "", // ✅ missing
  };

  const [initialValues, setInitialValues] = useState({
    courses: [defaultCourse],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { universityId: universityIdFromParams } = useParams();
  const [universityId, setUniversityId] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const validationSchema = Yup.object().shape({
    courses: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Course name is required"),
        duration: Yup.string().required("Duration is required"),
        annualFees: Yup.number()
          .min(1, "Fees must be at least 1")
          .required("Annual fees are required"),
        category: Yup.string().required("Category is required"),
        subCategory: Yup.array()
          .min(1, "At least one branch is required")
          .required("Branch selection is required"),
        eligibility: Yup.string().required("Eligibility is required"),
        choiceCode: Yup.string().required("Choice Code is required"), // ✅ Add this
      })
    ),
  });

  // Get role and subrole
  const role = Cookies.get("role");
  const subrole = Cookies.get("subrole");

  // Fetch collegeId from cookie
  // useEffect(() => {
  //   const id = getCookie("collegeID");
  //   if (id) {
  //     setCollegeId(id);
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
      console.log("University ID for infrastructure:", id);
      // If admin is accessing, store the collegeId in cookie temporarily
      if (role === "ADMIN" && universityIdFromParams) {
         Cookies.set("universityID", id, { expires: 1 }); // Expires in 1 day
      }
    } else {
      console.warn("University ID not found!");
      Swal.fire({
        icon: "error",
        title: "University ID Missing",
        text: "Please select a University first",
      });
    navigate(role === "ADMIN" ? "/university" : "/vendor-college");
    }
  }, [universityIdFromParams, role, navigate]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/university/search/cat`
        );
        setCategoryData(response.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch university categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch courses when collegeId is available
  useEffect(() => {
    if (!universityId) return;

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/university/course/${universityId}`
        );
        const data = response.data.data?.courses?.[0]?.courses || [];

        console.log("Fetched course list:", data);

        if (data.length > 0) {
          const formattedCourses = data.map((course) => ({
            ...course,
            subCategory: Array.isArray(course.subCategory)
              ? course.subCategory
              : course.subCategory
              ? [course.subCategory]
              : [],
          }));

          setInitialValues({ courses: formattedCourses });
          setIsEditMode(true);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [universityId]);

  const getSubCategoryOptions = (category) => {
    const foundCategory = categoryData.find((cat) => cat.category === category);
    return foundCategory?.subCategory
      ? foundCategory.subCategory
          .filter(Boolean)
          .map((sub) => ({ value: sub, label: sub }))
      : [];
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError(null);

      const courseData = {
        universityId,
        courses: values.courses.map((course) => ({
          ...course,
          duration: Number(course.duration),
          annualFees: Number(course.annualFees),
          subCategory: course.subCategory,
        })),
      };

      const url = isEditMode
        ? `${API_BASE_URL}/api/university/course/${collegeId}`
        : `${API_BASE_URL}/api/university/course/create`;
      const method = isEditMode ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: courseData,
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Courses ${isEditMode ? "updated" : "created"} successfully.`,
        confirmButtonColor: "#3085d6",
      });

      setIsEditMode(true);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.errMsg ||
        error.response?.data?.usrMsg ||
        "Failed to save courses";
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
    <section className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 max-w-6xl mx-auto relative">
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
          📚 {isEditMode ? "Edit" : "Add"} Courses
        </h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            {values.courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-5 rounded-lg shadow-md border border-gray-200 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-blue-700">Course Name</label>
                    <Field
                      name={`courses.${index}.name`}
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                    />
                    <ErrorMessage
                      name={`courses.${index}.name`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-blue-700">Choice Code</label>
                    <Field
                      name={`courses.${index}.choiceCode`}
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                    />
                    <ErrorMessage
                      name={`courses.${index}.choiceCode`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-blue-700">Duration (Years)</label>
                    <Field
                      name={`courses.${index}.duration`}
                      type="number"
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                    />
                    <ErrorMessage
                      name={`courses.${index}.duration`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-blue-700">Annual Fees (₹)</label>
                    <Field
                      name={`courses.${index}.annualFees`}
                      type="number"
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                    />
                    <ErrorMessage
                      name={`courses.${index}.annualFees`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-blue-700">Category</label>
                    <Field
                      as="select"
                      name={`courses.${index}.category`}
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                      onChange={(e) => {
                        setFieldValue(
                          `courses.${index}.category`,
                          e.target.value
                        );
                        setFieldValue(`courses.${index}.subCategory`, []);
                      }}
                    >
                      <option value="">Select Category</option>
                      {categoryData.map((item, i) => (
                        <option key={i} value={item.category}>
                          {item.category}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name={`courses.${index}.category`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-blue-700">Branch</label>
                  <Select
                    isMulti
                    options={getSubCategoryOptions(
                      values.courses[index].category
                    )}
                    value={values.courses[index].subCategory.map((sub) => ({
                      value: sub,
                      label: sub,
                    }))}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [];
                      setFieldValue(
                        `courses.${index}.subCategory`,
                        selectedValues
                      );
                    }}
                    className="mt-1"
                    classNamePrefix="select"
                    isDisabled={!values.courses[index].category}
                  />
                  <ErrorMessage
                    name={`courses.${index}.subCategory`}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-blue-700">Eligibility</label>
                  <Field
                    name={`courses.${index}.eligibility`}
                    as="textarea"
                    rows={2}
                    className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                  />
                  <ErrorMessage
                    name={`courses.${index}.eligibility`}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {values.courses.length > 1 && (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        const newCourses = [...values.courses];
                        newCourses.splice(index, 1);
                        setFieldValue("courses", newCourses);
                      }}
                      className="flex items-center bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 cursor-pointer"
                    >
                      <Trash className="mr-2" size={20} /> Remove Course
                    </button>
                  </div>
                )}
              </motion.div>
            ))}

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setFieldValue("courses", [
                    ...values.courses,
                    { ...defaultCourse },
                  ]);
                }}
                className="flex items-center bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer"
              >
                <Plus className="mr-2" size={20} /> Add Course
              </button>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="px-6 py-2 rounded-lg shadow-lg transition duration-300 bg-green-600 hover:bg-green-800 text-white disabled:bg-gray-400"
              >
                {isSubmitting || loading ? "Saving..." : "💾 Save Courses"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default UniversityCourses;
