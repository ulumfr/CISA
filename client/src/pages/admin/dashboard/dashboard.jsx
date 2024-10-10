import React, { useState, useEffect } from "react";
import axios from "axios";
import StatDashboard from "../../../components/ui/statdashboard";
import Modal from "../../../components/modal/modal";
import InputField from "../../../components/form/inputfield";
import { toast } from "react-hot-toast";
import TotalDashboard from "../../../components/ui/totalDashboard";
import { useAuth } from "../../../hooks/useAuth";
import { BsPersonArmsUp } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";

const DashboardPage = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditData, setCurrentEditData] = useState(null);
  const [dataStatistic, setDataStatistic] = useState([]);
  const [formData, setFormData] = useState({
    jumlahAnak: "",
    jumlahPengajar: "",
    jumlahRuangan: "",
    jamPulang: "",
    namaSekolah: "",
    noHandphone: "",
  });

  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Dashboard";

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/sekolah");
        const formattedData = response.data.map((item) => ({
          id: item.id,
          jumlahAnak: item.jumlahAnak,
          jumlahPengajar: item.jumlahPengajar,
          jumlahRuangan: item.jumlahRuangan,
          jamPulang: item.jamPulang,
          namaSekolah: item.namaSekolah,
          noHandphone: item.noHandphone,
        }));
        setDataStatistic(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotals = () => {
    const totalAnak = dataStatistic.reduce(
      (acc, curr) => acc + curr.jumlahAnak,
      0
    );
    const totalPengajar = dataStatistic.reduce(
      (acc, curr) => acc + curr.jumlahPengajar,
      0
    );
    const totalRuangan = dataStatistic.reduce(
      (acc, curr) => acc + curr.jumlahRuangan,
      0
    );

    return { totalAnak, totalPengajar, totalRuangan };
  };

  const handleEditClick = (data) => {
    setFormData({
      jumlahAnak: data.jumlahAnak,
      jumlahPengajar: data.jumlahPengajar,
      jumlahRuangan: data.jumlahRuangan,
      jamPulang: data.jamPulang,
      namaSekolah: data.namaSekolah,
      noHandphone: data.noHandphone,
    });
    setCurrentEditData(data);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitModal = async () => {
    if (
      !formData.jumlahAnak ||
      !formData.jumlahPengajar ||
      !formData.jumlahRuangan ||
      !formData.jamPulang ||
      !formData.noHandphone ||
      !formData.namaSekolah
    ) {
      toast.error("Semua field harus diisi!");
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("jumlahAnak", formData.jumlahAnak);
    formDataToSend.append("jumlahPengajar", formData.jumlahPengajar);
    formDataToSend.append("jumlahRuangan", formData.jumlahRuangan);
    formDataToSend.append("jamPulang", formData.jamPulang);
    formDataToSend.append("namaSekolah", formData.namaSekolah);
    formDataToSend.append("noHandphone", formData.noHandphone);

    try {
      const response = await axios.patch(
        `/api/sekolah/${currentEditData.id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
      console.error("Error updating school data", error);
    } finally {
      setIsModalOpen(false);
      setCurrentEditData(null);
    }
  };

  const { totalAnak, totalPengajar, totalRuangan } = calculateTotals();

  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-main font-bold text-2xl">Dashboard</h1>
      <div className="flex gap-10">
        <TotalDashboard
          totalCount={totalRuangan}
          totalName={"Ruangan"}
          icon={<LuBuilding2 size={24} />}
        />
        <TotalDashboard
          totalCount={totalAnak}
          totalName={"Anak"}
          icon={<BsPersonArmsUp size={24} />}
        />
        <TotalDashboard
          totalCount={totalPengajar}
          totalName={"Pengajar"}
          icon={<FiUser size={24} />}
        />
      </div>
      <div className="flex flex-col gap-5">
        {dataStatistic.map((stat, index) => (
          <StatDashboard
            key={index}
            jamPulang={stat.jamPulang}
            jumlahAnak={stat.jumlahAnak}
            jumlahPengajar={stat.jumlahPengajar}
            jumlahRuangan={stat.jumlahRuangan}
            namaSekolah={stat.namaSekolah}
            noHandphone={stat.noHandphone}
            onEdit={() => handleEditClick(stat)}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onConfirm={submitModal}
        onCancel={() => setIsModalOpen(false)}
        confirm="Simpan"
        width="w-[400px]"
        justify="justify-center"
      >
        <div className="flex flex-col gap-6 overflow-auto">
          <InputField
            label="Nama Sekolah"
            type="text"
            name="namaSekolah"
            value={formData.namaSekolah}
            onChange={handleInputChange}
            placeholder="Nama Sekolah"
          />
          <InputField
            label="Nomor Telepon Sekolah *(format 62)"
            type="number"
            name="noHandphone"
            value={formData.noHandphone}
            onChange={handleInputChange}
            placeholder="Nomor Telepon Sekolah"
          />
          <InputField
            label="Jumlah Anak"
            type="number"
            name="jumlahAnak"
            value={formData.jumlahAnak}
            onChange={handleInputChange}
            placeholder="Jumlah Anak"
          />
          <InputField
            label="Jumlah Pengajar"
            type="number"
            name="jumlahPengajar"
            value={formData.jumlahPengajar}
            onChange={handleInputChange}
            placeholder="Jumlah Pengajar"
          />
          <InputField
            label="Jumlah Ruangan"
            type="number"
            name="jumlahRuangan"
            value={formData.jumlahRuangan}
            onChange={handleInputChange}
            placeholder="Jumlah Ruangan"
          />
          <InputField
            label="Jam Pulang"
            type="time"
            name="jamPulang"
            value={formData.jamPulang}
            onChange={handleInputChange}
            placeholder="Jam Pulang"
          />
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;
