// // pages/ViewCutoffTable.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../constant/constantBaseUrl"; // update path as per your project

// const ViewCutoffTable = () => {
//   const { id } = useParams(); // this is the _id
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [columns, setColumns] = useState([]);


// //  useEffect(() => {
// //   const fetchCutoff = async () => {
// //     try {
// //       const res = await axios.get(`${API_BASE_URL}/api/cutoff/${id}`);
// //       setData(res.data?.data?.data || []); // 👈 correct path
// //     } catch (error) {
// //       console.error("Error fetching cutoff details", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   fetchCutoff();
// // }, [id]);
// useEffect(() => {
//   const fetchCutoff = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/cutoff/${id}`);
//       const tableData = res.data?.data?.data || [];

//       // 🔄 Transform caste array into flat object
//     const transformedData = tableData.map((row) => {
//   const casteMarks = row.cutoff?.reduce((acc, casteItem) => {
//     acc[casteItem.caste] = casteItem.marks;
//     return acc;
//   }, {});

//   return {
//     collegeId: row.collegeId,
//     collegeName: row.collegeName,
//     category: row.category,
//     subCategory: row.subCategory?.join(", "),
//     ...casteMarks,
//   };
// });

// setData(transformedData);

// // Generate column keys
// const casteKeys = Object.keys(transformedData[0] || {}).filter(
//   (key) =>
//     !["collegeId", "collegeName", "category", "subCategory"].includes(key)
// );
// setColumns([
//   "collegeId",
//   "collegeName",
//   "category",
//   "subCategory",
//   ...casteKeys,
// ]);

//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to fetch cutoff data", err);
//       setLoading(false);
//     }
//   };

//   fetchCutoff();
// }, [id]);



//   return (
// <div className="min-h-screen bg-blue-50 py-10 px-4">
//   <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
//     <h2 className="text-2xl font-bold text-blue-700 mb-4">
//       📊 Cutoff Data for: <span className="text-gray-800">{id}</span>
//     </h2>

//     {loading ? (
//       <p>Loading...</p>
//     ) : !Array.isArray(data) || data.length === 0 ? (
//       <p>No data found.</p>
//     ) : (
//       <div className="overflow-x-auto overflow-y-auto max-h-[70vh] border rounded shadow-inner">
//         <table className="min-w-[1200px] border text-sm text-left">
//           <thead className="sticky top-0 bg-blue-100 text-blue-900 z-10">
//             <tr>
//               {finalColumns.map((key, i) => (
//                 <th key={i} className="border px-3 py-2 whitespace-nowrap">
//                   {key}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, rowIndex) => (
//               <tr key={rowIndex} className="hover:bg-gray-50">
//                 {finalColumns.map((col, colIndex) => (
//                   <td key={colIndex} className="border px-3 py-2">
//                     {row[col] ?? "—"}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )}
//   </div>
// </div>


//   );
// };

// export default ViewCutoffTable;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";

const ViewCutoffTable = () => {
  const { id } = useParams();
  const [cutoffList, setCutoffList] = useState([]);
  const [allCastes, setAllCastes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/cutoff/${id}`);
        const rawData = res.data?.data?.data || [];

        setCutoffList(rawData);

        // Extract unique caste names from all rows
        const casteSet = new Set();
        rawData.forEach((row) => {
          (row.cutoff || []).forEach((entry) => casteSet.add(entry.caste));
        });

        const uniqueCastes = Array.from(casteSet).map((casteName) => ({
          _id: casteName,
          caste: casteName,
        }));

        setAllCastes(uniqueCastes);
      } catch (error) {
        console.error("Failed to fetch cutoff data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600 font-semibold text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">👁️ View Cutoff Data</h2>

        <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
          <table className="min-w-[1500px] border text-sm text-left">
            <thead className="sticky top-0 bg-blue-100 text-blue-900">
              <tr>
                <th className="sticky top-0 border px-3 py-2">College ID</th>
                <th className="sticky top-0 border px-3 py-2">College Name</th>
                <th className="sticky top-0 border px-3 py-2">Category</th>
                <th className="sticky top-0 border px-3 py-2">Subcategory</th>
                {allCastes.map((caste) => (
                  <th key={caste._id} className="sticky top-0 border px-3 py-2">
                    {caste.caste}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cutoffList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{item.collegeId}</td>
                  <td className="border px-3 py-2">{item.collegeName}</td>
                  <td className="border px-3 py-2">{item.category}</td>
                  <td className="border px-3 py-2">
                    {Array.isArray(item.subCategory)
                      ? item.subCategory.join(", ")
                      : item.subCategory}
                  </td>
                  {allCastes.map((caste) => {
                    const value = item.cutoff?.find(
                      (cut) => cut.caste === caste.caste
                    )?.marks;

                    return (
                      <td
                        key={caste._id}
                        className="border px-3 py-2 text-center"
                      >
                        {value !== undefined ? parseFloat(value).toFixed(2) : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {cutoffList.length === 0 && (
                <tr>
                  <td
                    colSpan={4 + allCastes.length}
                    className="text-center py-4 text-gray-500"
                  >
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCutoffTable;
