import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createRoadmap } from "./roadmap-api";

const RoadmapForm = () => {
  const [typeValue, setTypeValue] = useState("");
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: createRoadmap,
    onSuccess: (data) => {
      setMessage(`✅ ${data.message}`);
      setTypeValue("");
      console.log("Roadmap created:", data);
    },
    onError: (error) => {
      setMessage(`❌ ${error.response?.data?.message || error.message}`);
      console.error("Creation error:", error);
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
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          📘 Create Roadmap
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="typeInput" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Type Value
            </label>
            <input
              type="text"
              id="typeInput"
              value={typeValue}
              onChange={(e) => setTypeValue(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 10th, 12th, diploma"
              required
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex justify-center items-center disabled:bg-blue-400"
          >
            {mutation.isPending ? (
              "Creating..."
            ) : (
              <>
                <span className="mr-2">⚡</span> Create Roadmap
              </>
            )}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-2 text-center rounded-md ${
            message.startsWith("✅") ? "bg-green-50 text-green-700" : 
            message.startsWith("❌") ? "bg-red-50 text-red-700" :
            "bg-yellow-50 text-yellow-700"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapForm;