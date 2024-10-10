import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import ReactQuill styles

const InputField = ({
  icon,
  type = "text",
  placeholder,
  id,
  name,
  value,
  onChange,
  label,
  rows,
  options = [],
  passwordInput = false,
  textarea = false,
  dropdown = false,
  isDesc = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsDropdownOpen(false);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
    ],
  };

  return (
    <div className="flex flex-col gap-2 relative">
      {label && (
        <label htmlFor={id} className="text-main font-semibold text-sm">
          {label}
        </label>
      )}
      <div
        className={`flex items-center border border-main rounded-lg p-3 text-main`}
      >
        {icon && <span className="px-2 text-xl opacity-70">{icon}</span>}

        {isDesc ? (
          <ReactQuill
            value={value}
            onChange={(content) =>
              onChange({ target: { name, value: content } })
            }
            placeholder={placeholder}
            modules={quillModules}
            className="flex-1 outline-none w-full"
          />
        ) : textarea ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 outline-none resize-none w-full"
            rows={rows}
          />
        ) : dropdown ? (
          <>
            <div className="flex items-center w-full relative">
              <div
                onClick={handleDropdownToggle}
                className="flex-1 cursor-pointer outline-none bg-transparent"
              >
                {value || placeholder}
              </div>
              {isDropdownOpen ? (
                <FiChevronUp className="text-abugelap" size={20} />
              ) : (
                <FiChevronDown className="text-abugelap" size={20} />
              )}
            </div>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 w-full border border-main rounded-lg bg-white z-10">
                {options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionSelect(option.value)}
                    className="p-2 cursor-pointer hover:bg-gray-100 text-main rounded-lg"
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            autoComplete={passwordInput ? "current-password" : "off"}
            className="flex-1 outline-none w-full"
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
