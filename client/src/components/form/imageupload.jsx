import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";

const ImageUploadForm = ({
  label,
  id,
  name,
  onChange,
  previewImages = [],
  onDeleteImage,
  fileInputRef,
  handleImageUpload,
  isMultiple = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {isMultiple ? (
        <>
          <label className="block text-sm font-semibold text-main">
            {label}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              id={id}
              name={name}
              onChange={onChange}
              multiple
              accept="image/*"
              className="hidden"
            />
            {previewImages.length < 5 && (
              <label
                htmlFor={id}
                className="flex items-center justify-center w-20 h-20 bg-gray-200 text-main rounded-lg cursor-pointer"
              >
                <FaPlus size={24} />
              </label>
            )}
            <div className="flex flex-wrap gap-2">
              {previewImages.map((image, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={image.url}
                    alt={`Preview ${image.idImage}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* {image.idImage && (
                    <div className="absolute top-0 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
                      {image.idImage}
                    </div>
                  )} */}
                  <button
                    type="button"
                    onClick={() => onDeleteImage(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-sm font-semibold text-main">{label}</h2>
          <div
            className="border border-main rounded-lg flex flex-col items-center justify-center text-abu py-4 cursor-pointer h-[134px] overflow-hidden"
            onClick={() => fileInputRef.current.click()}
          >
            {!previewImages ? (
              <>
                <IoMdImages size={100} className="mb-1" />
                <p className="text-base">Tambahkan Gambar</p>
              </>
            ) : (
              <img
                src={previewImages}
                alt="Uploaded Preview"
                className="w-40 rounded-lg border border-gray-300 object-cover"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            hidden
          />
        </>
      )}
    </div>
  );
};

export default ImageUploadForm;
