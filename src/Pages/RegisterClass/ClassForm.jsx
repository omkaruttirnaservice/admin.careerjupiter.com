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

  const classCategories = [
    "SSC",
    "HSC",
    "Diploma",
    "Pharmacy",
    "Engineering",
    "Under Graduate",
    "Post Graduate",
  ];

  const typeOfClass = [
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
      address: Yup.object().shape({
        line1: Yup.string().required("Address Line 1 is required"),
        pincode: Yup.string()
          .matches(/^[0-9]{6}$/, "Enter a valid 6-digit pincode")
          .required("Pincode is required"),
        state: Yup.string().required("State is required"),
        dist: Yup.string().required("District is required"),
      }),
      contactDetails: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10-digit contact number")
        .required("Contact Details are required"),

      // websiteURL: Yup.string().url("Enter a valid website URL").nullable(),
      websiteURL: Yup.string()
      .matches(
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter a valid website URL"
      )
      .nullable(),

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
        .max(2, "You can upload up to 2 images only")
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
      typeOfClass: Yup.array()
        .of(Yup.string().oneOf(typeOfClass, "Invalid selection"))
        .min(1, "At least one class type must be selected")
        .required("Type of class is required"),
      Category: Yup.array()
        .of(Yup.string().oneOf(classCategories, "Invalid category selected"))
        .min(1, "At least one category must be selected")
        .required("Category is required"),
        modeOfTeaching: Yup.array()
        .min(1, "Please select at least one mode of teaching") // At least one option must be selected
        .required("Mode of teaching is required"),
      teachingMedium: Yup.array()
        .of(
          Yup.string().min(
            1,
            "Each teaching medium must have at least 1 character"
          )
        )
        .min(1, "At least one teaching medium is required")
        // .max(5, "You can add up to 5 teaching mediums only")
        .required("Teaching medium is required"),

      subjectsOrCourses: Yup.array()
        .of(
          Yup.string().min(
            1,
            "Each subject or course must have at least 1 character"
          )
        )
        .min(1, "At least one subject or course is required")
        // .max(20, "You can add up to 20 subjects or courses only")
        .required("Subjects or courses are required"),
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
        formData.append("address[line1]", values.address?.line1);
        formData.append("address[line2]", values.address?.line2);
        formData.append("address[pincode]", values.address?.pincode);
        formData.append("address[state]", values.address?.state);
        formData.append("address[dist]", values.address?.dist);

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
        formData.append("ownerOrInstituteName", formattedData.ownerOrInstituteName);
        formData.append("websiteURL", formattedData.websiteURL);
        formData.append("yearEstablished", formattedData.yearEstablished);


        formattedData.Category.forEach((cat) => {
          formData.append("Category", cat);
        });

        // formData.append("subjectsOrCourses", JSON.stringify(formattedData.subjectsOrCourses || []));
        formattedData.modeOfTeaching.forEach((mode) => {
          formData.append("modeOfTeaching", mode);
        });

        formattedData.typeOfClass.forEach((type) => {
          formData.append("typeOfClass", type);
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

        // Append subjectsOrCourses one by one
        formattedData.subjectsOrCourses.forEach((subject) => {
          formData.append("subjectsOrCourses", subject);
        });

        // Append teachingMedium one by one
        formattedData.teachingMedium.forEach((medium) => {
          formData.append("teachingMedium", medium);
        });
        // ✅ Append formatted data correctly to FormData
        // Object.keys(formattedData).forEach((key) => {
        //   if (key === "image" && formattedData.image) {
        //     formData.append("image", formattedData.image);
        //     // } else if (
        //     //   key === "imageGallery" &&
        //     //   formattedData.imageGallery.length > 0
        //     // ) {
        //     //   formattedData.imageGallery.forEach((file) => {
        //     //     formData.append("imageGallery", file);
        //     //   });
        //   } else if (
        //     typeof formattedData[key] === "object" &&
        //     !Array.isArray(formattedData[key])
        //   ) {
        //     formData.append(key, JSON.stringify(formattedData[key])); // ✅ Convert objects to JSON
        //   } else if (!Array.isArray(formattedData[key])) {
        //     formData.append(key, formattedData[key]);
        //   }
        // });

        console.log(
          "📌**************************************Final FormData Sent:",
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
        // const classId = response.data?.data?.class?._id;
        // if (!classId) throw new Error("❌ Class ID missing in API response");

        // // ✅ Store Class ID in Cookies
        // Cookies.set("classId", classId, { expires: 1 / 24 });

        // // ✅ Vendor Signup API
        // const authResponse = await axios.post(
        //   `${API_BASE_URL}/api/auth/signup?role=VENDOR&subrole=Class`,
        //   {
        //     mobile_no: values.contactDetails,
        //     otp: values.otp, // ✅ Now sending OTP
        //     reference_id: values.reference_id, // ✅ Now sending Reference ID
        //   }
        // );

        // console.log("📌 Auth Response:", authResponse.data);

        // if (authResponse.data.success) {
        //   setAuthCookies({
        //     token: authResponse.data.data.token,
        //     role: authResponse.data.data.role,
        //     subrole: authResponse.data.data.subrole,
        //     userId: authResponse.data.data.userId,
        //     classId,
        //   });

        //   alert("✅ Registration Successful! Redirecting...");
        //   resetForm();
        //   console.log("Navigating to Vendor Dashboard");
        //   navigate("/vendor-class/class-dashboard");
        // } else {
        //   console.error("❌ Signup failed:", authResponse.data);
        //   alert("❌ Signup failed! Try again.");
        // }

        // ✅ Extract Class ID
  const classId = response.data?.data?.class?._id;
  if (!classId) {
    throw new Error("❌ Class ID missing in API response");
  }

  // ✅ Store Class ID in Cookies
  Cookies.set("classId", classId, { expires: 1 / 24 });

  // ✅ Show Success Message & Redirect to Vendor Dashboard
  alert("✅ Class Created Successfully! Redirecting...");
  resetForm();
  console.log("Navigating to Vendor Dashboard");
  navigate("/vendor-class/class-dashboard");
      } catch (error) {
        console.error(
          "❌ Error submitting form:",
          error.response?.data || error.message
        );
        alert(
          error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            "❌ Error submitting form. Try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 background-image">
    <div className="min-h-screen flex items-center justify-center relative bg-[url('https://wallpapers.com/images/hd/virtual-classroom-background-xl1p59ku6y834y02.jpg')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-opacity-50 bg-black/50 backdrop-blur-sm"></div>

      <div className="w-full max-w-4xl bg-white shadow-lg p-3 border border-blue-500 lg:my-4 sm:my-2 sm:p-6 lg:p-6 relative z-10">
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
              type="text"
              name="websiteURL"
              formik={formik}
            />

            <MultiSelectDropdown
              label="Type of Class"
              name="typeOfClass"
              options={typeOfClass}
              formik={formik}
            />

            <MultiSelectDropdown
              label="Category"
              name="Category"
              options={classCategories}
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

            {/* Map & Search */}
            <div className="mt-4 col-span-full">
              <MapComponent formik={formik} />
            </div>

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
    </div>
  );
};

export default ClassForm;
