import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
// import { createCollege } from "../api/college-api";
import { createUniversity } from "../api/University-api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import stateDistricts from "../Constant/ConstantData";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaUniversity } from "react-icons/fa";
import CheckboxGroup from "../Component/CheckboxGroup";
import InputField from "../Component/InputField";
import MultiSelectField from "../Component/MultiSelectField";
import TextAreaField from "../Component/TextAreaField";
import MultiSelectDropdown from "../Component/MultiSelectDropdown";

const UniversityCategories = ["Private", "Government", "Autonomous", "Deemed"];
const facilities = ["Library", "Hostel", "Sport Complex", "WiFi Campus"];
const accreditationOptions = [
  "NAAC A++",
  "NAAC A+",
  "NAAC A",
  "NBA Accredited",
  "UGC Approved",
  "AICTE Approved",
  "ISO Certified",
  "NIRF Ranked",
];
const scholershipAvailable = [
  "Merit-based",
  "Need-based",
  "Sports-based",
  "Other",
];
const quotaSystem = ["Management", "SC/ST", "OBC", "Genereal"];
const entranceExams = [
  "JEE",
  "NEET",
  "CAT",
  "GATE",
  "CLAT",
  "LSAT",
  "XAT",
  "CMAT",
  "MAT",
];
const currentYear = new Date().getFullYear();
const establishedYears = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, i) => 1980 + i
);

const AddUniversity = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const mapRef = useRef(); // Ref for the map

  const mutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: (data) => {
      // toast.success("University created successfully!");
      alert("University Created Successfully");
      console.log("API Response:", data);
      formik.resetForm(); // Reset the form after successful submission
      setImage(null); // ✅ Reset image
      setGalleryImages([]); // ✅ Reset gallery images
      setKeywordInput(""); // ✅ Reset keyword input
    },
    onError: (error) => {
      console.error("API Error:", error.response?.data || error.message);
      toast.error(
        ` ${
          error.response?.data?.message ||
          error.message ||
          error.response?.data.errMsg
        } ||Something went wrong:`
      );
      alert(
        `Submission Failed: ${
          error.response?.data?.message ||
          error.message ||
          error.response?.data.errMsg
        }`
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      universityName: "",
      Category: "",
      address_line1: "",
      address_line2: "",
      pincode: "",
      state: "",
      dist: "",
      contactDetails: "",
      info: "",
      websiteURL: "",
      establishedYear: "",
      accreditation: [],
      admissionProcess: [],
      applicationFormURL: "",
      image: null,
      imageGallery: [],
      email_id: "",
      facilities: "",
      keywords: [],
      admissionEntranceDetails: {
        admissionStartDate: "",
        admissionEndDate: "",
        lastYearCutoffMarks: "",
        scholarshipsAvailable: [],
        quotaSystem: [],
      },
    },
    // validationSchema: Yup.object().shape({
    //   // University Name
    //   universityName: Yup.string()
    //     .required("University Name is required")
    //     .min(3, "University Name must be at least 3 characters"),

    //   // Category
    //   universityCategory: Yup.string().required(
    //     "University Category is required"
    //   ),

    //   // Location (Latitude and Longitude)
    //   lat: Yup.number()
    //     .required("Latitude is required")
    //     .typeError("Latitude must be a number"),
    //   lan: Yup.number()
    //     .required("Longitude is required")
    //     .typeError("Longitude must be a number"),

    //   // Address Details
    //   address_line1: Yup.string().required("Address Line 1 is required"),
    //   address_line2: Yup.string().optional(), // Optional field
    //   pincode: Yup.string()
    //     .required("Pincode is required")
    //     .matches(/^\d{6}$/, "Pincode must be 6 digits"),
    //   state: Yup.string().required("State is required"),
    //   dist: Yup.string().required("District is required"),

    //   // Contact Details
    //   contactDetails: Yup.string()
    //     .required("Contact Details are required")
    //     .matches(/^\d{10}$/, "Contact Details must be a 10-digit number"),

    //   // General Information
    //   info: Yup.string()
    //     .required("Information is required")
    //     .min(10, "Information must be at least 10 characters"),

    //   // Website URL
    //   websiteURL: Yup.string()
    //     .url("Invalid URL format")
    //     .required("Website URL is required"),

    //   // Established Year
    //   establishedYear: Yup.number()
    //     .required("Established Year is required")
    //     .min(1800, "Established Year must be after 1800")
    //     .max(
    //       new Date().getFullYear(),
    //       "Established Year cannot be in the future"
    //     ),

    //   // Accreditation
    //   accreditation: Yup.string().required("Accreditation is required"),

    //   // Admission Process
    //   admissionProcess: Yup.string().required("Admission Process is required"),

    //   // Application Form URL
    //   applicationFormURL: Yup.string()
    //     .url("Invalid URL format")
    //     .required("Application Form URL is required"),

    //   // Email ID
    //   email_id: Yup.string()
    //     .email("Invalid email format")
    //     .required("Email is required"),

    //   // Facilities
    //   facilities: Yup.string().required("Facilities are required"),

    //   // Keywords
    //   keywords: Yup.array()
    //     .of(Yup.string())
    //     .min(1, "At least one keyword is required"),

    //   // Image
    //   image: Yup.mixed()
    //     .required("Image is required")
    //     .test("fileType", "Unsupported file format", (value) => {
    //       if (value) {
    //         return ["image/jpeg", "image/png", "image/jpg"].includes(
    //           value.type
    //         );
    //       }
    //       return true;
    //     }),

    //   // Image Gallery
    //   imageGallery: Yup.array()
    //     .of(
    //       Yup.mixed().test("fileType", "Unsupported file format", (value) => {
    //         if (value) {
    //           return ["image/jpeg", "image/png", "image/jpg"].includes(
    //             value.type
    //           );
    //         }
    //         return true;
    //       })
    //     )
    //     .min(1, "At least one image is required"),

    //   // Admission Entrance Details
    //   admissionEntranceDetails: Yup.object().shape({
    //     admissionStartDate: Yup.date()
    //       .required("Admission Start Date is required")
    //       .typeError("Invalid date format"),
    //     admissionEndDate: Yup.date()
    //       .required("Admission End Date is required")
    //       .typeError("Invalid date format")
    //       .min(
    //         Yup.ref("admissionStartDate"),
    //         "End Date must be after Start Date"
    //       ),
    //     lastYearCutoffMarks: Yup.number()
    //       .required("Last Year Cutoff Marks are required")
    //       .min(0, "Cutoff Marks cannot be negative")
    //       .max(100, "Cutoff Marks cannot exceed 100"),
    //     scholarshipsAvailable: Yup.array()
    //       .of(Yup.string())
    //       .min(1, "At least one scholarship is required"),
    //     quotaSystem: Yup.array()
    //       .of(Yup.string())
    //       .min(1, "At least one quota is required"),
    //   }),
    // }),

    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Handle form submission

      const formData = new FormData();

      // Append flat fields
      formData.append("universityName", values.universityName);

      formData.append("Category", values.Category);
      formData.append("contactDetails", values.contactDetails);
      // formData.append("info", values.info);
      formData.append("info[description]", values.info.description);
      formData.append("websiteURL", values.websiteURL);
      formData.append("establishedYear", values.establishedYear);
      formData.append("accreditation", values.accreditation);
      formData.append("admissionProcess", values.admissionProcess);
      formData.append("applicationFormURL", values.applicationFormURL);
      formData.append("email_id", values.email_id);
      formData.append("facilities", values.facilities);

      formData.append("keywords", values.keywords);

      // Append nested address fields
      formData.append("address[line1]", values.address_line1);
      formData.append("address[line2]", values.address_line2);
      formData.append("address[pincode]", values.pincode);
      formData.append("address[state]", values.state);
      formData.append("address[dist]", values.dist);

      // Append nested location fields
      // formData.append("location[lat]", values.lat);
      // formData.append("location[lan]", values.lan);

      // Append image and gallery images
      if (values.image) {
        formData.append("image", values.image);
      }

      values.imageGallery.forEach((file, index) => {
        formData.append(`imageGallery[${index}]`, file);
      });

      // Append admissionEntranceDetails fields
      formData.append(
        "admissionEntranceDetails[admissionStartDate]",
        values.admissionEntranceDetails.admissionStartDate
      );
      formData.append(
        "admissionEntranceDetails[admissionEndDate]",
        values.admissionEntranceDetails.admissionEndDate
      );
      formData.append(
        "admissionEntranceDetails[lastYearCutoffMarks]",
        values.admissionEntranceDetails.lastYearCutoffMarks
      );
      formData.append(
        "admissionEntranceDetails[scholarshipsAvailable]",
        values.admissionEntranceDetails.scholarshipsAvailable
      );
      formData.append(
        "admissionEntranceDetails[quotaSystem]",
        values.admissionEntranceDetails.quotaSystem
      );

      // Log FormData entries
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      console.group("FormData Submission");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.groupEnd();

      console.log("Submitting FormData:", formData);
      mutation.mutate(formData);
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      formik.setFieldValue("image", file);
    }
  };

  const handleImageGalleryChange = (event) => {
    const files = Array.from(event.target.files);
    setGalleryImages((prevImages) => [...prevImages, ...files]);
    formik.setFieldValue("imageGallery", [
      ...formik.values.imageGallery,
      ...files,
    ]);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && formik.values.keywords.length < 5) {
      formik.setFieldValue("keywords", [
        ...formik.values.keywords,
        keywordInput.trim(),
      ]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (index) => {
    const updatedKeywords = formik.values.keywords.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("keywords", updatedKeywords);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl bg-white shadow-xl rounded-xl p-8 border border-blue-300 "
    >
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-lg shadow-lg">
        <h2 className="text-3xl font-bold flex items-center gap-4">
          <FaUniversity
            className="text-black bg-white p-2 rounded-md shadow-md"
            size={40}
          />
          University Registration Form
        </h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="University Name"
            type="text"
            name="universityName"
            placeholder="Enter university name"
            formik={formik}
          />

          <div className="mb-3">
            <label className="block mb-1">University Category</label>
            <select
              {...formik.getFieldProps("universityCategory")} // Updated field name
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            >
              <option value="">Select University Category</option>
              {UniversityCategories.map(
                (
                  category,
                  index // Use `UniversityCategories` array
                ) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
            {formik.touched.universityCategory &&
              formik.errors.universityCategory && ( // Updated field name
                <p className="text-red-500 text-sm">
                  {formik.errors.universityCategory}
                </p>
              )}
          </div>

          <div className="mb-3">
            <label className="block mb-1">Address 1</label>
            <input
              type="text"
              {...formik.getFieldProps("address_line1")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
            {formik.touched.address_line1 && formik.errors.address_line1 && (
              <p className="text-red-500 text-sm">
                {formik.errors.address_line1}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label className="block mb-1">Address 2</label>
            <input
              type="text"
              {...formik.getFieldProps("address_line2")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Pincode</label>
            <input
              type="text"
              {...formik.getFieldProps("pincode")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
            {formik.touched.pincode && formik.errors.pincode && (
              <p className="text-red-500 text-sm">{formik.errors.pincode}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block mb-1">Select State</label>
            <select
              {...formik.getFieldProps("state")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
              onChange={(e) => {
                const selectedState = e.target.value;
                formik.setFieldValue("state", selectedState);
                formik.setFieldValue("dist", ""); // Reset district on state change
              }}
            >
              <option value="">Select State</option>
              {Object.keys(stateDistricts).map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div className="mb-3">
            <label className="block mb-1">Select District</label>
            <select
              {...formik.getFieldProps("dist")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
              disabled={!formik.values.state} // Disable if no state is selected
            >
              <option value="">Select District</option>
              {formik.values.state &&
                stateDistricts[formik.values.state]?.map((dist, index) => (
                  <option key={index} value={dist}>
                    {dist}
                  </option>
                ))}
            </select>
          </div>

          <InputField
            label="Contact Details"
            type="text"
            name="contactDetails"
            placeholder="Enter contact details"
            formik={formik}
          />

          <TextAreaField
            label="Description"
            name="info.description"
            formik={formik}
          />

          <InputField
            label="Website URL"
            type="text"
            name="websiteURL"
            placeholder="Enter Website URL "
            formik={formik}
          />

          {/* <div className="mb-3">
            <label className="block mb-1">Website URL</label>
            <input
              type="text"
              {...formik.getFieldProps("websiteURL")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
            {formik.touched.websiteURL && formik.errors.websiteURL && (
              <p className="text-red-500 text-sm">{formik.errors.websiteURL}</p>
            )}
          </div> */}

          <div className="mb-3">
            <label className="block mb-1">Established Year</label>
            <select
              {...formik.getFieldProps("establishedYear")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            >
              <option value="">Select Year</option>
              {establishedYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Accreditation</label>
            <select
              {...formik.getFieldProps("accreditation")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            >
              <option value="">Select Accreditation</option>
              {accreditationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <InputField
            label="Admission Process"
            type="text"
            name="admissionProcess"
            placeholder="Enter Admission Process "
            formik={formik}
          />
          {/* <div className="mb-3">
            <label className="block mb-1">Admission Process</label>
            <input
              type="text"
              {...formik.getFieldProps("admissionProcess")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div> */}

          <InputField
            label="Email"
            type="text"
            name="email_id"
            placeholder="Enter Email Id "
            formik={formik}
          />

<MultiSelectField
            label="Keywords (Max 5)"
            name="keywords"
            formik={formik}
          />
          {/* <div className="mb-3">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...formik.getFieldProps("email_id")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div> */}

          {/* <div className="mb-3">
            <label className="block mb-1">Facilities</label>
            <div className="flex flex-wrap gap-2">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`facility-${index}`}
                    name="facilities"
                    value={facility}
                    checked={formik.values.facilities.includes(facility)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const updatedFacilities = isChecked
                        ? [...formik.values.facilities, facility]
                        : formik.values.facilities.filter(
                            (f) => f !== facility
                          );
                      formik.setFieldValue("facilities", updatedFacilities);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`facility-${index}`} className="text-sm">
                    {facility}
                  </label>
                </div>
              ))}
            </div>
            {formik.touched.facilities && formik.errors.facilities && (
              <p className="text-red-500 text-sm">{formik.errors.facilities}</p>
            )}
          </div> */}

          <CheckboxGroup
            label="Facilities"
            name="facilities"
            options={facilities}
            formik={formik}
          />

          {/* <div className="mb-3">
            <label className="block mb-1">Keywords (Max 5)</label>
            <div className="flex items-center">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                className="border-2 p-2 w-full rounded bg-white border-blue-600"
              />
              {/* Add Keyword Icon Button */}
          {/* <button
                type="button"
                onClick={addKeyword}
                className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              >
                <FaPlus className="w-5 h-5" /> {/* Plus icon */}
          {/* </button>
            </div> */}
          {/* Display Keywords with Cancel Buttons */}
          {/* <div className="mt-2">
              {formik.values.keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(index)}
                    className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div> */}
          {/* Validation Error Message */}
          {/* {formik.touched.keywords && formik.errors.keywords ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.keywords}
              </div>
            ) : null}
          </div> */}

          

          {/* add more fields */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label>Admission Start Date</label>
              <input
                type="date"
                name="admissionEntranceDetails.admissionStartDate"
                value={
                  formik.values.admissionEntranceDetails.admissionStartDate
                }
                onChange={formik.handleChange}
                className="border-2 p-2 w-full rounded bg-white border-blue-600"
              />
              {formik.errors.admissionEntranceDetails?.admissionStartDate && (
                <div>
                  {formik.errors.admissionEntranceDetails.admissionStartDate}
                </div>
              )}
            </div>

            <div>
              <label>Admission End Date</label>
              <input
                type="date"
                name="admissionEntranceDetails.admissionEndDate"
                value={formik.values.admissionEntranceDetails.admissionEndDate}
                className="border-2 p-2 w-full rounded bg-white border-blue-600"
                onChange={formik.handleChange}
              />
              {formik.errors.admissionEntranceDetails?.admissionEndDate && (
                <div>
                  {formik.errors.admissionEntranceDetails.admissionEndDate}
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label>Last Year Cutoff Marks</label>
            <input
              type="number"
              name="admissionEntranceDetails.lastYearCutoffMarks"
              value={formik.values.admissionEntranceDetails.lastYearCutoffMarks}
              onChange={formik.handleChange}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
            {formik.errors.admissionEntranceDetails?.lastYearCutoffMarks && (
              <div>
                {formik.errors.admissionEntranceDetails.lastYearCutoffMarks}
              </div>
            )}
          </div>

          {/* Scholarships Available - Single Select */}
          <select
            name="admissionEntranceDetails.scholarshipsAvailable"
            value={
              formik.values.admissionEntranceDetails.scholarshipsAvailable || []
            }
            multiple // ✅ Allows multiple selections
            onChange={(e) => {
              const selectedValues = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              formik.setFieldValue(
                "admissionEntranceDetails.scholarshipsAvailable",
                selectedValues
              );
            }}
            className="border-2 p-2 w-full rounded bg-white border-blue-600"
          >
            <option value="" disabled>
              Select Scholarship
            </option>
            {scholershipAvailable.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Quota System - Single Select */}
          <select
            name="admissionEntranceDetails.quotaSystem"
            value={formik.values.admissionEntranceDetails.quotaSystem || []}
            multiple // ✅ Enables multiple selections
            onChange={(e) => {
              const selectedValues = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              formik.setFieldValue(
                "admissionEntranceDetails.quotaSystem",
                selectedValues
              );
            }}
            className="border-2 p-2 w-full rounded bg-white border-blue-600"
          >
            <option value="" disabled>
              Select Quota
            </option>
            {quotaSystem.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <MultiSelectDropdown
            label="Entrance Exams Required"
            name="entrance_exam_required"
            options={entranceExams}
            formik={formik}
          />

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"> */}
          {/* College Image Upload */}
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <label className="block font-medium mb-2">
              College Image{" "}
              <span className="text-red-500">(Max: 100KB, JPG/JPEG/PNG)</span>
            </label>
            <div
              className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition"
              onClick={() => document.getElementById("collegeImage").click()}
            >
              {formik.values.image ? (
                <img
                  src={URL.createObjectURL(formik.values.image)}
                  alt="Preview"
                  className="w-full h-12 object-cover rounded"
                />
              ) : (
                <p className="text-gray-500">
                  Drag & drop an image here or click to upload
                </p>
              )}
            </div>
            <input
              type="file"
              id="collegeImage"
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                if (file && file.size <= 102400) {
                  formik.setFieldValue("image", file);
                } else {
                  toast.error("Image must be JPG/JPEG/PNG and under 100KB");
                }
              }}
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm">{formik.errors.image}</p>
            )}
          </div>

          {/* Gallery Images Upload */}
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <label className="block font-medium mb-2">
              Gallery Images{" "}
              <span className="text-red-500"> (JPG/JPEG/PNG)</span>
            </label>
            <div
              className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition"
              onClick={() => document.getElementById("galleryImages").click()}
            >
              {formik.values.gallery_image?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formik.values.gallery_image.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-12 object-cover rounded"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 h-10">
                  Drag & drop images here or click to upload
                </p>
              )}
            </div>
            <input
              type="file"
              id="galleryImages"
              accept="image/jpeg,image/jpg,image/png"
              multiple
              className="hidden"
              onChange={(event) => {
                const files = Array.from(event.currentTarget.files);
                formik.setFieldValue("gallery_image", files);
              }}
            />
            {formik.touched.gallery_image && formik.errors.gallery_image && (
              <p className="text-red-500 text-sm">
                {formik.errors.gallery_image}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <motion.button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!mutation.isLoading ? { scale: 1.05 } : {}}
            whileTap={!mutation.isLoading ? { scale: 0.95 } : {}}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Submitting..." : "Submit"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddUniversity;
