import React from "react";

const InfoCard = ({ collegeData, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto space-y-6 border-3 border-blue-500">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-t-lg">
          <h2 className="text-3xl font-semibold">🎓 College Profile</h2>
          <button
            onClick={onClose}
            className="text-white text-3xl hover:text-red-600 transition-all duration-300 cursor-pointer"
          >
            &times;
          </button>
        </div>

      <hr />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          <div>
            <strong className="text-blue-700">🏫 College Id:</strong>
            <p className="text-gray-800 font-medium">{collegeData?.collegeId || "N/A"}</p>
          </div>
          {/* College Name */}
          <div>
            <strong className="text-blue-700">🏫 College Name:</strong>
            <p className="text-gray-800 font-medium">{collegeData?.collegeName || "N/A"}</p>
          </div>

          {/* Affiliated University */}
          <div>
            <strong className="text-blue-700">🏛 Affiliated University:</strong>
            <p className="text-gray-800 font-medium">
              {collegeData?.affiliatedUniversity || "N/A"}
            </p>
          </div>

          {/* Category */}
          <div>
            <strong className="text-blue-700">📌 Category:</strong>
            <p className="text-gray-800 font-medium">{collegeData?.category || "N/A"}</p>
          </div>

          {/* College Type */}
          <div>
            <strong className="text-blue-700">🏷 Type:</strong>
            <p className="text-gray-800 font-medium">{collegeData?.collegeType || "N/A"}</p>
          </div>

          {/* Contact Details */}
          <div>
            <strong className="text-blue-700">📞 Contact:</strong>
            <p className="text-gray-800 font-medium">
              {collegeData?.contactDetails || "N/A"}
            </p>
          </div>

          <div>
            <strong className="text-blue-700">📞 Email Id:</strong>
            <p className="text-gray-800 font-medium">
              {collegeData?.email_id || "N/A"}
            </p>
          </div>

          {/* Website URL */}
          <div>
            <strong className="text-blue-700">🌍 Website:</strong>
            <p className="text-blue-700">
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
            <strong className="text-blue-700">📅 Established Year:</strong>
            <p className="text-gray-800 font-medium">{collegeData?.establishedYear || "N/A"}</p>
          </div>

          {/* Accreditation */}
          <div>
            <strong className="text-blue-700">✅ Accreditation:</strong>
            <p className="text-gray-800 font-medium">{collegeData?.accreditation || "N/A"}</p>
          </div>

          {/* Address */}
          {/* <div>
            <strong className="text-blue-700">📬 Address:</strong>
            <p className="text-gray-800 font-medium">
              {collegeData?.address
                ? `${collegeData.address.line1}, ${collegeData.address.line2}, ${collegeData.address.dist}, ${collegeData.address.state} - ${collegeData.address.pincode}`
                : "N/A"}
            </p>
          </div> */}

          
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
