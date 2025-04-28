import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { Pencil, Trash2, Save, X, Plus } from "lucide-react";
import Swal from "sweetalert2";

const ManageCollegeCategory = ({ onCategoriesChange }) => {
  const [type, setType] = useState("college");
  const [categoryInput, setCategoryInput] = useState("");
  const [subCategoryInputs, setSubCategoryInputs] = useState([""]);
  const [categories, setCategories] = useState({ college: [] });
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editSubCategories, setEditSubCategories] = useState([]);

  const handleAddCategory = async () => {
    if (!categoryInput.trim()) return;

    const subcategories = subCategoryInputs
      .map((sub) => sub.trim())
      .filter((sub) => sub);

    const payload = {
        category: categoryInput.trim(),
      subCategory: [],
      type,
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/api/category/add`, payload);
      const savedCategory = res.data.data;

      const updated = {
        ...categories,
        [type]: [...categories[type], savedCategory],
      };

      setCategories(updated);
      onCategoriesChange && onCategoriesChange(updated);
      setCategoryInput("");
      setSubCategoryInputs([""]);
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: error.response?.data.errMsg || "Failed to add category. Try again.",
        confirmButtonColor: "#3085d6"
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/category/${id}`);

      const updated = {
        ...categories,
        [type]: categories[type].filter((cat) => cat._id !== id),
      };
      setCategories(updated);
      onCategoriesChange && onCategoriesChange(updated);
    } catch (error) {
      console.error("Failed to delete category:", error);
      Swal.fire({
        icon: "warning",
        title: "Delete Failed",
        text: error.response?.data.errMsg || "Could not delete category.",
        confirmButtonColor: "#d33"
      });
    }
  };

  const handleEditCategory = (cat) => {
    setEditCategoryId(cat._id);
    setEditCategoryName(cat.category);
    setEditSubCategories(cat.subCategory || []);
  };

  const handleUpdateCategory = async (id) => {
    if (!editCategoryName.trim()) return;

    try {
      const payload = {
        category: editCategoryName.trim(),
        subCategory: editSubCategories,
      };

      const res = await axios.put(`${API_BASE_URL}/api/category/${id}`, payload);
      const updatedCat = res.data.data;

      const updated = {
        ...categories,
        [type]: categories[type].map((cat) =>
          cat._id === id ? { ...cat, category: updatedCat.category, subCategory: updatedCat.subCategory } : cat
        ),
      };

      setCategories(updated);
      onCategoriesChange && onCategoriesChange(updated);
      setEditCategoryId(null);
      setEditCategoryName("");
      setEditSubCategories([]);
    } catch (error) {
      console.error("Error updating Category:", error);
      Swal.fire({
        icon: "warning",
        title: "Update Failed",
        text: error.response?.data.errMsg || "Could not update category. Try again.",
        confirmButtonColor: "#d33"
      });
    }
  };

  const handleSubCategoryChange = (index, value) => {
    const updated = [...subCategoryInputs];
    updated[index] = value;
    setSubCategoryInputs(updated);
  };

  const handleAddSubCategoryField = () => {
    setSubCategoryInputs([...subCategoryInputs, ""]);
  };

  const handleRemoveSubCategoryField = (index) => {
    const updated = subCategoryInputs.filter((_, i) => i !== index);
    setSubCategoryInputs(updated);
  };

  const handleEditSubCategoryChange = (index, value) => {
    const updated = [...editSubCategories];
    updated[index] = value;
    setEditSubCategories(updated);
  };

  const handleAddEditSubCategoryField = () => {
    setEditSubCategories([...editSubCategories, ""]);
  };

  const handleRemoveEditSubCategoryField = (index) => {
    const updated = editSubCategories.filter((_, i) => i !== index);
    setEditSubCategories(updated);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl m-10 shadow-xl max-w-4xl mx-auto">
     <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        📁 Manage Category <span className="capitalize">{type}</span>
      </h2>
      {/* Type Selection */}
      {/* <div className="mb-4">
        <label className="font-semibold mr-2">Type:</label>
        <select
          className="border px-3 py-1 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="class">Class</option>
          <option value="university">University</option>
          <option value="college">College</option>
        </select>
      </div> */}

      {/* Category Input */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Category Name:</label>
        <input
          type="text"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          placeholder="Enter category name"
          className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* SubCategory Inputs for college/university */}
      {(type === "college") && (
        <div className="mb-6">
          <label className="block font-semibold mb-2">Subcategories:</label>
          {subCategoryInputs.map((sub, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={sub}
                onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                placeholder={`Subcategory ${index + 1}`}
                className="border px-3 py-2 rounded-lg w-full"
              />
              {subCategoryInputs.length > 1 && (
                <button
                  className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg"
                  onClick={() => handleRemoveSubCategoryField(index)}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2"
            onClick={handleAddSubCategoryField}
          >
            <Plus size={18} /> Add Subcategory
          </button>
        </div>
      )}

      {/* Add Category Button */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md mb-8"
        onClick={handleAddCategory}
      >
        Add Category
      </button>

      {/* List Categories */}
      <div>
        <h4 className="font-semibold mb-4 text-gray-800">
          Categories for <span className="capitalize text-blue-700">{type}</span>
        </h4>

        <ul className="space-y-4">
          {categories[type].map((cat) => (
            <li
              key={cat._id}
              className="flex flex-col bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              {editCategoryId === cat._id ? (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />

                  {/* Subcategories when editing */}
                  {((type === "college")) && (
                    <div className="flex flex-col gap-2">
                      {editSubCategories.map((sub, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={sub}
                            onChange={(e) => handleEditSubCategoryChange(index, e.target.value)}
                            placeholder={`Subcategory ${index + 1}`}
                            className="border px-3 py-2 rounded-lg w-full"
                          />
                          {editSubCategories.length > 1 && (
                            <button
                              className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg"
                              onClick={() => handleRemoveEditSubCategoryField(index)}
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg mt-2 flex items-center gap-2"
                        onClick={handleAddEditSubCategoryField}
                      >
                        <Plus size={18} /> Add Subcategory
                      </button>
                    </div>
                  )}

                  {/* Save and Cancel Buttons */}
                  <div className="flex gap-2 mt-4">
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
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{cat.category}</p>
                    {cat.subCategory?.length > 0 && (
                      <ul className="ml-4 list-disc text-gray-600">
                        {cat.subCategory.map((sub, index) => (
                          <li key={index}>{sub}</li>
                        ))}
                      </ul>
                    )}
                  </div>

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
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCollegeCategory;
