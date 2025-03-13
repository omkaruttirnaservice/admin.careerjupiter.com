import React, { useState, useEffect } from "react";



const scholarshipOptions = ["Merit based", "Need based", "Sports", "Minority"];
const quotaOptions = ["General", "OBC", "SC", "ST", "EWS"];

const EditUniversityDetails = ({ universityData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ 
    ...universityData,
    admissionEntranceDetails: {
      ...universityData.admissionEntranceDetails,
      scholarshipsAvailable:
        universityData.admissionEntranceDetails?.scholarshipsAvailable || [],
      quotaSystem: universityData.admissionEntranceDetails?.quotaSystem || [],
      admissionStartDate:
        universityData.admissionEntranceDetails?.admissionStartDate || "", // Keep as YYYY-MM-DD
      admissionEndDate:
        universityData.admissionEntranceDetails?.admissionEndDate || "",
    },
  });

  useEffect(() => {
    if (universityData) {
      console.log("Setting Form Data:", universityData);
    setFormData({ 
      ...universityData, 
      admissionEntranceDetails: {
        ...universityData.admissionEntranceDetails,
        scholarshipsAvailable:
          universityData.admissionEntranceDetails?.scholarshipsAvailable || [],
        quotaSystem: universityData.admissionEntranceDetails?.quotaSystem || [],
        admissionStartDate:
          universityData.admissionEntranceDetails?.admissionStartDate || "",
        admissionEndDate:
          universityData.admissionEntranceDetails?.admissionEndDate || "",
      },
    });
  }
  }, [universityData]);

  // Handle input change
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
      universityName: formData.universityName,
      Category: formData.Category,
      // universityType: formData.universityType,
      location: {
        lat: formData.location.lat,
        lan: formData.location.lan,
      },
      address: {
        line1: formData.address.line1,
        line2: formData.address.line2,
        pincode: formData.address.pincode,
        state: formData.address.state,
        dist: formData.address.dist,
      },
      contactDetails: {
        phoneNumber: formData.contactDetails.phoneNumber,
        email: formData.contactDetails.email,
      },
      info: {
        description: formData.info.description,
      },
      keywords: formData.keywords || [],
      image: formData.image,
      imageGallery: formData.imageGallery || [],
      websiteURL: formData.websiteURL,
      establishedYear: formData.establishedYear,
      accreditation: formData.accreditation || [],
      facilities: formData.facilities || [],
      admissionProcess: formData.admissionProcess || [],
      applicationFormURL: formData.applicationFormURL,
    };
  
      console.log("📢 Final Payload to API:", formattedData);
      onSave(formattedData);
    };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto space-y-6 mt-8 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-700">Edit University</h2>
          <button onClick={onCancel} className="text-red-600 hover:text-red-800 text-lg">
            &times;
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* University Name */}
            <div className="col-span-2">
              <label className="block text-blue-600">University Name</label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
                required
              />
            </div>

            {/* Affiliated University
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
            </div> */}

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

            {/* University Type */}
            {/* <div>
              <label className="block text-blue-600">University Type</label>
              <input
                type="text"
                name="universityType"
                value={formData.universityType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div> */}

            {/* Location (Lat, Lon) */}
            <div>
              <label className="block text-blue-600">Location (Lat, Lon)</label>
              <input
                type="text"
                name="location"
                value={`${formData.location.lat}, ${formData.location.lon}`}
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

            {/* Contact Phone */}
            <div>
              <label className="block text-blue-600">Contact Phone</label>
              <input
                type="text"
                name="contactDetails.phoneNumber"
                value={formData.contactDetails?.phoneNumber || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-blue-600">Contact Email</label>
              <input
                type="email"
                name="contactDetails.email"
                value={formData.contactDetails?.email || ""}
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

export default EditUniversityDetails;
