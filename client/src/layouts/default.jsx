import React from "react";
import NavBar from "./navbar";
import Footer from "./footer";

const DefaultLayout = ({ children }) => (
  <div>
    <NavBar />
    {children}
    <Footer />
  </div>
);

export default DefaultLayout;
