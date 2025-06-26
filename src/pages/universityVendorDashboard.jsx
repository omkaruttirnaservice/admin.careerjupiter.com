

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { getCookie } from "../utlis/cookieHelper";
import {
  FaUniversity, 
  FaInfoCircle,
  FaCalendarDay,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaBook,
  FaClipboardList,
  FaClipboardCheck,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaBuilding,
  FaUserGraduate,
  FaBalanceScale
} from "react-icons/fa";

const UniversityVendorDashboard = () => {
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const universityId = getCookie("universityID");
        if (!universityId) {
          throw new Error("University ID not found in cookies");
        }

        const response = await axios.get(`${API_BASE_URL}/api/university/${universityId}`);
        setUniversity(response.data.data.university);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching university data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!university) return <div className="text-center py-8">No university data found</div>;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen md:p-8 p-2">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-800 to-purple-700">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 flex items-end">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center">
              <FaUniversity className="text-blue-600 text-3xl md:text-4xl" />
            </div>
            <div className="ml-4 text-white">
              <h1 className="text-xl md:text-3xl font-bold">
                {university.universityName}
              </h1>
              <p className="text-sm md:text-base">
                {university.category}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FaUniversity />
              <span>{university.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarDay />
              <span>Est. {university.establishedYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGraduationCap />
              <span>{university.accreditation?.join(", ") || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>
                {university.address?.dist}, {university.address?.state}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About University */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              About the University
            </h2>
            <p className="text-gray-700">
              {university.info?.description || "No description available"}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <FaBook className="text-blue-600" />
              Key Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <HighlightCard
                icon={<FaClipboardList className="text-green-600" />}
                title="Admissions"
                items={[
                  `Entrance Exams: ${university.entrance_exam_required?.join(", ") || "N/A"}`,
                  `Admission Dates: ${university.admissionEntranceDetails?.admissionStartDate ? 
                    new Date(university.admissionEntranceDetails.admissionStartDate).toLocaleDateString() : "N/A"} - ${
                    university.admissionEntranceDetails?.admissionEndDate ? 
                    new Date(university.admissionEntranceDetails.admissionEndDate).toLocaleDateString() : "N/A"}`,
                  `Last Year Cutoff: ${university.admissionEntranceDetails?.lastYearCutoffMarks || "N/A"}%`,
                  `Quota: ${university.admissionEntranceDetails?.quotaSystem?.join(", ") || "N/A"}`
                ]}
              />

              <HighlightCard
                icon={<FaClipboardCheck className="text-red-600" />}
                title="Contact"
                items={[
                  `Phone: ${university.contactDetails || "N/A"}`,
                  `Email: ${university.email_id || "N/A"}`,
                  `Website: ${university.websiteURL || "N/A"}`,
                  `Address: ${university.address?.line1 || "N/A"}, ${university.address?.dist || "N/A"}`
                ]}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Contact */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <FaPhone className="text-blue-600" />
              Quick Contact
            </h2>
            <div className="space-y-4">
              <ContactItem
                icon={<FaPhone className="text-green-600" />}
                label="Phone"
                value={university.contactDetails || "N/A"}
                link={university.contactDetails ? `tel:${university.contactDetails}` : null}
              />
              <ContactItem
                icon={<FaEnvelope className="text-red-600" />}
                label="Email"
                value={university.email_id || "N/A"}
                link={university.email_id ? `mailto:${university.email_id}` : null}
              />
              <ContactItem
                icon={<FaGlobe className="text-blue-600" />}
                label="Website"
                value={university.websiteURL || "N/A"}
                link={university.websiteURL || null}
              />
              <ContactItem
                icon={<FaMapMarkerAlt className="text-purple-600" />}
                label="Address"
                value={`${university.address?.line1 || "N/A"}, ${university.address?.dist || "N/A"}, ${university.address?.state || "N/A"} - ${university.address?.pincode || "N/A"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Keep your existing component definitions (HighlightCard, ContactItem, etc.)


// Component for Highlight Cards
const HighlightCard = ({ icon, title, items }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
    <div className="flex items-center gap-2 mb-3">
      <div className="text-xl">{icon}</div>
      <h3 className="font-bold text-blue-800">{title}</h3>
    </div>
    <ul className="space-y-2 text-sm">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-blue-500">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Component for Course Cards
const CourseCard = ({ course }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
    <h3 className="font-bold text-blue-800 mb-2">{course.name}</h3>
    <div className="flex flex-wrap gap-1 mb-2">
      {course.subCategory.map((sc, idx) => (
        <span
          key={idx}
          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
        >
          {sc}
        </span>
      ))}
    </div>
    <div className="text-sm space-y-1">
      <p>
        <span className="font-medium">Duration:</span> {course.duration} months
      </p>
      <p>
        <span className="font-medium">Eligibility:</span> {course.eligibility}
      </p>
      <p>
        <span className="font-medium">Intake:</span> {course.sanctionedIntake}
      </p>
      <p className="font-medium text-green-700">
        Fees: ₹{course.annualFees.toLocaleString()}/year
      </p>
    </div>
  </div>
);

// Component for Contact Items
const ContactItem = ({ icon, label, value, link }) => (
  <div className="flex items-start gap-3">
    <div className="text-xl mt-1">{icon}</div>
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p>{value}</p>
      )}
    </div>
  </div>
);

// Component for Stat Cards
const StatCard = ({ icon, title, value }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-100 text-center">
    <div className="text-2xl mb-1">{icon}</div>
    <h4 className="font-medium text-blue-800">{title}</h4>
    <p className="text-gray-700">{value}</p>
  </div>
);


export default UniversityVendorDashboard;