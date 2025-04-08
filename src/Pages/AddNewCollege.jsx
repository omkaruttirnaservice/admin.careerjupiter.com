import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createCollege } from "../api/college-api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import stateDistricts from "../Constant/ConstantData";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import { FaMapMarkerAlt, FaUniversity, FaImage, FaGlobe } from "react-icons/fa";
// toast.configure();

const defaultLocation = { lat: 19.076, lan: 72.8777 };

{
   <stateDistricts />;  
}

// const DropdownComponent = ({ formik }) => {
//   const [selectedState, setSelectedState] = useState("Maharashtra");

//   const handleStateChange = (event) => {
//     const selectedState = event.target.value;
//     setSelectedState(selectedState);
//     formik.setFieldValue("state", selectedState);
//     formik.setFieldValue("district", ""); // Reset district when state changes
//   };
// };
// const maharashtraDistricts = ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur"];
const collegeCategories = [
  "Diploma",
  "Engineering",
  "Pharmacy",
  "HSC",
  "SSC",
  "Under Graduate",
  "Post Graduate",
];
const collegeTypes = ["Private", "Government", "Autonomous", "Deemed"];
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
];
const scholershipAvailable = [
  "Merit-based",
  "Need-based",
  "Sports-based",
  "Other",
];
const quotaSystem = ["Management", "SC/ST", "OBC", "General"];
const currentYear = new Date().getFullYear();
const establishedYears = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, i) => 1980 + i
);

const LocationMarker = ({ setLocation, location, setFieldValue }) => {
  useMapEvents({
    click(e) {
    
      
      const { lat, lan } = e.latlng;
      setLocation({ lat, lan });
      setFieldValue("lat", lat);
      setFieldValue("lan", lan);
    },
  });
  return location.lat && location.lan ? (
    <Marker
      // key={`${location.lat}-${location.lan}`} // ✅ Forces re-render
      position={[location.lat, location.lan]}
    />
  ) : null;
};

const AddNewCollege = () => {
  const [location, setLocation] = useState(defaultLocation);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const mapRef = useRef(null);

  const mutation = useMutation({
    mutationFn: createCollege,
    onSuccess: (data) => {
      toast.success("College created successfully!");
      alert("College Created Successfully");
      console.log("API Response:", data);
      formik.resetForm();
      setLocation(defaultLocation);
      setImage(null); // ✅ Reset image
      setGalleryImages([]); // ✅ Reset gallery images
      setKeywordInput(""); // ✅ Reset keyword input
    },
    onError: (error) => {
      console.error("API Error:", error.response?.data || error.message); // ✅ Debug errors
      toast.error(
        `Please Try Again ${
          error.response?.data?.message || error.message || error.response?.data.errMessage
        }`
      );
      alert(
        `Submission Failed: ${error.response?.data?.message ||  error.response?.data.errMessage || error.message}`
      );
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
      state: "",
      district: "",
      contactDetails: "",
      info: { description: "" },
      keywords: [""],
      email_id: "",
      websiteURL: "",
      establishedYear: "",
      accreditation: "",
      admissionProcess: "",
      applicationFormURL: "",
      image: null,
      imageGallery: [],
      admissionEntranceDetails: {
        // ✅ Admission Entrance Details
        admissionStartDate: "",
        admissionEndDate: "",
        lastYearCutoffMarks: 0,

        scholarshipsAvailable: [], // ✅ Ensure this is an array
        quotaSystem: [], // ✅ Ensure this is an array
      },
    },

    // validationSchema: Yup.object().shape({
    //   collegeName: Yup.string().required("College Name is required"),

    //   affiliatedUniversity: Yup.string().required(
    //     "Affiliated University is required"
    //   ),

    //   contactDetails: Yup.string()
    //     .matches(/\d{10}/, "Contact number must be exactly 10 digits")
    //     .required("Contact Details are required"),

    //   websiteURL: Yup.string().url("Website URL must be a valid URL"),

    //   applicationFormURL: Yup.string().url(
    //     "Application Form URL must be a valid URL"
    //   ),

    //   info: Yup.string().required("Info is required"),

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

    //   email_id: Yup.string()
    //     .email("Invalid email")
    //     .required("Email is required"),

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
    //   district: Yup.string().required("District is required"),

    //   // Keywords
    //   keywords: Yup.array()
    //     .of(Yup.string())
    //     .min(1, "At least one keyword is required"),

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

    //   admissionEntranceDetails: Yup.object({
    //     admissionStartDate: Yup.date().required("Start date is required"),

    //     admissionEndDate: Yup.date()
    //       .required("End date is required")
    //       .min(
    //         Yup.ref("admissionStartDate"),
    //         "End Date must be after Start Date"
    //       ),
    //     lastYearCutoffMarks: Yup.number().required("Cutoff marks are required"),
    //     // ✅ Change from string() to array()

    //     scholarshipsAvailable: Yup.array()
    //       .min(1, "Select at least one scholarship") // ✅ At least 1 required
    //       .required("Scholarship is required"),

    //     quotaSystem: Yup.array()
    //       .min(1, "Select at least one quota system") // ✅ At least 1 required
    //       .required("Quota system is required"),
    //   }),
    // }),

    onSubmit: async (values) => {
      // alert("Form Submitted Successfully!");
      console.log("Submitting Form Data:", values);

      try {
        // console.log("🚀 Submitting Form Data:", values); // ✅ Debugging

        const formData = new FormData();

        // Append flat fields
        formData.append("collegeName", values.collegeName);
        formData.append("affiliatedUniversity", values.affiliatedUniversity);
        // formData.append("collegeCategory", values.collegeCategory || "General");
        formData.append("Category", values.collegeCategory || "General"); // ✅ Ensure correct field
        formData.append("collegeType", values.collegeType);
        formData.append("email_id", values.email_id || "example@email.com"); // ✅ Default email
        // formData.append("keywords", (values.keywords.map(String))); // ✅ Keywords
        formData.append("contactDetails", values.contactDetails);
        formData.append("info[description]", values.info);
        formData.append("websiteURL", values.websiteURL);
        formData.append("establishedYear", values.establishedYear);

        formData.append(
          "accreditation",
          accreditationOptions.includes(values.accreditation)
            ? values.accreditation
            : "NAAC A+"
        );
        formData.append("admissionProcess", values.admissionProcess);
        formData.append("applicationFormURL", values.applicationFormURL);

        // ✅ Convert Dates to YYYY-MM-DD Format
        const formattedStartDate =
          values.admissionEntranceDetails.admissionStartDate.split("T")[0];
        const formattedEndDate =
          values.admissionEntranceDetails.admissionEndDate.split("T")[0];

        // Ensure multi-select values are correctly formatted
        formData.append(
          "admissionEntranceDetails",
          JSON.stringify({
            admissionStartDate: formattedStartDate,
            admissionEndDate: formattedEndDate,
            lastYearCutoffMarks:
              values.admissionEntranceDetails.lastYearCutoffMarks,
            scholarshipsAvailable:
              values.admissionEntranceDetails.scholarshipsAvailable,
            quotaSystem: values.admissionEntranceDetails.quotaSystem,
          })
        );

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
          // formData.append(`imageGallery`, file);
        });

        // ✅ Debugging: Print FormData before sending
        console.log(
          "📢 Final FormData being sent:",
          Object.fromEntries(formData)
        );

        const response = await createCollege(formData);

        console.log("API Response:", response);
        // ✅ Debugging: Print FormData before sending
        console.log("📢 Final FormData:", formData);

        if (response.success) {
          alert("College Created Successfully!");
          formik.resetForm(); // Reset form after submission
        } else {
          alert(`❌ Submission Failed: ${response.message}`);
        }
        // ✅ Send the form data using Axios
        // const response = await axios.post(
        //   `${API_BASE_URL}/api/college/create`,
        //   formData,
        //   {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   }
        // );

        // // ✅ Log the response for debugging
        // console.log("API Response:", response.data);

        // // ✅ Show success alert
        // alert("College Created Successfully! ✅");

        // // ✅ Reset the form after submission
        // formik.resetForm();

        // console.log("Final FormData being sent:", formData);

        // mutation.mutate(formData);
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        alert(
          `❌ Submission Failed: ${
            error.response?.data?.message ||  error.response?.data.errMessage || "Something went wrong"
          }`
        );

        if (error.response?.data?.errors) {
          console.log("Validation Errors:", error.response.data.errors);
          alert("Validation Errors: " + error.response.data.errors.join(","));
        }
      }

      // console.log("Submitting FormData:", formData);
      // mutation.mutate(formData);
    },
  });

  // const [formData, setFormData] = useState({
  //   admissionStartDate: "",
  //   admissionEndDate: "",
  //   lastYearCutoffMarks: "",
  //   scholarshipsAvailable: [],
  //   quotaSystem: [],
  // });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // setImage(file);
      formik.setFieldValue("image", file);
    }
  };

  const handleImageGalleryChange = (event) => {
    const files = Array.from(event.target.files);
    // setGalleryImages([...formik.values.imageGallery, ...files]);
    formik.setFieldValue("imageGallery", [
      ...formik.values.imageGallery,
      ...files,
    ]);
  };

  // const addKeyword = () => {
  //   const trimmedKeyword = keywordInput.trim();  // ✅ Remove spaces

  //   if (trimmedKeyword && !formik.values.keywords.includes(trimmedKeyword)) {
  //     if (formik.values.keywords.length < 5) {
  //       formik.setFieldValue("keywords", [
  //         ...formik.values.keywords,
  //         trimmedKeyword,
  //       ]);
  //       setKeywordInput(""); // ✅ Reset input
  //     } else {
  //       alert("You can add a maximum of 5 keywords!"); // ✅ Alert when limit is reached
  //     }
  //   }
  // };

  const addKeyword = () => {
    const trimmedKeyword = keywordInput.trim();
    if (trimmedKeyword && !formik.values.keywords.includes(trimmedKeyword)) {
      if (formik.values.keywords.length < 5) {
        formik.setFieldValue("keywords", [
          ...formik.values.keywords,
          trimmedKeyword,
        ]);
        setKeywordInput("");
      } else {
        alert("You can add a max of 5 keywords!");
      }
    }
  };

  const removeKeyword = (index) => {
    formik.setFieldValue(
      "keywords",
      formik.values.keywords.filter((_, i) => i !== index)
    );
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

  const handleCheckboxChange = (event, field) => {
    const { value, checked } = event.target;

    formik.setFieldValue(
      `admissionEntranceDetails.${field}`,
      checked
        ? [...(formik.values.admissionEntranceDetails[field] || []), value] // ✅ Add if checked
        : formik.values.admissionEntranceDetails[field].filter(
            (item) => item !== value
          ) // ❌ Remove if unchecked
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-6"
    >
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-8 border border-blue-300">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-lg shadow-lg">
  <h2 className="text-3xl font-bold flex items-center gap-4">
    <FaUniversity className="text-black bg-white p-2 rounded- shadow-md" size={40} /> 
    Add New College
  </h2>
</div>


        <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div >
              <label className="text-blue-700 font-semibold">College Name</label>
              <input
                type="text"
                {...formik.getFieldProps("collegeName")}
                className="w-full px-4 py-2 border  shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.collegeName && formik.errors.collegeName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.collegeName}
                </p>
              )}
            </div>

            <div>
              <label className="text-blue-700 font-semibold">Affiliated University</label>
              <input
                type="text"
                {...formik.getFieldProps("affiliatedUniversity")}
                className="w-full px-4 py-2 border  shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.affiliatedUniversity &&
                formik.errors.affiliatedUniversity && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.affiliatedUniversity}
                  </p>
                )}
            </div>

            <div className="mb-3">
              <label className="text-blue-700 font-medium">College Category</label>
              <select
                {...formik.getFieldProps("collegeCategory")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
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
              <label className="text-blue-700 font-medium">College Type</label>
              <select
                {...formik.getFieldProps("collegeType")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
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
              <label className="text-blue-700 font-medium">Address 1</label>
              <input
                type="text"
                {...formik.getFieldProps("address_line1")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.address_line1 && formik.errors.address_line1 && (
                <p className="text-red-500 text-sm">
                  {formik.errors.address_line1}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="text-blue-700 font-medium">Address 2</label>
              <input
                type="text"
                {...formik.getFieldProps("address_line2")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-3">
              <label className="text-blue-700 font-medium">Pincode</label>
              <input
                type="text"
                {...formik.getFieldProps("pincode")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <p className="text-red-500 text-sm">{formik.errors.pincode}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="text-blue-700 font-medium">Select State</label>
              <select
                {...formik.getFieldProps("state")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
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
              <label className="text-blue-700 font-medium">Select District</label>
              <select
                {...formik.getFieldProps("district")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
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
              <label className="text-blue-700 font-medium">Contact Details</label>
              <input
                type="text"
                {...formik.getFieldProps("contactDetails")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.contactDetails &&
                formik.errors.contactDetails && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.contactDetails}
                  </p>
                )}
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="text-blue-700 font-medium">Email</label>
              <input
                type="email"
                {...formik.getFieldProps("email_id")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.email_id && formik.errors.email_id && (
                <p className="text-red-500 text-sm">{formik.errors.email_id}</p>
              )}
            </div>

            <div className="mb-3 col-span-full w-full">
              <label className="text-blue-700 font-medium">Description</label>
              <textarea
                {...formik.getFieldProps("info.description")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
              {formik.touched.info && formik.errors.info && (
                <p className="text-red-500 text-sm">{formik.errors.info}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="text-blue-700 font-medium">Keywords (Max 5)</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addKeyword(e)}
                  className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {/* Add Keyword Icon Button */}
                <button
                  type="button"
                  onClick={addKeyword}
                  className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
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
                      className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
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

            <div className="mb-3">
              <label className="text-blue-700 font-medium">Website URL</label>
              <input
                type="text"
                {...formik.getFieldProps("websiteURL")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.websiteURL && formik.errors.websiteURL && (
                <p className="text-red-500 text-sm">
                  {formik.errors.websiteURL}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className="text-blue-700 font-medium">Established Year</label>
              <select
                {...formik.getFieldProps("establishedYear")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
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
              <label className="text-blue-700 font-medium">Accreditation</label>
              <select
                {...formik.getFieldProps("accreditation")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
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
              <label className="text-blue-700 font-medium">Admission Process</label>
              <input
                type="text"
                {...formik.getFieldProps("admissionProcess")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-3">
              <label className="text-blue-700 font-medium">Application Form URL</label>
              <input
                type="text"
                {...formik.getFieldProps("applicationFormURL")}
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.applicationFormURL &&
                formik.errors.applicationFormURL && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.applicationFormURL}
                  </p>
                )}
            </div>

            {/* <section className="flex flex-row"> */}
              
        
            {/* <div className="col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Admission Details */}
              {/* <div className="mb-3">
                <label className="text-blue-700 font-medium">Admission Start Date</label>
                <input
                  type="date"
                  {...formik.getFieldProps(
                    "admissionEntranceDetails.admissionStartDate"
                  )}
                  className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.admissionEntranceDetails?.admissionStartDate &&
                  formik.errors.admissionEntranceDetails
                    ?.admissionStartDate && (
                    <p className="text-red-500 text-sm">
                      {
                        formik.errors.admissionEntranceDetails
                          .admissionStartDate
                      }
                    </p>
                  )}
              </div> */}
{/* 
              <div className="mb-3">
                <label className="text-blue-700 font-medium">Admission End Date</label>
                <input
                  type="date"
                  {...formik.getFieldProps(
                    "admissionEntranceDetails.admissionEndDate"
                  )}
                  className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div> */}

              {/* <div className="mb-3">
                <label className="text-blue-700 font-medium">Last Year Cutoff Marks</label>
                <input
                  type="number"
                  {...formik.getFieldProps(
                    "admissionEntranceDetails.lastYearCutoffMarks"
                  )}
                  className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div> */}
            {/* </div>
            </div> */} 

            {/* <div className="grid grid-cols-1 md:grid-cols gap-4"> */}
              {/* Scholarships Available (Checkboxes) */}
              {/* <div className="mb-5 p-4 border rounded-lg shadow-md bg-white ">
                <label className="text-blue-800 font-semibold block mb-2">
                  Scholarships Available:
                </label>
                <div className="flex gap-4 flex-wrap">
                  {["Merit based", "Need based", "Sports", "Minority"].map(
                    (option) => (
                      <label
                        key={option}
                        className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-md shadow-sm hover:bg-blue-100 transition"
                      >
                        <input
                          type="checkbox"
                          // name="admissionEntranceDetails.scholarshipsAvailable"
                          value={option}
                          checked={formik.values.admissionEntranceDetails.scholarshipsAvailable.includes(
                            option
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(e, "scholarshipsAvailable")
                          }
                           className="accent-blue-600"
                        />
                        <span className="text-gray-700 font-medium">{option}</span>
                      </label>
                    )
                  )}
                </div>
              </div> */}

              {/* Quota System (Checkboxes) */}
              {/* <div className="mb-5 p-4 border rounded-lg shadow-md bg-white">
                <label className="text-blue-800 font-semibold block mb-2">Quota System:</label>
                <div className="flex gap-4 flex-wrap">
                  {quotaSystem.map((option) => (
                    <label key={option} className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-md shadow-sm hover:bg-green-100 transition">
                      <input
                        type="checkbox"
                        //  name="admissionEntranceDetails.quotaSystem"
                        value={option}
                        checked={formik.values.admissionEntranceDetails.quotaSystem.includes(
                          option
                        )}
                        onChange={(e) => handleCheckboxChange(e, "quotaSystem")}
                         className="accent-green-600"
                      />
                      <span className="text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div> */}
            {/* </div> */}
            {/* </section> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"> */}
            {/* College Image Upload */}
            <div className="border-2 border-dashed rounded-lg p-5 text-center shadow-md bg-white hover:border-blue-400 transition">
              <label className="block font-semibold text-blue-800 mb-2">
                College Image{" "}
                <span className="text-red-500">(Max: 100KB, JPG/JPEG/PNG)</span>
              </label>
              <div
                className="border border-gray-300 p-6 rounded-lg cursor-pointer  hover:bg-blue-50 transition"
                onClick={() => document.getElementById("collegeImage").click()}
              >
                {formik.values.image ? (
                  <img
                    src={URL.createObjectURL(formik.values.image)}
                    alt="Preview"
                    className="w-full h-24 object-cover rounded-lg shadow-md"
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
                onChange={handleImageChange} // ✅ Now calling the function
              />

              {formik.touched.image && formik.errors.image && (
                <p className="text-red-500 text-sm">{formik.errors.image}</p>
              )}
            </div>

            {/* Gallery Images Upload */}
            <div className="border-2 border-dashed rounded-lg p-5 text-center shadow-md bg-white hover:border-blue-400 transition">
              <label className="block font-semibold text-blue-800 mb-2">
              Gallery Images{" "}
                <span className="text-red-500"> (JPG/JPEG/PNG)</span>
              </label>
              <div
                className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                onClick={() => document.getElementById("galleryImages").click()}
              >
                {formik.values.gallery_image?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formik.values.gallery_image.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-16 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 ">
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
                  const files = Array.from(event.target.files); // ✅ Convert FileList to Array
                  formik.setFieldValue("gallery_image", files); // ✅ Set as an array
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
            <label className="text-blue-700 flex items-center gap-2 font-medium">
            <FaMapMarkerAlt /> Select Location
            </label>

            <div className="flex gap-2 mb-2">
              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  console.log("Updates Search:", e.target.value);
                }}
                placeholder="Search location"
                className="w-full px-4 py-2 border   shadow-sm focus:ring-2 focus:ring-blue-500"
              />

              {/* Search Button */}
              <button
                type="button"
                onClick={handleSearch} // ✅ Use the function directly
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Search
              </button>

              {/* Current Location Button */}
              <button
                type="button"
                onClick={handleCurrentLocation}
                className="bg-green-500 text-white px-4 py-2 font-medium rounded cursor-pointer"
              >
                Current
              </button>
            </div>

            {/* Leaflet Map */}
            <MapContainer
              center={[location.lat, location.lan]}
              zoom={10}
              style={{ height: "300px", width: "100%", border: "1px solid #3b82f6"}}
              ref={mapRef}
              // whenCreated={(map) => (mapRef.current = map)}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker
                setLocation={setLocation}
                location={location}
                setFieldValue={formik.setFieldValue}
              />
              {/* <Marker position={[location.lat, location.lan]} /> */}
            </MapContainer>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <motion.button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white   hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={mutation.isPending} // Button disabled while submitting
              // onClick={formik.handleSubmit} // ✅ Calls Formik's submit function
            >
              {mutation.isPending ? "Submitting..." : "Submit"}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddNewCollege;
