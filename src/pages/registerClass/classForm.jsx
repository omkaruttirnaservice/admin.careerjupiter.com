import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaUniversity } from "react-icons/fa";
import InputField from "../../component/inputField";
import CheckboxGroup from "../../component/checkboxGroup";
// import FileUpload from "../../component/fileUpload";
import TextAreaField from "../../component/textAreaField";
import MultiSelectField from "../../component/multiSelectField";
import RadioGroup from "../../component/radioGroup";
import { API_BASE_URL } from "../../constant/constantBaseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { setAuthCookies } from "../../utlis/cookieHelper";
// import ContactWithOTP from "../../Component/contactWithOTP";
// import ContactWithOTP from "../../Component/contactWithOTP";
import MultiSelectDropdown from "../../component/multiSelectDropdown";
import Swal from "sweetalert2";
import AddressModal from "../../component/addressModel";
import FileUpload from "../../component/fileUpload";
import ContactWithOTP from "../../component/contactWithOTP";

const ClassForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  // const [selectedDiscount, setSelectedDiscount] = useState("");
  // const [validTill, setValidTill] = useState("");
  const [dynamicCategories, setDynamicCategories] = useState([]);

  <stateDistricts />;

  const discountOptions = [
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

  const formik = useFormik({
    initialValues: {
      className: "",
      ownerOrInstituteName: "",
      typeOfClass: [],
      category: [],
      otherCategory: "",
      subjectsOrCourses: [],
      teachingMedium: [],
      modeOfTeaching: [],
      franchiseOrIndependent: "",
      yearEstablished: "",
      address: [],
      contactDetails: "",
      otp: "",
      reference_id: "",
      verificationCheck: "",
      password: "",
      confirmPassword: "",
      info: { description: "" },
      websiteURL: "",
      image: null,
      imageGallery: [],
      locations: [],
      keywords: [],
      discount: "",
      validTill: "",
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
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      contactDetails: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit contact number")
        .required("Contact Details are required"),
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

      // category: Yup.array()
      //   .of(Yup.string().oneOf(dynamicCategories, "Invalid category selected"))
      //   .min(1, "At least one category must be selected")
      //   .required("Category is required"),

      category: Yup.array()
        .of(
          Yup.string().test(
            "is-valid-category",
            "Invalid category selected",
            (value) =>
              dynamicCategories.includes(value) ||
              formik.values.category.includes(value)
          )
        )
        .min(1, "At least one category must be selected")
        .required("Category is required"),

      discount: Yup.string().required("Please select a discount"),
      validTill: Yup.date()
        .nullable()
        .when("discount", {
          is: (val) => val !== "", // only validate if discount is selected
          then: (schema) =>
            schema
              .required("Valid till date is required")
              .min(new Date(), "Date must be today or later"),
        }),

      // otherCategory: Yup.string().when("Category", {
      //   is: (val) => Array.isArray(val) && val.includes("Others"),
      //   then: () => Yup.string().required("Please specify the other category"),
      //   otherwise: () => Yup.string().notRequired(),
      //   }),
      modeOfTeaching: Yup.array()
        .min(1, "Please select at least one mode of teaching") // At least one option must be selected
        .required("Mode of teaching is required"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();

        if (!verifiedOtp) {
          Swal.fire({
            icon: "warning",
            title: "OTP Not Verified",
            text: "Please verify your mobile number and OTP before submitting the form.",
            confirmButtonColor: "#f0ad4e",
          });
          return false;
        }

        if (!values.address || values.address.length === 0) {
          Swal.fire({
            icon: "warning",
            title: "Address Required",
            text: "Please add at least one address before submitting.",
            confirmButtonColor: "#f0ad4e",
          });
          return;
        }

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

        values.address.forEach((address, idx) => {
          formData.append(`address[${idx}][line1]`, values.address[idx].line1);
          formData.append(`address[${idx}][line2]`, values.address[idx].line2);
          formData.append(
            `address[${idx}][taluka]`,
            values.address[idx].taluka
          );
          formData.append(
            `address[${idx}][pincode]`,
            values.address[idx].pincode
          );
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

        if (values.discount) {
          formData.append("discount", Number(values.discount));
        }
        if (values.validTill) {
          formData.append("validTill", values.validTill);
        }

        formData.append(
          `franchiseOrIndependent`,
          formattedData.franchiseOrIndependent
        );
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

        const finalCategory = values.category.map((item) =>
          item === "Others" ? customCategory : item
        );

        finalCategory.forEach((cat) => {
          formData.append("category[]", cat);
        });

        // formData.append("subjectsOrCourses", JSON.stringify(formattedData.subjectsOrCourses || []));
        formattedData.modeOfTeaching.forEach((mode) => {
          formData.append("modeOfTeaching", mode);
        });

        if (formattedData.image) {
          formData.append("image", formattedData.image);
        }

        formattedData.imageGallery.forEach((file) => {
          formData.append("imageGallery", file);
        });

        formattedData.keywords.forEach((keyword) => {
          formData.append("keywords", keyword);
        });

        console.log(
          "📌Final FormData Sent:",
          Object.fromEntries(formData.entries())
        );

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
            error.response?.data.errMsg || "❌ Class ID missing in API response"
          );
        }

        // ✅ Store Class ID in Cookies
        Cookies.set("classId", classId, { expires: 1 / 24 });

        // Show Success Message & Redirect to Vendor Dashboard
        Swal.fire({
          title: "🎉 Success!",
          text: "Class has been added to the system.",
          icon: "success",
          background: "#f9f9f9",
        }).then(() => {
          resetForm();
          navigate("/");
        });
      } catch (error) {
        console.error(
          "❌ Error submitting form:",
          error.response?.data || error.message
        );
        Swal.fire({
          icon: "warning",
          title: "Submission Failed",
          text:
            error.response?.data?.errMsg ||
            error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            "Failed to submit form. Please try again.",
          confirmButtonColor: "#d33",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Get dynamic categories from api
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/class/search`);
        if (response.data.success && response.data.categories) {
          const formatted = response.data.categories.map((cat) => cat.category);
          setDynamicCategories(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // 🔍 Watch for selection changes
  useEffect(() => {
    if (formik.values.category?.includes("Others")) {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  }, [formik.values.category]);

  // When selected others in category list - to handle the value entered in others field
  const handleAddOtherCategory = () => {
    if (!customCategory.trim()) return;

    const updated = formik.values.category.map((item) =>
      item === "Others" ? customCategory : item
    );

    formik.setFieldValue("category", updated);

    setCustomCategory("");
    setShowOtherInput(false);
  };

  // Handle custom category
  // const handleAddOtherCategory = () => {
  //   if (!customCategory) return;

  //   const exists = dynamicCategories.some(
  //     (cat) => cat.value.toLowerCase() === customCategory.toLowerCase()
  //   );

  //   if (!exists) {
  //     const newCat = { label: customCategory, value: customCategory };
  //     setDynamicCategories((prev) => [...prev, newCat]);
  //   }

  //   formik.setFieldValue("Category", [
  //     ...(formik.values.Category || []),
  //     customCategory,
  //   ]);

  //   setCustomCategory("");
  //   setShowOtherInput(false);
  // };

  // handle custom input if "Others" is selected
  useEffect(() => {
    if (formik.values.category?.includes("Others")) {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  }, [formik.values.category]);

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[url('https://wallpapers.com/images/hd/virtual-classroom-background-xl1p59ku6y834y02.jpg')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-opacity-50 bg-black/50 backdrop-blur-sm"></div>
      <div className="w-full max-w-5xl bg-white shadow-lg p-3 border border-blue-500 lg:my-4 sm:my-2 sm:p-6 lg:p-6 relative z-10">
        {/* Form Title */}
        <div className="text-right mb-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
          >
            Class Login
          </button>
        </div>
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

            <ContactWithOTP
              formik={formik}
              setVerifiedOtp={setVerifiedOtp}
              verifiedOtp={verifiedOtp}
            />

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
              label="Established Year"
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
                  className="border border-gray-300 rounded px-3 py-2 w-full"
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

            {/* <MultiSelectDropdown
              label="Category"
              name="Category"
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
            )} */}

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

            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex-1">
                <label className="block text-blue-900 text-lg font-semibold mb-2">
                  Select Discount
                </label>
                <select
                  name="discount"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formik.values.discount || ""}
                  onChange={formik.handleChange}
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
              {formik.values.discount && (
                <div className="flex-1">
                  <label className="block text-blue-900 text-lg font-semibold mb-2">
                    Valid Till
                  </label>
                  <input
                    type="date"
                    name="validTill"
                    className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formik.values.validTill || ""}
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
              <div className="flex justify-between items-center col-span-full gap-4">
                <label
                  htmlFor="Address"
                  className="text-blue-900 font-semibold block text-lg"
                >
                  Address
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="cursor-pointer flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-700 text-white font-medium shadow-md hover:shadow-lg hover:from-gray-400 hover:to-gray-500 transition-all duration-200"
                >
                  <span className="font-extrabold">+</span> Add Address
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
                <div className="col-span-full mt-4">
                  <h4 className="text-xl font-semibold text-blue-800 mb-6 flex items-center gap-2">
                    <span>📌</span> Saved Addresses
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formik.values.address.map((addr, idx) => (
                      <div
                        key={idx}
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

                        <div className="flex justify-end gap-3 mt-4">
                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingAddressIndex(idx);
                              setShowAddressModal(true);
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
                              updated.splice(idx, 1);
                              formik.setFieldValue("address", updated);
                            }}
                            className="bg-red-500 text-white text-xs px-4 py-1.5 rounded-md shadow-sm hover:bg-red-600 transition flex items-center gap-1 cursor-pointer"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Submit Button */}
            <div className="col-span-full flex justify-end mt-4">
              <button
                type="submit"
                className="bg-indigo-600 cursor-pointer text-white py-3 px-6 rounded-md font-semibold 
               hover:bg-indigo-700 transition w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={
                  verifiedOtp ? formik.isSubmitting : formik.isSubmitting
                }
              >
                {formik.isSubmitting ? "Creating Account..." : "Create Account"}
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
