// import React, { useState } from 'react';
// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { FaCloudUploadAlt } from "react-icons/fa";

// import { API_BASE_URL } from "../../constant/constantBaseUrl";


// const ExcelUpload = () => {
  
//   const [selectedFile, setSelectedFile] = useState(null);

//   const uploadMutation = useMutation({
//     mutationFn: async (file) => {
//       const formData = new FormData();
//       formData.append('file', file);
//       const response = await axios.post(`${API_BASE_URL}/api/college/upload`, formData);

//       console.log(response,'response')
//       return response.data;
//     },
//     onSuccess: (data) => {
//       Swal.fire({
//         icon: 'success',
//         title: 'Uploaded Successfully',
//         text: `${data.message}\nCourses Updated: ${data.collegeCoursesUpdated}`,
//         confirmButtonColor: '#3085d6',
//       });
//     },
//     onError: () => {
//       Swal.fire({
//         icon: 'error',
//         title: 'Upload Failed',
//         text: 'Something went wrong, please try again.',
//         confirmButtonColor: '#d33',
//       });
//     },
//   });

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       Swal.fire('Please select an Excel file.', '', 'warning');
//       return;
//     }
//     uploadMutation.mutate(selectedFile);
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center flex-column" style={{ padding: '50px' }}>
//       <div className="border border-2 rounded shadow p-4 bg-white" style={{ width: '100%', maxWidth: '600px' }}>
//         <h5 className="mb-3 text-center text-primary fw-bold">Upload Excel File</h5>

//         <div
//           className="border border-primary rounded d-flex flex-column justify-content-center align-items-center p-4 mb-3"
//           style={{ minHeight: '200px', cursor: 'pointer' }}
//           onClick={() => document.getElementById('fileInput').click()}
//         >
//           <FaCloudUploadAlt size={60} color="#007bff" />
//           <p className="mt-3 text-muted">Click to upload Excel file</p>
//           <input
//             type="file"
//             id="fileInput"
//             accept=".xls, .xlsx"
//             onChange={handleFileChange}
//             hidden
//           />
//           {selectedFile && (
//             <div className="mt-2 text-success fw-semibold">Selected: {selectedFile.name}</div>
//           )}
//         </div>

//         <div className="d-flex justify-content-center">
//           <button
//             className="btn btn-primary"
//             onClick={handleUpload}
//             disabled={uploadMutation.isLoading}
//           >
//             {uploadMutation.isLoading ? 'Uploading...' : 'Upload'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExcelUpload;


import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCloudUploadAlt } from "react-icons/fa";
import { API_BASE_URL } from "../../constant/constantBaseUrl";

const ExcelUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_BASE_URL}/api/college/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: 'success',
        title: 'Upload Successful',
        html: `
          <p>${data.message}</p>
          <p><strong>Courses Updated:</strong> ${data.collegeCoursesUpdated}</p>
        `,
        confirmButtonColor: '#3085d6',
      });
      setSelectedFile(null);
    },
    onError: (error) => {
      const errMsg = error?.response?.data?.usrMsg || 'Something went wrong, please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: errMsg,
        confirmButtonColor: '#d33',
      });
    },
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      Swal.fire('Please select an Excel file.', '', 'warning');
      return;
    }
    uploadMutation.mutate(selectedFile);
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{ padding: '40px' }}>
      <div className=" border-2 rounded shadow p-4 bg-light" style={{ width: '100%', maxWidth: '600px' }}>
        <h4 className="text-center text-primary fw-bold mb-4">Upload Excel File</h4>

        <div
          className="border-dashed border-2 rounded d-flex flex-column justify-content-center align-items-center p-5 bg-white"
          style={{ cursor: 'pointer' }}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <FaCloudUploadAlt size={70} color="#007bff" />
          <p className="mt-3 mb-1 text-muted">Click to upload Excel file</p>
          <small className="text-muted">(Only .xls or .xlsx files allowed)</small>
          <input
            type="file"
            id="fileInput"
            accept=".xls, .xlsx"
            onChange={handleFileChange}
            hidden
          />
          {selectedFile && (
            <div className="mt-3 text-success fw-semibold">📄 {selectedFile.name}</div>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-4"
            onClick={handleUpload}
            disabled={uploadMutation.isLoading}
          >
            {uploadMutation.isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcelUpload;