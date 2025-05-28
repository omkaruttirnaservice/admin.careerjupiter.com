

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUniversity, fetchUniversityCategories } from "./universityapi";
import UniversityForm from "./universityform";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { FaArrowLeft } from "react-icons/fa";

// Default state options
const defaultStateOptions = [
 
];


const AddUniversity = () => {
  const navigate = useNavigate();
  const [filteredBranches, setFilteredBranches] = useState([]);
  

  const { data: categoryData = { categories: [] } } = useQuery({
    queryKey: ["universityCategories"],
    queryFn: fetchUniversityCategories,
    staleTime: 5 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "University created successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        // Store university ID in cookies if needed
        if (data?.data?.university?._id) {
          Cookies.set("universityID", data.data.university._id, { expires: 1 });
        }

        // Reset form
        formik.resetForm();

        // Navigate to university details
        navigate("/university-details");
      });
    },
    onError: (error) => {
      console.error("ERROR:", error);
      Swal.fire({
        icon: "error",
        title: "Creation Failed",
        text:
          error?.response?.data?.usrMsg ||
          error?.message ||
          "Failed to create university",
        confirmButtonColor: "#d33",
      });
    },
  });

  const validationSchema = Yup.object({
    // universityName: Yup.string().required("University Name is required"),
  universityId: Yup.string().required("University ID is required"), // Add this line
    // category: Yup.string().required("Category is required"),
    // subCategory: Yup.array().min(1, "At least one sub-category is required"),
    // contactDetails: Yup.string()
    //   .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
    //   .required("Contact Details are required"),
    // email_id: Yup.string().email("Invalid email").required("Email is required"),
    // "address.line1": Yup.string().required("Address Line 1 is required"),
    // "address.pincode": Yup.string().required("Pincode is required"),
    // "address.state": Yup.string().required("State is required"),
    // "address.dist": Yup.string().required("District is required"),
    // "address.autorizedName": Yup.string().required("Authorized Person Name is required"),
    // "address.autorizedPhono": Yup.string().required("Authorized Person Phone is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
    // "info.description": Yup.string().required("Description is required"),
    // keywords: Yup.array().min(1, "At least one keyword is required"),
    // image: Yup.mixed().required("University Image is required"),
  });

  const formik = useFormik({
    initialValues: {
       universityId: "", 
      universityName: "",
      category: "",
      subCategory: [],
      address: {
        line1: "",
        line2: "",
        pincode: "",
        state: "",
        dist: "",
        taluka: "",
        autorizedName: "",
        autorizedPhono: "",
        nearbyLandmarks: "",
      },
      contactDetails: "",
      password: "",
      confirmPassword: "",
      email_id: "",
      isEmailVerified: false,
      isVerified: false,
      info: {
        description: "",
      },
      keywords: [],
      image: null,
      imageGallery: [],
      websiteURL: "",
      establishedYear: "",
      accreditation: [],
      facilities: [],
      admissionProcess: [],
      entrance_exam_required: [],
      applicationFormURL: "",
      admissionEntranceDetails: {
        admissionStartDate: "",
        admissionEndDate: "",
        lastYearCutoffMarks: "",
        scholarshipsAvailable: [],
        quotaSystem: [],
      },
      isHidden: true,
      role: "VENDOR",
      subrole: "university",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submission started with values:", values);
        const { confirmPassword, ...filteredValues } = values;


      const formData = new FormData();

      // Append all form fields to formData exactly matching the API response structure
      formData.append("universityId", values.universityId);
      formData.append("universityName", values.universityName);
      formData.append("category", values.category);

      // Arrays
      if (values.subCategory && values.subCategory.length > 0) {
        values.subCategory.forEach((item, index) => {
          formData.append(`subCategory[${index}]`, item);
        });
      }

      // Address object
      formData.append("address[line1]", values.address.line1);
      formData.append("address[line2]", values.address.line2);
      formData.append("address[pincode]", values.address.pincode);
      formData.append("address[state]", values.address.state);
      formData.append("address[dist]", values.address.dist);
      formData.append("address[taluka]", values.address.taluka);
      formData.append("address[autorizedName]", values.address.autorizedName);
      formData.append("address[autorizedPhono]", values.address.autorizedPhono);
      formData.append(
        "address[nearbyLandmarks]",
        values.address.nearbyLandmarks
      );

      // Basic fields
      formData.append("contactDetails", values.contactDetails);
      formData.append("password", filteredValues.password);
      formData.append("email_id", values.email_id);
      formData.append("info[description]", values.info.description);
      formData.append("websiteURL", values.websiteURL);
      formData.append("establishedYear", values.establishedYear);
      formData.append("applicationFormURL", values.applicationFormURL);
      formData.append("isHidden", values.isHidden);
      formData.append("role", values.role);
      formData.append("subrole", values.subrole);

      // Arrays
      if (values.keywords && values.keywords.length > 0) {
        values.keywords.forEach((item, index) => {
          formData.append(`keywords[${index}]`, item);
        });
      }

      if (values.accreditation && values.accreditation.length > 0) {
        values.accreditation.forEach((item, index) => {
          formData.append(`accreditation[${index}]`, item);
        });
      }

      if (values.facilities && values.facilities.length > 0) {
        values.facilities.forEach((item, index) => {
          formData.append(`facilities[${index}]`, item);
        });
      }

      if (values.admissionProcess && values.admissionProcess.length > 0) {
        values.admissionProcess.forEach((item, index) => {
          formData.append(`admissionProcess[${index}]`, item);
        });
      }

      if (
        values.entrance_exam_required &&
        values.entrance_exam_required.length > 0
      ) {
        values.entrance_exam_required.forEach((item, index) => {
          formData.append(`entrance_exam_required[${index}]`, item);
        });
      }

      // Admission entrance details
      formData.append(
        "admissionEntranceDetails[admissionStartDate]",
        values.admissionEntranceDetails.admissionStartDate
      );
      formData.append(
        "admissionEntranceDetails[admissionEndDate]",
        values.admissionEntranceDetails.admissionEndDate
      );
      formData.append(
        "admissionEntranceDetails[lastYearCutoffMarks]",
        values.admissionEntranceDetails.lastYearCutoffMarks
      );

      if (
        values.admissionEntranceDetails.scholarshipsAvailable &&
        values.admissionEntranceDetails.scholarshipsAvailable.length > 0
      ) {
        values.admissionEntranceDetails.scholarshipsAvailable.forEach(
          (item, index) => {
            formData.append(
              `admissionEntranceDetails[scholarshipsAvailable][${index}]`,
              item
            );
          }
        );
      }

      if (
        values.admissionEntranceDetails.quotaSystem &&
        values.admissionEntranceDetails.quotaSystem.length > 0
      ) {
        values.admissionEntranceDetails.quotaSystem.forEach((item, index) => {
          formData.append(
            `admissionEntranceDetails[quotaSystem][${index}]`,
            item
          );
        });
      }

      // Image files
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      if (values.imageGallery && values.imageGallery.length > 0) {
        values.imageGallery.forEach((file) => {
          if (file instanceof File) {
            formData.append("imageGallery", file);
          }
        });
      }

      console.log("FormData prepared, calling mutation...");

      // Log all FormData entries for debugging
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Call the mutation with the FormData
      mutation.mutate(formData);
    },
  });

//   useEffect(() => {
//   const selectedCategory = formik.values.category;
//   if (Array.isArray(categoryData?.categories)) {
//     const match = categoryData.categories.find(
//       (item) => item.category === selectedCategory
//     );
//     setFilteredBranches(match ? match.subCategory : []);
//   } else {
//     setFilteredBranches([]);
//   }
// }, [formik.values.category, categoryData]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
    }
  };

  const handleImageGalleryChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      formik.setFieldValue("imageGallery", [
        ...formik.values.imageGallery,
        ...files,
      ]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft /> Back to Login
        </button>
      </div>

      <UniversityForm
        formik={formik}
        isSubmitting={mutation.isPending}
        handleImageChange={handleImageChange}
        handleImageGalleryChange={handleImageGalleryChange}
       
        submitButtonText="Create University"
        // stateOptions={stateOptions}
        // districtOptions={districtOptions}
        
      />
     
    </div>
  );
};

export default AddUniversity;
