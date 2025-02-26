import React, { useState } from 'react';
import { FaEye, FaEdit, FaPauseCircle } from 'react-icons/fa';
import CardImage from "../assets/info-card-design.jpg";  // Path to background image
import StudentProfile from "../assets/student-profile.jpg";  // Path to profile image

const Demo = () => {
  // Dummy data for tables (Replace with actual data)
  const collegeData = [
    {
      collegeName: 'ABC College',
      grade: 'A',
      placement: '95%',
      branch: 'Computer Science',
      rank: 1,
      fees: '50000',
      entranceExam: 'JEE',
      location: 'City A',
      cutoff: '90%',
    },
    {
      collegeName: 'XYZ College',
      grade: 'B',
      placement: '85%',
      branch: 'Mechanical',
      rank: 10,
      fees: '60000',
      entranceExam: 'JEE',
      location: 'City B',
      cutoff: '85%',
    },
  ];

  const universityData = [
    {
      universityName: 'University A',
      country: 'Country X',
      rank: 5,
      established: '1960',
    },
    {
      universityName: 'University B',
      country: 'Country Y',
      rank: 10,
      established: '1980',
    },
  ];

  const classData = [
    {
      className: 'Class 1',
      teacher: 'Mr. A',
      students: 30,
    },
    {
      className: 'Class 2',
      teacher: 'Mr. B',
      students: 25,
    },
  ];

  const [selectedOption, setSelectedOption] = useState('university');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleViewProfile = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleEdit = () => {
    alert('Edit functionality not implemented');
  };

  const handleDelete = (item, type) => {
    if (type === 'college') {
      const updatedData = collegeData.filter((college) => college !== item);
      alert('College deleted');
    } else if (type === 'university') {
      const updatedData = universityData.filter((university) => university !== item);
      alert('University deleted');
    } else if (type === 'class') {
      const updatedData = classData.filter((classInfo) => classInfo !== item);
      alert('Class deleted');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4">
      {/* Dropdown to select between University, Class, or College List */}
      <div className="mb-6">
        <select
          className="px-4 py-2 border border-blue-300 rounded-lg"
          value={selectedOption}
          onChange={handleDropdownChange}
        >
          <option value="university">University List</option>
          <option value="class">Class List</option>
          <option value="college">College List</option>
        </select>
      </div>

      {/* Display different tables based on dropdown selection */}
      {selectedOption === 'college' && (
        <div>
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">College List</h2>
          <table className="w-full table-auto bg-white border-2 border-blue-300 shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4">College Name</th>
                <th className="py-2 px-4">Grade</th>
                <th className="py-2 px-4">Placement</th>
                <th className="py-2 px-4">Branch</th>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Fees</th>
                <th className="py-2 px-4">Entrance Exam</th>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4">Cutoff</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {collegeData.map((college, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4">{college.collegeName}</td>
                  <td className="py-2 px-4">{college.grade}</td>
                  <td className="py-2 px-4">{college.placement}</td>
                  <td className="py-2 px-4">{college.branch}</td>
                  <td className="py-2 px-4">{college.rank}</td>
                  <td className="py-2 px-4">{college.fees}</td>
                  <td className="py-2 px-4">{college.entranceExam}</td>
                  <td className="py-2 px-4">{college.location}</td>
                  <td className="py-2 px-4">{college.cutoff}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => handleViewProfile(college)}
                    >
                      <FaEye size={20} />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-800 mr-2"
                      onClick={handleEdit}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(college, 'college')}
                    >
                      <FaPauseCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOption === 'university' && (
        <div>
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">University List</h2>
          <table className="w-full table-auto bg-white border-2 border-blue-300 shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4">University Name</th>
                <th className="py-2 px-4">Country</th>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Established</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {universityData.map((university, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4">{university.universityName}</td>
                  <td className="py-2 px-4">{university.country}</td>
                  <td className="py-2 px-4">{university.rank}</td>
                  <td className="py-2 px-4">{university.established}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => handleViewProfile(university)}
                    >
                      <FaEye size={20} />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-800 mr-2"
                      onClick={handleEdit}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(university, 'university')}
                    >
                      <FaPauseCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOption === 'class' && (
        <div>
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Class List</h2>
          <table className="w-full table-auto bg-white border-2 border-blue-300 shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4">Class Name</th>
                <th className="py-2 px-4">Teacher</th>
                <th className="py-2 px-4">No. of Students</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((classInfo, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4">{classInfo.className}</td>
                  <td className="py-2 px-4">{classInfo.teacher}</td>
                  <td className="py-2 px-4">{classInfo.students}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => handleViewProfile(classInfo)}
                    >
                      <FaEye size={20} />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-800 mr-2"
                      onClick={handleEdit}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(classInfo, 'class')}
                    >
                      <FaPauseCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Profile Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
          <div
            className="bg-white p-4 rounded-lg shadow-lg w-120 h-70 flex items-center overflow-hidden border-2 border-black bg-cover justify-evenly relative"
            style={{ backgroundImage: `url(${CardImage})` }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-800 px-2 py-1 rounded-full"
            >
              X
            </button>

            <img
              src={StudentProfile}
              alt="Profile"
              className="w-30 h-30 rounded-full object-cover mr-6 border-2 border-black"
            />

            <div className="flex flex-col justify-between col-7">
              <h4 className="text-lg font-semibold text-gray-800">Profile Details</h4>
              <hr className="my-2 border-t border-black" />

              {/* Render profile based on selected data */}
              {selectedItem && selectedItem.collegeName && (
                <>
                  <p className="text-sm text-gray-700">
                    <strong>College Name:</strong> {selectedItem.collegeName}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Grade:</strong> {selectedItem.grade}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Branch:</strong> {selectedItem.branch}
                  </p>
                </>
              )}

              {selectedItem && selectedItem.universityName && (
                <>
                  <p className="text-sm text-gray-700">
                    <strong>University Name:</strong> {selectedItem.universityName}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Country:</strong> {selectedItem.country}
                  </p>
                </>
              )}

              {selectedItem && selectedItem.className && (
                <>
                  <p className="text-sm text-gray-700">
                    <strong>Class Name:</strong> {selectedItem.className}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Teacher:</strong> {selectedItem.teacher}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demo;
