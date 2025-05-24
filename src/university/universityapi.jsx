
import axios from "axios"
import { API_BASE_URL } from "../constant/constantBaseUrl"

export const fetchUniversityCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/university/search/cat`);
    // console.log(response.data.data, "Fetched categories");
    return response.data.data;
  } catch (error) {
    // console.error("Error fetching categories:", error);
    return [];
  }
};

/**
 * Create a new university
 * @param {FormData} formData - University form data
 * @returns {Promise<Object>} API response
 */
export const createUniversity = async (formData) => {
  try {
    // Log the form data for debugging
    console.log("Creating university with form data:", Object.fromEntries(formData.entries()))

    // Send the request with proper headers for multipart/form-data
    const response = await axios.post(`${API_BASE_URL}/api/university/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("University creation response:", response.data)
    return response.data
  } catch (error) {
    console.error("Error creating university:", error.response?.data || error.message)
    throw error
  }
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

/**
 * Update a university
 * @param {Object} params - Parameters containing id and data
 * @param {string} params.id - University ID
 * @param {FormData} params.data - University form data
 * @returns {Promise<Object>} API response
 */
export const updateUniversity = async ({ id, data }) => {
  try {
    // Log the form data for debugging
    console.log("Updating university with ID:", id)
    console.log("Update form data:", Object.fromEntries(data.entries()))

    // Send the request with proper headers for multipart/form-data
    const response = await axios.put(`${API_BASE_URL}/api/university/update/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    console.log("University update response:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error updating university ${id}:`, error.response?.data || error.message)
    throw error
  }
}

/**
 * Delete a university
 * @param {string} id - University ID
 * @returns {Promise<Object>} API response
 */
export const deleteUniversity = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/university/delete/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting university ${id}:`, error)
    throw error
  }
}
