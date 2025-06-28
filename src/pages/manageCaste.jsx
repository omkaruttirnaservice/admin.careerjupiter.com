// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl";
// import Swal from "sweetalert2";

// const ManageCaste = () => {
//   const [casteName, setCasteName] = useState("");
//   const [casteList, setCasteList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [editingName, setEditingName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editingNextLearn, setEditingNextLearn] = useState("");
//   const [editingExam, setEditingExam] = useState("");

//   // Fields for eligibility entry
//   const [nextLearn, setNextLearn] = useState("");
//   const [exams, setExams] = useState([{ id: Date.now(), value: "" }]);
//   const [castes, setCastes] = useState([{ id: Date.now() + 1, value: "" }]);
//   const [addingGroupId, setAddingGroupId] = useState(null);
//   const [newCasteName, setNewCasteName] = useState("");

//   let serial = 1;

// //  const fetchCastes = async () => {
// //   try {
// //     const res = await axios.get(`${API_BASE_URL}/api/caste/all`);
// //     const casteGroups = res.data?.data?.castes || [];

// //     // Flatten caste array
// //     const flatCastes = casteGroups.flatMap((group) =>
// //       group.caste.map((c) => ({
// //         _id: `${group._id}_${c}`,
// //         caste: c,
// //         nextLearn: group.nextLearn || "",
// //         exam: group.exam || [],
// //         groupId: group._id,
// //       }))
// //     );

// //     setCasteList(flatCastes);
// //   } catch (err) {
// //     console.error("Failed to fetch castes", err);
// //   }
// // };

// const fetchCastes = async () => {
//   try {
//     const res = await axios.get(`${API_BASE_URL}/api/caste/all`);
//     const casteGroups = res.data?.data?.castes || [];

//     // You no longer flatten — store the group directly
//     setCasteList(casteGroups);
//   } catch (err) {
//     console.error("Failed to fetch castes", err);
//   }
// };

// useEffect(() => {
//   fetchCastes();
// }, []);

//   // const handleSaveEdit = async (id, groupId) => {
//   //   const updatedCaste = {
//   //     caste: [editingName], // ✅ Wrap in array
//   //     nextLearn: editingNextLearn,
//   //     exam: editingExam
//   //       .split(",")
//   //       .map((e) => e.trim())
//   //       .filter((e) => e !== ""), // ✅ remove empty strings
//   //   };

//   //   try {
//   //     await axios.put(`${API_BASE_URL}/api/caste/${groupId}`, updatedCaste);
//   //     setEditingId(null);
//   //     fetchCastes();
//   //   } catch (err) {
//   //     console.error("Failed to update caste", err);
//   //   }
//   // };

// // const handleSaveEdit = async (id, groupId) => {
// //   try {
// //     // Get all caste objects for the current groupId
// //     const updatedGroup = filteredCastes.filter((c) => c.groupId === groupId);

// //     // Replace the caste name being edited
// //     const updatedCastesArray = updatedGroup.map((c) =>
// //       c._id === id ? editingName.trim() : c.caste
// //     );

// //     const updatedCaste = {
// //       caste: updatedCastesArray, // ✅ full updated array
// //       nextLearn: editingNextLearn.trim(),
// //       exam: editingExam
// //         .split(",")
// //         .map((e) => e.trim())
// //         .filter(Boolean), // ✅ no empty strings
// //     };

// //     await axios.put(`${API_BASE_URL}/api/caste/${groupId}`, updatedCaste);

// //     setEditingId(null);
// //     fetchCastes();
// //     Swal.fire("Success", "Caste group updated successfully", "success");
// //   } catch (err) {
// //     console.error("Failed to update caste", err);
// //     const userMsg = err?.response?.data?.usrMsg || "Update failed. Please try again.";
// //     Swal.fire("Error", userMsg, "error");
// //   }
// // };

//   // const handleDelete = async (id, groupId) => {
//   //   const confirmDelete = window.confirm(
//   //     "Are you sure you want to delete this caste?"
//   //   );
//   //   if (!confirmDelete) return;

//   //   try {
//   //     await axios.delete(`${API_BASE_URL}/api/caste/${groupId}`);
//   //     Swal.fire({
//   //       icon: "success",
//   //       title: "Deleted!",
//   //       text: "Caste deleted successfully.",
//   //       timer: 2000,
//   //       showConfirmButton: false,
//   //     });

//   //     fetchCastes();
//   //   } catch (err) {
//   //     console.error("Failed to delete caste", err);
//   //     const errorMsg =
//   //       err?.response?.data?.usrMsg ||
//   //       err?.response?.data?.message ||
//   //       "Please Try Again!";

//   //     Swal.fire({
//   //       icon: "warning",
//   //       title: "Oops!",
//   //       text: errorMsg,
//   //     });
//   //   }
//   // };

// // const handleDelete = async (casteName, groupId) => {
// //   const confirmDelete = await Swal.fire({
// //     title: "Are you sure?",
// //     text: `Delete caste: "${casteName}"?`,
// //     icon: "warning",
// //     showCancelButton: true,
// //     confirmButtonColor: "#d33",
// //     cancelButtonColor: "#3085d6",
// //     confirmButtonText: "Yes, delete it!",
// //   });

// //   if (!confirmDelete.isConfirmed) return;

// //   try {
// //     // Send DELETE with body using axios config object
// //     await axios.delete(`${API_BASE_URL}/api/caste/${groupId}`, {
// //       data: {
// //         casteToRemove: casteName,
// //       },
// //     });

// //     Swal.fire({
// //       icon: "success",
// //       title: "Deleted!",
// //       text: "Caste deleted successfully.",
// //       timer: 2000,
// //       showConfirmButton: false,
// //     });

// //     fetchCastes();
// //   } catch (err) {
// //     console.error("Failed to delete caste", err);
// //     const errorMsg =
// //       err?.response?.data?.usrMsg ||
// //       err?.response?.data?.message ||
// //       "Please Try Again!";

// //     Swal.fire({
// //       icon: "error",
// //       title: "Oops!",
// //       text: errorMsg,
// //     });
// //   }
// // };

//   const handleChange = (id, value, setter) => {
//     setter((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, value } : item))
//     );
//   };

//   const handleAddExam = () => {
//     setExams([...exams, { id: Date.now(), value: "" }]);
//   };

//   const handleAddCasteField = () => {
//     setCastes([...castes, { id: Date.now(), value: "" }]);
//   };

//   // const handleAddNewCasteToGroup = async (groupId, nextLearn, exam) => {
//   //   if (!newCasteName.trim()) {
//   //     alert("Please enter a caste name");
//   //     return;
//   //   }

//   //   try {
//   //     const updated = {
//   //       caste: [newCasteName.trim()], // new caste
//   //       nextLearn, // from prefilled group
//   //       exam, // from prefilled group
//   //     };

//   //     await axios.put(`${API_BASE_URL}/api/caste/${groupId}`, updated);

//   //     Swal.fire({
//   //       icon: "success",
//   //       title: "Success",
//   //       text: "Caste added successfully.",
//   //     });
//   //     fetchCastes();
//   //     setNewCasteName("");
//   //     setAddingGroupId(null);
//   //   } catch (err) {
//   //     console.error("Error adding caste to group", err);
//   //     const errorMsg =
//   //       err?.response?.data?.usrMsg ||
//   //       err?.response?.data?.message ||
//   //       "Something went wrong!";

//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Error",
//   //       text: errorMsg,
//   //     });
//   //   }
//   // };

// const handleAddNewCasteToGroup = async (groupId, nextLearn, exam) => {
//   if (!newCasteName.trim()) {
//     Swal.fire({
//       icon: "warning",
//       title: "Missing Input",
//       text: "Please enter a caste name.",
//     });
//     return;
//   }

//   try {
//     // 1️⃣ Get all caste entries for the group
//     const groupCastes = filteredCastes.filter((c) => c.groupId === groupId);

//     // 2️⃣ Extract caste names
//     const existingCastes = groupCastes.map((c) => c.caste);

//     // 3️⃣ Merge old + new caste
//     const updatedCastes = [...existingCastes, newCasteName.trim()];

//     // 4️⃣ Build the payload
//     const updated = {
//       caste: updatedCastes,
//       nextLearn,
//       exam,
//     };

//     // 5️⃣ Send the full array
//     await axios.put(`${API_BASE_URL}/api/caste/${groupId}`, updated);

//     Swal.fire({
//       icon: "success",
//       title: "Success",
//       text: "Caste added successfully.",
//     });

//     fetchCastes();
//     setNewCasteName("");
//     setAddingGroupId(null);
//   } catch (err) {
//     console.error("Error adding caste to group", err);
//     const errorMsg =
//       err?.response?.data?.usrMsg ||
//       err?.response?.data?.message ||
//       "Something went wrong!";

//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: errorMsg,
//     });
//   }
// };

//   // const handleSubmitEligibility = async () => {
//   //   const finalData = {
//   //     nextLearn: nextLearn.trim(),
//   //     exam: exams.map((e) => e.value.trim()).filter(Boolean),
//   //     // caste: castes.map((c) => c.value.trim()).filter(Boolean),
//   //   };

//   //   if (!finalData.nextLearn || finalData.caste.length === 0) {
//   //     alert("Please fill at least Next Learn and one Caste");
//   //     return;
//   //   }

//   //   try {
//   //     const res = await axios.post(`${API_BASE_URL}/api/caste/add`, finalData);
//   //     Swal.fire({
//   //       icon: "success",
//   //       title: "Success",
//   //       text: "Eligibility entry submitted successfully",
//   //     });
//   //     const newGroup = res.data?.data;
//   //     if (newGroup?._id && Array.isArray(newGroup.caste)) {
//   //       const newFlatCastes = newGroup.caste.map((c) => ({
//   //         _id: `${newGroup._id}_${c}`,
//   //         caste: c,
//   //         nextLearn: newGroup.nextLearn || "",
//   //         exam: newGroup.exam || [],
//   //         groupId: newGroup._id,
//   //       }));
//   //       setCasteList((prev) => [...prev, ...newFlatCastes]);
//   //     }
//   //   } catch (err) {
//   //     const userMsg =
//   //       err?.response?.data?.usrMsg || "Submission failed. Please try again.";

//   //     Swal.fire({
//   //       icon: "warning",
//   //       title: "Warning",
//   //       text: userMsg,
//   //     });
//   //   } finally {
//   //     // Always clear input fields regardless of success/failure
//   //     setNextLearn("");
//   //     setExams([{ id: Date.now(), value: "" }]);
//   //     setCastes([{ id: Date.now() + 1, value: "" }]);
//   //   }
//   // };

// const handleSubmitEligibility = async () => {
//   const finalData = {
//     nextLearn: nextLearn.trim(),
//     exam: exams.map((e) => e.value.trim()).filter(Boolean), // optional
//   };

//   if (!finalData.nextLearn) {
//     Swal.fire({
//       icon: "warning",
//       title: "Missing Field",
//       text: "Please enter current education.",
//     });
//     return;
//   }

//   try {
//     const res = await axios.post(`${API_BASE_URL}/api/caste/add`, finalData);

//     Swal.fire({
//       icon: "success",
//       title: "Success",
//       text: "Current education entry submitted successfully",
//     });

//     // ✅ Fetch latest entries after adding
//     fetchCastes();

//     // Clear form fields
//     setNextLearn("");
//     setExams([{ id: Date.now(), value: "" }]);

//   } catch (err) {
//     const userMsg =
//       err?.response?.data?.usrMsg || "Submission failed. Please try again.";

//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: userMsg,
//     });
//   }
// };

// const filteredCastes = casteList.filter(
//   (item) =>
//     typeof item.nextLearn === "string" &&
//     item.nextLearn.toLowerCase().includes(searchQuery.toLowerCase())
// );

//   return (
//     <div className="min-h-screen bg-blue-50 py-10 px-4">
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md border">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-3">
//           <h2 className="text-2xl font-bold text-blue-700">➕ Manage Castes</h2>
//           <input
//             type="text"
//             placeholder="Search caste..."
//             className="md:w-72 w-full p-2 border rounded"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* Add caste input */}
//         {/* Eligibility entry form */}
//         <div className="bg-blue-50 border border-blue-300 p-4 rounded-xl mb-6">
//           <h3 className="text-xl font-semibold text-blue-600 mb-3">
//             📘 Add Current Education
//           </h3>

//           <div className="mb-3">
//             <label className="font-semibold">Current Education:</label>
//             <input
//               type="text"
//               className="w-full border p-2 rounded mt-1"
//               value={nextLearn}
//               placeholder="e.g., 10th"
//               onChange={(e) => setNextLearn(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="font-semibold">Exam(s):</label>
//             {exams.map((exam, i) => (
//               <input
//                 key={exam.id}
//                 type="text"
//                 className="w-full border p-2 rounded mt-2"
//                 value={exam.value}
//                 placeholder={`Exam ${i + 1}`}
//                 onChange={(e) =>
//                   handleChange(exam.id, e.target.value, setExams)
//                 }
//               />
//             ))}
//             <button
//               className="text-blue-600 mt-2 underline"
//               onClick={handleAddExam}
//             >
//               ➕ Add Another Exam
//             </button>
//           </div>

//           {/* <div className="mb-3">
//             <label className="font-semibold">Caste(s):</label>
//             {castes.map((caste, i) => (
//               <input
//                 key={caste.id}
//                 type="text"
//                 className="w-full border p-2 rounded mt-2"
//                 value={caste.value}
//                 placeholder={`Caste ${i + 1}`}
//                 onChange={(e) =>
//                   handleChange(caste.id, e.target.value, setCastes)
//                 }
//               />
//             ))}
//             <button
//               className="text-blue-600 mt-2 underline"
//               onClick={handleAddCasteField}
//             >
//               ➕ Add Another Caste
//             </button>
//           </div> */}

//           <button
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
//             onClick={handleSubmitEligibility}
//           >
//             ✅ Save
//           </button>
//         </div>

//         {/* Table */}
//         <h3 className="text-lg font-semibold text-blue-600 mb-2">
//           📋 Current Education
//         </h3>
//        <div className="overflow-x-auto">
//   <div className="max-h-[420px] overflow-y-auto border rounded">
//     <table className="w-full border text-sm">
//       {/* Table Header */}
//       <thead className="bg-blue-100 sticky top-0 z-10">
//         <tr>
//           <th className="border px-3 py-2 text-left">#</th>
//           <th className="border px-3 py-2 text-left">Current Education</th>
//           <th className="border px-3 py-2 text-left">Exam(s)</th>
//         </tr>
//       </thead>

//       {/* Table Body */}
//       <tbody>
//         {Object.entries(
//           filteredCastes.reduce((acc, item) => {
//             const key = item.nextLearn || "Unknown";
//             if (!acc[key]) {
//               acc[key] = {
//                 nextLearn: item.nextLearn,
//                 exam: item.exam,
//                 groupId: item._id,
//               };
//             }
//             return acc;
//           }, {})
//         ).map(([key, entry], index) => (
//           <tr key={entry.groupId || index} className="hover:bg-gray-50">
//             <td className="border px-3 py-2">{index + 1}</td>
//             <td className="border px-3 py-2 font-semibold bg-blue-50">
//               {entry.nextLearn || "Unknown"}
//             </td>
//             <td className="border px-3 py-2 bg-blue-50">
//               {entry.exam?.length > 0 ? entry.exam.join(", ") : "—"}
//             </td>
//           </tr>
//         ))}

//         {/* No Data Found */}
//         {filteredCastes.length === 0 && (
//           <tr>
//             <td colSpan="3" className="text-center py-4 text-gray-500">
//               No data found.
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>

//       </div>
//     </div>
//   );
// };

// export default ManageCaste;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageCaste = () => {
  const [casteList, setCasteList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [nextLearn, setNextLearn] = useState("");
  const [exams, setExams] = useState([{ id: Date.now(), value: "" }]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedNextLearn, setEditedNextLearn] = useState("");
  const [editedExams, setEditedExams] = useState([]);
  const navigate = useNavigate();

  const fetchCastes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/caste/all`);
      setCasteList(res.data?.data?.castes || []);
    } catch (err) {
      console.error("Failed to fetch castes", err);
    }
  };

  useEffect(() => {
    fetchCastes();
  }, []);

  const startEditing = (entry) => {
    setEditingRowId(entry.groupId);
    setEditedNextLearn(entry.nextLearn || "");
    setEditedExams(entry.exam || []);
  };

  const saveUpdate = async () => {
    try {
      const updated = {
        nextLearn: editedNextLearn.trim(),
        exam: editedExams.filter(Boolean),
      };
      await axios.put(`${API_BASE_URL}/api/caste/${editingRowId}`, updated);
      Swal.fire("Updated!", "Entry has been updated successfully.", "success");
      setEditingRowId(null);
      fetchCastes();
    } catch (err) {
      Swal.fire("Error", "Update failed.", "error");
    }
  };

  const cancelEditing = () => {
    setEditingRowId(null);
    setEditedNextLearn("");
    setEditedExams([]);
  };

  const handleDeleteCaste = async (groupId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the entry.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/api/caste/${groupId}`);
        Swal.fire("Deleted!", "Entry has been deleted.", "success");
        fetchCastes();
      } catch (err) {
        Swal.fire("Error", "Delete failed!", "error");
      }
    }
  };

  const handleChange = (id, value, setter) => {
    setter((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleAddExam = () => {
    setExams([...exams, { id: Date.now(), value: "" }]);
  };

  const handleSubmitEligibility = async () => {
    const finalData = {
      nextLearn: nextLearn.trim(),
      exam: exams.map((e) => e.value.trim()).filter(Boolean),
    };

    if (!finalData.nextLearn) {
      Swal.fire({
        icon: "warning",
        title: "Missing Field",
        text: "Please enter current education.",
      });
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/caste/add`, finalData);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Entry added successfully",
      });
      fetchCastes();
      setNextLearn("");
      setExams([{ id: Date.now(), value: "" }]);
      setShowFormModal(false);
    } catch (err) {
      const userMsg =
        err?.response?.data?.usrMsg || "Submission failed. Please try again.";
      Swal.fire({ icon: "error", title: "Error", text: userMsg });
    }
  };

  const filteredCastes = casteList.filter(
    (item) =>
      typeof item.nextLearn === "string" &&
      item.nextLearn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md border min-h-[650px]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-3">
          <h2 className="text-2xl font-bold text-blue-700">➕ Manage Current Education</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search current education..."
              className="md:w-72 w-full p-2 border rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowFormModal(true)}
            >
              ➕ Add Current Education
            </button>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-blue-600 mb-2">
          📋 Current Education
        </h3>
        <div className="overflow-x-auto ">
          <div className="h-[500px] overflow-y-auto border rounded">
            <table className="w-full border text-sm">
              <thead className="bg-blue-100 sticky top-0 z-10">
                <tr>
                  <th className="border px-3 py-2 text-left">#</th>
                  <th className="border px-3 py-2 text-left">
                    Current Education
                  </th>
                  <th className="border px-3 py-2 text-left">Exam(s)</th>
                  <th className="border px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              {/* <tbody>
                {Object.entries(
                  filteredCastes.reduce((acc, item) => {
                    const key = item.nextLearn || "Unknown";
                    if (!acc[key]) {
                      acc[key] = {
                        nextLearn: item.nextLearn,
                        exam: item.exam,
                        groupId: item._id,
                      };
                    }
                    return acc;
                  }, {})
                ).map(([key, entry], index) => (
                  <tr key={entry.groupId || index} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{index + 1}</td>
                   <td className="border px-3 py-2 bg-blue-50">
  {editingRowId === entry.groupId ? (
    <input
      type="text"
      value={editedNextLearn}
      className="border p-1 w-full"
      onChange={(e) => setEditedNextLearn(e.target.value)}
    />
  ) : (
    entry.nextLearn || "Unknown"
  )}
</td>

<td className="border px-3 py-2 bg-blue-50">
  {editingRowId === entry.groupId ? (
    <div className="space-y-1">
      {editedExams.map((exam, i) => (
        <input
          key={i}
          type="text"
          value={exam}
          className="border p-1 w-full"
          onChange={(e) => {
            const updated = [...editedExams];
            updated[i] = e.target.value;
            setEditedExams(updated);
          }}
        />
      ))}
      <button
        onClick={() => setEditedExams([...editedExams, ""])}
        className="text-blue-600 text-sm mt-1"
      >
        + Add Exam
      </button>
    </div>
  ) : (
    entry.exam?.join(", ") || "—"
  )}
</td>

                      <td className="border px-3 py-2 space-x-2">
        {editingRowId === entry.groupId ? (
          <>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
              onClick={saveUpdate}
            >
              💾 Save
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs"
              onClick={cancelEditing}
            >
              ❌ Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
              onClick={() => startEditing(entry)}
            >
              ✏️ Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
              onClick={() => handleDeleteCaste(entry.groupId)}
            >
              🗑️ Delete
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
              onClick={() => handleViewCaste(entry)}
            >
              👁️ View
            </button>
          </>
        )}
      </td>
                  </tr>
                ))}
                {filteredCastes.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody> */}

              <tbody>
                {Object.entries(
                  filteredCastes.reduce((acc, item) => {
                    const key = item.nextLearn || "Unknown";
                    if (!acc[key]) {
                      acc[key] = {
                        nextLearn: item.nextLearn,
                        exam: item.exam,
                        groupId: item._id,
                      };
                    }
                    return acc;
                  }, {})
                ).map(([key, entry], index) => (
                  <tr
                    key={entry.groupId || index}
                    className="hover:bg-gray-50 align-top"
                  >
                    {/* Serial Number */}
                    <td className="border px-3 py-2">{index + 1}</td>

                    {/* Current Education (nextLearn) */}
                    <td className="border px-3 py-2 bg-blue-50 w-1/4">
                      {editingRowId === entry.groupId ? (
                        <input
                          type="text"
                          value={editedNextLearn}
                          className="border rounded px-2 py-1 w-full text-sm"
                          onChange={(e) => setEditedNextLearn(e.target.value)}
                        />
                      ) : (
                        <span className="font-semibold text-sm">
                          {entry.nextLearn}
                        </span>
                      )}
                    </td>

                    {/* Exams */}
                    <td className="border px-3 py-2 bg-blue-50 w-1/2">
                      {editingRowId === entry.groupId ? (
                        <div className="space-y-1">
                          {editedExams.map((exam, i) => (
                            <input
                              key={i}
                              type="text"
                              value={exam}
                              className="border rounded px-2 py-1 w-full text-sm"
                              onChange={(e) => {
                                const updated = [...editedExams];
                                updated[i] = e.target.value;
                                setEditedExams(updated);
                              }}
                            />
                          ))}
                          <button
                            onClick={() => setEditedExams([...editedExams, ""])}
                            className="text-blue-600 text-xs mt-1 underline"
                          >
                            + Add Exam
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm">
                          {entry.exam?.join(", ") || "—"}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="border px-3 py-2 space-x-2 whitespace-nowrap">
                      {editingRowId === entry.groupId ? (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
                            onClick={saveUpdate}
                          >
                            💾 Save
                          </button>
                          <button
                            className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs"
                            onClick={cancelEditing}
                          >
                            ❌ Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                            onClick={() => startEditing(entry)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                            onClick={() => handleDeleteCaste(entry.groupId)}
                          >
                            🗑️ Delete
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                            onClick={() => navigate(`/view-cutoff-list/${entry.groupId}`)}
                          >
                            👁️ View
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredCastes.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>

              {/* <tbody>
  {Object.entries(
    filteredCastes.reduce((acc, item) => {
      const key = item.nextLearn || "Unknown";
      if (!acc[key]) {
        acc[key] = {
          nextLearn: item.nextLearn,
          exam: item.exam,
          groupId: item._id,
        };
      }
      return acc;
    }, {})
  ).map(([key, entry], index) => (
    <tr key={entry.groupId} className="hover:bg-gray-50">
      <td className="border px-3 py-2">{index + 1}</td>

      {/* Next Learn */}
              {/* <td className="border px-3 py-2">
        {editingRowId === entry.groupId ? (
          <input
            type="text"
            value={editedNextLearn}
            className="border p-1 w-full"
            onChange={(e) => setEditedNextLearn(e.target.value)}
          />
        ) : (
          entry.nextLearn
        )}
      </td> */}

              {/* Exam(s) */}
              {/* <td className="border px-3 py-2">
        {editingRowId === entry.groupId ? (
          <div className="space-y-1">
            {editedExams.map((exam, i) => (
              <input
                key={i}
                type="text"
                value={exam}
                className="border p-1 w-full"
                onChange={(e) => {
                  const updated = [...editedExams];
                  updated[i] = e.target.value;
                  setEditedExams(updated);
                }}
              />
            ))}
            <button
              onClick={() => setEditedExams([...editedExams, ""])}
              className="text-blue-600 text-sm mt-1"
            >
              + Add Exam
            </button>
          </div>
        ) : (
          entry.exam?.join(", ") || "—"
        )}
      </td> */}

              {/* Actions */}

              {/* </tr>
  ))}
</tbody> */}
            </table>
          </div>
        </div>
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-opacity-50 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-blue-700">
              ➕ Add Current Education
            </h3>
            <div className="mb-3">
              <label className="font-semibold">Current Education:</label>
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                value={nextLearn}
                onChange={(e) => setNextLearn(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="font-semibold">Exam(s):</label>
              {exams.map((exam, i) => (
                <input
                  key={exam.id}
                  type="text"
                  className="w-full border p-2 rounded mt-2"
                  value={exam.value}
                  placeholder={`Exam ${i + 1}`}
                  onChange={(e) =>
                    handleChange(exam.id, e.target.value, setExams)
                  }
                />
              ))}
              <button
                className="text-blue-600 mt-2 underline"
                onClick={handleAddExam}
              >
                ➕ Add Another Exam
              </button>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setShowFormModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSubmitEligibility}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCaste;
