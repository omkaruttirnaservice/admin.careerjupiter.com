import React, { useState, useEffect } from "react";

const EditCollegeDetails = ({ collegeData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...collegeData });

  useEffect(() => {
    setFormData({ ...collegeData });
  }, [collegeData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (Save)
  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-indigo-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto space-y-6 mt-8 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-700">Edit College</h2>
          <button
            onClick={onCancel}
            className="text-red-600 hover:text-red-800 text-lg"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* College Name */}
            <div className="col-span-2">
              <label className="block text-blue-600">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
                required
              />
            </div>

            {/* Affiliated University */}
            <div className="col-span-2">
              <label className="block text-blue-600">Affiliated University</label>
              <input
                type="text"
                name="affiliatedUniversity"
                value={formData.affiliatedUniversity}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-blue-600">Category</label>
              <input
                type="text"
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>

            {/* College Type */}
            <div>
              <label className="block text-blue-600">College Type</label>
              <input
                type="text"
                name="collegeType"
                value={formData.collegeType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>

            {/* Location (Lat, Lng) */}
            <div>
              <label className="block text-blue-600">Location (Lat, Lng)</label>
              <input
                type="text"
                name="location"
                value={`${formData.location.lat}, ${formData.location.lng}`}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block text-blue-600">Address</label>
              <input
                type="text"
                name="address"
                value={`${formData.address.line1}, ${formData.address.line2}, ${formData.address.dist}, ${formData.address.state} - ${formData.address.pincode}`}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-blue-600">Contact</label>
              <input
                type="text"
                name="contactDetails"
                value={formData.contactDetails}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-blue-600">Website</label>
              <input
                type="url"
                name="websiteURL"
                value={formData.websiteURL}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>

            {/* Established Year */}
            <div>
              <label className="block text-blue-600">Established Year</label>
              <input
                type="number"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>

            {/* Accreditation */}
            <div>
              <label className="block text-blue-600">Accreditation</label>
              <input
                type="text"
                name="accreditation"
                value={formData.accreditation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-300 rounded-md text-blue-700 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
