import React from "react";

const InfoCard = ({ collegeData, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-indigo-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto space-y-4 border-3 border-blue-400">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-blue-700">College Profile</h2>
          <button
            onClick={onClose}
            className="text-red-600 text-3xl hover:text-red-800 "
          >
            &times;
          </button>
        </div>

      <hr />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* College Name */}
          <div>
            <strong className="text-blue-600">College Name:</strong>
            <p className="text-gray-700">{collegeData?.collegeName || "N/A"}</p>
          </div>

          {/* Affiliated University */}
          <div>
            <strong className="text-blue-600">Affiliated University:</strong>
            <p className="text-gray-700">
              {collegeData?.affiliatedUniversity || "N/A"}
            </p>
          </div>

          {/* Category */}
          <div>
            <strong className="text-blue-600">Category:</strong>
            <p className="text-gray-700">{collegeData?.Category || "N/A"}</p>
          </div>

          {/* College Type */}
          <div>
            <strong className="text-blue-600">Type:</strong>
            <p className="text-gray-700">{collegeData?.collegeType || "N/A"}</p>
          </div>

          {/* Location */}
          <div>
            <strong className="text-blue-600">Location:</strong>
            <p className="text-gray-700">
              {collegeData?.location
                ? `${collegeData.location.lat}, ${collegeData.location.lng}`
                : "N/A"}
            </p>
          </div>

          {/* Address */}
          <div>
            <strong className="text-blue-600">Address:</strong>
            <p className="text-gray-700">
              {collegeData?.address
                ? `${collegeData.address.line1}, ${collegeData.address.line2}, ${collegeData.address.dist}, ${collegeData.address.state} - ${collegeData.address.pincode}`
                : "N/A"}
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <strong className="text-blue-600">Contact:</strong>
            <p className="text-gray-700">
              {collegeData?.contactDetails || "N/A"}
            </p>
          </div>

          {/* Website URL */}
          <div>
            <strong className="text-blue-600">Website:</strong>
            <p className="text-blue-600">
              {collegeData?.websiteURL ? (
                <a
                  href={collegeData.websiteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {collegeData.websiteURL}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          {/* Established Year */}
          <div>
            <strong className="text-blue-600">Established Year:</strong>
            <p className="text-gray-700">{collegeData?.establishedYear || "N/A"}</p>
          </div>

          {/* Accreditation */}
          <div>
            <strong className="text-blue-600">Accreditation:</strong>
            <p className="text-gray-700">{collegeData?.accreditation || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
