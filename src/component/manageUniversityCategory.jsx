import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { Pencil, Trash2, Save, X, Plus } from "lucide-react";
import Swal from "sweetalert2";

const ManageUniversityCategory = () => {
  const [type, setType] = useState("university");
  const [categoryInput, setCategoryInput] = useState("");
  const [subCategoryInputs, setSubCategoryInputs] = useState([""]);
  const [categories, setCategories] = useState({ university: [] });
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editSubCategories, setEditSubCategories] = useState([]);
  const [entranceExams, setEntranceExams] = useState([""]);
  const [editEntranceExams, setEditEntranceExams] = useState([""]);

  // Fetched all categories using get method
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/university/categories/all`
      );
      if (Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      } else {
        console.error("Invalid response data: categories is not an array.");
      }
    } catch (err) {
      console.error("Failed to fetch university categories", err);
    }
  };

  // Called Once when mounted
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handled Adding Categories
  const handleAddCategory = async () => {
    if (!categoryInput.trim()) return;

    const subcategories = subCategoryInputs
      .map((sub) => sub.trim())
      .filter((sub) => sub);
    // Payload send
    const payload = {
      category: categoryInput.trim(),
      subCategory: subcategories,
      entrance_exam_required: entranceExams.filter((e) => e.trim() !== ""),
      type,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/category/add`, payload);
      Swal.fire({
        icon: "success",
        title: "Category Added",
        text: "Categories added successfully!",
        confirmButtonColor: "#3085d6",
      });
      // After successfully Added Empty all fields
      await fetchCategories();
      setCategoryInput("");
      setSubCategoryInputs([""]);
      setEntranceExams([""]);
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text:
          error.response?.data.errMsg || "Failed to add category. Try again.",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  // Handled Deletion of Category
  const handleDeleteCategory = async (id) => {
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
        await axios.delete(`${API_BASE_URL}/api/category/${id}`);
        await fetchCategories(); // Fetch fresh updated list

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Category has been deleted.",
          confirmButtonColor: "#3085d6",
        });
      } catch (error) {
        console.error("Failed to delete category:", error);
        Swal.fire({
          icon: "warning",
          title: "Failed to Delete",
          text: error.response?.data.errMsg || "Failed to Delete Category.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  // Handled when Edit Category is called
  const handleEditCategory = (cat) => {
    setEditCategoryId(cat._id);
    setEditCategoryName(cat.category);
    setEditSubCategories(cat.subCategory || []);
    setEditEntranceExams(cat.entrance_exam_required || [""]);
  };

  // Update Categories
  const handleUpdateCategory = async (id) => {
    if (!editCategoryName.trim()) return;

    try {
      // Payload for update
      const payload = {
        category: editCategoryName.trim(),
        subCategory: editSubCategories,
        entrance_exam_required: editEntranceExams.filter(
          (e) => e.trim() !== ""
        ),
      };

      await axios.put(`${API_BASE_URL}/api/category/${id}`, payload);
      await fetchCategories(); // fetch fresh updated list

      // After successful update, clear the fields
      setEditCategoryId(null);
      setEditCategoryName("");
      setEditSubCategories([]);
      setEditEntranceExams([""]);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Category updated successfully!",
      });
    } catch (error) {
      console.error("Error updating Category:", error);
      Swal.fire({
        icon: "warning",
        title: "Update Failed",
        text:
          error.response?.data.errMsg ||
          "Could not update category. Try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  // Handled Sub Categories
  const handleSubCategoryChange = (index, value) => {
    const updated = [...subCategoryInputs];
    updated[index] = value;
    setSubCategoryInputs(updated);
  };

  // Handled new input fields for sub categories
  const handleAddSubCategoryField = () => {
    setSubCategoryInputs([...subCategoryInputs, ""]);
  };

  // Handled to remove the sub category input fields
  const handleRemoveSubCategoryField = (index) => {
    const updated = subCategoryInputs.filter((_, i) => i !== index);
    setSubCategoryInputs(updated);
  };

  // Handled updation of sub Categories
  const handleEditSubCategoryChange = (index, value) => {
    const updated = [...editSubCategories];
    updated[index] = value;
    setEditSubCategories(updated);
  };

  // Handled update and add new foeld for sub category field in the updation area (List)
  const handleAddEditSubCategoryField = () => {
    setEditSubCategories([...editSubCategories, ""]);
  };

  // Handled remove the sub category field in the updation area (List)
  const handleRemoveEditSubCategoryField = (index) => {
    const updated = editSubCategories.filter((_, i) => i !== index);
    setEditSubCategories(updated);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl m-3 shadow-xl max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        📁 Manage Category <span className="capitalize">{type}</span>
      </h2>

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

      {/* SubCategory Inputs for university */}
      {type === "university" && (
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
                // Close Button for form area for sub category
                <button
                  className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg"
                  onClick={() => handleRemoveSubCategoryField(index)}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
          {/* Add New field for sub category in form section */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2"
            onClick={handleAddSubCategoryField}
          >
            <Plus size={18} /> Add Subcategory
          </button>
        </div>
      )}

      {/* Entrance Exam Required field */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">
          Entrance Exams Required:
        </label>
        {entranceExams.map((exam, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={exam}
              onChange={(e) => {
                const updated = [...entranceExams];
                updated[index] = e.target.value;
                setEntranceExams(updated);
              }}
              placeholder={`Exam ${index + 1}`}
              className="border px-3 py-2 rounded-lg w-full"
            />
            {entranceExams.length > 1 && (
              // Remove button for entrance exam required in form field
              <button
                onClick={() =>
                  setEntranceExams(entranceExams.filter((_, i) => i !== index))
                }
                className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
        {/* Add new input field for entrance exam required in form section */}
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2"
          onClick={() => setEntranceExams([...entranceExams, ""])}
        >
          <Plus size={18} /> Add Exam
        </button>
      </div>

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
          Categories for{" "}
          <span className="capitalize text-blue-700">{type}</span>
        </h4>
        {/* Categories List  */}
        <ul className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {(categories?.length > 0 ? categories : []).map((cat) => (
            <li
              key={cat._id}
              className="flex flex-col bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              {editCategoryId === cat._id ? (
                <div className="flex flex-col gap-4">
                  {/* Input Field for category in edit section */}
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />

                  {/* Subcategories when editing */}
                  {type === "university" && (
                    <div className="flex flex-col gap-2">
                      {editSubCategories.map((sub, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={sub}
                            onChange={(e) =>
                              handleEditSubCategoryChange(index, e.target.value)
                            }
                            placeholder={`Subcategory ${index + 1}`}
                            className="border px-3 py-2 rounded-lg w-full"
                          />
                          {editSubCategories.length > 1 && (
                            // Remove Sub Category field in edit section
                            <button
                              className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg"
                              onClick={() =>
                                handleRemoveEditSubCategoryField(index)
                              }
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                      {/* Add new field for sub category in edit section  */}
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg mt-2 flex items-center gap-2"
                        onClick={handleAddEditSubCategoryField}
                      >
                        <Plus size={18} /> Add Subcategory
                      </button>
                    </div>
                  )}

                  {/* Inside the edit form section Entrance Exam field is handled */}
                  <div className="flex flex-col gap-2 mt-4">
                    <label className="font-semibold mb-1">
                      Entrance Exams Required:
                    </label>
                    {editEntranceExams.map((exam, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        {/* edit input fields with the data in it for entrance exam required */}
                        <input
                          type="text"
                          value={exam}
                          onChange={(e) => {
                            const updated = [...editEntranceExams];
                            updated[index] = e.target.value;
                            setEditEntranceExams(updated);
                          }}
                          placeholder={`Exam ${index + 1}`}
                          className="border px-3 py-2 rounded-lg w-full"
                        />
                        {editEntranceExams.length > 1 && (
                          // Remove Button for edit section
                          <button
                            onClick={() =>
                              setEditEntranceExams(
                                editEntranceExams.filter((_, i) => i !== index)
                              )
                            }
                            className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    {/* Add New field section for entrance exam required field in edit section */}
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg mt-1 flex items-center gap-2"
                      onClick={() =>
                        setEditEntranceExams([...editEntranceExams, ""])
                      }
                    >
                      <Plus size={18} /> Add Exam
                    </button>
                  </div>
                  {/* Save Updation button for edit section - entrance exam required */}
                  <div className="flex gap-2 mt-4">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow"
                      onClick={() => handleUpdateCategory(cat._id)}
                    >
                      <Save size={18} />
                    </button>
                    {/* Clode Button for edit section - entrance exam required */}
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
                  {/* List of Category */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {cat.category}
                    </p>
                    {/* List of Sub Category */}
                    {cat.subCategory?.length > 0 && (
                      <ul className="ml-4 list-disc text-gray-600">
                        {cat.subCategory.map((sub, index) => (
                          <li key={index}>{sub}</li>
                        ))}
                      </ul>
                    )}
                    {/* List of Entrance Exam Required */}
                    {cat.entrance_exam_required?.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-semibold text-gray-700">
                          Entrance Exams Required:
                        </p>
                        <ul className="ml-4 list-disc text-gray-600">
                          {cat.entrance_exam_required.map((exam, index) => (
                            <li key={index}>{exam}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg shadow"
                      onClick={() => handleEditCategory(cat)}
                    >
                      <Pencil size={18} />
                    </button>
                    {/* Close Button */}
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

export default ManageUniversityCategory;
