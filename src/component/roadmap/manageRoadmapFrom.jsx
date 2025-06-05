import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "../../constant/constantBaseUrl";
import Swal from "sweetalert2";
import {
  FaChevronUp,
  FaChevronDown,
  FaCheck,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const ManageRoadmapForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [typeOptions, setTypeOptions] = useState([]);
  const [subTypeOptions, setSubTypeOptions] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [isSubTypeOpen, setIsSubTypeOpen] = useState(false);
  const subTypeDropdownRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState(null);
  const [filteredSubTypeOptions, setFilteredSubTypeOptions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // filter as per name and type
  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const nameMatch = roadmap.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const typeMatch = roadmap.type?.type
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || typeMatch;
  });

  //  to Fetch types for the form dropdown
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/api/type/all`);
        setTypeOptions(res.data?.data);
      } catch (err) {
        console.error("Failed to fetch types:", err);
        Swal.fire({
          title: "Warning!",
          text:
            err?.response?.data?.usrMsg ||
            "Failed to fetch types. Please try again.",
          icon: "warning",
        });
      }
    };

    fetchTypes();
  }, []);

  // Fetch all roadmaps to display in table list
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/roadmap/all`);
        setRoadmaps(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch roadmaps:", err);
        Swal.fire({
          title: "Warning!",
          text:
            err?.response?.data?.usrMsg ||
            "Failed to fetch roadmaps. Please try again.",
          icon: "warning",
        });
        setRoadmaps([]);
      }
    };
    fetchRoadmaps();
  }, []);

  // Handles the subtype as per the changes in type or selected type (shows the remaining types except the selected one)
  const handleTypeChange = async (e) => {
    const selectedType = e.target.value;
    formik.setFieldValue("type", selectedType);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/type/all`, {
        type: selectedType,
      });
      setSubTypeOptions(res.data?.data || []);
      setFilteredSubTypeOptions(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching subtypes:", err);
      Swal.fire({
        title: "Warning!",
        text:
          err?.response?.data?.usrMsg ||
          "Failed to fetch subtypes. Please try again.",
        icon: "warning",
      });

      setSubTypeOptions([]);
      setFilteredSubTypeOptions([]);
    }
  };

  // Edit the values of roadmap
  const handleEditRoadmap = (roadmap) => {
    setIsEditing(true);
    setEditingRoadmap(roadmap);
    setShowModal(true);
    formik.setValues({
      name: roadmap.name || "",
      type: roadmap.type?._id || "",
      subTypes: roadmap.sub_type.map((sub) => ({
        label: sub.type,
        value: sub._id,
      })),
    });

    handleTypeChange({ target: { value: roadmap.type?._id } });
  };

  // Formik initial values
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      subTypes: [],
    },

    // Validations
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      type: Yup.string().required("Type is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const subTypeIds = values.subTypes.map((sub) => sub.value);

      // Payload
      const payload = {
        name: values.name,
        type: values.type,
        sub_type: selectedSubTypes.map((item) => item.value),
      };

      setIsSaving(true);

      try {
        if (isEditing && editingRoadmap) {
          // Update api
          const res = await axios.put(
            `${API_BASE_URL}/api/roadmap/${editingRoadmap._id}`,
            payload
          );

          Swal.fire({
            title: "Success!",
            text: res.data?.usrMsg || "Roadmap updated successfully.",
            icon: "success",
          });
        } else {
          // Create api
          const res = await axios.post(
            `${API_BASE_URL}/api/roadmap/create`,
            payload
          );

          Swal.fire({
            title: "Success!",
            text: res.data?.usrMsg || "Roadmap created successfully.",
            icon: "success",
          });
        }
        //Render in table list
        const getRes = await axios.get(`${API_BASE_URL}/api/roadmap/all`);
        setRoadmaps(getRes.data?.data || []);
        setShowModal(false);
        resetForm();
      } catch (err) {
        console.error("Failed to create roadmap:", err);
        Swal.fire({
          title: "Warning!",
          text: err?.response?.data?.usrMsg || "Please try again.",
          icon: "warning",
        });
      } finally {
        setIsSaving(false);
      }
    },
  });

  // Closes the subtype dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        subTypeDropdownRef.current &&
        !subTypeDropdownRef.current.contains(event.target)
      ) {
        setIsSubTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get selected subTypes
  const selectedSubTypes = formik.values.subTypes || [];

  // Toggle subType selection
  const handleSubTypeSelect = (option) => {
    const exists = selectedSubTypes.find((item) => item.value === option.value);
    if (exists) {
      formik.setFieldValue(
        "subTypes",
        selectedSubTypes.filter((item) => item.value !== option.value)
      );
    } else {
      formik.setFieldValue("subTypes", [...selectedSubTypes, option]);
    }
  };

  // Check if a subType option is currently selected
  const isSubTypeSelected = (option) =>
    selectedSubTypes.some((item) => item.value === option.value);

  // Delete roadmap by ID with confirmation and update the list
  const handleDeleteRoadmap = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This roadmap will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/api/roadmap/${id}`);

        // Fetch updated roadmap list
        const res = await axios.get(`${API_BASE_URL}/api/roadmap/all`);

        // ✅ Correctly update the roadmap list
        setRoadmaps(res.data?.data || []);

        Swal.fire("Deleted!", "Stream has been deleted.", "success");
      } catch (err) {
        console.error("Failed to delete roadmap:", err);
        Swal.fire(
          "Warning!",
          err?.response?.data?.usrMsg || "Failed to delete Stream.",
          "warning"
        );
      }
    }
  };

  return (
    <div className="max-w-full h-full mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800">RoadMap 🗺️</h2>
        {/* Search Inpup Field */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search by name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs px-4 py-1 border-2 border-blue-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ml-150"
          />
        </div>

        {/* Add new roadmap button */}
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-3 cursor-pointer"
        >
          Add New Roadmap
        </button>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto rounded-lg max-h-[560px] shadow-lg border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-700 text-white z-20">
            {/* Table Heading */}
            <tr>
              <th className="p-3 text-left">Name of Streams</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Stream SubTypes</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoadmaps.map((roadmap, index) => (
              <tr
                key={roadmap._id}
                className={`border-b hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {/* Name */}
                <td className="p-3 max-w-[250px] truncate" title={roadmap.name}>
                  {roadmap.name}
                </td>

                {/* Type */}
                <td className="p-3 w-70">{roadmap.type?.type || "N/A"}</td>

                {/* Subtypes */}
                <td className="p-3">
                  {roadmap.sub_type.length > 0 ? (
                    <div className="max-h-24 overflow-y-auto pr-1 custom-scroll w-90">
                      <ul className="list-disc list-inside space-y-1 text-gray-800 text-sm">
                        {roadmap.sub_type.map((sub, idx) => (
                          <li key={idx}>{sub.type}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-sm">
                      No subtypes
                    </span>
                  )}
                </td>

                {/* Action section */}
                <td className="p-3 flex  gap-2">
                  {/* Edit Button */}
                  <button
                    className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm flex items-center gap-1 cursor-pointer"
                    onClick={() => handleEditRoadmap(roadmap)}
                    data-tooltip-id="edit-tooltip"
                    data-tooltip-content="Edit Roadmap"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  {/* Delete Button */}
                  <button
                    className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm flex items-center gap-1 cursor-pointer"
                    onClick={() => handleDeleteRoadmap(roadmap._id)}
                    data-tooltip-id="delete-tooltip"
                    data-tooltip-content="Delete Roadmap"
                  >
                    <FaTrash className="text-lg" />
                  </button>

                  <Tooltip id="edit-tooltip" place="top" />
                  <Tooltip id="delete-tooltip" place="top" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Roadmap Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            {/* Heading of Modal */}
            <h2 className="text-lg font-semibold mb-4">Add New Roadmap</h2>
            {/* X Button to close Modal */}
            <button
              type="button"
              onClick={() => {
                formik.resetForm();
                setShowModal(false);
                setIsEditing(false);
                setEditingRoadmap(null);
              }}
              className="absolute top-3 right-3 text-3xl text-gray-500 hover:text-red-500 focus:outline-none"
            >
              &times;
            </button>

            {/* Form for add new roadmap */}
            <form onSubmit={formik.handleSubmit}>
              {/*  Name */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Type Dropdown */}
              <div className="mb-4 w-full">
                <label className="block text-blue-800 font-semibold mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={formik.values.type}
                  onChange={handleTypeChange}
                  className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none transition-all ${
                    formik.touched.type && formik.errors.type
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                  }`}
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {typeOptions.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.type}
                    </option>
                  ))}
                </select>
                {formik.touched.type && formik.errors.type && (
                  <p className="text-red-500 text-sm mt-2 font-semibold">
                    {formik.errors.type}
                  </p>
                )}
              </div>

              {/* SubType Dropdown */}
              <div className="relative w-full mb-4" ref={subTypeDropdownRef}>
                <label className="block text-lg font-semibold text-blue-900 mb-2">
                  SubType
                </label>

                {/* {/* Trigger Box  */}
                <div
                  className="border border-gray-300 rounded-xl px-4 py-3 bg-white flex justify-between items-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={() => setIsSubTypeOpen(!isSubTypeOpen)}
                >
                  <span className="text-gray-800 font-medium truncate w-[90%]">
                    {selectedSubTypes.length > 0
                      ? selectedSubTypes.map((opt) => opt.label).join(", ")
                      : "Select SubTypes"}
                  </span>
                  {isSubTypeOpen ? (
                    <FaChevronUp className="text-blue-500 transition-transform duration-300" />
                  ) : (
                    <FaChevronDown className="text-gray-500 transition-transform duration-300" />
                  )}
                </div>

                {isSubTypeOpen && (
                  <div className="absolute z-30 w-full mt-2 rounded-xl bg-white border border-gray-200 shadow-lg animate-fadeIn max-h-60 overflow-y-auto transition-all duration-300">
                    {/* Add search input at the top */}
                    <div className="sticky top-0 bg-white p-2 border-b">
                      <input
                        type="text"
                        placeholder="Search subtypes..."
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => {
                          const searchTerm = e.target.value.toLowerCase();
                          const filtered = subTypeOptions.filter((option) =>
                            option.type.toLowerCase().includes(searchTerm)
                          );
                          setFilteredSubTypeOptions(filtered);
                        }}
                      />
                    </div>

                    {/* Render filtered options */}
                    {filteredSubTypeOptions.length > 0 ? (
                      filteredSubTypeOptions.map((option) => {
                        const formatted = {
                          label: option.type,
                          value: option._id,
                        };
                        const isChecked = isSubTypeSelected(formatted);

                        return (
                          <div
                            key={option._id}
                            onClick={() => handleSubTypeSelect(formatted)}
                            className={`flex justify-between items-center px-4 py-3 cursor-pointer transition-all duration-200 ${
                              isChecked
                                ? "bg-blue-50 hover:bg-blue-100"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <span className="text-gray-700 text-sm font-medium">
                              {option.type}
                            </span>
                            {isChecked && (
                              <span className="bg-green-100 text-green-600 rounded-full p-1">
                                <FaCheck className="text-sm" />
                              </span>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center text-gray-400 py-4">
                        No results found.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6 gap-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`w-25 py-2 px-2 text-white font-semibold rounded-lg transition-all cursor-pointer ${
                    isSaving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSaving ? "Saving..." : "Save"}
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
