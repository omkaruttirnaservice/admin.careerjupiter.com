import { useState, useEffect } from "react"
import { useFormik } from "formik"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { FaUniversity, FaTimes, FaSave } from "react-icons/fa"
import { fetchUniversityById, updateUniversity, fetchUniversityCategories } from "./universityapi"

// Constants
const facilities = ["Library", "Hostel", "Sport Complex", "WiFi Campus"]
const accreditationOptions = [
  "NAAC A++",
  "NAAC A+",
  "NAAC A",
  "NBA Accredited",
  "UGC Approved",
  "AICTE Approved",
  "ISO Certified",
  "NIRF Ranked",
]
const scholarshipAvailable = ["Merit-based", "Need-based", "Sports-based", "Other"]
const quotaSystem = ["Management", "SC/ST", "OBC", "General"]
const entranceExams = ["JEE", "NEET", "CAT", "GATE", "CLAT", "LSAT", "XAT", "CMAT", "MAT"]
const currentYear = new Date().getFullYear()
const establishedYears = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => 1980 + i)

const UpdateUniversityModal = ({ universityId, isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const [filteredBranches, setFilteredBranches] = useState([])
  const [imagePreview, setImagePreview] = useState(null)

  // Fetch university data
  const { data: universityData, isLoading: isLoadingUniversity } = useQuery({
    queryKey: ["university", universityId],
    queryFn: () => fetchUniversityById(universityId),
    enabled: !!universityId && isOpen,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Fetch categories
  const { data: categoryData = { categories: [] } } = useQuery({
    queryKey: ["universityCategories"],
    queryFn: fetchUniversityCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Update university mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateUniversity(id, data),
    onSuccess: () => {
      toast.success("University updated successfully")
      queryClient.invalidateQueries({ queryKey: ["universities"] })
      queryClient.invalidateQueries({ queryKey: ["university", universityId] })
      onClose()
    },
    onError: (error) => {
      toast.error(`Error updating university: ${error.message}`)
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
    onSubmit: (values) => {
      updateMutation.mutate({ id: universityId, data: values })
    },
    validate: (values) => {
      const errors = {}
      
      // Basic validation
      if (!values.universityName) {
        errors.universityName = "University name is required"
      }
      
      if (!values.email_id) {
        errors.email_id = "Email is required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_id)) {
        errors.email_id = "Invalid email address"
      }
      
      if (values.address.autorizedPhono && !/^\d{10}$/.test(values.address.autorizedPhono)) {
        errors.address = {
          ...errors.address,
          autorizedPhono: "Phone number must be 10 digits"
        }
      }
      
      if (values.info.description && values.info.description.split(/\s+/).length < 90) {
        errors.info = {
          ...errors.info,
          description: "Description should be at least 90 words"
        }
      }
      
      return errors
    }
  })

  // Set form values when university data is loaded
  useEffect(() => {
    if (universityData && universityData.university) {
      const university = universityData.university
      
      // Convert string arrays to arrays if they're strings
      const processArrayField = (field) => {
        if (typeof field === 'string') {
          return field.split(',').map(item => item.trim())
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
        image: null, // We don't set the file object, just keep the preview
        websiteURL: university.websiteURL || "",
        establishedYear: university.establishedYear || "",
        accreditation: processArrayField(university.accreditation),
        facilities: processArrayField(university.facilities),
        admissionProcess: processArrayField(university.admissionProcess),
        entrance_exam_required: processArrayField(university.entrance_exam_required),
        applicationFormURL: university.applicationFormURL || "",
        admissionEntranceDetails: {
          admissionStartDate: university.admissionEntranceDetails?.admissionStartDate ? 
            new Date(university.admissionEntranceDetails.admissionStartDate).toISOString().split('T')[0] : "",
          admissionEndDate: university.admissionEntranceDetails?.admissionEndDate ? 
            new Date(university.admissionEntranceDetails.admissionEndDate).toISOString().split('T')[0] : "",
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaUniversity /> Update University
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            disabled={updateMutation.isPending}
          >
            <FaTimes size={24} />
          </button>
        </div>

        {isLoadingUniversity ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* University Name */}
              <div className="mb-3">
                <label className="block mb-1">
                  University Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="universityName"
                  value={formik.values.universityName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-2 p-2 w-full rounded bg-white ${
                    formik.touched.universityName && formik.errors.universityName
                      ? "border-red-500"
                      : "border-blue-600"
                  }`}
                  placeholder="Enter university name"
                />
                {formik.touched.universityName && formik.errors.universityName && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.universityName}</div>
                )}
              </div>

              {/* University ID - Read Only */}
              <div className="mb-3">
                <label className="block mb-1">University ID</label>
                <input
                  type="text"
                  name="universityID"
                  value={formik.values.universityID}
                  readOnly
                  className="border-2 p-2 w-full rounded bg-gray-100 border-gray-400 cursor-not-allowed"
                />
                <small className="text-gray-500">University ID cannot be changed</small>
              </div>

              {/* University Category */}
              <div className="mb-3">
                <label className="block mb-1">University Category</label>
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                >
                  <option value="">Select University Category</option>
                  {categoryData.categories.map((cat, index) => (
                    <option key={index} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* University Sub Category */}
              <div className="mb-3">
                <label className="block mb-1">University Sub Category</label>
                <div className="border-2 rounded bg-white border-blue-600 p-2">
                  <select
                    multiple
                    name="subCategory"
                    value={formik.values.subCategory}
                    className="w-full border-0 focus:ring-0 focus:outline-none"
                    style={{ height: "100px" }}
                    onChange={(e) => {
                      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
                      formik.setFieldValue("subCategory", selectedValues)
                    }}
                  >
                    {filteredBranches.map((branch, index) => (
                      <option key={index} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
                <small className="text-gray-500">Hold Ctrl/Cmd to select multiple options</small>
              </div>

              {/* Address Line 1 */}
              <div className="mb-3">
                <label className="block mb-1">Address Line 1</label>
                <input
                  type="text"
                  name="address.line1"
                  value={formik.values.address.line1}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                />
              </div>

              {/* Address Line 2 */}
              <div className="mb-3">
                <label className="block mb-1">Address Line 2</label>
                <input
                  type="text"
                  name="address.line2"
                  value={formik.values.address.line2}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                />
              </div>

              {/* Pincode */}
              <div className="mb-3">
                <label className="block mb-1">Pincode</label>
                <input
                  type="text"
                  name="address.pincode"
                  value={formik.values.address.pincode}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                />
              </div>

              {/* State */}
              <div className="mb-3">
                <label className="block mb-1">State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formik.values.address.state}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                />
              </div>

              {/* District */}
              <div className="mb-3">
                <label className="block mb-1">District</label>
                <input
                  type="text"
                  name="address.dist"
                  value={formik.values.address.dist}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                />
              </div>

              {/* Taluka */}
              <div className="mb-3">
                <label className="block mb-1">Taluka</label>
                <input
                  type="text"
                  name="address.taluka"
                  value={formik.values.address.taluka}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                />
              </div>

              {/* Authorized Person Name */}
              <div className="mb-3">
                <label className="block mb-1">Authorized Person Name</label>
                <input
                  type="text"
                  name="address.autorizedName"
                  value={formik.values.address.autorizedName}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                />
              </div>

              {/* Authorized Person Phone */}
              <div className="mb-3">
                <label className="block mb-1">Authorized Person Phone</label>
                <input
                  type="text"
                  name="address.autorizedPhono"
                  value={formik.values.address.autorizedPhono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-2 p-2 w-full rounded bg-white ${
                    formik.touched.address?.autorizedPhono && formik.errors.address?.autorizedPhono
                      ? "border-red-500"
                      : "border-blue-600"
                  }`}
                />
                {formik.touched.address?.autorizedPhono && formik.errors.address?.autorizedPhono && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.address.autorizedPhono}</div>
                )}
              </div>

              {/* Nearby Landmarks */}
              <div className="mb-3">
                <label className="block mb-1">Nearby Landmarks</label>
                <input
                  type="text"
                  name="address.nearbyLandmarks"
                  value={formik.values.address.nearbyLandmarks}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="block mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email_id"
                  value={formik.values.email_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-2 p-2 w-full rounded bg-white ${
                    formik.touched.email_id && formik.errors.email_id
                      ? "border-red-500"
                      : "border-blue-600"
                  }`}
                  placeholder="Enter Email Id"
                />
                {formik.touched.email_id && formik.errors.email_id && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email_id}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3 md:col-span-2">
                <label className="block mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="info.description"
                  value={formik.values.info.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border-2 p-2 w-full rounded bg-white ${
                    formik.touched.info?.description && formik.errors.info?.description
                      ? "border-red-500"
                      : "border-blue-600"
                  }`}
                  rows={4}
                ></textarea>
                {formik.touched.info?.description && formik.errors.info?.description && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.info.description}</div>
                )}
                <small className="text-gray-500">Minimum 90 words required</small>
              </div>

              {/* Keywords */}
              <div className="mb-3">
                <label className="block mb-1">Keywords (Max 5)</label>
                <input
                  type="text"
                  name="keywords"
                  value={formik.values.keywords.join(", ")}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                  placeholder="Enter keywords separated by commas"
                  onChange={(e) => {
                    const keywords = e.target.value
                      .split(",")
                      .map((k) => k.trim())
                      .filter(Boolean)
                    formik.setFieldValue("keywords", keywords.slice(0, 5))
                  }}
                />
              </div>

              {/* Website URL */}
              <div className="mb-3">
                <label className="block mb-1">Website URL</label>
                <input
                  type="text"
                  name="websiteURL"
                  value={formik.values.websiteURL}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                  placeholder="Enter Website URL"
                />
              </div>

              {/* Established Year */}
              <div className="mb-3">
                <label className="block mb-1">Established Year</label>
                <select
                  name="establishedYear"
                  value={formik.values.establishedYear}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                >
                  <option value="">Select Year</option>
                  {establishedYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Accreditation */}
              <div className="mb-3">
                <label className="block mb-1">Accreditation</label>
                <div className="border-2 rounded bg-white border-blue-600 p-2">
                  <select
                    multiple
                    name="accreditation"
                    value={formik.values.accreditation}
                    className="w-full border-0 focus:ring-0 focus:outline-none"
                    style={{ height: "100px" }}
                    onChange={(e) => {
                      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
                      formik.setFieldValue("accreditation", selectedValues)
                    }}
                  >
                    {accreditationOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <small className="text-gray-500">Hold Ctrl/Cmd to select multiple options</small>
              </div>

              {/* Facilities */}
              <div className="mb-3">
                <label className="block mb-1">Facilities</label>
                <div className="border-2 rounded bg-white border-blue-600 p-2">
                  <select
                    multiple
                    name="facilities"
                    value={formik.values.facilities}
                    className="w-full border-0 focus:ring-0 focus:outline-none"
                    style={{ height: "100px" }}
                    onChange={(e) => {
                      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
                      formik.setFieldValue("facilities", selectedValues)
                    }}
                  >
                    {facilities.map((facility, index) => (
                      <option key={index} value={facility}>
                        {facility}
                      </option>
                    ))}
                  </select>
                </div>
                <small className="text-gray-500">Hold Ctrl/Cmd to select multiple options</small>
              </div>

              {/* Admission Process */}
              <div className="mb-3">
                <label className="block mb-1">Admission Process</label>
                <div className="border-2 rounded bg-white border-blue-600 p-2">
                  <select
                    multiple
                    name="admissionProcess"
                    value={formik.values.admissionProcess}
                    className="w-full border-0 focus:ring-0 focus:outline-none"
                    style={{ height: "100px" }}
                    onChange={(e) => {
                      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
                      formik.setFieldValue("admissionProcess", selectedValues)
                    }}
                  >
                    <option value="Online Registration">Online Registration</option>
                    <option value="Counseling">Counseling</option>
                    <option value="Document Verification">Document Verification</option>
                    <option value="Entrance Exam">Entrance Exam</option>
                  </select>
                </div>
                <small className="text-gray-500">Hold Ctrl/Cmd to select multiple options</small>
              </div>

              {/* Entrance Exams Required */}
              <div className="mb-3">
                <label className="block mb-1">Entrance Exams Required</label>
                <div className="border-2 rounded bg-white border-blue-600 p-2">
                  <select
                    multiple
                    name="entrance_exam_required"
                    value={formik.values.entrance_exam_required}
                    className="w-full border-0 focus:ring-0 focus:outline-none"
                    style={{ height: "100px" }}
                    onChange={(e) => {
                      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
                      formik.setFieldValue("entrance_exam_required", selectedValues)
                    }}
                  >
                    {entranceExams.map((exam, index) => (
                      <option key={index} value={exam}>
                        {exam}
                      </option>
                    ))}
                  </select>
                </div>
                <small className="text-gray-500">Hold Ctrl/Cmd to select multiple options</small>
              </div>

              {/* Application Form URL */}
              <div className="mb-3">
                <label className="block mb-1">Application Form URL</label>
                <input
                  type="text"
                  name="applicationFormURL"
                  value={formik.values.applicationFormURL}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                  placeholder="Enter application form URL"
                />
              </div>

              {/* Admission Start/End Date */}
              <div className="mb-3">
                <label className="block mb-1">Admission Start Date</label>
                <input
                  type="date"
                  name="admissionEntranceDetails.admissionStartDate"
                  value={formik.values.admissionEntranceDetails.admissionStartDate}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                />
              </div>

              <div className="mb-3">
                <label className="block mb-1">Admission End Date</label>
                <input
                  type="date"
                  name="admissionEntranceDetails.admissionEndDate"
                  value={formik.values.admissionEntranceDetails.admissionEndDate}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                  onChange={formik.handleChange}
                />
              </div>

              {/* Last Year Cutoff Marks */}
              <div className="mb-3">
                <label className="block mb-1">Last Year Cutoff Marks</label>
                <input
                  type="number"
                  name="admissionEntranceDetails.lastYearCutoffMarks"
                  value={formik.values.admissionEntranceDetails.lastYearCutoffMarks}
                  onChange={formik.handleChange}
                  className="border-2 p-2 w-full rounded bg-white border-blue-600"
                />
              </div>

              {/* Scholarships Available */}
              <div className="mb-3">
                <label className="block mb-1">Scholarships Available</label>
                <div className="border-2 rounded bg-white border-blue-600 p-2">
                  <select
                    multiple
                    name="admissionEntranceDetails.scholarshipsAvailable"
                    value={formik.values.admissionEntranceDetails.scholarshipsAvailable || []}
                    className="w-full border-0 focus:ring-0 focus:outline-none"
                    style={{ height: "100px" }}
                    onChange={(e) => {
                      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
                      formik.setFieldValue("admissionEntranceDetails.scholarshipsAvailable", selectedValues)
                    }}
                  >
                    {scholarshipAvailable.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <small className="text-gray-500">Hold Ctrl/Cmd to select multiple options</small>
              </div>

              {/* Quota System */}
              <div className="mb-3">
                <label className="block mb-1">Quota System</label>
                <div className="border-2 rounded bg-white border-blue-600 p-2">
                  <select
                    multiple
                    name="admissionEntranceDetails.quotaSystem"
                    value={formik.values.admissionEntranceDetails.quotaSystem || []}
                    className="w-full border-0 focus:ring-0 focus:outline-none"
                    style={{ height: "100px" }}
                    onChange={(e) => {
                      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
                      formik.setFieldValue("admissionEntranceDetails.quotaSystem", selectedValues)
                    }}
                  >
                    {quotaSystem.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <small className="text-gray-500">Hold Ctrl/Cmd to select multiple options</small>
              </div>

              {/* University Image */}
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <label className="block font-medium mb-2">
                  University Image <span className="text-red-500">(Max: 100KB, JPG/JPEG/PNG)</span>
                </label>
                <div
                  className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition"
                  onClick={() => document.getElementById("universityImage")?.click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-contain rounded"
                    />
                  ) : (
                    <p className="text-gray-500">Drag & drop an image here or click to upload</p>
                  )}
                </div>
                <input
                  type="file"
                  id="universityImage"
                  accept="image/jpeg,image/jpg,image/png"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                disabled={updateMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default UpdateUniversityModal