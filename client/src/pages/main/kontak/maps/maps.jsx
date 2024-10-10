import React from "react";
import { locations } from "../../../../data/datamaps";

const MapSection = () => {
  return (
    <div className="flex flex-col gap-3 text-button">
      <h1 className="font-bold text-3xl">Maps</h1>
      <div className="flex flex-col w-full z-0">
        {locations.map((location, index) => (
          <div key={index}>
            <h2 className="font-semibold text-xl">{location.label}</h2>
            <iframe
              src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
              className="w-full h-[170px] mb-6 border border-button rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapSection;
