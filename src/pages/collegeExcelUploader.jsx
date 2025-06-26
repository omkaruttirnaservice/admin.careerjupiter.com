// import React, { useState } from "react";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import Swal from "sweetalert2";
import { FileUp, FileText } from "lucide-react";

const CollegeExcelUploader = () => {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [warning, setWarning] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" }); // ✅ Empty cells become ""
      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    const fileInput = document.getElementById("excelFile");
    const file = fileInput?.files?.[0];

    if (!file) {
      setWarning("Please select an Excel file first.");
      return;
    }

    const formData = new FormData();
    formData.append("files", file); // ✅ backend expects this key

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/college/upload`, // 🛠️ Update to correct endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ✅ Let browser handle boundary
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: response.data?.message || "Colleges uploaded successfully!",
      });

      // Optional: Reset form
      setFileName("");
      setExcelData([]);
      fileInput.value = "";
    } catch (error) {
      console.error("Upload error:", error);

      Swal.fire({
        icon: "warning",
        title: "Upload Failed",
        text:
          error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          "Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
          <FileUp className="text-indigo-500" />
          Upload College Excel
        </h2>

        <div className="mb-6">
          <label
            htmlFor="collegeExcelFile"
            className="font-semibold block mb-2"
          >
            Select Excel File
          </label>

          <input
            type="file"
            id="excelFile"
            ref={fileInputRef} // 👈 important
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="block w-full rounded border border-gray-300 p-2 shadow-sm"
          />

          {warning && <p className="text-sm text-red-600">{warning}</p>}
        </div>

        {fileName && (
          <div className="mb-4 text-gray-700 text-sm">
            <FileText className="inline w-4 h-4 mr-1" />
            <strong>Selected:</strong> {fileName}
          </div>
        )}

        <div className="mb-4">
          <a
            href="/Sample_College_Excel.xlsx"
            download
            className="text-blue-600 underline text-sm"
          >
            📄 Download Sample College Excel Format
          </a>
        </div>

        <button
          onClick={handleUpload}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow"
        >
          Upload Excel
        </button>

        {excelData.length > 0 && (
          <div className="mt-8 overflow-auto max-h-[500px] border rounded shadow-inner">
            <table className="min-w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-indigo-100 z-10">
                <tr>
                  {Object.keys(excelData[0]).map((col, i) => (
                    <th
                      key={i}
                      className="border px-3 py-2 text-left font-semibold text-indigo-700"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="even:bg-gray-50">
                    {Object.values(row).map((val, colIndex) => (
                      <td
                        key={colIndex}
                        className="border px-3 py-1 text-gray-700"
                      >
                        {val || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeExcelUploader;
