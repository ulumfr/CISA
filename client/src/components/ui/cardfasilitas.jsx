import React from "react";

const CardFasilitas = ({ img, title, textColor, borderColor }) => (
  <div className="bg-white md:w-[240px] rounded-lg pb-[2px]">
    <img
      src={img}
      alt="img-fasilitas"
      draggable="false"
      className="rounded-t-lg object-cover h-48 w-full"
    />
    <div className="mx-4 mt-2 mb-4 flex flex-col gap-2">
      <h1 className={`${textColor} font-semibold text-lg truncate`}>{title}</h1>
      <div className={`border ${borderColor} w-[180px]`} />
    </div>
  </div>
);

export default CardFasilitas;
