

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FacultyManagement = ({ classId }) => {
  const [facultyData, setFacultyData] = useState([]);
  const [facultyNames, setFacultyNames] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // GET: Fetch Faculty Data
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/faculty/${classId}`);
        if (response.data.statusCode === 200) {
          setFacultyData(response.data.success);
        } else {
          setError("Failed to fetch faculty data.");
        }
      } catch (err) {
        setError("Error fetching faculty data.");
      }
    };
    fetchFaculty();
  }, [classId]);

  // POST: Create Faculty Data
  const handleCreate = async () => {
    setLoading(true);
    const data = {
      classId,
      staff_Name: facultyNames,
      staff_Profile: profiles,
      subject: subjects,
      experiences: experiences
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/faculty/create`, data);
      if (response.data.statusCode === 201) {
        setMessage("Faculty added successfully!");
      } else {
        setMessage("Failed to add faculty.");
      }
    } catch (err) {
      setMessage("Error while adding faculty.");
    } finally {
      setLoading(false);
    }
  };

  // PUT: Update Faculty Data
  const handleUpdate = async () => {
    setLoading(true);
    const data = {
      classId,
      staff_Name: facultyNames,
      staff_Profile: profiles,
      subject: subjects,
      experiences: experiences
    };

    try {
      const response = await axios.put(`${API_BASE_URL}/api/faculty/update/${classId}`, data);
      if (response.data.statusCode === 200) {
        setMessage("Faculty updated successfully!");
      } else {
        setMessage("Failed to update faculty.");
      }
    } catch (err) {
      setMessage("Error while updating faculty.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Faculty Management</h2>

        {/* Error Message */}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        {/* Success/Info Message */}
        {message && <div className="text-green-600 text-center mb-4">{message}</div>}

        {/* Display Faculty Data (GET Method) */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Existing Faculty</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyData.length === 0 ? (
              <p className="text-center text-gray-500 col-span-3">No faculty data available.</p>
            ) : (
              facultyData.map((faculty, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-bold text-blue-500">{faculty.classId.className}</h4>
                  {faculty.staff_Name.map((name, i) => (
                    <div key={i} className="mt-4">
                      <p className="text-gray-800">Name: {name}</p>
                      <p className="text-gray-600">Subject: {faculty.subject[i]}</p>
                      <p className="text-gray-600">Experience: {faculty.experiences[i]} years</p>
                      <img
                        src={faculty.staff_Profile[i]}
                        alt={name}
                        className="mt-2 w-24 h-24 object-cover rounded-full mx-auto"
                      />
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Create New Faculty (POST Method) */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Faculty</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              className="p-2 rounded border border-gray-300 w-full"
              placeholder="Faculty Names (comma separated)"
              value={facultyNames.join(', ')}
              onChange={(e) => setFacultyNames(e.target.value.split(', '))}
            />
            <input
              type="text"
              className="p-2 rounded border border-gray-300 w-full"
              placeholder="Subjects (comma separated)"
              value={subjects.join(', ')}
              onChange={(e) => setSubjects(e.target.value.split(', '))}
            />
            <input
              type="number"
              className="p-2 rounded border border-gray-300 w-full"
              placeholder="Experiences (comma separated)"
              value={experiences.join(', ')}
              onChange={(e) => setExperiences(e.target.value.split(', ').map(Number))}
            />
            <input
              type="text"
              className="p-2 rounded border border-gray-300 w-full"
              placeholder="Profile Image URLs (comma separated)"
              value={profiles.join(', ')}
              onChange={(e) => setProfiles(e.target.value.split(', '))}
            />
          </div>
          <button
            onClick={handleCreate}
            className="mt-6 bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Faculty"}
          </button>
        </div>

        {/* Update Faculty (PUT Method) */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Update Faculty</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              className="p-2 rounded border border-gray-300 w-full"
              placeholder="Faculty Names (comma separated)"
              value={facultyNames.join(', ')}
              onChange={(e) => setFacultyNames(e.target.value.split(', '))}
            />
            <input
              type="text"
              className="p-2 rounded border border-gray-300 w-full"
              placeholder="Subjects (comma separated)"
              value={subjects.join(', ')}
              onChange={(e) => setSubjects(e.target.value.split(', '))}
            />
            <input
              type="number"
              className="p-2 rounded border border-gray-300 w-full"
              placeholder="Experiences (comma separated)"
              value={experiences.join(', ')}
              onChange={(e) => setExperiences(e.target.value.split(', ').map(Number))}
            />
            <input
              type="text"
              className="p-2 rounded border border-gray-300 w-full"
              placeholder="Profile Image URLs (comma separated)"
              value={profiles.join(', ')}
              onChange={(e) => setProfiles(e.target.value.split(', '))}
            />
          </div>
          <button
            onClick={handleUpdate}
            className="mt-6 bg-green-600 text-white p-3 rounded-lg w-full hover:bg-green-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Faculty"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyManagement;


