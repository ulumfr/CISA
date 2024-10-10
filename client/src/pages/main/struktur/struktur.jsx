import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/img/general.jpg";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download, Zoom } from "yet-another-react-lightbox/plugins";
import LoadingStruktur from "../../../components/loading/loadingstruktur";

const StrukturPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [strukturImg, setStrukturImg] = useState("");

  useEffect(() => {
    document.title = "Cita Sakinah | Struktur";

    const fetchStructureImage = async () => {
      try {
        const response = await axios.get("/api/struktur");
        setStrukturImg(response.data.result[0].imageName);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch structure image:", error);
        setIsLoading(false);
      }
    };

    fetchStructureImage();
  }, []);

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Struktur Kepengurusan"
        desc="Struktur kepengurusan kami yang menggambarkan hierarki dan tanggung jawab setiap posisi dalam organisasi dan memastikan setiap bagian dari organisasi berfungsi dengan efektif."
      />

      <section className="mx-[50px] md:mx-[120px] my-[90px] flex justify-center">
        {isLoading ? (
          <LoadingStruktur />
        ) : (
          // <img
          //   src={`https://paudterpaducisa.sch.id/api/storage/uploads/${strukturImg}`}
          //   alt="struktur-citasakinah"
          //   draggable="false"
          //   className="object-cover cursor-pointer"
          //   onClick={() => setIsOpen(true)}
          // />
          <img
            src={`${
              import.meta.env.VITE_API_URL
            }/storage/uploads/${strukturImg}`}
            alt="struktur-citasakinah"
            draggable="false"
            className="object-cover cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            // slides={[
            //   {
            //     src: `https://paudterpaducisa.sch.id/api/storage/uploads/${strukturImg}`,
            //     downloadFilename: "Struktur Organisasi",
            //   },
            // ]}
            slides={[
              {
                src: `${
                  import.meta.env.VITE_API_URL
                }/storage/uploads/${strukturImg}`,
                downloadFilename: "Struktur Organisasi",
              },
            ]}
            plugins={[Download, Zoom]}
          />
        )}
      </section>
    </>
  );
};

export default StrukturPage;
