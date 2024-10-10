import React from "react";
import { useNavigate } from "react-router-dom";

const CardProfil = ({ img, sekolah, titlesekolah, child, age }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profil/${sekolah.toLowerCase()}`);
  };

  return (
    <div
      className="bg-white md:w-[360px] shadow-md rounded-xl cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={img}
        alt="img-profil"
        draggable="false"
        className="rounded-t-xl object-cover h-[250px] w-full"
      />

      <div className="mx-[30px] mt-4 mb-8 flex flex-col gap-4">
        <div className="flex gap-2 items-end">
          <h1 className="text-white bg-button rounded-md font-semibold text-2xl p-2">
            {sekolah}
          </h1>
          <h3 className="text-main font-semibold text-lg text-start">
            {titlesekolah}
          </h3>
        </div>
        <div className="flex flex-col items-start text-abugelap text-base font-medium">
          <span>Untuk {child}</span>
          <span>Usia {age}</span>
        </div>
      </div>
    </div>
  );
};

export default CardProfil;
