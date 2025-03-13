import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  FaEye,
  FaEdit,
  FaPauseCircle,
  FaPlus,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import UniversityInfoCard from "../Component/UniversityInfoCard"; // Import the InfoCard component
import EditUniversityDetails from "../Component/EditUniversityDetails"; // Import the EdituniversityDetails component
// import Infrastructure from "../Component/Infrastructure";
import UniversityPlacement from "../Component/UniversityPlacement";

const UniversityTableDetails = () => {
  const [universityData, setUniversityData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // Track Edit Modal
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [infraModalOpen, setInfraModalOpen] = useState(false);
  const [placementModalOpen, setPlacementModalOpen] = useState(false);

  const categoryColorMapping = {
    Government: "bg-blue-200",
    Private: "bg-green-200",
    Autonomous: "bg-yellow-200",
    Deemed: "bg-red-200",
  };

  // const typeColorMapping = {
  //   Government: "bg-green-200",
  //   Private: "bg-purple-200",
  //   Autonomous: "bg-red-200",
  //   Deemed: "bg-pink-200",
  // };

  // Fetch data from API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/university/all`)
      .then((response) => {
        if (response.data.success && response.data.data) {
          const parsedData =
            typeof response.data.data === "string"
              ? JSON.parse(response.data.data)
              : response.data.data;
          setUniversityData(parsedData.universities || []);
          //   setLoading(false);
        } else {
          setUniversityData([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching university data:", error);
        setUniversityData([]);
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
    if (!item._id || item._id.length !== 24) {
      console.error("Invalid University ID:", item._id);
      alert("Error: Invalid University ID");
      return;
    }
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  // Handle Save from EdituniversityDetails
  const handleSaveEdit = (updatedData) => {
    console.log("Sending Update Request:", updatedData); // Log the data before sending

     // Remove fields not required by API
  const { _id, createdAt, updatedAt, __v, ...filteredData } = updatedData;

    // Make a put request to update the data in the backend
    axios
      .put(`${API_BASE_URL}/api/university/${updatedData._id}`, filteredData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Log the API response
        alert("🎉 Successfully Updated")

        if (response.data.success) {
          // Update local state with the updated university data
          setUniversityData((prevData) =>
            prevData.map(
              (university) =>
                university._id === updatedData._id
                  ? { ...university, ...filteredData }
                  : university
              // updatedData : university
            )
          );
          setEditModalOpen(false); // Close the Edit Modal
        } else {
          alert("Failed to update university details");
        }
      })
      .catch((error) => {
        console.error(
          "Error updating university data:",
          error.response?.data || error
        );
        alert("Error updating university details");
      });
  };

  const handleDelete = (item) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this university?");
    
    if (isConfirmed) {
      setUniversityData(
        universityData.filter((university) => university._id !== item._id)
      );
      alert("University deleted successfully! ✅");
    }
  };
  

  const filteredData = universityData.filter((row) => {
    return (
      row.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //   row.affiliatedUniversity
      //     .toLowerCase()
      //     .includes(searchTerm.toLowerCase()) ||
      row.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //   row.universityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${row.location.lat}, ${row.location.lan}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.contactDetails.phoneNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.contactDetails.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.websiteURL.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.establishedYear.toString().includes(searchTerm) ||
      (row.accreditation || [])
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  const columns = [
    {
      name: "University Name",
      selector: (row) => row.universityName,
      sortable: true,
    },

    {
      name: "University Category",
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

    // {
    //   name: "university Type",
    //   selector: (row) => row.universityType,
    //   sortable: true,
    //   cell: (row) => {
    //     const tagColor = typeColorMapping[row.universityType] || "bg-gray-200";
    //     return (
    //       <span className={`px-3 py-1 rounded-full ${tagColor} text-sm`}>
    //         {row.universityType}
    //       </span>
    //     );
    //   },
    // },

    {
      name: "Location",
      selector: (row) => `${row.location.lat}, ${row.location.lan}`,
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
      selector: (row) =>
        `${row.contactDetails.phoneNumber}, ${row.contactDetails.email}`,
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
      selector: (row) => row.accreditation.join(", "),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => handleViewProfile(row)}
            data-tooltip-id="view-tooltip"
            data-tooltip-content="View Profile"
          >
            <FaEye size={17} />
          </button>
          <button
            className="text-yellow-600 hover:text-yellow-800"
            onClick={() => handleEdit(row)} // Open EdituniversityDetails
            data-tooltip-id="edit-tooltip"
            data-tooltip-content="Edit University"
          >
            <FaEdit size={17} />
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDelete(row)}
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Delete University"
          >
            <FaPauseCircle size={17} />
          </button>
          <button
            className="text-purple-600 hover:text-purple-800"
            onClick={() => navigate(`/university/infrastructure/${row._id}`)}
            data-tooltip-id="infra-tooltip"
            data-tooltip-content="University Infrastructure"
          >
            <FaBuilding size={17} />
          </button>
          <button
            className="text-pink-600 hover:text-pink-800"
            onClick={() => navigate(`/university/placement/${row._id}`)}
            data-tooltip-id="placement-tooltip"
            data-tooltip-content="Placement Details"
          >
            <FaBriefcase size={17} />
          </button>
          {/* Tooltips */}
          <Tooltip id="view-tooltip" />
          <Tooltip id="edit-tooltip" />
          <Tooltip id="delete-tooltip" />
          <Tooltip id="infra-tooltip" />
          <Tooltip id="placement-tooltip" />
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="bg-blue-50 py-4 px-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-700">
            university List
          </h2>
          <div className="ml-4">
            <input
              type="text"
              placeholder="Search universities..."
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
          <UniversityInfoCard
            universityData={selectedItem}
            onClose={handleCloseModal}
          />
        )}

        {/* Render EdituniversityDetails modal */}
        {editModalOpen && (
          <EditUniversityDetails
            universityData={selectedItem}
            onSave={handleSaveEdit}
            onCancel={() => setEditModalOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default UniversityTableDetails;
