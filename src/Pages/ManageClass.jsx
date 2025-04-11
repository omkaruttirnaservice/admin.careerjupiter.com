import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaTimes, FaUniversity } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import * as Yup from "yup";
import InputField from "../Component/InputField";
import RadioGroup from "../Component/RadioGroup";
import CheckboxGroup from "../Component/CheckboxGroup";
import MultiSelectDropdown from "../Component/MultiSelectDropdown";
import { getCookie } from "../Utlis/cookieHelper";

// ✅ Helper function to safely parse JSON fields
const parseJSONField = (field) => {
  try {
    return typeof field === "string" ? JSON.parse(field) : field;
  } catch {
    return [];
  }
};

const ManageClass = () => {
  const navigate = useNavigate();
  const storedClassId = Cookies.get("classId"); // ✅ Retrieve from cookies
  const [classId, setClassId] = useState(storedClassId || "");
  const [classDetails, setClassDetails] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  console.log("📌 Retrieved Class ID from Cookies:", classId);

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

  // ✅ Fetch Class Details
  useEffect(() => {
    const storedClassId = getCookie("classID"); // ✅ Use getCookie function
    // console.log("Fetched ClassId ", storedClassId)
    if (storedClassId) {
      setClassId(storedClassId);
      console.log("Class ID retrieved from cookies:", storedClassId);
    } else {
      console.warn("Class ID not found in cookies!");
    }
  }, []);

  useEffect(() => {
    const fetchClassDetails = async () => {
      if (!classId) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/class/${classId}`
        );
        console.log("📌 Full API Response:", response.data);

        let classData = response.data?.data?.class || {};

        // ✅ Ensure Info Field Exists
        classData.info = {
          description: classData?.info?.description || "",
        };

        // ✅ Ensure Subjects & Teaching Medium are parsed
        classData.subjectsOrCourses =
          parseJSONField(classData.subjectsOrCourses) || [];
        classData.teachingMedium =
          parseJSONField(classData.teachingMedium) || [];
        classData.keywords = parseJSONField(classData.keywords) || [];

        // ✅ Ensure other fields exist
        classData.modeOfTeaching = classData?.modeOfTeaching || "";
        classData.Category = classData?.Category || [];
        classData.yearEstablished = classData?.yearEstablished || 0;
        classData.className = classData?.className || "";
        classData.ownerOrInstituteName = classData?.ownerOrInstituteName || "";
        classData.franchiseOrIndependent =
          classData?.franchiseOrIndependent || "";
        classData.contactDetails = classData?.contactDetails || "";
        classData.websiteURL = classData?.websiteURL || "";

        console.log("📌 Processed Class Data:", classData);
        setClassDetails(classData); // ✅ Update state

        // ✅ Update Formik with new data
        formik.setValues({
          ...formik.values,
          ...classData, // ✅ Merge class details into Formik values
        });
      } catch (error) {
        console.error(
          error.response?.data.errMessage || "❌ Error fetching class details:",
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
      Category: classDetails?.Category || "",
      subjectsOrCourses: classDetails?.subjectsOrCourses || [],
      modeOfTeaching: classDetails?.modeOfTeaching || "",
      teachingMedium: classDetails?.teachingMedium || [],
      yearEstablished: classDetails?.yearEstablished || "",
      franchiseOrIndependent: classDetails?.franchiseOrIndependent || "",
      contactDetails: classDetails?.contactDetails || "",
      websiteURL: classDetails?.websiteURL || "",
      image: classDetails?.image || null, // for single image
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
    },
    validationSchema: Yup.object().shape({
      className: Yup.string().required("Class Name is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();

        for (const key in values) {
          console.log(key, values[key]);

          if (key === "image" && values[key] instanceof File) {
            formData.append("image", values[key]);
            //console.log(formData.get('image'))
          } else if (
            key === "Category" ||
            key === "modeOfTeaching" ||
            key === "keywords"
          ) {
            console.log("caterogry -------", JSON.stringify(values[key]));

            formData.append(key, JSON.stringify(values[key]));
          } else if (key === "locations" && Array.isArray(values[key])) {
            values[key].forEach((location, index) => {
              for (const locKey in location) {
                formData.append(
                  `locations[${index}][${locKey}]`,
                  location[locKey]
                );
              }
            });
          } else if (key === "address" && Array.isArray(values[key])) {
            values[key].forEach((addr, index) => {
              for (const addrKey in addr) {
                formData.append(`address[${index}][${addrKey}]`, addr[addrKey]);
              }
            });
          } else if (key === "info") {
            formData.append("info", JSON.stringify(values["info"]));
          } else if (typeof values[key] === "object") {
            console.log(values[key]);
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        }
        // return false;
        // console.log(formData.get('info'))
        // console.clear()
        //  console.log(formData.getAll('address'))

        const response = await axios.put(
          `${API_BASE_URL}/api/class/update/${classId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("📌 Update Response:", response.data);
        alert("✅ Class updated successfully!");
      } catch (error) {
        console.error("❌ Error updating class:", error);
        alert(
          error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            error.response?.data?.errMessage ||
            "❌ Failed to update class."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 to-blue-300  md:p-3">
      {/* ✅ Main Content */}
      <div className="flex-1 flex justify-center">
        <div className="flex flex-col md:flex-row min-h-screen md:p-4 relative bg-gradient-to-br from-blue-100 to-blue-300 overflow-hidden">
          {/* Background Icons - Random Placement */}

          <div className="w-full max-w-full lg:w-[1000px] mx-auto bg-white shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border border-blue-500 rounded-xl">
            {/* ✅ Form Title */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6  shadow-md text-center">
              <h2 className="text-2xl md:text-4xl font-bold">
                Update Class Details
              </h2>
            </div>

            {/* ✅ Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* 🔹 Basic Details */}
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
                {/* 🔹 Address Section */}

                <InputField
                  label="Contact Details"
                  type="text"
                  name="contactDetails"
                  formik={formik}
                />

                <InputField
                  label="Year Established"
                  type="number"
                  name="yearEstablished"
                  formik={formik}
                />
                <InputField
                  label="Website URL"
                  type="url"
                  name="websiteURL"
                  formik={formik}
                />

                <MultiSelectDropdown
                  label="Category"
                  name="Category"
                  options={classCategories}
                  formik={formik}
                />
              </div>

              {/* Address array */}
              {formik.values.address.map((addr, index) => {
                const isEditing = editingIndex === index;

                return (
                  <div
                    key={index}
                    className="p-6 mb-6 rounded-2xl shadow-xl bg-white border border-gray-200"
                  >
                    {/* If editing, show input form */}
                    {isEditing ? (
                      <>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-blue-700">
                            ✏ Editing Address {index + 1}
                          </h3>
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="text-green-600 hover:text-green-800 font-medium text-sm"
                          >
                            ✅ Done
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Line 1 */}
                          <div>
                            <input
                              type="text"
                              name={`address[${index}].line1`}
                              placeholder="Line 1"
                              value={addr.line1}
                              onChange={formik.handleChange}
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {formik.errors.address?.[index]?.line1 && (
                              <div className="text-red-500 text-sm mt-1">
                                {formik.errors.address[index].line1}
                              </div>
                            )}
                          </div>

                          <input
                            type="text"
                            name={`address[${index}].line2`}
                            placeholder="Line 2"
                            value={addr.line2}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />

                          <input
                            type="text"
                            name={`address[${index}].nearbyLandmarks`}
                            placeholder="Nearby Landmarks"
                            value={addr.nearbyLandmarks}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />

                          <input
                            type="text"
                            name={`address[${index}].pincode`}
                            placeholder="Pincode"
                            value={addr.pincode}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />

                          <input
                            type="text"
                            name={`address[${index}].state`}
                            placeholder="State"
                            value={addr.state}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />

                          <input
                            type="text"
                            name={`address[${index}].dist`}
                            placeholder="District"
                            value={addr.dist}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />

                          <input
                            type="text"
                            name={`address[${index}].taluka`}
                            placeholder="Taluka"
                            value={addr.taluka}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />

                          <input
                            type="text"
                            name={`address[${index}].autorizedName`}
                            placeholder="Authorized Name"
                            value={addr.autorizedName}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />

                          <input
                            type="text"
                            name={`address[${index}].autorizedPhono`}
                            placeholder="Authorized Phone"
                            value={addr.autorizedPhono}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Read-only display */}
                        <div className="mb-2 text-gray-800 font-medium">
                          {addr.line1}, {addr.line2}, {addr.nearbyLandmarks},{" "}
                          {addr.taluka}, {addr.dist}, {addr.state},{" "}
                          {addr.pincode}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {addr.autorizedName} - {addr.autorizedPhono}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                          <button
                            onClick={() => setEditingIndex(index)}
                            className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                          >
                            ✏ Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...formik.values.address];
                              updated.splice(index, 1);
                              formik.setFieldValue("address", updated);
                              if (editingIndex === index) setEditingIndex(null);
                            }}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm"
                          >
                            🗑 Remove
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              {/* Add new address */}
              <button
                type="button"
                onClick={() => {
                  formik.setFieldValue("address", [
                    ...formik.values.address,
                    {
                      line1: "",
                      line2: "",
                      pincode: "",
                      state: "",
                      dist: "",
                      taluka: "",
                      nearbyLandmarks: "",
                      autorizedName: "",
                      autorizedPhono: "",
                    },
                  ]);
                }}
                className="text-blue-600 mt-4"
              >
                + Add Address
              </button>

              <div className="col-span-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  {/* <MultiSelectField
                    label="Keywords"
                    name="keywords"
                    formik={formik}
                  /> */}
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
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

                {/* <div className="grid grid-cols-2 space-x-3 col-span-full">
                {/* Single Image Upload */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-800">
                    Class Image
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-4">
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
          before:w-full before:h-full before:bg-white before:opacity-20 before:rotate-6 before:transition-all hover:before:left-full"
                      />
                    ) : (
                      <p className="text-gray-500 italic">No image available</p>
                    )}
                  </div>

                  {/* File Input */}
                  {/* <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        formik.setFieldValue("image", file);
                        setPreviewImage(URL.createObjectURL(file)); 
                      }
                    }}
                    className="mt-4 block w-full"
                  /> */}

                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        formik.setFieldValue("image", file);
                        setPreviewImage(URL.createObjectURL(file)); // preview
                      }
                    }}
                  />

                  <label
                    htmlFor="imageUpload"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded cursor-pointer hover:bg-blue-700 transition"
                  >
                    Update Image
                  </label>

                  {formik.touched.image && formik.errors.image && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.image}
                    </div>
                  )}
                </div>

                {/* Multiple Image Upload (Gallery) */}
                {/* <FileUpload
                  label="Gallery Images"
                  name="gallery_image"
                  multiple
                  formik={formik}
                />
              </div> */}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={formik.handleSubmit} // ✅ Ensure API is called on click
                  className="bg-indigo-600 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition cursor-pointer"
                >
                  Update Class
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClass;
