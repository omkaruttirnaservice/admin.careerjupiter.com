import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaPauseCircle, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import InfoCard from "../Component/InfoCard"; // Import the InfoCard component
import EditCollegeDetails from "../Component/EditCollegeDetails"; // Import the EditCollegeDetails component

const CollegeTableDetails = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // Track Edit Modal
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const categoryColorMapping = {
    HSC: "bg-blue-200",
    Diploma: "bg-pink-200",
    Engineering: "bg-yellow-200",
    Pharmacy: "bg-red-200",
  };

  const typeColorMapping = {
    Government: "bg-green-200",
    Private: "bg-purple-200",
    Autonomous: "bg-red-200",
    Deemed: "bg-pink-200",
  };

  // Fetch data from API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/college/all`)
      .then((response) => {
        if (response.data.success) {
          const parsedData = JSON.parse(response.data.data);
          setCollegeData(parsedData.colleges);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching college data:", error);
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  // Handle modal close
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  // Handle View Profile click
  const handleViewProfile = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // Handle Edit click
  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  // Handle Save from EditCollegeDetails
  const handleSaveEdit = (updatedData) => {
    // Make a PATCH request to update the data in the backend
    axios
      .patch(
        `${API_BASE_URL}/api/college/update/${updatedData._id}`,
        updatedData
      )
      .then((response) => {
        if (response.data.success) {
          // Update local state with the updated college data
          setCollegeData((prevData) =>
            prevData.map((college) =>
              college._id === updatedData._id ? updatedData : college
            )
          );
          setEditModalOpen(false); // Close the Edit Modal
        } else {
          alert("Failed to update college details");
        }
      })
      .catch((error) => {
        console.error("Error updating college data:", error);
        alert("Error updating college details");
      });
  };

  const handleDelete = (item) => {
    setCollegeData(collegeData.filter((college) => college._id !== item._id));
  };

  const filteredData = collegeData.filter((row) => {
    return (
      row.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.affiliatedUniversity
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.collegeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${row.location.lat}, ${row.location.lng}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.contactDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.websiteURL.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.establishedYear.toString().includes(searchTerm) ||
      row.accreditation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const columns = [
    {
      name: "College Name",
      selector: (row) => row.collegeName,
      sortable: true,
    },

    {
      name: "Affiliated University",
      selector: (row) => row.affiliatedUniversity,
      sortable: true,
    },

    {
      name: "College Category",
      selector: (row) => row.Category,
      sortable: true,
      cell: (row) => {
        const tagColor = categoryColorMapping[row.Category] || "bg-gray-200";
        return (
          <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
            {row.Category}
          </span>
        );
      },
    },

    {
      name: "College Type",
      selector: (row) => row.collegeType,
      sortable: true,
      cell: (row) => {
        const tagColor = typeColorMapping[row.collegeType] || "bg-gray-200";
        return (
          <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
            {row.collegeType}
          </span>
        );
      },
    },

    {
      name: "Location",
      selector: (row) => `${row.location.lat}, ${row.location.lng}`,
      sortable: true,
    },

    {
      name: "Address",
      selector: (row) =>
        `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`,
      sortable: true,
    },

    {
      name: "Contact",
      selector: (row) => row.contactDetails,
      sortable: true,
    },

    {
      name: "Website",
      selector: (row) => (
        <div>
          {row.websiteURL && row.websiteURL.trim() !== "" ? (
            <button
              onClick={() => window.open(row.websiteURL, "_blank")}
              className="text-white bg-blue-600 hover:bg-blue-800 py-1 px-3 rounded-md"
            >
              Visit Website
            </button>
          ) : (
            <span className="text-gray-500">No Website Available</span>
          )}
        </div>
      ),
    },

    {
      name: "Established Year",
      selector: (row) => row.establishedYear,
      sortable: true,
    },

    {
      name: "Accreditation",
      selector: (row) => row.accreditation,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => handleViewProfile(row)}
          >
            <FaEye size={20} />
          </button>
          <button
            className="text-yellow-600 hover:text-yellow-800"
            onClick={() => handleEdit(row)} // Open EditCollegeDetails
          >
            <FaEdit size={20} />
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDelete(row)}
          >
            <FaPauseCircle size={20} />
          </button>
          <button
            className="text-green-600 hover:text-green-800"
            onClick={() => navigate(`/colleges/courses/${row._id}`)}
          >
            <FaPlus size={20} />
          </button>
        </div>
      ),
    },

  ];

  return (
    <section>
      <div className="bg-blue-50 py-4 px-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-700">College List</h2>
          <div className="ml-4">
            <input
              type="text"
              placeholder="Search colleges..."
              className="px-4 py-2 rounded-md border-blue-600 border-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          progressPending={loading}
          progressComponent={<div>Loading...</div>}
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "#3b82f6",
                color: "white",
              },
            },
            headCells: {
              style: {
                fontWeight: "bold",
              },
            },
            rows: {
              style: {
                backgroundColor: "#f0f9ff",
                color: "#1e3a8a",
                borderBottom: "1px solid #3b82f6",
              },
            },
            pagination: {
              style: {
                backgroundColor: "#f0f9ff",
              },
            },
          }}
        />

        {/* Render InfoCard modal */}
        {modalOpen && (
          <InfoCard collegeData={selectedItem} onClose={handleCloseModal} />
        )}

        {/* Render EditCollegeDetails modal */}
        {editModalOpen && (
          <EditCollegeDetails
            collegeData={selectedItem}
            onSave={handleSaveEdit}
            onCancel={() => setEditModalOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default CollegeTableDetails;



