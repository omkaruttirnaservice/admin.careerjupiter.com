// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const AddTest = () => {
//   const initialValues = {
//     testName: "",
//     category: "",
//     duration: "",
//     passingMarks: "",
//     currentMarks: "",
//   };

//   const validationSchema = Yup.object({
//     testName: Yup.string().required("Required"),
//     category: Yup.string().required("Required"),
//     duration: Yup.string().required("Required"),
//     passingMarks: Yup.number().required("Required"),
//     currentMarks: Yup.number().required("Required"),
//   });

//   const handleSubmit = (values) => {
//     console.log("Form submitted:", values);
//   };

//   return (
//     <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
//       <h3 className="text-xl font-bold mb-4">Add Test</h3>
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//         <Form className="space-y-4">
//           <label>Test Name:</label>
//           <Field type="text" name="testName" placeholder="Test Name" className="border p-2 w-full rounded"/>
//           <ErrorMessage name="testName" component="div" className="text-red-500" />

//           <label>Category:</label>
//           <Field as="select" name="category"  className="border p-2 w-full rounded">
//             <option value="">Select</option>
//             <option value="Diploma">Diploma</option>
//             <option value="Engineering">Engineering</option>
//           </Field>
//           <ErrorMessage name="category" component="div" style={{ color: "red" }} />

//           <label>Duration:</label>
//           <Field type="text" name="duration"  placeholder="Duration" className="border p-2 w-full rounded"/>
//           <ErrorMessage name="duration" component="div"  className="text-red-500"  />

//           <label>Passing Marks:</label>
//           <Field type="number" name="passingMarks" placeholder="Passing Marks" className="border p-2 w-full rounded"/>
//           <ErrorMessage name="passingMarks" component="div"  className="text-red-500" />

//           <label>Current Marks:</label>
//           <Field type="number" name="currentMarks" className="border p-2 w-full rounded" />
//           <ErrorMessage name="currentMarks" component="div"  className="text-red-500"/>

//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default AddTest;


import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../../Constant/constantBaseUrl";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddTest = ({ onClose }) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [fileName, setFileName] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const initialValues = {
    testName: "",
    category: category || "",
    duration: "",
    passingMarks: "",
    totalMarks: "",
    totalQuestions: "",
    randomQuestions: false,
    excelFile: null,
  };

  const validationSchema = Yup.object({
    testName: Yup.string().required("Test Name is required"),
    category: Yup.string().required("Category is required"),
    duration: Yup.number().required("Duration is required"),
    passingMarks: Yup.number().required("Passing Marks are required"),
    totalMarks: Yup.number().required("Total Marks are required"),
    totalQuestions: Yup.number().required("Total Questions are required").min(1, "Must be at least 1"),
  });

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
          alert("The uploaded file contains no data!");
          setSelectedQuestions([]);
        } else {
          setSelectedQuestions(jsonData);
        }
      };
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    let finalQuestions = selectedQuestions;
    const totalQ = Number(values.totalQuestions);

    if (values.randomQuestions && selectedQuestions.length > totalQ) {
const uniqueQuestions = new Set();

 // Keep selecting random questions until Set reaches required size
 while (uniqueQuestions.size < totalQ) {
  const randomIndex = Math.floor(Math.random() * selectedQuestions.length);
  uniqueQuestions.add(selectedQuestions[randomIndex]);
}

finalQuestions = Array.from(uniqueQuestions);
} else {
  finalQuestions = selectedQuestions.slice(0, totalQ);
}

    const requestData = {
      title: values.testName,
      testLevel: values.category,
      testDuration: Number(values.duration),
      totalMarks: Number(values.totalMarks),
      questions: finalQuestions,
    };

    console.log("Sending requestData to API:", requestData);

    try {
      await axios.post(`${API_BASE_URL}/api/iqtest/`, requestData);
      alert("Test added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding test:", error);
      alert("Failed to add test");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black/50 backdrop-blur-sm overflow-y-auto z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[800px] relative animate-fadeIn z-50 overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-700">➕ Add New Test</h3>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col space-y-4">
              <div>
                <label className="block text-md font-semibold text-gray-600">Test Name:</label>
                <Field type="text" name="testName" className="w-full border p-2 rounded-md focus:outline-blue-500" />
                <ErrorMessage name="testName" component="div" className="text-red-500 text-xs" />
              </div>

              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-md font-semibold text-gray-600">Category:</label>
                <Field as="select" name="category" className="w-full border p-2 rounded-md focus:outline-blue-500">
                  <option value="">Select</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="HSC">HSC</option>
                  <option value="UG">UG</option>
                  <option value="SSC">SSC</option>
                  <option value="PG">PG</option>
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-xs" />
              </div>

              <div>
                <label className="block text-md font-semibold text-gray-600">Duration (min):</label>
                <Field type="number" name="duration" step="any" className="w-full border p-2 rounded-md focus:outline-blue-500" />
                <ErrorMessage name="duration" component="div" className="text-red-500 text-xs" />
              </div>

              <div>
                <label className="block text-md font-semibold text-gray-600">Passing Marks:</label>
                <Field type="number" name="passingMarks" step="any" className="w-full border p-2 rounded-md focus:outline-blue-500" />
                <ErrorMessage name="passingMarks" component="div" className="text-red-500 text-xs" />
              </div>

              <div>
                <label className="block text-md font-semibold text-gray-600">Total Marks:</label>
                <Field type="number" name="totalMarks" step="any" className="w-full border p-2 rounded-md focus:outline-blue-500" />
                <ErrorMessage name="totalMarks" component="div" className="text-red-500 text-xs" />
              </div>
              </div>

              <div>
                <label className="block text-md font-semibold text-gray-600">Total Questions Required:</label>
                <Field type="number" name="totalQuestions" step="any" className="w-full border p-2 rounded-md focus:outline-blue-500" />
                <ErrorMessage name="totalQuestions" component="div" className="text-red-500 text-xs" />
              </div>

              <div className="flex items-center gap-2">
                <Field type="checkbox" name="randomQuestions" className="w-4 h-4" />
                <label className="text-gray-600">Random Questions</label>
              </div>

              <input type="file" accept=".xlsx, .xls" className="border p-2 rounded-md" onChange={(e) => handleExcelUpload(e, setFieldValue)} />
              {fileName && <p className="text-gray-500 text-sm">Selected File: {fileName}</p>}

              <div className="flex justify-between mt-4 gap-12">
                <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600 transition-all w-1/2">
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={onClose} className="bg-gray-400 text-white px-2 py-2 rounded-md hover:bg-gray-500 transition-all w-1/2">
                  Close
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
