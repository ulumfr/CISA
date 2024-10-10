import React from "react";

const PengelolaSection = ({ data }) => {
  return (
    <section className="mx-[50px] md:mx-[120px] mb-[150px]">
      <div className="text-main">
        <iframe
          src={`https://www.google.com/maps?q=${data.pengelola[0].lat},${data.pengelola[0].lng}&z=15&output=embed`}
          className="w-full h-[300px] rounded-2xl"
        />
      </div>
    </section>
  );
};

export default PengelolaSection;
