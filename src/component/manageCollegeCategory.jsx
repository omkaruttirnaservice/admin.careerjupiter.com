import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { Pencil, Trash2, Save, X, Plus } from "lucide-react";
import Swal from "sweetalert2";
import { FaBook, FaGraduationCap, FaLayerGroup } from "react-icons/fa";

const ManageCollegeCategory = () => {
  const [type, setType] = useState("college");
  const [categoryInput, setCategoryInput] = useState("");
  const [subCategoryInputs, setSubCategoryInputs] = useState([""]);
const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editSubCategories, setEditSubCategories] = useState([]);
  const [entranceExams, setEntranceExams] = useState([""]);
  const [editEntranceExams, setEditEntranceExams] = useState([""]);

  // Fetched all categories using get method
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/college/categories/all`);
      if (Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      } else {
        console.error("Invalid response data: categories is not an array.");
      }
    } catch (err) {
      console.error("Failed to fetch college categories", err);
    }
  };

  // Called Once when mounted
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handled Adding Categories
  const handleAddCategory = async () => {
    const trimmedCategory = categoryInput.trim().toLowerCase();
    if (!trimmedCategory) return;

    // Check if category already exists
    const isDuplicate = categories.some(
      (cat) => cat.category.toLowerCase() === trimmedCategory
    );

    if (isDuplicate) {
      Swal.fire({
        icon: "warning",
        title: "Duplicate Category",
        text: `"${categoryInput}" already exists. Please enter a unique category.`,
        confirmButtonColor: "#d33",
      });
      return;
    }

    const subcategories = subCategoryInputs
      .map((sub) => sub.trim())
      .filter((sub) => sub);

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
        text: "Category added successfully!",
        confirmButtonColor: "#3085d6",
      });
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
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 overflow-hidden">

    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-xl p-5 text-white shadow-md">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          📁 Manage 
          <span className="capitalize">{type}</span> Categories
        </h2>

        <p className="text-blue-100 text-sm mt-2">
          Add, edit and manage college categories
        </p>
      </div>


      {/* Form Section */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">

        {/* Category Name */}
        <div>
          <label className="font-semibold text-blue-900 flex items-center gap-2 text-lg">
            <FaLayerGroup className="text-blue-600"/>
            Category Name
          </label>

          <input
            type="text"
            value={categoryInput}
            onChange={(e)=>setCategoryInput(e.target.value)}
            placeholder="Enter category name"
            className="
              mt-2
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-blue-300
              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
            "
          />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

          {/* Sub Category */}
          {type === "college" && (
            <div className="bg-white rounded-xl border p-4">

              <label className="font-semibold text-green-700 flex items-center gap-2">
                <FaBook/>
                Sub Categories
              </label>


              {subCategoryInputs.map((sub,index)=>(
                <div key={index} className="flex gap-2 mt-3">

                  <input
                    type="text"
                    value={sub}
                    onChange={(e)=>
                      handleSubCategoryChange(index,e.target.value)
                    }
                    placeholder={`Subcategory ${index+1}`}
                    className="
                      flex-1
                      border
                      px-3
                      py-2
                      rounded-lg
                    "
                  />

                  {subCategoryInputs.length > 1 && (
                    <button
                      onClick={()=>
                        handleRemoveSubCategoryField(index)
                      }
                      className="bg-red-500 text-white p-2 rounded-lg"
                    >
                      <Trash2 size={18}/>
                    </button>
                  )}

                </div>
              ))}


              <button
                onClick={handleAddSubCategoryField}
                className="
                mt-3
                flex
                items-center
                gap-2
                bg-green-600
                hover:bg-green-700
                text-white
                px-4
                py-2
                rounded-lg
                "
              >
                <Plus size={18}/>
                Add Subcategory
              </button>

            </div>
          )}



          {/* Entrance Exams */}
          <div className="bg-white rounded-xl border p-4">

            <label className="font-semibold text-purple-700 flex items-center gap-2">
              <FaGraduationCap/>
              Entrance Exams Required
            </label>


            {entranceExams.map((exam,index)=>(

              <div key={index} className="flex gap-2 mt-3">

                <input
                  type="text"
                  value={exam}
                  onChange={(e)=>{

                    const updated=[...entranceExams];
                    updated[index]=e.target.value;
                    setEntranceExams(updated);

                  }}
                  placeholder={`Exam ${index+1}`}
                  className="
                    flex-1
                    border
                    px-3
                    py-2
                    rounded-lg
                  "
                />


                {entranceExams.length > 1 && (

                  <button
                    onClick={()=>
                      setEntranceExams(
                        entranceExams.filter((_,i)=>i!==index)
                      )
                    }
                    className="
                    bg-red-500
                    text-white
                    p-2
                    rounded-lg
                    "
                  >
                    <Trash2 size={18}/>
                  </button>

                )}

              </div>

            ))}


            <button
              onClick={()=>
                setEntranceExams([...entranceExams,""])
              }
              className="
              mt-3
              flex
              items-center
              gap-2
              bg-purple-700
              text-white
              px-4
              py-2
              rounded-lg
              "
            >
              <Plus size={18}/>
              Add Exam
            </button>


          </div>

        </div>



        <button
          onClick={handleAddCategory}
          className="
          mt-5
          flex
          items-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-xl
          shadow
          "
        >
          <Plus size={18}/>
          Add Category
        </button>

      </div>




      {/* Category List */}

    {/* Category List */}
<div className="mt-6">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-bold text-gray-800">
      Categories
      <span className="text-blue-700 ml-2 capitalize">({type})</span>
    </h3>

    <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold">
      {categories.length} Total
    </span>
  </div>

  {/* Horizontal Cards */}
  <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
    {categories.map((cat) => (
      <div
        key={cat._id}
        className="min-w-[350px] max-w-[350px] bg-white border rounded-xl shadow hover:shadow-lg transition flex-shrink-0"
      >
        {editCategoryId === cat._id ? (
          /* ================= EDIT MODE ================= */
          <div className="p-5 space-y-4">
            <input
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />

            <div>
              <p className="font-semibold text-green-700 mb-2">
                Sub Categories
              </p>

              {editSubCategories.map((sub, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    value={sub}
                    onChange={(e) =>
                      handleEditSubCategoryChange(index, e.target.value)
                    }
                    className="flex-1 border rounded-lg px-3 py-2"
                  />

                  <button
                    onClick={() =>
                      handleRemoveEditSubCategoryField(index)
                    }
                    className="bg-red-500 text-white rounded-lg px-3"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <button
                onClick={handleAddEditSubCategoryField}
                className="bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            <div>
              <p className="font-semibold text-purple-700 mb-2">
                Entrance Exams
              </p>

              {editEntranceExams.map((exam, index) => (
                <input
                  key={index}
                  value={exam}
                  onChange={(e) => {
                    const arr = [...editEntranceExams];
                    arr[index] = e.target.value;
                    setEditEntranceExams(arr);
                  }}
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                />
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => handleUpdateCategory(cat._id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Save size={18} />
                Save
              </button>

              <button
                onClick={() => {
                  setEditCategoryId(null);
                  setEditCategoryName("");
                  setEditSubCategories([]);
                  setEditEntranceExams([""]);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ================= VIEW MODE ================= */
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h4 className="text-lg font-bold text-blue-800">
                {cat.category}
              </h4>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCategory(cat)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDeleteCategory(cat._id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              {cat.subCategory?.length > 0 && (
                <div className="mb-4">
                  <p className="font-semibold text-green-700 mb-2">
                    Sub Categories
                  </p>

                  {cat.subCategory.map((sub, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      • {sub}
                    </p>
                  ))}
                </div>
              )}

              {cat.entrance_exam_required?.length > 0 && (
                <div>
                  <p className="font-semibold text-purple-700 mb-2">
                    Entrance Exams
                  </p>

                  {cat.entrance_exam_required.map((exam, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      • {exam}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    ))}
  </div>
</div>


    </div>

  </div>
);
};
export default ManageCollegeCategory;
