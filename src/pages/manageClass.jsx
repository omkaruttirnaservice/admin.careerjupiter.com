import React, { useEffect, useState } from "react";
import {
  FaImage,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaWindowClose,
} from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import InputField from "../component/inputField";
import RadioGroup from "../component/radioGroup";
import CheckboxGroup from "../component/checkboxGroup";
import MultiSelectDropdown from "../component/multiSelectDropdown";
import { getCookie } from "../utlis/cookieHelper";
import AddressModal from "../component/addressModel";
import Swal from "sweetalert2";
import { MdDone } from "react-icons/md";
import FileUpload from "../component/fileUpload";
import * as Yup from "yup";
import MultiSelectField from "../component/multiSelectField";

// Helper function to safely parse JSON fields
const parseJSONField = (field) => {
  try {
    return typeof field === "string" ? JSON.parse(field) : field;
  } catch {
    return [];
  }
};

// Options for discount dropdown
const discountOptions = [
  { label: "Discount Not Applicable", value: 0 },
  { label: "Discount 5%", value: 5 },
  { label: "Discount 10%", value: 10 },
  { label: "Discount 15%", value: 15 },
  { label: "Discount 20%", value: 20 },
  { label: "Discount 25%", value: 25 },
  { label: "Discount 30%", value: 30 },
  { label: "Discount 35%", value: 35 },
  { label: "Discount 40%", value: 40 },
  { label: "Discount 45%", value: 45 },
  { label: "Discount 50%", value: 50 },
  { label: "Discount 55%", value: 55 },
  { label: "Discount 60%", value: 60 },
  { label: "Discount 65%", value: 65 },
  { label: "Discount 70%", value: 70 },
  { label: "Discount 75%", value: 75 },
  { label: "Discount 80%", value: 80 },
];

const ManageClass = () => {
  const navigate = useNavigate();
  const storedClassId = Cookies.get("classId");
  const [classId, setClassId] = useState(storedClassId || "");
  const [classDetails, setClassDetails] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [tempEditAddress, setTempEditAddress] = useState(null);
  const [roadmapOptions, setRoadmapOptions] = useState([]);

  // Fetch Class ID
  useEffect(() => {
    const storedClassId = getCookie("classID"); // Use getCookie function
    if (storedClassId) {
      setClassId(storedClassId);
      console.log("Class ID retrieved from cookies:", storedClassId);
    } else {
      console.warn("Class ID not found in cookies!");
    }
  }, []);

  // Fetch class details from get method
  useEffect(() => {
    const fetchClassDetails = async () => {
      if (!classId) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/class/${classId}`
        );
        // console.log("📌 Full API Response:", response.data);

        let classData = response.data?.data?.class || {};

        // class Description
        classData.info = {
          description: classData?.info?.description || "",
        };

        // Ensure Subjects & Teaching Medium are parsed
        classData.subjectsOrCourses =
          parseJSONField(classData.subjectsOrCourses) || [];
        classData.teachingMedium =
          parseJSONField(classData.teachingMedium) || [];
        classData.keywords = parseJSONField(classData.keywords) || [];

        // Ensure other fields exist
        classData.modeOfTeaching = classData?.modeOfTeaching || ""; // Mode of teaching
        classData.category = classData?.category || []; // Category
        classData.yearEstablished = classData?.yearEstablished || 0; // Established Year
        classData.className = classData?.className || ""; // Class Name
        classData.ownerOrInstituteName = classData?.ownerOrInstituteName || ""; // Owner or Institute Name
        classData.franchiseOrIndependent =
          classData?.franchiseOrIndependent || ""; // Type
        classData.contactDetails = classData?.contactDetails || ""; // Cantact Details
        classData.websiteURL = classData?.websiteURL || ""; // website URL
        classData.discount = classData?.discount || ""; // Discount

        console.log("📌 Processed Class Data:", classData);
        setClassDetails(classData); // Update state

        // Update Formik with new data
        formik.setValues({
          ...formik.values,
          ...classData, // Merge class details into Formik values
        });
      } catch (error) {
        console.error(
          error.response?.data.errMsg || "❌ Error fetching class details:",
          error
        );
      }
    };

    fetchClassDetails();
  }, [classId]);

  // ✅ Initialize Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      className: classDetails?.className || "",
      ownerOrInstituteName: classDetails?.ownerOrInstituteName || "",
      typeOfClass: classDetails?.typeOfClass || "",
      category: classDetails?.category || "",
      subjectsOrCourses: classDetails?.subjectsOrCourses || [],
      modeOfTeaching: classDetails?.modeOfTeaching || "",
      teachingMedium: classDetails?.teachingMedium || [],
      yearEstablished: classDetails?.yearEstablished || "",
      franchiseOrIndependent: classDetails?.franchiseOrIndependent || "",
      contactDetails: classDetails?.contactDetails || "",
      websiteURL: classDetails?.websiteURL || "",
      image: classDetails?.image || null,
      address:
        classDetails?.address && Array.isArray(classDetails.address)
          ? classDetails.address
          : [
              {
                line1: classDetails?.address?.line1 || "",
                line2: classDetails?.address?.line2 || "",
                pincode: classDetails?.address?.pincode || "",
                state: classDetails?.address?.state || "",
                dist: classDetails?.address?.dist || "",
                taluka: classDetails?.address?.taluka || "",
                nearbyLandmarks: classDetails?.address?.nearbyLandmarks || "",
                autorizedName: classDetails?.address?.autorizedName || "",
                autorizedPhono: classDetails?.address?.autorizedPhono || "",
              },
            ],
      info: classDetails?.info ? { ...classDetails.info } : { description: "" },
      discount: classDetails?.discount || "",
      validTill: classDetails?.validTill || "",
      roadmap: classDetails?.roadmap || [],
      keywords: classDetails?.keywords || [],
    },

    // Validations
    validationSchema: Yup.object().shape({
      // className: Yup.string().required("Class Name is required"),
      // ownerOrInstituteName: Yup.string().required(
      //   "Owner/Institute Name is required"
      // ),
      // franchiseOrIndependent: Yup.string().required("Select an option"),
      // yearEstablished: Yup.number()
      //   .required("Year Established is required")
      //   .min(1900, "Enter a valid year")
      //   .max(new Date().getFullYear(), "Year cannot be in the future"),
      // roadmap: Yup.array()
      //   .required("Roadmap Category is required")
      //   .min(1, "Select at least one roadmap category"),
      // category: Yup.array()
      //   .of(
      //     Yup.string().test(
      //       "is-valid-category",
      //       "Invalid category selected",
      //       (value) =>
      //         dynamicCategories.includes(value) ||
      //         formik.values.category.includes(value)
      //     )
      //   )
      //   .min(1, "At least one category must be selected")
      //   .required("Category is required"),
      // discount: Yup.string().required("Please select a discount"),
      // validTill: Yup.date()
      //   .nullable()
      //   .when("discount", {
      //     is: (val) => val !== "", // only validate if discount is selected
      //     then: (schema) =>
      //       schema
      //         .required("Valid till date is required")
      //         .min(new Date(), "Date must be today or later"),
      //   }),
      // modeOfTeaching: Yup.array()
      //   .min(1, "Please select at least one mode of teaching") // At least one option must be selected
      //   .required("Mode of teaching is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();

        for (const key in values) {
          // Skip roadmap here — will be handled separately
          if (key === "roadmap") continue;

          console.log(key, values[key]);

          // Handled Image, Category, modeofteaching and keywords field
          if (key === "image" && values[key] instanceof File) {
            formData.append("image", values[key]);
          } else if (
            key === "category" ||
            key === "modeOfTeaching" ||
            key === "keywords"
          ) {
            formData.append(key, JSON.stringify(values[key]));
          } else if (key === "address" && Array.isArray(values[key])) {
            // Address Section
            values[key].forEach((addr, index) => {
              for (const addrKey in addr) {
                formData.append(`address[${index}][${addrKey}]`, addr[addrKey]);
              }
            });
          } else if (key === "info") {
            // infoe section
            formData.append("info", JSON.stringify(values["info"]));
          } else if (key === "discount") {
            // discount
            formData.append("discount", values["discount"]);
          } else if (key === "validTill") {
            // Valid Till
            formData.append("validTill", values["validTill"]);
          } else if (typeof values[key] === "object") {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        }

        // Now append roadmap IDs individually
        if (Array.isArray(values.roadmap)) {
          values.roadmap.forEach((id) => {
            formData.append("roadmap[]", id); // append each roadmap _id as string
          });
        }

        // Update API
        const response = await axios.put(
          `${API_BASE_URL}/api/class/update/${classId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("📌 Update Response:", response.data);
        Swal.fire({
          icon: "success",
          title: "Class Updated!",
          text: "✅ Class updated successfully!",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/vendor-class/class-dashboard");
          }
        });
      } catch (error) {
        console.error("❌ Error updating class:", error);
        Swal.fire({
          icon: "warning",
          title: "Update Failed",
          text:
            error.response?.data?.errMsg ||
            error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            "Failed to update class.",
          confirmButtonColor: "#d33",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Fetch Category Dropdown Values
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/class/categories/all`
        );
        if (response.data.success && response.data.categories) {
          const formatted = response.data.categories.map((cat) => cat.category); // Just an array of strings
          setDynamicCategories(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // 🔍 Watch for selection changes ( for others field )
  useEffect(() => {
    if (formik.values.category?.includes("Others")) {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  }, [formik.values.category]);

  // Add that other categories value to backend
  const handleAddOtherCategory = () => {
    if (!customCategory.trim()) return;
    const updated = formik.values.category.map((item) =>
      item === "Others" ? customCategory : item
    );
    formik.setFieldValue("category", updated);
    setCustomCategory("");
    setShowOtherInput(false);
  };

  // Fetch RoadMap Types value for dropdown
  useEffect(() => {
    const fetchRoadmapOptions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/type/types`);
        const types = response.data?.data || [];
        // Keep full objects with _id and type
        setRoadmapOptions(types);
      } catch (error) {
        console.error("Failed to fetch roadmap types", error);
      }
    };

    fetchRoadmapOptions();
  }, []);

  // set and show the preview of an uploaded image
  useEffect(() => {
    if (typeof formik.values.image === "string") {
      setPreviewImage(`${API_BASE_URL}${formik.values.image}`);
    }
  }, [formik.values.image]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-1 md:p-6">
      {/* Main Form Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Form Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Update Class Details
          </h1>

          {/* Close button based on role it should be only viewed for admin role */}
          {/* {role === "ADMIN" && (
            <button
              onClick={() => navigate("/colleges")}
              className="absolute top-6 right-6 text-white hover:text-red-500 text-2xl font-bold cursor-pointer transition"
            >
              &times;
            </button>
          )} */}
        </div>

        {/* ✅ Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="p-2 md:p-8 lg:p-10 space-y-8"
        >
          {/* 🔹 Basic Details */}
          <div className="bg-blue-50 rounded-xl p-2 md:p-6 shadow-inner">
            <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Class Name */}
              <InputField
                label="Class Name"
                type="text"
                name="className"
                formik={formik}
              />

              {/* Owner Name */}
              <InputField
                label="Owner Name"
                type="text"
                name="ownerOrInstituteName"
                formik={formik}
              />

              {/* Established Year */}
              <InputField
                label="Year Established"
                type="number"
                name="yearEstablished"
                formik={formik}
              />

              {/* Website URL */}
              <InputField
                label="Website URL"
                type="url"
                name="websiteURL"
                formik={formik}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
              {/* Category with other field*/}
              <div>
                <MultiSelectDropdown
                  label="Category"
                  name="category"
                  options={dynamicCategories}
                  formik={formik}
                />
                {showOtherInput && (
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="text"
                      placeholder="Enter custom category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg shadow-md focus:outline-none transition-all bg-white duration-200 border-blue-300"
                    />
                    <button
                      type="button"
                      onClick={handleAddOtherCategory}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/* RoadMap Category */}
              <MultiSelectDropdown
                label="Roadmap Category"
                name="roadmap"
                options={roadmapOptions} // full objects [{_id, type}, ...]
                formik={formik}
                getOptionValue={(option) => option._id} // use _id as value
                getOptionLabel={(option) => option.type} // use type as label
              />
            </div>

            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Discount Dropdown */}
              <div className="flex-1">
                <label className="block text-blue-900 text-lg font-semibold mb-2">
                  Select Discount
                </label>
                <select
                  name="discount"
                  className="w-full p-3 rounded-lg border-1 border-blue-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formik.values.discount}
                  onChange={(e) => {
                    const selected = e.target.value;
                    formik.setFieldValue("discount", selected);
                    formik.setFieldValue("validTill", "");
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Discount</option>
                  {discountOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formik.touched.discount && formik.errors.discount && (
                  <div className="text-red-500 text-sm mt-2 font-semibold">
                    {formik.errors.discount}
                  </div>
                )}
              </div>

              {/* Valid Till Date Picker */}
              {formik.values.discount !== "" &&
                Number(formik.values.discount) !== 0 && (
                  <div className="flex-1">
                    <label className="block text-blue-900 text-lg font-semibold mb-2">
                      Valid Till
                    </label>
                    <input
                      type="date"
                      name="validTill"
                      className="w-full p-3 rounded-lg border-1 border-blue-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formik.values.validTill}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.validTill && formik.errors.validTill && (
                      <div className="text-red-500 text-sm mt-2 font-semibold">
                        {formik.errors.validTill}
                      </div>
                    )}
                  </div>
                )}
            </div>

            <div className="col-span-full mt-3">
              {/* Keywords */}
              <MultiSelectField
                label="Keywords"
                name="keywords"
                formik={formik}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Type ( Franchise or Independent )  */}
                <RadioGroup
                  label="Type"
                  name="franchiseOrIndependent"
                  options={["Franchise", "Home Tution", "Group"]}
                  formik={formik}
                />

                {/* Mode of teaching */}
                <CheckboxGroup
                  label="Mode of Teaching"
                  name="modeOfTeaching"
                  options={["Online", "Offline"]}
                  formik={formik}
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-2 md:p-6 shadow-inner">
            {/* Heading for address section */}
            <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              Class Addresses
            </h2>

            {/* Address array */}
            {formik.values.address.map((addr, index) => {
              const isEditing = editingIndex === index;

              return (
                <div
                  key={index}
                  className="p-2 md:p-6 mb-6 rounded-2xl shadow-xl bg-white border border-gray-200"
                >
                  {/* If editing, show input form */}
                  {isEditing ? (
                    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 mb-6">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2 rounded-md">
                        <h3 className="text-white text-lg font-semibold">
                          ✏ Editing Address {index + 1}
                        </h3>
                      </div>

                      {/* Form Grid for Edit for of Address Section */}
                      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                        {[
                          {
                            label: "Address Line 1",
                            name: "line1",
                            placeholder: "Line 1",
                          },
                          {
                            label: "Address Line 2",
                            name: "line2",
                            placeholder: "Line 2",
                          },
                          {
                            label: "Nearby Landmarks",
                            name: "nearbyLandmarks",
                            placeholder: "Nearby Landmarks",
                          },
                          {
                            label: "Pincode",
                            name: "pincode",
                            placeholder: "Pincode",
                          },
                          {
                            label: "State",
                            name: "state",
                            placeholder: "State",
                          },
                          {
                            label: "District",
                            name: "dist",
                            placeholder: "District",
                          },
                          {
                            label: "Taluka",
                            name: "taluka",
                            placeholder: "Taluka",
                          },
                          {
                            label: "Authorized Name",
                            name: "autorizedName",
                            placeholder: "Authorized Name",
                          },
                          {
                            label: "Authorized Phone",
                            name: "autorizedPhono",
                            placeholder: "Authorized Phone",
                          },
                        ].map((field, idx) => (
                          <div key={idx}>
                            <label className="block text-sm font-semibold text-blue-800 mb-2">
                              {field.label}
                            </label>
                            <input
                              type="text"
                              name={field.name}
                              placeholder={field.placeholder}
                              value={tempEditAddress?.[field.name] || ""}
                              onChange={(e) =>
                                setTempEditAddress((prev) => ({
                                  ...prev,
                                  [field.name]: e.target.value,
                                }))
                              }
                              className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />

                            {formik.errors.address?.[index]?.[field.name] && (
                              <div className="text-red-500 text-sm mt-1">
                                {formik.errors.address[index][field.name]}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Cancel Button */}
                      <div className="mt-8 text-center justify-end flex gap-2">
                        <button
                          onClick={() => {
                            const updatedAddresses = [...formik.values.address];
                            updatedAddresses[index] = tempEditAddress;
                            formik.setFieldValue("address", updatedAddresses);
                            setEditingIndex(null);
                            setTempEditAddress(null);
                          }}
                          className="text-white bg-green-500 hover:bg-green-600 transition px-6 py-2 text-sm font-medium rounded-md flex gap-2 cursor-pointer"
                        >
                          <span className="mt-1">
                            <MdDone />
                          </span>{" "}
                          Done
                        </button>

                        <button
                          onClick={() => {
                            setEditingIndex(null);
                            setTempEditAddress(null); // Discard temp edits
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition flex gap-2 cursor-pointer"
                        >
                          <span className="mt-1">
                            <FaWindowClose />
                          </span>{" "}
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // If the Address exists that address is shown in card format
                    <div
                      key={index}
                      className="relative bg-white border border-blue-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300 col-span-full"
                    >
                      <div className="space-y-1 text-gray-800 text-sm">
                        <p className="font-medium">
                          🏠 {addr.line1}, {addr.line2}
                        </p>
                        {addr.nearbyLandmarks && (
                          <p>📍 Nearby: {addr.nearbyLandmarks}</p>
                        )}
                        <p>
                          🗺️ {addr.taluka}, {addr.dist}, {addr.state} -{" "}
                          {addr.pincode}
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                          👤 {addr.autorizedName} &nbsp; 📞{" "}
                          {addr.autorizedPhono}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3 mt-4">
                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingIndex(index);
                            setTempEditAddress({ ...addr }); // Deep copy
                          }}
                          className="bg-yellow-500 text-white text-xs px-4 py-1.5 rounded-md shadow-sm hover:bg-yellow-600 transition flex items-center gap-1 cursor-pointer"
                        >
                          ✏️ Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...formik.values.address];
                            updated.splice(index, 1);
                            formik.setFieldValue("address", updated);
                            if (editingIndex === index) setEditingIndex(null);
                          }}
                          className="bg-red-500 text-white text-xs px-4 py-1.5 rounded-md shadow-sm hover:bg-red-600 transition flex items-center gap-1 cursor-pointer"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add new address button */}
            <button
              type="button"
              onClick={() => setShowAddressModal(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 cursor-pointer"
            >
              ➕ Add Address
            </button>
          </div>

          {/* Single Image Upload Section */}
          <div className="bg-blue-50 rounded-xl p-2 md:p-6 shadow-inner mt-3">
            {/* Class Image Secion Heading */}
            <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <FaImage className="text-blue-600" />
              Class Image
            </h2>

            {/* Preview of the Image */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
              {previewImage || formik.values.image ? (
                <img
                  src={
                    previewImage
                      ? previewImage
                      : typeof formik.values.image === "string"
                      ? `${API_BASE_URL}${formik.values.image}`
                      : ""
                  }
                  alt="Class"
                  className="relative w-full h-40 object-cover rounded-lg shadow-md overflow-hidden before:absolute before:top-0 before:left-[-100%]
            before:w-full before:h-full before:bg-white before:opacity-20 before:rotate-6 before:transition-all hover:before:left-full mb-2"
                />
              ) : (
                <p className="text-gray-500 italic">No image available</p>
              )}

              {/* Image Upload Input Section */}
              <FileUpload label="Class Image" name="image" formik={formik} />
            </div>
          </div>

          <div className="flex justify-end">
            {/* Submit Button (Update Button) */}
            <button
              type="submit"
              onClick={formik.handleSubmit}
              disabled={
                !(formik.isValid && formik.dirty) || formik.isSubmitting
              }
              className={`px-8 py-3 rounded-md shadow text-lg text-white font-semibold  transition ${
                formik.isValid && formik.dirty
                  ? "bg-indigo-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {formik.isSubmitting ? "Updating..." : "Update Class"}
            </button>
          </div>
        </form>
      </div>

      {/* Address Modal to add new address */}
      <AddressModal
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

export default ManageClass;
