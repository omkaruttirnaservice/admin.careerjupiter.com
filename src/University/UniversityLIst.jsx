import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaPencilAlt,
  FaTrashAlt,
  FaGlobe,
  FaPlus,
} from "react-icons/fa";
import { fetchAllUniversities, deleteUniversity } from "./Universityapi";
import ViewUniversityModal from "./viewUniversityModal";
import DeleteConfirmationModal from "./DeleteUniversitymodal";
import { useEffect } from "react";

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

  const handleShowPopup = (title, items) => {
    setPopupTitle(title);
    setPopupItems(items);
    setShowPopup(true);
  };

  const {
    data: universitiesData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: fetchAllUniversities,
    staleTime: 0, // 👈 disables cache staleness
    refetchOnMount: true, // 👈 ensures API is called on remount
  });

  // Delete university mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUniversity,
    onSuccess: () => {
      toast.success("University deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["universities"] });
      setDeleteModalOpen(false);
    },
    onError: (error) => {
      toast.error(
        `Error deleting university: ${
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">
          {" "}
          {error.message || "Failed to load universities"}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 border border-blue-300">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-3 rounded-t-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-4">
          <FaGlobe
            className="text-black bg-white p-2 rounded-md shadow-md"
            size={30}
          />
          University List
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search universities..."
              className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            to="/university"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaPlus /> Add New
          </Link>
        </div>
      </div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
    <thead className="text-sm text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-4 py-3">University Name</th>
        <th scope="col" className="px-4 py-3">Category</th>
        <th scope="col" className="px-4 py-3">Sub Category</th>
        <th scope="col" className="px-4 py-3">Website</th>
        <th scope="col" className="px-4 py-3">Year</th>
        <th scope="col" className="px-4 py-3">Email</th>
        <th scope="col" className="px-4 py-3">Exams</th>
        <th scope="col" className="px-4 py-3">Accreditation</th>
        <th scope="col" className="px-4 py-3 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {currentUniversities.length > 0 ? (
        currentUniversities.map((university) => (
          <tr
            key={university._id}
            className="bg-white  dark:bg-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {university.universityName.length > 15
                ? university.universityName.slice(0, 12) + "..."
                : university.universityName}
            </td>

            <td className="px-4 py-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  university.category === "Government"
                    ? "bg-green-100 text-green-800"
                    : university.category === "Private"
                    ? "bg-purple-100 text-purple-800"
                    : university.category === "Autonomous"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {university.category}
              </span>
            </td>

            <td className="px-4 py-3">
              {university.subCategory?.length > 0 ? (
                <div className="flex items-center gap-1">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                    {university.subCategory[0]}
                  </span>
                  {university.subCategory.length > 1 && (
                    <button
                      onClick={() =>
                        handleShowPopup("Sub Categories", university.subCategory)
                      }
                      className="bg-green-300 text-gray-700 px-2 py-1 rounded-full cursor-pointer text-xs hover:bg-gray-300"
                    >
                      +{university.subCategory.length - 1}
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-gray-400 text-xs">None</span>
              )}
            </td>

            <td className="px-4 py-3">
              {university.websiteURL ? (
                <a
                  href={
                    university.websiteURL.startsWith("http")
                      ? university.websiteURL
                      : `https://${university.websiteURL}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Visit
                </a>
              ) : (
                <span className="text-gray-400 text-xs">Not Available</span>
              )}
            </td>

            <td className="px-4 py-3">{university.establishedYear || "N/A"}</td>

            <td className="px-4 py-3">
              {university.email_id ? (
                <a
                  href={`mailto:${university.email_id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  {university.email_id}
                </a>
              ) : (
                <span className="text-gray-400 text-xs">Not Available</span>
              )}
            </td>

            <td className="px-4 py-3">
              {university.entrance_exam_required?.length > 0 ? (
                <div className="flex items-center gap-1">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
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
                      className="bg-green-300 text-gray-700 px-2 py-1 rounded-full cursor-pointer text-xs hover:bg-gray-300"
                    >
                      +{university.entrance_exam_required.length - 1}
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-gray-400 text-xs">None</span>
              )}
            </td>

            <td className="px-4 py-3">
              {university.accreditation?.length > 0 ? (
                <div className="flex items-center gap-1">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
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
                      className="bg-green-300 text-gray-700 px-2 py-1 cursor-pointer rounded-full text-xs hover:bg-gray-300"
                    >
                      +{university.accreditation.length - 1}
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-gray-400 text-xs">None</span>
              )}
            </td>

            <td className="px-4 py-3 text-center">
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleViewUniversity(university)}
                  title="View"
                  className="text-blue-600 cursor-pointer hover:text-blue-800"
                >
                  <FaEye />
                </button>
                <Link
                  to={`/edit-university/${university._id}`}
                  title="Edit"
                  className="text-yellow-600 cursor-pointer hover:text-yellow-800"
                >
                  <FaPencilAlt />
                </Link>
                <button
                  onClick={() => handleDeleteClick(university)}
                  title="Delete"
                  className="text-red-600 cursor-pointer hover:text-red-800"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="9"
            className="px-4 py-6 text-center text-sm text-gray-500"
          >
            No universities found
          </td>
        </tr>
      )}
    </tbody>
  </table>

  {showPopup && (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-green-100 bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-4 w-72">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold">{popupTitle}</h2>
          <button
            onClick={() => setShowPopup(false)}
            className="text-gray-500 hover:text-black text-xl leading-none"
          >
            &times;
          </button>
        </div>
        <ul className="list-disc pl-5 text-sm text-gray-700 max-h-60 overflow-y-auto">
          {popupItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )}
</div>


     

      {/* Pagination */}
      {filteredUniversities.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstUniversity + 1} to{" "}
            {Math.min(indexOfLastUniversity, filteredUniversities.length)} of{" "}
            {filteredUniversities.length} entries
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <div className="flex ml-4">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-l bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                &laquo;
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border-t border-b bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                &lt;
              </button>
              <span className="px-3 py-1 border-t border-b bg-blue-500 text-white">
                {currentPage}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border-t border-b bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                &gt;
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-r bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
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
  );
};

export default UniversityList;
