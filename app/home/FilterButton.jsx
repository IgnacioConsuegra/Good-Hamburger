import React from "react";

const FilterButton = ({ isSelected, handleClick, children }) => {
  return (
    <div
      className={`px-4 py-1 rounded-full border text-sm transition-all duration-300 
    active:scale-95 active:opacity-80 cursor-pointer ${
      isSelected && "bg-orange-100 text-orange-700 scale-105"
    }`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default FilterButton;
