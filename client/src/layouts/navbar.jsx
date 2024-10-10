import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoNavbar from "../assets/svg/logo.svg";
import NavbarMenu from "../components/ui/navbarmenu";
import { navbarMenuData } from "../data/datanavbar";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white ${
        scrolled ? "shadow-md" : "border-b border-abu"
      } z-50`}
    >
      <div className="mx-[50px] md:mx-[120px] py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img
                src={LogoNavbar}
                alt="logo-navbar"
                draggable="false"
                width="50px"
              />
            </Link>
            <h2 className="hidden sm:block text-main font-semibold text-xl">
              Cita Sakinah
            </h2>
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-6 text-abu">
              {navbarMenuData.map((menuItem, index) => (
                <NavbarMenu key={index} {...menuItem} />
              ))}
            </ul>
          </div>
          <div
            onClick={handleMenu}
            className="md:hidden cursor-pointer text-main top-10 z-50 justify-end flex"
          >
            {menu ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </div>
        </div>
        {menu && (
          <div className="md:hidden">
            <ul className="py-7 text-lg space-y-7">
              {navbarMenuData.map((menuItem, index) => (
                <NavbarMenu key={index} {...menuItem} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
