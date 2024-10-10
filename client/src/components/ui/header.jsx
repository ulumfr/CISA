import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HeaderMenu = ({ img, title, desc }) => {
  const navigate = useNavigate();

  return (
    <section
      className="text-white flex my-[60px] bg-cover bg-no-repeat bg-center"
      id="header"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(37, 37, 37, 0.25) 0%, #101010 100%), url(${img})`,
      }}
    >
      <div className="mx-[50px] md:mx-[120px] my-[75px] flex flex-col gap-6">
        <button
          className="flex items-center gap-3 font-medium text-xl cursor-pointer w-fit hover:scale-105 duration-200"
          onClick={() => navigate(-1)}
        >
          <RiArrowLeftLine size={24} />
          <span>Kembali</span>
        </button>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-3xl sm:text-4xl">{title}</h1>
          <span className="font-medium text-base md:text-xl">{desc}</span>
        </div>
      </div>
    </section>
  );
};

export default HeaderMenu;
