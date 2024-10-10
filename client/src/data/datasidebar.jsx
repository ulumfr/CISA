import { LuLayoutDashboard, LuBookMinus, LuBoxes } from "react-icons/lu";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegBuilding } from "react-icons/fa";

export const dataSidebar = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <LuLayoutDashboard size={24} />,
  },
  {
    name: "Kegiatan",
    link: "/admin/kegiatan",
    icon: <LuBookMinus size={24} />,
  },
  {
    name: "Informasi",
    link: "/admin/informasi",
    icon: <IoMdInformationCircleOutline size={24} />,
  },
  {
    name: "Struktur",
    link: "/admin/struktur",
    icon: <LuBoxes size={24} />,
  },
  {
    name: "Fasilitas",
    link: "/admin/fasilitas",
    icon: <FaRegBuilding size={24} />,
  },
];
