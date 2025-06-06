import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Save, X } from "lucide-react";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../constant/constantBaseUrl";

const ManageClassCategory = ({ onCategoriesChange }) => {
  const type = "class";
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState({ [type]: [] });
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/category/all`);
        if (res.data) {
          const tempCategories = res.data.data.map((cat) => ({
            _id: cat._id,
            category: cat.category,
          }));

          setCategories((prev) => ({
            ...prev,
            [type]: tempCategories,
          }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        Swal.fire({
          icon: "warning",
          title: "Fetch Failed",
          text: "Failed to fetch categories.",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle to add categories
  const handleAddCategory = async () => {
    try {
      if (!categoryInput) {
        Swal.fire({
          icon: "warning",
          title: "Empty Field",
          text: "Please enter category name",
          confirmButtonColor: "#d33",
        });
        return;
      }

      // API call to add the category
      const res = await axios.post(`${API_BASE_URL}/api/category/add`, {
        category: categoryInput,
        type: type,
      });

      // Create a new category object
      const newCategory = {
        _id: res.data.data._id,
        category: categoryInput,
      };

      // Update state directly
      setCategories((prevCategories) => ({
        ...prevCategories,
        [type]: [...prevCategories[type], newCategory],
      }));

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category added successfully!",
        confirmButtonColor: "#3085d6",
      });

      setCategoryInput(""); // Clear the input field
    } catch (error) {
      console.error("Error adding category", error);
      Swal.fire({
        icon: "warning",
        title: "Failed to Add",
        text: error.response?.data.errMsg || "Failed to add category",
        confirmButtonColor: "#d33",
      });
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_BASE_URL}/api/category/${id}`);

          const updated = {
            ...categories,
            [type]: categories[type].filter((cat) => cat._id !== id),
          };
          setCategories(updated);
          onCategoriesChange && onCategoriesChange(updated);

          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Category deleted successfully.",
            confirmButtonColor: "#3085d6",
          });
        } catch (error) {
          console.error("Failed to delete category", error);
          Swal.fire({
            icon: "warning",
            title: "Unable to Delete",
            text:
              error.response?.data.errMsg ||
              "Failed to delete category. Please try again.",
            confirmButtonColor: "#d33",
          });
        }
      } else {
        // If user cancels, just show a cancel message
        Swal.fire({
          icon: "info",
          title: "Cancelled",
          text: "The category was not deleted.",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };

  // Call when category Edit
  const handleEditCategory = (cat) => {
    setEditCategoryId(cat._id);
    setEditCategoryName(cat.category);
  };

  // Update Category
  const handleUpdateCategory = async (id) => {
    if (!editCategoryName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Field",
        text: "Please enter a new category name.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      const payload = { category: editCategoryName.trim() };
      const res = await axios.put(
        `${API_BASE_URL}/api/category/${id}`,
        payload
      );
      const updatedCat = res.data.data;
      const updated = {
        ...categories,
        [type]: categories[type].map((cat) =>
          cat._id === id ? { ...cat, category: updatedCat.category } : cat
        ),
      };
      setCategories(updated);
      onCategoriesChange && onCategoriesChange(updated);
      setEditCategoryId(null);
      setEditCategoryName("");

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Category updated successfully.",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Error updating Category:", error);
      Swal.fire({
        icon: "warning",
        title: "Updation Failed",
        text:
          error.response?.data.errMsg ||
          "Could not update the category. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl m-10 shadow-xl max-w-6xl mx-auto">
      {/* Heading  */}
      <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        📁 Manage Category <span className="capitalize">{type}</span>
      </h2>

      <div className="mb-6">
        <label className="block font-semibold mb-2 text-gray-700">
          Add Category
        </label>
        {/* Search Section  */}
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Enter the category"
            className="border border-blue-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          {/* Add New Category Button  */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
      </div>

      {/* Category table section */}
      <div>
        <h4 className="font-semibold mb-4 text-gray-800">
          Categories for{" "}
          <span className="capitalize text-blue-700">{type}</span>
        </h4>

        {/* List */}
        <ul className="space-y-4  max-h-95 overflow-y-auto pr-2">
          {loading ? (
            <p className="text-center text-blue-600">Loading categories...</p>
          ) : categories[type]?.length > 0 ? (
            categories[type].map((cat) => (
              <li
                key={cat._id}
                className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                {editCategoryId === cat._id ? (
                  <div className="flex w-full items-center justify-between gap-4">
                    {/* Edit category Input Field */}
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {/* Update Button */}
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow cursor-pointer"
                        onClick={() => handleUpdateCategory(cat._id)}
                      >
                        <Save size={18} />
                      </button>
                      {/* Close Button */}
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-lg shadow cursor-pointer"
                        onClick={() => setEditCategoryId(null)}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Outside Edit Input */}
                    <span className="font-medium text-gray-800">
                      {cat.category}
                    </span>
                    {/* Edit Button */}
                    <div className="flex gap-2">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg shadow cursor-pointer"
                        onClick={() => handleEditCategory(cat)}
                      >
                        <Pencil size={18} />
                      </button>
                      {/* Delete Button */}
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow cursor-pointer"
                        onClick={() => handleDeleteCategory(cat._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            // Handled if no categories found
            <p className="text-center text-gray-500">No categories found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageClassCategory;
