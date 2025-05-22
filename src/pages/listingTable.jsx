import React, { useState } from "react";

const ListingTable = () => {
  const initialData = Array.from({ length: 50 }, (_, i) => ({
    universityName: `University ${i + 1}`,
    collegeName: `College ${i + 1}`,
    studentInfo: `Student ${i + 1}`,
    grade: ["A", "B", "C"][i % 3],
    percentage: `${70 + (i % 30)}%`,
    coursesDone: `Course ${i + 1}`,
    certificate: i % 2 === 0 ? "Yes" : "No",
  }));

  const columns = Object.keys(initialData[0]);
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [filterColumn, setFilterColumn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (column) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === column && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: column, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const filteredData = React.useMemo(() => {
    if (filterColumn && filterValue) {
      return sortedData.filter((item) =>
        item[filterColumn]?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return sortedData;
  }, [sortedData, filterColumn, filterValue]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (e) => setFilterValue(e.target.value);
  const handleColumnChange = (e) => {
    setFilterColumn(e.target.value);
    setFilterValue("");
  };
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
      {/* Filter Section at Top */}
      <div className="flex space-x-4 mb-6 w-full justify-center
      ">
        <select className="border p-2 rounded-md bg-white" onChange={handleColumnChange}>
          <option value="">Select Column</option>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
        {filterColumn && (
          <input
            className="border p-2 rounded-md bg-white"
            type="text"
            placeholder={`Filter by ${filterColumn}...`}
            value={filterValue}
            onChange={handleFilterChange}
          />
        )}
      </div>


      {/* Table at Middle */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg w-full max-w-4xl mb-6">
        <table className="table-auto w-full border">
          <thead className="bg-blue-500 text-white">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-2 cursor-pointer" onClick={() => handleSort(col)}>
                  {col} {sortConfig?.key === col ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-t hover:bg-blue-100">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 border">
                    {item[col]}
                  </td> 
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination at Bottom */}
      <div className="flex space-x-2">
        <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 cursor-pointer">
          Prev
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 cursor-pointer">
          Next
        </button>
      </div>
    </div>
  );
};

export default ListingTable;
