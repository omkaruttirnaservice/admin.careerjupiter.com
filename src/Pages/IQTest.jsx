import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { useNavigate } from "react-router-dom";
import { Categories } from "emoji-picker-react";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";

const IQTest = () => {
  const [showModal, setShowModal] = useState(false);
  const [mainCategory, setMainCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");

  const navigate = useNavigate();

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  // const fetchCategories = async () => {
  //   try {
  //     const res = await axios.get(`${API_BASE_URL}/api/iq_category/all`);
  //     const data = Array.isArray(res.data.categories) ? res.data.data : []; // ✅ Ensure array
  //     setCategories(data);
  //     // console.log(res.data.data?._id);
  //   } catch (err) {
  //     console.error("Error fetching categories:", err);
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Oops...",
  //       text: "Failed to load categories",
  //     });
  //     setCategories([]); // fallback to empty array
  
  //   }
  // };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/iq_category/all`);
      
      const data = res.data?.data?.categories;
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories([]); // fallback to empty array
        console.warn("Categories not in expected format");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Failed to load categories",
      });
    }
  };
  

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!mainCategory.trim() || !description.trim()) return;

    const isValidCategory = /^[A-Za-z0-9\- ]*$/.test(mainCategory);
    if (!isValidCategory) {
      setCategoryError("Category name should only contain letters, numbers, spaces, and hyphens.");
      return;
    } else {
      setCategoryError("");
    }

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

 
const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${API_BASE_URL}/api/iq_category/${id}`);
      const updated = categories.filter((cat) => cat._id !== id);
      setCategories(updated);

      Swal.fire("Deleted!", "Category has been deleted.", "success");
    } catch (err) {
      console.error("Delete failed", err);
      Swal.fire("Warning!", "Failed to delete category.", "warning");
    }
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
      {Array.isArray(categories) && categories.map((cat, index) => (
          <div
            key={index}
            className="relative bg-white p-6 rounded-xl shadow hover:shadow-xl cursor-pointer border-l-4 border-blue-500 transition-all"
            onClick={() => navigate(`/tests/${cat.main_category}/${cat._id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-800 truncate">
              {cat.main_category}
            </h2>
            <p className="text-sm text-gray-600 mt-2 truncate max-w-xs">
              {cat.description}
            </p>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                handleDelete(cat._id);
              }}
              className="absolute top-2 right-2 flex items-center gap-1 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200"
            >
              <Trash2 size={14} />
            </button>
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
                {categoryError && <p className="text-red-500 text-sm mt-2">{categoryError}</p>} {/* Show error */}
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
