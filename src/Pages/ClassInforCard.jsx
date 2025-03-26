// import React from "react";

// const ClassInfoCard = ({ classData, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Class Details</h2>

//         <p>
//           <span className="font-semibold">Class Name:</span> {classData.className}
//         </p>
//         <p>
//           <span className="font-semibold">Owner:</span> {classData.ownerOrInstituteName}
//         </p>
//         <p>
//           <span className="font-semibold">Contact:</span> {classData.contactDetails}
//         </p>
//         <p>
//           <span className="font-semibold">Website:</span>{" "}
//           {classData.websiteURL ? (
//             <a href={classData.websiteURL} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//               Visit Website
//             </a>
//           ) : (
//             "N/A"
//           )}
//         </p>

//         <div className="flex justify-end mt-4">
//           <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassInfoCard;


import React from "react";

const ClassInfoCard = ({ classData, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto space-y-6 border-3 border-blue-500">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          {/* Class Name */}
          <div>
            <strong className="text-blue-700">🏫 Class Name:</strong>
            <p className="text-gray-800 font-medium">{classData?.className || "N/A"}</p>
          </div>

          {/* Owner Name */}
          <div>
            <strong className="text-blue-700">👤 Owner:</strong>
            <p className="text-gray-800 font-medium">{classData?.ownerOrInstituteName || "N/A"}</p>
          </div>

          {/* Contact Details */}
          <div>
            <strong className="text-blue-700">📞 Contact:</strong>
            <p className="text-gray-800 font-medium">{classData?.contactDetails || "N/A"}</p>
          </div>

          {/* Website URL */}
          <div>
            <strong className="text-blue-700">🌍 Website:</strong>
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

          {/* Address */}
          <div className="sm:col-span-2">
            <strong className="text-blue-700">📬 Address:</strong>
            <p className="text-gray-800 font-medium">
              {classData?.address
                ? `${classData.address.line1}, ${classData.address.line2}, ${classData.address.dist}, ${classData.address.state} - ${classData.address.pincode}`
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassInfoCard;
