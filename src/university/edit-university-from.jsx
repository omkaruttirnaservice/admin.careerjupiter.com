
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaUniversity, FaPlus, FaTimes } from "react-icons/fa"
import { API_BASE_URL } from "../constant/constantBaseUrl"
import Swal from "sweetalert2"
import React from "react"
import { fetchUniversityCategories } from "./universityapi";
import stateDistricts from "../constant/constantData";

const UniversityCategories = ["Private", "Government", "Autonomous", "Deemed"]
const facilities = ["Library", "Hostel", "Sport Complex", "WiFi Campus"]
const accreditationOptions = [
  "NAAC A++",
  "NAAC A+",
  "NAAC A",
  "NBA Accredited",
  "UGC Approved",
  "AICTE Approved",
  "ISO Certified",
  "NIRF Ranked",
  "Other",
]

const scholarshipAvailable = ["Merit-based", "Need-based", "Sports-based", "Other"]
const quotaSystem = ["Management", "SC/ST", "OBC", "General"]
// const entranceExams = ["JEE", "NEET", "CAT", "GATE", "CLAT", "LSAT", "XAT", "CMAT", "MAT", "Other"]
const currentYear = new Date().getFullYear()
const establishedYears = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => 1980 + i)


const districtOptionsByState = { 
}

{/* <stateDistricts/> */}
<stateDistricts/>
const EditUniversityForm = ({
  formik,
  isSubmitting,
  handleImageChange,
  handleImageGalleryChange,
  // categoryData,
  // filteredBranches,
  stateOptions = stateDistricts,
  districtOptions = [],
  submitButtonText = "Update University",
}) => {
  // States for "Other" options in multiselect dropdowns
  const [otherAccreditation, setOtherAccreditation] = useState("")
  const [otherScholarship, setOtherScholarship] = useState("")
  const [otherEntranceExam, setOtherEntranceExam] = useState("")
  const [keywordInput, setKeywordInput] = useState("")

  // State for dropdown visibility
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false)
  const [showAccreditationDropdown, setShowAccreditationDropdown] = useState(false)
  const [showScholarshipDropdown, setShowScholarshipDropdown] = useState(false)
  const [showEntranceExamDropdown, setShowEntranceExamDropdown] = useState(false)
  const [showFacilitiesDropdown, setShowFacilitiesDropdown] = useState(false)
  const [showQuotaDropdown, setShowQuotaDropdown] = useState(false)
  const [showAdmissionProcessDropdown, setShowAdmissionProcessDropdown] = useState(false)

  // State for local district options
  const [localDistrictOptions, setLocalDistrictOptions] = useState(districtOptions)

  const [categoryData, setCategoryData] = useState([]);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [entranceExams, setEntranceExams] = useState([]);

  // Initialize "Other" values from formik values
  useEffect(() => {
    // For accreditation
    if (formik.values.accreditation?.includes("Other")) {
      const otherValue = formik.values.accreditation.find(
        (val) => !accreditationOptions.includes(val) && val !== "Other",
      )
      if (otherValue) setOtherAccreditation(otherValue)
    }

    // For scholarships
    if (formik.values.admissionEntranceDetails?.scholarshipsAvailable?.includes("Other")) {
      const otherValue = formik.values.admissionEntranceDetails.scholarshipsAvailable.find(
        (val) => !scholarshipAvailable.includes(val) && val !== "Other",
      )
      if (otherValue) setOtherScholarship(otherValue)
    }

    // For entrance exams
    if (formik.values.entrance_exam_required?.includes("Other")) {
      const otherValue = formik.values.entrance_exam_required.find(
        (val) => !entranceExams.includes(val) && val !== "Other",
      )
      if (otherValue) setOtherEntranceExam(otherValue)
    }
  }, [formik.values])

  // Update district options when state changes
  useEffect(() => {
    const selectedState = formik.values.address.state
    if (selectedState && districtOptionsByState[selectedState]) {
      setLocalDistrictOptions(districtOptionsByState[selectedState])
    } else if (districtOptions.length > 0) {
      setLocalDistrictOptions(districtOptions)
    } else {
      setLocalDistrictOptions([])
    }
  }, [formik.values.address.state, districtOptions])

  // Helper function to display error message
  const getErrorMessage = (fieldName) => {
    const path = fieldName.split(".")
    let error

    if (path.length === 1) {
      error = formik.touched[fieldName] && formik.errors[fieldName]
    } else if (path.length === 2) {
      error = formik.touched[path[0]]?.[path[1]] && formik.errors[path[0]]?.[path[1]]
    } else if (path.length === 3) {
      error = formik.touched[path[0]]?.[path[1]]?.[path[2]] && formik.errors[path[0]]?.[path[1]]?.[path[2]]
    }

    return error ? <div className="text-red-500 text-sm mt-1">{error}</div> : null
  }

  // Convert array to options for react-select
  const toOptions = (arr) => arr.map((item) => ({ value: item, label: item }))

  // Handle "Other" option in multiselect dropdowns
  const handleOtherOption = (fieldName, value, otherValue) => {
    const currentValues = formik.values[fieldName] || []

    // If "Other" is selected and not already in the array
    if (value === "Other" && !currentValues.includes("Other")) {
      formik.setFieldValue(fieldName, [...currentValues, "Other"])
    }
    // If "Other" is deselected, remove it and clear the other input
    else if (value === "Other" && currentValues.includes("Other")) {
      formik.setFieldValue(
        fieldName,
        currentValues.filter((v) => v !== "Other" && v !== otherValue),
      )

      // Clear the corresponding "Other" input
      if (fieldName === "accreditation") setOtherAccreditation("")
      else if (fieldName === "admissionEntranceDetails.scholarshipsAvailable") setOtherScholarship("")
      else if (fieldName === "entrance_exam_required") setOtherEntranceExam("")
    }
    // For non-"Other" options
    else {
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      formik.setFieldValue(fieldName, newValues)
    }
  }

  // Handle "Other" input changes
  const handleOtherInputChange = (fieldName, otherValue, setOtherFunction) => {
    setOtherFunction(otherValue)

    // Get current values and remove any previous "Other" custom value
    const currentValues = formik.values[fieldName] || []
    const filteredValues = currentValues
      .filter((v) => v !== "Other" && v !== "")
      .filter((v) => {
        // Remove previous other values that aren't in the predefined options
        if (fieldName === "accreditation") return accreditationOptions.includes(v)
        if (fieldName === "admissionEntranceDetails.scholarshipsAvailable") return scholarshipAvailable.includes(v)
        if (fieldName === "entrance_exam_required") return entranceExams.includes(v)
        return true
      })

    // Add the new "Other" value if it's not empty
    if (otherValue.trim()) {
      formik.setFieldValue(fieldName, [...filteredValues, "Other", otherValue])
    } else {
      formik.setFieldValue(fieldName, [...filteredValues, "Other"])
    }
  }

  // Handle adding a keyword
  const handleAddKeyword = () => {
    if (keywordInput.trim() === "") return

    const currentKeywords = [...formik.values.keywords]
    if (currentKeywords.length >= 5) {
      Swal.fire({
        icon: "warning",
        title: "Maximum Keywords Reached",
        text: "You can only add up to 5 keywords.",
      })
      return
    }

    if (!currentKeywords.includes(keywordInput.trim())) {
      formik.setFieldValue("keywords", [...currentKeywords, keywordInput.trim()])
      setKeywordInput("")
    } else {
      Swal.fire({
        icon: "warning",
        title: "Duplicate Keyword",
        text: "This keyword already exists.",
      })
    }
  }

  // Handle removing a keyword
  const handleRemoveKeyword = (keyword) => {
    const currentKeywords = [...formik.values.keywords]
    formik.setFieldValue(
      "keywords",
      currentKeywords.filter((k) => k !== keyword),
    )
  }

  // Handle removing an image from gallery
  const handleRemoveGalleryImage = (index) => {
    const newGallery = [...formik.values.imageGallery]
    newGallery.splice(index, 1)
    formik.setFieldValue("imageGallery", newGallery)
  }

  // Custom dropdown component
  const CustomDropdown = ({
    label,
    options,  
    fieldName,
    isOpen,
    setIsOpen,
    hasOther = false,
    otherValue = "",
    setOtherValue = null,
  }) => {
    const dropdownRef = React.useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }

    }, [isOpen, setIsOpen])

    return (
      <div className="mb-3 relative" ref={dropdownRef}>
        <label className="block mb-1 text-blue-900 font-semibold">
          {label} <span className="text-red-500">*</span>
        </label>
        <div
          className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white flex justify-between items-center cursor-pointer ${
            formik.touched[fieldName] && formik.errors[fieldName] ? "border-red-500" : "border-blue-600"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="truncate">
            {formik.values[fieldName] && formik.values[fieldName].length > 0
              ? formik.values[fieldName].join(", ")
              : `Select ${label}`}
          </div>
          <div className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option, index) => (
              <div key={index} className="flex items-center px-4 py-2 hover:bg-gray-100">
                <input
                  type="checkbox"
                  id={`${fieldName}-${option}`}
                  checked={formik.values[fieldName]?.includes(option) || false}
                  onChange={(e) => {
                    if (hasOther && option === "Other") {
                      handleOtherOption(fieldName, option, otherValue)
                    } else {
                      const currentValues = formik.values[fieldName] || []
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((v) => v !== option)
                      formik.setFieldValue(fieldName, newValues)
                    }
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`${fieldName}-${option}`} className="ml-2 text-sm text-gray-700 w-full cursor-pointer">
                  {option}
                </label>
              </div>
            ))}

            {/* Other input field */}
            {hasOther && formik.values[fieldName]?.includes("Other") && (
              <div className="px-4 py-2">
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => {
                    if (setOtherValue) {
                      setOtherValue(e.target.value)
                      handleOtherInputChange(fieldName, e.target.value, setOtherValue)
                    }
                  }}
                  className="border border-gray-300 p-2 w-full rounded-md"
                  placeholder={`Please specify other ${label.toLowerCase()}`}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>
        )}

        {formik.touched[fieldName] && formik.errors[fieldName] && (
          <div className="text-red-500 text-sm mt-1">{formik.errors[fieldName]}</div>
        )}
      </div>
    )
  }

  // Custom nested dropdown component for scholarship and quota
  const NestedDropdown = ({
    label,
    options,
    fieldName,
    isOpen,
    setIsOpen,
    hasOther = false,
    otherValue = "",
    setOtherValue = null,
  }) => {
    const nestedFieldName = fieldName.includes(".") ? fieldName.split(".")[1] : fieldName
    const parentFieldName = fieldName.includes(".") ? fieldName.split(".")[0] : ""
    const dropdownRef = React.useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isOpen, setIsOpen])

    return (
      <div className="mb-3 relative" ref={dropdownRef}>
        <label className="block mb-1 text-blue-900 font-semibold">
          {label} <span className="text-red-500">*</span>
        </label>
        <div
          className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white flex justify-between items-center cursor-pointer ${
            formik.touched[parentFieldName]?.[nestedFieldName] && formik.errors[parentFieldName]?.[nestedFieldName]
              ? "border-red-500"
              : "border-blue-600"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="truncate">
            {formik.values[parentFieldName]?.[nestedFieldName] &&
            formik.values[parentFieldName][nestedFieldName].length > 0
              ? formik.values[parentFieldName][nestedFieldName].join(", ")
              : `Select ${label}`}
          </div>
          <div className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option, index) => (
              <div key={index} className="flex items-center px-4 py-2 hover:bg-gray-100">
                <input
                  type="checkbox"
                  id={`${fieldName}-${option}`}
                  checked={formik.values[parentFieldName]?.[nestedFieldName]?.includes(option) || false}
                  onChange={(e) => {
                    if (hasOther && option === "Other") {
                      handleOtherOption(fieldName, option, otherValue)
                    } else {
                      const currentValues = formik.values[parentFieldName]?.[nestedFieldName] || []
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((v) => v !== option)
                      formik.setFieldValue(fieldName, newValues)
                    }
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`${fieldName}-${option}`} className="ml-2 text-sm text-gray-700 w-full cursor-pointer">
                  {option}
                </label>
              </div>
            ))}

            {/* Other input field */}
            {hasOther && formik.values[parentFieldName]?.[nestedFieldName]?.includes("Other") && (
              <div className="px-4 py-2">
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => {
                    if (setOtherValue) {
                      setOtherValue(e.target.value)
                      handleOtherInputChange(fieldName, e.target.value, setOtherValue)
                    }
                  }}
                  className="border border-gray-300 p-2 w-full rounded-md"
                  placeholder={`Please specify other ${label.toLowerCase()}`}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>
        )}

        {formik.touched[parentFieldName]?.[nestedFieldName] && formik.errors[parentFieldName]?.[nestedFieldName] && (
          <div className="text-red-500 text-sm mt-1">{formik.errors[parentFieldName][nestedFieldName]}</div>
        )}
      </div>
    )
  }

  
  // Fetch categories once on component mount
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchUniversityCategories();
      setCategoryData(categories);
    };
  
    getCategories();
  }, []);
  // Update subcategories and entrance exams based on selected category
  useEffect(() => {
    const selectedCategory = formik.values.category;
  
    if (Array.isArray(categoryData)) {
      const match = categoryData.find(
        (item) => item.category === selectedCategory
      );
  
      setFilteredBranches(match ? match.subCategory : []);
      setEntranceExams(match ? match.entrance_exam_required || [] : []);
    } else {
      setFilteredBranches([]);
      setEntranceExams([]);
    }
  }, [formik.values.category, categoryData]);
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[80%] mx-auto min-h-screen flex items-center justify-center relative"
    >
      <div className="w-full bg-white shadow-xl rounded-xl p-8 border border-blue-300 relative z-10 my-4">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-lg shadow-lg">
          <h2 className="text-3xl font-bold flex items-center gap-4">
            <FaUniversity className="text-black bg-white p-2 rounded-md shadow-md" size={40} />
            Edit University
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* University Name */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">
                University Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...formik.getFieldProps("universityName")}
                className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white ${
                  formik.touched.universityName && formik.errors.universityName ? "border-red-500" : "border-blue-600"
                }`}
                placeholder="Enter university name"
              />
              {getErrorMessage("universityName")}
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">
                University Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formik.values.category}
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  formik.setFieldValue("category", selectedCategory); // category सेट करा
                  formik.setFieldValue("subCategory", ""); // subCategory reset करा
                }}
                onBlur={formik.handleBlur}
                className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white ${
                  formik.touched.category && formik.errors.category
                    ? "border-red-500"
                    : "border-blue-600"
                }`}
              >
                <option value="">Select Category</option>

                {Array.isArray(categoryData) &&
                  categoryData.map((cat, index) => (
                    <option key={index} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
              </select>
              {getErrorMessage("category")}
            </div>

            {/* University Sub Category */}
            <CustomDropdown
  label="Sub Category"
  options={filteredBranches}
  fieldName="subCategory"
  isOpen={showSubCategoryDropdown}
  setIsOpen={setShowSubCategoryDropdown}
/>

            {/* Address Line 1 */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...formik.getFieldProps("address.line1")}
                className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white ${
                  formik.touched.address?.line1 && formik.errors.address?.line1 ? "border-red-500" : "border-blue-600"
                }`}
                placeholder="Enter address line 1"
              />
              {getErrorMessage("address.line1")}
            </div>

            {/* Address Line 2 */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">Address Line 2</label>
              <input
                type="text"
                {...formik.getFieldProps("address.line2")}
                className="border-2 p-2 w-full rounded-lg shadow-sm bg-white border-blue-600"
                placeholder="Enter address line 2"
              />
            </div>

            {/* Pincode */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...formik.getFieldProps("address.pincode")}
                className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white ${
                  formik.touched.address?.pincode && formik.errors.address?.pincode
                    ? "border-red-500"
                    : "border-blue-600"
                }`}
                maxLength={6}
                placeholder="Enter 6-digit pincode"
              />
              {getErrorMessage("address.pincode")}
            </div>

             <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">
                State <span className="text-red-500">*</span>
              </label>
              <select
                name="address.state"
                value={formik.values.address.state || ""}
                onChange={(e) => {
                  formik.setFieldValue("address.state", e.target.value);
                  formik.setFieldValue("address.dist", ""); // Reset district when state changes
                }}
                onBlur={formik.handleBlur}
                className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white ${
                  formik.touched.address?.state && formik.errors.address?.state
                    ? "border-red-500"
                    : "border-blue-600"
                }`}
              >
                <option value="">Select State</option>
                {Object.keys(stateDistricts).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {formik.touched.address?.state &&
                formik.errors.address?.state && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.address.state}
                  </div>
                )}
            </div>

            {/* District Dropdown - Fixed Version */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">
                District <span className="text-red-500">*</span>
              </label>
              <select
                name="address.dist"
                value={formik.values.address.dist || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!formik.values.address.state}
                className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white ${
                  formik.touched.address?.dist && formik.errors.address?.dist
                    ? "border-red-500"
                    : "border-blue-600"
                } ${
                  !formik.values.address.state
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
              >
                <option value="">Select District</option>
                {formik.values.address.state &&
                  stateDistricts[formik.values.address.state]?.map(
                    (district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    )
                  )}
              </select>
              {formik.touched.address?.dist && formik.errors.address?.dist && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.address.dist}
                </div>
              )}
            </div>

            {/* Taluka */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">Taluka</label>
              <input
                type="text"
                {...formik.getFieldProps("address.taluka")}
                className="border-2 p-2 w-full rounded-lg shadow-sm bg-white border-blue-600"
                placeholder="Enter taluka"
              />
            </div>

            {/* Authorized Person Name */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">
                Authorized Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...formik.getFieldProps("address.autorizedName")}
                className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white ${
                  formik.touched.address?.autorizedName && formik.errors.address?.autorizedName
                    ? "border-red-500"
                    : "border-blue-600"
                }`}
                placeholder="Enter authorized person name"
              />
              {getErrorMessage("address.autorizedName")}
            </div>

            {/* Authorized Person Phone */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">
                Authorized Person Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...formik.getFieldProps("address.autorizedPhono")}
                className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white ${
                  formik.touched.address?.autorizedPhono && formik.errors.address?.autorizedPhono
                    ? "border-red-500"
                    : "border-blue-600"
                }`}
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
              />
              {getErrorMessage("address.autorizedPhono")}
            </div>

            {/* Nearby Landmarks */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">Nearby Landmarks</label>
              <input
                type="text"
                {...formik.getFieldProps("address.nearbyLandmarks")}
                className="border-2 p-2 w-full rounded-lg shadow-sm bg-white border-blue-600"
                placeholder="Enter nearby landmarks"
              />
            </div>

            {/* Password */}
            {/* <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white ${
                  formik.touched.password && formik.errors.password ? "border-red-500" : "border-blue-600"
                }`}
                placeholder="Enter password (min 4 characters)"
              />
              {getErrorMessage("password")}
            </div> */}

            

            {/* Description */}
            <div className="mb-3 col-span-2">
              <label className="block mb-1 text-blue-900 font-semibold">
                Description <span className="text-red-500">*</span>
                <span className="text-sm text-gray-500 ml-2">(Min 100, Max 1000 characters)</span>
              </label>
              <textarea
                {...formik.getFieldProps("info.description")}
                className={`border-2 p-2 w-full rounded-lg shadow-sm bg-white ${
                  formik.touched.info?.description && formik.errors.info?.description
                    ? "border-red-500"
                    : "border-blue-600"
                }`}
                rows={4}
                minLength={100}
                maxLength={1000}
                placeholder="Enter university description"
              ></textarea>
              <div className="flex justify-between">
                <div>{getErrorMessage("info.description")}</div>
                <div className="text-sm text-gray-500">{formik.values.info.description.length}/1000 characters</div>
              </div>
            </div>

            {/* Keywords with Add Button */}
            <div className="mb-3 col-span-2">
              <label className="block mb-1 text-blue-900 font-semibold">
                Keywords (Min 1, Max 5) <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  className="border-2 p-2 flex-grow rounded-lg shadow-sm bg-white border-blue-600"
                  placeholder="Enter keyword"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  disabled={formik.values.keywords.length >= 5}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <FaPlus size={14} /> Add
                </button>
              </div>

              {/* Display keywords as tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {formik.values.keywords.map((keyword, index) => (
                  <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
                    <span>{keyword}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="text-blue-800 hover:text-red-500 transition"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {getErrorMessage("keywords")}
              <div className="text-sm text-gray-500 mt-1">{formik.values.keywords.length}/5 keywords added</div>
            </div>

            {/* Website URL */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">Website URL</label>
              <input
                type="text"
                {...formik.getFieldProps("websiteURL")}
                className="border-2 p-2 w-full rounded-lg shadow-sm bg-white border-blue-600"
                placeholder="Enter Website URL"
              />
            </div>

            {/* Established Year */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">Established Year</label>
              <select
                {...formik.getFieldProps("establishedYear")}
                className="border-2 p-2 w-full rounded-lg shadow-sm bg-white border-blue-600"
              >
                <option value="">Select Year</option>
                {establishedYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Accreditation with Other option */}
            <CustomDropdown
              label="Accreditation"
              options={accreditationOptions}
              fieldName="accreditation"
              isOpen={showAccreditationDropdown}
              setIsOpen={setShowAccreditationDropdown}
              hasOther={true}
              otherValue={otherAccreditation}
              setOtherValue={setOtherAccreditation}
            />

            {/* Facilities */}
            <CustomDropdown
              label="Facilities"
              options={facilities}
              fieldName="facilities"
              isOpen={showFacilitiesDropdown}
              setIsOpen={setShowFacilitiesDropdown}
            />

            {/* Admission Process */}
            <CustomDropdown
              label="Admission Process"
              options={["Online Registration", "Counseling", "Document Verification", "Entrance Exam"]}
              fieldName="admissionProcess"
              isOpen={showAdmissionProcessDropdown}
              setIsOpen={setShowAdmissionProcessDropdown}
            />

            {/* Entrance Exams Required with Other option */}
           {/* Entrance Exams Required with Other option */}
            <CustomDropdown
              label="Entrance Exams Required"
              options={entranceExams}
              fieldName="entrance_exam_required"
              isOpen={showEntranceExamDropdown}
              setIsOpen={setShowEntranceExamDropdown}
              hasOther={true}
              otherValue={otherEntranceExam}
              setOtherValue={setOtherEntranceExam}
            />


            {/* Application Form URL */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">Application Form URL</label>
              <input
                type="text"
                {...formik.getFieldProps("applicationFormURL")}
                className="border-2 p-2 w-full rounded-lg shadow-sm bg-white border-blue-600"
                placeholder="Enter application form URL"
              />
            </div>

            {/* Admission Start/End Date */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">Admission Start Date</label>
              <input
                type="date"
                name="admissionEntranceDetails.admissionStartDate"
                value={formik.values.admissionEntranceDetails.admissionStartDate}
                onChange={formik.handleChange}
                className="border-2 p-2 w-full rounded-lg shadow-sm bg-white border-blue-600"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">Admission End Date</label>
              <input
                type="date"
                name="admissionEntranceDetails.admissionEndDate"
                value={formik.values.admissionEntranceDetails.admissionEndDate}
                className="border-2 p-2 w-full rounded-lg shadow-sm bg-white border-blue-600"
                onChange={formik.handleChange}
              />
            </div>

            {/* Last Year Cutoff Marks */}
            <div className="mb-3">
              <label className="block mb-1 text-blue-900 font-semibold">Last Year Cutoff Marks</label>
              <input
                type="number"
                name="admissionEntranceDetails.lastYearCutoffMarks"
                value={formik.values.admissionEntranceDetails.lastYearCutoffMarks}
                onChange={formik.handleChange}
                className="border-2 p-2 w-full rounded-lg shadow-sm bg-white border-blue-600"
                placeholder="Enter last year cutoff marks"
              />
            </div>

            {/* Scholarships Available with Other option */}
            <NestedDropdown
              label="Scholarships Available"
              options={scholarshipAvailable}
              fieldName="admissionEntranceDetails.scholarshipsAvailable"
              isOpen={showScholarshipDropdown}
              setIsOpen={setShowScholarshipDropdown}
              hasOther={true}
              otherValue={otherScholarship}
              setOtherValue={setOtherScholarship}
            />

            {/* Quota System */}
            <NestedDropdown
              label="Quota System"
              options={quotaSystem}
              fieldName="admissionEntranceDetails.quotaSystem"
              isOpen={showQuotaDropdown}
              setIsOpen={setShowQuotaDropdown}
            />

            {/* University Image */}
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <label className="block font-medium mb-2 text-blue-900">
                University Image <span className="text-red-500">(Max: 100KB, JPG/JPEG/PNG)</span>
              </label>
              <div
                className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition"
                onClick={() => document.getElementById("universityImage")?.click()}
              >
                {formik.values.image ? (
                  <div className="relative group">
                    <img
                      src={
                        typeof formik.values.image === "string"
                          ? formik.values.image.startsWith("/")
                            ? `${API_BASE_URL}${formik.values.image}`
                            : formik.values.image
                          : URL.createObjectURL(formik.values.image)
                      }
                      alt="Preview"
                      className="w-full h-32 object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        formik.setFieldValue("image", null)
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">Drag & drop an image here or click to upload</p>
                )}
              </div>
              <input
                type="file"
                id="universityImage"
                accept="image/jpeg,image/jpg,image/png"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Gallery Images */}
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <label className="block font-medium mb-2 text-blue-900">
                Gallery Images <span className="text-red-500">(JPG/JPEG/PNG)</span>
              </label>
              <div
                className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition"
                onClick={() => document.getElementById("galleryImages")?.click()}
              >
                {formik.values.imageGallery?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formik.values.imageGallery.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={
                            typeof file === "string"
                              ? file.startsWith("/")
                                ? `${API_BASE_URL}${file}`
                                : file
                              : URL.createObjectURL(file)
                          }
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveGalleryImage(index)
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 h-10">Drag & drop images here or click to upload</p>
                )}
              </div>
              <input
                type="file"
                id="galleryImages"
                accept="image/jpeg,image/jpg,image/png"
                multiple
                className="hidden"
                onChange={handleImageGalleryChange}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <motion.button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg w-full md:w-auto px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : submitButtonText}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default EditUniversityForm
