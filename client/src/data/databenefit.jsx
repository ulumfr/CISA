import { LuUserCheck, LuLayoutTemplate, LuVenetianMask } from "react-icons/lu";
import { FiUsers, FiBookOpen } from "react-icons/fi";
import { BsPersonArmsUp } from "react-icons/bs";

export const benefitData = [
  {
    title: "Guru & Staff Kompeten",
    desc: "Menyediakan guru dan staff yang kompeten dan berpengalaman.",
    icon: <LuUserCheck size={50} />,
  },
  {
    title: "Kurikulum Terintegrasi",
    desc: "Menggunakan kurikulum yang terintegrasi dengan teknologi terkini.",
    icon: <FiBookOpen size={50} />,
  },
  {
    title: "Fasilitas Lengkap dan Aman",
    desc: "Fasilitas yang lengkap dan aman untuk menunjang proses belajar mengajar.",
    icon: <LuLayoutTemplate size={50} />,
  },
  {
    title: "Pendekatan Personal",
    desc: "Pendekatan personal untuk setiap siswa untuk mengoptimalkan pembelajaran.",
    icon: <BsPersonArmsUp size={50} />,
  },
  {
    title: "Program Ekstrakurikuler",
    desc: "Beragam program ekstrakurikuler untuk mengembangkan minat dan bakat siswa.",
    icon: <LuVenetianMask size={50} />,
  },
  {
    title: "Perhatian Individu",
    desc: "Memberikan perhatian individu untuk memastikan kebutuhan setiap siswa terpenuhi.",
    icon: <FiUsers size={50} />,
  },
];
