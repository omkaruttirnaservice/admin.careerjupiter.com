// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl";
// import {
//   FaUniversity,
//   FaPhone,
//   FaInfoCircle,
//   FaCalendarAlt,
//   FaTags,
//   FaGlobe,
//   FaLayerGroup,
//   FaGraduationCap,
// } from "react-icons/fa";
// import { HiAcademicCap } from "react-icons/hi";
// import { getCookie } from "../utlis/cookieHelper";

// // const CollegeVendorDashboard = () => {

// const CollegeVendorDashboard = () => {
//     const [collegeDetails, setCollegeDetails] = useState(null);
//     const [collegeID, setCollegeID] = useState(null); // State for storing the collegeId

//     // Fetch the collegeId from cookies directly
//     useEffect(() => {
//       const collegeID = getCookie("collegeID"); // Directly fetch collegeId from cookies
//     console.log("/////////////////",collegeID)
//       if (collegeID) {
//         setCollegeID(collegeID); // Set the retrieved collegeId in state
//       } else {
//         console.warn("College ID not found in cookies!"); // Log a warning if no collegeId found
//       }
//     }, []); // Only run this effect once when the component mounts

//     console.log("**********",collegeID)
//     // Fetch college details when collegeID changes
//     useEffect(() => {
//       const fetchCollegeDetails = async () => {
//         if (!collegeID) return; // If collegeID is not available, do nothing

//         try {
//           const response = await axios.get(`${API_BASE_URL}/api/college/${collegeID}`);

//           const data = response?.data?.data?.college;
//           setCollegeDetails({
//             ...data,
//             address: Array.isArray(data?.address) ? data.address[0] : {},
//             imageGallery: Array.isArray(data?.imageGallery) ? data.imageGallery : [],
//             description: data?.info?.description || "No description available",
//           });
//         } catch (error) {
//           console.error("Error fetching college details:", error?.response?.data || error.message);
//         }
//       };

//       fetchCollegeDetails();
//     }, [collegeID]); // Re-fetch data whenever collegeID changes

// //   useEffect(() => {
// //     const storedCollegeId = getCookie("collegeID");
// //     if (storedCollegeId) {
// //       setCollegeID(storedCollegeId);
// //     } else {
// //       console.warn("College ID not found in cookies!");
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const fetchCollegeDetails = async () => {
// //       if (!collegeID) return;

// //       try {
// //         const response = await axios.get(`${API_BASE_URL}/api/college/${collegeID}`);

// //         console.log("**************",collegeID)
// //         const data = response.data?.data?.college;

// //         setCollegeDetails({
// //           ...data,
// //           address: Array.isArray(data?.address) ? data.address[0] : {},
// //           imageGallery: Array.isArray(data?.imageGallery) ? data.imageGallery : [],
// //           description: data?.info?.description || "No description available",
// //         });
// //       } catch (error) {
// //         console.error("Error fetching college details:", error?.response?.data || error.message);
// //       }
// //     };

// //     fetchCollegeDetails();
// //   }, [collegeID]);

//   return (
//     <div className="flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen p-4">
//       {/* Header */}
//       <div className="relative bg-gradient-to-br from-white/80 to-indigo-100/90 backdrop-blur-lg shadow-2xl p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 mb-8">
//         <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-xl">
//           <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[3px] animate-pulse" />
//           <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full bg-indigo-600">
//             <HiAcademicCap className="text-white text-5xl" />
//           </div>
//         </div>
//         <div className="text-center sm:text-left">
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
//             Welcome, <span className="text-indigo-600">{collegeDetails?.collegeName || "College Vendor"}</span> 👋
//           </h2>
//           <p className="text-lg text-gray-700 font-semibold">{collegeDetails?.affiliatedUniversity || "Affiliation"}</p>
//         </div>
//       </div>

//       {/* Info Grid */}
//       <div className="bg-white/80 shadow-xl p-4 rounded-2xl">
//         <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
//           <FaInfoCircle className="text-pink-500" /> College Details
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {[
//             {
//               title: "College Name",
//               value: collegeDetails?.collegeName,
//               icon: <FaUniversity className="text-blue-600 text-3xl" />,
//               bg: "from-blue-100 to-blue-200",
//             },
//             {
//               title: "Affiliated University",
//               value: collegeDetails?.affiliatedUniversity,
//               icon: <FaGraduationCap className="text-green-600 text-3xl" />,
//               bg: "from-green-100 to-green-200",
//             },
//             // {
//             //   title: "Contact Details",
//             //   value: collegeDetails?.contactDetails,
//             //   icon: <FaPhone className="text-purple-600 text-3xl" />,
//             //   bg: "from-orange-100 to-orange-200",
//             // },
//             {
//               title: "Established Year",
//               value: collegeDetails?.establishedYear,
//               icon: <FaCalendarAlt className="text-pink-600 text-3xl" />,
//               bg: "from-pink-100 to-pink-200",
//             },
//             {
//               title: "Website",
//               value: collegeDetails?.websiteURL,
//               icon: <FaGlobe className="text-indigo-600 text-3xl" />,
//               bg: "from-indigo-100 to-indigo-200",
//             },
//             {
//               title: "Keywords",
//               value:
//                 collegeDetails?.keywords?.length > 0
//                   ? collegeDetails.keywords.join(", ")
//                   : "N/A",
//               icon: <FaTags className="text-yellow-600 text-3xl" />,
//               bg: "from-yellow-100 to-yellow-200",
//             },
//             // {
//             //   title: "Category",
//             //   value:
//             //     collegeDetails?.category?.length > 0
//             //       ? collegeDetails.category.join(", ")
//             //       : "N/A",
//             //   icon: <FaLayerGroup className="text-rose-600 text-3xl" />,
//             //   bg: "from-rose-100 to-rose-200",
//             // },
//             {
//               title: "Entrance Exams",
//               value:
//                 collegeDetails?.entrance_exam_required?.length > 0
//                   ? collegeDetails.entrance_exam_required.join(", ")
//                   : "N/A",
//               icon: <FaGraduationCap className="text-teal-600 text-3xl" />,
//               bg: "from-teal-100 to-teal-200",
//             },
//           ].map((info, idx) => (
//             <div
//               key={idx}
//               className={`group bg-gradient-to-br ${info.bg} p-6 rounded-xl shadow-md flex items-start gap-4 hover:scale-105 transition duration-300`}
//             >
//               {info.icon}
//               <div>
//                 <h4 className="text-md font-bold text-gray-800">{info.title}</h4>
//                 <p className="text-gray-700 text-sm break-words">{info.value || "N/A"}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Description */}
//         <div className="bg-gradient-to-br from-fuchsia-100 to-violet-200 p-6 rounded-xl shadow-md mb-6">
//           <h4 className="text-md font-bold mb-2 text-violet-800 flex items-center gap-2">
//             <FaInfoCircle /> College Description
//           </h4>
//           <p className="text-gray-800 text-sm">{collegeDetails?.description}</p>
//         </div>

//         {/* Image Section */}
//         <div>
//           <h4 className="text-md font-bold text-gray-800 mb-4">College Image</h4>
//           {collegeDetails?.image ? (
//             <div className="relative group overflow-hidden rounded-xl shadow-md border-4 border-indigo-300 w-full sm:w-96">
//               <img
//                 src={`${API_BASE_URL}${collegeDetails.image}`}
//                 alt="College"
//                 className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
//               />
//             </div>
//           ) : (
//             <p className="text-gray-500 italic">No image available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollegeVendorDashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl";
// import {
//   FaUniversity,
//   FaPhone,
//   FaInfoCircle,
//   FaCalendarAlt,
//   FaTags,
//   FaGlobe,
//   FaLayerGroup,
//   FaGraduationCap,
//   FaTimes,
// } from "react-icons/fa";
// import { HiAcademicCap } from "react-icons/hi";
// import { getCookie } from "../utlis/cookieHelper";

// const tabs = [
//   { id: "basic", label: "Basic Info" },
//   { id: "keywords", label: "Keywords" },
//   { id: "exams", label: "Entrance Exams" },
// ];

// const CollegeVendorDashboard = () => {
//   const [collegeDetails, setCollegeDetails] = useState(null);
//   const [collegeID, setCollegeID] = useState(null);
//   const [activeTab, setActiveTab] = useState("basic");
//   const [lightboxIndex, setLightboxIndex] = useState(null);
//   //  const { college, courses, infrastructure, placements } = data;
//   const [readMore, setReadMore] = useState(false);

//   useEffect(() => {
//     const id = getCookie("collegeID");
//     if (id) setCollegeID(id);
//     else console.warn("College ID not found in cookies!");
//   }, []);

//   useEffect(() => {
//     if (!collegeID) return;

//     const fetchCollegeDetails = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/college/${collegeID}`);
//         const data = res.data?.data?.college;

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

//   if (!collegeDetails) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-indigo-600 font-semibold text-xl">
//         Loading College Details...
//       </div>
//     );
//   }

//   const { collegeName, affiliatedUniversity, establishedYear, websiteURL, keywords, entrance_exam_required, description, imageGallery } = collegeDetails;

//   return (
//     <div className="max-w-7xl mx-auto p-6 font-sans text-gray-800">
//       {/* Header/Hero */}
//       <div className="relative rounded-lg overflow-hidden shadow-lg mb-8">
//         <img
//           src={collegeDetails.image}
//           alt={collegeDetails.collegeName}
//           className="w-full h-60 object-cover"
//         />
//         <img
//           src={collegeDetails.logo}
//           alt="Logo"
//           className="absolute bottom-0 left-6 w-24 h-24 rounded-full border-4 border-white shadow-md -mb-12"
//         />
//       </div>
//       <div className="ml-32 mb-6">
//         <h1 className="text-4xl font-bold">{collegeDetails.collegeName}</h1>
//         <div className="flex space-x-3 mt-2">
//           <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//             {collegeDetails.category}
//           </span>
//           <span className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
//             Affiliated: {collegeDetails.affiliatedUniversity}
//           </span>
//         </div>
//       </div>

//       {/* Description */}
//       <p className="mb-4 max-w-3xl text-gray-700">
//         {readMore
//           ? collegeDetails.info.description
//           : collegeDetails.info.description.slice(0, 150) + '...'}
//         <button
//           onClick={() => setReadMore(!readMore)}
//           className="ml-2 text-blue-600 font-semibold underline hover:text-blue-800"
//         >
//           {readMore ? 'Show Less' : 'Read More'}
//         </button>
//       </p>

//       {/* Contact & Website Buttons */}
//       <div className="flex space-x-4 mb-12">
//         <a
//           href={`tel:${collegeDetails.contactDetails}`}
//           className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700"
//         >
//           Call: {collegeDetails.contactDetails}
//         </a>
//         <a
//           href={collegeDetails.websiteURL}
//           target="_blank"
//           rel="noreferrer"
//           className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700"
//         >
//           Visit Website
//         </a>
//         <a
//           href={`mailto:${collegeDetails.email_id}`}
//           className="bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-800"
//         >
//           Email Principal
//         </a>
//       </div>

//       {/* Key Info Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
//         <InfoCard title="Established" value={collegeDetails.establishedYear} icon="🎓" />
//         <InfoCard title="Accreditation" value={collegeDetails.accreditation} icon="🏅" />
//         <InfoCard title="Type" value={collegeDetails.collegeType} icon="🏛️" />
//         <InfoCard
//           title="Entrance Exams"
//           value={collegeDetails.entrance_exam_required.join(', ')}
//           icon="📝"
//         />
//         <InfoCard title="Category" value={collegeDetails.category} icon="📚" />
//       </div>

//       {/* Courses Section */}
//       {/* <section className="mb-12">
//         <h2 className="text-3xl font-semibold mb-6 border-b-2 border-blue-600 inline-block">
//           Courses Offered
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {courses[0].courses.map((course) => (
//             <CourseCard key={course._id} course={course} />
//           ))}
//         </div>
//       </section> */}

//       {/* Infrastructure */}
//       {/* <section className="mb-12">
//         <h2 className="text-3xl font-semibold mb-6 border-b-2 border-blue-600 inline-block">
//           Infrastructure
//         </h2>
//         <InfrastructureCard infrastructure={infrastructure.infrastructure[0]} />
//       </section> */}

//       {/* Placements */}
//       {/* <section className="mb-12">
//         <h2 className="text-3xl font-semibold mb-6 border-b-2 border-blue-600 inline-block">
//           Placements
//         </h2>
//         <PlacementCard placement={placements[0].placement[0]} />
//       </section> */}

//       {/* Address */}
//       {/* <section className="mb-12 max-w-3xl mx-auto">
//         <h2 className="text-3xl font-semibold mb-6 border-b-2 border-blue-600 inline-block">
//           Address & Contact
//         </h2>
//         <AddressCard address={collegeDetails.address[0]} />
//       </section> */}
//     </div>
//   );
// }

// function InfoCard({ title, value, icon }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
//       <div className="text-3xl">{icon}</div>
//       <div>
//         <h4 className="text-gray-500 text-sm">{title}</h4>
//         <p className="font-semibold text-lg">{value}</p>
//       </div>
//     </div>
//   );
// }

// function CourseCard({ course }) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//       <h3 className="text-xl font-bold mb-1">{course.name}</h3>
//       <div className="mb-2">
//         {course.subCategory.map((sc) => (
//           <span
//             key={sc}
//             className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2 text-xs font-semibold"
//           >
//             {sc}
//           </span>
//         ))}
//       </div>
//       <p className="mb-1">
//         <strong>Duration:</strong> {course.duration} years
//       </p>
//       <p className="mb-1">
//         <strong>Eligibility:</strong> {course.eligibility}
//       </p>
//       <p className="mb-1 font-semibold text-green-700">
//         Fees: ₹{(course.annualFees / 100000).toLocaleString()} Lakhs/year
//       </p>
//     </div>
//   );
// }

// function InfrastructureCard({ infrastructure }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//       <IconInfo icon="📚" title="Library" value={infrastructure.library.size} />
//       <IconInfo icon="🏫" title="Classrooms" value={infrastructure.numberOfClassrooms} />
//       <IconInfo icon="🔬" title="Labs" value={infrastructure.numberOfLabs} />
//       <IconInfo icon="🏅" title="Sports" value={infrastructure.sportsFacilities.join(', ')} />
//       <IconInfo icon="🏠" title="Hostel" value={infrastructure.hostelAvailability ? 'Available' : 'No'} />
//       <IconInfo icon="🍽️" title="Canteen" value={infrastructure.canteenAndFoodServices ? 'Yes' : 'No'} />
//       <IconInfo icon="🏥" title="Medical" value={infrastructure.medicalFacilities ? 'Yes' : 'No'} />
//       <IconInfo icon="🚌" title="Transport" value={infrastructure.transportFacility.join(', ')} />
//     </div>
//   );
// }

// function IconInfo({ icon, title, value }) {
//   return (
//     <div className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-blue-50 transition-colors">
//       <div className="text-2xl">{icon}</div>
//       <div>
//         <h5 className="font-semibold text-gray-600">{title}</h5>
//         <p className="text-gray-700">{value}</p>
//       </div>
//     </div>
//   );
// }

// function PlacementCard({ placement }) {
//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row md:items-center md:space-x-12">
//       <div className="text-center md:text-left mb-6 md:mb-0">
//         <h3 className="text-4xl font-bold text-green-600">{placement.placementPercentage}%</h3>
//         <p className="text-gray-500 font-semibold">Placement Rate</p>
//       </div>
//       <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Stat label="Top Recruiters" value={placement.topRecruiters} />
//         <Stat label="Highest Package (LPA)" value={placement.highestPackage} />
//         <Stat label="Internships" value={placement.internshipOpportunities ? 'Available' : 'Not Available'} />
//         <Stat label="Students Placed" value={placement.noOfStudents} />
//       </div>
//     </div>
//   );
// }

// function Stat({ label, value }) {
//   return (
//     <div>
//       <p className="font-semibold text-gray-700">{label}</p>
//       <p className="text-lg">{value}</p>
//     </div>
//   );
// }

// function AddressCard({ address }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <p className="mb-1 font-semibold">{address.line1}</p>
//       <p className="mb-1">{address.line2}</p>
//       <p className="mb-1">
//         {address.dist}, {address.taluka}, {address.state} - {address.pincode}
//       </p>
//       <p className="mb-1">Landmark: {address.nearbyLandmarks}</p>
//       <p className="mb-1">
//         Authorized Person: {address.autorizedName} ({address.designation})
//       </p>
//       <p>Phone: {address.autorizedPhono}</p>
//     </div>
//   );

// };

// export default CollegeVendorDashboard;

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
  FaChartLine,
  FaMedal,
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
  // const placement = college.placements?.placement?.[0] || {};
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
        <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
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
              {/* <HighlightCard
                icon={<FaBuilding className="text-purple-600" />}
                title="Infrastructure"
                items={[
                  `Campus: ${infra.campusArea || 'N/A'}`,
                  `Classrooms: ${infra.numberOfClassrooms || 'N/A'}`,
                  `Labs: ${infra.numberOfLabs || 'N/A'}`,
                  `Library: ${infra.library?.size || 'N/A'}`
                ]}
              /> */}
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
