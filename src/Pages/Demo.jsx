import React, { useEffect, useState } from 'react';

const CollegeTable = () => {
  const [collegeData, setCollegeData] = useState(null);

  // Fetch the JSON data when the component mounts
  useEffect(() => {
    fetch('./src/assets/collegeData.json')  // Adjust the path based on your actual folder structure
      .then((response) => response.json())
      .then((data) => setCollegeData(data))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  if (!collegeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        College Details
      </h1>
      <div className="overflow-x-auto bg-white border-2 border-blue-300 shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4">College Name</th>
              <th className="py-2 px-4">Affiliated University</th>
              <th className="py-2 px-4">College Category</th>
              <th className="py-2 px-4">College Type</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Contact</th>
              <th className="py-2 px-4">Website</th>
              <th className="py-2 px-4">Established Year</th>
              <th className="py-2 px-4">Accreditation</th>
              <th className="py-2 px-4">Admission Process</th>
              <th className="py-2 px-4">Application Form</th>
              <th className="py-2 px-4">Description</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="py-2 px-4">{collegeData.collegeName}</td>
              <td className="py-2 px-4">{collegeData.affiliatedUniversity}</td>
              <td className="py-2 px-4">{collegeData.collegeCategory}</td>
              <td className="py-2 px-4">{collegeData.collegeType}</td>
              <td className="py-2 px-4">{collegeData.location.lat}, {collegeData.location.lan}</td>
              <td className="py-2 px-4">
                {collegeData.address.line1}, {collegeData.address.line2}, {collegeData.address.dist}, {collegeData.address.state} - {collegeData.address.pincode}
              </td>
              <td className="py-2 px-4">{collegeData.contactDetails}</td>
              <td className="py-2 px-4">
                <a href={collegeData.websiteURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  {collegeData.websiteURL}
                </a>
              </td>
              <td className="py-2 px-4">{collegeData.establishedYear}</td>
              <td className="py-2 px-4">{collegeData.accreditation}</td>
              <td className="py-2 px-4">{collegeData.admissionProcess}</td>
              <td className="py-2 px-4">
                <a href={collegeData.applicationFormURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  Apply Here
                </a>
              </td>
              <td className="py-2 px-4">{collegeData.info.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollegeTable;
