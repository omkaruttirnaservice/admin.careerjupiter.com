import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import EditClassDetails from "./editClassDetails";
import ClassInfoCard from "./classInforCard";
import Swal from "sweetalert2";

const ClassTableDetails = () => {
  const [classData, setClassData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // ✅ Fetch Class Data from API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/class/all`)
      .then((response) => {
        if (response.data.success && response.data.data.classes) {
          const classArray = response.data.data.classes; // ✅ Extract `classes` array
          console.log("✅ Fetched Class Data:", classArray);
          // setClassData(classArray); // ✅ Update state with array
          const visibleClasses = classArray.filter(
            (classItem) => classItem.isHidden
          );
          setClassData(visibleClasses); // ✅ Only show classes that are not hidden
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

  const handleCategoryClick = (categories) => {
    if (Array.isArray(categories) && categories.length > 0) {
      setSelectedCategories(categories);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategories([]);
  };

  const handleDelete = async (item) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (!isConfirmed) return;

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/class/delete/${item._id}`
      );
      if (response.data.success) {
        // ✅ Remove class from state
        setClassData((prevData) =>
          prevData.filter((classItem) => classItem._id !== item._id)
        );
        Swal.fire("Deleted!", "Class has been deleted.", "success");
      } else {
        Swal.fire("Failed!", "Could not delete the class.", "warning");
      }
    } catch (error) {
      console.error("❌ Error deleting class:", error);
      Swal.fire(
        "Warning!",
        error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          error.response?.data.errMsg ||
          "Failed to delete class!",
        "warning"
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
    // {
    //   name: "Category",
    //   selector: (row) => row.category?.join(", ") || "N/A",
    //   sortable: true,
    // },
    {
      name: "Category",
      selector: (row) => (
        <span
          onClick={() => handleCategoryClick(row.category)}
          className={`${
            Array.isArray(row.category) && row.category.length > 0
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-200 text-gray-500"
          } px-3 py-1 rounded-full text-sm font-medium cursor-pointer inline-block hover:shadow-md`}
        >
          {Array.isArray(row.category) && row.category.length > 0
            ? row.category.length
            : "N/A"}
        </span>
      ),
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
      name: "Year Established",
      selector: (row) => row.yearEstablished || "N/A",
      sortable: true,
    },
    // {
    //   name: "Website",
    //   selector: (row) => row.websiteURL || "N/A",
    //   sortable: true,
    // },
    {
      name: "Website",
      selector: (row) => (
        <div>
          {row.websiteURL && row.websiteURL.trim() !== "" ? (
            // <a
            //   href={row.websiteURL}
            //   target="_blank"
            //   rel="noopener noreferrer"
            //   className="text-white bg-blue-600 hover:bg-blue-800 py-1 px-3 rounded-md cursor-pointer inline-block"
            // >
            //   Visit Website
            // </a>
            <a
              href={
                row.websiteURL.startsWith("http")
                  ? row.websiteURL
                  : `https://${row.websiteURL}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-600 hover:bg-blue-800 py-1 px-3 rounded-md cursor-pointer inline-block"
            >
              Visit
            </a>
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Class Type",
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
          // progressComponent={<div>Loading...</div>}
           progressComponent={
            <div className="p-4 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-blue-500 font-medium">Loading...</span>
            </div>
          }
          noDataComponent={
            <div className="p-4 text-center text-gray-500">
              No class found. Try a different search term.
            </div>
          }
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

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto border-4 border-blue-500 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-t-lg">
                <h2 className="text-2xl font-semibold">📌 Category List</h2>
                <button
                  onClick={closeModal}
                  className="text-white text-3xl hover:text-red-500 transition duration-300"
                >
                  &times;
                </button>
              </div>

              <hr />

              {/* Content */}
              <div className="px-4">
                {selectedCategories && selectedCategories.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedCategories.map((cat, idx) => (
                      <li key={idx} className="text-gray-800 font-medium">
                        {cat}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No categories available.</p>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end px-4">
                <button
                  onClick={closeModal}
                  className="mt-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
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
