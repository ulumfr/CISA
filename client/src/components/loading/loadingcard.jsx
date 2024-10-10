import React from "react";

const LoadingCard = () => {
  return (
    <div className="bg-gray-200 w-full md:w-[375px] rounded-xl mb-6 border border-abugelap border-opacity-30 shadow-md animate-pulse">
      <div className="relative">
        <div className="rounded-t-xl bg-gray-300 w-full h-[248px]" />
      </div>
      <div className="p-5 flex flex-col h-[206px]">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5">
            <div className="flex mb-2 gap-2">
              <span className="bg-gray-300 w-20 h-6 rounded-md" />
              <span className="bg-gray-300 w-28 h-6 rounded-md" />
            </div>
            <div className="flex flex-col">
              <div className="bg-gray-300 w-3/4 h-6 mb-2 rounded" />
              <div className="bg-gray-300 w-full h-4 mb-2 rounded" />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="bg-gray-300 w-16 h-4 rounded" />
            <div className="bg-gray-300 w-16 h-4 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
