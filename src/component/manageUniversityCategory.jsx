import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { Pencil, Trash2, Save, X, Plus } from "lucide-react";
import Swal from "sweetalert2";
import { FaBook, FaGraduationCap, FaLayerGroup } from "react-icons/fa";

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
    <div className="p-8 max-w-7xl mx-auto bg-blue-100 h-[100vh] flex flex-col space-y-4">
      <div className="bg-white p-4 rounded-xl sticky top-0 z-10 shadow-md">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          📁 Manage <span className="capitalize">{type}</span> Categories
        </h2>
      </div>

      {/* Category Input */}
      <div className="overflow-y-auto space-y-6 pr-2">
        <div className="space-y-4 bg-white p-4 rounded-xl">
          <div>
            <label className="font-semibold text-blue-800 flex items-center gap-2 text-lg">
              <FaLayerGroup className="text-blue-600" />
              Category Name
            </label>
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="Enter category name"
              className="mt-1 border px-4 py-2 rounded-lg w-full bg-white focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SubCategory Inputs for university */}
            {type === "university" && (
              <div className="space-y-2">
                <label className="font-semibold text-green-800 flex items-center gap-2 text-lg">
                  <FaBook className="text-green-600" />
                  Subcategories
                </label>
                {subCategoryInputs.map((sub, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={sub}
                      onChange={(e) =>
                        handleSubCategoryChange(index, e.target.value)
                      }
                      placeholder={`Subcategory ${index + 1}`}
                      className="border px-3 py-2 rounded-lg w-full bg-white"
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
                  className="mt-2 text-md flex items-center gap-1 text-white bg-green-600 hover:bg-green-500 p-2 rounded-lg"
                  onClick={handleAddSubCategoryField}
                >
                  <Plus size={18} /> Add Subcategory
                </button>
              </div>
            )}

            {/* Entrance Exam Required field */}
            <div className="space-y-2">
              <label className="font-semibold text-purple-800 flex items-center gap-2 text-lg">
                <FaGraduationCap className="text-purple-600" />
                Entrance Exams Required
              </label>
              {entranceExams.map((exam, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={exam}
                    onChange={(e) => {
                      const updated = [...entranceExams];
                      updated[index] = e.target.value;
                      setEntranceExams(updated);
                    }}
                    placeholder={`Exam ${index + 1}`}
                    className="border px-3 py-2 rounded-lg w-full bg-white"
                  />
                  {entranceExams.length > 1 && (
                    // Remove button for entrance exam required in form field
                    <button
                      onClick={() =>
                        setEntranceExams(
                          entranceExams.filter((_, i) => i !== index)
                        )
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
                className="mt-2 text-md flex items-center gap-1 text-white bg-purple-700 hover:bg-purple-600 p-2 rounded-lg"
                onClick={() => setEntranceExams([...entranceExams, ""])}
              >
                <Plus size={18} /> Add Exam
              </button>
            </div>
          </div>

          {/* Add Category Button */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow mt-4 flex gap-1"
            onClick={handleAddCategory}
          >
            Add Category
          </button>

          {/* List Categories */}
          <div>
            <h4 className="text-xl font-semibold mb-3 text-gray-700">
              Categories for{" "}
              <span className="capitalize text-blue-700">{type}</span>
            </h4>
            {/* Categories List  */}
            <ul className="space-y-4 max-h-72 overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(categories?.length > 0 ? categories : []).map((cat) => (
                  <li
                    key={cat._id}
                    className="bg-gray-50 border rounded-xl p-4 shadow-sm"
                  >
                    {editCategoryId === cat._id ? (
                      <div className="space-y-4">
                        {/* Input Field for category in edit section */}
                        <input
                          type="text"
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="border px-3 py-2 rounded-lg w-full"
                        />

                        {/* Subcategories when editing */}
                        {type === "university" && (
                          <div className="space-y-2">
                            <label className="text-green-700 font-medium">
                              Subcategories
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                              {editSubCategories.map((sub, index) => (
                                <div
                                  key={index}
                                  className="flex gap-2 items-center"
                                >
                                  <input
                                    type="text"
                                    value={sub}
                                    onChange={(e) =>
                                      handleEditSubCategoryChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                    placeholder={`Subcategory ${index + 1}`}
                                    className="border px-3 py-2 rounded-lg w-full"
                                  />
                                  {editSubCategories.length > 1 && (
                                    // Remove Sub Category field in edit section
                                    <button
                                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                                      onClick={() =>
                                        handleRemoveEditSubCategoryField(index)
                                      }
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            {/* Add new field for sub category in edit section  */}
                            <button
                              className="text-sm text-white bg-green-600 hover:bg-green-500 p-2 rounded-lg flex gap-1 items-center mt-1"
                              onClick={handleAddEditSubCategoryField}
                            >
                              <Plus size={18} /> Add Subcategory
                            </button>
                          </div>
                        )}

                        {/* Inside the edit form section Entrance Exam field is handled */}
                        <div className="space-y-2">
                          <label className="text-purple-700 font-medium">
                            Entrance Exams Required:
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {editEntranceExams.map((exam, index) => (
                              <div
                                key={index}
                                className="flex gap-2 items-center"
                              >
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
                                        editEntranceExams.filter(
                                          (_, i) => i !== index
                                        )
                                      )
                                    }
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Add New field section for entrance exam required field in edit section */}
                          <button
                            className="text-sm text-white bg-purple-700 p-2 rounded-lg hover:bg-purple-600 flex gap-1 items-center"
                            onClick={() =>
                              setEditEntranceExams([...editEntranceExams, ""])
                            }
                          >
                            <Plus size={18} /> Add Exam
                          </button>
                        </div>
                        {/* Save Updation button for edit section - entrance exam required */}
                        <div className="flex gap-2 mt-2 justify-end">
                          <button
                            className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg"
                            onClick={() => handleUpdateCategory(cat._id)}
                          >
                            <span className="flex justify-center">
                              {" "}
                              <Save size={18} />{" "}
                            </span>{" "}
                            Save
                          </button>
                          {/* Clode Button for edit section - entrance exam required */}
                          <button
                            className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg"
                            onClick={() => setEditCategoryId(null)}
                          >
                            <span className="flex justify-center">
                              {" "}
                              <X size={18} />{" "}
                            </span>{" "}
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        {/* List of Category */}
                        <div>
                          <p className="font-semibold text-blue-800">
                            {cat.category}
                          </p>
                          {/* List of Sub Category */}
                          {cat.subCategory?.length > 0 && (
                            <ul className=" text-gray-700">
                              {cat.subCategory.map((sub, index) => (
                                <li key={index}>{sub}</li>
                              ))}
                            </ul>
                          )}
                          {/* List of Entrance Exam Required */}
                          {cat.entrance_exam_required?.length > 0 && (
                            <div className="mt-1">
                              <p className="text-sm font-semibold text-gray-700">
                                Entrance Exams Required:
                              </p>
                              <ul className="ml-4 list-disc text-sm text-gray-600">
                                {cat.entrance_exam_required.map(
                                  (exam, index) => (
                                    <li key={index}>{exam}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 mt-2">
                          {/* Edit Button */}
                          <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                            onClick={() => handleEditCategory(cat)}
                          >
                            <Pencil size={18} />
                          </button>
                          {/* Close Button */}
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                            onClick={() => handleDeleteCategory(cat._id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUniversityCategory;
