import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { useNavigate } from "react-router-dom";
import { Categories } from "emoji-picker-react";
import Swal from "sweetalert2";

const IQTest = () => {
  const [showModal, setShowModal] = useState(false);
  const [mainCategory, setMainCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/iq_category/all`);
      setCategories(res.data.data);
      // console.log(res.data.data?._id);
    } catch (err) {
      console.error("Error fetching categories:", err);
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Failed to load categories",
      });
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!mainCategory.trim || !description.trim()) return;

    const payload = {
      main_category: mainCategory,
      description,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/iq_category/create`, payload);

      setMainCategory("");
      setDescription("");
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Failed to add category", error);
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: error.response?.data.errMsg || "Failed to add Category",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          📚 Select a Category
        </h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 shadow cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add New Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-xl cursor-pointer border-l-4 border-blue-500 transition-all"
            onClick={() => navigate(`/tests/${cat.main_category}/${cat._id}`)}
          >
            {console.log("categories-------", cat.main_category)}
            <h2 className="text-xl font-semibold text-gray-800">
              {cat.main_category}
            </h2>
            <p className="text-sm text-gray-600 mt-2 truncate max-w-xs">
              {cat.description}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
              Add New Category
            </h2>
            <form className="space-y-4" onSubmit={handleAddCategory}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={mainCategory}
                  onChange={(e) => setMainCategory(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Category Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IQTest;
