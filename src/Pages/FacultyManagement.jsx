// import React, { useState, useEffect } from "react";
// import { Plus, Trash, CheckCheck } from "lucide-react";
// import { motion } from "framer-motion";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";

// const FacultyManagement = () => {
//   const { facultyId } = useParams();
//   const [faculty, setFaculty] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isUpdated, setIsUpdated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFaculty = async () => {
//       if (!facultyId) return;
//       setLoading(true);
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/faculty/${facultyId}`);
//         setFaculty(response.data.data || []);
//       } catch (err) {
//         setError("Failed to fetch faculty data.");
//         console.error("Error fetching faculty:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFaculty();
//   }, [facultyId]);

//   const addFaculty = () => {
//     setFaculty([...faculty, { staff_Name: "", subject: "", experiences: "", staff_Profile: "" }]);
//     setIsUpdated(true);
//   };

//   const removeFaculty = (index) => {
//     const updatedFaculty = [...faculty];
//     updatedFaculty.splice(index, 1);
//     setFaculty(updatedFaculty);
//     setIsUpdated(true);
//   };

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedFaculty = [...faculty];
//     updatedFaculty[index][name] = value;
//     setFaculty(updatedFaculty);
//     setIsUpdated(true);
//   };

//   const saveFaculty = async () => {
//     if (loading) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/faculty/create`, faculty, {
//         headers: { "Content-Type": "application/json" },
//       });
//       alert("Faculty saved successfully!");
//       setFaculty([]);
//     } catch (err) {
//       setError("Failed to save faculty.");
//       console.error("Error saving faculty:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateFaculty = async () => {
//     if (loading || !facultyId) return;
//     setLoading(true);
//     try {
//       await axios.put(`${API_BASE_URL}/api/faculty/update/${facultyId}`, faculty, {
//         headers: { "Content-Type": "application/json" },
//       });
//       alert("Faculty updated successfully!");
//     } catch (err) {
//       setError("Failed to update faculty.");
//       console.error("Error updating faculty:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="p-8 bg-white shadow-xl rounded-xl max-w-4xl mx-auto relative">
//     <button onClick={() => navigate('/faculties')} className="absolute top-4 right-4 text-red-600 text-2xl">&times;</button>
//     <h3 className="text-2xl font-bold text-blue-800 mb-4">👨‍🏫 Faculty Management</h3>

//     {error && <div className="text-red-600 mb-4">{error}</div>}

//     {faculty.map((item, index) => (
//       <motion.div key={index} className="bg-gray-100 p-6 rounded-lg mb-4 shadow-sm">
//         <label className="block font-medium">Staff Name:</label>
//         <input type="text" name="staff_Name" value={item.staff_Name} onChange={(e) => handleChange(e, index)} placeholder="Enter staff name" className="block w-full p-2 border rounded-md mb-2" />
        
//         <label className="block font-medium">Subject:</label>
//         <input type="text" name="subject" value={item.subject} onChange={(e) => handleChange(e, index)} placeholder="Enter subject" className="block w-full p-2 border rounded-md mb-2" />
        
//         <label className="block font-medium">Experience (years):</label>
//         <input type="text" name="experiences" value={item.experiences} onChange={(e) => handleChange(e, index)} placeholder="Enter experience" className="block w-full p-2 border rounded-md mb-2" />
        
//         <label className="block font-medium">Profile Description:</label>
//         <input type="text" name="staff_Profile" value={item.staff_Profile} onChange={(e) => handleChange(e, index)} placeholder="Enter profile details" className="block w-full p-2 border rounded-md mb-2" />
        
//         <button onClick={() => removeFaculty(index)} className="bg-red-600 text-white px-3 py-1 rounded-md mt-2 hover:bg-red-700">Remove</button>
//       </motion.div>
//     ))}

//     <button onClick={addFaculty} className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-700">+ Add Faculty</button>
//     <button onClick={isUpdated ? updateFaculty : saveFaculty} className={`px-4 py-2 rounded-lg ${isUpdated ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`} disabled={!isUpdated}>
//       {isUpdated ? '✅ Update Faculty' : '💾 Save Faculty'}
//     </button>
//   </section>
//   );
// };

// export default FacultyManagement;

import React, { useState, useEffect } from "react";
import { Plus, Trash, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { getCookie } from "../Utlis/cookieHelper"; // Utility to fetch cookies
import InputField from "../Component/InputField";
import FileUpload from "../Component/FileUpload";
import MultiSelectField from "../Component/MultiSelectField";
import { useFormik } from "formik";
import * as Yup from "yup";

// 📌 Add formatFacultyData here (before the component)
const formatFacultyData = (facultyList) => ({
  staff_Name: facultyList.map(f => f.staff_Name),
  subject: facultyList.map(f => f.subject),
  experiences: facultyList.map(f => Number(f.experiences)), // Ensure it's a number
  staff_Profile: facultyList.map(f => f.staff_Profile),
});

const FacultyManagement = () => {
  const [classId, setClassId] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();



  const formik = useFormik({
    initialValues: {
      faculty: [],
    },
    validationSchema: Yup.object({
      faculty: Yup.array().of(
        Yup.object().shape({
          staff_Name: Yup.string().required("Staff Name is required"),
          subject: Yup.string().required("Subject is required"),
          experiences: Yup.number()
            .required("Experience is required")
            .min(0, "Experience cannot be negative"),
          staff_Profile: Yup.string().required("Profile image is required"),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });
  

  useEffect(() => {
    const storedClassId = getCookie("classId");
    if (storedClassId) {
      setClassId(storedClassId);
      console.log("Class ID retrieved from cookies:", storedClassId);
    } else {
      console.warn("Class ID not found in cookies!");
    }
  }, []);

  useEffect(() => {
    if (!classId) return;
  
    const fetchClassDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/class/${classId}`);
        console.log("API Response:", response.data);
  
        if (response.data.success && response.data.success.length > 0) {
          const facultyData = response.data.success[0];
  
          const formattedFaculty = facultyData.staff_Name.map((name, index) => ({
            staff_Name: name || "",
            subject: facultyData.subject[index] || "",
            experiences: facultyData.experiences[index] || 0,
            staff_Profile: facultyData.staff_Profile[index] || "/default-profile.png",
          }));
  
          setFaculty(formattedFaculty);
          formik.setValues({ faculty: formattedFaculty });
        } else {
          console.error("Unexpected API response structure:", response.data);
          setError("Invalid faculty data format.");
        }
      } catch (err) {
        setError("Failed to fetch faculty data.");
        console.error("Error fetching faculty:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClassDetails();
  }, [classId]); // Run only when classId is set
  
  
  
  const addFaculty = () => {
    setFaculty([...faculty, { 
      staff_Name: "", 
      subject: "", 
      experiences: 0, 
      staff_Profile: "/default-profile.png" // Placeholder for profile image
    }]);
  
    formik.setValues({
      faculty: [...faculty, { staff_Name: "", subject: "", experiences: 0, staff_Profile: "/default-profile.png" }]
    });
  
    setIsUpdated(true);
  };
  

  const removeFaculty = (index) => {
    const updatedFaculty = faculty.filter((_, i) => i !== index);
    setFaculty(updatedFaculty);
    
    formik.setValues({ faculty: updatedFaculty });
  
    setIsUpdated(true);
  };
  
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    
    // Update Formik
    formik.setFieldValue(`faculty.${index}.${name}`, name === "experiences" ? Number(value) : value);
  
    // Update local state
    const updatedFaculty = [...faculty];
    updatedFaculty[index] = { ...updatedFaculty[index], [name]: value };
    setFaculty(updatedFaculty);
  
    setIsUpdated(true);
  };
  
  
  const saveFaculty = async () => {
    if (loading || !classId || formik.values.faculty.length === 0) {
      alert("No faculty data to save!");
      return;
    }
    setLoading(true);
    try {
      const formattedData = formatFacultyData(formik.values.faculty);
      await axios.post(`${API_BASE_URL}/api/faculty/create`, { classId, ...formattedData }, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Faculty saved successfully!");
      setIsUpdated(false);
    } catch (err) {
      setError("Failed to save faculty.");
      console.error("Error saving faculty:", err);
    } finally {
      setLoading(false);
    }
  };
    

  const updateFaculty = async () => {
    if (loading || !classId) return;
    
    if (faculty.length === 0) {
      alert("No faculty data to update!");
      return;
    }
  
    setLoading(true);
    try {
      const formattedData = formatFacultyData(faculty);
      await axios.put(`${API_BASE_URL}/api/faculty/update/${classId}`, formattedData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Faculty updated successfully!");
      setIsUpdated(false);
    } catch (err) {
      setError("Failed to update faculty.");
      console.error("Error updating faculty:", err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
<section className="p-8 bg-white shadow-xl rounded-xl max-w-4xl mx-auto relative">
  <button onClick={() => navigate('/faculties')} className="absolute top-4 right-4 text-red-600 text-2xl">
    &times;
  </button>
  <h3 className="text-2xl font-bold text-blue-800 mb-4">👨‍🏫 Faculty Management</h3>

  {error && <div className="text-red-600 mb-4">{error}</div>}

  {faculty.map((item, index) => (
  <motion.div key={index} className="bg-gray-100 p-6 rounded-lg mb-4 shadow-sm">
    
    {/* ✅ Staff Name - Text Input */}
    <InputField 
      label={`Staff Name ${index + 1}`}
      type="text"
      name={`faculty.${index}.staff_Name`} 
      formik={formik}
    />

    {/* ✅ Staff Profile - Image Upload */}
    <FileUpload
      label={`Staff Profile ${index + 1}`}
      name={`faculty.${index}.staff_Profile`}
      formik={formik}
    />

    {/* ✅ Subject - Multi Select Field */}
    <MultiSelectField 
      label={`Subjects ${index + 1}`}
      name={`faculty.${index}.subject`}
      formik={formik}
    />

    {/* ✅ Experience - Number Input */}
    <InputField 
      label={`Experience (months) ${index + 1}`}
      type="number"
      name={`faculty.${index}.experiences`} 
      formik={formik}
      min="0"
    />

    {/* ✅ Remove Button */}
    <button onClick={() => removeFaculty(index)} className="bg-red-600 text-white px-3 py-1 rounded-md mt-2 hover:bg-red-700">
      Remove
    </button>

  </motion.div>
))}


  {/* ✅ Add Faculty & Save/Update Buttons */}
  <button onClick={addFaculty} className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-700">
    + Add Faculty
  </button>
  <button 
  onClick={isUpdated ? updateFaculty : saveFaculty}
  className={`px-4 py-2 rounded-lg ${isUpdated ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
  disabled={loading || !isUpdated}
>
  {loading ? "Processing..." : isUpdated ? "✅ Update Faculty" : "💾 Save Faculty"}
</button>

</section>

  );
};

export default FacultyManagement;

