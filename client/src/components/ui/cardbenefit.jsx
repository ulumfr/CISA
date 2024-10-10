import React from "react";

const CardBenefit = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center gap-3">
    <div className="bg-white p-5 flex items-center rounded-lg">
      <span className="text-button ">{icon}</span>
    </div>
    <div className="flex flex-col">
      <h2 className="font-semibold text-xl">{title}</h2>
      <span className="text-sm opacity-85">{desc}</span>
    </div>
  </div>
);

export default CardBenefit;
