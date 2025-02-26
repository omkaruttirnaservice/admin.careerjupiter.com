import React from 'react'
import CardImage from "../assets/info-card-design.jpg"
import StudentProfile from "../assets/student-profile.jpg"

const InfoCard = () => {
  return (
    <>
   
    <div className="flex justify-center min-h-screen bg-gray-100"> {/* Center the card */}
      <div className="bg-white p-4 rounded-lg shadow-lg w-120 h-70 flex items-center overflow-hidden border-2 border-black bg-cover justify-evenly"
       style={{backgroundImage:`url(${CardImage })`}}> {/* Card container */}
        <img 
          src={StudentProfile}  
          alt="Profile"
          className="w-30 h-30 rounded-full object-cover mr-6 border-2 border-black" /> {/* Profile Image */}

        <div className="flex flex-col justify-between col-7">
          <h4 className="text-lg font-semibold text-gray-800">Student Profile</h4> {/* Student Name */}
          <hr className="my-2 border-t border-black" /> {/* Horizontal line */}
          <p className="text-sm text-gray-700">Student Name: XYZ</p> 
          <p className="text-sm text-gray-700">College Name: ABC College</p>
          <p className="text-sm text-gray-700">Grade: 12th</p> 
          <p className="text-sm text-gray-700">Branch: Science</p> 
          <p className="text-sm text-gray-700">Location: Nashik Science</p> 
          <p className="text-sm text-gray-700">Email: johndoe@example.com</p>
          <p className="text-sm text-gray-700">Phone: (123) 456-7890</p>
        </div>
      </div>
    </div>
    </> 
  )
}

export default InfoCard
