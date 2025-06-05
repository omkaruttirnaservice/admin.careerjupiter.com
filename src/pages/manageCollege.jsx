import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import InputField from "../component/inputField";
import MultiSelectDropdown from "../component/multiSelectDropdown";
import SingleSelectDropdown from "../component/singleSelectDropdown";
import MultiSelectField from "../component/multiSelectField";
import FileUpload from "../component/fileUpload";
import { MdDone } from "react-icons/md";
import {
  FaEdit,
  FaImage,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPlus,
  FaSpinner,
  FaTrash,
  FaWindowClose,
} from "react-icons/fa";
import CollegeAddressModal from "../component/collegeAddressModal";
import { getCookie } from "../utlis/cookieHelper";
import OtherField from "../component/otherField";
import TextAreaField from "../component/textAreaField";

// Helper function to safely parse JSON fields
const parseJSONField = (field) => {
  try {
    return typeof field === "string" ? JSON.parse(field) : field;
  } catch {
    return [];
  }
};

// Constant values for college types
const collegeTypes = [
  "Gov.-Aided (Granted)",
  "Private Unaided (Non-Granted)",
  "Autonomous College",
  "Deemed to be Universities",
  "Private",
  "Distance Learning",
];

// Constant Values for Accreditation
const accreditationOptions = [
  "U.G.C",
  "AICTE",
  "NAAC A++",
  "NAAC A+",
  "NAAC A",
  "NAAC B++",
  "NAAC B+",
  "NAAC B",
  "NAAC C",
  "NAAC D",
  "NBA",
  "NIRF",
  "AIU",
  "Other",
];

// Established Year Dropdown Value
const currentYear = new Date().getFullYear();
const establishedYears = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, i) => 1980 + i
);

const ManageCollege = () => {
  const navigate = useNavigate();
  const { id: collegeIdFromParams } = useParams();
  const storedCollegeId = Cookies.get("collegeID");
  const [collegeId, setCollegeId] = useState(storedCollegeId || "");
  const [collegeDetails, setCollegeDetails] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [entranceExams, setEntranceExams] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [roadmapOptions, setRoadmapOptions] = useState([]);
  const [addressBackup, setAddressBackup] = useState(null);

  // Constant Form Fields for Edit Address field
  const formFields = [
    {
      name: "line1",
      label: "Address Line 1",
      placeholder: "Enter address line 1",
    },
    {
      name: "line2",
      label: "Address Line 2",
      placeholder: "Enter address line 2",
    },
    { name: "pincode", label: "Pincode", placeholder: "Enter pincode" },
    { name: "state", label: "State", placeholder: "Enter state" },
    { name: "dist", label: "District", placeholder: "Enter district" },
    { name: "taluka", label: "Taluka", placeholder: "Enter taluka" },
    {
      name: "nearbyLandmarks",
      label: "Nearby Landmarks",
      placeholder: "Enter landmarks",
    },
    {
      name: "designation",
      label: "Designation",
      placeholder: "Enter designation",
    },
    {
      name: "autorizedName",
      label: "Authorized Person Name",
      placeholder: "Enter name",
    },
    {
      name: "autorizedPhono",
      label: "Authorized Person Phone",
      placeholder: "Enter phone number",
    },
  ];

  console.log("📌 Retrieved College ID from Cookies:", collegeId);

  // Get user role and subrole
  const role = Cookies.get("role");
  const subrole = Cookies.get("subrole");

  // Set collegeId from either URL params (admin) or cookies (vendor)
  useEffect(() => {
    const collegeIdFromCookie = getCookie("collegeID");
    const id = collegeIdFromParams || collegeIdFromCookie;

    if (id) {
      setCollegeId(id);
      console.log("College ID for editing:", id);

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
      navigate(role === "ADMIN" ? "/colleges" : "/vendor-college");
    }
  }, [collegeIdFromParams, role, navigate]);

  // Fetch College Details from the get method
  useEffect(() => {
    const fetchCollegeDetails = async () => {
      const storedCollegeId = Cookies.get("collegeID");
      if (!storedCollegeId) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/college/${storedCollegeId}`
        );

        let collegeData = response.data?.data?.college || {};

        // Ensure default values for missing fields and the data of already fetched
        // Description
        collegeData.info = {
          description: collegeData?.info?.description || "",
        };
        // Accreditation handling
        const acc = collegeData?.accreditation || "";
        const accMatch = acc.match(/^(NAAC\s?[A-D+]+|NBA)\s?\(([^)]+)\)$/);

        if (accMatch) {
          collegeData.accreditation = accMatch[1].trim(); // e.g., "NAAC A+"
          collegeData.accreditationYears = accMatch[2]
            .split(",")
            .map((s) => s.trim()); // e.g., ["3 Years"]
        } else {
          // Not NAAC/NBA format, directly assign
          collegeData.accreditation = acc;
          collegeData.accreditationYears = [];
        }
        collegeData.category = collegeData?.category || []; // Category
        collegeData.establishedYear = collegeData?.establishedYear || 0; // Established Year
        collegeData.collegeName = collegeData?.collegeName || ""; // College Name
        collegeData.contactDetails = collegeData?.contactDetails || ""; // Contact Mobile Number
        collegeData.websiteURL = collegeData?.websiteURL || ""; // Website URL
        collegeData.entrance_exam_required =
          parseJSONField(collegeData.entrance_exam_required) || []; // Entrance Exam Required
        collegeData.subCategory = parseJSONField(collegeData.subCategory) || []; // Sub-Category (Branch)
        collegeData.keywords = parseJSONField(collegeData.keywords) || []; // Keywords

        setCollegeDetails(collegeData); // Set data in state
      } catch (error) {
        console.error("Error fetching college details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollegeDetails();
  }, []);

  // Formik Initial Value
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: collegeDetails || {
      collegeName: "",
      collegeType: "",
      category: "",
      subCategory: [],
      establishedYear: "",
      contactDetails: "",
      websiteURL: "",
      image: null,
      roadmap: [],
      address: [
        {
          line1: "",
          line2: "",
          pincode: "",
          state: "",
          dist: "",
          taluka: "",
          nearbyLandmarks: "",
          authorizedName: "",
          authorizedPhone: "",
          designation: "",
        },
      ],
      info: { description: "" },
      affiliatedUniversity: "",
      entrance_exam_required: [],
      accreditation: "",
      accreditationOther: "",
      accreditationYears: [],
      imageGallery: [],
      subCategoryOther: "",
      keywords: [],
      email_id: "",
    },

    // Validations for the update college form
    validationSchema: Yup.object().shape({
      collegeName: Yup.string().required("College Name is required"),
      affiliatedUniversity: Yup.string().required(
        "Affiliated University is required"
      ),
      keywords: Yup.array()
        .of(Yup.string())
        .min(1, "At least one keyword is required"),
      establishedYear: Yup.number().required("Established Year is required"),
      accreditation: Yup.string().required("Accreditation is required"),
      // Conditionally required: if 'Other' or 'Others' is selected
      accreditationOther: Yup.string().when("accreditation", {
        is: (val) => val === "Other" || val === "Others",
        then: (schema) =>
          schema
            .trim()
            .min(2, "Please specify other accreditation")
            .required("Other accreditation is required"),
        otherwise: (schema) => schema.notRequired(),
      }),

      // Conditionally required: if accreditation is "NAAC A", "NAAC A+", or "NBA"
      accreditationYears: Yup.array()
        .of(Yup.string())
        .when("accreditation", {
          is: (val) => ["NAAC A", "NAAC A+", "NBA"].includes(val),
          then: (schema) =>
            schema
              .min(1, "Select at least one accreditation duration")
              .required("Accreditation duration is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      subCategory: Yup.array()
        .of(Yup.string())
        .min(1, "At least one branch must be selected")
        .required("Branch is required"),
      subCategoryOther: Yup.string().when("subCategory", {
        is: (val) =>
          Array.isArray(val) &&
          val.some((v) => ["Other", "Others"].includes(v)),
        then: (schema) =>
          schema
            .trim()
            .min(1, "Please specify other branch")
            .required("Branch Name for other is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      roadmap: Yup.array()
        .required("Roadmap Category is required")
        .min(1, "Select at least one roadmap category"),
      entrance_exam_required: Yup.array().min(
        1,
        "At least one entrance exam is required"
      ),
      collegeType: Yup.string().required("College Type is required"),
      category: Yup.string().required("Category is required"),
      info: Yup.object().shape({
        description: Yup.string()
          .required("Description is required")
          .min(100, "Description must be at least 100 characters")
          .max(1000, "Description must be at most 1000 characters"),
      }),
    }),

    // Onsubmit for submitting the form data values in the backend
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();

        if (values.image instanceof File) {
          formData.append("image", values.image);
        }

        const primitiveFields = [
          "collegeName",
          "collegeType",
          "establishedYear",
          "contactDetails",
          "websiteURL",
          "affiliatedUniversity",
          "email_id",
        ];

        primitiveFields.forEach((key) => {
          if (values[key]) {
            formData.append(key, values[key]);
          }
        });

        // Handle array fields for keywords
        if (Array.isArray(values.keywords)) {
          values.keywords.forEach((item) =>
            formData.append("keywords[]", item)
          );
        }

        // Handles array fields for roadmap
        if (Array.isArray(values.roadmap)) {
          values.roadmap.forEach((item) => formData.append("roadmap[]", item));
        }

        // Category field
        if (values.category) {
          formData.append("category", values.category);
        }

        // Handle accreditation (single value with optional custom input for others field )
        const { accreditation, accreditationOther, accreditationYears } =
          formik.values;
        let finalAccreditation = accreditation;
        if (accreditation === "Other") {
          finalAccreditation = accreditationOther.trim();
        } else if (isNaacOrNba(accreditation)) {
          const durationText =
            accreditationYears.join(", ") || accreditationOther.trim();
          finalAccreditation = `${accreditation} (${
            durationText || "Not specified"
          })`;
        }
        formData.append("accreditation", finalAccreditation);

        // Handle array for subCategory field with other option
        if (Array.isArray(values.subCategory)) {
          values.subCategory.forEach((item) => {
            // Skip "Other" and "Others" because we'll handle them separately
            if (item !== "Other" && item !== "Others") {
              formData.append("subCategory[]", item);
            }
          });

          // Append custom value for "Other" if selected and input is provided
          if (values.subCategory.includes("Other") && values.subCategoryOther) {
            formData.append("subCategory[]", values.subCategoryOther);
          }

          // Append custom value for "Others" if selected and input is provided
          if (
            values.subCategory.includes("Others") &&
            values.subCategoryOther
          ) {
            formData.append("subCategory[]", values.subCategoryOther);
          }
        }

        // Handle array values for entrance exam required field
        if (Array.isArray(values.entrance_exam_required)) {
          values.entrance_exam_required.forEach((item) =>
            formData.append("entrance_exam_required[]", item)
          );
        }

        // ✅ Handle nested object: info {description}
        formData.append("info[description]", values.info.description); // Info Description

        // ✅ Handle address array of objects
        if (Array.isArray(values.address)) {
          values.address.forEach((addr, index) => {
            Object.keys(addr).forEach((key) => {
              formData.append(`address[${index}][${key}]`, addr[key]);
            });
          });
        }

        // Upadate the data using this put method
        const response = await axios.put(
          `${API_BASE_URL}/api/college/update/${collegeId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("📌 Update Response:", response.data);
        Swal.fire({
          icon: "success",
          title: "College Updated!",
          text: "✅ College updated successfully!",
          confirmButtonText: "OK",
        }).then((result) => {
          // When the college is successfully updated then the page is routed to college list table or college dashboard as per roles
          if (result.isConfirmed) {
            const role = Cookies.get("role");
            navigate(
              role === "ADMIN"
                ? "/colleges"
                : "/vendor-college/college-dashboard"
            );
          }
        });
      } catch (error) {
        console.error("❌ Error updating college:", error);
        Swal.fire({
          icon: "warning",
          title: "Update Failed",
          text:
            error.response?.data?.errMsg ||
            error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            "Failed to update college.",
          confirmButtonColor: "#d33",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // This handles to fetch the categories value for the category dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/college/all-college-category`
        );
        const categories = response.data.data || [];
        setCategoryData(categories);
      } catch (error) {
        console.error("Failed to fetch college categories", error);
      }
    };

    fetchCategories();
  }, []);

  // Update subcategories when category is selected
  useEffect(() => {
    const selectedCategory = formik.values.category;
    const match = categoryData.find(
      (item) => item.category === selectedCategory
    );
    setSubCategories(match ? match.subCategory : []);
  }, [formik.values.category, categoryData]);

  // Update entrance exams when category is selected
  useEffect(() => {
    const selectedCategory = formik.values.category;
    const category = categoryData.find(
      (item) => item.category === selectedCategory
    );

    // Set entrance exams based on the selected category
    if (category) {
      setEntranceExams(category.entrance_exam_required || []);
    }
  }, [formik.values.category, categoryData]); // Dependency array ensures this runs when category or categoryData changes

  // Set preview image URL if the image value is a string
  useEffect(() => {
    if (typeof formik.values.image === "string") {
      setPreviewImage(`${API_BASE_URL}${formik.values.image}`);
    }
  }, [formik.values.image]);

  // This handles to fetch the roadmap categories value for the Roadmap dropdown
  useEffect(() => {
    const fetchRoadmapOptions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/type/types`);
        const types = response.data?.data || [];
        const formatted = types.map((item) => item.type);
        setRoadmapOptions(formatted);
      } catch (error) {
        console.error("Failed to fetch roadmap types", error);
      }
    };

    fetchRoadmapOptions();
  }, []);

  // Log final address and info data from Formik once they are available; warn if not populated yet.
  useEffect(() => {
    if (formik.values.address && formik.values.info) {
      console.log("📌 Final Formik Address Data:", formik.values.address);
      console.log("📌 Final Formik Info Data:", formik.values.info);
    } else {
      console.warn("⚠️ Address & Info fields are not populated yet!");
    }
  }, [formik.values]);

  // For NAAC and NBA Section in the accreditation form
  const isNaacOrNba = (value) =>
    [
      "NAAC A++",
      "NAAC A+",
      "NAAC A",
      "NAAC B++",
      "NAAC B+",
      "NAAC B",
      "NAAC C",
      "NAAC D",
      "NBA",
    ].includes(value);

  // Checks these Address fields and then show the address card - (if address is available)
  const isAddressFilled = (addr) => {
    if (!addr) return false;

    return [
      addr.line1,
      addr.line2,
      addr.taluka,
      addr.dist,
      addr.state,
      addr.pincode,
      addr.nearbyLandmarks,
      addr.autorizedName,
      addr.designation,
      addr.autorizedPhono,
    ].some((val) => val && val.toString().trim() !== "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-1 md:p-6">
      {/* Main Form Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Form Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Update College Details
          </h1>
          {/* Close button based on role it should be only viewed for admin role */}
          {role === "ADMIN" && (
            <button
              onClick={() => navigate("/colleges")}
              className="absolute top-6 right-6 text-white hover:text-red-500 text-2xl font-bold cursor-pointer transition"
            >
              &times;
            </button>
          )}
        </div>

        {/* Form Content */}
        <form
          onSubmit={formik.handleSubmit}
          className="p-2 md:p-8 lg:p-10 space-y-8"
        >
          {/* Section : Basic Information */}
          <div className="bg-blue-50 rounded-xl p-2 md:p-6 shadow-inner">
            <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              Basic Information
            </h2>

            {/* College Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <InputField
                label="College Name"
                type="text"
                name="collegeName"
                formik={formik}
                className="bg-white"
              />

              {/* Affiliated University */}
              <InputField
                label="Affiliated University"
                name="affiliatedUniversity"
                type="text"
                placeholder="Enter University"
                formik={formik}
                className="bg-white"
              />

              {/* College Type */}
              <SingleSelectDropdown
                label="College Type"
                name="collegeType"
                options={collegeTypes}
                formik={formik}
                placeholder="Select College Type"
                className="bg-white"
              />

              {/* College Category */}
              <div className="mb-4">
                <label className="block text-blue-900 text-lg font-semibold mb-2">
                  College Streams
                </label>

                {/* Dropdown for selecting college category */}
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={(e) => {
                    const selected = e.target.value;

                    // Update the selected category in Formik
                    formik.setFieldValue("category", selected);

                    // Find the full category object from the category list
                    const selectedCategory = categoryData.find(
                      (item) => item.category === selected
                    );

                    // Clear any previously selected subcategories and entrance exams then Update the subcategories and entrance exams dropdowns
                    formik.setFieldValue("subCategory", []);
                    setSubCategories(selectedCategory?.subCategory || []);
                    formik.setFieldValue("entrance_exam_required", []);
                    setEntranceExams(
                      selectedCategory?.entrance_exam_required || []
                    );
                  }}
                  className={`w-full px-4 py-3 rounded-lg border-2 border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white ${
                    formik.touched.category && formik.errors.category
                      ? "border-red-400"
                      : ""
                  }`}
                >
                  <option value="">Select Category</option>

                  {/* Dynamically render all available categories */}
                  {categoryData.map((item, index) => (
                    <option key={index} value={item.category}>
                      {item.category}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.category}
                  </p>
                )}
              </div>

              {/* Branch */}
              <div className="mb-2">
                <MultiSelectDropdown
                  label="Branch"
                  name="subCategory"
                  options={subCategories}
                  formik={formik}
                  className="bg-white"
                />
                {/* Other field for branch */}
                <OtherField
                  watchValue={formik.values.subCategory}
                  triggerValue={["Other", "Others"]}
                  onChange={(val) =>
                    formik.setFieldValue("subCategoryOther", val)
                  }
                  name="subCategoryOther"
                  placeholder="Please Sepcify Your Branch"
                  error={formik.errors.subCategoryOther}
                  touched={formik.touched.subCategoryOther}
                  className="bg-white"
                />
              </div>

              {/* Established year */}
              <SingleSelectDropdown
                label="Established Year"
                name="establishedYear"
                options={establishedYears}
                formik={formik}
                placeholder="Select an Established Year"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Website URL */}
              <InputField
                label="Website URL"
                type="text"
                name="websiteURL"
                formik={formik}
                className="bg-white"
              />

              {/* Accreditation */}
              <div>
                <SingleSelectDropdown
                  label="Accreditation"
                  name="accreditation"
                  options={accreditationOptions}
                  formik={formik}
                  placeholder="Select Accreditation"
                  className="bg-white"
                />
                {/* Accreditation Others field */}
                <OtherField
                  watchValue={formik.values.accreditation}
                  triggerValue={["Other", "Others"]}
                  onChange={(val) =>
                    formik.setFieldValue("accreditationOther", val)
                  }
                  name="accreditationOther"
                  error={formik.errors.accreditationOther}
                  touched={formik.touched.accreditationOther}
                  className="bg-white"
                />

                {/* Conditional Durations + Other Field for the duration*/}
                {isNaacOrNba(formik.values.accreditation) && (
                  <div className="w-full mb-5 p-4 border border-blue-300 rounded-xl shadow-lg bg-white">
                    <label className="text-blue-900 font-semibold block mb-3 text-lg">
                      Select Accreditation Duration
                    </label>

                    {/* Checkbox Options for the duration */}
                    <div className="flex gap-3 flex-wrap">
                      {["3 Years", "5 Years"].map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 shadow-md hover:bg-blue-100 transition-all duration-200"
                        >
                          <input
                            type="checkbox"
                            name="accreditationYears"
                            value={option}
                            checked={(
                              formik.values.accreditationYears || []
                            ).includes(option)}
                            onChange={(e) => {
                              const { value, checked } = e.target;
                              let updated = Array.isArray(
                                formik.values.accreditationYears
                              )
                                ? [...formik.values.accreditationYears]
                                : [];

                              if (checked) {
                                updated.push(value);
                              } else {
                                updated = updated.filter(
                                  (item) => item !== value
                                );
                              }

                              formik.setFieldValue(
                                "accreditationYears",
                                updated
                              );
                            }}
                            className="accent-blue-500 w-5 h-5"
                          />
                          <span className="text-gray-700 font-medium">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Show error for accreditationYears if any */}
                    {formik.touched.accreditationYears &&
                      formik.errors.accreditationYears && (
                        <div className="text-red-600 mt-2 text-sm font-semibold">
                          {formik.errors.accreditationYears}
                        </div>
                      )}

                    {/* Other Field for the duration section */}
                    <div className="mt-4">
                      <input
                        type="text"
                        name="accreditationOther"
                        placeholder="Other (Specify duration)"
                        value={formik.values.accreditationOther}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-3 border rounded-lg shadow-md focus:outline-none transition-all duration-200 border-blue-300 focus:ring-2 focus:ring-blue-500"
                      />
                      {/* Show error for accreditationOther */}
                      {formik.touched.accreditationOther &&
                        formik.errors.accreditationOther && (
                          <div className="text-red-600 mt-2 text-sm font-semibold">
                            {formik.errors.accreditationOther}
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>

              {/* RoadMap Category */}
              <MultiSelectDropdown
                label="Roadmap Category"
                name="roadmap"
                options={roadmapOptions}
                formik={formik}
              />

              {/* Entrance Exams Required */}
              <MultiSelectDropdown
                label="Entrance Exams Required"
                name="entrance_exam_required"
                options={entranceExams}
                formik={formik}
                className="bg-white"
              />

              {/* Keywords */}
              <MultiSelectField
                label="Keywords"
                name="keywords"
                formik={formik}
                className="bg-white"
              />
              {/* College Info Description */}
              <TextAreaField
                label="Description"
                name="info.description"
                formik={formik}
              />
            </div>
          </div>

          {/* Section : Addresses */}
          <div className="bg-blue-50 rounded-xl p-2 md:p-6 shadow-inner">
            {/* Heading for address section */}
            <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              College Addresses
            </h2>

            {/* Address List */}
            <div className="space-y-6">
              {formik.values.address.map((addr, index) => {
                const isEditing = editingIndex === index;

                // Skip rendering if all fields are empty
                if (!isAddressFilled(addr) && !isEditing) return null;

                return (
                  <div key={index} className="relative">
                    {isEditing ? (
                      <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
                        <div className="flex justify-between items-center mb-4">
                          {/* Heading for Editing Address section */}
                          <h3 className="text-lg font-semibold text-blue-700">
                            ✏️ Editing Address {index + 1}
                          </h3>
                        </div>

                        {/* Prefilled value of the address section in the edit modal */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {formFields.map((field, idx) => (
                            <div key={idx} className="mb-4">
                              <label className="block text-md font-medium text-blue-900 mb-1">
                                {field.label}
                              </label>
                              <input
                                type="text"
                                name={`address[${index}].${field.name}`}
                                placeholder={field.placeholder}
                                value={addr[field.name]}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                              />
                              {formik.errors.address?.[index]?.[field.name] && (
                                <div className="text-red-500 text-xs mt-1">
                                  {formik.errors.address[index][field.name]}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                          {/* Save Button  */}
                          <button
                            type="button"
                            onClick={() => setEditingIndex(null)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center gap-2"
                          >
                            <MdDone /> Save
                          </button>

                          {/* Cancel Button */}
                          <button
                            type="button"
                            onClick={() => {
                              if (addressBackup) {
                                const updated = [...formik.values.address];
                                updated[index] = addressBackup;
                                formik.setFieldValue("address", updated);
                              }
                              setEditingIndex(null);
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition flex items-center gap-2"
                          >
                            <FaWindowClose /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Address Card if the Address Exists
                      <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-400 hover:shadow-lg transition">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <p className="font-medium text-gray-800">
                              <span className="text-blue-600">🏠</span>{" "}
                              {addr.line1}, {addr.line2}
                            </p>

                            {addr.nearbyLandmarks && (
                              <p className="text-sm text-gray-600">
                                <span className="text-blue-600">📍</span>{" "}
                                {addr.nearbyLandmarks}
                              </p>
                            )}

                            <p className="text-sm text-gray-600">
                              <span className="text-blue-600">🗺️</span>{" "}
                              {addr.taluka}, {addr.dist}, {addr.state} -{" "}
                              {addr.pincode}
                            </p>

                            <p className="text-xs text-gray-500 mt-2">
                              <span className="text-blue-600">👤</span>{" "}
                              {addr.autorizedName}
                              {addr.designation && (
                                <span className="ml-1 italic">
                                  ({addr.designation})
                                </span>
                              )}
                              <span className="ml-2">
                                <span className="text-blue-600">📞</span>{" "}
                                {addr.autorizedPhono}
                              </span>
                            </p>
                          </div>

                          <div className="flex gap-3 mt-2">
                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setAddressBackup({
                                  ...formik.values.address[index],
                                }); // clone current address
                                setEditingIndex(index);
                              }}
                              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                              title="Edit Address"
                            >
                              <FaEdit className="text-sm" />
                              <span className="text-sm font-medium">Edit</span>
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...formik.values.address];
                                updated.splice(index, 1);
                                formik.setFieldValue("address", updated);
                                if (editingIndex === index)
                                  setEditingIndex(null);
                              }}
                              className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                              title="Delete Address"
                            >
                              <FaTrash className="text-sm" />
                              <span className="text-sm font-medium">
                                Delete
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add Address Button */}
            <button
              type="button"
              onClick={() => setShowAddressModal(true)}
              className="mt-6 flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              <FaPlus /> Add New Address
            </button>
          </div>

          {/* Section: College Image */}
          <div className="bg-blue-50 rounded-xl p-2 md:p-6 shadow-inner">
            <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <FaImage className="text-blue-600" />
              College Banner Image
            </h2>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                {previewImage || formik.values.image ? (
                  <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-md border-2 border-blue-200">
                    <img
                      src={
                        previewImage
                          ? previewImage
                          : typeof formik.values.image === "string"
                          ? `${API_BASE_URL}${formik.values.image}`
                          : ""
                      }
                      alt="College Main Image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                    No image selected
                  </div>
                )}
              </div>

              {/* File Upload Component */}
              <FileUpload
                label="Upload College Banner (JPG/PNG)"
                name="image"
                formik={formik}
                className="bg-white"
              />
            </div>
          </div>

          {/* Submit Button (Update) */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={!formik.dirty || formik.isSubmitting}
              className={`px-10 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-300 ${
                formik.dirty
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {formik.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" /> Updating...
                </span>
              ) : (
                "Update College Details"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Address Modal to add new address */}
      <CollegeAddressModal
        open={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSave={(newAddress) => {
          formik.setFieldValue("address", [
            ...(formik.values.address || []),
            newAddress,
          ]);
        }}
      />
    </div>
  );
};

export default ManageCollege;
