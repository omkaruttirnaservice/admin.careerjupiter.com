import {
  FaUniversity,
  FaTimes,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { API_BASE_URL } from "../constant/constantBaseUrl";

const ViewUniversityModal = ({ university, isOpen, onClose }) => {
  if (!isOpen || !university) return null;

  const getImageUrl = (img) => {
    if (!img) return null;

    if (img.startsWith("http") || img.startsWith("data:")) return img;
    return `{${API_BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-700 to-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaUniversity /> {university.universityName}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* University Image */}
            <div className="flex justify-center">
              {console.log(
                "University Image URL:",
                getImageUrl(university.image)
              )}
              {university.image ? (
                <img
                  src={getImageUrl(university.image)}
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
              <h3 className="text-xl font-bold mb-4 border-b pb-2">
                Basic Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaGlobe className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Category</p>
                    <p>{university.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Established</p>
                    <p>{university.establishedYear}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{university.email_id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaPhone className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold">Contact</p>
                    <p>{university.contactDetails}</p>
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
                          {university.address.line1},
                          {university.address.line2 &&
                            `${university.address.line2}, `}
                          {university.address.dist &&
                            `${university.address.dist}, `}
                          {university.address.state &&
                            `${university.address.state}, `}
                          {university.address.pincode &&
                            university.address.pincode}
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
            <h3 className="text-xl font-bold mb-4 border-b pb-2">
              About University
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {university.info?.description}
            </p>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Left Column */}
            <div>
              {/* Accreditation */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Accreditation</h4>
                {university.accreditation &&
                university.accreditation.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {university.accreditation.map((item, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No accreditation information available
                  </p>
                )}
              </div>

              {/* Facilities */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Facilities</h4>
                {university.facilities && university.facilities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {university.facilities
                      .join(",") // In case some are arrays of strings
                      .split(",")
                      .map((item, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm shadow-sm"
                        >
                          {item.trim()}
                        </span>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No facilities information available
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Entrance Exams */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Entrance Exams</h4>
                {university.entrance_exam_required &&
                university.entrance_exam_required.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {university.entrance_exam_required.map((item, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No entrance exam information available
                  </p>
                )}
              </div>

              {/* Admission Process */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">
                  Admission Process
                </h4>
                {university.admissionProcess &&
                university.admissionProcess.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {university.admissionProcess.map((item, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No admission process information available
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Admission Details */}
          {university.admissionEntranceDetails && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">
                Admission Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold">Application Period</p>
                  {university.admissionEntranceDetails.admissionStartDate ? (
                    <p>
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
                    <p className="text-gray-500">Not specified</p>
                  )}
                </div>

                <div>
                  <p className="font-semibold">Last Year Cutoff Marks</p>
                  <p>
                    {university.admissionEntranceDetails.lastYearCutoffMarks}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Scholarships Available</p>
                  {university.admissionEntranceDetails.scholarshipsAvailable &&
                  university.admissionEntranceDetails.scholarshipsAvailable
                    .length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {university.admissionEntranceDetails.scholarshipsAvailable.map(
                        (item, index) => (
                          <span
                            key={index}
                            className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
                          >
                            {item}
                          </span>
                        )
                      )}
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
                      {university.admissionEntranceDetails.quotaSystem.map(
                        (item, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                          >
                            {item}
                          </span>
                        )
                      )}
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
  );
};

export default ViewUniversityModal;
