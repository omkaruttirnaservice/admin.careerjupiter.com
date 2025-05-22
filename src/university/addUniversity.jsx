import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { fetchUniversityCategories, createUniversity } from "./universityapi"
import UniversityForm from "./universityForm"

// State and district data for dropdowns
const stateDistrictData = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"],
  Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
}

const AddUniversity = () => {
  const [filteredBranches, setFilteredBranches] = useState([])
  const [districts, setDistricts] = useState([])

  // Fetch categories using React Query
  const { data: categoryData = { categories: [] }, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["universityCategories"],
    queryFn: fetchUniversityCategories,
    staleTime: 5 * 60 * 1000,
  })

  // Validation schema
  const validationSchema = Yup.object({
    universityName: Yup.string().required("University name is required"),
    universityID: Yup.string().required("University ID is required"),
    category: Yup.string().required("Category is required"),
    subCategory: Yup.array().min(1, "At least one sub-category is required"),
    address: Yup.object({
      line1: Yup.string().required("Address line 1 is required"),
      pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
        .required("Pincode is required"),
      state: Yup.string().required("State is required"),
      dist: Yup.string().required("District is required"),
      autorizedName: Yup.string().required("Authorized person name is required"),
      autorizedPhono: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Phone number must be 10 digits and start with 6-9")
        .required("Authorized person phone is required"),
    }),
    contactDetails: Yup.string().required("Contact details are required"),
    password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
    email_id: Yup.string().email("Invalid email format").required("Email is required"),
    info: Yup.object({
      description: Yup.string()
        .min(100, "Description must be at least 100 characters")
        .max(1000, "Description must not exceed 1000 characters")
        .required("Description is required"),
    }),
    keywords: Yup.array()
      .min(1, "At least one keyword is required")
      .max(5, "Maximum 5 keywords allowed")
      .required("At least one keyword is required"),
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
      toast.success("University Created Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      console.log("API Response:", data)

        // ✅ Extract university ID from API response
    const universityId = data?.data?.university?._id;
    console.log("University ID:", universityId);

    // ✅ Set universityID cookie using your helper
    setAuthCookies({ universityID: universityId });

      formik.resetForm()
      // Reset file inputs
      document.getElementById("universityImage").value = ""
      document.getElementById("galleryImages").value = ""
    },
    onError: (error) => {
      console.error("API Error:", error.response?.data || error.message)
      toast.error(
        `${error.response?.data?.message || error.message || error.response?.data?.errMsg || error.response?.data?.usrMsg || "Please Try Again"}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      )
    },
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
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

  // Update districts when state changes
  useEffect(() => {
    const selectedState = formik.values.address.state
    setDistricts(stateDistrictData[selectedState] || [])
    // Clear district if state changes
    if (formik.values.address.dist && !stateDistrictData[selectedState]?.includes(formik.values.address.dist)) {
      formik.setFieldValue("address.dist", "")
    }
  }, [formik.values.address.state])

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
      stateOptions={Object.keys(stateDistrictData)}
      districtOptions={districts}
    />
  )
}

export default AddUniversity
