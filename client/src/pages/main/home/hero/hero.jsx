import React from "react";
import { Link } from "react-scroll";
import Button from "../../../../components/ui/button";
import BackgroundImage from "../../../../assets/img/general.jpg";

const HeroSection = () => {
  return (
    <section
      className="flex items-center justify-center h-screen text-white bg-cover bg-center"
      id="hero"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.5)
        ), url(${BackgroundImage})`,
      }}
    >
      <div className="flex flex-col gap-[50px] items-center">
        <div className="flex flex-col gap-5 text-center px-[50px] sm:px-[100px] md:px-[400px]">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold">
            Selamat Datang di Website PAUD Terpadu Cita Sakinah
          </h1>
          <span className="text-base opacity-70">
            "Membuka Gerbang Kecerdasan Sejak Dini pada Dunia
            Pendidikan dengan Penuh Cinta dan Kreativitas."
          </span>
        </div>
        <Link to="about" smooth={true} duration={500}>
          <Button name="Mulai" width="w-[267px]" color="bg-button" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
