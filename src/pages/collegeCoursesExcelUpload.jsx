// import React, { useState } from "react";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import Swal from "sweetalert2";
import { FileUp, FileText } from "lucide-react";

const CollegeCoursesExcelUpload = () => {
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
        `${API_BASE_URL}/api/college/course/upload`, // 🛠️ Update to correct endpoint
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
        text: response.data?.message || "College Courses uploaded successfully!",
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
  <div
    className="
    min-h-screen
    bg-gradient-to-br
    from-blue-50
    via-white
    to-indigo-50
    p-6
    "
  >

    <div
      className="
      max-w-6xl
      mx-auto
      bg-white
      rounded-2xl
      shadow-xl
      border
      border-blue-100
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
        flex
        items-center
        gap-4
        "
      >

        <div
          className="
          bg-white/20
          p-3
          rounded-xl
          "
        >
          <FileUp size={32}/>
        </div>


        <div>
          <h2 className="text-2xl font-bold">
            Upload College Courses Excel
          </h2>

          <p className="text-blue-100 text-sm mt-1">
            Upload bulk college course details using Excel file
          </p>
        </div>

      </div>



      {/* Body */}
      <div className="p-8">


        {/* Upload Area */}
        <div
          className="
          border-2
          border-dashed
          border-blue-300
          rounded-2xl
          p-8
          text-center
          bg-blue-50/50
          hover:border-blue-500
          transition
          "
        >

          <FileUp
            size={45}
            className="
            mx-auto
            text-blue-600
            mb-4
            "
          />


          <label
            className="
            block
            text-lg
            font-semibold
            text-gray-700
            mb-3
            "
          >
            Select College Courses Excel File
          </label>


          <input
            type="file"
            id="excelFile"
            ref={fileInputRef}
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="
            mx-auto
            block
            max-w-md
            w-full
            bg-white
            border
            border-gray-300
            rounded-lg
            p-3
            cursor-pointer
            shadow-sm
            "
          />


          {warning && (
            <p
              className="
              text-red-500
              mt-3
              text-sm
              font-semibold
              "
            >
              {warning}
            </p>
          )}

        </div>




        {/* Selected File */}
        {fileName && (

          <div
            className="
            mt-5
            flex
            items-center
            gap-2
            bg-green-50
            border
            border-green-200
            rounded-lg
            p-3
            text-green-700
            "
          >

            <FileText size={18}/>

            <span>
              Selected:
              <b className="ml-1">
                {fileName}
              </b>
            </span>

          </div>

        )}






        {/* Sample Download */}
        <div className="mt-6">

          <a
            href="/Sample_College_Courses.xlsx"
            download
            className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            bg-gray-100
            text-blue-700
            font-semibold
            text-sm
            hover:bg-blue-600
            hover:text-white
            transition
            "
          >

            📥 Download Sample Excel Format

          </a>

        </div>






        {/* Upload Button */}
        <div className="mt-6 flex justify-end">

          <button
            onClick={handleUpload}
            className="
            flex
            items-center
            gap-2
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            text-white
            font-semibold
            shadow-lg
            hover:shadow-xl
            hover:scale-105
            transition-all
            "
          >

            <FileUp size={20}/>

            Upload Courses

          </button>

        </div>






        {/* Excel Preview */}
        {excelData.length > 0 && (

          <div
            className="
            mt-8
            border
            rounded-xl
            overflow-hidden
            shadow-inner
            "
          >

            <div
              className="
              bg-blue-50
              px-5
              py-3
              font-bold
              text-indigo-800
              border-b
              "
            >
              📊 Excel Preview
            </div>



            <div
              className="
              overflow-auto
              max-h-[450px]
              "
            >

            <table
              className="
              min-w-full
              text-sm
              border-collapse
              "
            >

              <thead
                className="
                sticky
                top-0
                bg-indigo-100
                z-10
                "
              >

                <tr>

                {Object.keys(excelData[0]).map((col,i)=>(

                  <th
                    key={i}
                    className="
                    border
                    px-4
                    py-3
                    text-left
                    font-bold
                    text-indigo-700
                    "
                  >
                    {col}
                  </th>

                ))}

                </tr>

              </thead>



              <tbody>

              {excelData.map((row,rowIndex)=>(

                <tr
                  key={rowIndex}
                  className="
                  even:bg-gray-50
                  hover:bg-blue-50
                  transition
                  "
                >

                  {Object.values(row).map((val,colIndex)=>(

                    <td
                      key={colIndex}
                      className="
                      border
                      px-4
                      py-2
                      text-gray-700
                      "
                    >
                      {val || "-"}
                    </td>

                  ))}

                </tr>

              ))}

              </tbody>


            </table>

            </div>

          </div>

        )}


      </div>

    </div>

  </div>
);
};

export default CollegeCoursesExcelUpload;
