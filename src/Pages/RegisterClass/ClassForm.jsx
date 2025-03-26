import React, { useState } from "react";
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

const ClassForm = ({ onClose }) => {
  const [position, setPosition] = useState({ lat: 19.076, lan: 72.8777 });

  const navigate = useNavigate();

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

  const formik = useFormik({
    initialValues: {
      className: "",
      ownerOrInstituteName: "Sample",
      typeOfClass: [],
      category: [],
      subjectsOrCourses: [],
      teachingMedium: [],
      modeOfTeaching: [],
      franchiseOrIndependent: "",
      yearEstablished: "",
      address: {
        line1: "",
        line2: "",
        pincode: "",
        state: "",
        dist: "",
      },
      contactDetails: "",
      info: { description: "" },
      websiteURL: "",
      image: null,
      imageGallery: [],
      location: [{ lat: position.lat, lan: position.lan }], // ✅ Store lat/lng
      keywords: [],
    },

    // validationSchema: Yup.object({
    //   className: Yup.string().required("Class Name is required"),
    //   ownerOrInstituteName: Yup.string().required(
    //     "Owner/Institute Name is required"
    //   ),
    //   typeOfClass: Yup.string().required("Select a class type"),
    //   category: Yup.string().required("Category is required"),
    //   subjectsOrCourses: Yup.array()
    //     .of(Yup.string().required("Subject is required"))
    //     .min(1, "At least one subject must be selected"),
    //   teachingMedium: Yup.array()
    //     .of(Yup.string().required("Teaching Medium is required"))
    //     .min(1, "Select at least one teaching medium"),
    //   // modeOfTeaching: Yup.array()
    //   //   .of(Yup.string().required("Mode of Teaching is required"))
    //   //   .min(1, "Select at least one mode of teaching"),
    //   franchiseOrIndependent: Yup.string().required("Select an option"),
    //   // yearEstablished: Yup.number()
    //   //   .required("Year Established is required")
    //   //   .min(1900, "Enter a valid year")
    //   //   .max(new Date().getFullYear(), "Year cannot be in the future"),
    //     address: Yup.object().shape({
    //   //     line1: Yup.string().required("Address Line 1 is required"),
    //       pincode: Yup.string()
    //         .matches(/^[0-9]{6}$/, "Enter a valid 6-digit pincode")
    //         .required("Pincode is required"),
    //       state: Yup.string().required("State is required"),
    //       dist: Yup.string().required("District is required"),
    //     }),
    //     contactDetails: Yup.string()
    //       .matches(/^[0-9]{10}$/, "Enter a valid 10-digit contact number")
    //       .required("Contact Details are required"),
    //   //   info: Yup.object().shape({
    //   //     description: Yup.string()
    //   //       .min(10, "Description must be at least 10 characters")
    //   //       .required("Description is required"),
    //   //   }),
    //   //   // websiteURL: Yup.string()
    //   //   //   .url("Enter a valid website URL")
    //   //   //   .nullable(),
    //   //   // image: Yup.mixed().required("Image is required"),
    //   //   // imageGallery: Yup.array()
    //   //   //   .of(Yup.mixed())
    //   //   //   .min(1, "At least one image must be uploaded"),
    //   //   // location: Yup.object().shape({
    //   //   //   lat: Yup.number()
    //   //   //     .required("Latitude is required")
    //   //   //     .min(-90, "Invalid latitude")
    //   //   //     .max(90, "Invalid latitude"),
    //   //   //   lan: Yup.number()
    //   //   //     .required("Longitude is required")
    //   //   //     .min(-180, "Invalid longitude")
    //   //   //     .max(180, "Invalid longitude"),
    //   //   // }),
    //   //   keywords: Yup.array()
    //   //     .of(Yup.string().required("Keyword is required"))
    //   //     .min(1, "At least one keyword must be added"),
    // }),

    //  onSubmit : async (values, { setSubmitting, resetForm }) => {
    //   try {
    //     const formData = new FormData();

    //     // Append form values
    //     Object.keys(values).forEach((key) => {
    //       if (key === "image" && values.image) {
    //         formData.append("image", values.image);
    //       } else if (key === "imageGallery" && values.imageGallery.length > 0) {
    //         values.imageGallery.forEach((file) => {
    //           formData.append("imageGallery", file);
    //         });
    //       } else if (Array.isArray(values[key])) {
    //         formData.append(key, JSON.stringify(values[key]));
    //       } else if (typeof values[key] === "object") {
    //         formData.append(key, JSON.stringify(values[key]));
    //       } else {
    //         formData.append(key, values[key]);
    //       }
    //     });

    //     // ✅ 1. Submit ClassForm Data
    //     const classResponse = await axios.post(`${API_BASE_URL}/api/class/create`, formData, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     });

    //     console.log("Class Created Successfully:", classResponse.data);

    //     // ✅ 2. Extract Class ID & Mobile No
    //     const classId = classResponse.data?.data?.class?._id;
    //     const mobile_no = values.contactDetails;
    //     console.log("Extracted Class ID:", classId);

    //     if (!classId) {
    //       throw new Error("Class ID is missing in API response");
    //     }

    //     // ✅ 3. Store Class ID in Cookies
    //     Cookies.set("classId", classId, { expires: 1 / 24 }); // ✅ Store classId in cookies
    //     console.log("Stored Class ID in cookies:", Cookies.get("classId"));

    //     // ✅ 3. Call Auth API for Vendor Signup
    //     const authResponse = await axios.post(`${API_BASE_URL}/api/auth/signup?role=VENDOR&subrole=Class`, {
    //       mobile_no,
    //     });

    //     console.log("Auth Response:", authResponse.data);

    //     // ✅ 4. Store in Cookies using `setAuthCookies`
    //     if (authResponse.data.success) {
    //       const { token, role, subrole, userId } = authResponse.data.data;

    //       Cookies.set("token", token, { expires: 1 / 24 });
    //       Cookies.set("role", role, { expires: 1 / 24 });
    //       Cookies.set("subrole", subrole, { expires: 1 / 24 });
    //       Cookies.set("userId", userId, { expires: 1 / 24 });
    //       console.log("Stored Class ID in cookies:", classId);

    //       console.log("Successfully");

    //       alert("Registration Successful! Redirecting to dashboard...");
    //       resetForm();

    //       // ✅ 5. Redirect to Dashboard
    //       window.location.href = "/vendor-class/class-dashboard";
    //     }
    //   } catch (error) {
    //     console.error("Error submitting form:", error.response?.data || error.message);
    //     alert("Error submitting form. Please try again.");
    //   } finally {
    //     setSubmitting(false);
    //   }
    // },

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();

        console.log("🚀 Original Form Values:", values); // ✅ Debugging

        // ✅ Properly format `address` and `info`
        const formattedData = {
          ...values,
          typeOfClass: Array.isArray(values.typeOfClass) ? values.typeOfClass : [],
          category: Array.isArray(values.category) ? values.category : [],
          yearEstablished: values.yearEstablished ? Number(values.yearEstablished) : "",
          
          address: {
            line1: values.address?.line1 || "",
            line2: values.address?.line2 || "",
            pincode: values.address?.pincode || "",
            state: values.address?.state || "",
            dist: values.address?.dist || "",
          },
          info: {
            description: values.info?.description || "",
          },
        };

        console.log("✅ Formatted Data Before Sending:", formattedData);

        formData.append("typeOfClass", JSON.stringify(formattedData.typeOfClass)); 
formData.append("category", JSON.stringify(formattedData.category)); 

        
        
        // ✅ Append formatted data correctly to FormData
        Object.keys(formattedData).forEach((key) => {
          if (key === "image" && formattedData.image) {
            formData.append("image", formattedData.image);
          } else if (
            key === "imageGallery" &&
            formattedData.imageGallery.length > 0
          ) {
            formattedData.imageGallery.forEach((file) => {
              formData.append("imageGallery", file);
            });
          } else if (typeof formattedData[key] === "object"  && !Array.isArray(formattedData[key])) {
            formData.append(key, JSON.stringify(formattedData[key])); // ✅ Convert objects to JSON
          } else if (!Array.isArray(formattedData[key])) {
            formData.append(key, formattedData[key]);
          }
        });

         
        console.log(
          "📌 Final FormData Sent:",
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

        console.log("📌 Class Created Successfully:", response.data);
        

        // ✅ Extract Class ID
        const classId = response.data?.data?.class?._id;
        if (!classId) throw new Error("❌ Class ID missing in API response");

        // ✅ Store Class ID in Cookies
        Cookies.set("classId", classId, { expires: 1 / 24 });

        // ✅ Vendor Signup API
        const authResponse = await axios.post(
          `${API_BASE_URL}/api/auth/signup?role=VENDOR&subrole=Class`,
          {
            mobile_no: values.contactDetails,
            otp: values.otp,               // ✅ Now sending OTP
            reference_id: values.reference_id, // ✅ Now sending Reference ID
          }
        );

        console.log("📌 Auth Response:", authResponse.data);

        if (authResponse.data.success) {
          setAuthCookies({
            token: authResponse.data.data.token,
            role: authResponse.data.data.role,
            subrole: authResponse.data.data.subrole,
            userId: authResponse.data.data.userId,
            classId,
          });

          alert("✅ Registration Successful! Redirecting...");
          resetForm();
          console.log("Navigating to Vendor Dashboard")
          navigate("/vendor-class/class-dashboard");
        } else {
          console.error("❌ Signup failed:", authResponse.data);
          alert("❌ Signup failed! Try again.");
        }
      } catch (error) {
        console.error(
          "❌ Error submitting form:",
          error.response?.data || error.message
        );
        alert("❌ Error submitting form. Try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl  p-10 relative border border-blue-500">
        {/* Form Title */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-3xl shadow-md">
          <h2 className="text-4xl font-bold flex items-center gap-4">
            <FaUniversity
              className="text-black bg-white p-3 rounded-full shadow-md"
              size={50}
            />
            Register Class
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            <SelectField
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
            />

            <ContactWithOTP formik={formik} />

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
            {/* <InputField label="Address Line 1" type="text" name="address.line1" formik={formik} />
          <InputField label="Pincode" type="text" name="address.pincode" formik={formik} /> */}
            {/* <CheckboxGroup label="Mode of Teaching" name="modeOfTeaching" options={["Online", "Offline", "Hybrid"]} formik={formik} /> */}
            <TextAreaField
              label="Description"
              name="info.description"
              formik={formik}
            />
            <div className="col-span-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
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
            </div>
            <RadioGroup
              label="Franchise or Independent"
              name="franchiseOrIndependent"
              options={["Franchise", "Independent"]}
              formik={formik}
            />
            <CheckboxGroup
              label="Mode of Teaching"
              name="modeOfTeaching"
              options={["Online", "Offline", "Hybrid"]}
              formik={formik}
            />
            <div className="grid grid-cols-2 space-x-3 col-span-full">
              {/* Single Image Upload */}
              <FileUpload label="College Image" name="image" formik={formik} />

              {/* Multiple Image Upload (Gallery) */}
              <FileUpload
                label="Gallery Images"
                name="gallery_image"
                multiple
                formik={formik}
              />
            </div>

            {/* Map & Search */}
            <div className="mb-4 col-span-full">
              <MapComponent formik={formik} />
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r  cursor-pointer from-indigo-600 to-blue-500 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassForm;
