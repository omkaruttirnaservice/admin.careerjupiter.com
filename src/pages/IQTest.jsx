import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { useNavigate } from "react-router-dom";
import { Categories } from "emoji-picker-react";
import Swal from "sweetalert2";
// import { Trash2 } from "lucide-react";
import { Trash2 } from "lucide-react"; // Optionally switch icon here

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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          📚 All Categories
        </h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 shadow cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add New Category
        </button>
      </div>

      {/* Categories Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {Array.isArray(categories) && categories.map((cat, index) => (
          <div
            key={index}
            className="relative group bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:border-blue-400 transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate(`/tests/${cat.main_category}/${cat._id}`)}
          >

          <div className="absolute -top-6 left-6 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-md border border-blue-200 bg-gradient-to-tr from-blue-100 to-white group-hover:scale-110 transition-transform duration-300">
          {"🎯"}
        </div>
            <h2 className="text-xl font-bold text-gray-800 mt-6 truncate group-hover:text-blue-600 transition-colors duration-300">
              {cat.main_category}
            </h2>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2 group-hover:text-gray-800 transition-colors duration-300 truncate max-w-xs">
              {cat.description}
            </p>
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all duration-300 pointer-events-none"></div>


            {/* Delete Button */}
             <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                handleDelete(cat._id);
              }}
              className="absolute top-3 right-3 bg-white/70 backdrop-blur-md text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10 cursor-pointer"
            >
               <Trash2 size={16} className="transition-transform duration-200 group-hover:rotate-360" />
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
                  onClick={() => {setShowModal(false);
                    setMainCategory("");    // clear category input
                    setDescription("");     // clear description input
                    setCategoryError("");
                  }}
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
