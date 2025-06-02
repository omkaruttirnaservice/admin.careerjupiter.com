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
import { motion, AnimatePresence } from "framer-motion";

// Helper function to safely parse JSON fields
const parseJSONField = (field) => {
  try {
    return typeof field === "string" ? JSON.parse(field) : field;
  } catch {
    return [];
  }
};

const collegeTypes = [
  "Gov.-Aided (Granted)",
  "Private Unaided (Non-Granted)",
  "Autonomous College",
  "Deemed to be Universities",
  "Private",
  "Distance Learning",
];
const accreditationOptions = [
  "NAAC A++",
  "NAAC A+",
  "NAAC A",
  "NDA",
  "NBA Accredited",
  "UGC Approved",
  "AICTE Approved",
  "ISO Certified",
  "NIRF Ranked",
  "Others",
];

const ManageCollege = () => {
  const navigate = useNavigate();
  const { id: collegeIdFromParams } = useParams();
  const storedCollegeId = Cookies.get("collegeID");
  const [collegeId, setCollegeId] = useState(storedCollegeId || "");
  const [collegeDetails, setCollegeDetails] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ Loading state
  const [entranceExams, setEntranceExams] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      name: "autorizedName",
      label: "Authorized Person Name",
      placeholder: "Enter name",
    },
    {
      name: "autorizedPhono",
      label: "Authorized Person Phone",
      placeholder: "Enter phone number",
    },
    {
      name: "designation",
      label: "Designation",
      placeholder: "Enter designation",
    },
  ];

  console.log("📌 Retrieved College ID from Cookies:", collegeId);

  // Get user role and subrole
  const role = Cookies.get("role");
  const subrole = Cookies.get("subrole");

  // Fetch College Details

  // Set collegeId from either URL params (admin) or cookies (vendor)
  useEffect(() => {
    const collegeIdFromCookie = getCookie("collegeID");
    const id = collegeIdFromParams || collegeIdFromCookie;

    if (id) {
      setCollegeId(id);
      console.log("College ID for editing:", id);

      // If admin is accessing, store the collegeId in cookie temporarily
      if (role === "ADMIN" && collegeIdFromParams) {
        Cookies.set("collegeID", id, { expires: 1 }); // Expires in 1 day
      }
    } else {
      console.warn("College ID not found!");
      Swal.fire({
        icon: "error",
        title: "College ID Missing",
        text: "Please select a college first",
      });
      navigate(role === "ADMIN" ? "/colleges" : "/vendor-college");
    }
  }, [collegeIdFromParams, role, navigate]);

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      const storedCollegeId = Cookies.get("collegeID");
      if (!storedCollegeId) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/college/${storedCollegeId}`
        );

        let collegeData = response.data?.data?.college || {};

        // Ensure default values for missing fields
        collegeData.info = {
          description: collegeData?.info?.description || "",
        };
        collegeData.accreditation = collegeData?.accreditation || "";
        collegeData.category = collegeData?.category || [];
        collegeData.establishedYear = collegeData?.establishedYear || 0;
        collegeData.collegeName = collegeData?.collegeName || "";
        collegeData.contactDetails = collegeData?.contactDetails || "";
        collegeData.websiteURL = collegeData?.websiteURL || "";
        collegeData.entrance_exam_required =
          parseJSONField(collegeData.entrance_exam_required) || [];
        collegeData.subCategory = parseJSONField(collegeData.subCategory) || [];
        collegeData.keywords = parseJSONField(collegeData.keywords) || [];

        setCollegeDetails(collegeData);
      } catch (error) {
        console.error("Error fetching college details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollegeDetails();
  }, []);

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
      imageGallery: [],
      keywords: [],
      email_id: "",
    },
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
      subCategory: Yup.array()
        .of(Yup.string())
        .min(1, "At least one branch must be selected")
        .required("Branch is required"),
      entrance_exam_required: Yup.array().min(
        1,
        "At least one entrance exam is required"
      ),
      collegeType: Yup.string().required("College Type is required"),
      category: Yup.string().required("Category is required"),
    }),

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

        // ✅ Handle array fields
        if (Array.isArray(values.keywords)) {
          values.keywords.forEach((item) =>
            formData.append("keywords[]", item)
          );
        }

        if (values.category) {
          formData.append("category", values.category);
        }

        // Handle accreditation (single value with optional custom input)
        if (
          (values.accreditation === "Other" ||
            values.accreditation === "Others") &&
          values.accreditationOther
        ) {
          formData.append("accreditation", values.accreditationOther);
        } else if (values.accreditation) {
          formData.append("accreditation", values.accreditation);
        }

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

        if (Array.isArray(values.entrance_exam_required)) {
          values.entrance_exam_required.forEach((item) =>
            formData.append("entrance_exam_required[]", item)
          );
        }

        // ✅ Handle nested object: info
        if (values.info?.description) {
          formData.append("info.description", values.info.description);
        }

        // ✅ Handle address array of objects
        if (Array.isArray(values.address)) {
          values.address.forEach((addr, index) => {
            Object.keys(addr).forEach((key) => {
              formData.append(`address[${index}][${key}]`, addr[key]);
            });
          });
        }

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

  useEffect(() => {
    const selectedCategory = formik.values.category;
    const match = categoryData.find(
      (item) => item.category === selectedCategory
    );
    setSubCategories(match ? match.subCategory : []);
  }, [formik.values.category, categoryData]);

  // Update entrance exams when category is selected
  useEffect(() => {
    const selectedCategory = formik.values.category; // Assuming category is being managed in Formik
    const category = categoryData.find(
      (item) => item.category === selectedCategory
    );

    // Set entrance exams based on the selected category
    if (category) {
      setEntranceExams(category.entrance_exam_required || []);
    }
  }, [formik.values.category, categoryData]); // Dependency array ensures this runs when category or categoryData changes

  useEffect(() => {
    if (typeof formik.values.image === "string") {
      setPreviewImage(`${API_BASE_URL}${formik.values.image}`);
    }
  }, [formik.values.image]);

  useEffect(() => {
    if (formik.values.address && formik.values.info) {
      console.log("📌 Final Formik Address Data:", formik.values.address);
      console.log("📌 Final Formik Info Data:", formik.values.info);
    } else {
      console.warn("⚠️ Address & Info fields are not populated yet!");
    }
  }, [formik.values]);

  // return (
  //     <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 md:p-3">
  //       {/* ✅ Main Content */}
  //       <div className="flex-1 flex justify-center">
  //         <div className="flex flex-col md:flex-row min-h-screen md:p-4 relative bg-gradient-to-br from-blue-100 to-blue-300 overflow-hidden">
  //           <div className="w-screen lg:w-[1100px] mx-auto bg-white shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border border-blue-500 rounded-xl">
  //             {role === "ADMIN" && (
  //               <button
  //                 onClick={() => navigate("/colleges")}
  //                 className="absolute top-7 right-9 text-red-600 hover:text-red-800 text-3xl font-bold cursor-pointer"
  //               >
  //                 &times;
  //                 {/* <FiLogOut /> */}
  //               </button>
  //             )}

  //             {/* ✅ Form Title */}
  //             <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md text-center rounded-xl">
  //               <h2 className="text-2xl md:text-4xl font-bold">
  //                 Update College Details
  //               </h2>
  //             </div>

  //             {/* ✅ Form */}
  //             <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
  //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
  //                 {/* 🔹 Basic Details */}

  //                 <InputField
  //                   label="College Name"
  //                   type="text"
  //                   name="collegeName"
  //                   formik={formik}
  //                 />
  //                 <InputField
  //                   label="Affiliated University"
  //                   name="affiliatedUniversity"
  //                   type="text"
  //                   placeholder="Enter University"
  //                   formik={formik}
  //                 />

  //                 <SingleSelectDropdown
  //                   label="College Type"
  //                   name="collegeType"
  //                   options={collegeTypes}
  //                   formik={formik}
  //                   placeholder="Select a College Type"
  //                 />

  //                 <div className="mb-4 w-full">
  //                   <label className="block text-blue-800 font-semibold mb-2">
  //                     College Category
  //                   </label>
  //                   <select
  //                     name="category"
  //                     value={formik.values.category}
  //                     onChange={(e) => {
  //                       const selected = e.target.value;
  //                       formik.setFieldValue("category", selected);

  //                       const selectedCategory = categoryData.find(
  //                         (item) => item.category === selected
  //                       );

  //                       formik.setFieldValue("subCategory", []); // Reset subcategory
  //                       setSubCategories(selectedCategory?.subCategory || []);

  //                       formik.setFieldValue("entrance_exam_required", []); // Reset subcategory
  //                       setEntranceExams(
  //                         selectedCategory?.entrance_exam_required || []
  //                       );
  //                     }}
  //                     className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none transition-all ${
  //                       formik.touched.category && formik.errors.category
  //                         ? "border-red-500 focus:ring-2 focus:ring-red-300"
  //                         : "border-gray-300 focus:ring-2 focus:ring-blue-400"
  //                     }`}
  //                   >
  //                     <option value="">Select Category</option>
  //                     {categoryData.map((item, index) => (
  //                       <option key={index} value={item.category}>
  //                         {item.category}
  //                       </option>
  //                     ))}
  //                   </select>

  //                   {formik.touched.category && formik.errors.category && (
  //                     <p className="text-red-500 text-sm mt-1">
  //                       {formik.errors.category}
  //                     </p>
  //                   )}
  //                 </div>

  //                 <div className="mb-3">
  //                   <MultiSelectDropdown
  //                     label="Branch"
  //                     name="subCategory"
  //                     options={subCategories}
  //                     formik={formik}
  //                   />

  //                   <OtherField
  //                     watchValue={formik.values.subCategory} // 👈 should match MultiSelectDropdown field
  //                     triggerValue={["Other", "Others"]}
  //                     onChange={(val) =>
  //                       formik.setFieldValue("subCategoryOther", val)
  //                     }
  //                     name="subCategoryOther"
  //                     error={formik.errors.subCategoryOther}
  //                     touched={formik.touched.subCategoryOther}
  //                   />
  //                 </div>

  //                 <InputField
  //                   label="Year Established"
  //                   type="number"
  //                   name="establishedYear"
  //                   formik={formik}
  //                 />
  //                 <InputField
  //                   label="Website URL"
  //                   type="text"
  //                   name="websiteURL"
  //                   formik={formik}
  //                 />

  //                 <MultiSelectField
  //                   label="Keywords (Max 5)"
  //                   name="keywords"
  //                   formik={formik}
  //                 />

  //                 <div className="mb-3">
  //                   <SingleSelectDropdown
  //                     label="Accreditation"
  //                     name="accreditation"
  //                     options={accreditationOptions}
  //                     formik={formik}
  //                     placeholder="Select an Accreditation"
  //                   />
  //                   <OtherField
  //                     watchValue={formik.values.accreditation} // 👈 should match MultiSelectDropdown field
  //                     triggerValue={["Other", "Others"]}
  //                     onChange={(val) =>
  //                       formik.setFieldValue("accreditationOther", val)
  //                     }
  //                     name="accreditationOther"
  //                     error={formik.errors.accreditationOther}
  //                     touched={formik.touched.accreditationOther}
  //                   />
  //                 </div>

  //                 <MultiSelectDropdown
  //                   label="Entrance Exams Required"
  //                   name="entrance_exam_required"
  //                   options={entranceExams}
  //                   formik={formik}
  //                 />
  //               </div>

  //               {/* Address array */}
  //               {formik.values.address.map((addr, index) => {
  //                 const isEditing = editingIndex === index;

  //                 return (
  //                   <div
  //                     key={index}
  //                     className="p-6 mb-6 rounded-2xl shadow-xl bg-white border border-gray-200"
  //                   >
  //                     {/* If editing, show input form */}
  //                     {isEditing ? (
  //                       <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 mb-6">
  //                         {/* Header */}
  //                         <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2 rounded-md">
  //                           <h3 className="text-white text-lg font-semibold">
  //                             ✏ Editing Address {index + 1}
  //                           </h3>
  //                         </div>

  //                         {/* Form Grid */}
  //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                           {[...formFields].map((field, idx) => (
  //                             <div key={idx}>
  //                               <label className="block text-sm font-semibold text-blue-800 mb-2">
  //                                 {field.label}
  //                               </label>
  //                               <input
  //                                 type="text"
  //                                 name={`address[${index}].${field.name}`}
  //                                 placeholder={field.placeholder}
  //                                 value={addr[field.name]}
  //                                 onChange={formik.handleChange}
  //                                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
  //                               />
  //                               {formik.errors.address?.[index]?.[field.name] && (
  //                                 <div className="text-red-500 text-sm mt-1">
  //                                   {formik.errors.address[index][field.name]}
  //                                 </div>
  //                               )}
  //                             </div>
  //                           ))}
  //                         </div>

  //                         {/* Cancel Button */}
  //                         <div className="mt-8 text-center justify-end flex gap-2">
  //                           <button
  //                             onClick={() => setEditingIndex(null)}
  //                             className="text-white bg-green-500 hover:bg-green-600 transition px-6 py-2 text-sm font-medium rounded-md flex gap-2 cursor-pointer"
  //                            type="button" // ✅ Prevent unintended submission
  //                           >
  //                             <span className="mt-1">
  //                               <MdDone />
  //                             </span>{" "}
  //                             Done
  //                           </button>

  //                           <button
  //                             onClick={() => setEditingIndex(null)}
  //                             className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition flex gap-2 cursor-pointer"
  //                            type="button" // ✅ Prevent unintended submission
  //                           >
  //                             <span className="mt-1">
  //                               <FaWindowClose />
  //                             </span>{" "}
  //                             Cancel
  //                           </button>
  //                         </div>
  //                       </div>
  //                     ) : (
  //                       <div
  //                         key={index}
  //                         className="relative bg-white border border-blue-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300 col-span-full"
  //                       >
  //                         <div className="space-y-1 text-gray-800 text-sm">
  //                           <p className="font-medium">
  //                             🏠 {addr.line1}, {addr.line2}
  //                           </p>
  //                           {addr.nearbyLandmarks && (
  //                             <p>📍 Nearby: {addr.nearbyLandmarks}</p>
  //                           )}
  //                           <p>
  //                             🗺️ {addr.taluka}, {addr.dist}, {addr.state} -{" "}
  //                             {addr.pincode}
  //                           </p>
  //                           <p className="text-gray-600 text-xs mt-1">
  //                             👤 {addr.autorizedName}{" "}
  //                             {addr.designation && (
  //                               <span className="ml-1 italic text-gray-500">
  //                                 ({addr.designation})
  //                               </span>
  //                             )}{" "}
  //                             &nbsp; 📞 {addr.autorizedPhono}
  //                           </p>
  //                         </div>

  //                         {/* Action Buttons */}
  //                         <div className="flex justify-end gap-3 mt-4">
  //                           {/* Edit Button */}
  //                           <button
  //                             type="button"
  //                             onClick={() => setEditingIndex(index)}
  //                             className="bg-yellow-500 text-white text-xs px-4 py-1.5 rounded-md shadow-sm hover:bg-yellow-600 transition flex items-center gap-1 cursor-pointer"
  //                           >
  //                             ✏️ Edit
  //                           </button>

  //                           {/* Delete Button */}
  //                           <button
  //                             type="button"
  //                             onClick={() => {
  //                               const updated = [...formik.values.address];
  //                               updated.splice(index, 1);
  //                               formik.setFieldValue("address", updated);
  //                               if (editingIndex === index) setEditingIndex(null);
  //                             }}
  //                             className="bg-red-500 text-white text-xs px-4 py-1.5 rounded-md shadow-sm hover:bg-red-600 transition flex items-center gap-1 cursor-pointer"
  //                           >
  //                             🗑️ Remove
  //                           </button>
  //                         </div>
  //                       </div>
  //                     )}
  //                   </div>
  //                 );
  //               })}

  //               {/* Add new address */}
  //               <button
  //                 type="button"
  //                 onClick={() => setShowAddressModal(true)}
  //                 className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 cursor-pointer"
  //               >
  //                 ➕ Add Address
  //               </button>

  //               <div className="mt-6">
  //                 <h3 className="text-lg font-bold text-gray-800">
  //                   College Banner Cover Image (JPG/JPEG/PNG)
  //                 </h3>

  //                 <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-4">
  //                   {previewImage || formik.values.image ? (
  //                     <img
  //                       src={
  //                         previewImage
  //                           ? previewImage
  //                           : typeof formik.values.image === "string"
  //                           ? `${API_BASE_URL}${formik.values.image}`
  //                           : ""
  //                       }
  //                       alt="College"
  //                       className="relative w-80 h-40 object-cover rounded-lg shadow-md overflow-hidden before:absolute before:top-0 before:left-[-100%]
  //           before:w-full before:h-full before:bg-white before:opacity-20 before:rotate-6 before:transition-all hover:before:left-full mb-2"
  //                     />
  //                   ) : (
  //                     <p className="text-gray-500 italic">No image available</p>
  //                   )}
  //                 </div>

  //                 <div className="w-100">
  //                   <FileUpload
  //                     label="College Banner Cover Image (JPG/JPEG/PNG)"
  //                     name="image"
  //                     formik={formik}
  //                   />
  //                 </div>
  //               </div>

  //               {/* ✅ Submit Button */}
  //               {/* <button
  //                 type="submit"
  //                 className="px-8 py-3 rounded-md shadow text-lg text-white font-semibold  transition bg-gradient-to-r from-blue-600 to-indigo-600  mt-6 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700  duration-300"
  //               >
  //                 Update Details
  //               </button> */}

  //               <div className="flex justify-end">
  //                 <button
  //                   type="submit"
  //                   onClick={formik.handleSubmit}
  //                   disabled={
  //                     !(formik.isValid && formik.dirty) || formik.isSubmitting
  //                   }
  //                   // className="bg-indigo-600 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition cursor-pointer"
  //                   className={`px-8 py-3 rounded-md shadow text-lg text-white font-semibold  transition ${
  //                     formik.isValid && formik.dirty
  //                       ? "bg-indigo-600 hover:bg-blue-700 cursor-pointer"
  //                       : "bg-gray-400 cursor-not-allowed"
  //                   }`}
  //                 >
  //                   {formik.isSubmitting ? "Updating..." : "Update College"}
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //           <CollegeAddressModal
  //             open={showAddressModal}
  //             onClose={() => setShowAddressModal(false)}
  //             onSave={(newAddress) => {
  //               formik.setFieldValue("address", [
  //                 ...(formik.values.address || []),
  //                 newAddress,
  //               ]);
  //             }}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      {/* Main Form Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Form Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Update College Details
          </h1>
          {role === "ADMIN" && (
            <button
              onClick={() => navigate("/colleges")}
              className="absolute top-6 right-9 text-white hover:text-red-200 text-2xl font-bold cursor-pointer transition"
            >
              &times;
            </button>
          )}
        </div>

        {/* Form Content */}
        <form
          onSubmit={formik.handleSubmit}
          className="p-6 md:p-8 lg:p-10 space-y-8"
        >
          {/* Section 1: Basic Information */}
          <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <InputField
                label="College Name"
                type="text"
                name="collegeName"
                formik={formik}
                className="bg-white"
              />

              <InputField
                label="Affiliated University"
                name="affiliatedUniversity"
                type="text"
                placeholder="Enter University"
                formik={formik}
                className="bg-white"
              />

              <SingleSelectDropdown
                label="College Type"
                name="collegeType"
                options={collegeTypes}
                formik={formik}
                placeholder="Select College Type"
                className="bg-white"
              />

              <div className="mb-4">
                <label className="block text-blue-800 font-semibold mb-2">
                  College Category
                </label>
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={(e) => {
                    const selected = e.target.value;
                    formik.setFieldValue("category", selected);
                    const selectedCategory = categoryData.find(
                      (item) => item.category === selected
                    );
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

              <div className="mb-3">
                <MultiSelectDropdown
                  label="Branch"
                  name="subCategory"
                  options={subCategories}
                  formik={formik}
                  className="bg-white"
                />
                <OtherField
                  watchValue={formik.values.subCategory}
                  triggerValue={["Other", "Others"]}
                  onChange={(val) =>
                    formik.setFieldValue("subCategoryOther", val)
                  }
                  name="subCategoryOther"
                  error={formik.errors.subCategoryOther}
                  touched={formik.touched.subCategoryOther}
                  className="bg-white"
                />
              </div>

              <InputField
                label="Year Established"
                type="number"
                name="establishedYear"
                formik={formik}
                className="bg-white"
              />
            </div>
            {/* </div> */}

            {/* Section 2: Contact & Accreditation */}
            {/* <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
          <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
            <FaGlobe className="text-blue-600" />
            Contact & Accreditation
          </h2> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <InputField
                label="Website URL"
                type="text"
                name="websiteURL"
                formik={formik}
                className="bg-white"
              />

              <div className="mb-3">
                <SingleSelectDropdown
                  label="Accreditation"
                  name="accreditation"
                  options={accreditationOptions}
                  formik={formik}
                  placeholder="Select Accreditation"
                  className="bg-white"
                />
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
              </div>

              <MultiSelectDropdown
                label="Entrance Exams Required"
                name="entrance_exam_required"
                options={entranceExams}
                formik={formik}
                className="bg-white"
              />

              <MultiSelectField
                label="Keywords (Max 5)"
                name="keywords"
                formik={formik}
                className="bg-white"
              />
            </div>
          </div>

          {/* Section 3: Addresses */}
          <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              College Addresses
            </h2>

            {/* Address List */}
            <div className="space-y-6">
              {formik.values.address.map((addr, index) => {
                const isEditing = editingIndex === index;

                return (
                  <div key={index} className="relative">
                    {isEditing ? (
                      <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-blue-700">
                            ✏️ Editing Address {index + 1}
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {formFields.map((field, idx) => (
                            <div key={idx} className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label}
                              </label>
                              <input
                                type="text"
                                name={`address[${index}].${field.name}`}
                                placeholder={field.placeholder}
                                value={addr[field.name]}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                          <button
                            type="button"
                            onClick={() => setEditingIndex(null)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center gap-2"
                          >
                            <MdDone /> Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingIndex(null)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition flex items-center gap-2"
                          >
                            <FaWindowClose /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
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

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingIndex(index)}
                              className="p-2 text-blue-600 hover:text-blue-800 transition"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...formik.values.address];
                                updated.splice(index, 1);
                                formik.setFieldValue("address", updated);
                                if (editingIndex === index)
                                  setEditingIndex(null);
                              }}
                              className="p-2 text-red-500 hover:text-red-700 transition"
                              title="Delete"
                            >
                              <FaTrash />
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

          {/* Section 4: College Image */}
          <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
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
                      alt="College Banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                    No image selected
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  type="button"
                >
                  Upload Banner
                </button>
              </div>

              {/* Modal Popup */}
              <AnimatePresence>
                {showModal && (
                  <div className="fixed inset-0 bg-opacity-50 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative border-3 border-blue-600"
                    >
                      <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-2 right-3 text-red-600 hover:text-red-400 text-2xl font-bold"
                        type="button"
                      >
                        &times;
                      </button>
                      <h3 className="text-lg text-blue-600 font-bold mb-4">
                        Upload College Banner
                      </h3>
                      <FileUpload
                        label="Upload College Banner (JPG/PNG)"
                        name="image"
                        formik={formik}
                        className="bg-white"
                      />
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
              {/* <div className="w-full md:w-1/2">
              <FileUpload
                label="Upload College Banner (JPG/PNG)"
                name="image"
                formik={formik}
                className="bg-white"
              />
            </div> */}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex mt-8  justify-end">
            <button
              type="submit"
              disabled={
                !(formik.isValid && formik.dirty) || formik.isSubmitting
              }
              className={`px-10 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-300 ${
                formik.isValid && formik.dirty
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

      {/* Address Modal */}
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
