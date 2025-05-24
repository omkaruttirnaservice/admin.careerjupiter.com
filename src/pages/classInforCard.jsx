import React from "react";

const ClassInfoCard = ({ classData, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black/50 backdrop-blur-sm">
      {/* Card Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto space-y-6 border-3 border-blue-500">
        
        {/* Header with Close Button */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-t-lg">
          <h2 className="text-3xl font-semibold">📚 Class Profile</h2>
          <button
            onClick={onClose}
            className="text-white text-3xl hover:text-red-600 transition-all duration-300 cursor-pointer"
          >
            &times;
          </button>
        </div>

        <hr />

        {/* Class Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          
          {/* Class Name */}
          <div>
            <strong className="text-blue-700">🏫 Class Name:</strong>
            <p className="text-gray-800 font-medium">
              {classData?.className || "N/A"}
            </p>
          </div>

          {/* Owner Name */}
          <div>
            <strong className="text-blue-700">👨‍🏫 Owner:</strong>
            <p className="text-gray-800 font-medium">
              {classData?.ownerOrInstituteName || "N/A"}
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <strong className="text-blue-700">📱 Contact:</strong>
            <p className="text-gray-800 font-medium">
              {classData?.contactDetails || "N/A"}
            </p>
          </div>

          {/* Year Established */}
          <div>
            <strong className="text-blue-700">🏗️ Established Year:</strong>
            <p className="text-gray-800 font-medium">
              {classData?.yearEstablished || "N/A"}
            </p>
          </div>

          {/* Type */}
          <div>
            <strong className="text-blue-700">🏷️ Type:</strong>
            <p className="text-gray-800 font-medium">
              {classData?.franchiseOrIndependent || "N/A"}
            </p>
          </div>

          {/* Website URL */}
          <div>
            <strong className="text-blue-700">🌐 Website:</strong>
            <p className="text-blue-700">
              {classData?.websiteURL ? (
                <a
                  href={classData.websiteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {classData.websiteURL}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          {/* Mode of Teaching */}
          <div>
            <strong className="text-blue-700">🧑‍🏫 Teaching Mode:</strong>
            <p className="text-gray-800 font-medium">
              {classData?.modeOfTeaching || "N/A"}
            </p>
          </div>

           {/* Category */}
          <div>
            <strong className="text-blue-700">🗂️ Category:</strong>
            <p className="text-gray-800 font-medium">
              {classData?.category?.join(", ") || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassInfoCard;
