import React from "react";

const LoadingCardFasilitas = () => (
  <div className="bg-white md:w-[240px] rounded-lg pb-[2px] animate-pulse">
    <div className="bg-gray-300 h-[150px] rounded-t-lg" />
    <div className="mx-4 mt-2 mb-4 flex flex-col gap-2">
      <div className="h-6 bg-gray-300 rounded w-3/4" />
      <div className="border border-gray-300 w-[180px]" />
    </div>
  </div>
);

export default LoadingCardFasilitas;
