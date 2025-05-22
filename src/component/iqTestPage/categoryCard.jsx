import React from "react";

const CategoryCard = ({ category, count, onClick }) => {
  return (
    <div
       className="bg-white shadow-lg rounded-lg p-6 m-4 text-center cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => onClick(category)}
    >
      <h3 className="text-xl font-bold">{category}</h3>
      <p className="text-gray-600">Tests: {count}</p>
    </div>
  );
};

export default CategoryCard;
