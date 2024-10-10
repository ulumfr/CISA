import React from "react";
import { NavLink } from "react-router-dom";

const FooterMenu = ({ title, links }) => (
  <div className="flex flex-col">
    <div className="mb-4">
      <h6 className="text-xl font-semibold text-main">{title}</h6>
    </div>
    <div className="flex flex-col gap-2 text-hitamcustom text-base">
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className="hover:scale-105 duration-200"
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  </div>
);

export default FooterMenu;
