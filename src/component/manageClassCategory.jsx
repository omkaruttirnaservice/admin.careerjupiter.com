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
  <div
  className="
  h-screen
  overflow-hidden
  bg-gradient-to-br
  from-blue-50
  via-white
  to-indigo-50
  p-4
  "
>

<div
  className="
  h-full
  bg-white
  rounded-2xl
  shadow-xl
  max-w-6xl
  mx-auto
  flex
  flex-col
  overflow-hidden
  "
>

      {/* Header */}
      <div
        className="
        bg-gradient-to-r
        from-blue-700
        to-indigo-600
        p-6
        text-white
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          flex
          items-center
          gap-3
          "
        >
          📁 Manage Category
          <span className="capitalize">
            {type}
          </span>
        </h2>


        <p className="text-blue-100 text-sm mt-2">
          Add, edit and manage class categories
        </p>

      </div>




      <div className="p-6 flex-1 overflow-hidden flex flex-col">


        {/* Add Category Card */}
        <div
          className="
          bg-blue-50
          border
          border-blue-200
          rounded-xl
          p-5
          mb-6
          "
        >

          <label
            className="
            block
            font-semibold
            text-blue-900
            mb-3
            "
          >
            Add New Category
          </label>


          <div
            className="
            flex
            gap-3
            "
          >

            <input
              type="text"
              value={categoryInput}
              onChange={(e)=>setCategoryInput(e.target.value)}
              placeholder="Enter category name"
              className="
              flex-1
              px-4
              py-3
              rounded-xl
              border
              border-blue-300
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
              "
            />


            <button
              onClick={handleAddCategory}
              className="
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              font-semibold
              shadow-md
              hover:shadow-lg
              hover:scale-105
              transition
              cursor-pointer
              "
            >
              + Add
            </button>

          </div>

        </div>






        {/* Category List Header */}
        <div
          className="
          flex
          justify-between
          items-center
          mb-4
          "
        >

          <h3
            className="
            text-lg
            font-bold
            text-gray-800
            "
          >
            Categories
            <span className="text-blue-700 ml-1 capitalize">
              ({type})
            </span>
          </h3>


          <span
            className="
            bg-blue-100
            text-blue-700
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            "
          >
            {categories[type]?.length || 0} Total
          </span>


        </div>







        {/* Category Cards */}
       <div
 className="
 flex-1
 space-y-3
 overflow-y-auto
 pr-2
 custom-scrollbar
 "
>

        {loading ? (

          <div className="text-center text-blue-600 py-10">
            Loading categories...
          </div>

        ) : categories[type]?.length > 0 ? (

          categories[type].map((cat)=>(

            <div
              key={cat._id}
              className="
              bg-white
              border
              border-blue-200
              rounded-xl
              p-4
              shadow-sm
              hover:shadow-lg
              transition
              "
            >


            {
              editCategoryId === cat._id ? (

                <div
                  className="
                  flex
                  gap-3
                  items-center
                  "
                >

                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e)=>setEditCategoryName(e.target.value)}
                    className="
                    flex-1
                    px-3
                    py-2
                    border
                    rounded-lg
                    focus:ring-2
                    focus:ring-blue-400
                    outline-none
                    "
                  />


                  <button
                    onClick={()=>handleUpdateCategory(cat._id)}
                    className="
                    bg-green-500
                    hover:bg-green-600
                    text-white
                    p-2
                    rounded-lg
                    cursor-pointer
                    "
                  >
                    <Save size={18}/>
                  </button>


                  <button
                    onClick={()=>setEditCategoryId(null)}
                    className="
                    bg-gray-400
                    hover:bg-gray-500
                    text-white
                    p-2
                    rounded-lg
                    cursor-pointer
                    "
                  >
                    <X size={18}/>
                  </button>


                </div>


              ) : (

                <div
                  className="
                  flex
                  justify-between
                  items-center
                  "
                >

                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    "
                  >

                    <div
                      className="
                      h-10
                      w-10
                      rounded-xl
                      bg-blue-100
                      flex
                      items-center
                      justify-center
                      text-blue-700
                      font-bold
                      "
                    >
                      {cat.category.charAt(0).toUpperCase()}
                    </div>


                    <span
                      className="
                      font-semibold
                      text-gray-800
                      "
                    >
                      {cat.category}
                    </span>

                  </div>



                  <div className="flex gap-2">

                    <button
                      onClick={()=>handleEditCategory(cat)}
                      className="
                      bg-yellow-400
                      hover:bg-yellow-500
                      text-white
                      p-2
                      rounded-lg
                      cursor-pointer
                      "
                    >
                      <Pencil size={17}/>
                    </button>


                    <button
                      onClick={()=>handleDeleteCategory(cat._id)}
                      className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      p-2
                      rounded-lg
                      cursor-pointer
                      "
                    >
                      <Trash2 size={17}/>
                    </button>


                  </div>


                </div>

              )
            }


            </div>

          ))

        ) : (

          <div
            className="
            text-center
            text-gray-500
            py-10
            "
          >
            No categories found
          </div>

        )}

        </div>


      </div>


    </div>

  </div>
);
};

export default ManageClassCategory;
