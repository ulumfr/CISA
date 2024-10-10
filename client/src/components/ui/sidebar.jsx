import React, { useState, useEffect } from "react";
import LogoAdmin from "../../assets/svg/logo.svg";
import { LuLogOut } from "react-icons/lu";
import { dataSidebar } from "../../data/datasidebar";
import { NavLink } from "react-router-dom";
import Modal from "../../components/modal/modal";
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { logout, user, role, namaSekolah } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      if (response.status === 200) {
        logout();
        localStorage.removeItem("adminRoute");
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Gagal logout. Silakan coba lagi.");
        }
      } else if (error.request) {
        toast.error(
          "Tidak ada respons dari server. Silakan periksa koneksi internet Anda."
        );
      } else {
        console.log(error);
        toast.error("Terjadi kesalahan tak terduga. Silakan coba lagi.");
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`flex flex-col justify-between border-r border-main min-h-screen transition-all duration-300 ${
        isMobile ? "w-20" : "w-80"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center py-4 gap-2">
          <img
            src={LogoAdmin}
            alt="logo-admin"
            draggable="false"
            className="w-20"
          />
          {!isMobile && (
            <h1 className="text-2xl text-main font-bold text-center">
              Cita Sakinah Administrator
            </h1>
          )}
          <div className="border-b border-main w-full" />
        </div>
        <div>
          <ul className="text-main font-medium text-base flex flex-col gap-3">
            {dataSidebar.map((menu, index) => {
              const isActive = window.location.pathname === menu.link;
              return (
                <NavLink key={index} to={menu.link}>
                  <li
                    className={`flex items-center ${
                      isMobile ? "justify-center" : "gap-2"
                    } rounded-[6px] px-6 py-2 mx-4 hover:bg-main hover:text-white ${
                      isActive ? "bg-main text-white" : "text-main"
                    }`}
                  >
                    <span>{menu.icon}</span>
                    {!isMobile && <h4>{menu.name}</h4>}
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className="border-t border-main text-main"
        style={{ boxShadow: "0px -1px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div
          className={`flex items-center py-5 ${
            isMobile ? "justify-center" : "justify-between px-10"
          }`}
        >
          {!isMobile && (
            <div className="flex flex-col">
              <h2 className="text-2xl font-medium">{role}</h2>
              <h4 className="text-xs">{namaSekolah}</h4>
            </div>
          )}
          <button onClick={handleLogoutClick}>
            <LuLogOut size={24} />
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onConfirm={handleLogout}
        onCancel={handleCancel}
        confirm="Log Out"
        width="w-[377px]"
        justify="justify-center"
      >
        <h2 className="text-2xl font-semibold text-main text-center">
          Apakah Anda Ingin Log Out?
        </h2>
      </Modal>
    </div>
  );
};

export default Sidebar;
