// import { useState, useEffect } from "react"
// import { useFormik } from "formik"
// import { useMutation, useQuery } from "@tanstack/react-query"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"

// import { fetchUniversityCategories, createUniversity } from "./Universityapi"

// import UniversityForm from "./UniversityFrom"

// const AddUniversity = () => {
//   const [filteredBranches, setFilteredBranches] = useState([])

//   // Fetch categories using React Query
//   const { data: categoryData = { categories: [] }, isLoading: isCategoriesLoading } = useQuery({
//     queryKey: ["universityCategories"],
//     queryFn: fetchUniversityCategories,
//     staleTime: 5 * 60 * 1000,
//   })

//   const initialValues = {
//     universityName: "",
//     universityID: "",
//     category: "",
//     subCategory: [],
//     address: {
//       line1: "",
//       line2: "",
//       pincode: "",
//       state: "",
//       dist: "",
//       taluka: "",
//       autorizedName: "",
//       autorizedPhono: "",
//       nearbyLandmarks: "",
//     },
//     contactDetails: "",
//     password: "",
//     email_id: "",
//     info: {
//       description: "",
//     },
//     keywords: [],
//     image: null,
//     imageGallery: [],
//     websiteURL: "",
//     establishedYear: "",
//     accreditation: [],
//     facilities: [],
//     admissionProcess: [],
//     entrance_exam_required: [],
//     applicationFormURL: "",
//     admissionEntranceDetails: {
//       admissionStartDate: "",
//       admissionEndDate: "",
//       lastYearCutoffMarks: "",
//       scholarshipsAvailable: [],
//       quotaSystem: [],
//     },
//   }

//   // Create university mutation
//   const mutation = useMutation({
//     mutationFn: createUniversity,
//     onSuccess: (data) => {
//       toast.success("University Created Successfully")
//       console.log("API Response:", data)
//       formik.resetForm()
//       // Reset file inputs
//       document.getElementById("universityImage").value = ""
//       document.getElementById("galleryImages").value = ""
//     },
//     onError: (error) => {
//       console.error("API Error:", error.response?.data || error.message)
//       toast.error(
//         `${error.response?.data?.message || error.message || error.response?.data?.errMsg || "Something went wrong"}`,
//       )
//     },
//   })

//   const formik = useFormik({
//     initialValues,
//     onSubmit: (values) => {
//       console.log("Form submitted:", values)
//       mutation.mutate(values)
//     },
//   })

//   // Update subcategories when category changes
//   useEffect(() => {
//     const selectedCategory = formik.values.category
//     const match = categoryData.categories.find((item) => item.category === selectedCategory)
//     setFilteredBranches(match ? match.subCategory : [])
//   }, [formik.values.category, categoryData.categories])

//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       console.log("Image selected:", file.name)
//       formik.setFieldValue("image", file)
//     }
//   }

//   const handleImageGalleryChange = (event) => {
//     const files = Array.from(event.target.files || [])
//     if (files.length > 0) {
//       console.log("Gallery images selected:", files.map((f) => f.name).join(", "))
//       formik.setFieldValue("imageGallery", [...formik.values.imageGallery, ...files])
//     }
//   }

//   return (
//     <UniversityForm
//       formik={formik}
//       isSubmitting={mutation.isPending}
//       handleImageChange={handleImageChange}
//       handleImageGalleryChange={handleImageGalleryChange}
//       categoryData={categoryData.categories}
//       filteredBranches={filteredBranches}
//     />
//   )
// }

// export default AddUniversity


"use client"

import { useState, useEffect } from "react"
import { useFormik } from "formik"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { fetchUniversityCategories, createUniversity } from "./Universityapi"

import UniversityForm from "./Universityfrom"

const AddUniversity = () => {
  const [filteredBranches, setFilteredBranches] = useState([])

  // Fetch categories using React Query
  const { data: categoryData = { categories: [] }, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["universityCategories"],
    queryFn: fetchUniversityCategories,
    staleTime: 5 * 60 * 1000,
  })

  const initialValues = {
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
  }

  // Create university mutation
  const mutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: (data) => {
      toast.success("University Created Successfully")
      console.log("API Response:", data)
      formik.resetForm()
      // Reset file inputs
      document.getElementById("universityImage").value = ""
      document.getElementById("galleryImages").value = ""
    },
    onError: (error) => {
      console.error("API Error:", error.response?.data || error.message)
      toast.error(
        `${error.response?.data?.message || error.message || error.response?.data?.errMsg || "Something went wrong"}`,
      )
    },
  })

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("Form submitted:", values)
      mutation.mutate(values)
    },
  })

  // Update subcategories when category changes
  useEffect(() => {
    const selectedCategory = formik.values.category
    const match = categoryData.categories.find((item) => item.category === selectedCategory)
    setFilteredBranches(match ? match.subCategory : [])
  }, [formik.values.category, categoryData.categories])

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("Image selected:", file.name)
      formik.setFieldValue("image", file)
    }
  }

  const handleImageGalleryChange = (event) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      console.log("Gallery images selected:", files.map((f) => f.name).join(", "))
      formik.setFieldValue("imageGallery", [...formik.values.imageGallery, ...files])
    }
  }

  return (
    <UniversityForm
      formik={formik}
      isSubmitting={mutation.isPending}
      handleImageChange={handleImageChange}
      handleImageGalleryChange={handleImageGalleryChange}
      categoryData={categoryData.categories}
      filteredBranches={filteredBranches}
    />
  )
}

export default AddUniversity