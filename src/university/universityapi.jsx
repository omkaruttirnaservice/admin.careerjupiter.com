
import axios from "axios"
// import { API_BASE_URL } from "../constant/constantBaseUrl"
import { API_BASE_URL } from "../constant/constantBaseUrl"

/**
 * Fetch university categories
 * @returns {Promise<Object>} Categories data
 */
export const fetchUniversityCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/university/search/cat`)
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return { categories: [] }
  }
}

/**
 * Create a new university
 * @param {Object} universityData - University form data
 * @returns {Promise<Object>} API response
 */
export const createUniversity = async (universityData) => {
  // Create a FormData object to properly handle file uploads
  const formData = new FormData()

  // Add basic university data
  formData.append("universityName", universityData.universityName)
  formData.append("universityId", universityData.universityID)
  formData.append("category", universityData.category)

  // Add array data with proper formatting
  if (universityData.subCategory && universityData.subCategory.length > 0) {
    universityData.subCategory.forEach((item, index) => {
      formData.append(`subCategory[${index}]`, item)
    })
  }

  // Add nested address fields
  formData.append("address[line1]", universityData.address.line1)
  formData.append("address[line2]", universityData.address.line2)
  formData.append("address[pincode]", universityData.address.pincode)
  formData.append("address[state]", universityData.address.state)
  formData.append("address[dist]", universityData.address.dist)
  formData.append("address[taluka]", universityData.address.taluka)
  formData.append("address[autorizedName]", universityData.address.autorizedName)
  formData.append("address[autorizedPhono]", universityData.address.autorizedPhono)
  formData.append("address[nearbyLandmarks]", universityData.address.nearbyLandmarks)

  // Add other basic fields
  formData.append("contactDetails", universityData.contactDetails)
  formData.append("password", universityData.password)
  formData.append("email_id", universityData.email_id)
  formData.append("info[description]", universityData.info.description)
  formData.append("websiteURL", universityData.websiteURL)
  formData.append("establishedYear", universityData.establishedYear)
  formData.append("applicationFormURL", universityData.applicationFormURL)

  // Add array data
  if (universityData.keywords && universityData.keywords.length > 0) {
    universityData.keywords.forEach((item, index) => {
      formData.append(`keywords[${index}]`, item)
    })
  }

  if (universityData.accreditation && universityData.accreditation.length > 0) {
    universityData.accreditation.forEach((item, index) => {
      formData.append(`accreditation[${index}]`, item)
    })
  }

  if (universityData.facilities && universityData.facilities.length > 0) {
    universityData.facilities.forEach((item, index) => {
      formData.append(`facilities[${index}]`, item)
    })
  }

  if (universityData.admissionProcess && universityData.admissionProcess.length > 0) {
    universityData.admissionProcess.forEach((item, index) => {
      formData.append(`admissionProcess[${index}]`, item)
    })
  }

  if (universityData.entrance_exam_required && universityData.entrance_exam_required.length > 0) {
    universityData.entrance_exam_required.forEach((item, index) => {
      formData.append(`entrance_exam_required[${index}]`, item)
    })
  }

  // Add admission entrance details
  formData.append(
    "admissionEntranceDetails[admissionStartDate]",
    universityData.admissionEntranceDetails.admissionStartDate,
  )
  formData.append(
    "admissionEntranceDetails[admissionEndDate]",
    universityData.admissionEntranceDetails.admissionEndDate,
  )
  formData.append(
    "admissionEntranceDetails[lastYearCutoffMarks]",
    universityData.admissionEntranceDetails.lastYearCutoffMarks,
  )

  // Add array data for admission entrance details
  if (
    universityData.admissionEntranceDetails.scholarshipsAvailable &&
    universityData.admissionEntranceDetails.scholarshipsAvailable.length > 0
  ) {
    universityData.admissionEntranceDetails.scholarshipsAvailable.forEach((item, index) => {
      formData.append(`admissionEntranceDetails[scholarshipsAvailable][${index}]`, item)
    })
  }

  if (
    universityData.admissionEntranceDetails.quotaSystem &&
    universityData.admissionEntranceDetails.quotaSystem.length > 0
  ) {
    universityData.admissionEntranceDetails.quotaSystem.forEach((item, index) => {
      formData.append(`admissionEntranceDetails[quotaSystem][${index}]`, item)
    })
  }

  // Add image files
  if (universityData.image) {
    formData.append("image", universityData.image)
  }

  if (universityData.imageGallery && universityData.imageGallery.length > 0) {
    universityData.imageGallery.forEach((file) => {
      formData.append("imageGallery", file)
    })
  }

  // Send the request with proper headers for multipart/form-data
  const response = await axios.post(`${API_BASE_URL}/api/university/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}

/**
 * Fetch all universities
 * @returns {Promise<Array>} Universities data
 */
export const fetchAllUniversities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/university/all`)
    return response.data.data.universities || []
  } catch (error) {
    console.error("Error fetching universities:", error)
    throw error
  }
}

/**
 * Fetch a single university by ID
 * @param {string} id - University ID
 * @returns {Promise<Object>} University data
 */
export const fetchUniversityById = async (id) => {
  if (!id) return null

  try {
    const response = await axios.get(`${API_BASE_URL}/api/university/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching university ${id}:`, error)
    throw error
  }
}


export const updateUniversity = async (id, universityData) => {
  // Create a FormData object to properly handle file uploads
  const formData = new FormData()

  // Add basic university data
  formData.append("universityName", universityData.universityName)
  formData.append("universityId", universityData.universityID)
  formData.append("category", universityData.category)

  // Add array data with proper formatting
  if (universityData.subCategory && universityData.subCategory.length > 0) {
    universityData.subCategory.forEach((item, index) => {
      formData.append(`subCategory[${index}]`, item)
    })
  }

  // Add nested address fields
  formData.append("address[line1]", universityData.address.line1)
  formData.append("address[line2]", universityData.address.line2)
  formData.append("address[pincode]", universityData.address.pincode)
  formData.append("address[state]", universityData.address.state)
  formData.append("address[dist]", universityData.address.dist)
  formData.append("address[taluka]", universityData.address.taluka)
  formData.append("address[autorizedName]", universityData.address.autorizedName)
  formData.append("address[autorizedPhono]", universityData.address.autorizedPhono)
  formData.append("address[nearbyLandmarks]", universityData.address.nearbyLandmarks)

  // Add other basic fields
  formData.append("contactDetails", universityData.contactDetails)
  formData.append("password", universityData.password)
  formData.append("email_id", universityData.email_id)
  formData.append("info[description]", universityData.info.description)
  formData.append("websiteURL", universityData.websiteURL)
  formData.append("establishedYear", universityData.establishedYear)
  formData.append("applicationFormURL", universityData.applicationFormURL)

  // Add array data
  if (universityData.keywords && universityData.keywords.length > 0) {
    universityData.keywords.forEach((item, index) => {
      formData.append(`keywords[${index}]`, item)
    })
  }

  if (universityData.accreditation && universityData.accreditation.length > 0) {
    universityData.accreditation.forEach((item, index) => {
      formData.append(`accreditation[${index}]`, item)
    })
  }

  if (universityData.facilities && universityData.facilities.length > 0) {
    universityData.facilities.forEach((item, index) => {
      formData.append(`facilities[${index}]`, item)
    })
  }

  if (universityData.admissionProcess && universityData.admissionProcess.length > 0) {
    universityData.admissionProcess.forEach((item, index) => {
      formData.append(`admissionProcess[${index}]`, item)
    })
  }

  if (universityData.entrance_exam_required && universityData.entrance_exam_required.length > 0) {
    universityData.entrance_exam_required.forEach((item, index) => {
      formData.append(`entrance_exam_required[${index}]`, item)
    })
  }

  // Add admission entrance details
  formData.append(
    "admissionEntranceDetails[admissionStartDate]",
    universityData.admissionEntranceDetails.admissionStartDate,
  )
  formData.append(
    "admissionEntranceDetails[admissionEndDate]",
    universityData.admissionEntranceDetails.admissionEndDate,
  )
  formData.append(
    "admissionEntranceDetails[lastYearCutoffMarks]",
    universityData.admissionEntranceDetails.lastYearCutoffMarks,
  )

  // Add array data for admission entrance details
  if (
    universityData.admissionEntranceDetails.scholarshipsAvailable &&
    universityData.admissionEntranceDetails.scholarshipsAvailable.length > 0
  ) {
    universityData.admissionEntranceDetails.scholarshipsAvailable.forEach((item, index) => {
      formData.append(`admissionEntranceDetails[scholarshipsAvailable][${index}]`, item)
    })
  }

  if (
    universityData.admissionEntranceDetails.quotaSystem &&
    universityData.admissionEntranceDetails.quotaSystem.length > 0
  ) {
    universityData.admissionEntranceDetails.quotaSystem.forEach((item, index) => {
      formData.append(`admissionEntranceDetails[quotaSystem][${index}]`, item)
    })
  }

  // Add image file if it exists and is a File object
  if (universityData.image && universityData.image instanceof File) {
    formData.append("image", universityData.image)
  }

  const response = await axios.put(`${API_BASE_URL}/api/university/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}


export const deleteUniversity = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/university/delete/${id}`)
    return response.data
  } catch (error) {
    // console.error(`Error deleting university ${id}:`, error)
    throw error
  }
}
