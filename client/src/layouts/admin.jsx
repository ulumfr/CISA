import React from "react";
import Sidebar from "../components/ui/sidebar";
import { LuBookOpen } from "react-icons/lu";
import Panduan from "../assets/file/panduan.pdf";

const AdminLayout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex transition-all duration-300 overflow-auto w-full m-10">
      {children}
    </div>

    <div className="fixed bottom-10 right-10">
      <div className="relative group bg-button rounded-full hover:bg-main">
        <a
          href={Panduan}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 items-center justify-center text-white p-[14px]"
        >
          <LuBookOpen size={24} />
          Panduan
        </a>
      </div>
    </div>
  </div>
);

export default AdminLayout;
