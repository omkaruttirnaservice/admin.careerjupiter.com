import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import EditClassDetails from "./EditClassDetails"; // ✅ Modal for Editing Class Details
import ClassInfoCard from "./ClassInforCard"; // ✅ Ensure Correct Import

const ClassTableDetails = () => {
  const [classData, setClassData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch Class Data from API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/class/all`)
      .then((response) => {
        if (response.data.success && response.data.data.classes) {
          const classArray = response.data.data.classes; // ✅ Extract `classes` array
          console.log("✅ Fetched Class Data:", classArray);
          setClassData(classArray); // ✅ Update state with array
        } else {
          console.error("❌ API returned an unexpected format:", response.data);
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching class data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  

  // ✅ View Class Profile
  const handleViewProfile = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // ✅ Edit Class
  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  // ✅ Save Edited Class Details
  const handleSaveEdit = (updatedData) => {
    if (!updatedData || !updatedData._id) {
      alert("❌ Error: Class data is missing or invalid.");
      return;
    }

    const { _id, createdAt, updatedAt, __v, ...cleanData } = updatedData;

    axios
      .put(`${API_BASE_URL}/api/class/update/${_id}`, cleanData)
      .then((response) => {
        if (response.data.success) {
          setClassData((prevData) =>
            prevData.map((classItem) =>
              classItem._id === _id ? { ...classItem, ...cleanData } : classItem
            )
          );
          setEditModalOpen(false);
          alert("✅ Successfully Updated Class");
        } else {
          alert("❌ Failed to update class details");
        }
      })
      .catch((error) => {
        console.error("Error updating class:", error);
        alert("❌ Error updating class details!");
      });
  };

  // ✅ Delete Class
  const handleDelete = (item) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (isConfirmed) {
      setClassData(classData.filter((classItem) => classItem._id !== item._id));
      alert("✅ Class deleted successfully!");
    }
  };

  // ✅ Search Functionality
// ✅ Search Functionality - Filters Across All Columns
const filteredData = classData.filter((row) => {
  const searchLower = searchTerm.toLowerCase();

  return (
    row.className?.toLowerCase().includes(searchLower) ||
    row.ownerOrInstituteName?.toLowerCase().includes(searchLower) ||
    // row.Category?.toLowerCase().includes(searchLower) ||
    // row.modeOfTeaching?.toLowerCase().includes(searchLower) ||
    row.contactDetails?.toLowerCase().includes(searchLower) 
    // (`Lat: ${row.location?.lat}, Lng: ${row.location?.lan}`.toLowerCase().includes(searchLower))
  );
});


  // ✅ Table Columns
  const columns = [
    {
      name: "Class Name",
      selector: (row) => row.className || "N/A",
      sortable: true,
    },
    {
      name: "Owner Name",
      selector: (row) => row.ownerOrInstituteName || "N/A",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.Category || "N/A",
      sortable: true,
      cell: (row) => (
        <span className="px-3 py-1 rounded-full bg-blue-200 text-blue-800 text-sm">
          {row.Category}
        </span>
      ),
    },
    {
      name: "Mode of Teaching",
      selector: (row) => row.modeOfTeaching || "N/A",
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contactDetails || "N/A",
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) =>
        `Lat: ${row.location?.lat || "N/A"}, Lng: ${row.location?.lan || "N/A"}`,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {/* ✅ View Profile */}
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded-lg cursor-pointer"
            onClick={() => handleViewProfile(row)}
          >
            <FaEye size={15} />
          </button>

          {/* ✅ Edit */}
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded-lg cursor-pointer"
            onClick={() => handleEdit(row)}
          >
            <FaEdit size={15} />
          </button>

          {/* ✅ Delete */}
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg cursor-pointer"
            onClick={() => handleDelete(row)}
          >
            <FaTrash size={15} />
          </button>
            {/* ✅ Manage Courses */}
        {/* <button className="bg-green-600 text-white px-3 py-1 rounded-lg cursor-pointer" onClick={() => navigate(`/manage-courses/${row._id}`)}>
          📚 Courses
        </button> */}

        {/* ✅ Manage Faculty */}
        {/* <button className="bg-purple-600 text-white px-3 py-1 rounded-lg cursor-pointer" onClick={() => navigate(`/manage-faculty/${row._id}`)}>
          👨‍🏫 Faculty
        </button> */}
        </div>
      ),
    },
  ];

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-blue-700">🏫 Class List</h2>

          {/* ✅ Search Input */}
          <input
            type="text"
            placeholder="🔍 Search class..."
            className="px-4 py-2 border border-blue-500 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ✅ Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          progressPending={loading}
          progressComponent={<div>Loading...</div>}
          customStyles={{
            headRow: { style: { backgroundColor: "#2563eb", color: "white" } },
            rows: { style: { backgroundColor: "#f0f9ff" } },
          }}
        />

        {/* ✅ View Class Details Modal */}
        {modalOpen && <ClassInfoCard classData={selectedItem} onClose={() => setModalOpen(false)} />}

        {/* ✅ Edit Class Details Modal */}
        {editModalOpen && (
          <EditClassDetails
            classData={selectedItem}
            onSave={handleSaveEdit}
            onCancel={() => setEditModalOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default ClassTableDetails;
