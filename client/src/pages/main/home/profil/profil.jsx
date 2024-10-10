import React from "react";
import CardProfil from "../../../../components/ui/cardprofil";
import { profilData } from "../../../../data/dataprofil";

const ProfilSection = () => {
  return (
    <section className="mx-[50px] md:mx-[120px] my-[110px]" id="profil">
      <div className="flex flex-col md:flex-row justify-center gap-[50px] md:gap-[100px]">
        {profilData.map((profil, index) => (
          <CardProfil key={index} {...profil} />
        ))}
      </div>
    </section>
  );
};

export default ProfilSection;
