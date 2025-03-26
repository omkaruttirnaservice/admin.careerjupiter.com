import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaLanguage,
  FaInfoCircle,
  FaUniversity,
} from "react-icons/fa";
import { getCookie } from "../Utlis/cookieHelper"; // ✅ Import getCookie function
import ClassVendorSideMenu from "./ClassVendorSideMenu";

const ClassVendorDashboard = () => {
  const [classDetails, setClassDetails] = useState(null);
  const [classId, setClassId] = useState(null); // ✅ State for classId

  // ✅ Fetch classId on component mount
  useEffect(() => {
    const storedClassId = getCookie("classId"); // ✅ Use getCookie function
    // console.log("Fetched ClassId ", storedClassId)
    if (storedClassId) {
      setClassId(storedClassId);
      console.log("Class ID retrieved from cookies:", storedClassId);
    } else {
      console.warn("Class ID not found in cookies!");
    }
  }, []);

  useEffect(() => {

    const fetchClassDetails = async () => {
      if (!classId) return;

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/class/${classId}`
        );
        console.log("Class details fetched:", response.data);

        const classData = response.data?.data?.class; // ✅ Ensure correct path
        setClassDetails({
          ...classData,
          category: classData?.Category || "N/A", // ✅ Fix Category Extraction
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
          error?.response?.data || error.message
        );
      }
    };

    fetchClassDetails();
  }, [classId]);

  return (
    <div className="flex bg-gradient-to-br from-blue-100 to-blue-50 min-h-screen">
      {/* ✅ Sidebar */}
      <ClassVendorSideMenu />

      {/* ✅ Main Content */}
      <div className="flex-1 p-8">
        {/* ✅ Profile Section */}
        <div className="bg-white shadow-md p-6 rounded-xl flex items-center gap-6 mb-6">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-500 shadow-lg">
            <FaUserCircle className="text-white text-6xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome, {classDetails?.ownerOrInstituteName || "Vendor"} 👋
            </h2>
            <p className="text-blue-600 text-lg font-semibold">{classDetails?.className || "Your Class Name"}</p>
          </div>
        </div>

        {/* ✅ Details Section */}
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FaInfoCircle className="text-blue-500" /> Class Details
          </h3>

          {/* ✅ Class Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 🔹 Class Name */}
            <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center gap-4">
              <FaChalkboardTeacher className="text-blue-600 text-3xl" />
              <div>
                <h3 className="text-lg font-bold">Class Name</h3>
                <p className="text-gray-700">{classDetails?.className || "N/A"}</p>
              </div>
            </div>

            {/* 🔹 Owner/Institute Name */}
            <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center gap-4">
              <FaGraduationCap className="text-green-600 text-3xl" />
              <div>
                <h3 className="text-lg font-bold">Owner/Institute</h3>
                <p className="text-gray-700">{classDetails?.ownerOrInstituteName || "N/A"}</p>
              </div>
            </div>

            {/* 🔹 Teaching Medium */}
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center gap-4">
              <FaLanguage className="text-yellow-600 text-3xl" />
              <div>
                <h3 className="text-lg font-bold">Teaching Medium</h3>
                <p className="text-gray-700">{classDetails?.teachingMedium?.join(", ") || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* ✅ Images Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">Class Images</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {classDetails?.image && (
                <img
                  src={`${API_BASE_URL}${classDetails.image}`}
                  alt="Class"
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassVendorDashboard;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import {
//   FaUserCircle,
//   FaMapMarkerAlt,
//   FaChalkboardTeacher,
//   FaGraduationCap,
//   FaLanguage,
//   FaInfoCircle,
//   FaUniversity,
//   FaCamera,
//   FaClipboardList,
// } from "react-icons/fa";
// import { getCookie } from "../Utlis/cookieHelper";
// import ClassVendorSideMenu from "./ClassVendorSideMenu";

// const ClassVendorDashboard = () => {
//   const [classDetails, setClassDetails] = useState(null);
//   const [classId, setClassId] = useState(null);

//   useEffect(() => {
//     const storedClassId = getCookie("classId");
//     if (storedClassId) {
//       setClassId(storedClassId);
//       console.log("Class ID retrieved from cookies:", storedClassId);
//     } else {
//       console.warn("Class ID not found in cookies!");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchClassDetails = async () => {
//       if (!classId) return;

//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/class/${classId}`);
//         console.log("Class details fetched:", response.data);

//         const classData = response.data?.data?.class || {};
        
//         // ✅ Fix Gallery Image Parsing
//         let parsedGallery = [];
//         try {
//           parsedGallery = JSON.parse(classData.imageGallery[0]); 
//           if (!Array.isArray(parsedGallery)) {
//             parsedGallery = [];
//           }
//         } catch {
//           parsedGallery = [];
//         }

//         setClassDetails({
//           ...classData,
//           category: classData?.Category || "N/A",
//           description: classData?.info?.description || "No description available",
//           address: classData?.address || {},
//           imageGallery: parsedGallery,
//         });

//       } catch (error) {
//         console.error(
//           "Error fetching class details:",
//           error?.response?.data || error.message
//         );
//       }
//     };

//     fetchClassDetails();
//   }, [classId]);

//   return (
//     <div className="flex bg-gradient-to-br from-blue-100 to-blue-50 min-h-screen">
//       <ClassVendorSideMenu />

//       <div className="flex-1 p-8">
//         {/* ✅ Profile Section */}
//         <div className="bg-white shadow-md p-6 rounded-xl flex items-center gap-6 mb-6">
//           <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-500 shadow-lg">
//             <FaUserCircle className="text-white text-6xl" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">
//               Welcome, {classDetails?.ownerOrInstituteName || "Vendor"} 👋
//             </h2>
//             <p className="text-blue-600 text-lg font-semibold">{classDetails?.className || "Your Class Name"}</p>
//           </div>
//         </div>

//         {/* ✅ Details Section */}
//         <div className="bg-white shadow-md p-6 rounded-xl">
//           <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
//             <FaInfoCircle className="text-blue-500" /> Class Details
//           </h3>

//           {/* ✅ Class Details Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* 🔹 Class Name */}
//             <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center gap-4">
//               <FaChalkboardTeacher className="text-blue-600 text-3xl" />
//               <div>
//                 <h3 className="text-lg font-bold">Class Name</h3>
//                 <p className="text-gray-700">{classDetails?.className || "N/A"}</p>
//               </div>
//             </div>

//             {/* 🔹 Owner/Institute Name */}
//             <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center gap-4">
//               <FaGraduationCap className="text-green-600 text-3xl" />
//               <div>
//                 <h3 className="text-lg font-bold">Owner/Institute</h3>
//                 <p className="text-gray-700">{classDetails?.ownerOrInstituteName || "N/A"}</p>
//               </div>
//             </div>

//             {/* 🔹 Teaching Medium */}
//             <div className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center gap-4">
//               <FaLanguage className="text-yellow-600 text-3xl" />
//               <div>
//                 <h3 className="text-lg font-bold">Teaching Medium</h3>
//                 <p className="text-gray-700">{classDetails?.teachingMedium?.join(", ") || "N/A"}</p>
//               </div>
//             </div>

//             {/* 🔹 Category */}
//             <div className="bg-purple-100 p-4 rounded-lg shadow-md flex items-center gap-4">
//               <FaUniversity className="text-purple-600 text-3xl" />
//               <div>
//                 <h3 className="text-lg font-bold">Category</h3>
//                 <p className="text-gray-700">{classDetails?.category || "N/A"}</p>
//               </div>
//             </div>

//             {/* 🔹 Description */}
//             <div className="bg-indigo-100 p-4 rounded-lg shadow-md flex items-center gap-4">
//               <FaClipboardList className="text-indigo-600 text-3xl" />
//               <div>
//                 <h3 className="text-lg font-bold">Description</h3>
//                 <p className="text-gray-700">{classDetails?.description || "N/A"}</p>
//               </div>
//             </div>
//           </div>

//           {/* ✅ Gallery Images Section */}
//           <div className="mt-6">
//             <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//               <FaCamera className="text-red-500" /> Gallery Images
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//               {classDetails?.imageGallery?.length > 0 ? (
//                 classDetails.imageGallery.map((img, index) => (
//                   <img
//                     key={index}
//                     src={`${API_BASE_URL}${img}`}
//                     alt={`Gallery ${index + 1}`}
//                     className="w-full h-40 object-cover rounded-lg shadow-md"
//                   />
//                 ))
//               ) : (
//                 <p className="text-gray-500">No images available</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassVendorDashboard;
