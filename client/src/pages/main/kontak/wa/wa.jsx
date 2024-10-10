import React, { useState, useEffect } from "react";
import InputField from "../../../../components/form/inputfield";
import Button from "../../../../components/ui/button";
import axios from "axios";

const WaSection = () => {
  const [formData, setFormData] = useState({
    namalengkap: "",
    sekolah: "",
    sekolahId: "",
    pesan: "",
  });
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const schoolResponse = await axios.get("/api/sekolah");
        const schoolData = schoolResponse.data;

        const schoolOptions = schoolData.map((school) => ({
          value: school.namaSekolah,
          label: school.namaSekolah,
          id: school.id,
        }));

        setSchoolOptions(schoolOptions);
        if (schoolOptions.length > 0) {
          setFormData((prev) => ({
            ...prev,
            sekolah: schoolOptions[0].value,
            sekolahId: schoolOptions[0].id,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch schools:", error);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    const fetchContact = async () => {
      if (formData.sekolahId) {
        try {
          const contactResponse = await axios.get(
            `/api/user/kontak/${formData.sekolahId}`
          );
          const contactData = contactResponse.data.result[0];
          setPhoneNumber(contactData.noHandphone);
        } catch (error) {
          console.error("Failed to fetch contact number:", error);
        }
      }
    };

    fetchContact();
  }, [formData.sekolahId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sekolah") {
      const selectedSchool = schoolOptions.find(
        (school) => school.value === value
      );
      setFormData((prev) => ({
        ...prev,
        sekolah: selectedSchool.value,
        sekolahId: selectedSchool.id,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message =
      `*Nama Lengkap:* ${formData.namalengkap}%0A` +
      `*Keperluan untuk:* ${formData.sekolah}%0A` +
      `*Pesan:* ${formData.pesan}`;

    const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(waUrl, "_blank");
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-main font-bold text-3xl">Yayasan Cita Sakinah</h1>
        <span className="text-abugelap text-base">
          Perum Griya Permata Alam Blok O nomer 5-6 RT.4 RW.11 Ngijo Karangploso
          Malang
        </span>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-8">
          <InputField
            label="Nama lengkap"
            type="text"
            placeholder="Masukan Nama Lengkap Anda"
            id="namalengkap"
            name="namalengkap"
            value={formData.namalengkap}
            onChange={handleChange}
          />
          <InputField
            label="Pilihlah Sekolah"
            dropdown={true}
            id="sekolah"
            name="sekolah"
            value={formData.sekolah}
            onChange={handleChange}
            options={schoolOptions}
          />
        </div>
        <InputField
          textarea={true}
          label="Pesan"
          placeholder="Masukan Pesan Kritik yang ingin anda sampaikan"
          id="pesan"
          name="pesan"
          value={formData.pesan}
          onChange={handleChange}
          rows={4}
        />
        <Button name="Hubungi" width="w-full" color="bg-main" />
      </form>
    </div>
  );
};

export default WaSection;
