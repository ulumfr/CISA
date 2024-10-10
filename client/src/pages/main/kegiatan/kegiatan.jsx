import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderMenu from "../../../components/ui/header";
import HeaderImg from "../../../assets/img/kegiatan.jpg";
import CardKeg from "../../../components/ui/cardkeg";
import LoadingCard from "../../../components/loading/loadingcard";
import FilterButtons from "../../../components/ui/filterbutton";
import { LuFilter } from "react-icons/lu";
import Button from "../../../components/ui/button";
import DropdownFilter from "../../../components/ui/dropdownfilter";
import { formatDate } from "../../../utils/formatting";
import { useNavigate } from "react-router-dom";

const KegiatanPage = () => {
  const [filter, setFilter] = useState("Semua Aktivitas");
  const [schoolFilter, setSchoolFilter] = useState([]);
  const [schools, setSchools] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cita Sakinah | Kegiatan";

    const fetchData = async () => {
      try {
        const schoolResponse = await axios.get("/api/sekolah");
        setSchools(schoolResponse.data.map((school) => school.namaSekolah));

        const activityResponse = await axios.get("/api/kegiatan");
        setActivities(activityResponse.data);

        if (activityResponse.data.length === 0) {
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

  const handleSchoolFilterChange = (school) => {
    setSchoolFilter((prev) =>
      prev.includes(school)
        ? prev.filter((s) => s !== school)
        : [...prev, school]
    );
  };

  const filteredData = activities.filter(
    (item) =>
      (filter === "Semua Aktivitas" || item.namaKegiatan === filter) &&
      (schoolFilter.length === 0 ||
        schoolFilter.some((selected) =>
          item.namaSekolah.startsWith(selected.split(" ")[0])
        ))
  );

  return (
    <>
      <HeaderMenu
        img={HeaderImg}
        title="Kegiatan"
        desc="Jelajahi beragam kegiatan menarik yang dirancang untuk mengembangkan minat dan bakat peserta didik sesuai dengan perkembangan usia."
      />
      <section className="mx-[50px] md:mx-[120px] mb-[150px] flex flex-col gap-8">
        <div className="flex flex-wrap justify-between relative gap-4">
          <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
          <div className="relative">
            <Button
              color="bg-button"
              width="w-[300px]"
              name="Pilih Sekolah"
              justify="justify-between"
              padding="px-5"
              rounded="rounded-full"
              icon2={<LuFilter size={24} />}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <DropdownFilter
              isOpen={isDropdownOpen}
              options={schools}
              selectedOptions={schoolFilter}
              onSelect={handleSchoolFilterChange}
            />
          </div>
        </div>
        {noData ? (
          <p className="text-center text-main mt-20">
            Tidak ada data kegiatan. Anda akan diarahkan ke beranda dalam 5
            detik...
          </p>
        ) : (
          <div className="flex flex-wrap gap-10">
            {filteredData.map((item, index) =>
              isLoading ? (
                <LoadingCard key={index} />
              ) : (
                <CardKeg
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
                  tagUtama={item.namaKegiatan}
                  tagSekolah={item.namaSekolah}
                />
              )
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default KegiatanPage;
