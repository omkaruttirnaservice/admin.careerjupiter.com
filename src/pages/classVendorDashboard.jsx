import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import {
  FaUserCircle,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaInfoCircle,
} from "react-icons/fa";
import {
  FaPhone,
  FaCalendarAlt,
  FaTags,
  FaChalkboard,
  FaBuilding,
  FaLayerGroup
} from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi"; // More educational & attractive


import { getCookie } from "../utlis/cookieHelper"; // ✅ Import getCookie function
import ClassVendorSideMenu from "./classVendorSideMenu";

const ClassVendorDashboard = () => {
  const [classDetails, setClassDetails] = useState(null);
  const [classID, setClassId] = useState(null); // ✅ State for classID
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Fetch classID on component mount
  useEffect(() => {
    const storedClassId = getCookie("classId"); // ✅ Use getCookie function
    console.log("Fetched ClassId ", classID)
    if (storedClassId) {
      setClassId(storedClassId);
      console.log("Class ID retrieved from cookies:", storedClassId);
    } else {
      console.warn("Class ID not found in cookies!");
    }
  }, []);

  useEffect(() => {

    const fetchClassDetails = async () => {
      if (!classID) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/class/${classID}`
        );
        console.log("Class details fetched:", response.data);

        const classData = response.data?.data?.class; // ✅ Ensure correct path
        setClassDetails({
          ...classData,
          category: classData?.category || "N/A", // ✅ Fix Category Extraction
          description:
            classData?.info?.description || "No description available", // ✅ Fix Description Extraction
          address: classData?.address || {}, // ✅ Fix Address Extraction
          imageGallery: Array.isArray(classData?.imageGallery)
            ? classData.imageGallery
            : [], // ✅ Fix Image Gallery Extraction
        });
      } catch (error) {
        console.error(
          "Error fetching class details:",
          error?.response?.data || error.message ||  error.response?.data.errMsg 
        );
      }
    };

    fetchClassDetails();
  }, [classID]);

  return (
<div className="flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
  {/* ✅ Main Content */}
  <div className="flex-1 p-1 md:p-1 lg:p-4">
    
    {/* ✅ Profile Header */}
    {/* <div className="bg-white/90 backdrop-blur-md shadow-2xl p-1 rounded-2xl flex flex-col sm:flex-row items-center gap-6 mb-8 lg:p-6">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-indigo-600 shadow-lg">
        <FaUserCircle className="text-white text-6xl" />
      </div>
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-bold text-gray-900">Welcome, {classDetails?.ownerOrInstituteName || "Vendor"} 👋</h2>
        <p className="text-indigo-600 text-lg font-semibold">{classDetails?.className || "Your Class Name"}</p>
      </div>
    </div> */}

<div className="relative bg-gradient-to-br from-white/80 to-indigo-100/90 backdrop-blur-lg shadow-2xl p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 mb-8 transition-all duration-500 hover:shadow-indigo-300/40 overflow-hidden">
  {/* Avatar with gradient ring */}
  <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-xl group">
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[3px] animate-pulse" />
    <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full bg-indigo-600">
      <HiAcademicCap className="text-white text-5xl" />
    </div>
  </div>

  {/* Text Section */}
  <div className="text-center sm:text-left">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
      Welcome,{" "}
      <span className="text-indigo-600">
        {classDetails?.ownerOrInstituteName || "Vendor"}
      </span>{" "}
      👋
    </h2>
    <p className="text-lg text-gray-700 font-semibold">
      {classDetails?.className || "Your Class Name"}
    </p>
    
  </div>
</div>



    {/* ✅ Class Info */}
    <div className="bg-white/80 shadow-xl p-2 rounded-2xl backdrop-blur-md lg:p-8">
      <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
        <FaInfoCircle className="text-pink-500" /> Class Details
      </h3>

      {/* ✅ Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "Class Name",
            value: classDetails?.className,
            icon: <FaChalkboardTeacher className="text-blue-600 text-3xl" />,
            bg: "from-blue-100 to-blue-200"
          },
          {
            title: "Owner Name",
            value: classDetails?.ownerOrInstituteName,
            icon: <FaGraduationCap className="text-green-600 text-3xl" />,
            bg: "from-green-100 to-green-200"
          },
          {
            title: "Contact Details",
            value: classDetails?.contactDetails,
            icon: <FaPhone className="text-purple-600 text-3xl" />,
            bg: "from-orange-100 to-orange-200"
          },
          {
            title: "Established Year",
            value: classDetails?.yearEstablished,
            icon: <FaCalendarAlt className="text-pink-600 text-3xl" />,
            bg: "from-pink-100 to-pink-200"
          },
          {
            title: "Keywords",
            value: classDetails?.keywords?.length > 0 ? classDetails.keywords.join(", ") : "N/A",
            icon: <FaTags className="text-yellow-600 text-3xl" />,
            bg: "from-yellow-100 to-yellow-200"
          },
          {
            title: "Mode of Teaching",
            value: classDetails?.modeOfTeaching?.length > 0 ? classDetails.modeOfTeaching.join(", ") : "N/A",
            icon: <FaChalkboard className="text-indigo-600 text-3xl" />,
            bg: "from-indigo-100 to-indigo-200"
          },
          {
            title: "Type",
            value: classDetails?.franchiseOrIndependent,
            icon: <FaBuilding className="text-teal-600 text-3xl" />,
            bg: "from-teal-100 to-teal-200"
          },
          {
            title: "Category",
            value: classDetails?.category?.length > 0 ? classDetails.category.join(", ") : "N/A",
            icon: <FaLayerGroup className="text-rose-600 text-3xl" />,
            bg: "from-rose-100 to-rose-200"
          },
        ].map((info, index) => (
          <div
            key={index}
            className={`group bg-gradient-to-br ${info.bg} p-6 rounded-xl shadow-md flex items-start gap-4 transform transition duration-300 hover:scale-105 hover:shadow-xl`}
          >
            {info.icon}
            <div>
              <h4 className="text-md font-bold text-gray-800">{info.title}</h4>
              <p className="text-gray-700 text-sm">{info.value || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Description Section */}
      <div className="bg-gradient-to-br from-fuchsia-100 to-violet-200 p-6 rounded-xl shadow-md mb-6">
  <h4 className="text-md font-bold mb-2 text-violet-800 flex items-center gap-2">
    <FaInfoCircle /> Class Description
  </h4>
  <p className="text-gray-800 text-sm break-words">{classDetails?.description || "No description available"}</p>
</div>


      {/* ✅ Image Section */}
      <div>
        <h4 className="text-md font-bold text-gray-800 mb-4">Class Images</h4>
        {classDetails?.image ? (
         <div className="relative group overflow-hidden rounded-xl shadow-md border-4 border-indigo-300 w-full sm:w-96 md:w-80 lg:w-72 xl:w-64">
            <img
              src={`${API_BASE_URL}${classDetails.image}`}
              alt="Class"
              className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
            />
          </div>
        ) : (
          <p className="text-gray-500 italic">No image available</p>
        )}
      </div>
    </div>
  </div>
</div>

  );
  
  
};

export default ClassVendorDashboard;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl";
// import {
//   FaPhone,
//   FaCalendarAlt,
//   FaTags,
//   FaChalkboard,
//   FaBuilding,
//   FaLayerGroup,
//   FaInfoCircle,
//   FaMapMarkerAlt,
//   FaEnvelope,
//   FaGlobe,
//   FaUsers,
//   FaBook,
//   FaGraduationCap,
// } from "react-icons/fa";
// import { HiAcademicCap } from "react-icons/hi";
// import { getCookie } from "../utlis/cookieHelper";

// const ClassVendorDashboard = () => {
//   const [classDetails, setClassDetails] = useState(null);
//   const [classID, setClassId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [readMore, setReadMore] = useState(false);

//   useEffect(() => {
//     const storedClassId = getCookie("classId");
//     if (storedClassId) {
//       setClassId(storedClassId);
//     } else {
//       console.warn("Class ID not found in cookies!");
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!classID) return;

//     const fetchClassDetails = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/class/${classID}`);
//         const data = res.data?.data?.class;

//         setClassDetails({
//           ...data,
//           category: data?.category || [],
//           description: data?.info?.description || "No description available",
//           address: data?.address?.[0] || {},
//           imageGallery: Array.isArray(data?.imageGallery) ? data.imageGallery : [],
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching class details:", error);
//         setLoading(false);
//       }
//     };

//     fetchClassDetails();
//   }, [classID]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!classDetails) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-red-500">
//         Failed to load class data. Please try again later.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen md:p-8 p-2">
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8">
//         <div className="relative h-48 md:h-64">
//           <img
//             src={`${API_BASE_URL}${classDetails.image || "/default.jpg"}`}
//             alt={classDetails.className}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//           <div className="absolute bottom-4 left-4 flex items-end">
//             <div className="ml-4 text-white">
//               <h1 className="text-xl md:text-3xl font-bold">
//                 {classDetails.className}
//               </h1>
//               <p className="text-sm md:text-base">
//                 {classDetails.ownerOrInstituteName}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Quick Info Bar */}
//         <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center gap-2">
//               <FaGraduationCap />
//               <span>{classDetails.franchiseOrIndependent}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaCalendarAlt />
//               <span>Est. {classDetails.yearEstablished}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaLayerGroup />
//               <span>{classDetails.category?.join(", ") || "N/A"}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaMapMarkerAlt />
//               <span>
//                 {classDetails.address?.dist || "N/A"}, {classDetails.address?.state || "N/A"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* About Class */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <FaInfoCircle className="text-blue-600" />
//               About the Class
//             </h2>
//             <p className="text-gray-700">
//               {readMore
//                 ? classDetails.description
//                 : `${classDetails.description.substring(0, 200)}...`}
//               {classDetails.description.length > 200 && (
//                 <button
//                   onClick={() => setReadMore(!readMore)}
//                   className="ml-2 text-blue-600 font-medium hover:underline"
//                 >
//                   {readMore ? "Show Less" : "Read More"}
//                 </button>
//               )}
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
//                 icon={<FaChalkboard className="text-green-600" />}
//                 title="Teaching"
//                 items={[
//                   `Mode: ${classDetails.modeOfTeaching?.join(", ") || "N/A"}`,
//                   `Type: ${classDetails.franchiseOrIndependent || "N/A"}`,
//                   `Keywords: ${classDetails.keywords?.join(", ") || "N/A"}`,
//                   `Category: ${classDetails.category?.join(", ") || "N/A"}`,
//                 ]}
//               />

//               <HighlightCard
//                 icon={<FaUsers className="text-red-600" />}
//                 title="Facilities"
//                 items={[
//                   `Owner: ${classDetails.ownerOrInstituteName || "N/A"}`,
//                   `Contact: ${classDetails.contactDetails || "N/A"}`,
//                   `Email: ${classDetails.email_id || "N/A"}`,
//                   `Website: ${classDetails.websiteURL || "N/A"}`,
//                 ]}
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
//                 value={classDetails.contactDetails}
//                 link={`tel:${classDetails.contactDetails}`}
//               />
//               <ContactItem
//                 icon={<FaEnvelope className="text-red-600" />}
//                 label="Email"
//                 value={classDetails.email_id}
//                 link={`mailto:${classDetails.email_id}`}
//               />
//               <ContactItem
//                 icon={<FaGlobe className="text-blue-600" />}
//                 label="Website"
//                 value={classDetails.websiteURL}
//                 link={classDetails.websiteURL}
//               />
//               {classDetails.address && (
//                 <ContactItem
//                   icon={<FaMapMarkerAlt className="text-purple-600" />}
//                   label="Address"
//                   value={`${classDetails.address.line1 || ''}, ${classDetails.address.dist || ''}, ${classDetails.address.state || ''} - ${classDetails.address.pincode || ''}`}
//                 />
//               )}
//             </div>
//           </div>

//           {/* Additional Details */}
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <HiAcademicCap className="text-blue-600" />
//               Class Details
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <StatCard
//                 icon={<FaCalendarAlt className="text-yellow-600" />}
//                 title="Established"
//                 value={classDetails.yearEstablished || "N/A"}
//               />
//               <StatCard
//                 icon={<FaTags className="text-green-600" />}
//                 title="Keywords"
//                 value={classDetails.keywords?.join(", ") || "N/A"}
//               />
//               <StatCard
//                 icon={<FaChalkboard className="text-red-600" />}
//                 title="Teaching Mode"
//                 value={classDetails.modeOfTeaching?.join(", ") || "N/A"}
//               />
//               <StatCard
//                 icon={<FaBuilding className="text-purple-600" />}
//                 title="Type"
//                 value={classDetails.franchiseOrIndependent || "N/A"}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Gallery */}
//       {classDetails.imageGallery?.length > 0 && (
//         <div className="w-full mt-6">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
//               <HiAcademicCap className="text-blue-600" />
//               Gallery
//             </h2>

//             <div className="overflow-x-auto">
//               <div className="inline-flex gap-4">
//                 {classDetails.imageGallery.map((image, index) => (
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
//       )}
//     </div>
//   );
// };

// // Reusable Components (same as in CollegeVendorDashboard)

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

// export default ClassVendorDashboard;