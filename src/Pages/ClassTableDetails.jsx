import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import EditClassDetails from "./EditClassDetails"; 
import ClassInfoCard from "./ClassInforCard"; 
import Swal from 'sweetalert2';

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
          console.error(
            error.response?.data?.usrMsg ||
              error.response?.data?.message ||
              error.response?.data.errMsg ||
              "❌ API returned an unexpected format:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error(
          error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            error.response?.data.errMsg ||
            "❌ Error fetching class data:",
          error
        );
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

  // // ✅ Edit Class
  // const handleEdit = (item) => {
  //   setSelectedItem(item);
  //   setEditModalOpen(true);
  // };

  // ✅ Save Edited Class Details
  // const handleSaveEdit = (updatedData) => {
  //   if (!updatedData || !updatedData._id) {
  //     alert("❌ Error: Class data is missing or invalid.");
  //     return;
  //   }

  //   const { _id, createdAt, updatedAt, __v, ...cleanData } = updatedData;

  //   axios
  //     .put(`${API_BASE_URL}/api/class/update/${_id}`, cleanData)
  //     .then((response) => {
  //       if (response.data.success) {
  //         setClassData((prevData) =>
  //           prevData.map((classItem) =>
  //             classItem._id === _id ? { ...classItem, ...cleanData } : classItem
  //           )
  //         );
  //         setEditModalOpen(false);
  //         alert("✅ Successfully Updated Class");
  //       } else {
  //         alert("❌ Failed to update class details");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating class:", error);
  //       alert(
  //         error.response?.data?.usrMsg ||
  //           error.response?.data?.message ||
  //           error.response?.data.errMsg ||
  //           "❌ Error updating class details!"
  //       );
  //     });
  // };

  // ✅ Delete Class
  // const handleDelete = (item) => {
  //   const { isConfirmed } = await Swal.fire({
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonText: 'Yes, delete it!',
  //   cancelButtonText: 'No, keep it',
  //   reverseButtons: true, // Reverses the positions of the buttons
  // });

  // if (!isConfirmed) return;

  //   axios
  //     .delete(`${API_BASE_URL}/api/class/delete/${item._id}`)
  //     .then((response) => {
  //       if (response.data.success) {
  //         // ✅ Remove class from state
  //         setClassData((prevData) =>
  //           prevData.filter((classItem) => classItem._id !== item._id)
  //         );
  //         alert("✅ Class deleted successfully!");
  //       } else {
  //         alert("❌ Failed to delete class.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("❌ Error deleting class:", error);
  //       alert(
  //         error.response?.data?.usrMsg ||
  //           error.response?.data?.message ||
  //           error.response?.data.errMsg ||
  //           "❌ Failed deleting class!"
  //       );
  //     });
  // };

  const handleDelete = async (item) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      reverseButtons: true, // Reverses the positions of the buttons
    });
  
    if (!isConfirmed) return;
  
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/class/delete/${item._id}`);
      if (response.data.success) {
        // ✅ Remove class from state
        setClassData((prevData) =>
          prevData.filter((classItem) => classItem._id !== item._id)
        );
        Swal.fire('Deleted!', 'Class has been deleted.', 'success');
      } else {
        Swal.fire('Failed!', 'Could not delete the class.', 'warning');
      }
    } catch (error) {
      console.error("❌ Error deleting class:", error);
      Swal.fire(
        'Warning!',
        error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          error.response?.data.errMsg ||
          'Failed to delete class!',
        'warning'
      );
    }
  };
  

  // ✅ Search Functionality
  // ✅ Search Functionality - Filters Across All Columns
  const filteredData = classData.filter((row) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      row.className?.toLowerCase().includes(searchLower) ||
      row.ownerOrInstituteName?.toLowerCase().includes(searchLower) ||
      row.category?.some((cat) => cat.toLowerCase().includes(searchLower)) ||
      row.modeOfTeaching?.some((mode) =>
        mode.toLowerCase().includes(searchLower)
      ) ||
      row.contactDetails?.toLowerCase().includes(searchLower)
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
      selector: (row) => row.category?.join(", ") || "N/A",
      sortable: true,
    },
    {
      name: "Mode of Teaching",
      selector: (row) => row.modeOfTeaching?.join(", ") || "N/A",
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contactDetails || "N/A",
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => {
        const addr = Array.isArray(row.address) ? row.address[0] : row.address;
        if (!addr) return "N/A";

        return `${addr.line1 || ""}, ${addr.line2 || ""}, ${
          addr.taluka || ""
        }, ${addr.dist || ""}, ${addr.state || ""}, ${addr.pincode || ""}
    Landmark: ${addr.nearbyLandmarks || "-"} 
    Authorized: ${addr.autorizedName || "-"} (${addr.autorizedPhono || "-"})`;
      },
      sortable: false,
      wrap: true,
    },

    {
      name: "Keywords",
      selector: (row) => row.keywords?.join(", ") || "N/A",
      sortable: true,
    },
    {
      name: "Year Established",
      selector: (row) => row.yearEstablished || "N/A",
      sortable: true,
    },
    {
      name: "Website",
      selector: (row) => row.websiteURL || "N/A",
      sortable: true,
    },
    {
      name: "Franchise/Independent",
      selector: (row) => row.franchiseOrIndependent || "N/A",
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
          {/* <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded-lg cursor-pointer"
            onClick={() => handleEdit(row)}
          >
            <FaEdit size={15} />
          </button> */}

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
        {modalOpen && (
          <ClassInfoCard
            classData={selectedItem}
            onClose={() => setModalOpen(false)}
          />
        )}

        {/* ✅ Edit Class Details Modal */}
        {/* {editModalOpen && (
          <EditClassDetails
            classData={selectedItem}
            onSave={handleSaveEdit}
            onCancel={() => setEditModalOpen(false)}
          />
        )} */}
      </div>
    </section>
  );
};

export default ClassTableDetails;
