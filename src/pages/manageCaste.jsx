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

  // Fetch all castes
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

  // Add caste
  const handleAddCaste = async () => {
    if (!casteName.trim()) {
      alert("Please enter a caste name.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${API_BASE_URL}/api/caste/add`, {
        caste: casteName.trim(),
      });
      alert("Caste added successfully.");
      setCasteName("");
      fetchCastes();
    } catch (err) {
      console.error("Failed to add caste", err);
      const serverMsg =
        err?.response?.data?.usrMsg ||
        err?.response?.data?.message ||
        "Error adding caste";
      alert(serverMsg); // ✅ Show user-friendly backend message
    } finally {
      setIsLoading(false);
    }
  };

  // Save edited caste
  const handleSaveEdit = async (id) => {
    if (!editingName.trim()) {
      alert("Caste name cannot be empty");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/api/caste/${id}`, {
        caste: editingName.trim(),
      });
      alert("Caste updated successfully.");
      setEditingId(null);
      setEditingName("");
      fetchCastes();
    } catch (err) {
      console.error("Failed to update caste", err);
      alert("Error updating caste");
    }
  };

  // Delete caste
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this caste?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/caste/${id}`);
      alert("Caste deleted successfully.");
      fetchCastes();
    } catch (err) {
      console.error("Failed to delete caste", err);
      alert("Error deleting caste");
    }
  };

  const filteredCastes = casteList.filter((caste) =>
    caste.caste.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md border">
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

        {/* Add Form */}
        <div className="flex items-center gap-4 mb-6">
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
        </div>

        {/* Caste List Table */}
        <h3 className="text-lg font-semibold text-blue-600 mb-2">
          📋 Existing Castes
        </h3>
        <div className="overflow-x-auto">
          <div className="max-h-[420px] overflow-y-auto border rounded">
            <table className="w-full border text-sm">
              <thead className="bg-blue-100 sticky top-0 z-10">
                <tr>
                  <th className="border px-3 py-2 text-left">#</th>
                  <th className="border px-3 py-2 text-left">Caste Name</th>
                  <th className="border px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCastes.map((caste, i) => (
                  <tr key={caste._id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{i + 1}</td>
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
                    <td className="border px-3 py-2 whitespace-nowrap">
                      {/* <td className="border px-3 py-2 whitespace-nowrap"> */}
                      <div className="flex gap-2 flex-wrap">
                        {editingId === caste._id ? (
                          <>
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-sm transition duration-200 flex items-center gap-1"
                              onClick={() => handleSaveEdit(caste._id)}
                            >
                              💾 <span>Save</span>
                            </button>
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-lg shadow-sm transition duration-200 flex items-center gap-1"
                              onClick={() => setEditingId(null)}
                            >
                              ❌ <span>Cancel</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm transition duration-200 flex items-center gap-1"
                              onClick={() => {
                                setEditingId(caste._id);
                                setEditingName(caste.caste);
                              }}
                            >
                              ✏️ <span>Edit</span>
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition duration-200 flex items-center gap-1"
                              onClick={() => handleDelete(caste._id)}
                            >
                              🗑️ <span>Delete</span>
                            </button>
                          </>
                        )}
                      </div>
                      {/* </td> */}
                    </td>
                  </tr>
                ))}
                {casteList.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
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
