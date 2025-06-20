// CutoffTable.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";

const CutoffTable = () => {
  const [cutoffList, setCutoffList] = useState([]);
  const [allCastes, setAllCastes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [editingRowId, setEditingRowId] = useState(null);

  const fetchCutoffList = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/cutoff/all`);
      setCutoffList(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching cutoff list:", err);
    }
  };

  useEffect(() => {
    fetchCutoffList();
  }, []);

  // useEffect(() => {
  //   axios.get(`${API_BASE_URL}/api/caste/all`).then((res) => {
  //     setAllCastes(res.data?.data?.castes || []);
  //   });
  // }, []);

useEffect(() => {
  axios.get(`${API_BASE_URL}/api/caste/all`).then((res) => {
    const casteGroups = res.data?.data?.castes || [];

    // Flatten caste arrays and make unique set
    const casteSet = new Set();
    casteGroups.forEach((group) => {
      (group.caste || []).forEach((c) => casteSet.add(c.trim()));
    });

    // Convert Set to Array of objects (with dummy _id for mapping key)
    const uniqueCastes = Array.from(casteSet).map((casteName) => ({
      _id: casteName, // using casteName as key
      caste: casteName,
    }));

    setAllCastes(uniqueCastes);
  });
}, []);


  const grouped = cutoffList
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.collegeName.toLowerCase().includes(query) ||
        item.collegeId.toLowerCase().includes(query)
      );
    })
    .reduce((acc, item) => {
      const id = item.collegeId;
      if (!acc[id]) {
        acc[id] = {
          collegeName: item.collegeName,
          category: item.category,
          rows: [],
        };
      }
      acc[id].rows.push(item);
      return acc;
    }, {});

  const handleInlineChange = (rowId, casteName, val) => {
    const updated = cutoffList.map((item) => {
      if (item._id !== rowId) return item;

      const newCutoff = Array.isArray(item.cutoff) ? [...item.cutoff] : [];
      const index = newCutoff.findIndex((cut) => cut.caste === casteName);

      if (index > -1) {
        newCutoff[index].marks = val;
      } else {
        newCutoff.push({ caste: casteName, marks: val });
      }

      return { ...item, cutoff: newCutoff };
    });

    setCutoffList(updated);
  };

  const handleSaveInlineEdit = async (item) => {
    const cleaned = item.cutoff
      .filter((entry) => entry?.caste && entry?.marks !== "")
      .map((entry) => {
        const percent = parseFloat(entry.marks);
        if (isNaN(percent) || percent < 0 || percent > 100) {
          alert(`Invalid % for caste ID ${entry.caste}`);
          throw new Error("Invalid percentage");
        }
        return { caste: entry.caste, marks: percent };
      });

    const payload = {
      collegeId: item.collegeId,
      collegeName: item.collegeName,
      category: item.category,
      subCategory: Array.isArray(item.subCategory)
        ? item.subCategory
        : [item.subCategory],
      cutoff: cleaned,
    };

    try {
      await axios.put(`${API_BASE_URL}/api/cutoff/${item._id}`, payload);
      alert("Updated successfully");
      fetchCutoffList();
      setEditingRowId(null); // 🔒 exit edit mode
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md border">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          {/* Left: Heading */}
          <h2 className="text-2xl font-bold text-blue-700 w-full md:w-auto">
            📋 Cutoff List
          </h2>

          {/* Right: Search + Button */}
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by College ID or Name"
              className="p-2 border rounded w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => navigate("/add-cutoff-eligibility")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
            >
              ➕ Add New Cutoff
            </button>
          </div>
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
          <table className="min-w-[1500px] border text-sm text-left">
            <thead className="sticky top-0 bg-blue-100 text-blue-900">
              <tr>
                <th className="sticky top-0 border px-3 py-2">College ID</th>
                <th className="sticky top-0 border px-3 py-2">College Name</th>
                <th className="sticky top-0 border px-3 py-2">Category</th>
                <th className="sticky top-0 border px-3 py-2">Subcategory</th>
                {allCastes.map((caste) => (
                  <th key={caste._id} className="sticky top-0 border px-3 py-2">
                    {caste.caste}
                  </th>
                ))}
                <th className="sticky top-0 border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(grouped).map(([collegeId, group]) =>
                group.rows.map((item, idx) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    {idx === 0 && (
                      <>
                        <td
                          rowSpan={group.rows.length}
                          className="border px-3 py-2 font-medium"
                        >
                          {collegeId}
                        </td>
                        <td
                          rowSpan={group.rows.length}
                          className="border px-3 py-2 font-medium"
                        >
                          {group.collegeName}
                        </td>
                        <td
                          rowSpan={group.rows.length}
                          className="border px-3 py-2 font-medium"
                        >
                          {group.category}
                        </td>
                      </>
                    )}
                    <td className="border px-3 py-2">
                      {Array.isArray(item.subCategory)
                        ? item.subCategory.join(", ")
                        : item.subCategory}
                    </td>

                    {allCastes.map((caste) => {
                      const value = Array.isArray(item.cutoff)
                        ? item.cutoff.find((cut) => cut.caste === caste.caste)
                            ?.marks ?? ""
                        : "";

                      return (
                        <td
                          key={caste._id}
                          className="border px-3 py-2 text-center"
                        >
                          {editingRowId === item._id ? (
                            <input
                              type="number"
                              min={0}
                              max={100}
                              className="w-16 border p-1 text-center rounded"
                              value={value}
                              onChange={(e) =>
                                handleInlineChange(
                                  item._id,
                                  caste.caste,
                                  e.target.value
                                )
                              }
                            />
                          ) : // value || "-"
                          value !== "" ? (
                            parseFloat(value).toFixed(2)
                          ) : (
                            "-"
                          )}
                        </td>
                      );
                    })}

                    <td className="border px-3 py-2 text-left whitespace-nowrap flex gap-2">
                      {editingRowId === item._id ? (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow transition duration-200 flex items-center gap-1"
                          onClick={() => handleSaveInlineEdit(item)}
                        >
                          💾 <span>Save</span>
                        </button>
                      ) : (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow transition duration-200 flex items-center gap-1"
                          onClick={() => setEditingRowId(item._id)}
                        >
                          ✏️ <span>Edit</span>
                        </button>
                      )}

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition duration-200 flex items-center gap-1"
                        onClick={async () => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to delete this cutoff?"
                          );
                          if (!confirmDelete) return;
                          try {
                            await axios.delete(
                              `${API_BASE_URL}/api/cutoff/${item._id}`
                            );
                            alert("Deleted successfully");
                            fetchCutoffList();
                          } catch (err) {
                            console.error("Delete failed:", err);
                            alert("Failed to delete");
                          }
                        }}
                      >
                        🗑️ <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CutoffTable;
