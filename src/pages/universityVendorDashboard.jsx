import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { getCookie } from "../utlis/cookieHelper";
import {
  FaUniversity,
  FaInfoCircle,
  FaCalendarAlt,
  FaTags,
  FaGlobe,
  FaLayerGroup,
  FaGraduationCap,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";

const UniversityVendorDashboard = () => {
  const [universityDetails, setUniversityDetails] = useState(null);
  const [universityId, setUniversityId] = useState(null);

    // ✅ Step 1: Get university ID from cookie (or storage)
  useEffect(() => {
    const idFromCookie = getCookie("universityID"); // Your cookie key
    if (idFromCookie) {
      setUniversityId(idFromCookie);
    } else {
      console.warn("University ID not found in cookies!");
    }
  }, []);

  useEffect(() => {
    const fetchUniversityDetails = async () => {
        if (!universityId) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/api/university/${universityId}`);
        const data = response?.data?.data?.university;

        setUniversityDetails({
          ...data,
          address: data?.address || {},
          description: data?.info?.description || "No description available",
          admissionEntranceDetails: data?.admissionEntranceDetails || {},
        });
      } catch (error) {
        console.error("Error fetching university details:", error?.response?.data || error.message);
      }
    };

    fetchUniversityDetails();
  }, [universityId]);

  return (
    <div className="flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 min-h-screen p-4">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-white/80 to-green-100/90 backdrop-blur-lg shadow-2xl p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-xl">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 to-lime-500 p-[3px] animate-pulse" />
          <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full bg-green-600">
            <HiAcademicCap className="text-white text-5xl" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
            Welcome, <span className="text-green-600">{universityDetails?.universityName || "University Vendor"}</span> 👋
          </h2>
          <p className="text-lg text-gray-700 font-semibold">{universityDetails?.address?.state || "State Info"}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-white/80 shadow-xl p-4 rounded-2xl">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
          <FaInfoCircle className="text-emerald-500" /> University Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "University Name",
              value: universityDetails?.universityName,
              icon: <FaUniversity className="text-green-600 text-3xl" />,
              bg: "from-green-100 to-green-200",
            },
            {
              title: "Website",
              value: universityDetails?.websiteURL,
              icon: <FaGlobe className="text-blue-600 text-3xl" />,
              bg: "from-blue-100 to-blue-200",
            },
            {
              title: "Address",
              value: `${universityDetails?.address?.line1 || ""}, ${universityDetails?.address?.line2 || ""}, ${universityDetails?.address?.dist || ""}`,
              icon: <FaMapMarkerAlt className="text-rose-600 text-3xl" />,
              bg: "from-rose-100 to-rose-200",
            },
            {
              title: "Pincode",
              value: universityDetails?.address?.pincode,
              icon: <FaTags className="text-yellow-600 text-3xl" />,
              bg: "from-yellow-100 to-yellow-200",
            },
            {
              title: "Authorized Person",
              value: `${universityDetails?.address?.autorizedName} (${universityDetails?.address?.autorizedPhono})`,
              icon: <FaPhone className="text-indigo-600 text-3xl" />,
              bg: "from-indigo-100 to-indigo-200",
            },
            {
              title: "Nearby Landmark",
              value: universityDetails?.address?.nearbyLandmarks,
              icon: <FaLayerGroup className="text-teal-600 text-3xl" />,
              bg: "from-teal-100 to-teal-200",
            },
          ].map((info, idx) => (
            <div
              key={idx}
              className={`group bg-gradient-to-br ${info.bg} p-6 rounded-xl shadow-md flex items-start gap-4 hover:scale-105 transition duration-300`}
            >
              {info.icon}
              <div>
                <h4 className="text-md font-bold text-gray-800">{info.title}</h4>
                <p className="text-gray-700 text-sm break-words">{info.value || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-6 rounded-xl shadow-md mb-6">
          <h4 className="text-md font-bold mb-2 text-emerald-800 flex items-center gap-2">
            <FaInfoCircle /> University Description
          </h4>
          <p className="text-gray-800 text-sm">{universityDetails?.description}</p>
        </div>

        {/* Admission Details */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-6 rounded-xl shadow-md">
          <h4 className="text-md font-bold mb-4 text-orange-800 flex items-center gap-2">
            <FaGraduationCap /> Admission Entrance Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Start Date:</strong>{" "}
              {new Date(universityDetails?.admissionEntranceDetails?.admissionStartDate).toLocaleDateString() || "N/A"}
            </div>
            <div>
              <strong>End Date:</strong>{" "}
              {new Date(universityDetails?.admissionEntranceDetails?.admissionEndDate).toLocaleDateString() || "N/A"}
            </div>
            <div>
              <strong>Last Year Cutoff Marks:</strong>{" "}
              {universityDetails?.admissionEntranceDetails?.lastYearCutoffMarks || "N/A"}
            </div>
            <div>
              <strong>Scholarships Available:</strong>{" "}
              {universityDetails?.admissionEntranceDetails?.scholarshipsAvailable?.join(", ") || "N/A"}
            </div>
            <div>
              <strong>Quota System:</strong>{" "}
              {universityDetails?.admissionEntranceDetails?.quotaSystem?.join(", ") || "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityVendorDashboard;
