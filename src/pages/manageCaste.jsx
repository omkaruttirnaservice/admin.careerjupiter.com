import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import Swal from "sweetalert2";

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

  // const handleSaveEdit = async (id, groupId) => {
  //   const updatedCaste = {
  //     caste: [editingName], // ✅ Wrap in array
  //     nextLearn: editingNextLearn,
  //     exam: editingExam
  //       .split(",")
  //       .map((e) => e.trim())
  //       .filter((e) => e !== ""), // ✅ remove empty strings
  //   };

  //   try {
  //     await axios.put(`${API_BASE_URL}/api/caste/${groupId}`, updatedCaste);
  //     setEditingId(null);
  //     fetchCastes();
  //   } catch (err) {
  //     console.error("Failed to update caste", err);
  //   }
  // };

const handleSaveEdit = async (id, groupId) => {
  try {
    // Get all caste objects for the current groupId
    const updatedGroup = filteredCastes.filter((c) => c.groupId === groupId);

    // Replace the caste name being edited
    const updatedCastesArray = updatedGroup.map((c) =>
      c._id === id ? editingName.trim() : c.caste
    );

    const updatedCaste = {
      caste: updatedCastesArray, // ✅ full updated array
      nextLearn: editingNextLearn.trim(),
      exam: editingExam
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean), // ✅ no empty strings
    };

    await axios.put(`${API_BASE_URL}/api/caste/${groupId}`, updatedCaste);

    setEditingId(null);
    fetchCastes();
    Swal.fire("Success", "Caste group updated successfully", "success");
  } catch (err) {
    console.error("Failed to update caste", err);
    const userMsg = err?.response?.data?.usrMsg || "Update failed. Please try again.";
    Swal.fire("Error", userMsg, "error");
  }
};


  // const handleDelete = async (id, groupId) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this caste?"
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     await axios.delete(`${API_BASE_URL}/api/caste/${groupId}`);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Deleted!",
  //       text: "Caste deleted successfully.",
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });

  //     fetchCastes();
  //   } catch (err) {
  //     console.error("Failed to delete caste", err);
  //     const errorMsg =
  //       err?.response?.data?.usrMsg ||
  //       err?.response?.data?.message ||
  //       "Please Try Again!";

  //     Swal.fire({
  //       icon: "warning",
  //       title: "Oops!",
  //       text: errorMsg,
  //     });
  //   }
  // };

const handleDelete = async (casteName, groupId) => {
  const confirmDelete = await Swal.fire({
    title: "Are you sure?",
    text: `Delete caste: "${casteName}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirmDelete.isConfirmed) return;

  try {
    // Send DELETE with body using axios config object
    await axios.delete(`${API_BASE_URL}/api/caste/${groupId}`, {
      data: {
        casteToRemove: casteName,
      },
    });

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Caste deleted successfully.",
      timer: 2000,
      showConfirmButton: false,
    });

    fetchCastes();
  } catch (err) {
    console.error("Failed to delete caste", err);
    const errorMsg =
      err?.response?.data?.usrMsg ||
      err?.response?.data?.message ||
      "Please Try Again!";

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: errorMsg,
    });
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

  // const handleAddNewCasteToGroup = async (groupId, nextLearn, exam) => {
  //   if (!newCasteName.trim()) {
  //     alert("Please enter a caste name");
  //     return;
  //   }

  //   try {
  //     const updated = {
  //       caste: [newCasteName.trim()], // new caste
  //       nextLearn, // from prefilled group
  //       exam, // from prefilled group
  //     };

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

const handleAddNewCasteToGroup = async (groupId, nextLearn, exam) => {
  if (!newCasteName.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Missing Input",
      text: "Please enter a caste name.",
    });
    return;
  }

  try {
    // 1️⃣ Get all caste entries for the group
    const groupCastes = filteredCastes.filter((c) => c.groupId === groupId);

    // 2️⃣ Extract caste names
    const existingCastes = groupCastes.map((c) => c.caste);

    // 3️⃣ Merge old + new caste
    const updatedCastes = [...existingCastes, newCasteName.trim()];

    // 4️⃣ Build the payload
    const updated = {
      caste: updatedCastes,
      nextLearn,
      exam,
    };

    // 5️⃣ Send the full array
    await axios.put(`${API_BASE_URL}/api/caste/${groupId}`, updated);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Caste added successfully.",
    });

    fetchCastes();
    setNewCasteName("");
    setAddingGroupId(null);
  } catch (err) {
    console.error("Error adding caste to group", err);
    const errorMsg =
      err?.response?.data?.usrMsg ||
      err?.response?.data?.message ||
      "Something went wrong!";

    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMsg,
    });
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
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Eligibility entry submitted successfully",
      });
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
      const userMsg =
        err?.response?.data?.usrMsg || "Submission failed. Please try again.";

      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: userMsg,
      });
    } finally {
      // Always clear input fields regardless of success/failure
      setNextLearn("");
      setExams([{ id: Date.now(), value: "" }]);
      setCastes([{ id: Date.now() + 1, value: "" }]);
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
                                // onClick={() =>
                                //   handleDelete(caste._id, caste.groupId)
                                // }
                                onClick={() => handleDelete(caste.caste, caste.groupId)}

                              >
                                Delete
                              </button>
                            </div>
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
