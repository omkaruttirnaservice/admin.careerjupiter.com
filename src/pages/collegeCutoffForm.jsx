// CollegeCutoffForm.jsx
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { useParams } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";

const CollegeCutoffForm = () => {
  const [selectedCastes, setSelectedCastes] = useState([]);
  const [casteCategory, setCasteCategory] = useState("");
  const [castePercent, setCastePercent] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [collegeIdInput, setCollegeIdInput] = useState("");
  const [allCastes, setAllCastes] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      collegeId: "",
      collegeName: "",
      category: "Diploma",
      subCategory: "",
    },

    // onSubmit: async (values) => {
    //   setIsSubmitting(true);
    //   const cutoff = selectedCastes.map((item) => ({
    //     caste: item.caste, // caste is now a name (string), not ID
    //     marks: Number(item.percent),
    //   }));

    //   const payload = {
    //     collegeId: values.collegeId,
    //     collegeName: values.collegeName,
    //     category: values.category,
    //     subCategory: [values.subCategory],
    //     cutoff,
    //   };

    //   try {
    //     if (editingId) {
    //       await axios.put(`${API_BASE_URL}/api/cutoff/${editingId}`, payload);
    //       Swal.fire({
    //         icon: "success",
    //         title: "Success",
    //         text: "Cutoff updated successfully",
    //       });
    //     } else {
    //       await axios.post(`${API_BASE_URL}/api/cutoff/create`, payload);
    //       Swal.fire({
    //         icon: "success",
    //         title: "Success",
    //         text: "Cutoff created successfully",
    //       });
    //     }

    //     formik.resetForm();
    //     setSelectedCastes([]);
    //     setEditingId(null);
    //   } catch (err) {
    //     console.error("Submission failed:", err);
    //     alert("Submission failed");
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // },

    //       onSubmit: async (values) => {
    //   setIsSubmitting(true);
    //   setIsSubmitting(true);
    //       const cutoff = selectedCastes.map((item) => ({
    //         caste: item.caste, // caste is now a name (string), not ID
    //         marks: Number(item.percent),
    //       }));

    //       const payload = {
    //         collegeId: values.collegeId,
    //         collegeName: values.collegeName,
    //         category: values.category,
    //         subCategory: [values.subCategory],
    //         cutoff,
    //       };

    //   try {
    //     if (editingId) {
    //       await axios.put(`${API_BASE_URL}/api/cutoff/${editingId}`, payload);
    //       alert("Cutoff updated successfully");
    //     } else {
    //       await axios.post(`${API_BASE_URL}/api/cutoff/create`, payload);
    //       alert("Cutoff created successfully");
    //     }

    //     formik.resetForm();
    //     setSelectedCastes([]);
    //     setEditingId(null);
    //     // navigate("/cutoff-table");
    //   } catch (err) {
    //     console.error("Submission failed:", err);
    //     alert("Submission failed");
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // },

    onSubmit: async (values) => {
      setIsSubmitting(true);

      const cutoff = selectedCastes.map((item) => ({
        caste: item.caste, // caste is now a name (string), not ID
        marks: Number(item.percent),
      }));

      const payload = {
        collegeId: values.collegeId,
        collegeName: values.collegeName,
        category: values.category,
        subCategory: [values.subCategory],
        cutoff,
      };
      try {
        let res;
        if (editingId) {
          res = await axios.put(
            `${API_BASE_URL}/api/cutoff/${editingId}`,
            payload
          );
        } else {
          res = await axios.post(`${API_BASE_URL}/api/cutoff/create`, payload);
        }
        console.log("222222222222222", res?.data?.usrMsg);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.data?.usrMsg || "Operation successful",
        }).then(() => {
          // Optional: only navigate after alert is closed
          formik.resetForm();
          setSelectedCastes([]);
          setEditingId(null);
          // navigate("/cutoff-table");
        });
      } catch (err) {
        console.error("Error:", err?.response?.data || err);
        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: err?.response?.data?.usrMsg || "Submission failed",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!id) return;

    const fetchCutoffById = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/cutoff/${id}`);
        const data = res.data.data;

        formik.setValues({
          collegeId: data.collegeId || "",
          collegeName: data.collegeName || "",
          category: data.category || "",
          subCategory: data.subCategory?.[0] || "",
        });

        setCollegeIdInput(data.collegeId);
        setSelectedCastes(
          (data.cutoff || []).map((cut) => ({
            caste: cut.caste,
            // caste: allCastes.find((c) => c._id === cut.caste)?.caste || "",
            percent: cut.marks,
          }))
        );

        setEditingId(data._id);
      } catch (err) {
        console.error("Failed to load cutoff:", err);
        alert("Failed to fetch cutoff details");
      }
    };

    fetchCutoffById();
  }, [id, allCastes]); // include allCastes so caste names load correctly

  const handleAddCaste = () => {
    const selected = allCastes.find((c) => c._id === casteCategory);
    if (!selected || selectedCastes.find((c) => c._id === selected._id)) return;

    setSelectedCastes([
      ...selectedCastes,
      { caste: selected.caste, percent: castePercent },
    ]);

    setCasteCategory("");
    setCastePercent("");
  };

  // useEffect(() => {
  //   const fetchCastes = async () => {
  //     try {
  //       const res = await axios.get(`${API_BASE_URL}/api/cutoff/all-caste-cutoff`);
  //       const casteGroups = res.data?.data?.castes || [];

  //       // 🧠 Flatten and deduplicate all caste values
  //       const uniqueCastes = Array.from(
  //         new Set(casteGroups.flatMap((group) => group.caste))
  //       ).map((caste, index) => ({
  //         _id: `${index}-${caste}`, // Create a temporary unique _id
  //         caste,
  //       }));

  //       setAllCastes(uniqueCastes);
  //     } catch (error) {
  //       console.error("Failed to fetch castes", error);
  //     }
  //   };

  //   fetchCastes();
  // }, []);

useEffect(() => {
  const fetchCastes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/cutoff/all-caste-cutoff`);
      const casteGroups = res.data?.data || [];

      const uniqueCastes = Array.from(
        new Set(casteGroups.map((item) => item.caste))
      ).map((caste, index) => ({
        _id: `${index}-${caste}`,
        caste,
      }));

      setAllCastes(uniqueCastes);
    } catch (error) {
      console.error("Failed to fetch castes", error);
    }
  };

  fetchCastes();
}, []);


  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        `${API_BASE_URL}/api/college/all-college-category`
      );
      setCategoryData(res.data.data || []);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!collegeIdInput) return;
      axios
        .post(`${API_BASE_URL}/api/college/details`, {
          collegeId: collegeIdInput,
        })
        .then((res) => {
          const data = res.data.data;
          formik.setFieldValue("collegeName", data.collegeName || "");
          formik.setFieldValue("category", data.category || "");
          setSubCategories(data.subCategory || []);
          formik.setFieldValue("subCategory", data.subCategory?.[0] || "");
        })
        .catch((err) => alert(err.response?.data?.message || "Fetch failed"));
    }, 700);
    return () => clearTimeout(delay);
  }, [collegeIdInput]);

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800">
            🏫 Add College Cutoff
          </h2>
          <button
            onClick={() => navigate("/cutoff-table")}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            📊 View Cutoff Table
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <fieldset className="border p-4 rounded-xl">
            <legend className="text-lg font-semibold text-blue-700 mb-2">
              College Info
            </legend>
            <div className="grid md:grid-cols-3 gap-4">
              <input
                name="collegeId"
                placeholder="College ID"
                className="border p-2 rounded"
                value={formik.values.collegeId}
                onChange={(e) => {
                  formik.setFieldValue("collegeId", e.target.value);
                  setCollegeIdInput(e.target.value);
                }}
              />
              <input
                name="collegeName"
                placeholder="College Name"
                className="border p-2 rounded"
                value={formik.values.collegeName}
                onChange={formik.handleChange}
              />
              <select
                name="category"
                className="border p-2 rounded"
                value={formik.values.category}
                onChange={(e) => {
                  const val = e.target.value;
                  formik.setFieldValue("category", val);
                  const cat = categoryData.find((c) => c.category === val);
                  setSubCategories(cat?.subCategory || []);
                  formik.setFieldValue("subCategory", "");
                }}
              >
                <option value="">Select Category</option>
                {categoryData.map((cat) => (
                  <option key={cat.category} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className="border p-4 rounded-xl">
            <legend className="text-lg font-semibold text-blue-700 mb-2">
              Branch Selection
            </legend>
            <select
              name="subCategory"
              className="border p-2 rounded w-full"
              value={formik.values.subCategory}
              onChange={formik.handleChange}
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="border p-4 rounded-xl">
            <legend className="text-lg font-semibold text-blue-700 mb-2">
              Cutoff Details
            </legend>

            <div className="flex gap-4 flex-wrap items-center">
              {/* 👇 Searchable Caste Dropdown */}
              <div className="w-full md:w-1/3 border border-black rounded-md">
                <Select
                  options={allCastes.map((c) => ({
                    value: c._id,
                    label: c.caste,
                  }))}
                  placeholder="Search & select caste"
                  value={
                    casteCategory
                      ? allCastes
                          .map((c) => ({ value: c._id, label: c.caste }))
                          .find((opt) => opt.value === casteCategory)
                      : null
                  }
                  onChange={(selected) =>
                    setCasteCategory(selected?.value || "")
                  }
                  isSearchable
                />
              </div>

              {/* 👇 Caste Percentage Input */}
              <input
                type="number"
                placeholder="Enter %"
                value={castePercent}
                onChange={(e) => setCastePercent(e.target.value)}
                className="border p-2 rounded w-full md:w-1/3"
              />

              {/* 👇 Add Button */}
              <button
                type="button"
                onClick={handleAddCaste}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                ➕ Add Caste
              </button>
            </div>

            {/* 👇 Display Added Castes */}
            <div className="mt-4 flex gap-3 flex-wrap">
              {selectedCastes.map((item, i) => (
                <div
                  key={i}
                  className="bg-blue-100 px-4 py-2 rounded-full flex gap-2 items-center"
                >
                  <span>
                    {item.caste}: {item.percent}%
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCastes(
                        selectedCastes.filter((c) => c.caste !== item.caste)
                      )
                    }
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </fieldset>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded shadow-md"
            >
              🚀 Submit Cutoff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeCutoffForm;
