import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createRoadmap, updateType } from "./roadmap-api";
import Swal from "sweetalert2";

const AddTypeFrom = ({ onSuccess, onClose, editingType }) => {
  const [typeValue, setTypeValue] = useState("");

  useEffect(() => {
  if (editingType) {
    setTypeValue(editingType.type || "");
  } else {
    setTypeValue(""); 
  }
}, [editingType]);
  const mutation = useMutation({
    mutationFn: editingType 
      ? (data) => updateType({ id: editingType._id, ...data })
      : createRoadmap,
    onSuccess: (data) => {
      Swal.fire("Success", data.usrMsg || "Operation successful", "success");
      setTypeValue("");
      onSuccess?.();
    },
    onError: (error) => {
      Swal.fire("Warning", error.response?.data.usrMsg || "Please Try Again", "warning");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!typeValue.trim()) {
      Swal.fire("Warning", "Please enter a roadmap type", "warning");
      return;
    }
    mutation.mutate({ type: typeValue });
  };

  return (
    <div className="p-6 w-96">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingType ? "Edit Type" : "Add New Type"}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✖
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Roadmap Type</label>
          <input
            type="text"
            value={typeValue}
            onChange={(e) => setTypeValue(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="e.g. 10th, 12th, diploma"
            autoFocus
          />
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
            mutation.isPending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {mutation.isPending ? (editingType ? "Updating..." : "Creating...") : (editingType ? "🔄 Update Type" : "➕ Create Type")}
        </button>
      </form>
    </div>
  );
};

export default AddTypeFrom;