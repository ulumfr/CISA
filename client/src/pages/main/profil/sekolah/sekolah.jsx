import React, { useEffect, useState } from "react";
import axios from "axios";
import IntroSection from "./intro/intro";
import StatisticSection from "./statistic/statistic";
import LatarSection from "./latar/latar";
import PengelolaSection from "./pengelola/pengelola";
import { dataSekolah } from "../../../../data/datasekolah";
import { useParams } from "react-router-dom";

const SekolahPage = () => {
  const { singkatan } = useParams();
  const lowercaseSingkatan = singkatan.toLowerCase();
  const [apiSchoolData, setApiSchoolData] = useState(null);

  const localSchoolData = dataSekolah.find(
    (school) => school.singkatan.toLowerCase() === lowercaseSingkatan
  );

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await axios.get("/api/sekolah");
        const schoolFromApi = response.data.find((school) =>
          school.namaSekolah.toLowerCase().startsWith(lowercaseSingkatan)
        );
        setApiSchoolData(schoolFromApi);
      } catch (error) {
        console.error("Error fetching school data from API:", error);
      }
    };

    fetchSchoolData();
  }, [lowercaseSingkatan]);

  useEffect(() => {
    document.title = `Cita Sakinah | Profil - ${
      localSchoolData?.sekolah || "Not Found"
    }`;
  }, [localSchoolData]);

  if (!localSchoolData || !apiSchoolData) {
    return (
      <div className="flex justify-center h-screen items-center text-main font-semibold">
        LOADING .......
      </div>
    );
  }

  return (
    <>
      <IntroSection data={localSchoolData} apiData={apiSchoolData} />
      <StatisticSection apiData={apiSchoolData} />
      <LatarSection data={localSchoolData} />
      {/* kyknya ada warning di maps  */}
      <PengelolaSection data={localSchoolData} />
    </>
  );
};

export default SekolahPage;
