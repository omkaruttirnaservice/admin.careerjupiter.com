import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryList = ({ categories, onSelectCategory }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.name}
          category={cat.name}
          count={cat.count}
          onClick={onSelectCategory}
        />
      ))}
    </div>
  );
};

export default CategoryList;
