import React, { useEffect } from "react";
import ImgFooter from "../assets/svg/logo.svg";
import FooterMenu from "../components/ui/footermenu";
import { footerMenuData, socialMediaLinks } from "../data/datafooter";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const year = React.useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <footer
      className="bg-white"
      style={{ boxShadow: "0px -6px 25px -10px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="mx-[50px] md:mx-[120px]">
        <div className="pt-[69px] pb-[35px] md:flex md:justify-between">
          <div className="flex flex-col gap-[30px] md:w-[45%]">
            <div className="flex items-center gap-4">
              <img src={ImgFooter} alt="Cita Sakinah Logo" draggable="false" />
              <h2 className="text-main font-semibold text-2xl">Cita Sakinah</h2>
            </div>
            <span className="font-medium text-lg text-hitamcustom">
              Raih Mimpimu, Ciptakan Potensimu
            </span>
          </div>
          <div className="flex gap-7 sm:gap-20 mt-10 md:mt-0">
            {footerMenuData.map((menu, index) => (
              <FooterMenu key={index} title={menu.title} links={menu.links} />
            ))}
          </div>
        </div>
        <div className="border-[1.5px] border-main" />
        <div className="py-[35px] flex flex-col sm:flex-row justify-between items-center text-main">
          <div>
            <p className="text-lg font-semibold ">&copy; UMM Team {year}</p>
          </div>
          <div className="flex space-x-5 text-3xl justify-center items-center mt-5 sm:mt-0">
            {socialMediaLinks.map((social, index) => (
              <a key={index} href={social.url} className="hover:text-button">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
