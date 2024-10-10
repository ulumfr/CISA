import React from "react";

const DropdownFilter = ({ isOpen, options, selectedOptions, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bg-white text-button border-none shadow-lg rounded-lg mt-2 w-full z-10">
      <div className="flex flex-col gap-2 p-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-button"
              checked={selectedOptions.includes(option)}
              onChange={() => onSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownFilter;
