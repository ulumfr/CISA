import React from "react";
import Button from "../../../../../components/ui/button";
import { PiMapPinBold } from "react-icons/pi";

const IntroSection = ({ data, apiData }) => {
  const handleClick = () => {
    window.open(data.maps, "_blank");
  };

  return (
    <section className="mx-[50px] md:mx-[120px] mt-[175px]">
      <div className="grid md:grid-cols-2 my-[85px] gap-20">
        <div className="text-main flex flex-col gap-8">
          <div>
            <h1 className="font-bold text-4xl">{data.sekolah}</h1>
            <span className="font-medium text-2xl">{apiData.namaSekolah}</span>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="font-semibold text-xl">Alamat</h2>
              <span>{data.alamat}</span>
            </div>
            <div>
              <h2 className="font-semibold text-xl">Berdiri Sejak</h2>
              <span>{data.berdiri}</span>
            </div>
            <div>
              <h2 className="font-semibold text-xl">Yayasan Penyelenggara</h2>
              <span>{data.yayasan}</span>
            </div>
          </div>
          <Button
            color="bg-button"
            name="Lihat di Maps"
            icon={<PiMapPinBold size={24} />}
            width="w-[240px]"
            onClick={handleClick}
          />
        </div>
        <div>
          <img
            src={data.img}
            alt="img-profil"
            draggable="false"
            className="rounded-2xl w-full h-[424px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
