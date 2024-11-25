import React, { useEffect, useState } from "react";
import TableDashboard from "../../../components/ui/tabledashboard";
import Button from "../../../components/ui/button";
import InputField from "../../../components/form/inputfield";
import ImageUploadForm from "../../../components/form/imageupload";
import Modal from "../../../components/modal/modal";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { LuPen } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import Pagination from "../../../components/ui/pagination";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";

const InformasiPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInformasi, setSelectedInformasi] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [dataInformasi, setDataInformasi] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    tanggal: "",
    desc: "",
    sekolahId: [],
    gambar: [],
  });

  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Informasi ";

    const fetchData = async () => {
      try {
        const [informasiRes, sekolahRes] = await Promise.all([
          axios.get("/api/informasi"),
          axios.get("/api/sekolah"),
        ]);

        const formattedData = informasiRes.data.map((item) => ({
          id: item.id,
          title: item.judul,
          tanggal: item.tanggal,
          desc: item.deskripsi,
          sekolah: item.sekolah.map((sekolah) => ({
            sekolahId: sekolah.sekolahId,
            namaSekolah: sekolah.namaSekolah,
          })),
          gambar: item.image.map((img) => ({
            idImage: img.idImage,
            fileName: img.fileName,
          })),
        }));

        setFilteredData(formattedData);
        setDataInformasi(formattedData);

        setSchoolOptions(
          sekolahRes.data.map((school) => ({
            label: school.namaSekolah,
            value: school.namaSekolah,
            id: school.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = searchQuery
      ? dataInformasi.filter((informasi) =>
          informasi.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : dataInformasi;

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, dataInformasi]);

  const handleAddClick = () => {
    setFormData({
      title: "",
      tanggal: "",
      desc: "",
      sekolahId: [],
      gambar: [],
    });
    setPreviewImage([]);
    setIsEdit(false);
    setIsEditModalOpen(true);
  };

  const handleEditClick = (informasi) => {
    const sekolahIds = informasi.sekolah.map((sekolah) =>
      parseInt(sekolah.sekolahId, 10)
    );

    setFormData({
      title: informasi.title,
      desc: informasi.desc,
      tanggal: informasi.tanggal,
      sekolahId: sekolahIds,
      gambar: informasi.gambar.map((img) => ({
        idImage: img.idImage,
        fileName: img.fileName,
      })),
    });

    // setPreviewImage(
    //   informasi.gambar.map((img) => ({
    //     idImage: img.idImage,
    //     url: `https://paudterpaducisa.sch.id/api/storage/uploads/${img.fileName}`,
    //   }))
    // );

    setPreviewImage(
      informasi.gambar.map((img) => ({
        idImage: img.idImage,
        url: `${import.meta.env.VITE_API_URL}/storage/uploads/${img.fileName}`,
      }))
    );

    setSelectedInformasi(informasi);
    setIsEdit(true);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (informasi) => {
    setSelectedInformasi(informasi);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/informasi/${selectedInformasi.id}`
      );
      setFilteredData(
        filteredData.filter((item) => item.id !== selectedInformasi.id)
      );
      toast.success(response.data.message);
      setIsDeleteModalOpen(false);
      setSelectedInformasi(null);
    } catch (error) {
      console.error("Error deleting informasi: ", error);
      toast.error("Failed to delete informasi");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedInformasi(null);
  };

  const handleSaveInformasi = async () => {
    const cleanedDesc = formData.desc.replace(/<\/?[^>]+(>|$)/g, "").trim();

    if (!formData.title && !cleanedDesc && !formData.tanggal && formData.sekolahId.length === 0 && formData.gambar.length === 0) {
      return toast.error("Semua kolom harus diisi");
    } else if (!formData.title) {
      return toast.error("Judul informasi harus diisi");
    } else if (!cleanedDesc) {
      return toast.error("Deskripsi informasi harus diisi");
    } else if (!formData.tanggal) {
      return toast.error("Tanggal informasi harus diisi");
    } else if (formData.sekolahId.length === 0) {
      return toast.error("Harus memilih minimal 1 sekolah");
    } else if (formData.gambar.length === 0) {
      return toast.error("Minimal 1 gambar yang harus diupload");
    }

    const formDataToSend = new FormData();

    formDataToSend.append("judul", formData.title);
    formDataToSend.append("deskripsi", formData.desc);
    formDataToSend.append("tanggal", formData.tanggal);
    formDataToSend.append("sekolahId", formData.sekolahId.join(","));

    formData.gambar.forEach((file) => {
      if (!file.idImage) formDataToSend.append("files", file.file);
    });

    try {
      let response;
      const deleteParams = imagesToDelete.length > 0 ? `idImage=${imagesToDelete.join(",")}` : "";

      if (isEdit) {
        response = await axios.patch(
          `/api/informasi/${selectedInformasi.id}?${deleteParams}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${user}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post("/api/informasi", formDataToSend, {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "multipart/form-data",
          },
        });
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
        toast.error(isEdit ? error.response.data.message : error.response.data.message);
      }
    } finally {
      setIsEditModalOpen(false);
      setSelectedInformasi(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (formData.gambar.length + files.length > 5) {
      toast.error("Pilihan maksimal 5 foto");
      return;
    }

    const newPreviewImages = files.map((file) => ({
      idImage: null,
      url: URL.createObjectURL(file),
    }));

    setPreviewImage((prev) => [...prev, ...newPreviewImages]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      gambar: [
        ...prevFormData.gambar,
        ...files.map((file) => ({ idImage: null, file })),
      ],
    }));
  };

  const handleDeleteImage = (index) => {
    const deletedImage = formData.gambar[index];

    if (deletedImage.idImage) {
      setImagesToDelete((prev) => [...prev, deletedImage.idImage]);
    }

    setPreviewImage((prevImages) => prevImages.filter((_, i) => i !== index));
    setFormData((prevFormData) => ({
      ...prevFormData,
      gambar: prevFormData.gambar.filter((_, i) => i !== index),
    }));
  };

  const handleSchoolChange = (e) => {
    const { value, checked } = e.target;
    const selectedSchoolId = parseInt(value, 10);

    setFormData((prev) => {
      const newSelectedSchools = checked
        ? [...prev.sekolahId, selectedSchoolId]
        : prev.sekolahId.filter((id) => id !== selectedSchoolId);
      return { ...prev, sekolahId: newSelectedSchools };
    });
  };

  const columnsInformasi = [
    { header: "Judul", field: "title", truncate: 20, width: "w-[15%]" },
    { header: "Gambar", field: "gambar", truncate: 10, width: "w-[10%]" },
    { header: "Deskripsi", field: "desc", truncate: 35, width: "w-[15%]" },
    {
      header: "Tanggal Informasi",
      field: "tanggal",
      truncate: 20,
      width: "w-[20%]",
    },
    { header: "Sekolah", field: "sekolah", truncate: 20, width: "w-[15%]" },
    { header: "Aksi", field: "action", truncate: 0, width: "w-[10%]" },
  ];

  const formatSchools = (schoolIds) => {
    const selectedSchools = schoolOptions
      .filter((option) => schoolIds.includes(option.id))
      .map((option) => option.label);

    if (selectedSchools.length === schoolOptions.length) {
      return "Semua Sekolah";
    }
    return selectedSchools.join(", ");
  };

  const extractTextFromPTags = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    return Array.from(paragraphs)
      .map((p) => p.textContent)
      .join(" ");
  };

  const dataReal = filteredData.map((informasi) => ({
    ...informasi,
    desc: extractTextFromPTags(informasi.desc),
    sekolah: formatSchools(
      informasi.sekolah.map((sch) => parseInt(sch.sekolahId))
    ),
    gambar:
      informasi.gambar.length > 0 ? informasi.gambar[0].fileName : "No Image",

    action: (
      <div className="flex gap-3 items-center">
        <LuPen
          id="update-button"
          className="text-second"
          onClick={() => handleEditClick(informasi)}
          size={20}
        />
        <FaRegTrashAlt
          id="delete-button"
          className="text-button"
          onClick={() => handleDeleteClick(informasi)}
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
          <h1 className="text-main font-bold text-2xl">Informasi</h1>
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
              id="add-button"
              color="bg-main"
              name="Tambah"
              icon={<FaPlus size={24} />}
              rounded="rounded-full"
              width="w-[150px]"
              onClick={handleAddClick}
            />
          </div>
        </div>
        <TableDashboard columns={columnsInformasi} data={paginatedData} />
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
        <h2
          className="text-2xl font-semibold text-main text-center"
          id="konfirm-delete"
        >
          Apakah Anda Yakin Ingin Menghapus?
        </h2>
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onConfirm={handleSaveInformasi}
        confirm="Simpan"
        width="w-[535px]"
        justify="justify-center"
      >
        <div className="flex flex-col gap-4 overflow-auto">
          <InputField
            label="Judul"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Masukkan Judul"
          />
          <InputField
            label="Deskripsi"
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            placeholder="Masukkan Deskripsi"
            isDesc={true}
          />
          <InputField
            label="Tanggal Informasi"
            id="tanggal"
            name="tanggal"
            type="date"
            value={formData.tanggal}
            onChange={(e) =>
              setFormData({ ...formData, tanggal: e.target.value })
            }
            placeholder="Masukkan Tanggal Informasi"
          />
          <div className="flex flex-col">
            <label className="text-main font-semibold text-sm mb-2">
              Nama Sekolah
            </label>
            <div className="flex gap-6">
              {schoolOptions.map((option) => (
                <div
                  key={option.id}
                  className="form-check flex gap-1 items-center"
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`school-${option.id}`}
                    value={option.id}
                    checked={formData.sekolahId.includes(option.id)}
                    onChange={handleSchoolChange}
                  />
                  <label
                    className="form-check-label text-main"
                    htmlFor={`school-${option.id}`}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <ImageUploadForm
            label="Upload Gambar Informasi (max 5)"
            id="gambar"
            name="gambar"
            onChange={handleImageUpload}
            previewImages={previewImage}
            onDeleteImage={handleDeleteImage}
            isMultiple={true}
          />
        </div>
      </Modal>
    </>
  );
};

export default InformasiPage;
