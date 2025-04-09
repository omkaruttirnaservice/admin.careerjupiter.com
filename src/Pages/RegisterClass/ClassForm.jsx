import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaMapMarkerAlt, FaTimes, FaUniversity } from "react-icons/fa";
import InputField from "../../Component/InputField";
import SelectField from "../../Component/SelectField";
import CheckboxGroup from "../../Component/CheckboxGroup";
import FileUpload from "../../Component/FileUpload";
import TextAreaField from "../../Component/TextAreaField";
import MultiSelectField from "../../Component/MultiSelectField";
import RadioGroup from "../../Component/RadioGroup";
import MapContainerComponent from "./MapContainerComponent";
import SearchBar from "./SearchBar";
import CurrentLocationButton from "./CurrentLocationButton";
import { API_BASE_URL } from "../../Constant/constantBaseUrl";
import stateDistricts from "../../Constant/ConstantData";
import axios from "axios";
import Cookies from "js-cookie";
import { setAuthCookies } from "../../Utlis/cookieHelper";
import ContactWithOTP from "../../Component/ContactWithOTP";
import MultiSelectDropdown from "../../Component/MultiSelectDropdown";
import MapComponent from "./MapComponent";
import Swal from "sweetalert2";
import AddressModal from "../../Component/AddressModel";
import ButtonComponent from "../../Component/Button";

const ClassForm = ({ onClose }) => {
  // const [position, setPosition] = useState({ lat: 19.076, lan: 72.8777 });
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null); // New
  // const [formik, setFormik] = useState(null); // Store Formik instance or use `useFormik`
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  <stateDistricts />;

  const classCategories = [
    "Primary (1 to 7)",
    "Secondary (8 to 10) State Board",
    "Secondary (8 to 10) CBSE Board",
    "Secondary (8 to 10) ICSE Board",
    "Secondary (8 to 10) IGCSE Board",
    "11 - 12 Science with CET",
    "11 - 12 Science with CET, JEE, NEET",
    "Diploma Engineering",
    "Degree Engineering",
    "NDA",
    "Hobby/Sports",
    "Competative Exams",
    "Others",
  ];

  const formik = useFormik({
    initialValues: {
      className: "",
      ownerOrInstituteName: "",
      typeOfClass: [],
      Category: [],
      subjectsOrCourses: [],
      teachingMedium: [],
      modeOfTeaching: [],
      franchiseOrIndependent: "",
      yearEstablished: "",
      address: [
        {
          line1: "",
          line2: "",
          pincode: "",
          state: "",
          dist: "",
          taluka: "",
          nearbyLandmarks: "", // ✅ single string
          autorizedName: "",
          autorizedPhono: "",
        },
      ],

      contactDetails: "",
      otp: "",
      reference_id: "",
      isVerified: false,
      password: "",
      confirmPassword: "",
      info: { description: "" },
      websiteURL: "",
      image: null,
      imageGallery: [],
      locations: [], // ✅ Store lat/lng
      keywords: [],
    },

    validationSchema: Yup.object({
      className: Yup.string().required("Class Name is required"),
      ownerOrInstituteName: Yup.string().required(
        "Owner/Institute Name is required"
      ),
      franchiseOrIndependent: Yup.string().required("Select an option"),
      yearEstablished: Yup.number()
        .required("Year Established is required")
        .min(1900, "Enter a valid year")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      address: Yup.array().of(
        Yup.object().shape({
          //         line1: Yup.string().required("Address Line 1 is required"),
          //         // line2: Yup.string().required("Address Line 2 is required"),
          pincode: Yup.string()
            .matches(/^[0-9]{6}$/, "Enter a valid 6-digit pincode")
            .required("Pincode is required"),
          //         state: Yup.string().required("State is required"),
          //         dist: Yup.string().required("District is required"),
          //         taluka: Yup.string().required("Taluka is required"), // ✅ single string
          //         nearbyLandmarks: Yup.string().required("Landmark is required"), // ✅ single string
          //         autorizedName: Yup.string().required("Autorized Name is required"), // ✅ single string
          //         autorizedPhono: Yup.string()
          //         .matches(/^[0-9]{10}$/, "Enter a valid 10-digit contact number")
          //         .required("Phone Number is required"),
        })
      ),
      contactDetails: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit contact number")
        .required("Contact Details are required"),

      //   // websiteURL: Yup.string().url("Enter a valid website URL").nullable(),
      //   // websiteURL: Yup.string()
      //   // .matches(
      //   //   /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      //   //   "Enter a valid website URL"
      //   // )
      //   // .nullable(),

      info: Yup.object().shape({
        description: Yup.string()
          .min(100, "Minimum 100 characters required.")
          .max(1000, "Maximum 1000 characters allowed.")
          .required("Description is required."),
      }),
      keywords: Yup.array()
        .of(Yup.string().min(1, "Each keyword must have at least 1 Keyword"))
        .min(1, "At least one keyword is required")
        .max(10, "You can add up to 10 keywords only")
        .required("Keywords are required"),
      imageGallery: Yup.array()
        .min(1, "At least one image is required")
        // .max(2, "You can upload up to 2 images only")
        .of(
          Yup.mixed()
            .test(
              "fileType",
              "Only JPG, JPEG, or PNG files are allowed",
              (file) =>
                file
                  ? ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
                  : true
            )
            .test("fileSize", "Image size must be less than 100KB", (file) =>
              file ? file.size <= 102400 : true
            )
        )
        .required("Image gallery is required"),
      image: Yup.mixed()
        .test("fileType", "Only JPG, JPEG, or PNG files are allowed", (file) =>
          file
            ? ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
            : true
        )
        .test("fileSize", "Image size must be less than 100KB", (file) =>
          file ? file.size <= 102400 : true
        )
        .required("Image is required"),
      //   typeOfClass: Yup.array()
      //     .of(Yup.string().oneOf(typeOfClass, "Invalid selection"))
      //     .min(1, "At least one class type must be selected")
      //     .required("Type of class is required"),
      Category: Yup.array()
        .of(Yup.string().oneOf(classCategories, "Invalid category selected"))
        .min(1, "At least one category must be selected")
        .required("Category is required"),
      modeOfTeaching: Yup.array()
        .min(1, "Please select at least one mode of teaching") // At least one option must be selected
        .required("Mode of teaching is required"),
      //   teachingMedium: Yup.array()
      //     .of(
      //       Yup.string().min(
      //         1,
      //         "Each teaching medium must have at least 1 character"
      //       )
      //     )
      //     .min(1, "At least one teaching medium is required")
      //     // .max(5, "You can add up to 5 teaching mediums only")
      //     .required("Teaching medium is required"),

      //   subjectsOrCourses: Yup.array()
      //     .of(
      //       Yup.string().min(
      //         1,
      //         "Each subject or course must have at least 1 character"
      //       )
      //     )
      //     .min(1, "At least one subject or course is required")
      //     // .max(20, "You can add up to 20 subjects or courses only")
      //     .required("Subjects or courses are required"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();

        console.log("🚀 Original Form Values:", values); // ✅ Debugging

        // ✅ Properly format `address` and `info`
        const formattedData = {
          ...values,
          yearEstablished: values.yearEstablished
            ? Number(values.yearEstablished)
            : "",

          address: {
            ...values.address,
          },
        };

        console.log("✅ Formatted Data Before Sending:", formattedData);

        //
        // formData.append("address", JSON.stringify(values.address));

        values.address.forEach((address, idx) => {
          formData.append(`address[${idx}][line1]`, values.address[idx].line1);
          formData.append(`address[${idx}][line2]`, values.address[idx].line2);
          formData.append(`address[${idx}][taluka]`, values.address[idx].taluka);
          formData.append(`address[${idx}][pincode]`, values.address[idx].pincode);
          formData.append(`address[${idx}][state]`, values.address[idx].state);
          formData.append(`address[${idx}][dist]`, values.address[idx].dist);
          formData.append(
            `address[${idx}][nearbyLandmarks]`,
            values.address[idx].nearbyLandmarks
          );
          formData.append(
            `address[${idx}][autorizedName]`,
            values.address[idx].autorizedName
          );
          formData.append(
            `address[${idx}][autorizedPhono]`,
            values.address[idx].autorizedPhono
          );
        });

        formData.append(
          `franchiseOrIndependent`,
          formattedData.franchiseOrIndependent
        );

        // const formattedInfo = { description: values.info }; // ✅ Ensure correct structure
        // formData.append("info", JSON.stringify(values.info)); // ✅ Converts object correctly
        formData.append("info[description]", values.info?.description);
        formData.append("contactDetails", formattedData.contactDetails);

        values.locations.forEach((loc, index) => {
          formData.append(`locations[${index}][lat]`, loc.lat);
          formData.append(`locations[${index}][lan]`, loc.lan);
        });

        console.log("📌 Address Data:", values.address);
        console.log(
          "📌 FormData Sent:",
          Object.fromEntries(formData.entries())
        );

        formData.append("className", formattedData.className);
        formData.append(
          "ownerOrInstituteName",
          formattedData.ownerOrInstituteName
        );
        formData.append("websiteURL", formattedData.websiteURL);
        formData.append("yearEstablished", formattedData.yearEstablished);

        formData.append("password", formattedData.password);
        formattedData.Category.forEach((cat) => {
          formData.append("Category", cat);
        });

        // formData.append("subjectsOrCourses", JSON.stringify(formattedData.subjectsOrCourses || []));
        formattedData.modeOfTeaching.forEach((mode) => {
          formData.append("modeOfTeaching", mode);
        });

        if (formattedData.image) {
          formData.append("image", formattedData.image);
        }

        // / Append imageGallery one by one
        formattedData.imageGallery.forEach((file) => {
          formData.append("imageGallery", file);
        });

        // Append keywords one by one
        formattedData.keywords.forEach((keyword) => {
          formData.append("keywords", keyword);
        });

        console.log(
          "📌Final FormData Sent:",
          Object.fromEntries(formData.entries())
        );

        // ✅ Send API Request
        const response = await axios.post(
          `${API_BASE_URL}/api/class/create`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("Class Created Successfully:", response.data);

        // ✅ Extract Class ID
        const classId = response.data?.data?.class?._id;
        if (!classId) {
          throw new Error(
            error.response?.data.errMessage ||
              "❌ Class ID missing in API response"
          );
        }

        // ✅ Store Class ID in Cookies
        Cookies.set("classId", classId, { expires: 1 / 24 });

        // ✅ Show Success Message & Redirect to Vendor Dashboard
        // alert("✅ Class Created Successfully!");
        Swal.fire({
          title: "🎉 Success!",
          text: "Class has been added to the system.",
          icon: "success",
          timer: 3000,
          background: "#f9f9f9", // Light background
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });

        resetForm();
        console.log("Navigating to Vendor Dashboard");
        navigate("/");
      } catch (error) {
        console.error(
          "❌ Error submitting form:",
          error.response?.data || error.message
        );
        alert(
          error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            error.response?.data.errMessage ||
            "❌ Error submitting form. Try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.Category?.includes("Others")) {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  }, [formik.values.Category]);

  const handleAddOtherCategory = async () => {
    if (!customCategory.trim()) return;

    try {
      // ⬆️ Send to backend
      await axios.post("/api/custom-category", { name: customCategory });

      // 🛠 Replace "Others" with custom category in selected values
      const updated = formik.values.Category.map((item) =>
        item === "Others" ? customCategory : item
      );
      formik.setFieldValue("Category", updated);

      // ✅ Optional: update global list too if needed (not mandatory)
      // classCategories.push(customCategory);

      // Reset
      setCustomCategory("");
      setShowOtherInput(false);
    } catch (err) {
      console.error("Error submitting custom category:", err);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 background-image">
    <div className="min-h-screen flex items-center justify-center relative bg-[url('https://wallpapers.com/images/hd/virtual-classroom-background-xl1p59ku6y834y02.jpg')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-opacity-50 bg-black/50 backdrop-blur-sm"></div>

      <div className="w-full max-w-5xl bg-white shadow-lg p-3 border border-blue-500 lg:my-4 sm:my-2 sm:p-6 lg:p-6 relative z-10">
        {/* Form Title */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-t-md text-center">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-3">
            <FaUniversity
              className="text-black bg-white p-2 rounded-full shadow-md"
              size={50}
            />
            Register Class
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Class Name"
              type="text"
              name="className"
              formik={formik}
            />
            <InputField
              label="Owner Name"
              type="text"
              name="ownerOrInstituteName"
              formik={formik}
            />

            <ContactWithOTP formik={formik} />

            <div className="col-span-full grid grid-cols-2 gap-4">
              <InputField
                label="Set Password"
                type="password"
                name="password"
                formik={formik}
              />

              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                formik={formik}
              />
            </div>

            <InputField
              label="Year Established"
              type="number"
              name="yearEstablished"
              formik={formik}
            />

            <InputField
              label="Website URL"
              type="text"
              name="websiteURL"
              formik={formik}
            />

            <MultiSelectDropdown
              label="Category"
              name="Category"
              options={classCategories}
              formik={formik}
            />
            {showOtherInput && (
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Enter custom category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <button
                  type="button"
                  onClick={handleAddOtherCategory}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            )}

            {/* <InputField label="Address Line 1" type="text" name="address.line1" formik={formik} />
          <InputField label="Pincode" type="text" name="address.pincode" formik={formik} /> */}
            {/* <CheckboxGroup label="Mode of Teaching" name="modeOfTeaching" options={["Online", "Offline", "Hybrid"]} formik={formik} /> */}
            <TextAreaField
              label="Description"
              name="info.description"
              formik={formik}
            />
            <div className="col-span-full">
              <div className="grid  gap-6 w-full ">
                <MultiSelectField
                  label="Keywords"
                  name="keywords"
                  formik={formik}
                />
              </div>
            </div>

            <RadioGroup
              label="Type"
              name="franchiseOrIndependent"
              options={["Franchise", "Home Tution", "Group"]}
              formik={formik}
            />
            <CheckboxGroup
              label="Mode of Teaching"
              name="modeOfTeaching"
              options={["Online", "Offline"]}
              formik={formik}
            />
            <div className="col-span-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Single Image Upload */}
                <FileUpload
                  label="College Image"
                  name="image"
                  formik={formik}
                />

                {/* Multiple Image Upload (Gallery) */}
                <FileUpload
                  label="Gallery Images"
                  name="imageGallery"
                  multiple
                  formik={formik}
                />
              </div>
            </div>

            <div className="col-span-full justify-end ">
              <div className="flex justify-end items-center col-span-full gap-4">
                <label htmlFor="Address" className="text-blue-800 font-medium">
                  Address
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                >
                  ➕ Add Address
                </button>
              </div>
            </div>

            {/* Display Saved Addresses */}
            {formik.values.address &&
              formik.values.address.length > 0 &&
              formik.values.address.some(
                (addr) =>
                  addr.line1 ||
                  addr.line2 ||
                  addr.pincode ||
                  addr.state ||
                  addr.dist
              ) && (
                <div className="col-span-full mt-6">
                  <h4 className="text-lg font-semibold text-blue-800 mb-4">
                    📌 Saved Addresses
                  </h4>
                  <div className="space-y-4">
                    {formik.values.address.map((addr, idx) => (
                      <div
                        key={idx}
                        className="border border-blue-200 bg-blue-50 rounded-md p-4 shadow-sm relative"
                      >
                        <div className="mb-2 text-gray-800 font-medium">
                          {addr.line1}, {addr.line2}, {addr.nearbyLandmarks},{" "}
                          {addr.taluka}, {addr.dist}, {addr.state},{" "}
                          {addr.pincode}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {addr.autorizedName} - {addr.autorizedPhono}
                        </div>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAddressIndex(idx);
                            setShowAddressModal(true);
                          }}
                          className="absolute top-2 right-16 bg-yellow-500 text-white text-xs px-3 py-1 rounded-md hover:bg-yellow-600"
                        >
                          Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...formik.values.address];
                            updated.splice(idx, 1);
                            formik.setFieldValue("address", updated);
                          }}
                          className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Submit Button */}
            {/* <div className="text-center mt-2 col-span-full w-50 justify-center">
              <button
                type="submit"
                className="cursor-pointer bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition sm:w-full"
              >
                Submit
              </button>
            </div> */}

            <div className="col-span-full flex justify-center mt-4">
              <button
                type="submit"
                className="bg-indigo-600 cursor-pointer text-white py-3 px-6 rounded-md font-semibold 
               hover:bg-indigo-700 transition w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <AddressModal
        open={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          setEditingAddressIndex(null);
        }}
        onSave={(newAddress) => {
          const updated = [...formik.values.address];
          if (editingAddressIndex !== null) {
            updated[editingAddressIndex] = newAddress;
          } else {
            updated.push(newAddress);
          }
          formik.setFieldValue("address", updated);
          setEditingAddressIndex(null);
        }}
        initialData={
          editingAddressIndex !== null
            ? formik.values.address[editingAddressIndex]
            : null
        }
      />
    </div>
  );
};

export default ClassForm;
