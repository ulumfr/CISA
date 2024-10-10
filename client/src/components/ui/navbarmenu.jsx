import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarMenu = ({
  linkMenu,
  name,
  icon1,
  icon2,
  submenu,
  sublinks,
  specialBg,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive =
    (linkMenu !== "/" && currentPath.startsWith(linkMenu)) ||
    (linkMenu === "/" && currentPath === "/") ||
    (sublinks &&
      sublinks.some(({ sublink }) =>
        sublink.some(({ link }) => currentPath.startsWith(link))
      ));

  return (
    <div
      className={`flex items-center md:cursor-pointer group hover:scale-105 duration-200 ${
        specialBg ? "bg-button px-[15px] py-[7.5px] rounded-lg w-fit" : ""
      }`}
    >
      <div
        className={`flex items-center gap-2 ${
          isActive
            ? specialBg
              ? "text-white"
              : "text-button"
            : specialBg
            ? "text-white"
            : "text-abu"
        }`}
      >
        {icon1}
        <Link to={linkMenu}>
          <h1
            className={`cursor-pointer capitalize font-medium ${
              isActive
                ? specialBg
                  ? "text-white"
                  : "text-button"
                : specialBg
                ? "text-white"
                : "text-abu"
            }`}
          >
            {name}
          </h1>
        </Link>
        {icon2}
        {submenu && (
          <div className="absolute w-[216px] top-8 hidden group-hover:block hover:block">
            <div className="py-3">
              <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45" />
            </div>
            <div className="bg-white py-5 pl-6 rounded-xl">
              {sublinks.map(({ sublink }, index) => (
                <div key={index}>
                  {sublink.map(({ name, link }) => (
                    <div
                      key={name}
                      className={`my-2.5 font-medium ${
                        currentPath.startsWith(link)
                          ? "text-button"
                          : "text-abu"
                      }`}
                    >
                      <Link to={link} className="hover:text-button">
                        <div className="flex items-center gap-2">{name}</div>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarMenu;
