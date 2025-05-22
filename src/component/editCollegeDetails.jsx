import React, { useState, useEffect } from "react";

const scholarshipOptions = ["Merit based", "Need based", "Sports", "Minority"];
const quotaOptions = ["General", "OBC", "SC", "ST", "EWS"];


const EditCollegeDetails = ({ collegeData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    ...collegeData,
    admissionEntranceDetails: {
      ...collegeData.admissionEntranceDetails,
      scholarshipsAvailable:
        collegeData.admissionEntranceDetails?.scholarshipsAvailable || [],
      quotaSystem: collegeData.admissionEntranceDetails?.quotaSystem || [],
      admissionStartDate:
        collegeData.admissionEntranceDetails?.admissionStartDate || "", // Keep as YYYY-MM-DD
      admissionEndDate:
        collegeData.admissionEntranceDetails?.admissionEndDate || "",
    },
  });

  useEffect(() => {
    if (collegeData) {
      console.log("Setting Form Data:", collegeData);
      setFormData({
        ...collegeData,
        admissionEntranceDetails: {
          ...collegeData.admissionEntranceDetails,
          scholarshipsAvailable:
            collegeData.admissionEntranceDetails?.scholarshipsAvailable || [],
          quotaSystem: collegeData.admissionEntranceDetails?.quotaSystem || [],
          admissionStartDate:
            collegeData.admissionEntranceDetails?.admissionStartDate || "",
          admissionEndDate:
            collegeData.admissionEntranceDetails?.admissionEndDate || "",
        },
      });
    }
  }, [collegeData]);

  // ✅ Handle Input Change (Works with Nested Objects)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const keys = name.split(".");
      if (keys.length === 2) {
        return {
          ...prevData,
          [keys[0]]: {
            ...prevData[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  // ✅ Handle Checkbox Change
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      admissionEntranceDetails: {
        ...prevData.admissionEntranceDetails,
        [field]: checked
          ? [...prevData.admissionEntranceDetails[field], value]
          : prevData.admissionEntranceDetails[field].filter(
              (item) => item !== value
            ),
      },
    }));
  };

  // Handle form submission (Save)
  const handleSave = (e) => {
    e.preventDefault();

    // Ensure the correct date format "YYYY-MM-DD"
    const formattedData = {
      ...formData,
      admissionEntranceDetails: {
        ...formData.admissionEntranceDetails,
        admissionStartDate:
          formData.admissionEntranceDetails.admissionStartDate, // Already in YYYY-MM-DD
        admissionEndDate: formData.admissionEntranceDetails.admissionEndDate, // Already in YYYY-MM-DD
      },
    };

    console.log("📢 Final Payload to API:", formattedData);
    onSave(formattedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black/50 backdrop-blur-sm ">
      <div className="bg-gradient-to-br from-blue-50 to-white p-6  shadow-lg border-3 border-blue-600 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4  bg-gradient-to-r from-blue-600 to-blue-400 text-white  py-3 px-6 rounded-t-lg">
          <h2 className="text-2xl font-semibold ">🎓 Edit College</h2>
          <button
            onClick={onCancel}
            className="text-red-600 hover:text-red-800 text-3xl transition duration-300 cursor-pointer"
          >
            &times;
          </button>
        </div>

        <hr className="border-blue-300 mb-5" />

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* College Name */}
            <div className="col-span-2">
              <label className="block text-blue-700 font-medium">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                required
                  placeholder="Enter College Name"
              />
            </div>

            {/* Affiliated University */}
            <div className="col-span-2">
              <label className="block text-blue-700 font-medium">
              Affiliated University
              </label>
              <input
                type="text"
                name="affiliatedUniversity"
                value={formData.affiliatedUniversity}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                required
                placeholder="Enter Affiliated University"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-blue-700 font-medium">Category</label>
              <input
                type="text"
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* College Type */}
            <div>
              <label className="block text-blue-700 font-medium">College Type</label>
              <input
                type="text"
                name="collegeType"
                value={formData.collegeType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Location (Lat, Lng) */}
            <div>
              <label className="block text-blue-700 font-medium">Location (Lat, Lng)</label>
              <input
                type="text"
                name="location"
                value={`${formData.location.lat}, ${formData.location.lng}`}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block text-blue-700 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={`${formData.address.line1}, ${formData.address.line2}, ${formData.address.dist}, ${formData.address.state} - ${formData.address.pincode}`}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-blue-700 font-medium">Contact</label>
              <input
                type="text"
                name="contactDetails"
                value={formData.contactDetails}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Admission Start Date */}
            <div>
              <label className="block text-blue-700 font-medium">
                Admission Start Date
              </label>
              <input
                type="date"
                name="admissionEntranceDetails.admissionStartDate"
                value={
                  formData.admissionEntranceDetails.admissionStartDate?.split(
                    "T"
                  )[0] || ""
                }
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Admission End Date */}
            <div>
              <label className="block text-blue-700 font-medium">Admission End Date</label>
              <input
                type="date"
                name="admissionEntranceDetails.admissionEndDate"
                value={
                  formData.admissionEntranceDetails.admissionEndDate?.split(
                    "T"
                  )[0] || ""
                }
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Last Year Cutoff Marks */}
            <div>
              <label className="block text-blue-700 font-medium">
                Last Year Cutoff Marks
              </label>
              <input
                type="number"
                name="admissionEntranceDetails.lastYearCutoffMarks"
                value={
                  formData.admissionEntranceDetails.lastYearCutoffMarks || ""
                }
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Scholarships Available (Checkbox) */}
            <div>
              <label className="block text-blue-700 font-medium">
                Scholarships Available:
              </label>
              <div className="flex flex-wrap gap-4">
                {scholarshipOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.admissionEntranceDetails.scholarshipsAvailable.includes(
                        option
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(e, "scholarshipsAvailable")
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quota System (Checkbox) */}
            <div>
              <label className="block text-blue-700 font-medium">Quota System:</label>
              <div className="flex flex-wrap gap-4">
                {quotaOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.admissionEntranceDetails.quotaSystem.includes(
                        option
                      )}
                      onChange={(e) => handleCheckboxChange(e, "quotaSystem")}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-blue-700 font-medium">Website</label>
              <input
                type="url"
                name="websiteURL"
                value={formData.websiteURL}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Established Year */}
            <div>
              <label className="block text-blue-700 font-medium">Established Year</label>
              <input
                type="number"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Accreditation */}
            <div>
              <label className="block text-blue-700 font-medium">Accreditation</label>
              <input
                type="text"
                name="accreditation"
                value={formData.accreditation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-300 rounded-lg text-blue-700 hover:bg-gray-400 transition duration-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCollegeDetails;
