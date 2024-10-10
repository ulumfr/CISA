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

const KegiatanPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [dataKegiatan, setDataKegiatan] = useState([]);
  const [kegiatanOptions, setKegiatanOptions] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    tanggal: "",
    desc: "",
    tipe: "",
    jenisKegiatan: "",
    sekolah: "",
    sekolahId: "",
    gambar: [],
  });

  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Kegiatan ";

    const fetchData = async () => {
      try {
        const [kegiatanRes, jenisRes, sekolahRes] = await Promise.all([
          axios.get("/api/kegiatan"),
          axios.get("/api/kegiatan/jenis"),
          axios.get("/api/sekolah"),
        ]);

        const formattedData = kegiatanRes.data.map((item) => ({
          id: item.id,
          title: item.judul,
          tanggal: item.tanggal,
          desc: item.deskripsi,
          tipe: item.namaKegiatan,
          sekolah: item.namaSekolah,
          gambar: item.image.map((img) => ({
            idImage: img.idImage,
            fileName: img.fileName,
          })),
        }));

        setFilteredData(formattedData);
        setDataKegiatan(formattedData);

        setKegiatanOptions(
          jenisRes.data.rows.map((jenis) => ({
            label: jenis.namaKegiatan,
            value: jenis.namaKegiatan,
            id: jenis.id,
          }))
        );

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
      ? dataKegiatan.filter((kegiatan) =>
        kegiatan.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : dataKegiatan;

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, dataKegiatan]);

  const handleAddClick = () => {
    setFormData({
      title: "",
      tanggal: "",
      desc: "",
      tipe: "",
      jenisKegiatan: "",
      sekolah: "",
      sekolahId: "",
      gambar: [],
    });
    setPreviewImage([]);
    setIsEdit(false);
    setIsEditModalOpen(true);
  };

  const handleEditClick = (kegiatan) => {
    const selectedSchool = schoolOptions.find(
      (option) => option.label === kegiatan.sekolah
    );
    const selectedJenis = kegiatanOptions.find(
      (option) => option.label === kegiatan.tipe
    );

    setFormData({
      title: kegiatan.title,
      desc: kegiatan.desc,
      tanggal: kegiatan.tanggal,
      tipe: kegiatan.tipe,
      jenisKegiatan: selectedJenis?.id || "",
      sekolah: kegiatan.sekolah,
      sekolahId: selectedSchool?.id || "",
      gambar: kegiatan.gambar.map((img) => ({
        idImage: img.idImage,
        fileName: img.fileName,
      })),
    });

    // setPreviewImage(
    //   kegiatan.gambar.map((img) => ({
    //     idImage: img.idImage,
    //     url: `https://paudterpaducisa.sch.id/api/storage/uploads/${img.fileName}`,
    //   }))
    // );

    setPreviewImage(
      kegiatan.gambar.map((img) => ({
        idImage: img.idImage,
        url: `${import.meta.env.VITE_API_URL}/storage/uploads/${img.fileName}`,
      }))
    );

    setSelectedKegiatan(kegiatan);
    setIsEdit(true);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (kegiatan) => {
    setSelectedKegiatan(kegiatan);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/kegiatan/${selectedKegiatan.id}`
      );
      setFilteredData(
        filteredData.filter((item) => item.id !== selectedKegiatan.id)
      );
      toast.success(response.data.message);
      setIsDeleteModalOpen(false);
      setSelectedKegiatan(null);
    } catch (error) {
      console.error("Error deleting kegiatan: ", error);
      toast.error("Failed to delete kegiatan");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedKegiatan(null);
  };

  const handleSaveKegiatan = async () => {
    if (
      !formData.title ||
      !formData.desc ||
      !formData.tanggal ||
      !formData.jenisKegiatan ||
      !formData.sekolahId
    ) {
      toast.error("Semua kolom harus diisi!");
      return;
    }

    if (formData.gambar.length === 0) {
      toast.error("Minimal 1 gambar yang diupload");
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("judul", formData.title);
    formDataToSend.append("deskripsi", formData.desc);
    formDataToSend.append("tanggal", formData.tanggal);
    formDataToSend.append("jenisKegiatan", formData.jenisKegiatan);
    formDataToSend.append("sekolahId", formData.sekolahId);

    formData.gambar.forEach((file) => {
      if (!file.idImage) {
        formDataToSend.append("files", file.file);
      }
    });

    try {
      let response;
      const deleteParams =
        imagesToDelete.length > 0 ? `idImage=${imagesToDelete.join(",")}` : "";

      if (isEdit) {
        response = await axios.patch(
          `/api/kegiatan/${selectedKegiatan.id}?${deleteParams}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${user}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post("/api/kegiatan", formDataToSend, {
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
        toast.error(
          isEdit ? error.response.data.message : error.response.data.message
        );
      }
      console.error("Error saving kegiatan: ", error);
    } finally {
      setIsEditModalOpen(false);
      setSelectedKegiatan(null);
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
    } else if (name === "tipe") {
      const selectedJenis = kegiatanOptions.find(
        (option) => option.value === value
      );
      setFormData({
        ...formData,
        tipe: value,
        jenisKegiatan: selectedJenis?.id || "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

  const columnsKegiatan = [
    { header: "Judul", field: "title", truncate: 15, width: "w-[10%]" },
    { header: "Gambar", field: "gambar", truncate: 10, width: "w-[10%]" },
    { header: "Deskripsi", field: "desc", truncate: 25, width: "w-[20%]" },
    { header: "Tipe Kegiatan", field: "tipe", truncate: 20, width: "w-[15%]" },
    {
      header: "Tanggal Kegiatan",
      field: "tanggal",
      truncate: 15,
      width: "w-[15%]",
    },
    { header: "Sekolah", field: "sekolah", truncate: 20, width: "w-[15%]" },
    { header: "Aksi", field: "action", truncate: 0, width: "w-[10%]" },
  ];

  const extractTextFromPTags = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    return Array.from(paragraphs)
      .map((p) => p.textContent)
      .join(" ");
  };

  const dataReal = filteredData.map((kegiatan) => ({
    ...kegiatan,
    desc: extractTextFromPTags(kegiatan.desc),
    gambar:
      kegiatan.gambar.length > 0 ? kegiatan.gambar[0].fileName : "No Image",
    action: (
      <div className="flex gap-3 items-center">
        <LuPen
          className="text-second cursor-pointer"
          onClick={() => handleEditClick(kegiatan)}
          size={20}
        />
        <FaRegTrashAlt
          className="text-button cursor-pointer"
          onClick={() => handleDeleteClick(kegiatan)}
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
          <h1 className="text-main font-bold text-2xl">Kegiatan</h1>
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
        <TableDashboard columns={columnsKegiatan} data={paginatedData} />
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
        isOpen={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onConfirm={handleSaveKegiatan}
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
            label="Tipe Kegiatan"
            id="tipe"
            name="tipe"
            value={formData.tipe}
            onChange={handleInputChange}
            placeholder="Pilih Tipe Kegiatan"
            dropdown
            options={kegiatanOptions}
          />
          <InputField
            label="Nama Sekolah"
            id="sekolah"
            name="sekolah"
            value={formData.sekolah}
            onChange={handleInputChange}
            placeholder="Pilih Nama Sekolah"
            dropdown
            options={schoolOptions}
          />
          <InputField
            label="Tanggal Kegiatan"
            id="tanggal"
            name="tanggal"
            type="date"
            value={formData.tanggal}
            onChange={(e) =>
              setFormData({ ...formData, tanggal: e.target.value })
            }
            placeholder="Masukkan Tanggal Kegiatan"
          />
          <ImageUploadForm
            label="Upload Gambar Kegiatan (max 5)"
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

export default KegiatanPage;
