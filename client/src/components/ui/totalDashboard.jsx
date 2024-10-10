import React from "react";

const TotalDashboard = ({ totalName, totalCount, icon }) => {
  return (
    <div className="w-[320px] h-[104px] bg-main rounded-2xl py-[18.5px] px-9 flex justify-between items-center">
      <div className="text-white flex flex-col gap-1">
        <h1>Total {totalName}</h1>
        <h3 className="font-bold text-2xl">{totalCount}</h3>
      </div>
      <div className="bg-button text-white rounded-full w-[50px] h-[50px] items-center flex justify-center">
        {icon}
      </div>
    </div>
  );
};

export default TotalDashboard;
