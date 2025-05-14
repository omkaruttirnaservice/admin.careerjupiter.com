// import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { createRoadmap } from "./roadmap-api";

// const RoadmapForm = () => {
//   const [typeValue, setTypeValue] = useState("");
//   const [message, setMessage] = useState("");

//   const mutation = useMutation({
//     mutationFn: createRoadmap,
//     onSuccess: (data) => {
//       setMessage(`✅ ${data.message}`);
//       setTypeValue("");
//       console.log("Roadmap created:", data);
//     },
//     onError: (error) => {
//       setMessage(`❌ ${error.response?.data?.message || error.message}`);
//       console.error("Creation error:", error);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!typeValue.trim()) {
//       setMessage("⚠️ Please enter a type value");
//       return;
//     }

//     mutation.mutate({ type: typeValue }); 
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           📘 Manage type
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="typeInput" className="block text-sm font-medium text-gray-700 mb-1">
//               Enter Type Value
//             </label>
//             <input
//               type="text"
//               id="typeInput"
//               value={typeValue}
//               onChange={(e) => setTypeValue(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="e.g. 10th, 12th, diploma"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={mutation.isPending}
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex justify-center items-center disabled:bg-blue-400"
//           >
//             {mutation.isPending ? (
//               "Creating..."
//             ) : (
//               <>
//                 <span className="mr-2">⚡</span> Create Roadmap
//               </>
//             )}
//           </button>
//         </form>

//         {message && (
//           <div className={`mt-4 p-2 text-center rounded-md ${
//             message.startsWith("✅") ? "bg-green-50 text-green-700" : 
//             message.startsWith("❌") ? "bg-red-50 text-red-700" :
//             "bg-yellow-50 text-yellow-700"
//           }`}>
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoadmapForm;

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createRoadmap } from "./roadmap-api";

const AddTypeFrom = ({ onSuccess, onClose }) => {
  const [typeValue, setTypeValue] = useState("");
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: createRoadmap,
    onSuccess: (data) => {
      setMessage(`✅ ${data.message}`);
      setTypeValue("");
      onSuccess?.(); // Notify parent to refresh data
      setTimeout(() => {
        onClose?.(); // Close modal after 1.5 seconds
      }, 1500);
    },
    onError: (error) => {
      setMessage(`❌ ${error.response?.data?.message || error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!typeValue.trim()) {
      setMessage("⚠️ Please enter a type value");
      return;
    }
    mutation.mutate({ type: typeValue });
  };

  return (
    <div className="p-6 w-96">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Add New Type</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Roadmap Type
          </label>
          <input
            type="text"
            value={typeValue}
            onChange={(e) => setTypeValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="e.g. 10th, 12th, diploma, graduation"
            autoFocus
          />
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${
            mutation.isPending 
              ? "bg-blue-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {mutation.isPending ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            "➕ Create Type"
          )}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded-lg text-center ${
            message.startsWith("✅")
              ? "bg-green-50 text-green-800"
              : message.startsWith("❌")
              ? "bg-red-50 text-red-800"
              : "bg-yellow-50 text-yellow-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AddTypeFrom;