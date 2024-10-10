import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../../components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import Modal from "../../../components/modal/modal";
import ImageUploadForm from "../../../components/form/imageupload";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";

const StrukturPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const [strukturImg, setStrukturImg] = useState("");

  useEffect(() => {
    document.title = "Cita Sakinah | Admin - Struktur ";

    const fetchStructureImage = async () => {
      try {
        const response = await axios.get("/api/struktur");
        const imageName = response.data.result[0].imageName;
        setStrukturImg(imageName);
        // setPreviewImage(
        //   `https://paudterpaducisa.sch.id/api/storage/uploads/${imageName}`
        // );
        setPreviewImage(
          `${import.meta.env.VITE_API_URL}/storage/uploads/${imageName}`
        );
      } catch (error) {
        console.error("Failed to fetch structure image:", error);
      }
    };

    fetchStructureImage();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // setPreviewImage(
    //   `https://paudterpaducisa.sch.id/api/storage/uploads/${strukturImg}`
    // );
    setPreviewImage(
      `${import.meta.env.VITE_API_URL}/storage/uploads/${strukturImg}`
    );
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);

    try {
      const response = await axios.put("/api/struktur", formData, {
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to save structure image:", error);
      toast.error("Error Update Structure Image. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-7 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-main font-bold text-2xl">Struktur</h1>
          <Button
            name="Edit"
            icon={<FaRegEdit />}
            color="bg-main"
            width="w-[127px]"
            rounded="rounded-full"
            onClick={openModal}
          />
        </div>
        <div className="border border-main rounded-lg h-full flex justify-center items-center p-10">
          {/* <img
            src={
              strukturImg
                ? `https://paudterpaducisa.sch.id/api/storage/uploads/${strukturImg}`
                : "/path/to/default-image.jpg"
            }
            alt="img-struktur"
            draggable="false"
          /> */}
          <img
            src={`${
              import.meta.env.VITE_API_URL
            }/storage/uploads/${strukturImg}`}
            alt="img-struktur"
            draggable="false"
          />
        </div>

        <Modal
          isOpen={isModalOpen}
          onConfirm={handleSave}
          onCancel={closeModal}
          confirm="Simpan"
        >
          <ImageUploadForm
            label="Upload Gambar Struktur"
            fileInputRef={fileInputRef}
            handleImageUpload={handleImageUpload}
            previewImages={previewImage}
            isMultiple={false}
          />
        </Modal>
      </div>
    </>
  );
};

export default StrukturPage;
