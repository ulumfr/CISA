import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../../../../components/ui/header";
import HeaderImg from "../../../../assets/img/general.jpg";
import CardFasilitas from "../../../../components/ui/cardfasilitas";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import LoadingCardFasilitas from "../../../../components/loading/loadingcardfasilitas";

const FasilitasPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataFasilitas, setDataFasilitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cita Sakinah | Profil - Fasilitas";

    const fetchFasilitas = async () => {
      try {
        const response = await axios.get("/api/fasilitas");
        setDataFasilitas(response.data);
      } catch (error) {
        console.error("Error fetching facilities data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFasilitas();
  }, []);

  const sections = [
    {
      school: "Tempat Penitipan Anak",
      alias: "TPA",
      bg: "bg-second",
      text: "text-main",
      garis: "border-button",
    },
    {
      school: "Kelompok Bermain",
      alias: "KB",
      bg: "bg-button",
      text: "text-main",
      garis: "border-button",
    },
    {
      school: "Taman Kanak-Kanak",
      alias: "TK",
      bg: "bg-main",
      text: "text-button",
      garis: "border-main",
    },
  ];

  const renderSwiperSlides = (facilities, textColor, borderColor) => {
    return facilities.map((facility, index) => (
      <SwiperSlide key={index}>
        {isLoading ? (
          <LoadingCardFasilitas />
        ) : (
          <CardFasilitas
            // img={`https://paudterpaducisa.sch.id/api/storage/uploads/${facility.imageName
            //   }`}
            img={`${import.meta.env.VITE_API_URL}/storage/uploads/${
              facility.imageName
            }`}
            title={facility.namaFasilitas}
            textColor={textColor}
            borderColor={borderColor}
          />
        )}
      </SwiperSlide>
    ));
  };

  const noFacilitiesAvailable = sections.every((section) => {
    const filteredFacilities = dataFasilitas.filter((facility) =>
      facility.namaSekolah.toLowerCase().startsWith(section.alias.toLowerCase())
    );
    return filteredFacilities.length === 0;
  });

  useEffect(() => {
    if (noFacilitiesAvailable) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [noFacilitiesAvailable, navigate]);

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Fasilitas"
        desc="Temukan berbagai fasilitas unggulan yang kami sediakan untuk mendukung proses belajar dan mengajar yang efektif dan nyaman."
      />
      <section className="mx-[50px] md:mx-[120px] mb-[150px]">
        {noFacilitiesAvailable ? (
          <>
            <p className="text-center text-main">
              Tidak ada data informasi. Anda akan diarahkan ke beranda dalam 5
              detik...
            </p>
          </>
        ) : (
          sections.map((section, index) => {
            const filteredFacilities = dataFasilitas.filter((facility) =>
              facility.namaSekolah
                .toLowerCase()
                .startsWith(section.alias.toLowerCase())
            );

            if (filteredFacilities.length === 0) {
              return null;
            }

            return (
              <div
                key={index}
                className={`${section.bg} px-7 sm:px-[60px] py-[30px] rounded-[18px] flex flex-col gap-[30px] mt-[50px]`}
              >
                <h1
                  className={`text-center font-bold text-2xl sm:text-4xl text-white`}
                >
                  {section.school}
                </h1>
                <div>
                  <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={60}
                    slidesPerView={1}
                    className="pb-10"
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 4,
                      },
                    }}
                  >
                    {renderSwiperSlides(
                      filteredFacilities,
                      section.text,
                      section.garis
                    )}
                  </Swiper>
                </div>
              </div>
            );
          })
        )}
      </section>
    </>
  );
};

export default FasilitasPage;
