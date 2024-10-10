import React from "react";
import { FaPen } from "react-icons/fa";

const StatDashboard = ({
  jumlahAnak,
  jumlahPengajar,
  jumlahRuangan,
  jamPulang,
  namaSekolah,
  noHandphone,
  onEdit,
}) => {
  return (
    <div className="bg-main rounded-2xl  py-[25px] text-white">
      <div className="flex gap-20 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="rounded-full bg-button w-20 h-20 flex justify-center items-center text-2xl font-bold">
            {jumlahRuangan}
          </h2>
          <h3 className="font-medium text-center">Jumlah Ruangan</h3>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="rounded-full bg-button w-20 h-20 flex justify-center items-center text-2xl font-bold">
            {jumlahAnak}
          </h2>
          <h3 className="font-medium text-center">Jumlah Anak</h3>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="rounded-full bg-button w-20 h-20 flex justify-center items-center text-2xl font-bold">
            {jumlahPengajar}
          </h2>
          <h3 className="font-medium text-center">Jumlah Pengajar</h3>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="rounded-full bg-button w-20 h-20 flex justify-center items-center text-2xl font-bold">
            {jamPulang}
          </h2>
          <h3 className="font-medium text-center">Jam Pulang</h3>
        </div>
        <div className="flex flex-col items-center gap-4 font-semibold">
          <h3 className="text-center">{namaSekolah}</h3>
          <h2 className="text-center">{noHandphone}</h2>
          <button
            className="flex items-center justify-center gap-5 bg-button px-8 py-2 rounded-full"
            onClick={onEdit}
          >
            <FaPen />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatDashboard;
