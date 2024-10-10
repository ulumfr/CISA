import React, { useEffect } from "react";
import HeroSection from "./hero/hero";
import AboutSection from "./about/about";
import BenefitSection from "./benefit/benefit";
import ProfilSection from "./profil/profil";
import ContactSection from "./contact/contact";

const HomePage = () => {
  useEffect(() => {
    document.title = "Cita Sakinah | Beranda";
  });

  return (
    <>
      <HeroSection />
      <AboutSection />
      <BenefitSection />
      <ProfilSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
