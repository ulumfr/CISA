import React from "react";

const LatarSection = ({ data }) => {
  return (
    <section className="mx-[50px] md:mx-[120px] my-[85px] text-main">
      <div className="bg-second rounded-2xl px-[60px] py-[35px] grid sm:grid-cols-2 gap-10 sm:gap-24 md:gap-64 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 translate-x-[15%] translate-y-[75%] rounded-full border-main border-[5px] w-[246px] h-[246px]" />
        <div className="absolute bottom-0 left-0 translate-x-[40%] translate-y-[75%] rounded-full border-button border-[5px] w-[178px] h-[178px]" />
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-3xl">Visi</h1>
          <span className="font-medium text-lg">{data.visi}</span>

          {/* masih kurang lingkaran di garis putih */}
          <div className="border-2 border-white" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-3xl">Misi</h1>

          {data.misi.map((item, index) => (
            <span
              key={index}
              className="font-medium text-lg border-l-4 border-white pl-6 mb-10 sm:mb-4"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="my-[60px] flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Sejarah Singkat</h1>
        <span className="text-lg text-justify">{data.sejarah}</span>
      </div>
      <div className="my-[60px] flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Tujuan</h1>
        <ol className="list-decimal list-inside text-lg text-justify">
          {data.tujuan.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default LatarSection;
