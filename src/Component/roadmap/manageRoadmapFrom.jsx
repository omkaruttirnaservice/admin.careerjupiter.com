import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "../../constant/constantBaseUrl";


const ManageRoadmapForm = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typeOptions, setTypeOptions] = useState([]);
  const [subTypeOptions, setSubTypeOptions] = useState([]);
  // Fetch all types and subTypes from API
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/type/all`);
        const types = res.data.types.map((item) => item.type);
        const allSubTypes = res.data.types.flatMap((item) => item.subType || []);
        const uniqueSubTypes = [...new Set(allSubTypes)];
        setTypeOptions(types);
        setSubTypeOptions(uniqueSubTypes);
      } catch (err) {
        console.error("Failed to fetch types:", err);
      }
    };
    fetchTypes();
  }, []);
  // Formik setup
  const formik = useFormik({
    initialValues: {
      category: "",
      type: "",
      subTypes: [],
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Category name is required"),
      type: Yup.string().required("Type is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const newCategory = {
        _id: Date.now().toString(),
        category: values.category,
        type: values.type,
        subCategory: values.subTypes,
      };
      setCategories([...categories, newCategory]);
      setShowModal(false);
      resetForm();
    },
  });
  return (
    <div className="p-6">
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add Category
      </button>
      {/* Category Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3 border-b font-semibold">Name</th>
              <th className="px-4 py-3 border-b font-semibold">Type</th>
              <th className="px-4 py-3 border-b font-semibold">SubTypes</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">{cat.category}</td>
                <td className="px-4 py-3 border-b capitalize">{cat.type}</td>
                <td className="px-4 py-3 border-b">
                  {cat.subCategory.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {cat.subCategory.map((sub, index) => (
                        <li key={index}>{sub}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400 italic">No subtypes</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <form onSubmit={formik.handleSubmit}>
              {/* Category Name */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Category Name</label>
                <input
                  type="text"
                  name="category"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                />
                {formik.touched.category && formik.errors.category && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
                )}
              </div>
              {/* Type Dropdown */}
              <SingleSelectDropdown
                label="Type"
                name="type"
                options={typeOptions}
                formik={formik}
                placeholder="Select Type"
              />
              {/* SubType Multi-Select */}
              <MultiSelectDropdown
                label="SubTypes"
                name="subTypes"
                options={subTypeOptions}
                formik={formik}
              />
              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                  onClick={() => {
                    setShowModal(false);
                    formik.resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageRoadmapForm;