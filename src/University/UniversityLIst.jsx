

// import { useState } from "react"
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import { toast } from "react-toastify"
// import { FaEye, FaPencilAlt, FaTrashAlt, FaGlobe, FaPlus } from "react-icons/fa"
// import { fetchAllUniversities, deleteUniversity } from "./Universityapi"
// import UpdateUniversityModal from "./UpdateUniversityModal"
// import ViewUniversityModal from "./ViewUniversityModal"
// import DeleteConfirmationModal from "./DeleteUniversitymodal"

// const UniversityList = () => {
//   const queryClient = useQueryClient()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [rowsPerPage, setRowsPerPage] = useState(10)
  
//   // Modal states
//   const [viewModalOpen, setViewModalOpen] = useState(false)
//   const [updateModalOpen, setUpdateModalOpen] = useState(false)
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false)
//   const [selectedUniversity, setSelectedUniversity] = useState(null)

//   // Fetch universities
//   const { data: universitiesData, isLoading, isError, error } = useQuery({
//     queryKey: ["universities"],
//     queryFn: fetchAllUniversities,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   })

//   // Delete university mutation
//   const deleteMutation = useMutation({
//     mutationFn: deleteUniversity,
//     onSuccess: () => {
//       toast.success("University deleted successfully")
//       queryClient.invalidateQueries({ queryKey: ["universities"] })
//       setDeleteModalOpen(false)
//     },
//     onError: (error) => {
//       toast.error(`Error deleting university: ${error.message}`)
//     },
//   })

//   // Handle view university
//   const handleViewUniversity = (university) => {
//     setSelectedUniversity(university)
//     setViewModalOpen(true)
//   }

//   // Handle update university
//   const handleUpdateUniversity = (university) => {
//     setSelectedUniversity(university)
//     setUpdateModalOpen(true)
//   }

//   // Handle delete university
//   const handleDeleteClick = (university) => {
//     setSelectedUniversity(university)
//     setDeleteModalOpen(true)
//   }

//   const confirmDelete = () => {
//     if (selectedUniversity?._id) {
//       deleteMutation.mutate(selectedUniversity._id)
//     }
//   }

//   const filteredUniversities = universitiesData?.filter(
//     (university) =>
//       university.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       university.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       university.establishedYear?.toString().includes(searchTerm)
//   ) || [];
  
//   // Pagination
//   const indexOfLastUniversity = currentPage * rowsPerPage
//   const indexOfFirstUniversity = indexOfLastUniversity - rowsPerPage
//   const currentUniversities = filteredUniversities.slice(indexOfFirstUniversity, indexOfLastUniversity)
//   const totalPages = Math.ceil(filteredUniversities.length / rowsPerPage)

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber)
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     )
//   }

//   if (isError) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">Error!</strong>
//         <span className="block sm:inline"> {error.message || "Failed to load universities"}</span>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-white shadow-xl rounded-xl p-6 border border-blue-300">
//       <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-lg shadow-lg mb-6">
//         <h2 className="text-3xl font-bold flex items-center gap-4">
//           <FaGlobe className="text-black bg-white p-2 rounded-md shadow-md" size={40} />
//           University List
//         </h2>
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search universities..."
//               className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button 
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//             onClick={() => window.location.href = "/add-university"}
//           >
//             <FaPlus /> Add New
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">University Name</th>
//               <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Category</th>
//               <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Sub Category</th>
//               <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Website</th>
//               <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Established Year</th>
//               <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Email</th>
//               <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Entrance Exams</th>
//               <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Accreditation</th>
//               <th className="py-3 px-4 text-center font-semibold text-gray-700 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUniversities.length > 0 ? (
//               currentUniversities.map((university) => (
//                 <tr key={university._id} className="hover:bg-gray-50 border-b">
//                   <td className="py-3 px-4">{university.universityName}</td>
//                   <td className="py-3 px-4">
//                     <span className={`px-3 py-1 rounded-full text-sm ${
//                       university.category === 'Government' ? 'bg-green-100 text-green-800' : 
//                       university.category === 'Private' ? 'bg-purple-100 text-purple-800' : 
//                       university.category === 'Autonomous' ? 'bg-yellow-100 text-yellow-800' : 
//                       'bg-blue-100 text-blue-800'
//                     }`}>
//                       {university.category}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 d">
//                     {university.subCategory && university.subCategory.length > 0 ? (
//                       <div className="flex flex-wrap gap-1">
//                         {university.subCategory.slice(0, 2).map((item, index) => (
//                           <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
//                             {item}
//                           </span>
//                         ))}
//                         {university.subCategory.length > 2 && (
//                           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs ">
//                             +{university.subCategory.length - 2}
//                           </span>
//                         )}
//                       </div>
//                     ) : (
//                       <span className="text-gray-400">None</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4">
//                     {university.websiteURL ? (
//                       <a 
//                         href={university.websiteURL.startsWith('http') ? university.websiteURL : `https://${university.websiteURL}`} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="bg-blue-500 text-white px-3 py-1 rounded-md inline-block hover:bg-blue-600 transition-colors"
//                       >
//                         Visit 
//                       </a>
//                     ) : (
//                       <span className="text-gray-400">Not Available</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4">{university.establishedYear || 'N/A'}</td>
//                   <td className="py-3 px-4">
//                     {university.email_id ? (
//                       <a 
//                         href={`mailto:${university.email_id}`}
//                         className="text-blue-500 hover:underline"
//                       >
//                         {university.email_id}
//                       </a>
//                     ) : (
//                       <span className="text-gray-400">Not Available</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4">
//                     {university.entrance_exam_required && university.entrance_exam_required.length > 0 ? (
//                       <div className="flex flex-wrap gap-1">
//                         {university.entrance_exam_required.slice(0, 2).map((exam, index) => (
//                           <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
//                             {exam}
//                           </span>
//                         ))}
//                         {university.entrance_exam_required.length > 2 && (
//                           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
//                             +{university.entrance_exam_required.length - 2}
//                           </span>
//                         )}
//                       </div>
//                     ) : (
//                       <span className="text-gray-400">None</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4">
//                     {university.accreditation && university.accreditation.length > 0 ? (
//                       <div className="flex flex-wrap gap-1">
//                         {university.accreditation.slice(0, 2).map((item, index) => (
//                           <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
//                             {item}
//                           </span>
//                         ))}
//                         {university.accreditation.length > 2 && (
//                           <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
//                             +{university.accreditation.length - 2}
//                           </span>
//                         )}
//                       </div>
//                     ) : (
//                       <span className="text-gray-400">None</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex justify-center space-x-2">
//                       <button
//                         onClick={() => handleViewUniversity(university)}
//                         className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
//                         title="View"
//                       >
//                         <FaEye />
//                       </button>
//                       <button
//                         onClick={() => handleUpdateUniversity(university)}
//                         className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
//                         title="Edit"
//                       >
//                         <FaPencilAlt />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(university)}
//                         className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
//                         title="Delete"
//                       >
//                         <FaTrashAlt />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="py-4 px-4 text-center text-gray-500">
//                   No universities found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {filteredUniversities.length > 0 && (
//         <div className="flex justify-between items-center mt-4">
//           <div className="text-sm text-gray-600">
//             Showing {indexOfFirstUniversity + 1} to {Math.min(indexOfLastUniversity, filteredUniversities.length)} of {filteredUniversities.length} entries
//           </div>
//           <div className="flex items-center">
//             <span className="mr-2 text-sm text-gray-600">Rows per page:</span>
//             <select
//               value={rowsPerPage}
//               onChange={(e) => {
//                 setRowsPerPage(Number(e.target.value))
//                 setCurrentPage(1)
//               }}
//               className="border rounded px-2 py-1 text-sm"
//             >
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//             <div className="flex ml-4">
//               <button
//                 onClick={() => handlePageChange(1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border rounded-l bg-gray-100 text-gray-600 disabled:opacity-50"
//               >
//                 &laquo;
//               </button>
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border-t border-b bg-gray-100 text-gray-600 disabled:opacity-50"
//               >
//                 &lt;
//               </button>
//               <span className="px-3 py-1 border-t border-b bg-blue-500 text-white">
//                 {currentPage}
//               </span>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 border-t border-b bg-gray-100 text-gray-600 disabled:opacity-50"
//               >
//                 &gt;
//               </button>
//               <button
//                 onClick={() => handlePageChange(totalPages)}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 border rounded-r bg-gray-100 text-gray-600 disabled:opacity-50"
//               >
//                 &raquo;
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Modal */}
//       {viewModalOpen && (
//         <ViewUniversityModal
//           university={selectedUniversity}
//           isOpen={viewModalOpen}
//           onClose={() => setViewModalOpen(false)}
//         />
//       )}

//       {/* Update Modal */}
//       {updateModalOpen && (
//         <UpdateUniversityModal
//           universityId={selectedUniversity?._id}
//           isOpen={updateModalOpen}
//           onClose={() => setUpdateModalOpen(false)}
//         />
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteModalOpen && (
//         <DeleteConfirmationModal
//           isOpen={deleteModalOpen}
//           onClose={() => setDeleteModalOpen(false)}
//           onConfirm={confirmDelete}
//           title="Delete University"
//           message={`Are you sure you want to delete ${selectedUniversity?.universityName}? This action cannot be undone.`}
//           isDeleting={deleteMutation.isPending}
//         />
//       )}
//     </div>
//   )
// }

// export default UniversityList

"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { FaEye, FaPencilAlt, FaTrashAlt, FaGlobe, FaPlus } from "react-icons/fa"
import { fetchAllUniversities, deleteUniversity } from "./Universityapi"
import ViewUniversityModal from "./ViewUniversityModal"
import DeleteConfirmationModal from "./DeleteUniversitymodal"

const UniversityList = () => {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState(null)

  // Fetch universities
  const {
    data: universitiesData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: fetchAllUniversities,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Delete university mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUniversity,
    onSuccess: () => {
      toast.success("University deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["universities"] })
      setDeleteModalOpen(false)
    },
    onError: (error) => {
      toast.error(`Error deleting university: ${error.message || "Failed to delete university"}`)
    },
  })

  // Handle view university
  const handleViewUniversity = (university) => {
    setSelectedUniversity(university)
    setViewModalOpen(true)
  }

  // Handle delete university
  const handleDeleteClick = (university) => {
    setSelectedUniversity(university)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (selectedUniversity?._id) {
      deleteMutation.mutate(selectedUniversity._id)
    }
  }

  const filteredUniversities =
    universitiesData?.filter(
      (university) =>
        university.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        university.establishedYear?.toString().includes(searchTerm),
    ) || []

  // Pagination
  const indexOfLastUniversity = currentPage * rowsPerPage
  const indexOfFirstUniversity = indexOfLastUniversity - rowsPerPage
  const currentUniversities = filteredUniversities.slice(indexOfFirstUniversity, indexOfLastUniversity)
  const totalPages = Math.ceil(filteredUniversities.length / rowsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error.message || "Failed to load universities"}</span>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 border border-blue-300">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-lg shadow-lg mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-4">
          <FaGlobe className="text-black bg-white p-2 rounded-md shadow-md" size={40} />
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
            to="/add-university"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaPlus /> Add New
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">University Name</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Category</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Sub Category</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Website</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Established Year</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Email</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Entrance Exams</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Accreditation</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUniversities.length > 0 ? (
              currentUniversities.map((university) => (
                <tr key={university._id} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-4">{university.universityName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
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
                  <td className="py-3 px-4 d">
                    {university.subCategory && university.subCategory.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {university.subCategory.slice(0, 2).map((item, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            {item}
                          </span>
                        ))}
                        {university.subCategory.length > 2 && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs ">
                            +{university.subCategory.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {university.websiteURL ? (
                      <a
                        href={
                          university.websiteURL.startsWith("http")
                            ? university.websiteURL
                            : `https://${university.websiteURL}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-3 py-1 rounded-md inline-block hover:bg-blue-600 transition-colors"
                      >
                        Visit
                      </a>
                    ) : (
                      <span className="text-gray-400">Not Available</span>
                    )}
                  </td>
                  <td className="py-3 px-4">{university.establishedYear || "N/A"}</td>
                  <td className="py-3 px-4">
                    {university.email_id ? (
                      <a href={`mailto:${university.email_id}`} className="text-blue-500 hover:underline">
                        {university.email_id}
                      </a>
                    ) : (
                      <span className="text-gray-400">Not Available</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {university.entrance_exam_required && university.entrance_exam_required.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {university.entrance_exam_required.slice(0, 2).map((exam, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            {exam}
                          </span>
                        ))}
                        {university.entrance_exam_required.length > 2 && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            +{university.entrance_exam_required.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {university.accreditation && university.accreditation.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {university.accreditation.slice(0, 2).map((item, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            {item}
                          </span>
                        ))}
                        {university.accreditation.length > 2 && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            +{university.accreditation.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleViewUniversity(university)}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <Link
                        to={`/edituniversity/${university._id}`}
                        className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
                        title="Edit"
                      >
                        <FaPencilAlt />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(university)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 px-4 text-center text-gray-500">
                  No universities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUniversities.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstUniversity + 1} to {Math.min(indexOfLastUniversity, filteredUniversities.length)} of{" "}
            {filteredUniversities.length} entries
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value))
                setCurrentPage(1)
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
              <span className="px-3 py-1 border-t border-b bg-blue-500 text-white">{currentPage}</span>
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
  )
}

export default UniversityList
