import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCollege = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await axios.get(`http://192.168.1.17:5000/api/college/${id}`);
        if (response.data.success) {
          const parsedData = JSON.parse(response.data.data);
          setCollege(parsedData.college);
        } else {
          console.error("Failed to fetch college:", response.data.usrMsg);
        }
      } catch (error) {
        console.error("Error fetching college data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://192.168.1.17:5000/api/college/${id}`, college);
      if (response.data.success) {
        alert("College updated successfully!");
        navigate("/colleges");
      } else {
        console.error("Failed to update college:", response.data.usrMsg);
      }
    } catch (error) {
      console.error("Error updating college:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollege((prevCollege) => ({
      ...prevCollege,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (!college) return <div>College not found</div>;

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Edit College</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* College Basic Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700">College Name</label>
          <input type="text" name="collegeName" value={college.collegeName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Affiliated University</label>
          <input type="text" name="affiliatedUniversity" value={college.affiliatedUniversity} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">College Category</label>
          <input type="text" name="collegeCategory" value={college.collegeCategory} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">College Type</label>
          <input type="text" name="collegeType" value={college.collegeType} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        {/* Contact & Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Details</label>
          <input type="text" name="contactDetails" value={college.contactDetails} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Website URL</label>
          <input type="text" name="websiteURL" value={college.websiteURL} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
          <input type="text" name="line1" value={college.address.line1} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
          <input type="text" name="line2" value={college.address.line2} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input type="text" name="pincode" value={college.address.pincode} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input type="text" name="state" value={college.address.state} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">District</label>
          <input type="text" name="dist" value={college.address.dist} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        {/* Admission Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Admission Process</label>
          <input type="text" name="admissionProcess" value={college.admissionProcess} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Application Form URL</label>
          <input type="text" name="applicationFormURL" value={college.applicationFormURL} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        {/* Accreditation & Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Accreditation</label>
          <input type="text" name="accreditation" value={college.accreditation} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Established Year</label>
          <input type="number" name="establishedYear" value={college.establishedYear} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Update College
        </button>
      </form>
    </div>
  );
};

export default EditCollege;
