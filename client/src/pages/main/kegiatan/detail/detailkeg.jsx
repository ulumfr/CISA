import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuClipboardCheck } from "react-icons/lu";
import { FaRegBuilding } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download, Zoom } from "yet-another-react-lightbox/plugins";
import { RiArrowLeftLine } from "react-icons/ri";
import { formatDate } from "../../../../utils/formatting";

const DetailKegPage = () => {
  const { id } = useParams();
  const [kegiatan, setKegiatan] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await axios.get(`/api/kegiatan/${id}`);
        setKegiatan(response.data[0]);
      } catch (error) {
        console.error("Error fetching kegiatan data from API:", error);
      }
    };

    fetchKegiatan();
  }, [id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!kegiatan) {
        navigate("/");
        window.location.reload();
      }
    }, 5000);

    document.title = kegiatan
      ? `Cita Sakinah | Detail Kegiatan #${kegiatan.id}`
      : `Cita Sakinah | No Data`;

    return () => clearTimeout(timeoutId);
  }, [kegiatan, navigate]);

  if (!kegiatan) {
    return (
      <div className="flex justify-center h-screen items-center text-main font-semibold">
        LOADING .......
      </div>
    );
  }

  const handleOpenLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // const imageUrlBase = `https://paudterpaducisa.sch.id/api/storage/uploads`;
  const imageUrlBase = `${import.meta.env.VITE_API_URL}/storage/uploads`;

  return (
    <>
      <section className="mx-[50px] md:mx-[120px] mb-[150px]">
        <div className="mt-[135px] flex flex-col gap-5">
          <button
            className="flex items-center gap-3 font-medium text-xl cursor-pointer w-fit hover:scale-105 duration-200 text-main"
            onClick={() => navigate(-1)}
          >
            <RiArrowLeftLine size={24} />
            <span>Kembali</span>
          </button>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-[70%] flex flex-col gap-10">
              <img
                src={`${imageUrlBase}/${kegiatan.fileName[0]}`}
                alt={`img-detail`}
                className="rounded-2xl w-full cursor-pointer h-[460px] object-cover"
                onClick={() => handleOpenLightbox(0)}
              />
              <div className="flex gap-5 flex-col">
                <div className="flex mb-2 text-white font-semibold sm:text-lg gap-4">
                  <span className="bg-button px-2 py-1 rounded-md flex gap-2 items-center capitalize">
                    <LuClipboardCheck />
                    {kegiatan.namaKegiatan}
                  </span>
                  <span className="bg-button px-2 py-1 rounded-md flex items-center gap-2 capitalize">
                    <FaRegBuilding /> {kegiatan.namaSekolah}
                  </span>
                </div>
                <div>
                  <h1 className="font-bold text-main text-2xl sm:text-4xl">
                    {kegiatan.judul}
                  </h1>
                  <h3 className="text-abugelap font-medium text-lg">
                    {formatDate(kegiatan.tanggal)}
                  </h3>
                </div>
                <div
                  className="text-abugelap ql-editor"
                  dangerouslySetInnerHTML={{ __html: kegiatan.deskripsi }}
                />
              </div>
            </div>

            <div className="md:w-[30%] grid grid-cols-2 gap-5 h-fit">
              {kegiatan.fileName &&
                kegiatan.fileName
                  .slice(1)
                  .map((fileName, index) => (
                    <img
                      key={index + 1}
                      src={`${imageUrlBase}/${fileName}`}
                      alt={`img-detail-${index + 1}`}
                      className="rounded-2xl w-full cursor-pointer h-40 object-cover"
                      onClick={() => handleOpenLightbox(index + 1)}
                    />
                  ))}
            </div>
          </div>
        </div>
        {isOpen && kegiatan.fileName && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            index={currentIndex}
            slides={kegiatan.fileName.map((fileName) => ({
              src: `${imageUrlBase}/${fileName}`,
            }))}
            plugins={[Download, Zoom]}
          />
        )}
      </section>
    </>
  );
};

export default DetailKegPage;
