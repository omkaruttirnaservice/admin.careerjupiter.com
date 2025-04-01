
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaLaptopCode, FaFlask, FaBook, FaSchool, FaUniversity, FaBriefcase } from "react-icons/fa";

const categories = [
  { name: "Diploma", icon: <FaGraduationCap className="text-5xl text-blue-600" /> },
  { name: "Engineering", icon: <FaLaptopCode className="text-5xl text-green-600" /> },
  { name: "Pharmacy", icon: <FaFlask className="text-5xl text-purple-600" /> },
  { name: "HSC", icon: <FaBook className="text-5xl text-yellow-600" /> },
  { name: "SSC", icon: <FaSchool className="text-5xl text-orange-600" /> },
  { name: "UG", icon: <FaUniversity className="text-5xl text-red-600" /> },
  { name: "PG", icon: <FaBriefcase className="text-5xl text-teal-600" /> },
];

const CategoryCards = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">📚 Select a Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          // <div
          //   key={cat.name}
          //   className="bg-white p-6 shadow-lg rounded-xl flex flex-col items-center space-y-3 
          //             transition transform hover:scale-105 hover:shadow-2xl cursor-pointer border-t-4 border-blue-500"
          //             onClick={() => navigate(`/tests/${cat.name.toLowerCase()}`)}

          // >
          //   {cat.icon}
          //   <h3 className="text-2xl font-semibold text-gray-800">{cat.name}</h3>
          // </div>
          <div
          key={cat.name}
          className="bg-white p-6 shadow-lg rounded-xl flex flex-col items-center space-y-3 
                    transition transform hover:scale-105 hover:shadow-2xl cursor-pointer border-t-4 border-blue-500"
          onClick={() => navigate(`/tests/${cat.name.toLowerCase()}`)}
        >
          {cat.icon}
          <h3 className="text-2xl font-semibold text-gray-800">{cat.name.charAt(0).toUpperCase() + cat.name.slice(1).toLowerCase()}</h3>
        </div>
        
       ))}
      </div>
    </div>
  );
};

export default CategoryCards;
