import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import {
  FaPhone,
  FaGlobe,
  FaEnvelope,
  FaUniversity,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBook,
  FaBuilding,
  FaClipboardList,
  FaUserGraduate,
  FaClipboardCheck,
  FaCalendarDay,
  FaBalanceScale,
  FaInfoCircle,
} from "react-icons/fa";
import { getCookie } from "../utlis/cookieHelper";

const CollegeVendorDashboard = () => {
  const [collegeData, setCollegeData] = useState(null);
  const [collegeID, setCollegeID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const id = getCookie("collegeID");
    if (id) setCollegeID(id);
    else console.warn("College ID not found in cookies!");
  }, []);

  useEffect(() => {
    if (!collegeID) return;

    const fetchCollegeData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/college/${collegeID}`);
        setCollegeData(res.data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching college details:", error);
        setLoading(false);
      }
    };

    fetchCollegeData();
  }, [collegeID]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!collegeData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load college data. Please try again later.
      </div>
    );
  }

  const { college, courses, infrastructure, placements } = collegeData;
  const address = college.address?.[0] || {};
  const infra = infrastructure?.infrastructure?.[0] || {};
  const placement = college.placements?.[0]?.placement?.[0] || {};

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen md:p-8 p-2">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-48 md:h-64">
          <img
            src={`${API_BASE_URL}${college.image}`}
            alt={college.collegeName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 flex items-end">
            <img
              src={`${API_BASE_URL}${college.logo}`}
              alt="Logo"
              className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="ml-4 text-white">
              <h1 className="text-xl md:text-3xl font-bold">
                {college.collegeName}
              </h1>
              <p className="text-sm md:text-base">
                {college.affiliatedUniversity}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FaUniversity />
              <span>{college.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarDay />
              <span>Est. {college.establishedYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGraduationCap />
              <span>{college.accreditation}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>
                {address.dist}, {address.state}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About College */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-blue-600" />
              About the College
            </h2>
            <p className="text-gray-700">
              {readMore
                ? college.info.description
                : `${college.info.description.substring(0, 200)}...`}
              <button
                onClick={() => setReadMore(!readMore)}
                className="ml-2 text-blue-600 font-medium hover:underline"
              >
                {readMore ? "Show Less" : "Read More"}
              </button>
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
                  `Entrance Exams: ${
                    college.entrance_exam_required?.join(", ") || "N/A"
                  }`,
                  `College Type: ${college.collegeType || "N/A"}`,
                  `Hostel: ${
                    infra.hostelAvailability ? "Available" : "Not Available"
                  }`,
                  `Transport: ${infra.transportFacility?.join(", ") || "N/A"}`,
                ]}
              />

              <HighlightCard
                icon={<FaClipboardCheck className="text-red-600" />}
                title="Contact"
                items={[
                  `Phone: ${college.contactDetails || "N/A"}`,
                  `Email: ${college.email_id || "N/A"}`,
                  `Website: ${college.websiteURL || "N/A"}`,
                  `Address: ${address.line1}, ${address.dist}`,
                ]}
              />
            </div>
          </div>

          {/* Courses Offered */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <FaGraduationCap className="text-blue-600" />
              Courses Offered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses[0]?.courses?.slice(0, 2).map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
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
                value={college.contactDetails}
                link={`tel:${college.contactDetails}`}
              />
              <ContactItem
                icon={<FaEnvelope className="text-red-600" />}
                label="Email"
                value={college.email_id}
                link={`mailto:${college.email_id}`}
              />
              <ContactItem
                icon={<FaGlobe className="text-blue-600" />}
                label="Website"
                value={college.websiteURL}
                link={college.websiteURL}
              />
              <ContactItem
                icon={<FaMapMarkerAlt className="text-purple-600" />}
                label="Address"
                value={`${address.line1}, ${address.dist}, ${address.state} - ${address.pincode}`}
              />
            </div>
          </div>

          {/* Infrastructure Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <FaBuilding className="text-blue-600" />
              Infrastructure
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={<FaBook className="text-yellow-600" />}
                title="Library"
                value={infra.library?.size || "N/A"}
              />
              <StatCard
                icon={<FaUniversity className="text-green-600" />}
                title="Classrooms"
                value={infra.numberOfClassrooms || "N/A"}
              />
              <StatCard
                icon={<FaClipboardList className="text-red-600" />}
                title="Labs"
                value={infra.numberOfLabs || "N/A"}
              />
              <StatCard
                icon={<FaUserGraduate className="text-purple-600" />}
                title="Sports"
                value={infra.sportsFacilities?.join(", ") || "N/A"}
              />
              <StatCard
                icon={<FaMapMarkerAlt className="text-blue-600" />}
                title="Hostel"
                value={infra.hostelAvailability ? "Available" : "Not Available"}
              />
              <StatCard
                icon={<FaBalanceScale className="text-orange-600" />}
                title="Canteen"
                value={
                  infra.canteenAndFoodServices ? "Available" : "Not Available"
                }
              />
            </div>
          </div>
        </div>
      </div>

    {/* Gallery */}
      {college.imageGallery?.length > 0 && (
        <div className="w-full mt-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <FaUniversity className="text-blue-600" />
              Gallery
            </h2>

            <div className="overflow-x-auto">
              <div className="inline-flex gap-4">
                {college.imageGallery.map((image, index) => (
                  <img
                    key={index}
                    src={`${API_BASE_URL}${image}`}
                    alt={`Gallery ${index + 1}`}
                    className="h-40 rounded-lg cursor-pointer hover:opacity-80 transition"
                    onClick={() =>
                      window.open(`${API_BASE_URL}${image}`, "_blank")
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
        <span className="font-medium">Duration:</span> {course.duration} years
      </p>
      <p>
        <span className="font-medium">Eligibility:</span> {course.eligibility}
      </p>
      <p className="font-medium text-green-700">
        Fees: ₹{(course.annualFees / 100000).toLocaleString()} Lakhs/year
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

export default CollegeVendorDashboard;
