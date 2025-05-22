
import { motion } from "framer-motion";
import { FaUniversity } from "react-icons/fa";
import Select from "react-select";

// Constants
const UniversityCategories = ["Private", "Government", "Autonomous", "Deemed"];
const facilities = ["Library", "Hostel", "Sport Complex", "WiFi Campus"];
const accreditationOptions = [
  "NAAC A++",
  "NAAC A+",
  "NAAC A",
  "NBA Accredited",
  "UGC Approved",
  "AICTE Approved",
  "ISO Certified",
  "NIRF Ranked",
];
const scholarshipAvailable = [
  "Merit-based",
  "Need-based",
  "Sports-based",
  "Other",
];
const quotaSystem = ["Management", "SC/ST", "OBC", "General"];
const entranceExams = [
  "JEE",
  "NEET",
  "CAT",
  "GATE",
  "CLAT",
  "LSAT",
  "XAT",
  "CMAT",
  "MAT",
];
const currentYear = new Date().getFullYear();
const establishedYears = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, i) => 1980 + i
);

const UniversityForm = ({
  formik,
  isSubmitting,
  handleImageChange,
  handleImageGalleryChange,
  categoryData,
  filteredBranches,
  stateOptions = [],
  districtOptions = [],
  submitButtonText = "Submit",
}) => {
  // Helper function to display error message
  const getErrorMessage = (fieldName) => {
    const path = fieldName.split(".");
    let error;

    if (path.length === 1) {
      error = formik.touched[fieldName] && formik.errors[fieldName];
    } else if (path.length === 2) {
      error =
        formik.touched[path[0]]?.[path[1]] && formik.errors[path[0]]?.[path[1]];
    } else if (path.length === 3) {
      error =
        formik.touched[path[0]]?.[path[1]]?.[path[2]] &&
        formik.errors[path[0]]?.[path[1]]?.[path[2]];
    }

    return error ? (
      <div className="text-red-500 text-sm mt-1">{error}</div>
    ) : null;
  };

  // Convert array to options for react-select
  const toOptions = (arr) => arr.map((item) => ({ value: item, label: item }));

  return (
   <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="w-[70%] mx-auto bg-white shadow-xl rounded-xl p-8 border border-blue-300"
>

      <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-lg shadow-lg">
        <h2 className="text-3xl font-bold flex items-center gap-4">
          <FaUniversity
            className="text-black bg-white p-2 rounded-md shadow-md"
            size={40}
          />
          University Registration Form
        </h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* University Name */}
          <div className="mb-3">
            <label className="block mb-1">
              University Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...formik.getFieldProps("universityName")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.universityName && formik.errors.universityName
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
              placeholder="Enter university name"
            />
            {getErrorMessage("universityName")}
          </div>

          {/* University ID */}
          <div className="mb-3">
            <label className="block mb-1">
              University ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...formik.getFieldProps("universityID")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.universityID && formik.errors.universityID
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
              placeholder="Enter university ID"
            />
            {getErrorMessage("universityID")}
          </div>

          {/* University Category */}
          <div className="mb-3">
            <label className="block mb-1">
              University Category <span className="text-red-500">*</span>
            </label>
            <select
              {...formik.getFieldProps("category")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.category && formik.errors.category
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
            >
              <option value="">Select University Category</option>
              {categoryData.map((cat, index) => (
                <option key={index} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            {getErrorMessage("category")}
          </div>

          {/* University Sub Category */}
          <div className="mb-3">
            <label className="block mb-1">
              University Sub Category <span className="text-red-500">*</span>
            </label>
            <div
              className={`border-2 rounded bg-white p-2 ${
                formik.touched.subCategory && formik.errors.subCategory
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
            >
              <div
                className="space-y-2 overflow-y-auto"
                style={{ maxHeight: "6.5rem" }}
              >
                {filteredBranches.map((branch, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`subCategory-${branch}`}
                      checked={
                        formik.values.subCategory?.includes(branch) || false
                      }
                      onChange={(e) => {
                        const currentValues = formik.values.subCategory || [];
                        const newValues = e.target.checked
                          ? [...currentValues, branch]
                          : currentValues.filter((v) => v !== branch);
                        formik.setFieldValue("subCategory", newValues);
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`subCategory-${branch}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {branch}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formik.touched.subCategory && formik.errors.subCategory && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.subCategory}
              </div>
            )}
          </div>

          {/* Address Line 1 */}
          <div className="mb-3">
            <label className="block mb-1">
              Address Line 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...formik.getFieldProps("address.line1")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.address?.line1 && formik.errors.address?.line1
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
            />
            {getErrorMessage("address.line1")}
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
            <label className="block mb-1">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...formik.getFieldProps("address.pincode")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.address?.pincode &&
                formik.errors.address?.pincode
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
              maxLength={6}
              placeholder="Enter 6-digit pincode"
            />
            {getErrorMessage("address.pincode")}
          </div>

          {/* State */}
          <div className="mb-3">
            <label className="block mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <Select
              options={stateOptions.map((state) => ({
                value: state,
                label: state,
              }))}
              value={
                formik.values.address.state
                  ? {
                      value: formik.values.address.state,
                      label: formik.values.address.state,
                    }
                  : null
              }
              onChange={(option) => {
                formik.setFieldValue(
                  "address.state",
                  option ? option.value : ""
                );
              }}
              placeholder="Select state"
              className={`${
                formik.touched.address?.state && formik.errors.address?.state
                  ? "border-red-500"
                  : ""
              }`}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor:
                    formik.touched.address?.state &&
                    formik.errors.address?.state
                      ? "#f56565"
                      : "#2563eb",
                  borderWidth: "2px",
                  "&:hover": {
                    borderColor:
                      formik.touched.address?.state &&
                      formik.errors.address?.state
                        ? "#f56565"
                        : "#2563eb",
                  },
                }),
              }}
              isSearchable={true}
            />
            {getErrorMessage("address.state")}
          </div>

          {/* District */}
          <div className="mb-3">
            <label className="block mb-1">
              District <span className="text-red-500">*</span>
            </label>
            <Select
              options={districtOptions.map((district) => ({
                value: district,
                label: district,
              }))}
              value={
                formik.values.address.dist
                  ? {
                      value: formik.values.address.dist,
                      label: formik.values.address.dist,
                    }
                  : null
              }
              onChange={(option) => {
                formik.setFieldValue(
                  "address.dist",
                  option ? option.value : ""
                );
              }}
              placeholder="Select district"
              isDisabled={!formik.values.address.state}
              className={`${
                formik.touched.address?.dist && formik.errors.address?.dist
                  ? "border-red-500"
                  : ""
              }`}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor:
                    formik.touched.address?.dist && formik.errors.address?.dist
                      ? "#f56565"
                      : "#2563eb",
                  borderWidth: "2px",
                  "&:hover": {
                    borderColor:
                      formik.touched.address?.dist &&
                      formik.errors.address?.dist
                        ? "#f56565"
                        : "#2563eb",
                  },
                }),
              }}
              isSearchable={true}
            />
            {getErrorMessage("address.dist")}
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
            <label className="block mb-1">
              Authorized Person Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...formik.getFieldProps("address.autorizedName")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.address?.autorizedName &&
                formik.errors.address?.autorizedName
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
            />
            {getErrorMessage("address.autorizedName")}
          </div>

          {/* Authorized Person Phone */}
          <div className="mb-3">
            <label className="block mb-1">
              Authorized Person Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...formik.getFieldProps("address.autorizedPhono")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.address?.autorizedPhono &&
                formik.errors.address?.autorizedPhono
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
            />
            {getErrorMessage("address.autorizedPhono")}
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
            <label className="block mb-1">
              Contact Details <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...formik.getFieldProps("contactDetails")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.contactDetails && formik.errors.contactDetails
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
              placeholder="Enter contact details"
            />
            {getErrorMessage("contactDetails")}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...formik.getFieldProps("password")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
              placeholder="Enter password (min 4 characters)"
            />
            {getErrorMessage("password")}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...formik.getFieldProps("email_id")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.email_id && formik.errors.email_id
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
              placeholder="Enter Email Id"
            />
            {getErrorMessage("email_id")}
          </div>

          {/* Description */}
          <div className="mb-3 ">
            <label className="block mb-1">
              Description <span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 ml-2">
                (Min 100, Max 1000 characters)
              </span>
            </label>
            <textarea
              {...formik.getFieldProps("info.description")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.info?.description &&
                formik.errors.info?.description
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
              rows={4}
              minLength={100}
              maxLength={1000}
            ></textarea>
            <div className="flex justify-between">
              <div>{getErrorMessage("info.description")}</div>
              <div className="text-sm text-gray-500">
                {formik.values.info.description.length}/1000 characters
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="mb-3">
            <label className="block mb-1">
              Keywords (Min 1, Max 5) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formik.values.keywords.join(", ")}
              className={`border-2 p-2 w-full rounded bg-white ${
                formik.touched.keywords && formik.errors.keywords
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
              placeholder="Enter keywords separated by commas"
              onChange={(e) => {
                const keywords = e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean);
                formik.setFieldValue("keywords", keywords.slice(0, 5));
              }}
            />
            {getErrorMessage("keywords")}
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
            <label className="block mb-1">Accreditation *</label>
            <div
              className={`border-2 rounded bg-white p-2 ${
                formik.touched.accreditation && formik.errors.accreditation
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
            >
              <div
                className="space-y-2 overflow-y-auto"
                style={{ maxHeight: "6.5rem" }}
              >
                {accreditationOptions.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`accreditation-${option}`}
                      checked={
                        formik.values.accreditation?.includes(option) || false
                      }
                      onChange={(e) => {
                        const currentValues = formik.values.accreditation || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option]
                          : currentValues.filter((v) => v !== option);
                        formik.setFieldValue("accreditation", newValues);
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`accreditation-${option}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formik.touched.accreditation && formik.errors.accreditation && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.accreditation}
              </div>
            )}
          </div>

          {/* Facilities */}
          <div className="mb-3">
            <label className="block mb-1">Facilities *</label>
            <div
              className={`border-2 rounded bg-white p-2 ${
                formik.touched.facilities && formik.errors.facilities
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
            >
              <div
                className="space-y-2 overflow-y-auto"
                style={{ maxHeight: "6.5rem" }}
              >
                {facilities.map((facility, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`facility-${facility}`}
                      checked={
                        formik.values.facilities?.includes(facility) || false
                      }
                      onChange={(e) => {
                        const currentValues = formik.values.facilities || [];
                        const newValues = e.target.checked
                          ? [...currentValues, facility]
                          : currentValues.filter((v) => v !== facility);
                        formik.setFieldValue("facilities", newValues);
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`facility-${facility}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {facility}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formik.touched.facilities && formik.errors.facilities && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.facilities}
              </div>
            )}
          </div>

          {/* Admission Process */}
          <div className="mb-3">
            <label className="block mb-1">Admission Process *</label>
            <div
              className={`border-2 rounded bg-white p-2 ${
                formik.touched.admissionProcess &&
                formik.errors.admissionProcess
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
            >
              <div
                className="space-y-2 overflow-y-auto"
                style={{ maxHeight: "6.5rem" }}
              >
                {[
                  "Online Registration",
                  "Counseling",
                  "Document Verification",
                  "Entrance Exam",
                ].map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`admission-${option}`}
                      checked={
                        formik.values.admissionProcess?.includes(option) ||
                        false
                      }
                      onChange={(e) => {
                        const currentValues =
                          formik.values.admissionProcess || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option]
                          : currentValues.filter((v) => v !== option);
                        formik.setFieldValue("admissionProcess", newValues);
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`admission-${option}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formik.touched.admissionProcess &&
              formik.errors.admissionProcess && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.admissionProcess}
                </div>
              )}
          </div>

          {/* Entrance Exams Required */}
          <div className="mb-3">
            <label className="block mb-1">Entrance Exams Required *</label>
            <div
              className={`border-2 rounded bg-white p-2 ${
                formik.touched.entrance_exam_required &&
                formik.errors.entrance_exam_required
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
            >
              <div
                className="space-y-2 overflow-y-auto"
                style={{ maxHeight: "6.5rem" /* approx height for 3 items */ }}
              >
                {entranceExams.map((exam, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`exam-${exam}`}
                      checked={
                        formik.values.entrance_exam_required?.includes(exam) ||
                        false
                      }
                      onChange={(e) => {
                        const currentValues =
                          formik.values.entrance_exam_required || [];
                        const newValues = e.target.checked
                          ? [...currentValues, exam]
                          : currentValues.filter((v) => v !== exam);
                        formik.setFieldValue(
                          "entrance_exam_required",
                          newValues
                        );
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`exam-${exam}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {exam}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formik.touched.entrance_exam_required &&
              formik.errors.entrance_exam_required && (
                <div className="text-red-500 text-sm">
                  {formik.errors.entrance_exam_required}
                </div>
              )}
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

          
          <div className="mb-3">
            <label className="block mb-1">Scholarships Available *</label>
            <div
              className={`border-2 rounded bg-white p-2 ${
                formik.touched.admissionEntranceDetails
                  ?.scholarshipsAvailable &&
                formik.errors.admissionEntranceDetails?.scholarshipsAvailable
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
            >
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {scholarshipAvailable.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`scholarship-${option}`}
                      checked={
                        formik.values.admissionEntranceDetails.scholarshipsAvailable?.includes(
                          option
                        ) || false
                      }
                      onChange={(e) => {
                        const currentValues =
                          formik.values.admissionEntranceDetails
                            .scholarshipsAvailable || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option]
                          : currentValues.filter((v) => v !== option);
                        formik.setFieldValue(
                          "admissionEntranceDetails.scholarshipsAvailable",
                          newValues
                        );
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`scholarship-${option}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formik.touched.admissionEntranceDetails?.scholarshipsAvailable &&
              formik.errors.admissionEntranceDetails?.scholarshipsAvailable && (
                <div className="text-red-500 text-sm">
                  {formik.errors.admissionEntranceDetails.scholarshipsAvailable}
                </div>
              )}
          </div>

          {/* Quota System */}
          <div className="mb-3">
            <label className="block mb-1">Quota System *</label>
            <div
              className={`border-2 rounded bg-white p-2 ${
                formik.touched.admissionEntranceDetails?.quotaSystem &&
                formik.errors.admissionEntranceDetails?.quotaSystem
                  ? "border-red-500"
                  : "border-blue-600"
              }`}
            >
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {quotaSystem.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`quota-${option}`}
                      checked={
                        formik.values.admissionEntranceDetails.quotaSystem?.includes(
                          option
                        ) || false
                      }
                      onChange={(e) => {
                        const currentValues =
                          formik.values.admissionEntranceDetails.quotaSystem ||
                          [];
                        const newValues = e.target.checked
                          ? [...currentValues, option]
                          : currentValues.filter((v) => v !== option);
                        formik.setFieldValue(
                          "admissionEntranceDetails.quotaSystem",
                          newValues
                        );
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`quota-${option}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formik.touched.admissionEntranceDetails?.quotaSystem &&
              formik.errors.admissionEntranceDetails?.quotaSystem && (
                <div className="text-red-500 text-sm">
                  {formik.errors.admissionEntranceDetails.quotaSystem}
                </div>
              )}
          </div>

          {/* University Image */}
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <label className="block font-medium mb-2">
              University Image{" "}
              <span className="text-red-500">(Max: 100KB, JPG/JPEG/PNG)</span>
            </label>
            <div
              className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition"
              onClick={() =>
                document.getElementById("universityImage")?.click()
              }
            >
              {formik.values.image ? (
                <img
                  src={
                    typeof formik.values.image === "string"
                      ? formik.values.image
                      : URL.createObjectURL(formik.values.image)
                  }
                  alt="Preview"
                  className="w-full h-32 object-contain rounded"
                />
              ) : (
                <p className="text-gray-500">
                  Drag & drop an image here or click to upload
                </p>
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
              Gallery Images{" "}
              <span className="text-red-500">(JPG/JPEG/PNG)</span>
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
                      src={
                        typeof file === "string"
                          ? file
                          : URL.createObjectURL(file)
                      }
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 h-10">
                  Drag & drop images here or click to upload
                </p>
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
            className="bg-blue-500 text-white p-3 rounded w-full md:w-auto px-8 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : submitButtonText}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default UniversityForm;
