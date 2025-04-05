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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-blue-50 to-white p-6 shadow-lg border-3 border-blue-600 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 px-6 rounded-t-lg">
          <h2 className="text-2xl font-semibold">🎓 Edit Class Details</h2>
          <button
            onClick={onCancel}
            className="text-red-600 hover:text-red-800 text-3xl transition duration-300 cursor-pointer"
          >
            &times;
          </button>
        </div>

        <hr className="border-blue-300 mb-5" />

        <form onSubmit={() => onSave(editedData)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Class Name */}
            <div className="col-span-2">
              <label className="block text-blue-700 font-medium">Class Name</label>
              <input
                type="text"
                name="className"
                value={editedData.className}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-blue-700 font-medium">Owner/Institute Name</label>
              <input
                type="text"
                name="ownerOrInstituteName"
                value={editedData.ownerOrInstituteName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Contact Details */}
            <div>
              <label className="block text-blue-700 font-medium">Contact Details</label>
              <input
                type="text"
                name="contactDetails"
                value={editedData.contactDetails}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-blue-700 font-medium">Website URL</label>
              <input
                type="url"
                name="websiteURL"
                value={editedData.websiteURL}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Address Fields */}
            <div className="col-span-2">
              <label className="block text-blue-700 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={`${editedData.address.line1}, ${editedData.address.line2}, ${editedData.address.dist}, ${editedData.address.state} - ${editedData.address.pincode}`}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Year Established */}
            <div>
              <label className="block text-blue-700 font-medium">Year Established</label>
              <input
                type="number"
                name="yearEstablished"
                value={editedData.yearEstablished}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Type of Class */}
            <div>
              <label className="block text-blue-700 font-medium">Type of Class</label>
              <input
                type="text"
                name="typeOfClass"
                value={editedData.typeOfClass.join(", ")}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Mode of Teaching */}
            <div>
              <label className="block text-blue-700 font-medium">Mode of Teaching</label>
              <input
                type="text"
                name="modeOfTeaching"
                value={editedData.modeOfTeaching.join(", ")}
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
            {/* <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
            >
              Save
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClassDetails;
