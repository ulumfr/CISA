import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/img/general.jpg";
import CardInfor from "../../../components/ui/cardinfor";
import LoadingCard from "../../../components/loading/loadingcard";
import Button from "../../../components/ui/button";
import { LuFilter } from "react-icons/lu";
import DropdownFilter from "../../../components/ui/dropdownfilter";
import { formatDate } from "../../../utils/formatting";
import { useNavigate } from "react-router-dom";

const InformasiPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [schools, setSchools] = useState([]);
  const [informasi, setInformasi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cita Sakinah | Informasi";

    const fetchData = async () => {
      try {
        const schoolResponse = await axios.get("/api/sekolah");
        setSchools(schoolResponse.data.map((school) => school.namaSekolah));

        const informasiResponse = await axios.get("/api/informasi");
        setInformasi(informasiResponse.data);

        if (informasiResponse.data.length === 0) {
          setNoData(true);
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (noData) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [noData, navigate]);

  const handleSelect = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const filteredData =
    selectedOptions.length === 0
      ? informasi
      : informasi.filter((item) =>
          selectedOptions.some((selected) =>
            item.sekolah?.some((school) =>
              school?.namaSekolah?.startsWith(selected.split(" ")[0])
            )
          )
        );

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Informasi"
        desc="Dapatkan informasi terbaru seputar informasi yang berkaitan dengan sekolah kami."
      />
      <section className="mx-[50px] md:mx-[120px] mb-[150px] flex flex-col gap-8">
        <div className="flex justify-end">
          <div className="relative">
            <Button
              color="bg-button"
              width="w-[300px]"
              name="Pilih Sekolah"
              justify="justify-between"
              padding="px-5"
              rounded="rounded-full"
              icon2={<LuFilter size={24} />}
              onClick={() => setIsOpen(!isOpen)}
            />
            <DropdownFilter
              isOpen={isOpen}
              options={schools}
              selectedOptions={selectedOptions}
              onSelect={handleSelect}
            />
          </div>
        </div>
        {noData ? (
          <p className="text-center text-main mt-20">
            Tidak ada data informasi. Anda akan diarahkan ke beranda dalam 5
            detik...
          </p>
        ) : (
          <div className="flex flex-wrap gap-10">
            {filteredData.map((item, index) =>
              isLoading ? (
                <LoadingCard key={index} />
              ) : (
                <CardInfor
                  key={item.id}
                  id={item.id}
                  // img={[
                  //   `https://paudterpaducisa.sch.id/api/storage/uploads/${item.image[0].fileName
                  //   }`,
                  // ]}
                  img={[
                    `${import.meta.env.VITE_API_URL}/storage/uploads/${
                      item.image[0].fileName
                    }`,
                  ]}
                  title={item.judul}
                  detail={item.deskripsi}
                  date={formatDate(item.tanggal)}
                  tagSekolah={item.sekolah.map(
                    (sekolah) => sekolah.namaSekolah.split(" ")[0]
                  )}
                />
              )
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default InformasiPage;
