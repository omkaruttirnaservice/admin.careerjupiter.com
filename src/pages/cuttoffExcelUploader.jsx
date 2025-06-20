// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl";

// const CutoffExcelUploader = () => {
//   const [excelData, setExcelData] = useState([]);
//   const [fileName, setFileName] = useState("");

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setFileName(file.name);
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const binaryStr = event.target.result;
//       const workbook = XLSX.read(binaryStr, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet);
//       setExcelData(jsonData);
//     };

//     reader.readAsBinaryString(file);
//   };

// const handleUpload = async () => {
//   const fileInput = document.getElementById("excelFile");
//   const file = fileInput?.files?.[0];

//   if (!file) {
//     alert("Please select an Excel file first.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("file", file); // ✅ exact key: 'file'

//   try {
//     const response = await axios.post(
//        `${API_BASE_URL}/api/cutoff/upload-excel`, // 🔁 replace with your baseurl
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data", // ✅ Required for file upload
//         },
//       }
//     );

//     alert("Upload successful!");
//     console.log(response.data);
//   } catch (error) {
//     console.error("Upload error:", error.response?.data || error);
//     alert(
//       error.response?.data?.usrMsg || "Upload failed due to server error."
//     );
//   }
// };

//   return (
//     <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg">
//       <h2 className="text-xl font-bold mb-4 text-blue-600">Upload Cutoff Excel</h2>

//       <input
//         type="file"
//         id="excelFile"
//         accept=".xlsx, .xls"
//         onChange={handleFileChange}
//         className="mb-4"
//       />

//       {fileName && <p className="text-sm text-gray-600 mb-2">Selected File: {fileName}</p>}

//       <button
//         onClick={handleUpload}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Upload Excel
//       </button>

//       {excelData.length > 0 && (
//         <div className="mt-6 max-h-60 overflow-auto border rounded">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr>
//                 {Object.keys(excelData[0]).map((head, i) => (
//                   <th key={i} className="border px-2 py-1 bg-gray-100">
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {excelData.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {Object.values(row).map((val, colIndex) => (
//                     <td key={colIndex} className="border px-2 py-1">
//                       {val}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CutoffExcelUploader;

import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { FileUp, FileText } from "lucide-react"; // ✅ Optional: for icon usage
import Swal from "sweetalert2";

const CutoffExcelUploader = () => {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [warning, setWarning] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  //   const handleUpload = async () => {
  //     const fileInput = document.getElementById("excelFile");
  //     const file = fileInput?.files?.[0];

  //     if (!file) {
  //       alert("Please select an Excel file first.");
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("file", file);

  //     try {
  //       const response = await axios.post(
  //         `${API_BASE_URL}/api/cutoff/upload-excel`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       alert("Upload successful!");
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Upload error:", error.response?.data || error);
  //       alert(error.response?.data?.usrMsg || "Upload failed due to server error.");
  //     }
  //   };

 const getBracketValue = (val) => {
  if (typeof val === "string" && val.includes("(")) {
    const parts = val.split("(");
    return parts[parts.length - 1].replace(")", "").trim();
  }
  return val;
};


  const handleUpload = async () => {
    const fileInput = document.getElementById("excelFile");
    const file = fileInput?.files?.[0];

    if (!file) {
      setWarning("Please select an Excel file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/cutoff/upload-excel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "Your Excel file has been uploaded successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        console.log(response.data);

        // ✅ Clear fields after user closes the SweetAlert
        setFileName("");
        setExcelData([]);
        if (fileInput) fileInput.value = "";
      });
    } catch (error) {
      console.error("Upload error:", error.response?.data || error);
      Swal.fire({
        icon: "warning",
        title: "Upload Failed",
        text:
          error.response?.data?.usrMsg || "Upload failed due to server error.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 transition-all">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
          <FileUp className="text-indigo-500" />
          Upload Cutoff Excel
        </h2>

        <div className="mb-6">
          <label
            htmlFor="excelFile"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Select Excel File
          </label>
          <input
            type="file"
            id="excelFile"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="block w-full rounded border border-gray-300 p-2 shadow-sm"
          />
          {warning && <p className="text-sm text-red-600 mb-2">{warning}</p>}
        </div>

        {fileName && (
          <div className="mb-4 text-sm text-gray-600">
            <FileText className="inline w-4 h-4 mr-1" />
            <strong>Selected:</strong> {fileName}
          </div>
        )}

        {/* <div className="mb-4">
          <a
            href="/sample_cutoff_format.xlsx"
            download
            className="inline-flex items-center text-blue-600 underline text-sm hover:text-blue-800"
          >
            📄 Download Sample Excel Format
          </a>
        </div> */}

        <button
          onClick={handleUpload}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-lg font-semibold shadow-md"
        >
          Upload Excel
        </button>

        {excelData.length > 0 && (
          <div className="mt-8 overflow-auto max-h-80 border rounded shadow-inner">
            <table className="min-w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-indigo-100 z-10">
                <tr>
                  {Object.keys(excelData[0]).map((head, i) => (
                    <th
                      key={i}
                      className="border px-3 py-2 font-semibold text-indigo-700"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* {excelData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="even:bg-gray-50">
                    {Object.values(row).map((val, colIndex) => (
                      <td
                        key={colIndex}
                        className="border px-3 py-1 text-gray-700"
                      >
                        {val}
                      </td>
                    ))}
                    <td
                      key={colIndex}
                      className="border px-3 py-1 text-gray-700"
                    >
                      {getBracketValue(val)}
                    </td>
                  </tr>
                ))} */}

                <tbody>
  {excelData.map((row, rowIndex) => (
    <tr key={rowIndex} className="even:bg-gray-50">
      {Object.values(row).map((val, colIndex) => (
        <td key={colIndex} className="border px-3 py-1 text-gray-700">
          {getBracketValue(val)} {/* ✅ FIXED HERE */}
        </td>
      ))}
    </tr>
  ))}
</tbody>

              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CutoffExcelUploader;
