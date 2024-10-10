import React from "react";
import AboutImg from "../../../../assets/img/tentang.jpg";

const AboutSection = () => {
  return (
    <section
      className="mx-[50px] md:mx-[120px] mt-[100px] mb-[120px] md:mb-[160px]"
      id="about"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-20">
        <img
          src={AboutImg}
          alt="about-img"
          draggable="false"
          className="rounded-xl w-full object-cover h-[406px] "
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-main text-4xl sm:text-5xl font-bold">
            Tentang Kami
          </h1>
          <span className="text-base font-medium text-abugelap text-justify">
            Assalamualaikum Warahmatullahi Wabarakatuh. Selamat datang di
            lembaga kami, PAUD Terpadu Cita Sakinah. Kami memiliki tiga sekolah
            yang dirancang untuk melayani kebutuhan pendidikan anak usia dini,
            diantaranya TPA Cita Sakinah, KB 'Aisyiyah 24 dan TK Aisyiyah
            Bustanul Athfal 33. Kami berusaha mewujudkan pendidikan anak
            berkemajuan yang menyenangkan, menunjang perkembangan holistik anak,
            menanamkan nilai-nilai agama dan budaya, serta dilengkapi dengan
            beberapa program unggulan.
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
