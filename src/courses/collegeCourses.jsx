import React, { useState, useEffect } from "react";
import { Plus, Trash, ChevronDown, X } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../utlis/cookieHelper";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const CollegeCourses = () => {
  // Default Values
  const defaultCourse = {
    name: "",
    duration: "",
    annualFees: "",
    category: "",
    subCategory: [],
    eligibility: "",
    choiceCode: "",
    mediumOfInstruction: "",
    sanctionedIntake: "",
  };

  const [initialValues, setInitialValues] = useState({
    courses: [defaultCourse],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { collegeId: collegeIdFromParams } = useParams();
  const [collegeId, setCollegeId] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(
    Array(initialValues.courses.length).fill(false)
  );

  // Validations
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
        choiceCode: Yup.string().required("Choice Code is required"),
        mediumOfInstruction: Yup.string().required("Medium is required"),
        sanctionedIntake: Yup.number()
          .min(1, "Intake must be at least 1")
          .required("Sanctioned intake is required"),
      })
    ),
  });

  // Get role and subrole
  const role = Cookies.get("role");
  const subrole = Cookies.get("subrole");

  // Set collegeId from either URL params (admin) or cookies (vendor)
  useEffect(() => {
    const collegeIdFromCookie = getCookie("collegeID");
    const id = collegeIdFromParams || collegeIdFromCookie;

    if (id) {
      setCollegeId(id);
      // If admin is accessing, store the collegeId in cookie temporarily
      if (role === "ADMIN" && collegeIdFromParams) {
        Cookies.set("collegeID", id, { expires: 1 });
      }
    } else {
      console.warn("College ID not found!");
      Swal.fire({
        icon: "warning",
        title: "College ID Missing",
        text: "Please select a college first",
      });
      //if Id not found navigate as per role
      navigate(role === "ADMIN" ? "/colleges" : "/college-dashboard");
    }
  }, [collegeIdFromParams, role, navigate]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/college/all-college-category`
        );
        setCategoryData(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch college categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch courses when collegeId is available
  useEffect(() => {
    if (!collegeId) return;

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/college/course/${collegeId}`
        );
        // extract course data
        const data = response.data.data?.courses?.[0]?.courses || [];
        console.log("Fetched course list:", data);

        if (data.length > 0) {
          const formattedCourses = data.map((course) => ({
            ...course,
            subCategory: Array.isArray(course.subCategory)
              ? course.subCategory // If already array,
              : course.subCategory
              ? [course.subCategory] // Convert single value to array
              : [], // Default to empty array
          }));

          setInitialValues({ courses: formattedCourses });
          setIsEditMode(true);
          setDropdownOpen(Array(formattedCourses.length).fill(false));
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [collegeId]);

  // Get subcategory options based on selected category
  const getSubCategoryOptions = (category) => {
    const foundCategory = categoryData.find((cat) => cat.category === category);
    return foundCategory?.subCategory?.filter(Boolean) || [];
  };

  const toggleDropdown = (index) => {
    const newDropdownOpen = [...dropdownOpen];
    newDropdownOpen[index] = !newDropdownOpen[index];
    setDropdownOpen(newDropdownOpen);
  };

  const handleSubCategorySelect = (index, subCat, values, setFieldValue) => {
    const currentSubCategories = [...values.courses[index].subCategory];
    const subCatIndex = currentSubCategories.indexOf(subCat);

    if (subCatIndex === -1) {
      currentSubCategories.push(subCat);
    } else {
      currentSubCategories.splice(subCatIndex, 1);
    }

    setFieldValue(`courses.${index}.subCategory`, currentSubCategories);
  };

  const removeSubCategory = (index, subCat, values, setFieldValue) => {
    const currentSubCategories = [...values.courses[index].subCategory];
    const subCatIndex = currentSubCategories.indexOf(subCat);

    if (subCatIndex !== -1) {
      currentSubCategories.splice(subCatIndex, 1);
      setFieldValue(`courses.${index}.subCategory`, currentSubCategories);
    }
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError(null);

      const courseData = {
        collegeId,
        courses: values.courses.map((course) => ({
          ...course,
          duration: Number(course.duration),
          annualFees: Number(course.annualFees),
          subCategory: course.subCategory,
        })),
      };

      const url = isEditMode
        ? `${API_BASE_URL}/api/college/course/${collegeId}`
        : `${API_BASE_URL}/api/college/course/create`;
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
    <section className="p-2 md:p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 max-w-6xl mx-auto relative">
      {/* x button only for admin */}
      {role === "ADMIN" && (
        <button
          onClick={() => navigate("/colleges")}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>
      )}

      {/* Heading */}
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
        {/* Formik Form  */}
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
                  {/* Course Name */}
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

                  {/* Choice Code */}
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

                  {/* Medium of Instruction */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">
                      Medium of Instruction
                    </label>
                    <Field
                      name={`courses.${index}.mediumOfInstruction`}
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                      placeholder="e.g., English / Marathi / Hindi"
                    />
                    <ErrorMessage
                      name={`courses.${index}.mediumOfInstruction`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Sanctioned Intake */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">Sanctioned Intake</label>
                    <Field
                      name={`courses.${index}.sanctionedIntake`}
                      type="number"
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 shadow-sm"
                      placeholder="e.g., 60 / 120"
                    />
                    <ErrorMessage
                      name={`courses.${index}.sanctionedIntake`}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Duration in years */}
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

                {/* Annual Fees */}
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

                  {/* Category */}
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

                {/* Custom Multi-Select Dropdown for SubCategory */}
                <div className="flex flex-col">
                  <label className="text-blue-700">Branch</label>
                  <div className="relative mt-1">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(index)}
                     className={`w-full px-4 py-2 border-2 border-blue-200 cursor-not-allowed shadow-sm rounded-lg text-left flex justify-between items-center bg-white`}
                      disabled={!values.courses[index].category}
                    >
                      <span>
                        {values.courses[index].subCategory.length > 0
                          ? values.courses[index].subCategory.join(", ")
                          : "Select Branch"}
                      </span>
                      <ChevronDown
                        className={`transition-transform ${
                          dropdownOpen[index] ? "transform rotate-180" : ""
                        }`}
                        size={20}
                      />
                    </button>

                    {dropdownOpen[index] && values.courses[index].category && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {getSubCategoryOptions(
                          values.courses[index].category
                        ).map((subCat) => (
                          <div
                            key={subCat}
                            className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${
                              values.courses[index].subCategory.includes(subCat)
                                ? "bg-blue-100"
                                : ""
                            }`}
                            onClick={() =>
                              handleSubCategorySelect(
                                index,
                                subCat,
                                values,
                                setFieldValue
                              )
                            }
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={values.courses[
                                  index
                                ].subCategory.includes(subCat)}
                                readOnly
                                className="mr-2"
                              />
                              {subCat}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected SubCategories Chips */}
                  {values.courses[index].subCategory.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {values.courses[index].subCategory.map((subCat) => (
                        <div
                          key={subCat}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                        >
                          {subCat}
                          <button
                            type="button"
                            onClick={() =>
                              removeSubCategory(
                                index,
                                subCat,
                                values,
                                setFieldValue
                              )
                            }
                            className="ml-2 text-blue-600 hover:text-blue-900"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <ErrorMessage
                    name={`courses.${index}.subCategory`}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Eligibility */}
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

                {/* Remove Course Button to remove the course */}
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

            {/* Add New Course Button to open new blank form */}
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

              {/* Submit Button */}
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

export default CollegeCourses;
