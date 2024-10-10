import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import TableDashboard from "../../../components/ui/tabledashboard";
import Button from "../../../components/ui/button";
import InputField from "../../../components/form/inputfield";
import ImageUploadForm from "../../../components/form/imageupload";
import Modal from "../../../components/modal/modal";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { LuPen } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import Pagination from "../../../components/ui/pagination";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";

const FasilitasPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFasilitas, setSelectedFasilitas] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    sekolah: "",
    sekolahId: "",
    gambar: "",
    tanggal: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [schoolOptions, setSchoolOptions] = useState([]);

  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Fasilitas ";

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/fasilitas");
        const formattedData = response.data.map((item) => ({
          id: item.id,
          title: item.namaFasilitas,
          gambar: item.imageName,
          sekolah: item.namaSekolah,
          tanggal: item.tanggalDibuat,
        }));
        setFilteredData(formattedData);
        setOriginalData(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchSchools = async () => {
      try {
        const response = await axios.get("/api/sekolah");
        const options = response.data.map((school) => ({
          label: school.namaSekolah,
          value: school.namaSekolah,
          id: school.id,
        }));
        setSchoolOptions(options);
      } catch (error) {
        console.error("Error fetching school data: ", error);
      }
    };

    fetchData();
    fetchSchools();
  }, []);

  useEffect(() => {
    const filtered = searchQuery
      ? originalData.filter((fasilitas) =>
        fasilitas.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : originalData;

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, originalData]);

  const handleAddClick = () => {
    setFormData({
      title: "",
      sekolah: "",
      sekolahId: "",
      gambar: "",
      tanggal: "",
    });
    setPreviewImage("");
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (fasilitas) => {
    const selectedSchool = schoolOptions.find(
      (option) => option.label === fasilitas.sekolah
    );
    setFormData({
      title: fasilitas.title,
      sekolah: fasilitas.sekolah,
      sekolahId: selectedSchool?.id || "",
      gambar: fasilitas.gambar,
    });
    // setPreviewImage(
    //   `https://paudterpaducisa.sch.id/api/storage/uploads/${fasilitas.gambar}`
    // );
    setPreviewImage(
      `${import.meta.env.VITE_API_URL}/storage/uploads/${fasilitas.gambar}`
    );
    setSelectedFasilitas(fasilitas);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (fasilitas) => {
    setSelectedFasilitas(fasilitas);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/fasilitas/${selectedFasilitas.id}`
      );
      setFilteredData(
        filteredData.filter((item) => item.id !== selectedFasilitas.id)
      );
      toast.success(response.data.message);
      setSelectedFasilitas(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting facility: ", error);
      toast.error("Failed to delete facility");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedFasilitas(null);
  };

  const handleSaveFasilitas = async () => {
    if (!formData.title || !formData.sekolahId || !formData.gambar) {
      toast.error("Semua field harus diisi!");
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("namaFasilitas", formData.title);
    formDataToSend.append("sekolahId", formData.sekolahId);

    if (formData.gambar !== (isEdit ? selectedFasilitas.gambar : "")) {
      formDataToSend.append("file", formData.gambar);
    }

    try {
      let response;

      if (isEdit) {
        response = await axios.patch(
          `/api/fasilitas/${selectedFasilitas.id}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${user}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `/api/fasilitas?sekolahId=${formData.sekolahId}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${user}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          isEdit ? error.response.data.message : error.response.data.message
        );
      }
      console.error("Error saving facility: ", error);
    } finally {
      setIsModalOpen(false);
      setSelectedFasilitas(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "sekolah") {
      const selectedSchool = schoolOptions.find(
        (option) => option.value === value
      );
      setFormData({
        ...formData,
        sekolah: value,
        sekolahId: selectedSchool?.id || "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, gambar: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const columnsFasilitas = [
    { header: "Judul", field: "title", truncate: 20, width: "w-[20%]" },
    { header: "Gambar", field: "gambar", truncate: 0, width: "w-[20%]" },
    {
      header: "Tanggal Dibuat",
      field: "tanggal",
      truncate: 15,
      width: "w-[20%]",
    },
    { header: "Sekolah", field: "sekolah", truncate: 20, width: "w-[20%]" },
    { header: "Aksi", field: "action", truncate: 0, width: "w-[10%]" },
  ];

  const dataReal = filteredData.map((fasilitas) => ({
    ...fasilitas,
    action: (
      <div className="flex gap-3 items-center">
        <LuPen
          className="text-second"
          onClick={() => handleEditClick(fasilitas)}
          size={20}
        />
        <FaRegTrashAlt
          className="text-button"
          onClick={() => handleDeleteClick(fasilitas)}
          size={20}
        />
      </div>
    ),
  }));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = dataReal.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-main font-bold text-2xl">Fasilitas</h1>
          <div className="flex items-center gap-5">
            <div className="relative w-[280px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <IoIosSearch className="text-main" size={24} />
              </div>
              <input
                type="text"
                placeholder="Cari Judul..."
                name="search"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-main rounded-full px-[14px] py-[10px] pl-10"
              />
            </div>

            <Button
              color="bg-main"
              name="Tambah"
              icon={<FaPlus size={24} />}
              rounded="rounded-full"
              width="w-[150px]"
              onClick={handleAddClick}
            />
          </div>
        </div>
        <TableDashboard columns={columnsFasilitas} data={paginatedData} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        confirm="Hapus"
        width="w-[377px]"
        justify="justify-center"
      >
        <h2 className="text-2xl font-semibold text-main text-center">
          Apakah Anda Yakin Ingin Menghapus?
        </h2>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleSaveFasilitas}
        confirm="Simpan"
        width="w-[500px]"
        justify="justify-center"
      >
        <div className="flex flex-col gap-4 overflow-auto">
          <InputField
            label="Judul Fasilitas"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Masukkan Judul Fasilitas"
          />
          <InputField
            label="Nama Sekolah"
            id="sekolah"
            name="sekolah"
            value={formData.sekolah}
            onChange={handleInputChange}
            placeholder="Pilih Sekolah"
            dropdown
            options={schoolOptions}
          />
          <ImageUploadForm
            label="Upload Gambar Fasilitas"
            fileInputRef={fileInputRef}
            handleImageUpload={handleImageUpload}
            previewImages={previewImage}
            isMultiple={false}
          />
        </div>
      </Modal>
    </>
  );
};

export default FasilitasPage;
