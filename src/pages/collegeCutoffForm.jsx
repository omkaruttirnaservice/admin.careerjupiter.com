// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl";

// const CollegeCutoffForm = () => {
//   const [selectedCastes, setSelectedCastes] = useState([]);
//   const [casteCategory, setCasteCategory] = useState("");
//   const [castePercent, setCastePercent] = useState("");
//   const [cutoffList, setCutoffList] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [collegeIdInput, setCollegeIdInput] = useState("");
//   const [casteList, setCasteList] = useState([]);
//   const [allCastes, setAllCastes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");


//   const formik = useFormik({
//     initialValues: {
//       collegeId: "",
//       collegeName: "",
//       category: "Diploma",
//       subCategory: "",
//     },

//     onSubmit: async (values) => {
//       setIsSubmitting(true);
//       const cutoff = selectedCastes.map((item) => ({
//         caste: item._id, // ✅ caste ID from fetched caste list
//         marks: Number(item.percent), // ✅ percent entered
//       }));

//       const payload = {
//         collegeId: values.collegeId,
//         collegeName: values.collegeName,
//         category: values.category,
//         subCategory: [values.subCategory], // wrap in array
//         cutoff: cutoff, // ✅ correct structure
//       };

//       try {
//         if (editingId) {
//           await axios.put(`${API_BASE_URL}/api/cutoff/${editingId}`, payload);
//           alert("Cutoff updated successfully");
//         } else {
//           await axios.post(`${API_BASE_URL}/api/cutoff/create`, payload);
//           alert("Cutoff created successfully");
//         }

//         // Reset form
//         setEditingId(null);
//         fetchCutoffList();
//         formik.resetForm();
//         setSelectedCastes([]);
//       } catch (err) {
//         console.error("Submission failed:", err);
//         alert("Something went wrong!");
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//   });

//   const handleAddCaste = () => {
//     if (!casteCategory || !castePercent) return;

//     const selectedCaste = allCastes.find((c) => c.caste === casteCategory);
//     if (!selectedCaste) {
//       alert("Caste not found in list");
//       return;
//     }

//     if (selectedCastes.find((item) => item.caste === casteCategory)) {
//       alert("This caste is already added.");
//       return;
//     }

//     setSelectedCastes([
//       ...selectedCastes,
//       {
//         _id: selectedCaste._id, // ✅ caste ID
//         caste: selectedCaste.caste, // readable caste name
//         percent: Number(castePercent), // user-entered %
//       },
//     ]);

//     setCasteCategory("");
//     setCastePercent("");
//   };

//   const fetchCutoffList = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/cutoff/all`);
//       setCutoffList(res.data?.data || []); // ✅ Always returns an array
//     } catch (err) {
//       console.error("Error fetching cutoff list:", err);
//       setCutoffList([]); // ✅ Safe fallback
//     }
//   };

//   useEffect(() => {
//     fetchCutoffList();
//   }, []);

//   useEffect(() => {
//     const fetchCastes = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/caste/all`);
//         setAllCastes(res.data?.data?.castes || []);
//       } catch (err) {
//         console.error("Failed to fetch castes", err);
//       }
//     };

//     fetchCastes();
//   }, []);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(
//           `${API_BASE_URL}/api/college/all-college-category`
//         );
//         setCategoryData(res.data.data || []);
//       } catch (err) {
//         console.error("Failed to fetch category data:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const fetchCollegeDetails = async (collegeId) => {
//     if (!collegeId) return;

//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/college/details`, {
//         collegeId,
//       });

//       const response = res.data;

//       if (!response.success) {
//         alert(response.message || "Something went wrong."); // ✅ Backend message
//         formik.setFieldValue("collegeName", "");
//         formik.setFieldValue("category", "");
//         formik.setFieldValue("subCategory", "");
//         setSubCategories([]);
//         return;
//       }

//       const data = response.data;

//       formik.setFieldValue("collegeName", data.collegeName || "");
//       formik.setFieldValue("category", data.category || "");
//       setSubCategories(data.subCategory || []);

//       if (data.subCategory?.length) {
//         formik.setFieldValue("subCategory", data.subCategory[0]);
//       } else {
//         formik.setFieldValue("subCategory", "");
//       }
//     } catch (err) {
//       const serverMsg =
//         err?.response?.data?.message || "An unexpected error occurred.";
//       alert(serverMsg); // ✅ Show backend message from error if any
//     }
//   };

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (collegeIdInput.trim()) {
//         fetchCollegeDetails(collegeIdInput.trim());
//       }
//     }, 900); // 900ms delay

//     return () => clearTimeout(delay); // Cleanup on next input
//   }, [collegeIdInput]);

//   const handleEnableEdit = (id) => {
//     setCutoffList((prev) =>
//       prev.map((row) => (row._id === id ? { ...row, isEditing: true } : row))
//     );
//   };

//   const filteredCutoffList = cutoffList.filter((item) =>
//   item.collegeName.toLowerCase().includes(searchQuery.toLowerCase())
// );


// const handleInlineEdit = (rowId, key, value) => {
//   const updatedList = cutoffList.map((item) => {
//     if (item._id !== rowId) return item;

//     let updatedCutoff = item.cutoff;

//     if (key === "subCategory") {
//       return {
//         ...item,
//         subCategory: value.split(",").map((s) => s.trim()),
//         isEditing: true,
//       };
//     }

//     // Edit caste marks
//     if (Array.isArray(updatedCutoff)) {
//       const index = updatedCutoff.findIndex((cut) => cut.caste === key);
//       if (index >= 0) {
//         updatedCutoff[index].marks = value;
//       } else {
//         updatedCutoff.push({ caste: key, marks: value });
//       }
//     } else {
//       updatedCutoff = [{ caste: key, marks: value }];
//     }

//     return {
//       ...item,
//       cutoff: updatedCutoff,
//       isEditing: true,
//     };
//   });

//   setCutoffList(updatedList);
// };

// const handleSaveInlineEdit = async (item) => {
//   // Construct cutoff array (with caste ID and marks)
//   const updatedCutoff = allCastes
//     .map((caste) => {
//       const value = Array.isArray(item.cutoff)
//         ? item.cutoff.find((c) => c.caste === caste._id)?.marks
//         : null;
//       const percent = parseFloat(value);

//       if (!isNaN(percent) && percent >= 0 && percent <= 100) {
//         return { caste: caste._id, marks: percent };
//       }
//       return null;
//     })
//     .filter(Boolean); // Remove invalid/null

//   // Build full payload
//   const payload = {
//     collegeId: item.collegeId,
//     collegeName: item.collegeName,
//     category: item.category,
//     subCategory: Array.isArray(item.subCategory)
//       ? item.subCategory
//       : item.subCategory.split(",").map((s) => s.trim()),
//     cutoff: updatedCutoff,
//   };

//   try {
//     await axios.put(`${API_BASE_URL}/api/cutoff/${item._id}`, payload);
//     alert("Cutoff updated successfully");
//     fetchCutoffList();
//   } catch (err) {
//     console.error("Update error:", err);
//     alert("Failed to update cutoff");
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-10 px-4">
//       {/* FORM CARD */}
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-blue-300">
//         <h2 className="text-3xl font-bold text-blue-800 mb-6">
//           🏫 Add College Cutoff
//         </h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-6">
//           {/* Basic Info */}
//           <fieldset className="border border-blue-200 rounded-xl p-5 shadow-sm">
//             <legend className="text-xl font-semibold text-blue-700 mb-2 px-2">
//               College Info
//             </legend>
//             <div className="grid md:grid-cols-3 gap-4">
//               <input
//                 name="collegeId"
//                 placeholder="College ID"
//                 className="p-3 border border-gray-300 rounded-md shadow-sm"
//                 value={formik.values.collegeId}
//                 onChange={(e) => {
//                   formik.setFieldValue("collegeId", e.target.value);
//                   setCollegeIdInput(e.target.value); // 👈 trigger debounce
//                 }}
//               />

//               <input
//                 name="collegeName"
//                 placeholder="College Name"
//                 className="p-3 border border-gray-300 rounded-md shadow-sm"
//                 onChange={formik.handleChange}
//                 value={formik.values.collegeName}
//               />
//               <select
//                 name="category"
//                 className="p-3 border border-gray-300 rounded-md shadow-sm"
//                 onChange={(e) => {
//                   const selected = e.target.value;
//                   formik.setFieldValue("category", selected);
//                   const found = categoryData.find(
//                     (cat) => cat.category === selected
//                   );
//                   setSubCategories(found?.subCategory || []);
//                   formik.setFieldValue("subCategory", "");
//                 }}
//                 value={formik.values.category}
//               >
//                 <option value="">Select Category</option>
//                 {categoryData.map((cat, i) => (
//                   <option key={i} value={cat.category}>
//                     {cat.category}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </fieldset>

//           {/* Subcategory */}
//           <fieldset className="border border-blue-200 rounded-xl p-5 shadow-sm">
//             <legend className="text-xl font-semibold text-blue-700 mb-2 px-2">
//               Branch Selection
//             </legend>
//             <div className="mb-4">
//               <select
//                 name="subCategory"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
//                 value={formik.values.subCategory}
//                 onChange={formik.handleChange}
//               >
//                 <option value="">Select Subcategory</option>
//                 {subCategories.map((sub, i) => (
//                   <option key={i} value={sub}>
//                     {sub}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </fieldset>

//           {/* Cutoff Section */}
//           <fieldset className="border border-blue-200 rounded-xl p-5 shadow-sm">
//             <legend className="text-xl font-semibold text-blue-700 mb-2 px-2">
//               Cutoff Details
//             </legend>
//             <div className="flex flex-wrap gap-4 items-center">
//               <select
//                 value={casteCategory}
//                 onChange={(e) => setCasteCategory(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-md w-full md:w-1/3"
//               >
//                 <option value="">Select Caste</option>
//                 {allCastes.map((caste) => (
//                   <option key={caste._id} value={caste.caste}>
//                     {caste.caste}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="number"
//                 placeholder="Enter %"
//                 min="0"
//                 max="100"
//                 value={castePercent}
//                 onChange={(e) => setCastePercent(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-md w-full md:w-1/3"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddCaste}
//                 className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
//               >
//                 ➕ Add Caste
//               </button>
//             </div>

//             {selectedCastes.length > 0 && (
//               <div className="mt-4 flex flex-wrap gap-3">
//                 {selectedCastes.map((item, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-2 bg-blue-100 text-black px-4 py-1.5 rounded-lg font-semibold shadow-md text-sm hover:shadow-lg transition"
//                   >
//                     <span>
//                       {item.caste}: {item.percent}%
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setSelectedCastes(
//                           selectedCastes.filter((c) => c._id !== item._id)
//                         )
//                       }
//                       className="text-red-600 hover:text-red-800 font-bold ml-1"
//                       title="Remove"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </fieldset>

//           {/* Submit Button */}
//           <div className="text-right">
//             {editingId && (
//               <button
//                 type="button"
//                 className="text-sm text-gray-600 hover:underline mr-4"
//                 onClick={() => {
//                   setEditingId(null);
//                   formik.resetForm();
//                   setSelectedCastes([]);
//                 }}
//               >
//                 🔁 Cancel Edit
//               </button>
//             )}

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`px-6 py-3 rounded-md transition shadow-md ${
//                 isSubmitting
//                   ? "bg-blue-300 cursor-not-allowed"
//                   : "bg-blue-700 hover:bg-blue-800 text-white"
//               }`}
//             >
//               {isSubmitting ? "⏳ Submitting..." : "🚀 Submit Cutoff"}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* TABLE SECTION */}
//       <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-blue-200">
//         <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
//           📊 All Submitted Cutoffs
//         </h3>

//                   <input
//   type="text"
//   placeholder="Search college..."
//   className="p-2 border rounded w-full mb-4"
//   value={searchQuery}
//   onChange={(e) => setSearchQuery(e.target.value)}
// />
//         <div className="overflow-x-auto">
//           <table className="w-full border text-sm text-left shadow-sm">

//             <thead className="bg-blue-100 text-blue-900">
//               <tr>
//                 <th className="border px-3 py-2">College ID</th>
//                 <th className="border px-3 py-2">College Name</th>
//                 <th className="border px-3 py-2">Category</th>
//                 <th className="border px-3 py-2">Subcategory</th>
//                 {allCastes.map((caste) => (
//                   <th key={caste._id} className="border px-3 py-2">
//                     {caste.caste}
//                   </th>
//                 ))}
//                 <th className="border px-3 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(
//           cutoffList
//             .filter((item) =>
//               item.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               item.collegeId.toLowerCase().includes(searchQuery.toLowerCase())
//             )
//             .reduce((acc, item) => {
//               const id = item.collegeId;
//               if (!acc[id]) {
//                 acc[id] = {
//                   collegeName: item.collegeName,
//                   category: item.category,
//                   rows: [],
//                 };
//               }
//               acc[id].rows.push(item);
//               return acc;
//             }, {})
//         ).map(([collegeId, group]) =>
//           group.rows.map((item, idx) => (
//             <tr key={item._id} className="hover:bg-gray-50">
//               {idx === 0 && (
//                 <>
//                   <td rowSpan={group.rows.length} className="border px-3 py-2 font-medium">{collegeId}</td>
//                   <td rowSpan={group.rows.length} className="border px-3 py-2 font-medium">{group.collegeName}</td>
//                   <td rowSpan={group.rows.length} className="border px-3 py-2 font-medium">{group.category}</td>
//                 </>
//               )}
//               <td className="border px-3 py-2">
//                 <input
//                   className="w-full p-1 border rounded"
//                   value={Array.isArray(item.subCategory) ? item.subCategory.join(', ') : item.subCategory || ''}
//                   disabled={!item.isEditing}
//                   onChange={(e) => handleInlineEdit(item._id, "subCategory", e.target.value)}
//                 />
//               </td>
//               {allCastes.map((caste) => {
//                 const casteMark = Array.isArray(item.cutoff)
//                   ? item.cutoff.find((cut) => cut.caste === caste._id)?.marks || ""
//                   : "";
//                 return (
//                   <td key={caste._id} className="border px-3 py-2">
//                     <input
//                       type="number"
//                       className="w-16 p-1 border rounded text-center"
//                       value={casteMark}
//                       min="0"
//                       max="100"
//                       disabled={!item.isEditing}
//                       onChange={(e) => handleInlineEdit(item._id, caste._id, e.target.value)}
//                     />
//                   </td>
//                 );
//               })}
//               <td className="border px-3 py-2 text-right whitespace-nowrap">
//                 {item.isEditing ? (
//                   <button
//                     className="px-2 py-1 text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md mr-2"
//                     onClick={() => handleSaveInlineEdit(item)}
//                   >
//                     📂
//                   </button>
//                 ) : (
//                   <button
//                     className="text-blue-600 hover:underline mr-4"
//                     onClick={() => handleEnableEdit(item._id)}
//                   >
//                     ✏️ Edit
//                   </button>
//                 )}
//                 <button
//                   className="text-red-600 hover:underline"
//                   onClick={async () => {
//                     const confirmDelete = window.confirm("Are you sure you want to delete this cutoff?");
//                     if (!confirmDelete) return;
//                     try {
//                       await axios.delete(`${API_BASE_URL}/api/cutoff/${item._id}`);
//                       alert("Cutoff deleted successfully");
//                       fetchCutoffList();
//                     } catch (err) {
//                       console.error("Delete error:", err);
//                       alert("Failed to delete cutoff");
//                     }
//                   }}
//                 >
//                   🔚️
//                 </button>
//               </td>
//             </tr>
//           ))
//         )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollegeCutoffForm;


// CollegeCutoffForm.jsx
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { useParams } from "react-router-dom";
import Select from "react-select";


const CollegeCutoffForm = () => {
  const [selectedCastes, setSelectedCastes] = useState([]);
  const [casteCategory, setCasteCategory] = useState("");
  const [castePercent, setCastePercent] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [collegeIdInput, setCollegeIdInput] = useState("");
  const [allCastes, setAllCastes] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      collegeId: "",
      collegeName: "",
      category: "Diploma",
      subCategory: "",
    },
    // onSubmit: async (values) => {
    //   setIsSubmitting(true);
    //   const cutoff = selectedCastes.map((item) => ({
    //     caste: item._id,
    //     marks: Number(item.percent),
    //   }));

    //   const payload = {
    //     collegeId: values.collegeId,
    //     collegeName: values.collegeName,
    //     category: values.category,
    //     subCategory: [values.subCategory],
    //     cutoff,
    //   };

    //   try {
    //     await axios.post(`${API_BASE_URL}/api/cutoff/create`, payload);
    //     alert("Cutoff created successfully");
    //     formik.resetForm();
    //     setSelectedCastes([]);
    //   } catch (err) {
    //     alert("Submission failed");
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // },

    onSubmit: async (values) => {
  setIsSubmitting(true);
  const cutoff = selectedCastes.map((item) => ({
    caste: item._id,
    marks: Number(item.percent),
  }));

  const payload = {
    collegeId: values.collegeId,
    collegeName: values.collegeName,
    category: values.category,
    subCategory: [values.subCategory],
    cutoff,
  };

  try {
    if (editingId) {
      await axios.put(`${API_BASE_URL}/api/cutoff/${editingId}`, payload);
      alert("Cutoff updated successfully");
    } else {
      await axios.post(`${API_BASE_URL}/api/cutoff/create`, payload);
      alert("Cutoff created successfully");
    }

    formik.resetForm();
    setSelectedCastes([]);
    setEditingId(null);
    navigate("/cutoff-table");
  } catch (err) {
    console.error("Submission failed:", err);
    alert("Submission failed");
  } finally {
    setIsSubmitting(false);
  }
},

  });

useEffect(() => {
  if (!id) return;

  const fetchCutoffById = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/cutoff/${id}`);
      const data = res.data.data;

      formik.setValues({
        collegeId: data.collegeId || "",
        collegeName: data.collegeName || "",
        category: data.category || "",
        subCategory: data.subCategory?.[0] || "",
      });

      setCollegeIdInput(data.collegeId);
      setSelectedCastes(
        (data.cutoff || []).map((cut) => ({
          _id: cut.caste,
          caste: allCastes.find((c) => c._id === cut.caste)?.caste || "",
          percent: cut.marks,
        }))
      );

      setEditingId(data._id);
    } catch (err) {
      console.error("Failed to load cutoff:", err);
      alert("Failed to fetch cutoff details");
    }
  };

  fetchCutoffById();
}, [id, allCastes]); // include allCastes so caste names load correctly


  // const handleAddCaste = () => {
  //   const selected = allCastes.find((c) => c.caste === casteCategory);
  //   if (!selected || selectedCastes.find((c) => c._id === selected._id)) return;
  //   setSelectedCastes([...selectedCastes, { _id: selected._id, caste: selected.caste, percent: castePercent }]);
  //   setCasteCategory("");
  //   setCastePercent("");
  // };

const handleAddCaste = () => {
  const selected = allCastes.find((c) => c._id === casteCategory);
  if (!selected || selectedCastes.find((c) => c._id === selected._id)) return;

  setSelectedCastes([
    ...selectedCastes,
    { _id: selected._id, caste: selected.caste, percent: castePercent },
  ]);

  setCasteCategory("");
  setCastePercent("");
};


  useEffect(() => {
    const fetchCastes = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/caste/all`);
      setAllCastes(res.data?.data?.castes || []);
    };
    fetchCastes();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/college/all-college-category`);
      setCategoryData(res.data.data || []);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!collegeIdInput) return;
      axios
        .post(`${API_BASE_URL}/api/college/details`, { collegeId: collegeIdInput })
        .then((res) => {
          const data = res.data.data;
          formik.setFieldValue("collegeName", data.collegeName || "");
          formik.setFieldValue("category", data.category || "");
          setSubCategories(data.subCategory || []);
          formik.setFieldValue("subCategory", data.subCategory?.[0] || "");
        })
        .catch((err) => alert(err.response?.data?.message || "Fetch failed"));
    }, 700);
    return () => clearTimeout(delay);
  }, [collegeIdInput]);

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800">🏫 Add College Cutoff</h2>
          <button
            onClick={() => navigate("/cutoff-table")}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            📊 View Cutoff Table
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <fieldset className="border p-4 rounded-xl">
            <legend className="text-lg font-semibold text-blue-700 mb-2">College Info</legend>
            <div className="grid md:grid-cols-3 gap-4">
              <input name="collegeId" placeholder="College ID" className="border p-2 rounded"
                value={formik.values.collegeId}
                onChange={(e) => {
                  formik.setFieldValue("collegeId", e.target.value);
                  setCollegeIdInput(e.target.value);
                }}
              />
              <input name="collegeName" placeholder="College Name" className="border p-2 rounded"
                value={formik.values.collegeName} onChange={formik.handleChange} />
              <select name="category" className="border p-2 rounded" value={formik.values.category}
                onChange={(e) => {
                  const val = e.target.value;
                  formik.setFieldValue("category", val);
                  const cat = categoryData.find((c) => c.category === val);
                  setSubCategories(cat?.subCategory || []);
                  formik.setFieldValue("subCategory", "");
                }}
              >
                <option value="">Select Category</option>
                {categoryData.map((cat) => (
                  <option key={cat.category} value={cat.category}>{cat.category}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className="border p-4 rounded-xl">
            <legend className="text-lg font-semibold text-blue-700 mb-2">Branch Selection</legend>
            <select name="subCategory" className="border p-2 rounded w-full"
              value={formik.values.subCategory} onChange={formik.handleChange}>
              <option value="">Select Subcategory</option>
              {subCategories.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </fieldset>

          {/* <fieldset className="border p-4 rounded-xl">
            <legend className="text-lg font-semibold text-blue-700 mb-2">Cutoff Details</legend>
            <div className="flex gap-4 flex-wrap items-center">
              <select value={casteCategory} onChange={(e) => setCasteCategory(e.target.value)}
                className="border p-2 rounded w-full md:w-1/3">
                <option value="">Select Caste</option>
                {allCastes.map((c) => <option key={c._id} value={c.caste}>{c.caste}</option>)}
              </select>
              <input type="number" placeholder="Enter %" value={castePercent}
                onChange={(e) => setCastePercent(e.target.value)}
                className="border p-2 rounded w-full md:w-1/3" />
              <button type="button" onClick={handleAddCaste}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                ➕ Add Caste
              </button>
            </div>
            <div className="mt-4 flex gap-3 flex-wrap">
              {selectedCastes.map((item, i) => (
                <div key={i} className="bg-blue-100 px-4 py-2 rounded-full flex gap-2 items-center">
                  <span>{item.caste}: {item.percent}%</span>
                  <button type="button" onClick={() => setSelectedCastes(selectedCastes.filter((c) => c._id !== item._id))}>
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </fieldset> */}

          <fieldset className="border p-4 rounded-xl">
  <legend className="text-lg font-semibold text-blue-700 mb-2">Cutoff Details</legend>

  <div className="flex gap-4 flex-wrap items-center">
    {/* 👇 Searchable Caste Dropdown */}
    <div className="w-full md:w-1/3 border border-black rounded-md">
      <Select
        options={allCastes.map((c) => ({
          value: c._id,
          label: c.caste,
        }))}
        placeholder="Search & select caste"
        value={
          casteCategory
            ? allCastes
                .map((c) => ({ value: c._id, label: c.caste }))
                .find((opt) => opt.value === casteCategory)
            : null
        }
        onChange={(selected) => setCasteCategory(selected?.value || "")}
        isSearchable
      />
    </div>

    {/* 👇 Caste Percentage Input */}
    <input
      type="number"
      placeholder="Enter %"
      value={castePercent}
      onChange={(e) => setCastePercent(e.target.value)}
      className="border p-2 rounded w-full md:w-1/3"
    />

    {/* 👇 Add Button */}
    <button
      type="button"
      onClick={handleAddCaste}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      ➕ Add Caste
    </button>
  </div>

  {/* 👇 Display Added Castes */}
  <div className="mt-4 flex gap-3 flex-wrap">
    {selectedCastes.map((item, i) => (
      <div
        key={i}
        className="bg-blue-100 px-4 py-2 rounded-full flex gap-2 items-center"
      >
        <span>{item.caste}: {item.percent}%</span>
        <button
          type="button"
          onClick={() =>
            setSelectedCastes(selectedCastes.filter((c) => c._id !== item._id))
          }
        >
          ❌
        </button>
      </div>
    ))}
  </div>
</fieldset>


          <div className="text-right">
            <button type="submit" className="bg-blue-700 text-white px-6 py-2 rounded shadow-md">
              🚀 Submit Cutoff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeCutoffForm;