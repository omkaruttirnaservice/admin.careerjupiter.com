
"use client"

import { motion } from "framer-motion"
import { FaUniversity } from "react-icons/fa"

// Constants
const UniversityCategories = ["Private", "Government", "Autonomous", "Deemed"]
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

/**
 * @param {Object} props - Component props
 * @param {Object} props.formik - Formik instance
 * @param {boolean} props.isSubmitting - Submission state
 * @param {Function} props.handleImageChange - Image change handler
 * @param {Function} props.handleImageGalleryChange - Gallery image change handler
 * @param {Array} props.categoryData - University categories data
 * @param {Array} props.filteredBranches - Filtered subcategories
 */
const UniversityForm = ({
  formik,
  isSubmitting,
  handleImageChange,
  handleImageGalleryChange,
  categoryData,
  filteredBranches,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl bg-white shadow-xl rounded-xl p-8 border border-blue-300"
    >
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-lg shadow-lg">
        <h2 className="text-3xl font-bold flex items-center gap-4">
          <FaUniversity className="text-black bg-white p-2 rounded-md shadow-md" size={40} />
          University Registration Form
        </h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* University Name */}
          <div className="mb-3">
            <label className="block mb-1">University Name</label>
            <input
              type="text"
              {...formik.getFieldProps("universityName")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
              placeholder="Enter university name"
            />
          </div>

          {/* University ID */}
          <div className="mb-3">
            <label className="block mb-1">University ID</label>
            <input
              type="text"
              {...formik.getFieldProps("universityID")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
              placeholder="Enter university ID"
            />
          </div>

          {/* University Category */}
          <div className="mb-3">
            <label className="block mb-1">University Category</label>
            <select
              {...formik.getFieldProps("category")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            >
              <option value="">Select University Category</option>
              {categoryData.map((cat, index) => (
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
                {...formik.getFieldProps("subCategory")}
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
              {...formik.getFieldProps("address.line1")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div>

          {/* Address Line 2 */}
          <div className="mb-3">
            <label className="block mb-1">Address Line 2</label>
            <input
              type="text"
              {...formik.getFieldProps("address.line2")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div>

          {/* Pincode */}
          <div className="mb-3">
            <label className="block mb-1">Pincode</label>
            <input
              type="text"
              {...formik.getFieldProps("address.pincode")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div>

          {/* State */}
          <div className="mb-3">
            <label className="block mb-1">State</label>
            <input
              type="text"
              {...formik.getFieldProps("address.state")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div>

          {/* District */}
          <div className="mb-3">
            <label className="block mb-1">District</label>
            <input
              type="text"
              {...formik.getFieldProps("address.dist")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div>

          {/* Taluka */}
          <div className="mb-3">
            <label className="block mb-1">Taluka</label>
            <input
              type="text"
              {...formik.getFieldProps("address.taluka")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div>

          {/* Authorized Person Name */}
          <div className="mb-3">
            <label className="block mb-1">Authorized Person Name</label>
            <input
              type="text"
              {...formik.getFieldProps("address.autorizedName")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div>

          {/* Authorized Person Phone */}
          <div className="mb-3">
            <label className="block mb-1">Authorized Person Phone</label>
            <input
              type="text"
              {...formik.getFieldProps("address.autorizedPhono")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div>

          {/* Nearby Landmarks */}
          <div className="mb-3">
            <label className="block mb-1">Nearby Landmarks</label>
            <input
              type="text"
              {...formik.getFieldProps("address.nearbyLandmarks")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
            />
          </div>

          {/* Contact Details */}
          <div className="mb-3">
            <label className="block mb-1">Contact Details</label>
            <input
              type="text"
              {...formik.getFieldProps("contactDetails")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
              placeholder="Enter contact details"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...formik.getFieldProps("password")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
              placeholder="Enter password"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...formik.getFieldProps("email_id")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
              placeholder="Enter Email Id"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="block mb-1">Description</label>
            <textarea
              {...formik.getFieldProps("info.description")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
              rows={4}
            ></textarea>
          </div>

          {/* Keywords */}
          <div className="mb-3">
            <label className="block mb-1">Keywords (Max 5)</label>
            <input
              type="text"
              {...formik.getFieldProps("keywords")}
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
              {...formik.getFieldProps("websiteURL")}
              className="border-2 p-2 w-full rounded bg-white border-blue-600"
              placeholder="Enter Website URL"
            />
          </div>

          {/* Established Year */}
          <div className="mb-3">
            <label className="block mb-1">Established Year</label>
            <select
              {...formik.getFieldProps("establishedYear")}
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
                {...formik.getFieldProps("accreditation")}
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
                {...formik.getFieldProps("facilities")}
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
                {...formik.getFieldProps("admissionProcess")}
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
                {...formik.getFieldProps("entrance_exam_required")}
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
              {...formik.getFieldProps("applicationFormURL")}
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
              {formik.values.image ? (
                <img
                  src={URL.createObjectURL(formik.values.image) || "/placeholder.svg"}
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

          {/* Gallery Images */}
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <label className="block font-medium mb-2">
              Gallery Images <span className="text-red-500">(JPG/JPEG/PNG)</span>
            </label>
            <div
              className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition"
              onClick={() => document.getElementById("galleryImages")?.click()}
            >
              {formik.values.imageGallery?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formik.values.imageGallery.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 h-10">Drag & drop images here or click to upload</p>
              )}
            </div>
            <input
              type="file"
              id="galleryImages"
              accept="image/jpeg,image/jpg,image/png"
              multiple
              className="hidden"
              onChange={handleImageGalleryChange}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <motion.button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default UniversityForm

