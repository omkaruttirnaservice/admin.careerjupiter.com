import {
  FaUniversity,
  FaTimes,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaImage,
  FaInfoCircle,
  FaBook,
  FaAward,
  FaCheckCircle,
  FaBuilding,
  FaCheck,
  FaClipboardList,
  FaEdit,
  FaUserGraduate,
  FaClipboardCheck,
  FaCalendarDay,
  FaChartLine,
  FaMedal,
  FaBalanceScale,
} from "react-icons/fa";
import { API_BASE_URL } from "../constant/constantBaseUrl";

const ViewUniversityModal = ({ university, isOpen, onClose }) => {
  // Don't render the modal if it's closed or university data is missing
  if (!isOpen || !university) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-400 text-white p-5 rounded-t-xl flex justify-between items-center z-10 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <FaUniversity className="text-2xl" />
            </div>

            {/* University Name as Heading Name  */}
            <h2 className="text-2xl font-bold tracking-tight">
              {university.universityName}
            </h2>
          </div>

          {/* Modal Close Button  */}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Top Section - Image and Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* University Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaImage className="text-indigo-500" />
                University Image
              </h3>
              {university?.image ? (
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={`${API_BASE_URL}${university.image}`}
                    alt={university.universityName || "University"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner">
                  <FaUniversity className="text-5xl text-gray-400" />
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                <FaInfoCircle className="text-indigo-500" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Stream - (Category) */}
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
                    <FaGlobe className="text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-sm">Stream</p>
                    <p className="font-semibold">
                      {university.category || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Established Year */}
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
                    <FaCalendarAlt className="text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-sm">
                      Established
                    </p>
                    <p className="font-semibold">
                      {university.establishedYear || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Email ID */}
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-sm">Email</p>
                    <p className="font-semibold">
                      {university.email_id || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
                    <FaPhone className="text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-sm">Contact</p>
                    <p className="font-semibold">
                      {university.contactDetails || "N/A"}
                    </p>
                  </div>
                </div>

                {/* University Url */}
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
                    <FaGlobe className="text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-sm">Website</p>
                    {university.websiteURL ? (
                      <a
                        href={
                          university.websiteURL.startsWith("http")
                            ? university.websiteURL
                            : `https://${university.websiteURL}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 hover:underline"
                      >
                        {university.websiteURL}
                      </a>
                    ) : (
                      <p className="font-semibold">N/A</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg md:col-span-2">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
                    <FaMapMarkerAlt className="text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-sm">Address</p>
                    <p className="font-semibold">
                      {university.address?.line1 ? (
                        <>
                          {university.address.line1}
                          {university.address.line2 && (
                            <>, {university.address.line2}</>
                          )}
                          <br />
                          {university.address.dist && (
                            <>{university.address.dist}, </>
                          )}
                          {university.address.state && (
                            <>{university.address.state}, </>
                          )}
                          {university.address.pincode &&
                            university.address.pincode}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
              <FaBook className="text-indigo-500" />
              About University
            </h3>
            <div className="prose max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg">
              {university.info?.description || "No description available."}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Accreditation */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaAward className="text-indigo-500" />
                  Accreditation
                </h4>
                {university.accreditation?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {university.accreditation.map((item, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                      >
                        <FaCheckCircle className="text-xs" /> {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No accreditation information
                  </p>
                )}
              </div>

              {/* Facilities */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaBuilding className="text-indigo-500" />
                  Facilities
                </h4>
                {university.facilities?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {university.facilities
                      .join(",")
                      .split(",")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"
                        >
                          <FaCheck className="text-green-500 text-xs" />
                          <span className="text-sm">{item.trim()}</span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No facilities information
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Entrance Exams */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaClipboardList className="text-indigo-500" />
                  Entrance Exams
                </h4>
                {university.entrance_exam_required?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {university.entrance_exam_required.map((item, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                      >
                        <FaEdit className="text-xs" /> {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No entrance exam information
                  </p>
                )}
              </div>

              {/* Admission Process */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaUserGraduate className="text-indigo-500" />
                  Admission Process
                </h4>
                {university.admissionProcess?.length > 0 ? (
                  <ul className="space-y-2 list-disc pl-5">
                    {university.admissionProcess.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">
                    No admission process information
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Admission Details */}
          {university.admissionEntranceDetails && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                <FaClipboardCheck className="text-indigo-500" />
                Admission Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Application Period */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendarDay className="text-blue-500" />
                    <h4 className="font-medium text-blue-800">
                      Application Period
                    </h4>
                  </div>
                  {university.admissionEntranceDetails.admissionStartDate ? (
                    <p className="text-gray-700">
                      {new Date(
                        university.admissionEntranceDetails.admissionStartDate
                      ).toLocaleDateString()}{" "}
                      to{" "}
                      {university.admissionEntranceDetails.admissionEndDate
                        ? new Date(
                            university.admissionEntranceDetails.admissionEndDate
                          ).toLocaleDateString()
                        : "Not specified"}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Not specified</p>
                  )}
                </div>

                {/* Cutoff Marks */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaChartLine className="text-green-500" />
                    <h4 className="font-medium text-green-800">
                      Last Year Cutoff
                    </h4>
                  </div>
                  <p className="text-gray-700">
                    {university.admissionEntranceDetails.lastYearCutoffMarks ||
                      "N/A"}
                  </p>
                </div>

                {/* Scholarships */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaMedal className="text-yellow-500" />
                    <h4 className="font-medium text-yellow-800">
                      Scholarships
                    </h4>
                  </div>
                  {university.admissionEntranceDetails.scholarshipsAvailable
                    ?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {university.admissionEntranceDetails.scholarshipsAvailable.map(
                        (item, index) => (
                          <span
                            key={index}
                            className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs"
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Not specified</p>
                  )}
                </div>

                {/* Quota System */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaBalanceScale className="text-purple-500" />
                    <h4 className="font-medium text-purple-800">
                      Quota System
                    </h4>
                  </div>
                  {university.admissionEntranceDetails.quotaSystem?.length >
                  0 ? (
                    <div className="flex flex-wrap gap-2">
                      {university.admissionEntranceDetails.quotaSystem.map(
                        (item, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Not specified</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUniversityModal;
