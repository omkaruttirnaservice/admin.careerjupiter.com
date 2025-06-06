import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as XLSX from "xlsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constant/constantBaseUrl";
import Cookies from "js-cookie";
import {
  FiPlus,
  FiUpload,
  FiXCircle,
  FiSave,
  FiDownload,
} from "react-icons/fi";
import Swal from "sweetalert2";

const AddTest = ({ onClose, onTestAdded }) => {
  let fileRef = useRef();
  const navigate = useNavigate();
  const { mainCategoryId, category } = useParams();
  const [fileName, setFileName] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    subCategory: "",
    type: "",
  });
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subItems, setSubItems] = useState([]);
  const [showSubInput, setShowSubInput] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [selectedSubType, setSelectedSubType] = useState("");
  const [newType, setNewType] = useState("");

  const initialValues = {
    testName: "",
    category: category || "",
    duration: "",
    passingMarks: "",
    totalMarks: "",
    totalQuestions: "",
    randomQuestions: false,
    excelFile: null,
    userType: "0",
    sub_category: "",
    reportType: "0",
  };

  const validateInput = (value) => {
    // Regex that allows letters, numbers, spaces, and hyphens
    const regex = /^[a-zA-Z0-9\s-]*$/;
    return regex.test(value);
  };

  const validationSchema = Yup.object({
    testName: Yup.string().required("Test Name is required"),
    duration: Yup.number().required("Duration is required"),
    passingMarks: Yup.number().required("Passing Marks are required"),
    totalMarks: Yup.number().required("Total Marks are required"),
    totalQuestions: Yup.number()
      .required("Total Questions are required")
      .min(1, "Must be at least 1"),
  });

  const handleAddSubCategory = async () => {
    if (!newSubCategory.trim()) {
      setError((prev) => ({
        ...prev,
        newSubCategory: "Subcategory Name is required",
      }));
      return;
    }

    if (!validateInput(newSubCategory)) {
      setError((prev) => ({
        ...prev,
        newSubCategory:
          "Only letters, numbers, spaces, and hyphens are allowed",
      }));
      return;
    }

    const token = Cookies.get("token");

    const updated = [...subCategories, { name: newSubCategory, sub: [] }];

    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/iq_category/${mainCategoryId}`,
        {
          sub_category: updated,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubCategories(updated);
      setNewSubCategory("");
      setShowSubInput(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Subcategory added!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error adding subcategory:", error);
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text:
          error.response?.data.errMsg ||
          "Failed to add subcategory. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleAddSubType = async () => {
    if (!newType.trim() || !selectedSubCategory) {
      setError((prev) => ({
        ...prev,
        newType: "Type Name is required",
      }));
      return;
    }

    if (!validateInput(newType)) {
      setError((prev) => ({
        ...prev,
        newType: "Only letters, numbers, spaces, and hyphens are allowed",
      }));
      return;
    }
    const token = Cookies.get("token");

    const updated = subCategories.map((sub) => {
      if (sub.name === selectedSubCategory.name) {
        return { ...sub, sub: [...(sub.sub || []), newType] };
      }
      return sub;
    });

    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/iq_category/${mainCategoryId}`,
        {
          sub_category: updated,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSubCategories(updated);
      setSubItems((prev) => [...prev, newType]);
      setNewType("");
      setShowTypeInput(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Type added!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error adding type:", error);
      Swal.fire({
        icon: "warning",
        title: "Type Addition Failed",
        text:
          error.response?.data?.errMsg ||
          "Could not add the type. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      const token = Cookies.get("token");
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/iq_category/${mainCategoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Subcategory API:", response.data);
        if (response.data?.data?.sub_category) {
          setSubCategories(response.data.data.sub_category);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);

        Swal.fire({
          icon: "warning",
          title: "Failed to Load Subcategories",
          text:
            error.response?.data?.errMsg ||
            "Unable to fetch subcategories. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    };

    if (mainCategoryId) {
      fetchSubCategories();
    }
  }, [mainCategoryId]);

  // Handle the Excel file upload
  const handleExcelUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFieldValue("excelFile", file);

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (jsonData.length === 0) {
          Swal.fire({
            icon: "warning",
            title: "Empty File",
            text: "The uploaded file contains no data. Please check and try again.",
            confirmButtonColor: "#f0ad4e",
          }).then(() => {
            setSelectedQuestions([]);
          });
        } else {
          let error = false;
          jsonData.some((question, index) => {
            if (question.question === undefined) {
              showWarnInQuestionUpload(index, "Main Question");
              error = true;
              return true;
            }

            if (question.optionA === undefined) {
              showWarnInQuestionUpload(index, "Option A");
              error = true;
              return true;
            }

            if (question.optionB === undefined) {
              showWarnInQuestionUpload(index, "Option B");
              error = true;
              return true;
            }

            if (question.optionC === undefined) {
              error = true;
              showWarnInQuestionUpload(index, "Option C");
              return true;
            }

            if (question.optionD === undefined) {
              error = true;
              showWarnInQuestionUpload(index, "Option D");
              return true;
            }

            if (question.marks === undefined) {
              error = true;
              showWarnInQuestionUpload(index, "Marks");
              return true;
            }

            if (question.chapterName === undefined) {
  error = true;
  showWarnInQuestionUpload(index, "Chapter Name");
  return true;
}

            return false;
          });
          if (error === false) {
            Swal.fire({
              icon: "success",
              title: `${jsonData.length} Question Found.`,
              text: "All Question are perfect. Good to Go.",
              confirmButtonColor: "#28a745",
            }).then(() => {
              setSelectedQuestions(jsonData);
            });
          } else {
            fileRef.current.value = "";
            setSelectedQuestions([]);
          }
        }
      };
    }
  };

  function showWarnInQuestionUpload(QuestionNumber, text) {
    Swal.fire({
      icon: "warning",
      title: `Issue in Question No. ${QuestionNumber + 1}`,
      text: `${text} is  missing, Please add in Excel and Upload again, Thank you.`,
      confirmButtonColor: "#d33",
    });
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    let isValid = true;
    let tempError = { subCategory: "", type: "" };

    if (!selectedSubCategory) {
      tempError.subCategory = "Please select a subcategory";
      isValid = false;
    }

    if (!selectedSubType) {
      tempError.type = "Please select a type";
      isValid = false;
    }

    setError(tempError);

    if (!isValid) {
      setSubmitting(false);
      return;
    }

    const finalQuestions = selectedQuestions;

    if (finalQuestions.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Question Not Found",
        text: "Question are missing, Please add The Question",
        confirmButtonColor: "#d33",
      });
      return false;
    }
    const requestData = {
      main_category: {
        mainCategoryId: mainCategoryId,
        name: category,
      },
      sub_category: selectedSubCategory.name,
      sub: selectedSubType,
      title: values.testName,
      questions: finalQuestions,
      testDuration: {
        minutes: Number(values.duration),
        seconds: 0,
      },
      totalQuestions: Number(values.totalQuestions),
      totalMarks: Number(values.totalMarks),
      passingMarks: Number(values.passingMarks),
      userType: Number(values.userType),
      reportType: Number(values.reportType),


    };

    console.log("Sending requestData to API:", requestData);

    try {
      await axios.post(`${API_BASE_URL}/api/iqtest/create`, requestData);
      Swal.fire({
        icon: "success",
        title: "Test Added",
        text: "Test added successfully!",
        confirmButtonColor: "#28a745",
      }).then(() => {
        onTestAdded();
      });
    } catch (error) {
      console.error("Error adding test:", error);
      Swal.fire({
        icon: "warning",
        title: "Test Creation Failed",
        text:
          error.response?.data?.errMsg ||
          "Failed to add test. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto space-y-6 border-3 border-blue-500 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-t-lg">
          <h2 className="text-3xl font-semibold">➕ Add New Test</h2>
          <button
            onClick={onClose}
            className="text-white text-3xl hover:text-red-600 transition-all duration-300 cursor-pointer"
          >
            &times;
          </button>
        </div>

        <hr />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6 px-4">
              {/* Test Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Test Name
                </label>
                <Field
                  name="testName"
                  type="text"
                  className="w-full border rounded-md p-2 focus:outline-blue-400 shadow-sm"
                />
                <ErrorMessage
                  name="testName"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              {/* Category  +  Type Selection */}
              

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">
                    Subcategory
                  </label>
                  <div className="flex gap-2 items-center">
                    <select
                      className="w-full border p-2 rounded-md"
                      onChange={(e) => {
                        const selected = subCategories.find(
                          (sc) => sc.name === e.target.value
                        );
                        setSelectedSubCategory(selected);
                        setSubItems(selected?.sub || []);
                        setError((prev) => ({
                          ...prev,
                          subCategory: e.target.value
                            ? ""
                            : "Please select a subcategory",
                        }));
                      }}
                    >
                      <option value="">Select Subcategory</option>
                      {subCategories.map((subCat) => (
                        <option key={subCat._id} value={subCat.name}>
                          {subCat.name}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => setShowSubInput(!showSubInput)}
                      className="text-blue-600 hover:text-blue-800 text-xl cursor-pointer"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  {error.subCategory && (
                    <div className="text-red-500 text-sm mt-1">
                      {error.subCategory}
                    </div>
                  )}

                  {showSubInput && (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="New Subcategory"
                        value={newSubCategory}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (validateInput(value) || value === "") {
                            setNewSubCategory(value);
                            setError((prev) => ({
                              ...prev,
                              newSubCategory: "",
                            }));
                          } else {
                            setError((prev) => ({
                              ...prev,
                              newSubCategory:
                                "Only letters, numbers, spaces, and hyphens are allowed",
                            }));
                          }
                        }}
                        className="border p-2 rounded-md w-full"
                      />
                      <button
                        onClick={handleAddSubCategory}
                        type="button"
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                      >
                        ✅
                      </button>
                    </div>
                  )}
                  {error.newSubCategory && (
                    <p className="text-red-500 text-sm">
                      {error.newSubCategory}
                    </p>
                  )}
                </div>

                {/* Type Section */}
                {selectedSubCategory && (
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <div className="flex gap-2 items-center">
                      <select
                        className="w-full border p-2 rounded-md"
                        value={selectedSubType}
                        onChange={(e) => {
                          setSelectedSubType(e.target.value);
                          setError((prev) => ({
                            ...prev,
                            type: e.target.value ? "" : "Please select a type",
                          }));
                        }}
                      >
                        <option value="">Select Type</option>
                        {subItems.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => setShowTypeInput(!showTypeInput)}
                        className="text-blue-600 hover:text-blue-800 text-xl cursor-pointer"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    {error.type && (
                      <div className="text-red-500 text-sm mt-1">
                        {error.type}
                      </div>
                    )}

                    {showTypeInput && (
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          placeholder="New Type"
                          value={newType}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (validateInput(value) || value === "") {
                              setNewType(value);
                              setError((prev) => ({ ...prev, newType: "" }));
                            } else {
                              setError((prev) => ({
                                ...prev,
                                newType:
                                  "Only letters, numbers, spaces, and hyphens are allowed",
                              }));
                            }
                          }}
                          className="border p-2 rounded-md w-full"
                        />
                        <button
                          onClick={handleAddSubType}
                          type="button"
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                        >
                          ✅
                        </button>
                      </div>
                    )}
                    {error.newType && (
                      <p className="text-red-500 text-sm">{error.newType}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Marks & Duration Section */}
              <div className="grid grid-cols-3 gap-6">
                {["duration", "passingMarks", "totalMarks"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium text-gray-700 capitalize">
                      {field.replace(/([A-Z])/g, " $1")}:
                    </label>
                    <Field
                      name={field}
                      type="number"
                      className="w-full border p-2 rounded-md focus:outline-blue-400"
                    />
                    <ErrorMessage
                      name={field}
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                ))}
              </div>

              {/* Questions Count */}
              <div>
                <label className="block font-medium text-gray-700">
                  Total Questions Required:
                </label>
                <Field
                  name="totalQuestions"
                  type="number"
                  className="w-full border p-2 rounded-md focus:outline-blue-400"
                />
                <ErrorMessage
                  name="totalQuestions"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              {/* Checkbox + Radio */}
              <div>
                <label className="block font-medium text-gray-700">
                  User Type:
                </label>
                <div className="flex gap-6 mt-1">
                  <label className="flex items-center gap-2 text-gray-600">
                    <Field
                      type="radio"
                      name="userType"
                      value="0"
                      className="w-4 h-4"
                    />
                    Without Login
                  </label>
                  <label className="flex items-center gap-2 text-gray-600">
                    <Field
                      type="radio"
                      name="userType"
                      value="1"
                      className="w-4 h-4"
                    />
                    With Login
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Report Type:
                </label>
                <div className="flex gap-6 mt-1">
                  <label className="flex items-center gap-2 text-gray-600">
                    <Field
                      type="radio"
                      name="reportType"
                      value="1"
                      className="w-4 h-4"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-gray-600">
                    <Field
                      type="radio"
                      name="reportType"
                      value="0"
                      className="w-4 h-4"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block font-medium text-gray-700">
                  Upload Excel File:
                </label>
                <div className="flex gap-4 items-center mt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <FiUpload className="text-lg text-gray-500" />
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".xlsx, .xls"
                      className="hidden"
                      onChange={(e) => handleExcelUpload(e, setFieldValue)}
                    />
                    <span className="text-gray-600">Choose File</span>
                  </label>

                  <a
                    href="/IQTest_Sample.xlsx"
                    download
                    className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                  >
                    <FiDownload /> Sample Excel
                  </a>
                </div>
                {fileName && (
                  <p className="text-sm text-gray-500 mt-1">
                    Selected: {fileName}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4 gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all w-1/2 cursor-pointer"
                >
                  <FiSave /> {isSubmitting ? "Saving..." : "Save Test"}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all w-1/2 cursor-pointer"
                >
                  <FiXCircle /> Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTest;
