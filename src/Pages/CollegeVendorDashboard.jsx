import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import {
  FaUniversity,
  FaPhone,
  FaInfoCircle,
  FaCalendarAlt,
  FaTags,
  FaGlobe,
  FaLayerGroup,
  FaGraduationCap,
} from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { getCookie } from "../utlis/cookieHelper";

// const CollegeVendorDashboard = () => {
 
const CollegeVendorDashboard = () => {
    const [collegeDetails, setCollegeDetails] = useState(null);
    const [collegeID, setCollegeID] = useState(null); // State for storing the collegeId
  
    // Fetch the collegeId from cookies directly
    useEffect(() => {
      const collegeID = getCookie("collegeID"); // Directly fetch collegeId from cookies
    console.log("/////////////////",collegeID)
      if (collegeID) {
        setCollegeID(collegeID); // Set the retrieved collegeId in state
      } else {
        console.warn("College ID not found in cookies!"); // Log a warning if no collegeId found
      }
    }, []); // Only run this effect once when the component mounts
  
    console.log("**********",collegeID)
    // Fetch college details when collegeID changes
    useEffect(() => {
      const fetchCollegeDetails = async () => {
        if (!collegeID) return; // If collegeID is not available, do nothing
  
        try {
          const response = await axios.get(`${API_BASE_URL}/api/college/${collegeID}`);
  
          const data = response?.data?.data?.college;
          setCollegeDetails({
            ...data,
            address: Array.isArray(data?.address) ? data.address[0] : {},
            imageGallery: Array.isArray(data?.imageGallery) ? data.imageGallery : [],
            description: data?.info?.description || "No description available",
          });
        } catch (error) {
          console.error("Error fetching college details:", error?.response?.data || error.message);
        }
      };
  
      fetchCollegeDetails();
    }, [collegeID]); // Re-fetch data whenever collegeID changes
  

//   useEffect(() => {
//     const storedCollegeId = getCookie("collegeID");
//     if (storedCollegeId) {
//       setCollegeID(storedCollegeId);
//     } else {
//       console.warn("College ID not found in cookies!");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchCollegeDetails = async () => {
//       if (!collegeID) return;

//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/college/${collegeID}`);

//         console.log("**************",collegeID)
//         const data = response.data?.data?.college;

//         setCollegeDetails({
//           ...data,
//           address: Array.isArray(data?.address) ? data.address[0] : {},
//           imageGallery: Array.isArray(data?.imageGallery) ? data.imageGallery : [],
//           description: data?.info?.description || "No description available",
//         });
//       } catch (error) {
//         console.error("Error fetching college details:", error?.response?.data || error.message);
//       }
//     };

//     fetchCollegeDetails();
//   }, [collegeID]);




  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen p-4">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-white/80 to-indigo-100/90 backdrop-blur-lg shadow-2xl p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-xl">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[3px] animate-pulse" />
          <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full bg-indigo-600">
            <HiAcademicCap className="text-white text-5xl" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
            Welcome, <span className="text-indigo-600">{collegeDetails?.collegeName || "College Vendor"}</span> 👋
          </h2>
          <p className="text-lg text-gray-700 font-semibold">{collegeDetails?.affiliatedUniversity || "Affiliation"}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-white/80 shadow-xl p-4 rounded-2xl">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
          <FaInfoCircle className="text-pink-500" /> College Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "College Name",
              value: collegeDetails?.collegeName,
              icon: <FaUniversity className="text-blue-600 text-3xl" />,
              bg: "from-blue-100 to-blue-200",
            },
            {
              title: "Affiliated University",
              value: collegeDetails?.affiliatedUniversity,
              icon: <FaGraduationCap className="text-green-600 text-3xl" />,
              bg: "from-green-100 to-green-200",
            },
            // {
            //   title: "Contact Details",
            //   value: collegeDetails?.contactDetails,
            //   icon: <FaPhone className="text-purple-600 text-3xl" />,
            //   bg: "from-orange-100 to-orange-200",
            // },
            {
              title: "Established Year",
              value: collegeDetails?.establishedYear,
              icon: <FaCalendarAlt className="text-pink-600 text-3xl" />,
              bg: "from-pink-100 to-pink-200",
            },
            {
              title: "Website",
              value: collegeDetails?.websiteURL,
              icon: <FaGlobe className="text-indigo-600 text-3xl" />,
              bg: "from-indigo-100 to-indigo-200",
            },
            {
              title: "Keywords",
              value:
                collegeDetails?.keywords?.length > 0
                  ? collegeDetails.keywords.join(", ")
                  : "N/A",
              icon: <FaTags className="text-yellow-600 text-3xl" />,
              bg: "from-yellow-100 to-yellow-200",
            },
            // {
            //   title: "Category",
            //   value:
            //     collegeDetails?.category?.length > 0
            //       ? collegeDetails.category.join(", ")
            //       : "N/A",
            //   icon: <FaLayerGroup className="text-rose-600 text-3xl" />,
            //   bg: "from-rose-100 to-rose-200",
            // },
            {
              title: "Entrance Exams",
              value:
                collegeDetails?.entrance_exam_required?.length > 0
                  ? collegeDetails.entrance_exam_required.join(", ")
                  : "N/A",
              icon: <FaGraduationCap className="text-teal-600 text-3xl" />,
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
        <div className="bg-gradient-to-br from-fuchsia-100 to-violet-200 p-6 rounded-xl shadow-md mb-6">
          <h4 className="text-md font-bold mb-2 text-violet-800 flex items-center gap-2">
            <FaInfoCircle /> College Description
          </h4>
          <p className="text-gray-800 text-sm">{collegeDetails?.description}</p>
        </div>

        {/* Image Section */}
        <div>
          <h4 className="text-md font-bold text-gray-800 mb-4">College Image</h4>
          {collegeDetails?.image ? (
            <div className="relative group overflow-hidden rounded-xl shadow-md border-4 border-indigo-300 w-full sm:w-96">
              <img
                src={`${API_BASE_URL}${collegeDetails.image}`}
                alt="College"
                className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">No image available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeVendorDashboard;
