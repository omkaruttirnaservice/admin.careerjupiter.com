import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaTimes, FaUniversity } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import InputField from "../Component/InputField";
import SelectField from "../Component/SelectField";
import MultiSelectField from "../Component/MultiSelectField";
import TextAreaField from "../Component/TextAreaField";
import FileUpload from "../Component/FileUpload";

import ClassVendorSideMenu from "./ClassVendorSideMenu";
import RadioGroup from "../Component/RadioGroup";
import stateDistricts from "../Constant/ConstantData";
import CheckboxGroup from "../Component/CheckboxGroup";
import SearchBar from "./RegisterClass/SearchBar";
import CurrentLocationButton from "./RegisterClass/CurrentLocationButton";
import MapContainerComponent from "./RegisterClass/MapContainerComponent";
import MultiSelectDropdown from "../Component/MultiSelectDropdown";

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
  const [position, setPosition] = useState({ lat: 19.076, lng: 72.8777 });

  console.log("📌 Retrieved Class ID from Cookies:", classId);

  <stateDistricts />;

  const collegeCategories = [
    "SSC",
    "HSC",
    "Diploma",
    "Pharmacy",
    "Engineering",
    "Under Graduate",
    "Post Graduate",
  ];

  // ✅ Fetch Class Details
  useEffect(() => {
    const fetchClassDetails = async () => {
      if (!classId) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/class/${classId}`
        );
        console.log("📌 Full API Response:", response.data);

        let classData = response.data?.data?.class || {};

        // ✅ Ensure Address Has All Required Fields
        classData.address = {
          line1: classData?.address?.line1 || "",
          line2: classData?.address?.line2 || "",
          pincode: classData?.address?.pincode || "",
          state: classData?.address?.state || "",
          dist: classData?.address?.dist || "",
        };

        // ✅ Ensure Info Field Exists
        classData.info = {
          description:
            classData?.info?.description || "",
        };

        // ✅ Ensure Subjects & Teaching Medium are parsed
        classData.subjectsOrCourses = parseJSONField(
          classData.subjectsOrCourses
        ) || [];
        classData.teachingMedium = parseJSONField(classData.teachingMedium) || [];
        classData.keywords = parseJSONField(classData.keywords) || [];

        // ✅ Ensure other fields exist
        classData.modeOfTeaching = classData?.modeOfTeaching || "";
        classData.Category = classData?.Category || [];
        classData.yearEstablished = classData?.yearEstablished || 0;
        classData.className = classData?.className || "";
        classData.ownerOrInstituteName =
          classData?.ownerOrInstituteName || "";
        classData.franchiseOrIndependent =
          classData?.franchiseOrIndependent || "";
        classData.contactDetails = classData?.contactDetails || "";
        classData.websiteURL =
          classData?.websiteURL || "";

        console.log("📌 Processed Class Data:", classData);
        setClassDetails(classData); // ✅ Update state

        // ✅ Update Formik with new data
        formik.setValues({
          ...formik.values,
          ...classData, // ✅ Merge class details into Formik values
        });
        
      } catch (error) {
        console.error("❌ Error fetching class details:", error);
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
      category: classDetails?.Category || "",
      subjectsOrCourses: classDetails?.subjectsOrCourses || [],
      modeOfTeaching: classDetails?.modeOfTeaching || "",
      teachingMedium: classDetails?.teachingMedium || [],
      yearEstablished: classDetails?.yearEstablished || "",
      franchiseOrIndependent: classDetails?.franchiseOrIndependent || "",
      contactDetails: classDetails?.contactDetails || "",
      websiteURL: classDetails?.websiteURL || "",
      address: classDetails?.address
        ? { ...classDetails.address }
        : { line1: "", line2: "", pincode: "", state: "", dist: "" },
      info: classDetails?.info ? { ...classDetails.info } : { description: "" },
    },

    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("📌 Formatted Data to be sent:", values);

        // ✅ Send API request
        const response = await axios.put(
          `${API_BASE_URL}/api/class/update/${classId}`,
          values,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("📌 Update Response:", response.data);
        alert("✅ Class updated successfully!");
      } catch (error) {
        console.error("❌ Error updating class:", error);
        alert("❌ Failed to update class.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.address && formik.values.info) {
      console.log("📌 Final Formik Address Data:", formik.values.address);
      console.log("📌 Final Formik Info Data:", formik.values.info);
    } else {
      console.warn("⚠️ Address & Info fields are not populated yet!");
    }
  }, [formik.values]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 md:p-8">

      {/* ✅ Sidebar */}
      {/* <ClassVendorSideMenu /> */}

      {/* ✅ Main Content */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-5xl bg-white shadow-2xl p-6 md:p-12 border border-blue-500 rounded-lg">
          {/* ✅ Form Title */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-3xl shadow-md text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Update Class Details
            </h2>
          </div>

          {/* ✅ Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 mt-6"
          >
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
                label="Address"
                type="text"
                name="address.line1"
                formik={formik}
              />

              <InputField
                label="Pincode"
                type="text"
                name="address.pincode"
                formik={formik}
              />

              <InputField
                label="State"
                type="text"
                name="address.state"
                formik={formik}
              />
              <InputField
                label="District"
                type="text"
                name="address.dist"
                formik={formik}
              />

              {/* <SelectField
                label="Select State"
                name="address.state"
                options={Object.keys(stateDistricts)}
                formik={formik}
                onChange={(e) => {
                  const selectedState = e.target.value;
                  formik.setFieldValue("address.state", selectedState);
                  formik.setFieldValue("address.dist", ""); // ✅ Reset district when state changes
                }}
              />
              <SelectField
                label="Select District"
                name="address.dist"
                options={
                  formik.values.address.state
                    ? stateDistricts[formik.values.address.state]
                    : []
                }
                formik={formik}
                disabled={!formik.values.address.state} // ✅ Disable until state is selected
              /> */}

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

{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
              <MultiSelectDropdown
                label="Type of Class"
                name="typeOfClass"
                options={[
                  "8th",
                  "9th",
                  "10th",
                  "SSC",
                  "HSC",
                  "CBSE",
                  "ICSE",
                  "NDA",
                  "11th",
                  "12th",
                  "Hobbies Class",
                  "Home Coaching",
                  "Training Institute",
                  "Tutions",
                ]}
                formik={formik}
              />

              <MultiSelectDropdown
                label="Category"
                name="category"
                options={collegeCategories}
                formik={formik}
              />
              </div>
              {/* <TextAreaField
                label="Description"
                name="info.description"
                formik={formik}
              /> */}
              <div className="col-span-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  <MultiSelectField
                    label="Subjects or Courses"
                    name="subjectsOrCourses"
                    formik={formik}
                  />
                  <MultiSelectField
                    label="Teaching Medium"
                    name="teachingMedium"
                    formik={formik}
                  />
                  <MultiSelectField
                    label="Keywords"
                    name="keywords"
                    formik={formik}
                  />
                </div>
              {/* </div> */}

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
              <RadioGroup
                label="Franchise or Independent"
                name="franchiseOrIndependent"
                options={["Franchise", "Independent"]}
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
              {/* <FileUpload
                  label="College Image"
                  name="image"
                  formik={formik}
                /> */}

              {/* Multiple Image Upload (Gallery) */}
              {/* <FileUpload
                  label="Gallery Images"
                  name="gallery_image"
                  multiple
                  formik={formik}
                />
              </div> */}
              {/* Map & Search */}
              {/* <div className="mb-4 col-span-full">
                <h3 className="text-blue-700 flex items-center gap-2 font-medium">
                  <FaMapMarkerAlt /> Select Location
                </h3>
                <div className="flex gap-4 mb-4 justify-center">
                  <SearchBar onSearch={setPosition} />
                  <CurrentLocationButton onGetLocation={setPosition} />
                </div>
                <MapContainerComponent
                  position={position}
                  setPosition={(newPosition) => {
                    setPosition(newPosition);
                    formik.setFieldValue("location.lat", newPosition.lat); // ✅ Updates Formik
                    formik.setFieldValue("location.lng", newPosition.lng);
                  }}
                  setFieldValue={formik.setFieldValue}
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
  );
};

export default ManageClass;
