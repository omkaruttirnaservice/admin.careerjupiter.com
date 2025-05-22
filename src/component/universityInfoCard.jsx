import React from "react";

const UniversityInfoCard = ({ universityData, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto space-y-6 border-3 border-blue-500">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-t-lg">
          <h2 className="text-3xl font-semibold">
          🏛 University Profile
          </h2>
          <button
            onClick={onClose}
            className="text-white text-3xl hover:text-red-600 transition-all duration-300 cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          {/* University Name */}
          <div>
            <strong className="text-blue-700">🏫 University Name:</strong>
            <p className="text-gray-800 font-medium">
              {universityData?.universityName || "N/A"}
            </p>
          </div>

          {/* Category */}
          <div>
            <strong className="text-blue-700">📌 Category:</strong>
            <p className="text-gray-800 font-medium">{universityData?.Category || "N/A"}</p>
          </div>

          {/* Location */}
          <div>
            <strong className="text-blue-700">📍 Location:</strong>
            <p className="text-gray-800 font-medium">
              {universityData?.location
                ? `${universityData.location.lat}, ${universityData.location.lon}`
                : "N/A"}
            </p>
          </div>

          {/* Address */}
          <div>
            <strong className="text-blue-700">📬 Address:</strong>
            <p className="text-gray-800 font-medium">
              {universityData?.address
                ? `${universityData.address.line1}, ${universityData.address.line2}, ${universityData.address.dist}, ${universityData.address.state} - ${universityData.address.pincode}`
                : "N/A"}
            </p>
          </div>

          {/* Contact */}
          <div>
            <strong className="text-blue-700">📞 Contact:</strong>
            <p className="text-gray-800 font-medium">
              {universityData?.contactDetails?.phoneNumber || "N/A"}
            </p>
          </div>

          {/* Email */}
          <div>
            <strong className="text-blue-700">📧 Email:</strong>
            <p className="text-gray-800 font-medium">
              {universityData?.contactDetails?.email ? (
                <a
                  href={`mailto:${universityData.contactDetails.email}`}
                  className="text-blue-700 underline"
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
            <strong className="text-blue-700">🌍 Website:</strong>
            <p className="text-blue-700">
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
            <strong className="text-blue-700">📅 Established Year:</strong>
            <p className="text-gray-800 font-medium">
              {universityData?.establishedYear || "N/A"}
            </p>
          </div>

          {/* Accreditation */}
          <div>
            <strong className="text-blue-700">✅ Accreditation:</strong>
            <p className="text-gray-800 font-medium">
              {universityData?.accreditation || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityInfoCard;
