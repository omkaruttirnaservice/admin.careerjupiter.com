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
  <div className="p-6 max-w-7xl mx-auto bg-blue-100 min-h-screen">
    {/* Header */}
    <div className="bg-white p-5 rounded-xl shadow-md mb-5">
      <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
        📁 Manage <span className="capitalize">{type}</span> Categories
      </h2>
    </div>

    {/* Main Form */}
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">

      {/* Category Name */}
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
          className="mt-2 border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Sub Categories */}
        {type === "university" && (
          <div className="space-y-3">
            <label className="font-semibold text-green-800 flex items-center gap-2 text-lg">
              <FaBook className="text-green-600" />
              Subcategories
            </label>

            {subCategoryInputs.map((sub, index) => (
              <div key={index} className="flex gap-2">

                <input
                  type="text"
                  value={sub}
                  onChange={(e)=>
                    handleSubCategoryChange(index,e.target.value)
                  }
                  placeholder={`Subcategory ${index+1}`}
                  className="border px-3 py-2 rounded-lg w-full"
                />

                {subCategoryInputs.length > 1 && (
                  <button
                    onClick={()=>handleRemoveSubCategoryField(index)}
                    className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg"
                  >
                    <Trash2 size={18}/>
                  </button>
                )}

              </div>
            ))}


            <button
              onClick={handleAddSubCategoryField}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg"
            >
              <Plus size={18}/> Add Subcategory
            </button>

          </div>
        )}


        {/* Entrance Exams */}
        <div className="space-y-3">

          <label className="font-semibold text-purple-800 flex items-center gap-2 text-lg">
            <FaGraduationCap className="text-purple-600"/>
            Entrance Exams Required
          </label>


          {entranceExams.map((exam,index)=>(
            <div key={index} className="flex gap-2">

              <input
                type="text"
                value={exam}
                onChange={(e)=>{
                  const updated=[...entranceExams];
                  updated[index]=e.target.value;
                  setEntranceExams(updated);
                }}
                placeholder={`Exam ${index+1}`}
                className="border px-3 py-2 rounded-lg w-full"
              />


              {entranceExams.length>1 && (
                <button
                  onClick={()=>
                    setEntranceExams(
                      entranceExams.filter((_,i)=>i!==index)
                    )
                  }
                  className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-lg"
                >
                  <Trash2 size={18}/>
                </button>
              )}

            </div>
          ))}


          <button
            onClick={()=>setEntranceExams([...entranceExams,""])}
            className="flex items-center gap-1 bg-purple-700 hover:bg-purple-600 text-white px-3 py-2 rounded-lg"
          >
            <Plus size={18}/> Add Exam
          </button>

        </div>

      </div>


      {/* Add Button */}
      <button
        onClick={handleAddCategory}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
      >
        Add Category
      </button>



      {/* Category List */}

      <div>

        <h4 className="text-xl font-semibold mb-4 text-gray-700">
          Categories for{" "}
          <span className="capitalize text-blue-700">
            {type}
          </span>
        </h4>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {(categories?.length > 0 ? categories : []).map((cat)=>(

            <div
              key={cat._id}
              className="bg-gray-50 border rounded-xl p-4 shadow-sm"
            >

              {editCategoryId === cat._id ? (

                /* KEEP YOUR EXISTING EDIT SECTION HERE */
                <div>
                  {/* Existing edit JSX remains unchanged */}
                </div>

              ) : (

                <div className="flex justify-between items-start">

                  <div>

                    <p className="font-semibold text-blue-800">
                      {cat.category}
                    </p>


                    {cat.subCategory?.length > 0 && (
                      <ul className="text-gray-700 mt-1">
                        {cat.subCategory.map((sub,index)=>(
                          <li key={index}>{sub}</li>
                        ))}
                      </ul>
                    )}


                    {cat.entrance_exam_required?.length>0 && (

                      <div className="mt-2">

                        <p className="text-sm font-semibold text-gray-700">
                          Entrance Exams Required:
                        </p>

                        <ul className="ml-4 list-disc text-sm text-gray-600">

                          {cat.entrance_exam_required.map(
                            (exam,index)=>(
                              <li key={index}>{exam}</li>
                            )
                          )}

                        </ul>

                      </div>

                    )}

                  </div>



                  <div className="flex gap-2">

                    <button
                      onClick={()=>handleEditCategory(cat)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
                    >
                      <Pencil size={18}/>
                    </button>


                    <button
                      onClick={()=>handleDeleteCategory(cat._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                    >
                      <Trash2 size={18}/>
                    </button>

                  </div>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>


    </div>

  </div>
);
};

export default ManageUniversityCategory;
