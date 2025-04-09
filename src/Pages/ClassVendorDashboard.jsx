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
  FaImages,
} from "react-icons/fa";
import { getCookie } from "../Utlis/cookieHelper"; // ✅ Import getCookie function
import ClassVendorSideMenu from "./ClassVendorSideMenu";

const ClassVendorDashboard = () => {
  const [classDetails, setClassDetails] = useState(null);
  const [classId, setClassId] = useState(null); // ✅ State for classId
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          error?.response?.data || error.message ||  error.response?.data.errMessage 
        );
      }
    };

    fetchClassDetails();
  }, [classId]);

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-indigo-100 to-purple-50 min-h-screen">
      {/* ✅ Sidebar */}
      {/* <ClassVendorSideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
  
      {/* ✅ Main Content */}
      <div className="flex-1 p-4">
        {/* ✅ Profile Section */}
        <div className="bg-white shadow-lg p-6 rounded-xl flex flex-col sm:flex-row items-center gap-6 mb-6 backdrop-blur-lg bg-opacity-80">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg">
            <FaUserCircle className="text-white text-6xl" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-900 animate-fade-in">
              Welcome, {classDetails?.ownerOrInstituteName || "Vendor"} 👋
            </h2>
            <p className="text-blue-600 text-lg font-semibold">
              {classDetails?.className || "Your Class Name"}
            </p>
          </div>
        </div>
  
        {/* ✅ Class Details Section */}
        <div className="bg-white shadow-lg p-6 rounded-xl backdrop-blur-lg bg-opacity-80">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FaInfoCircle className="text-blue-500" /> Class Details
          </h3>
  
          {/* ✅ Class Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* 🔹 Class Name */}
            <div className="relative bg-gradient-to-r from-blue-200 to-blue-100 p-6 rounded-lg shadow-md flex items-center gap-4 
                overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full 
                before:bg-white before:opacity-20 before:rotate-6 before:transition-all hover:before:left-full">
              <FaChalkboardTeacher className="text-blue-600 text-3xl" />
              <div>
                <h3 className="text-lg font-bold">Class Name</h3>
                <p className="text-gray-700">{classDetails?.className || "N/A"}</p>
              </div>
            </div>
  
            {/* 🔹 Owner/Institute Name */}
            <div className="relative bg-gradient-to-r from-green-200 to-green-100 p-6 rounded-lg shadow-md flex items-center gap-4 
                overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full 
                before:bg-white before:opacity-20 before:rotate-6 before:transition-all hover:before:left-full">
              <FaGraduationCap className="text-green-600 text-3xl" />
              <div>
                <h3 className="text-lg font-bold">Owner/Institute</h3>
                <p className="text-gray-700">{classDetails?.ownerOrInstituteName || "N/A"}</p>
              </div>
            </div>
  
          
          </div>
  
          {/* ✅ Description Section */}
          <div className="relative bg-gradient-to-r from-purple-300 to-indigo-200 p-6 rounded-lg shadow-md flex items-center gap-4 mt-3
              overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full 
              before:bg-white before:opacity-20 before:rotate-6 before:transition-all hover:before:left-full">
            <FaInfoCircle className="text-purple-600 text-3xl" />
            <div>
              <h3 className="text-lg font-bold">Class Description</h3>
              <p className="text-gray-700">{classDetails?.description || "No description available"}</p>
            </div>
          </div>
  
          {/* ✅ Images Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">Class Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-4">
              {classDetails?.image ? (
                <img
                  src={`${API_BASE_URL}${classDetails.image}`}
                  alt="Class"
                  className="relative w-full h-40 object-cover rounded-lg shadow-md overflow-hidden before:absolute before:top-0 before:left-[-100%] 
                  before:w-full before:h-full before:bg-white before:opacity-20 before:rotate-6 before:transition-all hover:before:left-full"
                />
              ) : (
                <p className="text-gray-500 italic">No image available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default ClassVendorDashboard;

