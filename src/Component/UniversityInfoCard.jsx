import React from "react";

const UniversityInfoCard = ({ universityData, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-indigo-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            University Profile
          </h2>
          <button
            onClick={onClose}
            className="text-red-600 text-3xl hover:text-red-800"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* University Name */}
          <div>
            <strong className="text-blue-600">University Name:</strong>
            <p className="text-gray-700">
              {universityData?.universityName || "N/A"}
            </p>
          </div>

          {/* Category */}
          <div>
            <strong className="text-blue-600">Category:</strong>
            <p className="text-gray-700">{universityData?.Category || "N/A"}</p>
          </div>

          {/* Location */}
          <div>
            <strong className="text-blue-600">Location:</strong>
            <p className="text-gray-700">
              {universityData?.location
                ? `${universityData.location.lat}, ${universityData.location.lon}`
                : "N/A"}
            </p>
          </div>

          {/* Address */}
          <div>
            <strong className="text-blue-600">Address:</strong>
            <p className="text-gray-700">
              {universityData?.address
                ? `${universityData.address.line1}, ${universityData.address.line2}, ${universityData.address.dist}, ${universityData.address.state} - ${universityData.address.pincode}`
                : "N/A"}
            </p>
          </div>

          {/* Contact */}
          <div>
            <strong className="text-blue-600">Contact:</strong>
            <p className="text-gray-700">
              {universityData?.contactDetails?.phoneNumber || "N/A"}
            </p>
          </div>

          {/* Email */}
          <div>
            <strong className="text-blue-600">Email:</strong>
            <p className="text-gray-700">
              {universityData?.contactDetails?.email ? (
                <a
                  href={`mailto:${universityData.contactDetails.email}`}
                  className="text-blue-600 underline"
                >
                  {universityData.contactDetails.email}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          {/* Website */}
          <div>
            <strong className="text-blue-600">Website:</strong>
            <p className="text-blue-600">
              {universityData?.websiteURL ? (
                <a
                  href={universityData.websiteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {universityData.websiteURL}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          {/* Established Year */}
          <div>
            <strong className="text-blue-600">Established Year:</strong>
            <p className="text-gray-700">
              {universityData?.establishedYear || "N/A"}
            </p>
          </div>

          {/* Accreditation */}
          <div>
            <strong className="text-blue-600">Accreditation:</strong>
            <p className="text-gray-700">
              {universityData?.accreditation || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityInfoCard;
