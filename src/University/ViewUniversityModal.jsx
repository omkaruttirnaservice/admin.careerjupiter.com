// import { FaUniversity, FaTimes } from "react-icons/fa"

// const ViewUniversityModal = ({ university, isOpen, onClose }) => {
//   if (!isOpen || !university) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
//           <h2 className="text-2xl font-bold flex items-center gap-3">
//             <FaUniversity /> {university.universityName}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-white hover:text-gray-200 transition-colors"
//           >
//             <FaTimes size={24} />
//           </button>
//         </div>

//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* University Image */}
//           <div className="md:col-span-2 flex justify-center">
//             {university.image ? (
//               <img
//                 src={university.image || "/placeholder.svg"}
//                 alt={university.universityName}
//                 className="w-full max-w-md h-64 object-cover rounded-lg shadow-md"
//               />
//             ) : (
//               <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg flex items-center justify-center">
//                 <FaUniversity size={64} className="text-gray-400" />
//               </div>
//             )}
//           </div>

//           {/* Basic Information */}
//           <div className="bg-gray-50 p-4 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2">Basic Information</h3>
//             <div className="space-y-3">
//               <div>
//                 <span className="font-medium text-gray-700">Category:</span>
//                 <span className="ml-2">{university.category || 'N/A'}</span>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Sub Categories:</span>
//                 <div className="ml-2 flex flex-wrap gap-1 mt-1">
//                   {university.subCategory && university.subCategory.length > 0 ? (
//                     university.subCategory.map((item, index) => (
//                       <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
//                         {item}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-gray-500">None specified</span>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Established Year:</span>
//                 <span className="ml-2">{university.establishedYear || 'N/A'}</span>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Website:</span>
//                 <span className="ml-2">
//                   {university.websiteURL ? (
//                     <a 
//                       href={university.websiteURL.startsWith('http') ? university.websiteURL : `https://${university.websiteURL}`}
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline"
//                     >
//                       {university.websiteURL}
//                     </a>
//                   ) : (
//                     'N/A'
//                   )}
//                 </span>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Email:</span>
//                 <span className="ml-2">{university.email_id || 'N/A'}</span>
//               </div>
//             </div>
//           </div>

//           {/* Address Information */}
//           <div className="bg-gray-50 p-4 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2">Address Information</h3>
//             <div className="space-y-3">
//               <div>
//                 <span className="font-medium text-gray-700">Address:</span>
//                 <p className="ml-2 text-gray-600">
//                   {university.address?.line1 || 'N/A'}
//                   {university.address?.line2 && <span>, {university.address.line2}</span>}
//                 </p>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Location:</span>
//                 <p className="ml-2 text-gray-600">
//                   {university.address?.taluka && <span>{university.address.taluka}, </span>}
//                   {university.address?.dist && <span>{university.address.dist}, </span>}
//                   {university.address?.state && <span>{university.address.state} </span>}
//                   {university.address?.pincode && <span>- {university.address.pincode}</span>}
//                 </p>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Landmarks:</span>
//                 <p className="ml-2 text-gray-600">
//                   {university.address?.nearbyLandmarks || 'N/A'}
//                 </p>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Authorized Person:</span>
//                 <p className="ml-2 text-gray-600">
//                   {university.address?.autorizedName || 'N/A'}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2">Description</h3>
//             <p className="text-gray-700 whitespace-pre-line">
//               {university.info?.description || 'No description available.'}
//             </p>
//           </div>

//           {/* Accreditation & Facilities */}
//           <div className="bg-gray-50 p-4 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2">Accreditation & Facilities</h3>
//             <div className="space-y-4">
//               <div>
//                 <span className="font-medium text-gray-700 block mb-2">Accreditation:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {university.accreditation && university.accreditation.length > 0 ? (
//                     university.accreditation.map((item, index) => (
//                       <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
//                         {item}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-gray-500">None specified</span>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700 block mb-2">Facilities:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {university.facilities && university.facilities.length > 0 ? (
//                     university.facilities.map((item, index) => (
//                       <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                         {item}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-gray-500">None specified</span>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700 block mb-2">Keywords:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {university.keywords && university.keywords.length > 0 ? (
//                     university.keywords.map((item, index) => (
//                       <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
//                         {item}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-gray-500">None specified</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Admission Information */}
//           <div className="bg-gray-50 p-4 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2">Admission Information</h3>
//             <div className="space-y-4">
//               <div>
//                 <span className="font-medium text-gray-700 block mb-2">Admission Process:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {university.admissionProcess && university.admissionProcess.length > 0 ? (
//                     university.admissionProcess.map((item, index) => (
//                       <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
//                         {item}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-gray-500">None specified</span>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700 block mb-2">Entrance Exams:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {university.entrance_exam_required && university.entrance_exam_required.length > 0 ? (
//                     university.entrance_exam_required.map((item, index) => (
//                       <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
//                         {item}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-gray-500">None specified</span>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Application Form:</span>
//                 <span className="ml-2">
//                   {university.applicationFormURL ? (
//                     <a 
//                       href={university.applicationFormURL.startsWith('http') ? university.applicationFormURL : `https://${university.applicationFormURL}`}
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline"
//                     >
//                       Apply Online
//                     </a>
//                   ) : (
//                     'N/A'
//                   )}
//                 </span>
//               </div>
//               <div>
//                 <span className="font-medium text-gray-700">Admission Period:</span>
//                 <p className="ml-2 text-gray-600">
//                   {university.admissionEntranceDetails?.admissionStartDate && 
//                    university.admissionEntranceDetails?.admissionEndDate ? (
//                     `${new Date(university.admissionEntranceDetails.admissionStartDate).toLocaleDateString()} to 
//                      ${new Date(university.admissionEntranceDetails.admissionEndDate).toLocaleDateString()}`
//                   ) : (
//                     'Not specified'
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ViewUniversityModal

"use client"

import { FaUniversity, FaTimes, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"

const ViewUniversityModal = ({ university, isOpen, onClose }) => {
  if (!isOpen || !university) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaUniversity /> {university.universityName}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* University Image */}
            <div className="flex justify-center">
              {university.image ? (
                <img
                  src={university.image || "/placeholder.svg"}
                  alt={university.universityName}
                  className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <FaUniversity size={64} className="text-gray-400" />
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div>
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Basic Information</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaGlobe className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Category</p>
                    <p>{university.category || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Established</p>
                    <p>{university.establishedYear || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{university.email_id || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaPhone className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Contact</p>
                    <p>{university.contactDetails || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaGlobe className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Website</p>
                    {university.websiteURL ? (
                      <a
                        href={
                          university.websiteURL.startsWith("http")
                            ? university.websiteURL
                            : `https://${university.websiteURL}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {university.websiteURL}
                      </a>
                    ) : (
                      <p>Not specified</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>
                      {university.address?.line1 ? (
                        <>
                          {university.address.line1},{university.address.line2 && `${university.address.line2}, `}
                          {university.address.dist && `${university.address.dist}, `}
                          {university.address.state && `${university.address.state}, `}
                          {university.address.pincode && university.address.pincode}
                        </>
                      ) : (
                        "Not specified"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">About University</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {university.info?.description || "No description available."}
            </p>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Left Column */}
            <div>
              {/* Accreditation */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Accreditation</h4>
                {university.accreditation && university.accreditation.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {university.accreditation.map((item, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No accreditation information available</p>
                )}
              </div>

              {/* Facilities */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Facilities</h4>
                {university.facilities && university.facilities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {university.facilities.map((item, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No facilities information available</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Entrance Exams */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Entrance Exams</h4>
                {university.entrance_exam_required && university.entrance_exam_required.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {university.entrance_exam_required.map((item, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No entrance exam information available</p>
                )}
              </div>

              {/* Admission Process */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Admission Process</h4>
                {university.admissionProcess && university.admissionProcess.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {university.admissionProcess.map((item, index) => (
                      <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No admission process information available</p>
                )}
              </div>
            </div>
          </div>

          {/* Admission Details */}
          {university.admissionEntranceDetails && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Admission Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold">Application Period</p>
                  {university.admissionEntranceDetails.admissionStartDate ? (
                    <p>
                      {new Date(university.admissionEntranceDetails.admissionStartDate).toLocaleDateString()} to{" "}
                      {university.admissionEntranceDetails.admissionEndDate
                        ? new Date(university.admissionEntranceDetails.admissionEndDate).toLocaleDateString()
                        : "Not specified"}
                    </p>
                  ) : (
                    <p className="text-gray-500">Not specified</p>
                  )}
                </div>

                <div>
                  <p className="font-semibold">Last Year Cutoff Marks</p>
                  <p>{university.admissionEntranceDetails.lastYearCutoffMarks || "Not specified"}</p>
                </div>

                <div>
                  <p className="font-semibold">Scholarships Available</p>
                  {university.admissionEntranceDetails.scholarshipsAvailable &&
                  university.admissionEntranceDetails.scholarshipsAvailable.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {university.admissionEntranceDetails.scholarshipsAvailable.map((item, index) => (
                        <span key={index} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Not specified</p>
                  )}
                </div>

                <div>
                  <p className="font-semibold">Quota System</p>
                  {university.admissionEntranceDetails.quotaSystem &&
                  university.admissionEntranceDetails.quotaSystem.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {university.admissionEntranceDetails.quotaSystem.map((item, index) => (
                        <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Not specified</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewUniversityModal
