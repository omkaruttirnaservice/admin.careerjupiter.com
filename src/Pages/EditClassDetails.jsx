import React, { useState } from "react";

const EditClassDetails = ({ classData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState(classData);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Class Details</h2>

        {/* Class Name */}
        <label className="block text-sm font-medium text-gray-700">Class Name</label>
        <input
          type="text"
          name="className"
          value={editedData.className}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />

        {/* Owner Name */}
        <label className="block text-sm font-medium text-gray-700">Owner/Institute Name</label>
        <input
          type="text"
          name="ownerOrInstituteName"
          value={editedData.ownerOrInstituteName}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />

        {/* Contact Number */}
        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="text"
          name="contactDetails"
          value={editedData.contactDetails}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />

        {/* Website URL */}
        <label className="block text-sm font-medium text-gray-700">Website URL</label>
        <input
          type="text"
          name="websiteURL"
          value={editedData.websiteURL}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer">
            Cancel
          </button>
          <button onClick={() => onSave(editedData)} className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClassDetails;
