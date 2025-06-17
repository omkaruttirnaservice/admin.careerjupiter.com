// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl";
// import { getCookie } from "../utlis/cookieHelper";
// import {
//   FaUniversity,
//   FaInfoCircle,
//   FaCalendarAlt,
//   FaTags,
//   FaGlobe,
//   FaLayerGroup,
//   FaGraduationCap,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaCalendarDay,
//   FaBook,
//   FaClipboardList,
//   FaClipboardCheck,
//   FaUserGraduate,
//   FaBalanceScale,
//   FaEnvelope,
//   FaBuilding,
// } from "react-icons/fa";
// import { HiAcademicCap } from "react-icons/hi";

// const UniversityVendorDashboard = () => {
//   const [universityDetails, setUniversityDetails] = useState(null);
//   const [universityId, setUniversityId] = useState(null);

//     // ✅ Step 1: Get university ID from cookie (or storage)
//   useEffect(() => {
//     const idFromCookie = getCookie("universityID"); // Your cookie key
//     if (idFromCookie) {
//       setUniversityId(idFromCookie);
//     } else {
//       console.warn("University ID not found in cookies!");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchUniversityDetails = async () => {
//         if (!universityId) return;

//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/university/${universityId}`);
//         const data = response?.data?.data?.university;

//         setUniversityDetails({
//           ...data,
//           address: data?.address || {},
//           description: data?.info?.description || "No description available",
//           admissionEntranceDetails: data?.admissionEntranceDetails || {},
//         });
//       } catch (error) {
//         console.error("Error fetching university details:", error?.response?.data || error.message);
//       }
//     };

//     fetchUniversityDetails();
//   }, [universityId]);

// //   return (
// //     <div className="flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 min-h-screen p-4">
// //       {/* Header */}
// //       <div className="relative bg-gradient-to-br from-white/80 to-green-100/90 backdrop-blur-lg shadow-2xl p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 mb-8">
// //         <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-xl">
// //           <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 to-lime-500 p-[3px] animate-pulse" />
// //           <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full bg-green-600">
// //             <HiAcademicCap className="text-white text-5xl" />
// //           </div>
// //         </div>
// //         <div className="text-center sm:text-left">
// //           <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
// //             Welcome, <span className="text-green-600">{universityDetails?.universityName || "University Vendor"}</span> 👋
// //           </h2>
// //           <p className="text-lg text-gray-700 font-semibold">{universityDetails?.address?.state || "State Info"}</p>
// //         </div>
// //       </div>

// //       {/* Info Grid */}
// //       <div className="bg-white/80 shadow-xl p-4 rounded-2xl">
// //         <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
// //           <FaInfoCircle className="text-emerald-500" /> University Details
// //         </h3>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
// //           {[
// //             {
// //               title: "University Name",
// //               value: universityDetails?.universityName,
// //               icon: <FaUniversity className="text-green-600 text-3xl" />,
// //               bg: "from-green-100 to-green-200",
// //             },
// //             {
// //               title: "Website",
// //               value: universityDetails?.websiteURL,
// //               icon: <FaGlobe className="text-blue-600 text-3xl" />,
// //               bg: "from-blue-100 to-blue-200",
// //             },
// //             {
// //               title: "Address",
// //               value: `${universityDetails?.address?.line1 || ""}, ${universityDetails?.address?.line2 || ""}, ${universityDetails?.address?.dist || ""}`,
// //               icon: <FaMapMarkerAlt className="text-rose-600 text-3xl" />,
// //               bg: "from-rose-100 to-rose-200",
// //             },
// //             {
// //               title: "Pincode",
// //               value: universityDetails?.address?.pincode,
// //               icon: <FaTags className="text-yellow-600 text-3xl" />,
// //               bg: "from-yellow-100 to-yellow-200",
// //             },
// //             {
// //               title: "Authorized Person",
// //               value: `${universityDetails?.address?.autorizedName} (${universityDetails?.address?.autorizedPhono})`,
// //               icon: <FaPhone className="text-indigo-600 text-3xl" />,
// //               bg: "from-indigo-100 to-indigo-200",
// //             },
// //             {
// //               title: "Nearby Landmark",
// //               value: universityDetails?.address?.nearbyLandmarks,
// //               icon: <FaLayerGroup className="text-teal-600 text-3xl" />,
// //               bg: "from-teal-100 to-teal-200",
// //             },
// //           ].map((info, idx) => (
// //             <div
// //               key={idx}
// //               className={`group bg-gradient-to-br ${info.bg} p-6 rounded-xl shadow-md flex items-start gap-4 hover:scale-105 transition duration-300`}
// //             >
// //               {info.icon}
// //               <div>
// //                 <h4 className="text-md font-bold text-gray-800">{info.title}</h4>
// //                 <p className="text-gray-700 text-sm break-words">{info.value || "N/A"}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Description */}
// //         <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-6 rounded-xl shadow-md mb-6">
// //           <h4 className="text-md font-bold mb-2 text-emerald-800 flex items-center gap-2">
// //             <FaInfoCircle /> University Description
// //           </h4>
// //           <p className="text-gray-800 text-sm">{universityDetails?.description}</p>
// //         </div>

// //         {/* Admission Details */}
// //         <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-6 rounded-xl shadow-md">
// //           <h4 className="text-md font-bold mb-4 text-orange-800 flex items-center gap-2">
// //             <FaGraduationCap /> Admission Entrance Details
// //           </h4>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <strong>Start Date:</strong>{" "}
// //               {new Date(universityDetails?.admissionEntranceDetails?.admissionStartDate).toLocaleDateString() || "N/A"}
// //             </div>
// //             <div>
// //               <strong>End Date:</strong>{" "}
// //               {new Date(universityDetails?.admissionEntranceDetails?.admissionEndDate).toLocaleDateString() || "N/A"}
// //             </div>
// //             <div>
// //               <strong>Last Year Cutoff Marks:</strong>{" "}
// //               {universityDetails?.admissionEntranceDetails?.lastYearCutoffMarks || "N/A"}
// //             </div>
// //             <div>
// //               <strong>Scholarships Available:</strong>{" "}
// //               {universityDetails?.admissionEntranceDetails?.scholarshipsAvailable?.join(", ") || "N/A"}
// //             </div>
// //             <div>
// //               <strong>Quota System:</strong>{" "}
// //               {universityDetails?.admissionEntranceDetails?.quotaSystem?.join(", ") || "N/A"}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UniversityVendorDashboard;


// // import React, { useState } from 'react';
// // import { 
// //   FaUniversity, 
// //   FaCalendarDay, 
// //   FaGraduationCap, 
// //   FaMapMarkerAlt,
// //   FaInfoCircle,
// //   FaBook,
// //   FaClipboardList,
// //   FaClipboardCheck,
// //   FaPhone,
// //   FaEnvelope,
// //   FaGlobe,
// //   FaBuilding,
// //   FaUserGraduate,
// //   FaBalanceScale
// // } from 'react-icons/fa';

// // const API_BASE_URL = "http://your-api-base-url.com";

// // const UniversityDashboard = ({ data }) => {
// //   const [readMore, setReadMore] = useState(false);
// //   const university = data.university;
// //   const address = university.address;
// //   const infra = data.infrastructure.infrastructure[0];
// //   const courses = data.courses;
// //   const placements = data.placements[0].placement[0];

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen md:p-8 p-2">
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8">
//         <div className="relative h-48 md:h-64">
//           {/* <img
//             src={`${API_BASE_URL}${universityDetails.image}`}
//             alt={universityDetails.universityName}
//             className="w-full h-full object-cover"
//           /> */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//           <div className="absolute bottom-4 left-4 flex items-end">
//             {/* <img
//               src={`${API_BASE_URL}${universityDetails.image}`}
//               alt="Logo"
//               className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg"
//             /> */}
//             <div className="ml-4 text-white">
//               <h1 className="text-xl md:text-3xl font-bold">
//                 {/* {universityDetails.universityName} */}
//               </h1>
//               <p className="text-sm md:text-base">
//                 {/* {universityDetails.category} */}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Quick Info Bar */}
//         <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center gap-2">
//               <FaUniversity />
//               {/* <span>{universityDetails.category}</span> */}
//             </div>
//             <div className="flex items-center gap-2">
//               <FaCalendarDay />
//               {/* <span>Est. {universityDetails.establishedYear}</span> */}
//             </div>
//             <div className="flex items-center gap-2">
//               <FaGraduationCap />
//               {/* <span>{universityDetails.accreditation.join(", ")}</span> */}
//             </div>
//             <div className="flex items-center gap-2">
//               <FaMapMarkerAlt />
//               <span>
//                 {/* {address.dist}, {address.state} */}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* About University */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <FaInfoCircle className="text-blue-600" />
//               About the University
//             </h2>
//             <p className="text-gray-700">
//               {/* {readMore
//                 ? universityDetails.info.description
//                 : `${universityDetails.info.description.substring(0, 200)}...`} */}
//               <button
//                 onClick={() => setReadMore(!readMore)}
//                 className="ml-2 text-blue-600 font-medium hover:underline"
//               >
//                 {/* {readMore ? "Show Less" : "Read More"} */}
//               </button>
//             </p>
//           </div>

//           {/* Key Highlights */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <FaBook className="text-blue-600" />
//               Key Highlights
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <HighlightCard
//                 icon={<FaClipboardList className="text-green-600" />}
//                 title="Admissions"
//                 items={[
//                   // `Entrance Exams: ${universityDetails.entrance_exam_required.join(", ")}`,
//                   // `Admission Dates: ${new Date(universityDetails.admissionEntranceDetails.admissionStartDate).toLocaleDateString()} - ${new Date(universityDetails.admissionEntranceDetails.admissionEndDate).toLocaleDateString()}`,
//                   // `Last Year Cutoff: ${universityDetails.admissionEntranceDetails.lastYearCutoffMarks}%`,
//                   // `Quota: ${universityDetails.admissionEntranceDetails.quotaSystem.join(", ")}`
//                 ]}
//               />

//               <HighlightCard
//                 icon={<FaClipboardCheck className="text-red-600" />}
//                 title="Contact"
//                 items={[
//                   // `Phone: ${universityDetails.contactDetails}`,
//                   // `Email: ${universityDetails.email_id}`,
//                   // `Website: ${universityDetails.websiteURL}`,
//                   // `Address: ${address.line1}, ${address.dist}`
//                 ]}
//               />
//             </div>
//           </div>

//           {/* Courses Offered */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <FaGraduationCap className="text-blue-600" />
//               Courses Offered
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* {courses[0]?.courses?.map((course, index) => (
//                 <CourseCard key={index} course={course} /> */}
//               {/* ))} */}
//             </div>
//           </div>

//           {/* Placements */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <FaUserGraduate className="text-blue-600" />
//               Placement Details
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <StatCard
//                 icon={<FaClipboardList className="text-green-600" />}
//                 title="Placement Percentage"
//                 // value={`${placements.placementPercentage}%`}
//               />
//               <StatCard
//                 icon={<FaBalanceScale className="text-blue-600" />}
//                 title="Highest Package"
//                 // value={`₹${placements.highestPackage} LPA`}
//               />
//               <StatCard
//                 icon={<FaUniversity className="text-purple-600" />}
//                 title="Top Recruiters"
//                 // value={placements.topRecruiters}
//               />
//               <StatCard
//                 icon={<FaGraduationCap className="text-orange-600" />}
//                 title="Internship Opportunities"
//                 // value={placements.internshipOpportunities ? "Available" : "Not Available"}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-8">
//           {/* Quick Contact */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <FaPhone className="text-blue-600" />
//               Quick Contact
//             </h2>
//             <div className="space-y-4">
//               <ContactItem
//                 icon={<FaPhone className="text-green-600" />}
//                 label="Phone"
//                 // value={university.contactDetails}
//                 // link={`tel:${university.contactDetails}`}
//               />
//               <ContactItem
//                 icon={<FaEnvelope className="text-red-600" />}
//                 label="Email"
//                 // value={university.email_id}
//                 // link={`mailto:${university.email_id}`}
//               />
//               <ContactItem
//                 icon={<FaGlobe className="text-blue-600" />}
//                 label="Website"
//                 // value={university.websiteURL}
//                 // link={university.websiteURL}
//               />
//               <ContactItem
//                 icon={<FaMapMarkerAlt className="text-purple-600" />}
//                 label="Address"
//                 // value={`${address.line1}, ${address.dist}, ${address.state} - ${address.pincode}`}
//               />
//               <ContactItem
//                 icon={<FaUserGraduate className="text-orange-600" />}
//                 label="Authorized Person"
//                 // value={`${address.autorizedName} (${address.autorizedPhono})`}
//                 // link={`tel:${address.autorizedPhono}`}
//               />
//             </div>
//           </div>

//           {/* Infrastructure Details */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <FaBuilding className="text-blue-600" />
//               Infrastructure
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <StatCard
//                 icon={<FaBook className="text-yellow-600" />}
//                 title="Library"
//                 // value={infra.library?.size || "N/A"}
//               />
//               <StatCard
//                 icon={<FaUniversity className="text-green-600" />}
//                 title="Classrooms"
//                 // value={infra.numberOfClassrooms || "N/A"}
//               />
//               <StatCard
//                 icon={<FaClipboardList className="text-red-600" />}
//                 title="Labs"
//                 // value={infra.numberOfLabs || "N/A"}
//               />
//               <StatCard
//                 icon={<FaUserGraduate className="text-purple-600" />}
//                 title="Sports"
//                 // value={infra.sportsFacilities?.join(", ") || "N/A"}
//               />
//               <StatCard
//                 icon={<FaMapMarkerAlt className="text-blue-600" />}
//                 title="Hostel"
//                 // value={infra.hostelAvailability ? "Available" : "Not Available"}
//               />
//               <StatCard
//                 icon={<FaBalanceScale className="text-orange-600" />}
//                 title="Canteen"
//                 // value={
//                 //   infra.canteenAndFoodServices ? "Available" : "Not Available"
//                 // }
//               />
//               <StatCard
//                 icon={<FaClipboardCheck className="text-teal-600" />}
//                 title="Medical"
//                 // value={infra.medicalFacilities ? "Available" : "Not Available"}
//               />
//               <StatCard
//                 icon={<FaMapMarkerAlt className="text-indigo-600" />}
//                 title="Transport"
//                 // value={infra.transportFacility?.join(", ") || "N/A"}
//               />
//             </div>
//           </div>

//           {/* Scholarships */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <FaGraduationCap className="text-blue-600" />
//               Scholarships
//             </h2>
//             <div className="space-y-2">
//               {/* {universityDetails.admissionEntranceDetails.scholarshipsAvailable.map((scholarship, index) => (
//                 <div key={index} className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
//                   <span className="text-blue-500">•</span>
//                   <span>{scholarship}</span>
//                 </div>
//               ))} */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Gallery */}
//       {/* {university.imageGallery?.length > 0 && (
//         <div className="w-full mt-6">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <FaUniversity className="text-blue-600" />
//               Gallery
//             </h2>

//             <div className="overflow-x-auto">
//               <div className="inline-flex gap-4">
//                 {university.imageGallery.map((image, index) => (
//                   <img
//                     key={index}
//                     src={`${API_BASE_URL}${image}`}
//                     alt={`Gallery ${index + 1}`}
//                     className="h-40 rounded-lg cursor-pointer hover:opacity-80 transition"
//                     onClick={() =>
//                       window.open(`${API_BASE_URL}${image}`, "_blank")
//                     }
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// };

// // Component for Highlight Cards
// const HighlightCard = ({ icon, title, items }) => (
//   <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
//     <div className="flex items-center gap-2 mb-3">
//       <div className="text-xl">{icon}</div>
//       <h3 className="font-bold text-blue-800">{title}</h3>
//     </div>
//     <ul className="space-y-2 text-sm">
//       {items.map((item, index) => (
//         <li key={index} className="flex items-start gap-2">
//           <span className="text-blue-500">•</span>
//           <span>{item}</span>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// // Component for Course Cards
// const CourseCard = ({ course }) => (
//   <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
//     <h3 className="font-bold text-blue-800 mb-2">{course.name}</h3>
//     <div className="flex flex-wrap gap-1 mb-2">
//       {course.subCategory.map((sc, idx) => (
//         <span
//           key={idx}
//           className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
//         >
//           {sc}
//         </span>
//       ))}
//     </div>
//     <div className="text-sm space-y-1">
//       <p>
//         <span className="font-medium">Duration:</span> {course.duration} months
//       </p>
//       <p>
//         <span className="font-medium">Eligibility:</span> {course.eligibility}
//       </p>
//       <p>
//         <span className="font-medium">Intake:</span> {course.sanctionedIntake}
//       </p>
//       <p className="font-medium text-green-700">
//         Fees: ₹{course.annualFees.toLocaleString()}/year
//       </p>
//     </div>
//   </div>
// );

// // Component for Contact Items
// const ContactItem = ({ icon, label, value, link }) => (
//   <div className="flex items-start gap-3">
//     <div className="text-xl mt-1">{icon}</div>
//     <div>
//       <p className="font-medium text-gray-600">{label}</p>
//       {link ? (
//         <a
//           href={link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 hover:underline"
//         >
//           {value}
//         </a>
//       ) : (
//         <p>{value}</p>
//       )}
//     </div>
//   </div>
// );

// // Component for Stat Cards
// const StatCard = ({ icon, title, value }) => (
//   <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-100 text-center">
//     <div className="text-2xl mb-1">{icon}</div>
//     <h4 className="font-medium text-blue-800">{title}</h4>
//     <p className="text-gray-700">{value}</p>
//   </div>
// );

// export default UniversityVendorDashboard;



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