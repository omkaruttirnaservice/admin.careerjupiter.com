import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaTimes, FaUniversity } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

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
  // const [position, setPosition] = useState({ lat: 19.076, lng: 72.8777 });
  const [previewImage, setPreviewImage] = useState(null);

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
    const fetchClassDetails = async () => {
      if (!classId) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/class/${classId}`
        );
        console.log("📌 Full API Response:", response.data);

        let classData = response.data?.data?.class || {};

        // // ✅ Ensure Address Has All Required Fields
        // classData.address = [
        //   {
        //     line1: classData?.address?.line1 || "",
        //     line2: classData?.address?.line2 || "",
        //     pincode: classData?.address?.pincode || "",
        //     state: classData?.address?.state || "",
        //     dist: classData?.address?.dist || "",
        //     taluka: classData?.address?.taluka || "",
        //     nearbyLandmarks: classData?.address?.nearbyLandmarks || "",
        //     autorizedName: classData?.address?.autorizedName || "",
        //     autorizedPhono: classData?.address?.autorizedPhono || "",
        //   }
        // ];
        

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
        console.error( error.response?.data.errMessage || "❌ Error fetching class details:", error);
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
      image: classDetails?.image || null, // for single image
      // address: classDetails?.address && Array.isArray(classDetails.address)
      // ? classDetails.address
      // : [
      //     {
      //       line1: classDetails?.address?.line1 || "",
      //       line2: classDetails?.address?.line2 || "",
      //       pincode: classDetails?.address?.pincode || "",
      //       state: classDetails?.address?.state || "",
      //       dist: classDetails?.address?.dist || "",
      //       taluka: classDetails?.address?.taluka || "",
      //       nearbyLandmarks: classDetails?.address?.nearbyLandmarks || "",
      //       autorizedName: classDetails?.address?.autorizedName || "",
      //       autorizedPhono: classDetails?.address?.autorizedPhono || "",
      //     }
      //   ],
    
      info: classDetails?.info ? { ...classDetails.info } : { description: "" },
    },

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
    
        for (const key in values) {
          if (key === "image" && values[key] instanceof File) {
            formData.append("image", values[key]);
          } else if (
        
            key === "Category" ||
           
            key === "modeOfTeaching" ||
          
            key === "keywords"
          ) {
            formData.append(key, JSON.stringify(values[key]));
          } else if (typeof values[key] === "object") {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        }
    
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
    }
    
    

    // onSubmit: async (values, { setSubmitting }) => {
    //   try {
    //     const formData = new FormData();
    
    //     // ✅ Check if image is a File and append it
    //     if (values.image instanceof File) {
    //       formData.append("image", values.image);
    //     }
    
    //     const response = await axios.put(
    //       `${API_BASE_URL}/api/class/update/${classId}`,
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    
    //     console.log("📌 Update Response:", response.data);
    //     alert("✅ Class updated successfully!");
    //   } catch (error) {
    //     console.error("❌ Error updating class:", error);
    //     alert(
    //       error.response?.data?.usrMsg ||
    //         error.response?.data?.message ||
    //         error.response?.data?.errMessage ||
    //         "❌ Failed to update class."
    //     );
    //   } finally {
    //     setSubmitting(false);
    //   }
    // }
    
    
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

      {/* ✅ Sidebar */}
      {/* <ClassVendorSideMenu /> */}

      {/* ✅ Main Content */}
      <div className="flex-1 flex justify-center">
      <div className="flex flex-col md:flex-row min-h-screen md:p-4 relative bg-gradient-to-br from-blue-100 to-blue-300 overflow-hidden">
  {/* Background Icons - Random Placement */}
  {Array.from({ length: 15 }).map((_, index) => (
    <span
      key={index}
      className="absolute text-7xl opacity-19 select-none"
      style={{
        top: `${Math.random() * 100}%`, // Random Y Position
        left: `${Math.random() * 100}%`, // Random X Position
        transform: `rotate(${Math.random() * 360}deg)`, // Random Rotation
      }}
    >
      {["📚", "✏️", "📝", "🎓", "🔬", "📖", "🖥️", "⚛️"][Math.floor(Math.random() * 8)]}
    </span>
  ))}
        <div className="w-full max-w-5xl bg-white shadow-2xl p-2 lg:p-6 md:p-12 border border-blue-500">
          {/* ✅ Form Title */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6  shadow-md text-center">
            <h2 className="text-2xl md:text-4xl font-bold">
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
                label="Category"
                name="category"
                options={classCategories}
                formik={formik}
              />
              </div>
              
              <div className="col-span-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                
                  {/* <MultiSelectField
                    label="Keywords"
                    name="keywords"
                    formik={formik}
                  /> */}
                </div>
              {/* </div> */}

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
  <h3 className="text-lg font-bold text-gray-800">Class Image</h3>

  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-4">
    {previewImage || formik.values.image ? (
      <img
        src={
          previewImage
            ? previewImage
            : typeof formik.values.image === "string"
            ? `${API_BASE_URL}${formik.values.image}` // Assuming image path is relative like "/class/class_123.jpg"
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
  <input
    type="file"
    accept="image/*"
    onChange={(event) => {
      const file = event.currentTarget.files[0];
      if (file) {
        formik.setFieldValue("image", file);
        setPreviewImage(URL.createObjectURL(file)); // 💡 Temporary preview
      }
    }}
    className="mt-4 block w-full"
  />

  {formik.touched.image && formik.errors.image && (
    <div className="text-red-500 text-sm">{formik.errors.image}</div>
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
    </div>
  );
};

export default ManageClass;
