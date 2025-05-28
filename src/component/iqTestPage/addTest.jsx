import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as XLSX from "xlsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constant/constantBaseUrl";
import Cookies from "js-cookie";
import { FiUpload, FiSave, FiDownload, FiFile } from "react-icons/fi";
import Swal from "sweetalert2";

const AddTest = ({ onClose, onTestAdded }) => {
  let fileRef = useRef();
  const navigate = useNavigate();
  const { mainCategoryId, category } = useParams();
  const [fileName, setFileName] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subItems, setSubItems] = useState([]);
  const [showSubInput, setShowSubInput] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [selectedSubType, setSelectedSubType] = useState("");
  const [newType, setNewType] = useState("");
  const [error, setError] = useState({
    subCategory: "",
    type: "",
  });

  // Initialized Value for the form
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
    // Regex that allows letters, numbers, spaces, and hyphens (Validation)
    const regex = /^[a-zA-Z0-9\s-]*$/;
    return regex.test(value);
  };

  // Validation Section Area
  const validationSchema = Yup.object({
    testName: Yup.string()
      .required("Test Name is required")
      .matches(
        /^[a-zA-Z0-9\s-]*$/,
        "Only letters, numbers, spaces, and hyphens are allowed"
      ),

    duration: Yup.number()
      .typeError("Duration must be a number")
      .required("Duration is required")
      .min(0, "Duration cannot be negative"),

    passingMarks: Yup.number()
      .typeError("Passing Marks must be a number")
      .required("Passing Marks are required")
      .min(0, "Passing Marks cannot be negative"),

    totalMarks: Yup.number()
      .typeError("Total Marks must be a number")
      .required("Total Marks are required")
      .min(0, "Total Marks cannot be negative"),

    totalQuestions: Yup.number()
      .typeError("Total Questions must be a number")
      .required("Total Questions are required")
      .min(1, "Total Questions must be at least 1"),

    userType: Yup.number()
      .required("User type is required")
      .oneOf([0, 1], "User type must be 0 or 1"),

    reportType: Yup.number()
      .required("Report type is required")
      .oneOf([0, 1], "Report type must be 0 or 1"),
  });

  // Adding Sub Category is handled
  const handleAddSubCategory = async () => {
    if (!newSubCategory.trim()) {
      setError((prev) => ({
        ...prev,
        newSubCategory: "Subcategory Name is required",
      }));
      return;
    }

    // Validation for the new field adding the sub category
    if (!validateInput(newSubCategory)) {
      setError((prev) => ({
        ...prev,
        newSubCategory:
          "Only letters, numbers, spaces, and hyphens are allowed",
      }));
      return;
    }

    // Set the token
    const token = Cookies.get("token");
    // Set sub categories in updated
    const updated = [...subCategories, { name: newSubCategory, sub: [] }];
    // Add New Sub category using put method
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

  // // Adding Sub Type is handled
  const handleAddSubType = async () => {
    if (!newType.trim() || !selectedSubCategory) {
      setError((prev) => ({
        ...prev,
        newType: "Type Name is required",
      }));
      return;
    }
    // Validation for type
    if (!validateInput(newType)) {
      setError((prev) => ({
        ...prev,
        newType: "Only letters, numbers, spaces, and hyphens are allowed",
      }));
      return;
    }
    const token = Cookies.get("token");
    // Set Sub type based on sub category
    const updated = subCategories.map((sub) => {
      if (sub.name === selectedSubCategory.name) {
        return { ...sub, sub: [...(sub.sub || []), newType] };
      }
      return sub;
    });
    // Adding new type using put method
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

  // Fetch Sub Category for the dropdown
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

  // Handle Form Submit
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
        text: "Questions are missing, Please add The Questions",
        confirmButtonColor: "#d33",
      });
      return false;
    }
    // Payload
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
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm"></div>
      {/* Main modal container */}
      <div className="relative bg-white  shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-blue-700 text-white p-4 rounded-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="p-2 border-3 rounded-lg">
                <span className="text-2xl">
                  {" "}
                  <FiFile />
                </span>
              </div>
              {/* Heading */}
              <h2 className="text-xl font-semibold">Create New Test</h2>
            </div>
            {/* Close button in header */}
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:text-red-600  transition-colors"
              aria-label="Close"
            >
              <span className="text-3xl">×</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Test Name */}
                <div>
                  <label className="block font-medium text-blue-800 mb-1">
                    Test Name
                  </label>
                  <Field
                    name="testName"
                    type="text"
                    className="w-full px-4 py-3 bg-white border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 border-2"
                  />
                  <ErrorMessage
                    name="testName"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Category + Type Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-md font-medium text-blue-800 mb-2 ml-1">
                      Subcategory
                    </label>
                    <div className="flex gap-2 items-center">
                      <select
                        className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
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
                      {/* Add Sub Category Button */}
                      <button
                        type="button"
                        onClick={() => setShowSubInput(!showSubInput)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors duration-200 border-2"
                      >
                        <span className="text-xl text-blue-800">＋</span>
                      </button>
                    </div>
                    {/* Error Message for Sub Category */}
                    {error.subCategory && (
                      <div className="text-red-500 text-sm mt-1">
                        {error.subCategory}
                      </div>
                    )}
                    {/* Show input field for adding new sub category */}
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
                          className="flex-1 px-4 py-2 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 bg-white"
                        />
                        {/* Save that newly added sub category */}
                        <button
                          onClick={handleAddSubCategory}
                          type="button"
                          className="px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-200"
                        >
                          <span className="text-lg">✓</span>
                        </button>
                      </div>
                    )}
                    {/* Show error for new added sub category */}
                    {error.newSubCategory && (
                      <p className="text-red-500 text-sm">
                        {error.newSubCategory}
                      </p>
                    )}
                  </div>

                  {/* Type Section */}
                  {/* Opens when sub category selected and opens the type field as per */}
                  {selectedSubCategory && (
                    <div>
                      <label className="block text-md font-medium text-blue-800 mb-2 ml-1">
                        Type
                      </label>
                      <div className="flex gap-2 items-center">
                        <select
                          className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                          value={selectedSubType}
                          onChange={(e) => {
                            setSelectedSubType(e.target.value);
                            setError((prev) => ({
                              ...prev,
                              type: e.target.value
                                ? ""
                                : "Please select a type",
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
                        {/* Add new type button */}
                        <button
                          type="button"
                          onClick={() => setShowTypeInput(!showTypeInput)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl transition-colors duration-200 border-2"
                        >
                          <span className="text-xl text-blue-800">＋</span>
                        </button>
                      </div>
                      {/* shows error for the type dropdown */}
                      {error.type && (
                        <div className="text-red-500 text-sm mt-1">
                          {error.type}
                        </div>
                      )}
                      {/* Add new type input field */}
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
                            className="flex-1 px-4 py-2 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 bg-white"
                          />
                          {/* Save new type button */}
                          <button
                            onClick={handleAddSubType}
                            type="button"
                            className="px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-200"
                          >
                            <span className="text-lg">✓</span>
                          </button>
                        </div>
                      )}
                      {/* Error for newly added type */}
                      {error.newType && (
                        <p className="text-red-500 text-sm">{error.newType}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Questions Count */}
                <div className="grid grid-cols-4 gap-2">
                  {/* Total Questions */}
                  <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-800">
                    <label className="block text-md font-medium text-blue-800 mb-1 capitalize">
                      Total Questions Required:
                    </label>
                    <Field
                      name="totalQuestions"
                      type="number"
                      className="w-full px-3 py-2 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="totalQuestions"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  {/* Duration, Passing Marks, Total Marks */}
                  {["duration", "passingMarks", "totalMarks"].map((field) => (
                    <div
                      key={field}
                      className="bg-blue-50 p-3 rounded-lg border-2 border-blue-800"
                    >
                      <label className="block text-md font-medium text-blue-800 mb-1 capitalize">
                        {field.replace(/([A-Z])/g, " $1")}:
                      </label>
                      <Field
                        name={field}
                        type="number"
                        className="w-full mt-5 px-3 py-2 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400"
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  ))}
                </div>

                {/* Checkbox + Radio */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-xl shadow-sm border-2 border-blue-800">
                    <label className="block text-md font-medium text-blue-800 mb-3 ml-1">
                      User Type:
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-blue-800">
                        <Field
                          type="radio"
                          name="userType"
                          value="0"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">Without Login</span>
                      </label>
                      <label className="flex items-center gap-2 text-blue-800">
                        <Field
                          type="radio"
                          name="userType"
                          value="1"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">With Login</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl shadow-sm border-2 border-blue-800">
                    <label className="block text-md font-medium text-blue-800 mb-3 ml-1 ">
                      {/* Report Type: */} Generate Report?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-blue-800">
                        <Field
                          type="radio"
                          name="reportType"
                          value="1"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 text-blue-800">
                        <Field
                          type="radio"
                          name="reportType"
                          value="0"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-md font-medium text-blue-800 mb-3 ml-1">
                    Upload Excel File:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <label className="flex-1 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-blue-50/50 hover:bg-blue-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="text-2xl mb-2">
                          {" "}
                          <FiUpload />{" "}
                        </span>
                        <p className="text-sm text-blue-700">
                          Click to upload Excel file
                        </p>
                      </div>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".xlsx, .xls"
                        className="hidden"
                        onChange={(e) => handleExcelUpload(e, setFieldValue)}
                      />
                    </label>
                    {/* Sample Excel included here */}
                    <a
                      href="/IQTest_Sample.xlsx"
                      download
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-lg">
                        {" "}
                        <FiDownload />{" "}
                      </span>
                      <span>Sample Template</span>
                    </a>
                  </div>
                  {/* Shows the name of selected file */}
                  {fileName && (
                    <p className="text-sm text-blue-600 ml-1">
                      Selected: <span className="font-medium">{fileName}</span>
                    </p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    <span className="text-lg">
                      {" "}
                      <FiSave />{" "}
                    </span>
                    <span>{isSubmitting ? "Saving..." : "Save Test"}</span>
                  </button>
                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-300 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <span className="text-lg">✕</span>
                    <span>Cancel</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddTest;
