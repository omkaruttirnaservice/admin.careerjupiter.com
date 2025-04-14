import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { Pencil, Trash2, Save, X } from "lucide-react";

const ManageCategory = ({ onCategoriesChange }) => {
  const [type] = useState("class");
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState({ class: [] });
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (!categoryInput.trim()) return;

    const payload = {
      category: categoryInput.trim(),
      subCategory: [],
      type,
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/api/category/add`, payload);
      const saveCategory = res.data.data;
     
      const update = {
        ...categories,
        [type]: [...categories[type], saveCategory],
      };

      setCategories(update);
      onCategoriesChange && onCategoriesChange(update);

      setCategoryInput("");
    } catch (error) {
      console.error(
        "Error adding Category:",
        error.response?.data.errMsg || error.response?.data.usrMsg
      );
      alert(error.response?.data.errMsg || "Failed adding categories");
    }
  };

const handleDeleteCategory = async (id) => {
  try{
    await axios.delete(`${API_BASE_URL}/api/category/${id}`);
    
    const updated = {
      ...categories,
      [type]: categories[type].filter((cat) => cat._id !== id),
    };
    setCategories(updated);
    onCategoriesChange && onCategoriesChange(updated);
  }catch (error) {
    console.error("Failed to dalete category",error);
    alert(error.response?.data.errMsg || "Failed to Delete Category");
  }
};

  const handleEditCategory = (cat) => {
    setEditCategoryId(cat._id);
    setEditCategoryName(cat.category);
  };

  const handleUpdateCategory = async (id) => {
    if(!editCategoryName.trim()) return;

    try{
      const payload = {
        category : editCategoryName.trim()
      };

      const res = await axios.put(`${API_BASE_URL}/api/category/${id}`, payload);
      const updateCat = res.data.data;

      const updated = {
        ...categories,
        [type]: categories[type].map((cat) => 
        cat._id === id ? {
          ...cat, category: updateCat.category
        } : cat ),
      };

      setCategories(updated);
      onCategoriesChange && onCategoriesChange(updated);
      setEditCategoryId(null);
      setEditCategoryName("");
    }catch(error) {
      console.error("Error updating Category" || error);
      alert(error.response?.data.errMsg || "Failed to Update Category");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl m-10 shadow-xl max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        📁 Manage Category
      </h2>
  
      <div className="mb-6">
        <label className="font-semibold mr-2 text-gray-700">Type:</label>
        <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-800 font-medium shadow-sm capitalize">
          {type}
        </span>
      </div>
  
 <div className="mb-6">
        <label className="block font-semibold mb-2 text-gray-700">Add Category</label>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Enter the category"
            className="border border-blue-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />



 <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
      </div>
  


      <div>
        <h4 className="font-semibold mb-4 text-gray-800">
          Categories for <span className="capitalize text-blue-700">{type}</span>
        </h4>
  
        <ul className="space-y-4">
          {categories[type].map((cat) => (
            <li
              key={cat._id}
              className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              {editCategoryId === cat._id ? (
                <div className="flex w-full items-center justify-between gap-4">
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow"
                      onClick={() => handleUpdateCategory(cat._id)}
                    >
                      <Save size={18} />
                    </button>
                    <button
                      className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded-lg shadow"
                      onClick={() => setEditCategoryId(null)}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="font-medium text-gray-800">{cat.category}</span>
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg shadow"
                      onClick={() => handleEditCategory(cat)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow"
                      onClick={() => handleDeleteCategory(cat._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default ManageCategory;
