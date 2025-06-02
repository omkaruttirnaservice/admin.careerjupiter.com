import { useState, useEffect } from "react";
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
  FaUniversity,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import InfoCard from "../component/infoCard";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const CollegeTableDetails = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [logoImageError, setLogoImageError] = useState("");
  const [heroImageError, setHeroImageError] = useState("");
  const [galleryImagesError, setGalleryImagesError] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate();

  // Colour Maping for Category
  const categoryColorMapping = {
    HSC: "bg-blue-200 text-blue-800 transition-all duration-300",
    Diploma: "bg-pink-200 text-pink-800 transition-all duration-300",
    Engineering: "bg-yellow-200 text-yellow-800 transition-all duration-300",
    Pharmacy: "bg-red-200 text-red-800 transition-all duration-300",
  };

  // Colour Maping for Type
  const typeColorMapping = {
    Government: "bg-green-200 text-green-800",
    Private: "bg-purple-200 text-purple-800",
    Autonomous: "bg-red-200 text-red-800",
    Deemed: "bg-pink-200 text-pink-800",
  };

// Get method Logic - to fetch data
  const fetchCollegeData = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/college/all`)
      .then((response) => {
        if (response.data.success) {
          const parsedData =
            typeof response.data.data === "string"
              ? JSON.parse(response.data.data)
              : response.data.data;
          setCollegeData(parsedData.colleges);
          console.log("College data loaded:", parsedData.colleges);
          setLoading(false);
        } else {
          console.error("API returned success:false", response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching college data:", error);
        setLoading(false);
      });
  };

  // Fetch data from API
  useEffect(() => {
    fetchCollegeData();
  }, [refreshData]);

  // Handle modal - close
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  // Handle View Profile - click
  const handleViewProfile = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  //Handle Images Uploading
  const handleUpload = (collegeId) => {
    if (!collegeId) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "No college selected for upload",
      });
      return;
    }

    if (logoImageError || heroImageError || galleryImagesError) {
      Swal.fire({
        icon: "warning",
        title: "Please check your fields",
        text: "Please fix the highlights shown before uploading",
      });
      return;
    }

    const formData = new FormData();

    if (logoImage) {
      formData.append("logo", logoImage);
    }
    if (heroImage) {
      formData.append("image", heroImage);
    }
    if (galleryImages.length > 0) {
      Array.from(galleryImages).forEach((file) =>
        formData.append("imageGallery", file)
      );
    }

    // Check if at least one image is selected
    if (!logoImage && !heroImage && galleryImages.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Images Selected",
        text: "Please select at least one image to upload",
      });
      return;
    }

    // Make POST request to upload images
    axios
      .post(`${API_BASE_URL}/api/college/upload/${collegeId}`, formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Uploaded!",
          text: "Images uploaded successfully!",
          confirmButtonText: "OK",
        }).then(() => {
          setUploadModalOpen(false);
          setLogoImage(null);
          setHeroImage(null);
          setGalleryImages([]);
          // Refresh data to show updated images
          setRefreshData(!refreshData);
        });
      })
      .catch((err) => {
        console.error("Upload error:", err.response?.data || err);
        Swal.fire({
          icon: "warning",
          title: "Upload Failed!",
          text: err.response?.data?.message || err.response?.data?.usrMsg || "Please try again.",
          confirmButtonText: "OK",
        });
      });
  };

  // Handle Delete College
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_BASE_URL}/api/college/delete/${item._id}`)
          .then((response) => {
            if (response.data.success) {
              setCollegeData(
                collegeData.filter((college) => college._id !== item._id)
              );
              Swal.fire("Deleted!", "College has been deleted.", "success");
            } else {
              Swal.fire("Warning!", "Failed to delete college.", "warning");
            }
          })
          .catch((error) => {
            console.error("Error deleting college:", error);
            Swal.fire("Warning!", "Failed to delete college.", "warning");
          });
      }
    });
  };

  // Filter colleges as per the below mentioned fields
  const filteredData = collegeData.filter((row) => {
    if (!row) return false;

    const searchFields = [
      row.collegeName,
       row.collegeId,
      row.affiliatedUniversity,
      row.collegeType,
      row.category,
      row.contactDetails,
      row.accreditation,
    ];

    // Handle Category which might be an array or string
    let categoryMatch = false;
    if (Array.isArray(row.category)) {
      categoryMatch = row.category.some((cat) =>
        cat?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (typeof row.category === "string") {
      categoryMatch = row.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    // Handle establishedYear 
    const yearMatch = row.establishedYear
      ? row.establishedYear.toString().includes(searchTerm)
      : false;

    // Check if any field matches the search term
    return (
      searchFields.some(
        (field) =>
          field &&
          field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      categoryMatch ||
      yearMatch
    );
  });

  // Table Columns 
  const columns = [
    // Upload Images
    {
      name: "Upload",
      cell: (row) => (
        <div className="flex gap-2">
          <FaImages
            className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
            size={18}
            title="Upload Images"
            onClick={() => {
              setSelectedRow(row);
              setUploadModalOpen(true);
            }}
          />
        </div>
      ),
      width: "80px",
    },
    // College Logo displayed
    {
      name: "College Logo",
      cell: (row) => (
        <div className="flex justify-center items-center">
          {row.logo ? (
            <img
              src={`${API_BASE_URL}${row.logo}`}
              alt={`${row.collegeName} Logo`}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <FaUniversity className="text-gray-400" size={24} />
          )}
        </div>
      ),
      width: "100px",
    },
    // College ID
    {
      name: "College Id",
      selector: (row) => row.collegeId,
      sortable: true,
      grow: 0,
    },
    // College Name
    {
      name: "College Name",
      selector: (row) => row.collegeName,
      sortable: true,
      grow: 2,
    },
    //Affiliated University
    {
      name: "Affiliated University",
      selector: (row) => row.affiliatedUniversity,
      sortable: true,
      grow: 2,
    },
    // Category
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      cell: (row) => {
        const category = Array.isArray(row.category)
          ? row.category[0]
          : row.category;
        const tagColor =
          categoryColorMapping[category] || "bg-gray-200 text-gray-800";
        return (
          <span
            className={`px-3 py-1 rounded-full ${tagColor} text-sm font-medium`}
          >
            {category}
          </span>
        );
      },
    },
    // College Type
    {
      name: "Type",
      selector: (row) => row.collegeType,
      sortable: true,
      cell: (row) => {
        const tagColor =
          typeColorMapping[row.collegeType] || "bg-gray-200 text-gray-800";
        return (
          <span
            className={`px-3 py-1 rounded-full ${tagColor} text-sm font-medium`}
          >
            {row.collegeType}
          </span>
        );
      },
    },
    // Contact - Mobile No.
    {
      name: "Contact",
      selector: (row) => row.contactDetails,
      sortable: true,
    },
    // Website
    {
      name: "Website",
      selector: (row) => row.websiteURL,
      sortable: true,
      cell: (row) => (
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
              className="text-white bg-blue-600 hover:bg-blue-800 py-1 px-3 rounded-md cursor-pointer inline-block transition-colors"
            >
              Visit
            </a>
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>
      ),
    },
    // Established Year
    {
      name: "Est. Year",
      selector: (row) => row.establishedYear,
      sortable: true,
      width: "100px",
    },
    // Accreditation
    {
      name: "Accreditation",
      selector: (row) => row.accreditation,
      sortable: true,
    },

    // Action buttons included over here
    {
      name: "Actions",
      selector: (row) => row._id,
      sortable: false,
      width: "250px",
      cell: (row) => {
        const role = Cookies.get("role");
        const subrole = Cookies.get("subrole");

        return (
          <div className="flex text-center space-x-1 min-w-[250px] gap-1">
            {/* View Button */}
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
              data-tooltip-id="view-tooltip"
              data-tooltip-content="View Profile"
              onClick={() => handleViewProfile(row)}
            >
              <FaEye size={17} />
            </button>

            {/* Edit Button */}
            {(role === "ADMIN" ||
              (role === "VENDOR" && subrole === "COLLEGE")) && (
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                data-tooltip-id="edit-tooltip"
                data-tooltip-content="Edit Details"
                onClick={() => {
                  // For admin, store the collegeId in cookie temporarily
                  if (role === "ADMIN") {
                    Cookies.set("collegeID", row._id, { expires: 1 });
                  }
                  navigate(`/colleges/edit/${row._id}`);
                }}
              >
                <FaEdit size={17} />
              </button>
            )}

            {/* Delete Button */}
            <button
              className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
              data-tooltip-id="delete-tooltip"
              data-tooltip-content="Delete College"
              onClick={() => handleDelete(row)}
            >
              <FaPauseCircle size={17} />
            </button>

            {/* Courses Button */}
            <button
              className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
              data-tooltip-id="courses-tooltip"
              data-tooltip-content="Manage Courses"
              onClick={() => {
                // For admin, store the collegeId in cookie temporarily
                if (role === "ADMIN") {
                  Cookies.set("collegeID", row._id, { expires: 1 });
                }
                navigate(`/colleges/courses/${row._id}`);
              }}
            >
              <FaPlus size={17} />
            </button>

              {/* Infrastrucute  */}
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
              data-tooltip-id="infra-tooltip"
              data-tooltip-content="Manage Infrastructure"
              onClick={() => {
                // For admin, store the collegeId in cookie temporarily
                if (role === "ADMIN") {
                  Cookies.set("collegeID", row._id, { expires: 1 });
                }
                navigate(`/colleges/infrastructure/${row._id}`);
              }}
            >
              <FaBuilding size={17} />
            </button>

              {/* Placement */}
            <button
              className="bg-pink-500 hover:bg-pink-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
              data-tooltip-id="placement-tooltip"
              data-tooltip-content="Manage Placements"
              onClick={() => {
                // For admin, store the collegeId in cookie temporarily
                if (role === "ADMIN") {
                  Cookies.set("collegeID", row._id, { expires: 1 });
                }
                navigate(`/colleges/placement/${row._id}`);
              }}
            >
              <FaBriefcase size={17} />
            </button>
           
            {/* Tooltips */}
            <Tooltip id="view-tooltip" place="top" />
            <Tooltip id="edit-tooltip" place="top" />
            <Tooltip id="delete-tooltip" place="top" />
            <Tooltip id="courses-tooltip" place="top" />
            <Tooltip id="infra-tooltip" place="top" />
            <Tooltip id="placement-tooltip" place="top" />
          </div>
        );
      },
    },
  ];

  return (
    <section>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-2 px-4 shadow-lg">

        {/* Header Section  */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-3">
          <h2 className="text-3xl font-semibold text-blue-800">
            🎓 College List
          </h2>

          {/* Search Bar  */}
          <div className="ml-4">
            <input
              type="text"
              placeholder="🔍 Search colleges..."
              className="px-4 py-2 rounded-md border-blue-600 border-2 focus:ring focus:ring-blue-300 outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

       {/* Used DataTable Component for managing the table (List)   */}
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          highlightOnHover
          responsive
          progressPending={loading}
         progressComponent={
          <div className="p-6 flex justify-center items-center space-x-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            <span className="text-blue-600 font-semibold text-lg">Loading Colleges...</span>
          </div>
        }
          noDataComponent={
            <div className="p-4 text-center text-gray-500">
              No colleges found. Try a different search term.
            </div>
          }
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
                fontSize: "16px",
                backgroundColor: "#ffff",
                color: "#1e3a8a",
                borderBottom: "1px solid #3b82f6",
                padding: "10px",
              },
            },
            pagination: {
              style: {
                backgroundColor: "#f0ffff",
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

        {/* Image Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto border-4 border-blue-500">
              {/* Modal Header */}
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-t-lg">
                <h2 className="text-2xl font-semibold">
                  📤 Upload College Images
                </h2>
                <button
                  onClick={() => {
                    setUploadModalOpen(false);
                    setSelectedRow(null);
                    setLogoImage(null);
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 sm:px-4">
                {/* Logo Image Input */}
                <div>
                  <label className="text-red-700 font-semibold block mb-2">
                    College Logo (Max: 100KB):
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-red-400 transition-all">
                    <span className="text-gray-500 mb-1 text-sm">
                      Click to upload College Logo
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
                          setLogoImageError(
                            "Image size must be less than 100KB"
                          );
                          setLogoImage(null);
                        } else {
                          setLogoImageError("");
                          setLogoImage(file);
                        }
                      }}
                      className="hidden"
                    />
                    {logoImageError && (
                      <p className="text-red-500 text-sm mt-2">
                        {logoImageError}
                      </p>
                    )}
                  </label>
                  {logoImage && (
                    <div className="mt-3 relative">
                      <img
                        src={
                          URL.createObjectURL(logoImage) || "/placeholder.svg"
                        }
                        alt="Logo Preview"
                        className="rounded-md shadow max-h-32 mx-auto object-contain"
                      />
                      <button
                        onClick={() => setLogoImage(null)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </div>

                {/* Hero Image Input */}
                <div>
                  <label className="text-blue-700 font-semibold block mb-2">
                    College Image (Max: 100KB):
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition-all">
                    <span className="text-gray-500 mb-1 text-sm">
                      Click to upload College Image
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
                          setHeroImageError(
                            "Image size must be less than 100KB"
                          );
                          setHeroImage(null);
                        } else {
                          setHeroImageError("");
                          setHeroImage(file);
                        }
                      }}
                      className="hidden"
                    />
                    {heroImageError && (
                      <p className="text-red-500 text-sm mt-2">
                        {heroImageError}
                      </p>
                    )}
                  </label>
                  {heroImage && (
                    <div className="mt-3 relative">
                      <img
                        src={
                          URL.createObjectURL(heroImage) || "/placeholder.svg"
                        }
                        alt="Hero Preview"
                        className="rounded-md shadow max-h-32 mx-auto object-contain"
                      />
                      <button
                        onClick={() => setHeroImage(null)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </div>

                {/* Gallery Images Input */}
                <div>
                  <label className="text-green-600 font-semibold block mb-2">
                    Gallery Images (Max: 100KB each):
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
                        const oversized = files.filter(
                          (file) => file.size > 100 * 1024
                        );

                        if (oversized.length > 0) {
                          setGalleryImagesError(
                            "All gallery images must be under 100KB"
                          );
                          setGalleryImages([]);
                        } else {
                          setGalleryImagesError("");
                          setGalleryImages(e.target.files);
                        }
                      }}
                      className="hidden"
                    />
                    {galleryImagesError && (
                      <p className="text-red-500 text-sm mt-2">
                        {galleryImagesError}
                      </p>
                    )}
                  </label>
                  {galleryImages && galleryImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {Array.from(galleryImages).map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={
                              URL.createObjectURL(file) || "/placeholder.svg"
                            }
                            alt={`Gallery Preview ${index + 1}`}
                            className="rounded-md shadow max-h-24 w-full object-cover"
                          />
                        </div>
                      ))}
                      {galleryImages.length > 0 && (
                        <button
                          onClick={() => setGalleryImages([])}
                          className="mt-2 text-red-500 hover:text-red-700 text-sm"
                        >
                          Clear all gallery images
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected College Info for image upload section */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800">
                  Uploading images for:{" "}
                  <span className="font-bold">{selectedRow?.collegeName}</span>
                </h3>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-8 px-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition-colors"
                  onClick={() => {
                    setUploadModalOpen(false);
                    setSelectedRow(null);
                    setLogoImage(null);
                    setHeroImage(null);
                    setGalleryImages([]);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  onClick={() => handleUpload(selectedRow._id)}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default CollegeTableDetails;
