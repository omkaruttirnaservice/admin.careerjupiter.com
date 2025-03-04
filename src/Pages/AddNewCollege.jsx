import React, { useState, useRef } from "react";
import { useFormik } from "formik";    //manage form data, handle validation, and submit forms
import * as Yup from "yup";            //Validate Data 
import { useMutation } from "@tanstack/react-query";    //handle action that modify data
import { createCollege } from "../api/college-api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";   //Handle Maps
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";         //easily display notification
import { motion } from "framer-motion";         // add animations and transitions to elements
import stateDistricts from "../Constant/ConstantData";     //import predefined data
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";             

const defaultLocation = { lat: 19.7515, lan: 75.7139 };      //default geographical location with latitude and longitude 

// categories of college
const collegeCategories = [
  "Diploma",
  "Engineering",
  "Pharmacy",
  "HSC",
  "SSC",
  "UG",
  "PG",
];

// Types of College
const collegeTypes = ["Private", "Government", "Autonomous", "Deemed"];

// Options of Accreditation
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

// Available Scholership
const scholershipAvailable = [
  "Merit-based",
  "Need-based",
  "Sports-based",
  "Other",
];

//Quota System
const quotaSystem = ["Management", "SC/ST", "OBC", "General"];

//get current year from system's date & time
const currentYear = new Date().getFullYear();

//creates array of years from 1980 to current year
const establishedYears = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, i) => 1980 + i
);

const LocationMarker = ({ setLocation, location, setFieldValue }) => {
  useMapEvents({
    click(e) {
      const newLocation = { lat: e.latlng.lat, lan: e.latlng.lng };
      console.log("Map Click Location:", newLocation); // Debugging line

      // Update location state
      setLocation(newLocation);

      // Update Formik values
      setFieldValue("lat", newLocation.lat);
      setFieldValue("lan", newLocation.lan);
    },
  });

  // Render the marker if location is set
  return location.lat && location.lan ? (
    <Marker position={[location.lat, location.lan]} />
  ) : null;
};

const MultiStepForm = () => {
  const [location, setLocation] = useState(defaultLocation);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const mapRef = useRef(); // Ref for the map

  const mutation = useMutation({
    mutationFn: createCollege,
    onMutate: () => {
      toast.info("Submitting college details...");
    },
    onSuccess: () => {
      toast.success("College created successfully!");
      formik.resetForm();
      setLocation(defaultLocation);
    },
    onError: (error) => {
      console.error("API Error:", error);
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      collegeName: "",
      affiliatedUniversity: "",
      collegeCategory: "",
      collegeType: "",
      lat: location.lat,
      lan: location.lan,
      address_line1: "",
      address_line2: "",
      pincode: "",
      state: "Maharashtra",
      district: "Mumbai",
      contactDetails: "",
      info: "",
      websiteURL: "",
      establishedYear: "",
      accreditation: "",
      admissionProcess: "",
      applicationFormURL: "",
      image: null,
      imageGallery: [],
      email_id: "",
      keywords: [],
      admissionEntranceDetails: {
        admissionStartDate: "",
        admissionEndDate: "",
        lastYearCutoffMarks: "",
        scholarshipsAvailable: [],
        quotaSystem: [],
      },
    },
    validationSchema: Yup.object({
      collegeName: Yup.string().required("College Name is required"),
      affiliatedUniversity: Yup.string().required(
        "Affiliated University is required"
      ),
      contactDetails: Yup.string()
        .matches(/^\d{10}$/, "Only numbers are allowed & 10 digit")
        .required("Contact Details are required"),
      pincode: Yup.string()
        .matches(/\d{6}/, "Pincode must be exactly 6 digits")
        .required("Pincode is required"),
      websiteURL: Yup.string().url("Website URL must be a valid URL"),
      applicationFormURL: Yup.string().url(
        "Application Form URL must be a valid URL"
      ),
      info: Yup.string().required("Info is required"),
      image: Yup.mixed(),
      imageGallery: Yup.array(),
      address_line1: Yup.string().required("Address Line 1 is required"),
      state: Yup.string().required("State is required"),
      district: Yup.string().required("District is required"),
      lat: Yup.number().required("Latitude is required"),
      lan: Yup.number().required("Longitude is required"),
      email_id: Yup.string()
        .email("Invalid email address")
        .required("Email ID is required"),
      keywords: Yup.array()
        .of(Yup.string().required("Keyword cannot be empty"))
        .max(5, "Maximum 5 keywords allowed"),
      admissionEntranceDetails: Yup.object({
        admissionStartDate: Yup.date().required(
          "Admission Start Date is required"
        ),
        admissionEndDate: Yup.date().required("Admission End Date is required"),
        lastYearCutoffMarks: Yup.number().required(
          "Last Year Cutoff Marks is required"
        ),
        scholarshipsAvailable: Yup.array()
          .of(
            Yup.string().oneOf(scholershipAvailable, "Invalid scholarship type")
          )
          .required("At least one scholarship type is required"),
        quotaSystem: Yup.array()
          .of(Yup.string().oneOf(quotaSystem, "Invalid quota type"))
          .required("At least one quota type is required"),
      }),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);

      const formData = new FormData();

      // Append flat fields
      formData.append("collegeName", values.collegeName);
      formData.append("affiliatedUniversity", values.affiliatedUniversity);
      formData.append("collegeCategory", values.collegeCategory);
      formData.append("collegeType", values.collegeType);
      formData.append("contactDetails", values.contactDetails);
      formData.append("info", values.info);
      formData.append("websiteURL", values.websiteURL);
      formData.append("establishedYear", values.establishedYear);
      formData.append("accreditation", values.accreditation);
      formData.append("admissionProcess", values.admissionProcess);
      formData.append("applicationFormURL", values.applicationFormURL);
      formData.append("email_id", values.email_id);
      formData.append("keywords", JSON.stringify(values.keywords));

      // Append nested address fields
      formData.append("address[line1]", values.address_line1);
      formData.append("address[line2]", values.address_line2);
      formData.append("address[pincode]", values.pincode);
      formData.append("address[state]", values.state);
      formData.append("address[dist]", values.district);

      // Append nested location fields
      formData.append("location[lat]", values.lat);
      formData.append("location[lan]", values.lan);

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
        JSON.stringify(values.admissionEntranceDetails.scholarshipsAvailable)
      );
      formData.append(
        "admissionEntranceDetails[quotaSystem]",
        JSON.stringify(values.admissionEntranceDetails.quotaSystem)
      );

      // Log FormData entries
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

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

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const data = await response.json();
      console.log("Nominatim API Response:", data); // Debugging line

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newLocation = { lat: parseFloat(lat), lan: parseFloat(lon) };
        console.log("New Location:", newLocation); // Debugging line

        // Update location state
        setLocation(newLocation);

        // Update Formik values
        formik.setFieldValue("lat", newLocation.lat);
        formik.setFieldValue("lan", newLocation.lan);

        // Re-center the map
        if (mapRef.current) {
          mapRef.current.flyTo([newLocation.lat, newLocation.lan], 12, {
            animate: true,
            duration: 1.5,
          });
        }
      } else {
        toast.error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location data:", error); // Debugging line
      toast.error("Error fetching location data");
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lan: longitude };
          setLocation(newLocation);
          formik.setFieldValue("lat", newLocation.lat);
          formik.setFieldValue("lan", newLocation.lan);
        },
        (error) => {
          toast.error("Error fetching current location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-2"
    >
      <fieldset className="max-w-full mx-auto bg-white shadow-lg rounded-lg p-6">
        <legend className="text-2xl font-bold text-center mb-4">
          College Registration Form
        </legend>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block mb-1">College Name</label>
              <input
                type="text"
                {...formik.getFieldProps("collegeName")}
                className="border p-2 w-full rounded"
              />
              {formik.touched.collegeName && formik.errors.collegeName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.collegeName}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="block mb-1">Affiliated University</label>
              <input
                type="text"
                {...formik.getFieldProps("affiliatedUniversity")}
                className="border p-2 w-full rounded"
              />
              {formik.touched.affiliatedUniversity &&
                formik.errors.affiliatedUniversity && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.affiliatedUniversity}
                  </p>
                )}
            </div>

            <div className="mb-3">
              <label className="block mb-1">College Category</label>
              <select
                {...formik.getFieldProps("collegeCategory")}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Category</option>
                {collegeCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {formik.touched.collegeCategory &&
                formik.errors.collegeCategory && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.collegeCategory}
                  </p>
                )}
            </div>

            <div className="mb-3">
              <label className="block mb-1">College Type</label>
              <select
                {...formik.getFieldProps("collegeType")}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Type</option>
                {collegeTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {formik.touched.collegeType && formik.errors.collegeType && (
                <p className="text-red-500 text-sm">
                  {formik.errors.collegeType}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="block mb-1">Address 1</label>
              <input
                type="text"
                {...formik.getFieldProps("address_line1")}
                className="border p-2 w-full rounded"
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
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Pincode</label>
              <input
                type="text"
                {...formik.getFieldProps("pincode")}
                className="border p-2 w-full rounded"
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <p className="text-red-500 text-sm">{formik.errors.pincode}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block mb-1">Select State</label>
              <select
                {...formik.getFieldProps("state")}
                className="border p-2 w-full rounded"
                onChange={(e) => {
                  const selectedState = e.target.value;
                  formik.setFieldValue("state", selectedState);
                  formik.setFieldValue("district", ""); // Reset district on state change
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
                {...formik.getFieldProps("district")}
                className="border p-2 w-full rounded"
                disabled={!formik.values.state} // Disable if no state is selected
              >
                <option value="">Select District</option>
                {formik.values.state &&
                  stateDistricts[formik.values.state]?.map(
                    (district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1">Contact Details</label>
              <input
                type="text"
                {...formik.getFieldProps("contactDetails")}
                className="border p-2 w-full rounded"
              />
              {formik.touched.contactDetails &&
                formik.errors.contactDetails && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.contactDetails}
                  </p>
                )}
            </div>

            <div className="mb-3 col-span-full w-full">
              <label className="block mb-1">Description</label>
              <textarea
                {...formik.getFieldProps("info")}
                className="border p-2 w-full rounded"
                rows="4"
              />
              {formik.touched.info && formik.errors.info && (
                <p className="text-red-500 text-sm">{formik.errors.info}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block mb-1">Website URL</label>
              <input
                type="text"
                {...formik.getFieldProps("websiteURL")}
                className="border p-2 w-full rounded"
              />
              {formik.touched.websiteURL && formik.errors.websiteURL && (
                <p className="text-red-500 text-sm">
                  {formik.errors.websiteURL}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="block mb-1">Established Year</label>
              <select
                {...formik.getFieldProps("establishedYear")}
                className="border p-2 w-full rounded"
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
                className="border p-2 w-full rounded"
              >
                <option value="">Select Accreditation</option>
                {accreditationOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1">Admission Process</label>
              <input
                type="text"
                {...formik.getFieldProps("admissionProcess")}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Application Form URL</label>
              <input
                type="text"
                {...formik.getFieldProps("applicationFormURL")}
                className="border p-2 w-full rounded"
              />
              {formik.touched.applicationFormURL &&
                formik.errors.applicationFormURL && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.applicationFormURL}
                  </p>
                )}
            </div>

            <div className="mb-3">
              <label className="block mb-1">emial</label>
              <input
                type="email"
                {...formik.getFieldProps("email_id")}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Keywords (Max 5)</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                  className="border p-2 w-full rounded"
                />
                {/* Add Keyword Icon Button */}
                <button
                  type="button"
                  onClick={addKeyword}
                  className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <FaPlus className="w-5 h-5" /> {/* Plus icon */}
                </button>
              </div>
              {/* Display Keywords with Cancel Buttons */}
              <div className="mt-2">
                {formik.values.keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {/* Validation Error Message */}
              {formik.touched.keywords && formik.errors.keywords ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.keywords}
                </div>
              ) : null}
            </div>

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
                  className="border p-2 w-full rounded"
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
                  value={
                    formik.values.admissionEntranceDetails.admissionEndDate
                  }
                  className="border p-2 w-full rounded"
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
                value={
                  formik.values.admissionEntranceDetails.lastYearCutoffMarks
                }
                onChange={formik.handleChange}
                className="border p-2 w-full rounded"
              />
              {formik.errors.admissionEntranceDetails?.lastYearCutoffMarks && (
                <div>
                  {formik.errors.admissionEntranceDetails.lastYearCutoffMarks}
                </div>
              )}
            </div>

            {/* Scholarships Available - Multi-Select */}
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">
                Scholarships Available
              </label>
              <select
                name="admissionEntranceDetails.scholarshipsAvailable"
                multiple
                value={
                  formik.values.admissionEntranceDetails.scholarshipsAvailable
                }
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
                className="border p-2 w-full rounded focus:ring focus:ring-blue-200"
              >
                {scholershipAvailable.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {formik.errors.admissionEntranceDetails
                ?.scholarshipsAvailable && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.admissionEntranceDetails.scholarshipsAvailable}
                </div>
              )}
            </div>

            {/* Quota System - Multi-Select */}
            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">
                Quota System
              </label>
              <select
                name="admissionEntranceDetails.quotaSystem"
                multiple
                value={formik.values.admissionEntranceDetails.quotaSystem}
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
                className="border p-2 w-full rounded focus:ring focus:ring-blue-200"
              >
                {quotaSystem.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {formik.errors.admissionEntranceDetails?.quotaSystem && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.admissionEntranceDetails.quotaSystem}
                </div>
              )}
            </div>

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
                  <p className="text-gray-500 h-4">
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

            {/* </div> */}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Select your location on the map:
            </label>

            <div className="flex gap-2 mb-2">
              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location"
                className="border p-2 w-full rounded"
              />

              {/* Search Button */}
              <button
                type="button"
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Search
              </button>

              {/* Current Location Button */}
              <button
                type="button"
                onClick={handleCurrentLocation}
                className="bg-green-500 text-white px-4 py-2 font-medium rounded"
              >
                Current
              </button>
            </div>

            {/* Leaflet Map */}
            <MapContainer
              center={[location.lat, location.lan]}
              zoom={8}
              style={{ height: "300px", width: "100%" }}
              ref={mapRef} // Pass the ref to the MapContainer
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker
                setLocation={setLocation}
                location={location}
                setFieldValue={formik.setFieldValue}
              />
            </MapContainer>
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
      </fieldset>
    </motion.div>
  );
};

export default MultiStepForm;
