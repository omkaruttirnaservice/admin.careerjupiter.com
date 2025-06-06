import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaPencilAlt,
  FaTrashAlt,
  FaGlobe,
  FaCheck,
  FaBriefcase,
  FaBuilding,
  FaPlus,
} from "react-icons/fa";
import { fetchAllUniversities, deleteUniversity } from "./universityapi";
import ViewUniversityModal from "./viewUniversityModal";
import DeleteConfirmationModal from "./deleteUniversitymodal";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const UniversityList = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupItems, setPopupItems] = useState([]);
  const navigate = useNavigate();

  // show the popups when called
  const handleShowPopup = (title, items) => {
    setPopupTitle(title);
    setPopupItems(items);
    setShowPopup(true);
  };

  // Fetch universities data fresh on every mount without using cached data
  const {
    data: universitiesData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: fetchAllUniversities,
    staleTime: 0, // Always consider data as outdated, so it's fetched fresh every time
    refetchOnMount: true, // Fetch data again whenever the component mounts
  });

  // Handles university deletion, refreshes list on success
  const deleteMutation = useMutation({
    mutationFn: deleteUniversity,
    onSuccess: () => {
      toast.success("University deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["universities"] });
      setDeleteModalOpen(false);
    },
    onError: (error) => {
      toast.error(
        `Failed to delete university: ${
          error.message || "Failed to delete university"
        }`
      );
    },
  });

  // Handle view university
  const handleViewUniversity = (university) => {
    setSelectedUniversity(university);
    setViewModalOpen(true);
  };

  // Handle delete university
  const handleDeleteClick = (university) => {
    setSelectedUniversity(university);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUniversity?._id) {
      deleteMutation.mutate(selectedUniversity._id);
    }
  };

  // Show Filtered Data as per it
  const filteredUniversities =
    universitiesData?.filter(
      (university) =>
        university.universityName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        university.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.establishedYear?.toString().includes(searchTerm)
    ) || [];

  // Pagination
  const indexOfLastUniversity = currentPage * rowsPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - rowsPerPage;
  const currentUniversities = filteredUniversities.slice(
    indexOfFirstUniversity,
    indexOfLastUniversity
  );
  const totalPages = Math.ceil(filteredUniversities.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If Error occure while fetching university then it gets viewed
  if (isError) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Warning!</strong>
        <span className="block sm:inline">
          {" "}
          {error.message || "Failed to load universities"}
        </span>
      </div>
    );
  }

  return (
    <section>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-6 shadow-lg">
        {/* Header Section */}
        <div className="sticky top-0 z-20 bg-white p-4 shadow-md rounded-lg mb-4 flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-blue-800 flex items-center gap-3">
            <FaGlobe className="text-white bg-blue-600 p-2 rounded-full shadow-md text-5xl" />
            University List
          </h2>
          {/* Search Section  */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="🔍 Search universities..."
              className="px-4 py-2 rounded-md border-blue-600 border-2 focus:ring focus:ring-blue-300 outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-200">
          {/* Table */}
          <div className="overflow-x-auto max-h-[70vh]">
            <table className="w-full text-left">
              {/* Table Heading  */}
              <thead className="bg-blue-600 text-white uppercase truncate sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 font-bold">University ID</th>
                  <th className="px-6 py-4 font-bold">University Name</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Sub Category</th>
                  <th className="px-6 py-4 font-bold">Website</th>
                  <th className="px-6 py-4 font-bold">Year</th>
                  <th className="px-6 py-4 font-bold">Email</th>
                  <th className="px-6 py-4 font-bold">Entrance Exams</th>
                  <th className="px-6 py-4 font-bold">Accreditation</th>
                  <th className="px-6 py-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              {/* Table Data  */}
              <tbody className="divide-y divide-blue-100">
                {currentUniversities.length > 0 ? (
                  currentUniversities.map((university) => (
                    <tr
                      key={university._id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      {/* University ID */}
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {university.universityId || "N/A"}
                      </td>
                      {/* University Name */}
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {university.universityName.length > 15
                          ? university.universityName.slice(0, 12) + "..."
                          : university.universityName}
                      </td>
                      {/* University Category */}
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          {university.category}
                        </span>
                      </td>
                      {/* University Sub-Category */}
                      <td className="px-6 py-4">
                        {university.subCategory?.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                              {university.subCategory[0]}
                            </span>
                            {university.subCategory.length > 1 && (
                              <button
                                onClick={() =>
                                  handleShowPopup(
                                    "Sub Categories",
                                    university.subCategory
                                  )
                                }
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full cursor-pointer text-xs hover:bg-blue-200"
                              >
                                +{university.subCategory.length - 1}
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">None</span>
                        )}
                      </td>
                      {/* Website URL */}
                      <td className="px-6 py-4">
                        {university.websiteURL ? (
                          <a
                            href={
                              university.websiteURL.startsWith("http")
                                ? university.websiteURL
                                : `https://${university.websiteURL}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-blue-600 hover:bg-blue-800 py-1 px-3 rounded-md cursor-pointer"
                          >
                            Visit
                          </a>
                        ) : (
                          <span className="text-gray-400">Not Available</span>
                        )}
                      </td>
                      {/* Establised Year */}
                      <td className="px-6 py-4">
                        {university.establishedYear || "N/A"}
                      </td>
                      {/* Email ID */}
                      <td className="px-6 py-4">
                        {university.email_id ? (
                          <a
                            href={`mailto:${university.email_id}`}
                            className="text-blue-500 hover:underline"
                          >
                            {university.email_id}
                          </a>
                        ) : (
                          <span className="text-gray-400">Not Available</span>
                        )}
                      </td>
                      {/* Entrance exams required */}
                      <td className="px-6 py-4">
                        {university.entrance_exam_required?.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                              {university.entrance_exam_required[0]}
                            </span>
                            {university.entrance_exam_required.length > 1 && (
                              <button
                                onClick={() =>
                                  handleShowPopup(
                                    "Entrance Exams",
                                    university.entrance_exam_required
                                  )
                                }
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full cursor-pointer text-xs hover:bg-blue-200"
                              >
                                +{university.entrance_exam_required.length - 1}
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">None</span>
                        )}
                      </td>
                      {/* Accreditation */}
                      <td className="px-6 py-4">
                        {university.accreditation?.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                              {university.accreditation[0]}
                            </span>
                            {university.accreditation.length > 1 && (
                              <button
                                onClick={() =>
                                  handleShowPopup(
                                    "Accreditations",
                                    university.accreditation
                                  )
                                }
                                className="bg-blue-100 text-blue-800 px-2 py-1 cursor-pointer rounded-full text-xs hover:bg-blue-200"
                              >
                                +{university.accreditation.length - 1}
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">None</span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-3">
                          {/* View Info */}
                          <button
                            onClick={() => handleViewUniversity(university)}
                            data-tooltip-id="view-tooltip"
                            data-tooltip-content="View Profile"
                            className="bg-blue-600 hover:bg-blue-800 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                          >
                            <FaEye size={16} />
                          </button>
                          {/* Edit */}
                          <Link
                            to={`/edit-university/${university._id}`}
                            data-tooltip-id="edit-tooltip"
                            data-tooltip-content="Edit Details"
                            className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                          >
                            <FaPencilAlt size={16} />
                            {/* Delete */}
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(university)}
                            data-tooltip-id="delete-tooltip"
                            data-tooltip-content="Delete College"
                            className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                          >
                            <FaTrashAlt size={16} />
                          </button>
                          {/* Courses */}
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                            data-tooltip-id="courses-tooltip"
                            data-tooltip-content="Manage Courses"
                            onClick={() => {
                              navigate(`/university/courses/${university._id}`);
                            }}
                          >
                            <FaPlus size={17} />
                          </button>
                          {/* Infrastructure */}
                          <button
                            className="bg-purple-500 hover:bg-purple-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/university/infrastructure/${university._id}`
                              )
                            }
                            data-tooltip-id="infra-tooltip"
                            data-tooltip-content="University Infrastructure"
                          >
                            <FaBuilding size={17} />
                          </button>
                          {/* Placement */}
                          <button
                            className="bg-pink-500 hover:bg-pink-700 text-white px-2 py-1 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/university/placement/${university._id}`
                              )
                            }
                            data-tooltip-id="placement-tooltip"
                            data-tooltip-content="Placement Details"
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
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No universities found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredUniversities.length > 0 && (
            <div className="sticky bottom-0 z-10 bg-blue-50 border-t border-blue-200 p-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstUniversity + 1} to{" "}
                {Math.min(indexOfLastUniversity, filteredUniversities.length)}{" "}
                of {filteredUniversities.length} entries
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-600">
                    Rows per page:
                  </span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div className="flex">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-blue-300 rounded-l bg-white text-blue-600 disabled:opacity-50 hover:bg-blue-50"
                  >
                    &laquo;
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border-t border-b border-blue-300 bg-white text-blue-600 disabled:opacity-50 hover:bg-blue-50"
                  >
                    &lt;
                  </button>
                  <span className="px-3 py-1 border-t border-b border-blue-300 bg-blue-600 text-white">
                    {currentPage}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border-t border-b border-blue-300 bg-white text-blue-600 disabled:opacity-50 hover:bg-blue-50"
                  >
                    &gt;
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-blue-300 rounded-r bg-white text-blue-600 disabled:opacity-50 hover:bg-blue-50"
                  >
                    &raquo;
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Popup Modal for each popup*/}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto border-4 border-blue-500 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-t-lg">
                <h2 className="text-2xl font-semibold">
                  {popupTitle || " List "}
                </h2>
                {/* Cross Button */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-white text-3xl hover:text-red-500 transition duration-300"
                >
                  &times;
                </button>
              </div>

              <hr />

              {/* Content */}
              <div className="px-4 max-h-60 overflow-y-auto">
                {popupItems && popupItems.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {popupItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-gray-800 font-medium flex items-start gap-2"
                      >
                        <FaCheck className="text-blue-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No items to display.</p>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end px-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="mt-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Info Modal */}
        {viewModalOpen && (
          <ViewUniversityModal
            university={selectedUniversity}
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <DeleteConfirmationModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title="Delete University"
            message={`Are you sure you want to delete ${selectedUniversity?.universityName}? This action cannot be undone.`}
            isDeleting={deleteMutation.isPending}
          />
        )}
      </div>
    </section>
  );
};

export default UniversityList;
