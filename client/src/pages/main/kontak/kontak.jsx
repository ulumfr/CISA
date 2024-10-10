import React, { useEffect } from "react";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/img/general.jpg";
import WaSection from "./wa/wa";
import FaqSection from "./faq/faq";
import MapSection from "./maps/maps";

const KontakPage = () => {
  useEffect(() => {
    document.title = "Cita Sakinah | Kontak";
  });

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Kontak"
        desc="Hubungi kami untuk informasi lebih lanjut atau pertanyaan seputar layanan dan program pendidikan yang kami tawarkan."
      />
      <section className="mx-[50px] md:mx-[120px] mb-[90px] flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3 flex flex-col gap-20">
          <WaSection />
          <FaqSection />
        </div>
        <div className="md:w-1/3">
          <MapSection />
        </div>
      </section>
    </>
  );
};

export default KontakPage;
