import { IoIosArrowDown } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";

export const navbarMenuData = [
  {
    linkMenu: "/",
    name: "Beranda",
  },
  {
    name: "Profil",
    submenu: true,
    icon2: <IoIosArrowDown />,
    sublinks: [
      {
        sublink: [
          { name: "TPA Cita Sakinah", link: "/profil/tpa" },
          { name: "KB 'Aisyiyah 24", link: "/profil/kb" },
          { name: "TK ABA 33", link: "/profil/tk" },
          { name: "Fasilitas", link: "/profil/fasilitas" },
        ],
      },
    ],
  },
  {
    linkMenu: "/struktur",
    name: "Struktur",
  },
  {
    linkMenu: "/kegiatan",
    name: "Kegiatan",
  },
  {
    linkMenu: "/informasi",
    name: "Informasi",
  },
  {
    linkMenu: "/kontak",
    name: "Kontak",
    icon1: <FiMessageSquare />,
    specialBg: true,
  },
];
