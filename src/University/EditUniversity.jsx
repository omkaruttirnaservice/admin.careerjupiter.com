// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useParams, useNavigate } from "react-router-dom";
// import { getUniversityById, updateUniversity } from "../api/University-api";
// import { toast } from "react-toastify";

// const EditUniversity = () => {
//   const { id } = useParams(); 
//   const navigate = useNavigate();
//   const [location, setLocation] = useState({ lat: 0, lan: 0 });
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [image, setImage] = useState(null);

//   const { data: universityData, isLoading } = useQuery({
//     queryKey: ["university", id],
//     queryFn: () => getUniversityById(id),
//     enabled: !!id, 
//   });

//   const mutation = useMutation({
//     mutationFn: (values) => updateUniversity(id, values),
//     onSuccess: () => {
//       toast.success("University updated successfully!");
//       navigate("/universities"); 
//     },
//     onError: (error) => {
//       toast.error(`Error: ${error.message}`);
//     },
//   });

//   const formik = useFormik({
//     initialValues: {
//       universityName: "",
//       Category: "",
//       lat: location.lat,
//       lan: location.lan,
//       address_line1: "",
//       address_line2: "",
//       pincode: "",
//       state: "Maharashtra",
//       dist: "Mumbai",
//       contactDetails: "",
//       info: "",
//       websiteURL: "",
//       establishedYear: "",
//       accreditation: "",
//       admissionProcess: "",
//       applicationFormURL: "",
//       email_id: "",
//       facilities: "",
//       keywords: [],
//       image: null,
//     },
//     validationSchema: Yup.object({
//       universityName: Yup.string().required("University Name is required"),
//       Category: Yup.string().required("University Category is required"),
//       lat: Yup.number().required("Latitude is required"),
//       lan: Yup.number().required("Longitude is required"),
//       contactDetails: Yup.string().matches(/^[0-9]{10}$/, "Invalid contact number").required(),
//       websiteURL: Yup.string().url("Invalid URL format").required(),
//       email_id: Yup.string().email("Invalid email format").required(),
//       image: Yup.mixed().nullable(),
//     }),
//     onSubmit: (values) => {
//       const formData = new FormData();
//       Object.keys(values).forEach((key) => {
//         if (key === "image" && values.image) {
//           formData.append("image", values.image);
//         } else {
//           formData.append(key, values[key]);
//         }
//       });
//       mutation.mutate(formData);
//     },
//   });

//   // Prefill form data when fetched
//   useEffect(() => {
//     if (universityData) {
//       formik.setValues(universityData);
//       setLocation({ lat: universityData.lat, lan: universityData.lan });
//       setGalleryImages(universityData.imageGallery || []);
//       setImage(universityData.image || null);
//     }
//   }, [universityData]);

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Edit University</h2>
//       <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
//         <div className="mb-4">
//           <label className="block text-sm font-medium">University Name</label>
//           <input
//             type="text"
//             name="universityName"
//             className="w-full p-2 border rounded"
//             onChange={formik.handleChange}
//             value={formik.values.universityName}
//           />
//           {formik.errors.universityName && <p className="text-red-500">{formik.errors.universityName}</p>}
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Category</label>
//           <input
//             type="text"
//             name="Category"
//             className="w-full p-2 border rounded"
//             onChange={formik.handleChange}
//             value={formik.values.Category}
//           />
//           {formik.errors.Category && <p className="text-red-500">{formik.errors.Category}</p>}
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium">University Image</label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             className="w-full p-2 border rounded"
//             onChange={(event) => {
//               formik.setFieldValue("image", event.currentTarget.files[0]);
//             }}
//           />
//           {image && <img src={image} alt="University" className="mt-2 w-32 h-32 object-cover" />}
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Update University</button>
//       </form>
//     </div>
//   );
// };

// export default EditUniversity;


"use client"

import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaArrowLeft } from "react-icons/fa"
import { fetchUniversityById, updateUniversity, fetchUniversityCategories } from "./Universityapi"
import UniversityForm from "./Universityfrom"

const EditUniversity = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [filteredBranches, setFilteredBranches] = useState([])
  const [imagePreview, setImagePreview] = useState(null)

  // Fetch university data
  const { data: universityData, isLoading: isLoadingUniversity } = useQuery({
    queryKey: ["university", id],
    queryFn: () => fetchUniversityById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Fetch categories
  const { data: categoryData = { categories: [] } } = useQuery({
    queryKey: ["universityCategories"],
    queryFn: fetchUniversityCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Update university mutation
  const mutation = useMutation({
    mutationFn: (values) => updateUniversity(id, values),
    onSuccess: () => {
      toast.success("University updated successfully!")
      navigate("/universities")
    },
    onError: (error) => {
      toast.error(`Error: ${error.message || "Failed to update university"}`)
    },
  })

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      universityName: "",
      universityID: "",
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
      email_id: "",
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
    },
    validationSchema: Yup.object({
      universityName: Yup.string().required("University Name is required"),
      email_id: Yup.string().email("Invalid email format").required("Email is required"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values)
    },
  })

  // Set form values when university data is loaded
  useEffect(() => {
    if (universityData && universityData.university) {
      const university = universityData.university

      // Convert string arrays to arrays if they're strings
      const processArrayField = (field) => {
        if (typeof field === "string") {
          return field.split(",").map((item) => item.trim())
        }
        return field || []
      }

      formik.setValues({
        universityName: university.universityName || "",
        universityID: university.universityID || "",
        category: university.category || "",
        subCategory: processArrayField(university.subCategory),
        address: {
          line1: university.address?.line1 || "",
          line2: university.address?.line2 || "",
          pincode: university.address?.pincode || "",
          state: university.address?.state || "",
          dist: university.address?.dist || "",
          taluka: university.address?.taluka || "",
          autorizedName: university.address?.autorizedName || "",
          autorizedPhono: university.address?.autorizedPhono || "",
          nearbyLandmarks: university.address?.nearbyLandmarks || "",
        },
        contactDetails: university.contactDetails || "",
        password: university.password || "",
        email_id: university.email_id || "",
        info: {
          description: university.info?.description || "",
        },
        keywords: processArrayField(university.keywords),
        image: university.image || null,
        imageGallery: university.imageGallery || [],
        websiteURL: university.websiteURL || "",
        establishedYear: university.establishedYear || "",
        accreditation: processArrayField(university.accreditation),
        facilities: processArrayField(university.facilities),
        admissionProcess: processArrayField(university.admissionProcess),
        entrance_exam_required: processArrayField(university.entrance_exam_required),
        applicationFormURL: university.applicationFormURL || "",
        admissionEntranceDetails: {
          admissionStartDate: university.admissionEntranceDetails?.admissionStartDate
            ? new Date(university.admissionEntranceDetails.admissionStartDate).toISOString().split("T")[0]
            : "",
          admissionEndDate: university.admissionEntranceDetails?.admissionEndDate
            ? new Date(university.admissionEntranceDetails.admissionEndDate).toISOString().split("T")[0]
            : "",
          lastYearCutoffMarks: university.admissionEntranceDetails?.lastYearCutoffMarks || "",
          scholarshipsAvailable: processArrayField(university.admissionEntranceDetails?.scholarshipsAvailable),
          quotaSystem: processArrayField(university.admissionEntranceDetails?.quotaSystem),
        },
      })

      // Set image preview if available
      if (university.image) {
        setImagePreview(university.image)
      }
    }
  }, [universityData])

  // Update subcategories when category changes
  useEffect(() => {
    const selectedCategory = formik.values.category
    const match = categoryData.categories.find((item) => item.category === selectedCategory)
    setFilteredBranches(match ? match.subCategory : [])
  }, [formik.values.category, categoryData.categories])

  // Handle image change
  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      formik.setFieldValue("image", file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleImageGalleryChange = (event) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      formik.setFieldValue("imageGallery", [...formik.values.imageGallery, ...files])
    }
  }

  if (isLoadingUniversity) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/universities")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft /> Back to Universities
        </button>
      </div>

      <UniversityForm
        formik={formik}
        isSubmitting={mutation.isPending}
        handleImageChange={handleImageChange}
        handleImageGalleryChange={handleImageGalleryChange}
        categoryData={categoryData.categories}
        filteredBranches={filteredBranches}
        submitButtonText="Update University"
      />
    </div>
  )
}

export default EditUniversity
