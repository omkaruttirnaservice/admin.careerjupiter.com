import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "../constant/constantBaseUrl";

const UploadCollegeExcel = () => {
  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("Excel file is required")
        .test("fileType", "Only .xlsx or .xls files are allowed", (value) =>
          value ? ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"].includes(value.type) : false
        ),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("file", values.file);

        const response = await axios.post(
          `${API_BASE_URL}/api/college/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Upload successful!");
        resetForm();
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload College Excel</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="file"
          name="file"
          accept=".xlsx,.xls"
          onChange={(event) => formik.setFieldValue("file", event.currentTarget.files[0])}
          className="mb-2 block w-full border p-2 rounded"
        />
        {formik.errors.file && formik.touched.file && (
          <div className="text-red-600 text-sm">{formik.errors.file}</div>
        )}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {formik.isSubmitting ? "Uploading..." : "Upload Excel"}
        </button>
      </form>
    </div>
  );
};

export default UploadCollegeExcel;
