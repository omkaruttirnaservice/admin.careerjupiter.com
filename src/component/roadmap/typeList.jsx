import React, { useState } from "react";
import Modal from "react-modal";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllType, deleteType, getTypeById } from "./roadmap-api";
import AddTypeFrom from "./roadmapFrom";
import Swal from "sweetalert2";
import { FiEdit, FiTrash2 } from "react-icons/fi";

Modal.setAppElement("#root");

const TypeList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [searchText, setSearchText] = useState("");

  const {
    data: allTypesRes = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["types"],
    queryFn: getAllType,
  });

  const allTypes = allTypesRes.data || [];

  const filteredTypes = allTypes.filter((type) =>
    type.type.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedTypes = filteredTypes
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const deleteMutation = useMutation({
    mutationFn: deleteType,
    onSuccess: (data) => {
      Swal.fire(
        "Deleted!",
        data.usrMsg || "Type deleted successfully",
        "success"
      );
      refetch();
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

const handleEdit = async (id) => {
  try {
    const response = await getTypeById(id);
    
    if (response?.data) {
      setEditingType(response.data); 
      setIsModalOpen(true);
    } else {
      throw new Error("No data received from API");
    }
  } catch (error) {
    Swal.fire(
      "Error",
      error.response?.data.usrMsg || "Failed to fetch type details",
      "error"
    );
  }
};
  const openModal = () => {
    setEditingType(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingType(null);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (isError)
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        Error: {error.message}
      </div>
    );

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">
            📋 Roadmap Types{" "}
            <span className="text-sm text-gray-500">
              (Available Type({sortedTypes.length}))
            </span>
          </h2>
          <input
            type="text"
            placeholder="Search type..."
            className="border-2 border-blue-500 bg-white px-3 py-1 ml-80 rounded-md text-sm w-full sm:w-64 h-10"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all w-full sm:w-auto justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Type
        </button>
      </div>

      {sortedTypes.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="mt-2 text-lg font-medium text-gray-700">
            No types found
          </h3>
          <p className="mt-1 text-gray-500">
            Add your first roadmap type to get started
          </p>
          <button
            onClick={openModal}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Add Type
          </button>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg border border-gray-200">
          <div className="overflow-y-auto max-h-[calc(110vh-200px)]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTypes.map((type, index) => (
                  <tr key={type._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4 text-gray-700">{type.type}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(type._id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(type._id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={deleteMutation.isPending}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={editingType ? "Edit Roadmap Type" : "Add Roadmap Type"}
        className="bg-white rounded-xl shadow-xl max-w-md mx-auto my-8 overflow-hidden"
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-40 flex items-center justify-center p-4"
        closeTimeoutMS={300}
      >
        <AddTypeFrom
          onSuccess={() => {
            Swal.fire(
              "Success",
              editingType ? "Type updated!" : "Type added successfully",
              "success"
            );
            refetch();
            closeModal();
          }}
          onClose={closeModal}
          editingType={editingType}
        />
      </Modal>
    </div>
  );
};

export default TypeList;