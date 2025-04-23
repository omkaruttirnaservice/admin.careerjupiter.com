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
  FaImages,
} from "react-icons/fa";
// import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import InfoCard from "../Component/InfoCard"; // Import the InfoCard component
import EditCollegeDetails from "../Component/EditCollegeDetails"; // Import the EditCollegeDetails component
import FileUpload from "../Component/FileUpload";
import Swal from "sweetalert2";

const CollegeTableDetails = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // Track Edit Modal
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [infraModalOpen, setInfraModalOpen] = useState(false);
  const [placementModalOpen, setPlacementModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [heroImage, setHeroImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [heroImageError, setHeroImageError] = useState('');
const [galleryImagesError, setGalleryImagesError] = useState('');


  const categoryColorMapping = {
    HSC: "bg-blue-200 text-blue-800  transition-all duration-300",
    Diploma: "bg-pink-200 text-pink-800  transition-all duration-300",
    Engineering: "bg-yellow-200 text-yellow-800  transition-all duration-300",
    Pharmacy: "bg-red-200 text-red-800  transition-all duration-300",
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
          const parsedData =
            typeof response.data.data === "string"
              ? JSON.parse(response.data.data)
              : response.data.data;
          setCollegeData(parsedData.colleges);
          console.log("//////////// college data //////",parsedData )
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
    try {
      const formattedItem = {
        ...item,
        admissionEntranceDetails: {
          ...item.admissionEntranceDetails,
          // Ensure scholarshipsAvailable is always an array of strings
          scholarshipsAvailable: Array.isArray(
            item.admissionEntranceDetails.scholarshipsAvailable
          )
            ? item.admissionEntranceDetails.scholarshipsAvailable
            : [],

          // Ensure quotaSystem is always an array of strings
          quotaSystem: Array.isArray(item.admissionEntranceDetails.quotaSystem)
            ? item.admissionEntranceDetails.quotaSystem
            : [],
        },
      };

      console.log("✅ Parsed Data for Editing:", formattedItem);
      setSelectedItem(formattedItem);
      setEditModalOpen(true);
    } catch (error) {
      console.error("❌ Error parsing JSON in handleEdit:", error);
      alert(
        error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          error.response?.data.errMsg ||
          "Error processing college data. Please check the format."
      );
    }
  };

  const handleSaveEdit = (updatedData) => {
    console.log("📢 Updated Data Before Formatting:", updatedData);

    if (!updatedData || !updatedData._id) {
      alert("❌ Error: College data is missing or invalid.");
      return;
    }

    const { _id, createAt, updateAt, __v, ...cleanData } = updatedData;

    // ✅ Convert dates to "YYYY-MM-DD" format before sending
    const formattedData = {
      collegeName: cleanData.collegeName || "",
      affiliatedUniversity: cleanData.affiliatedUniversity || "",
      Category: cleanData.Category || "",
      collegeType: cleanData.collegeType || "",
      address: cleanData.address,
      // {
      //   line1: "",
      //   line2: "",
      //   pincode: "",
      //   state: "",
      //   dist: "",
      // },
      contactDetails: cleanData.contactDetails || "",
      establishedYear: cleanData.establishedYear || "",
      admissionProcess: cleanData.admissionProcess || "",
      email_id: cleanData.email_id || "",
      admissionEntranceDetails: JSON.stringify({
        admissionStartDate: cleanData.admissionEntranceDetails
          .admissionStartDate
          ? cleanData.admissionEntranceDetails.admissionStartDate.split("T")[0] // Remove Time Part
          : "",

        admissionEndDate: cleanData.admissionEntranceDetails.admissionEndDate
          ? cleanData.admissionEntranceDetails.admissionEndDate.split("T")[0] // Remove Time Part
          : "",

        lastYearCutoffMarks:
          Number(cleanData.admissionEntranceDetails.lastYearCutoffMarks) || 0, // Ensure it's a number

        scholarshipsAvailable: Array.isArray(
          cleanData.admissionEntranceDetails.scholarshipsAvailable
        )
          ? cleanData.admissionEntranceDetails.scholarshipsAvailable.filter(
              (item) => typeof item === "string"
            )
          : [], // Ensure proper format

        quotaSystem: Array.isArray(
          cleanData.admissionEntranceDetails.quotaSystem
        )
          ? cleanData.admissionEntranceDetails.quotaSystem.filter(
              (item) => typeof item === "string"
            )
          : [], // Ensure proper format
      }),
    };

    console.log("📢 Final Payload to API:", formattedData);

    axios
      .put(`${API_BASE_URL}/api/college/update/${_id}`, formattedData)
      .then((response) => {
        console.log("✅ API Response:", response.data);
        alert("🎉 Successfully Updated");

        if (response.data.success) {
          setCollegeData((prevData) =>
            prevData.map((college) =>
              college._id === _id ? { ...college, ...formattedData } : college
            )
          );
          setEditModalOpen(false);
        } else {
          alert("❌ Failed to update college details");
        }
      })
      .catch((error) => {
        console.error(
          "❌ Error updating college data:",
          error.response?.data || error
        );
        alert(
          error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            error.response?.data.errMsg ||
            `❌ Error updating college details: ${error}`
        );
      });
  };

  // const handleUpload = () => {
  //   if (!selectedRow) return;

  //   const formData = new FormData();
  //   if (heroImage) formData.append("heroImage", heroImage);
  //   if (galleryImages.length > 0) {
  //     Array.from(galleryImages).forEach((file) =>
  //       formData.append("galleryImages", file)
  //     );
  //   }

  //   axios
  //     .post(
  //       `${API_BASE_URL}/api/college/${selectedRow._id}/upload-images`,
  //       formData
  //     )
  //     .then((res) => {
  //       alert("🎉 Images uploaded successfully!");
  //       setUploadModalOpen(false);
  //       setHeroImage(null);
  //       setGalleryImages([]);
  //     })
  //     .catch((err) => {
  //       alert("❌ Upload failed!");
  //       console.error(err);
  //     });
  // };


  const handleUpload = (collegeId) => {
    if (!collegeId || !heroImage) return;
    if (heroImageError || galleryImagesError) {
      return; // prevent upload
    }
  
    const formData = new FormData();
  
    // Append hero image with key "image"
    formData.append("image", heroImage);
  
    // Append gallery images with key "imageGallery"
    if (galleryImages.length > 0) {
      Array.from(galleryImages).forEach((file) =>
        formData.append("imageGallery", file)
      );
    }
  
    // Make POST request to upload images
    axios
      .post(`${API_BASE_URL}/api/college/upload/${collegeId}`, formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Uploaded!",
          text: "🎉 Images uploaded successfully!",
          confirmButtonText: "OK",
        }).then(() => {
          setUploadModalOpen(false);
          setHeroImage(null);
          setGalleryImages([]);
        });
      })    
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: "Upload Failed!",
          text: "Please Try Again.",
          confirmButtonText: "OK",
        });
        console.error(err);
      });
      
      
  };

  
  const handleDelete = (item) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this college?"
    );

    if (isConfirmed) {
      setCollegeData(collegeData.filter((college) => college._id !== item._id));
      alert("College deleted successfully! ✅");
    }
  };

  const filteredData = collegeData.filter((row) => {
    return (
      row.collegeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.affiliatedUniversity
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      // ✅ Fix: `Category` is an array, check if **any** item matches the search term
      row.Category?.some((cat) =>
        cat.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      row.collegeType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // ✅ Fix: Handle `null` address fields
      // `${row.address?.line1 || ""},
      `${row.address?.line2 || ""}, ${row.address?.dist || ""}, ${
        row.address?.state || ""
      } - ${row.address?.pincode || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row.contactDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.websiteURL?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // ✅ Fix: Handle `null` establishedYear
      (row.establishedYear
        ? row.establishedYear.toString().includes(searchTerm)
        : false) ||
      row.accreditation?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const columns = [
    // ✅ Upload Image column before Actions
    // {
    //   name: "Upload",
    //   cell: (row) => (
    //     <div className="flex gap-2">
    //       <FaImages
    //         className="cursor-pointer text-blue-500"
    //         title="Upload Images"
    //         onClick={() => {
    //           setSelectedRow(row);
    //           setUploadModalOpen(true);
    //         }}
    //       />
    //     </div>
    //   ),
    //   width: "100px",
    // },

    {
      name: "Upload",
      cell: (row) => (
        <div className="flex gap-2">
          <FaImages
            className="cursor-pointer text-blue-500"
            title="Upload Images"
            onClick={() => {
              setSelectedRow(row); // row contains _id
              setUploadModalOpen(true);
            }}
          />
        </div>
      ),
      width: "100px",
    },    
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

    // {
    //   name: "Address",
    //   selector: (row) =>
    //     `${row.address.line1}, ${row.address.line2}, ${row.address.dist}, ${row.address.state} - ${row.address.pincode}`,
    //   sortable: true,
    // },

    {
      name: "Contact",
      selector: (row) => row.contactDetails,
      sortable: true,
    },
    // {
    //   name: "Website",
    //   selector: (row) => (
    //     <div>
    //       {row.websiteURL && row.websiteURL.trim() !== "" ? (
    //         <a
    //           href={row.websiteURL}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-white bg-blue-600 hover:bg-blue-800 py-1 px-3 rounded-md cursor-pointer inline-block"
    //         >
    //           Visit Website
    //         </a>
    //       ) : (
    //         <span className="text-gray-500">N/A</span>
    //       )}
    //     </div>
    //   ),
    // },

    {
      name: "Website",
      selector: (row) => (
        <div>
          {row.websiteURL && row.websiteURL.trim() !== "" ? (
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
              Visit Website
            </a>
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>
      ),
      sortable: true,
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
      selector: (row) => row._id, // Helps maintain column width
      sortable: false,
      width: "250px", // ✅ Set Fixed Width
      cell: (row) => (
        <div className="flex text-center space-x- min-w-[250px] gap-1">
          {/* View Profile */}
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            data-tooltip-id="view-tooltip"
            data-tooltip-content="View Profile"
            onClick={() => handleViewProfile(row)}
          >
            <FaEye size={17} />
          </button>

          {/* Edit */}
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            data-tooltip-id="edit-tooltip"
            data-tooltip-content="Edit Details"
            onClick={() => handleEdit(row)}
          >
            <FaEdit size={17} />
          </button>

          {/* <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            data-tooltip-id="upload-image-tooltip"
            data-tooltip-content="Upload Images"
            onClick={() => openUploadModal(row)}
          >
            <FaImages size={17} />
          </button> */}

          {/* Delete */}
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Delete College"
            onClick={() => handleDelete(row)}
          >
            <FaPauseCircle size={17} />
          </button>

          {/* Add Courses */}
          <button
            className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            data-tooltip-id="courses-tooltip"
            data-tooltip-content="Manage Courses"
            onClick={() => navigate(`/colleges/courses/${row._id}`)}
          >
            <FaPlus size={17} />
          </button>

          {/* Manage Infrastructure */}
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            data-tooltip-id="infra-tooltip"
            data-tooltip-content="Manage Infrastructure"
            onClick={() => navigate(`/colleges/infrastructure/${row._id}`)}
          >
            <FaBuilding size={17} />
          </button>

          {/* Manage Placements */}
          <button
            className="bg-pink-500 hover:bg-pink-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            data-tooltip-id="placement-tooltip"
            data-tooltip-content="Manage Placements"
            onClick={() => navigate(`/colleges/placement/${row._id}`)}
          >
            <FaBriefcase size={17} />
          </button>

          {/* Tooltip Components */}
          <Tooltip id="view-tooltip" place="top" />
          <Tooltip id="edit-tooltip" place="top" />
          <Tooltip id="delete-tooltip" place="top" />
          <Tooltip id="courses-tooltip" place="top" />
          <Tooltip id="infra-tooltip" place="top" />
          <Tooltip id="placement-tooltip" place="top" />
          {/* <Tooltip id="upload-image-tooltip" place="top" /> */}
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-6 shadow-lg ">
        <div className="flex justify-between items-center bg-white p-4 shadow-md  mb-4">
          <h2 className="text-3xl font-semibold text-blue-800">
            🎓 College List
          </h2>
          <div className="ml-4">
            <input
              type="text"
              placeholder="🔍 Search colleges..."
              className="px-4 py-2 rounded-md border-blue-600 border-2 focuss:ring focus:ring-blue-300 outline-none shadow-sm"
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
                backgroundColor: "#2563eb",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              },
            },
            headCells: {
              style: {
                padding: "12px",
                textTransform: "uppercase",
              },
            },
            rows: {
              style: {
                fontSize: "16px", // Increase Row Text Size
                backgroundColor: "#f0f9ff",
                color: "#1e3a8a",
                borderBottom: "1px solid #3b82f6",
                padding: "10px",
              },
            },
            pagination: {
              style: {
                backgroundColor: "#ffffff",
                borderTop: "1px solid #ddd",
                padding: "8px",
              },
            },
          }}
        />

        {/* Render InfoCard modal */}
        {modalOpen && (
          <InfoCard collegeData={selectedItem} onClose={handleCloseModal} />
        )}

        {isUploadModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto border-4 border-blue-500">
              {/* Modal Header */}
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-t-lg">
                <h2 className="text-2xl font-semibold">
                  📤 Upload College Images
                </h2>
                <button
                  onClick={() => {
                    setUploadModalOpen(false);
                    setSelectedRow(null);
                    setHeroImage(null);
                    setGalleryImages([]);
                  }}
                  className="text-white text-3xl hover:text-red-500 transition-all duration-300 cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <hr className="my-4 border-blue-200" />

              {/* Upload Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2 sm:px-4">
                {/* Hero Image Input */}
                <div>
                  <label className="text-blue-700 font-semibold block mb-2">
                    Main Image (Max: 100KB):
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition-all">
                    <span className="text-gray-500 mb-1 text-sm">
                      Click to upload Main Image
                    </span>
                    <span className="text-xs text-gray-400">
                      (Only one image allowed)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.size > 100 * 1024) {
                          setHeroImageError("Image size must be less than 100KB");
                          setHeroImage(null);
                        } else {
                          setHeroImageError("");
                          setHeroImage(file);
                        }
                      }}
                      className="hidden"
                    />
                    {heroImageError && (
  <p className="text-red-500 text-sm mt-2">{heroImageError}</p>
)}
                  </label>
                  {heroImage && (
                    <img
                      src={URL.createObjectURL(heroImage)}
                      alt="Hero Preview"
                      className="mt-3 rounded-md shadow max-h-32 object-contain"
                    />
                  )}
                </div>

                {/* Gallery Images Input */}
                <div>
                  <label className="text-green-600 font-semibold block mb-2">
                    Gallery Images (Max: 100KB):
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-green-400 transition-all">
                    <span className="text-gray-600 font-medium mb-1">
                      Upload Gallery Images
                    </span>
                    <span className="text-xs text-gray-400">
                      (You can select multiple images)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const oversized = files.filter(file => file.size > 100 * 1024);
                    
                        if (oversized.length > 0) {
                          setGalleryImagesError("All gallery images must be under 100KB");
                          setGalleryImages([]);
                        } else {
                          setGalleryImagesError("");
                          setGalleryImages(e.target.files);
                        }
                      }}
                      className="hidden"
                    />
                    {galleryImagesError && (
  <p className="text-red-500 text-sm mt-2">{galleryImagesError}</p>
)}
                  </label>
                  {galleryImages && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {Array.from(galleryImages).map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Gallery Preview ${index + 1}`}
                          className="rounded-md shadow max-h-24 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-8 px-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                  onClick={() => {
                    setUploadModalOpen(false);
                    setSelectedRow(null);
                    setHeroImage(null);
                    setGalleryImages([]);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={() => handleUpload(selectedRow._id)}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
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
