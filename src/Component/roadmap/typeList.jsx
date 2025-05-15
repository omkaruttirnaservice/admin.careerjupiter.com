import React, { useState } from "react";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import { getAllType } from "./roadmap-api";
import AddTypeFrom from "./roadmapFrom";
Modal.setAppElement('#root'); // Set this to your app root element ID

const TypeList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data: types = [], isLoading, isError, error, refetch } = useQuery({
//     queryKey: ['types'],
//     queryFn: getAllType,
//     select: (data) => data.types,
//   });
const { data: types = [], isLoading, isError, error, refetch } = useQuery({
  queryKey: ['types'],
  queryFn: getAllType,
  select: (data) => 
    data.types
      .slice() // create a copy to avoid mutating original array
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (isError) return (
    <div className="p-4 bg-red-50 text-red-700 rounded-lg">
      Error: {error.message}
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📋 Roadmap Types</h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Type
        </button>
      </div>

      {types.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-700">No types found</h3>
          <p className="mt-1 text-gray-500">Add your first roadmap type to get started</p>
          <button
            onClick={openModal}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Add Type
          </button>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {types.map((type, index) => (
                <tr key={type._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {type.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Roadmap Type"
        className="bg-white rounded-xl shadow-xl max-w-md mx-auto my-8 overflow-hidden"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        closeTimeoutMS={300}
      >
        <AddTypeFrom
          onSuccess={refetch} 
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default TypeList;