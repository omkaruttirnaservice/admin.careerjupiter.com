// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl";

// const ManageCaste = () => {
//   const [casteName, setCasteName] = useState("");
//   const [casteList, setCasteList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [editingName, setEditingName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch all castes
//   const fetchCastes = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/caste/all`);
//       setCasteList(res.data?.data?.castes || []);
//     } catch (err) {
//       console.error("Failed to fetch castes", err);
//     }
//   };

//   useEffect(() => {
//     fetchCastes();
//   }, []);

//   // Add caste
//   const handleAddCaste = async () => {
//     if (!casteName.trim()) {
//       alert("Please enter a caste name.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       await axios.post(`${API_BASE_URL}/api/caste/add`, {
//         caste: casteName.trim(),
//       });
//       alert("Caste added successfully.");
//       setCasteName("");
//       fetchCastes();
//     } catch (err) {
//       console.error("Failed to add caste", err);
//       const serverMsg =
//         err?.response?.data?.usrMsg ||
//         err?.response?.data?.message ||
//         "Error adding caste";
//       alert(serverMsg); // ✅ Show user-friendly backend message
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Save edited caste
//   const handleSaveEdit = async (id) => {
//     if (!editingName.trim()) {
//       alert("Caste name cannot be empty");
//       return;
//     }

//     try {
//       await axios.put(`${API_BASE_URL}/api/caste/${id}`, {
//         caste: editingName.trim(),
//       });
//       alert("Caste updated successfully.");
//       setEditingId(null);
//       setEditingName("");
//       fetchCastes();
//     } catch (err) {
//       console.error("Failed to update caste", err);
//       alert("Error updating caste");
//     }
//   };

//   // Delete caste
//   const handleDelete = async (id) => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete this caste?"
//     );
//     if (!confirm) return;

//     try {
//       await axios.delete(`${API_BASE_URL}/api/caste/${id}`);
//       alert("Caste deleted successfully.");
//       fetchCastes();
//     } catch (err) {
//       console.error("Failed to delete caste", err);
//       alert("Error deleting caste");
//     }
//   };

//   const filteredCastes = casteList.filter((caste) =>
//     caste.caste.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-blue-50 py-10 px-4">
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md border">
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

//         {/* Add Form */}
//         <div className="flex items-center gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter caste name"
//             className="flex-1 border p-3 rounded-md"
//             value={casteName}
//             onChange={(e) => setCasteName(e.target.value)}
//           />
//           <button
//             onClick={handleAddCaste}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             disabled={isLoading}
//           >
//             {isLoading ? "Adding..." : "Add"}
//           </button>
//         </div>

//         {/* Caste List Table */}
//         <h3 className="text-lg font-semibold text-blue-600 mb-2">
//           📋 Existing Castes
//         </h3>
//         <div className="overflow-x-auto">
//           <div className="max-h-[420px] overflow-y-auto border rounded">
//             <table className="w-full border text-sm">
//               <thead className="bg-blue-100 sticky top-0 z-10">
//                 <tr>
//                   <th className="border px-3 py-2 text-left">#</th>
//                   <th className="border px-3 py-2 text-left">Caste Name</th>
//                   <th className="border px-3 py-2 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCastes.map((caste, i) => (
//                   <tr key={caste._id} className="hover:bg-gray-50">
//                     <td className="border px-3 py-2">{i + 1}</td>
//                     <td className="border px-3 py-2">
//                       {editingId === caste._id ? (
//                         <input
//                           className="border p-1 rounded w-full"
//                           value={editingName}
//                           onChange={(e) => setEditingName(e.target.value)}
//                         />
//                       ) : (
//                         caste.caste
//                       )}
//                     </td>
//                     <td className="border px-3 py-2 whitespace-nowrap">
//                       {/* <td className="border px-3 py-2 whitespace-nowrap"> */}
//                       <div className="flex gap-2 flex-wrap">
//                         {editingId === caste._id ? (
//                           <>
//                             <button
//                               className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-sm transition duration-200 flex items-center gap-1"
//                               onClick={() => handleSaveEdit(caste._id)}
//                             >
//                               💾 <span>Save</span>
//                             </button>
//                             <button
//                               className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-lg shadow-sm transition duration-200 flex items-center gap-1"
//                               onClick={() => setEditingId(null)}
//                             >
//                               ❌ <span>Cancel</span>
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm transition duration-200 flex items-center gap-1"
//                               onClick={() => {
//                                 setEditingId(caste._id);
//                                 setEditingName(caste.caste);
//                               }}
//                             >
//                               ✏️ <span>Edit</span>
//                             </button>
//                             <button
//                               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition duration-200 flex items-center gap-1"
//                               onClick={() => handleDelete(caste._id)}
//                             >
//                               🗑️ <span>Delete</span>
//                             </button>
//                           </>
//                         )}
//                       </div>
//                       {/* </td> */}
//                     </td>
//                   </tr>
//                 ))}
//                 {casteList.length === 0 && (
//                   <tr>
//                     <td colSpan="3" className="text-center py-4 text-gray-500">
//                       No caste found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageCaste;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";

const ManageCaste = () => {
  const [casteName, setCasteName] = useState("");
  const [casteList, setCasteList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNextLearn, setEditingNextLearn] = useState("");
  const [editingExam, setEditingExam] = useState("");

  // Fields for eligibility entry
  const [nextLearn, setNextLearn] = useState("");
  const [exams, setExams] = useState([{ id: Date.now(), value: "" }]);
  const [castes, setCastes] = useState([{ id: Date.now() + 1, value: "" }]);
  const [addingGroupId, setAddingGroupId] = useState(null);
  const [newCasteName, setNewCasteName] = useState("");

  let serial = 1;

  const fetchCastes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/caste/all`);
      const casteGroups = res.data?.data?.castes || [];

      // Flatten caste array
      const flatCastes = casteGroups.flatMap((group) =>
        group.caste.map((c) => ({
          _id: `${group._id}_${c}`,
          caste: c,
          nextLearn: group.nextLearn || "",
          exam: group.exam || [],
          groupId: group._id,
        }))
      );

      setCasteList(flatCastes);
    } catch (err) {
      console.error("Failed to fetch castes", err);
    }
  };

  useEffect(() => {
    fetchCastes();
  }, []);

  // Add individual caste
  const handleAddCaste = async () => {
    if (!casteName.trim()) {
      alert("Please enter a caste name.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/caste/add`, {
        caste: casteName.trim(),
      });
      alert("Caste added successfully.");
      setCasteName("");

      // Append to casteList without refetching
      const newGroup = res.data?.data;
      if (newGroup?._id && Array.isArray(newGroup.caste)) {
        const newFlatCastes = newGroup.caste.map((c) => ({
          _id: `${newGroup._id}_${c}`,
          caste: c,
          nextLearn: newGroup.nextLearn || "",
          exam: newGroup.exam || [],
          groupId: newGroup._id,
        }));
        setCasteList((prev) => [...prev, ...newFlatCastes]);
      }
    } catch (err) {
      console.error("Failed to add caste", err);
      const serverMsg =
        err?.response?.data?.usrMsg ||
        err?.response?.data?.message ||
        "Error adding caste";
      alert(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async (id, groupId) => {
    const updatedCaste = {
      caste: [editingName], // ✅ Wrap in array
      nextLearn: editingNextLearn,
      exam: editingExam
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e !== ""), // ✅ remove empty strings
    };

    try {
      await axios.put(`${API_BASE_URL}/api/caste/${groupId}`, updatedCaste);
      setEditingId(null);
      fetchCastes();
    } catch (err) {
      console.error("Failed to update caste", err);
    }
  };

  const handleDelete = async (id, groupId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this caste?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/caste/${groupId}`);
      alert("Caste deleted successfully.");
      fetchCastes();
    } catch (err) {
      console.error("Failed to delete caste", err);
      alert("Error deleting caste");
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

  const handleAddCasteField = () => {
    setCastes([...castes, { id: Date.now(), value: "" }]);
  };

  const handleAddNewCasteToGroup = async (groupId, nextLearn, exam) => {
    if (!newCasteName.trim()) {
      alert("Please enter a caste name");
      return;
    }

    try {
      const updated = {
        caste: [newCasteName.trim()], // new caste
        nextLearn, // from prefilled group
        exam, // from prefilled group
      };

      await axios.put(`${API_BASE_URL}/api/caste/${groupId}`, updated);
      alert("Caste added successfully.");
      fetchCastes();
      setNewCasteName("");
      setAddingGroupId(null);
    } catch (err) {
      console.error("Error adding caste to group", err);
      const msg =
        err?.response?.data?.usrMsg ||
        err?.response?.data?.message ||
        "Failed to add caste";
      alert(msg);
    }
  };

  const handleSubmitEligibility = async () => {
    const finalData = {
      nextLearn: nextLearn.trim(),
      exam: exams.map((e) => e.value.trim()).filter(Boolean),
      caste: castes.map((c) => c.value.trim()).filter(Boolean),
    };

    if (!finalData.nextLearn || finalData.caste.length === 0) {
      alert("Please fill at least Next Learn and one Caste");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/caste/add`, finalData);
      alert("Eligibility entry submitted successfully");

      const newGroup = res.data?.data;
      if (newGroup?._id && Array.isArray(newGroup.caste)) {
        const newFlatCastes = newGroup.caste.map((c) => ({
          _id: `${newGroup._id}_${c}`,
          caste: c,
          nextLearn: newGroup.nextLearn || "",
          exam: newGroup.exam || [],
          groupId: newGroup._id,
        }));
        setCasteList((prev) => [...prev, ...newFlatCastes]);
      }

      // Reset input fields
      setNextLearn("");
      setExams([{ id: Date.now(), value: "" }]);
      setCastes([{ id: Date.now() + 1, value: "" }]);
    } catch (err) {
      console.error("Error submitting eligibility data", err);
      alert("Submission failed");
    }
  };

  const filteredCastes = casteList.filter(
    (caste) =>
      typeof caste.caste === "string" &&
      caste.caste.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md border">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5 gap-3">
          <h2 className="text-2xl font-bold text-blue-700">➕ Manage Castes</h2>
          <input
            type="text"
            placeholder="Search caste..."
            className="md:w-72 w-full p-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Add caste input */}
        {/* <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter caste name"
            className="flex-1 border p-3 rounded-md"
            value={casteName}
            onChange={(e) => setCasteName(e.target.value)}
          />
          <button
            onClick={handleAddCaste}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div> */}

        {/* Eligibility entry form */}
        <div className="bg-blue-50 border border-blue-300 p-4 rounded-xl mb-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">
            📘 Add Eligibility Entry
          </h3>

          <div className="mb-3">
            <label className="font-semibold">Next Learn:</label>
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={nextLearn}
              placeholder="e.g., 10th"
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

          <div className="mb-3">
            <label className="font-semibold">Caste(s):</label>
            {castes.map((caste, i) => (
              <input
                key={caste.id}
                type="text"
                className="w-full border p-2 rounded mt-2"
                value={caste.value}
                placeholder={`Caste ${i + 1}`}
                onChange={(e) =>
                  handleChange(caste.id, e.target.value, setCastes)
                }
              />
            ))}
            <button
              className="text-blue-600 mt-2 underline"
              onClick={handleAddCasteField}
            >
              ➕ Add Another Caste
            </button>
          </div>

          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            onClick={handleSubmitEligibility}
          >
            ✅ Submit Eligibility Entry
          </button>
        </div>

        {/* Table */}
        <h3 className="text-lg font-semibold text-blue-600 mb-2">
          📋 Existing Castes
        </h3>
        <div className="overflow-x-auto">
          <div className="max-h-[420px] overflow-y-auto border rounded">
            <table className="w-full border text-sm">
              <thead className="bg-blue-100 sticky top-0 z-10">
                <tr>
                  <th className="border px-3 py-2 text-left">#</th>
                  <th className="border px-3 py-2 text-left">Next Learn</th>
                  <th className="border px-3 py-2 text-left">Exam(s)</th>
                  <th className="border px-3 py-2 text-left">Caste Name</th>
                  <th className="border px-3 py-2 text-left">Actions</th>
                  <th className="border px-3 py-2 text-left">Add New Caste</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  filteredCastes.reduce((acc, caste) => {
                    const key = caste.nextLearn || "Unknown";
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(caste);
                    return acc;
                  }, {})
                ).flatMap(([nextLearn, group], groupIndex) =>
                  group.map((caste, i) => (
                    <tr key={caste._id} className="hover:bg-gray-50">
                      {/* Serial number */}
                      <td className="border px-3 py-2">{serial++}</td>

                      {/* Next Learn - only once per group with rowspan */}
                      {i === 0 && (
                        <td
                          rowSpan={group.length}
                          className="border px-3 py-2 align-top font-semibold bg-blue-50"
                        >
                          {editingId === caste._id ? (
                            <input
                              className="border p-1 rounded w-full"
                              value={editingNextLearn}
                              onChange={(e) =>
                                setEditingNextLearn(e.target.value)
                              }
                            />
                          ) : (
                            nextLearn
                          )}
                        </td>
                      )}
                      {/* Empty td to keep structure if not first row */}
                      {i !== 0 && null}

                      {/* Exam - only once per group with rowspan */}
                      {i === 0 && (
                        <td
                          rowSpan={group.length}
                          className="border px-3 py-2 align-top bg-blue-50"
                        >
                          {editingId === caste._id ? (
                            <input
                              className="border p-1 rounded w-full"
                              value={editingExam}
                              onChange={(e) => setEditingExam(e.target.value)}
                              placeholder="Comma separated"
                            />
                          ) : (
                            caste.exam?.join(", ")
                          )}
                        </td>
                      )}
                      {/* Skip exam cell for other rows */}
                      {i !== 0 && null}

                      {/* Caste Name */}
                      <td className="border px-3 py-2">
                        {editingId === caste._id ? (
                          <input
                            className="border p-1 rounded w-full"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                          />
                        ) : (
                          caste.caste
                        )}
                      </td>

                      {/* Actions */}
                      <td className="border px-3 py-2">
                        {/* {editingId === caste._id ? (
                          <div className="flex gap-2">
                            <button
                              className="bg-green-500 text-white px-3 py-1 rounded"
                              onClick={() =>
                                handleSaveEdit(caste._id, caste.groupId)
                              }
                            >
                              Save
                            </button>
                            <button
                              className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded"
                              onClick={() => {
                                setEditingId(caste._id);
                                setEditingName(caste.caste);
                                setEditingNextLearn(caste.nextLearn);
                                setEditingExam(caste.exam?.join(", "));
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded"
                              onClick={() =>
                                handleDelete(caste._id, caste.groupId)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )} */}

                        {editingId === caste._id ? (
                          <div className="flex gap-2">
                            <button
                              className="bg-green-500 text-white px-3 py-1 rounded"
                              onClick={() =>
                                handleSaveEdit(caste._id, caste.groupId)
                              }
                            >
                              Save
                            </button>
                            <button
                              className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <button
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => {
                                  setEditingId(caste._id);
                                  setEditingName(caste.caste);
                                  setEditingNextLearn(caste.nextLearn);
                                  setEditingExam(caste.exam?.join(", "));
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() =>
                                  handleDelete(caste._id, caste.groupId)
                                }
                              >
                                Delete
                              </button>
                            </div>
                            {/* ➕ Add caste field */}
                            {/* {addingGroupId === caste.groupId ? (
                              <div className="mt-2">
                                <input
                                  type="text"
                                  placeholder="New caste name"
                                  className="border p-1 rounded w-full mb-1"
                                  value={newCasteName}
                                  onChange={(e) =>
                                    setNewCasteName(e.target.value)
                                  }
                                />
                                <div className="flex gap-2">
                                  <button
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                    onClick={() =>
                                      handleAddNewCasteToGroup(
                                        caste.groupId,
                                        caste.nextLearn,
                                        caste.exam
                                      )
                                    }
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="bg-gray-400 text-white px-3 py-1 rounded"
                                    onClick={() => {
                                      setAddingGroupId(null);
                                      setNewCasteName("");
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                className="text-sm text-blue-600 underline mt-1"
                                onClick={() => {
                                  setAddingGroupId(caste.groupId);
                                  setNewCasteName("");
                                }}
                              >
                                ➕ Add Caste
                              </button>
                            )} */}
                          </div>
                        )}
                      </td>

                      {/* Caste Name */}

                      {/* Actions column - render only once per group with rowspan */}
                      {i === 0 && (
                        <td
                          rowSpan={group.length}
                          className="border px-3 py-2 align-top bg-blue-50"
                        >
                          <div className="flex flex-col gap-2">
                            <button
                               className="text-sm text-white hover:bg-blue-900 font-medium bg-blue-500 p-3 w-40 rounded-xl"
                              onClick={() => {
                                setAddingGroupId(caste.groupId);
                                setNewCasteName("");
                              }}
                            >
                              ➕ Add Caste
                            </button>

                            {/* Show input when adding new caste */}
                            {addingGroupId === caste.groupId && (
                              <div className="mt-2">
                                <input
                                  type="text"
                                  placeholder="New caste name"
                                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                  value={newCasteName}
                                  onChange={(e) =>
                                    setNewCasteName(e.target.value)
                                  }
                                />
                                <div className="flex gap-2">
                                  <button
                                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow"
                                    onClick={() =>
                                      handleAddNewCasteToGroup(
                                        caste.groupId,
                                        caste.nextLearn,
                                        caste.exam
                                      )
                                    }
                                  >
                                    Save
                                  </button>
                                  <button
                                                 className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded shadow"
                                    onClick={() => {
                                      setAddingGroupId(null);
                                      setNewCasteName("");
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
                {filteredCastes.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No caste found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCaste;
