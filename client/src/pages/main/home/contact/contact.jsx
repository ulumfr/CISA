import React from "react";
import ContactImg from "../../../../assets/img/apresiasi.jpg";
import Button from "../../../../components/ui/button";
import { FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ContactSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/kontak");
  };

  return (
    <section className="mx-[50px] md:mx-[120px] mb-[150px]" id="contact">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-between h-full gap-5">
          <div className="flex flex-col gap-4">
            <h1 className="text-main font-bold text-4xl sm:text-5xl">
              Terima kasih, Kedatangan Anda Sangat Kami Apresiasi
            </h1>
            <span className="text-abugelap text-base font-medium">
              Kami berharap Anda dapat merasakan dedikasi dan semangat kami
              dalam memberikan yang terbaik bagi perkembangan dan kesejahteraan
              anak-anak. Jika Anda memiliki pertanyaan atau membutuhkan
              informasi lebih lanjut, jangan ragu untuk menghubungi kami.
            </span>
          </div>
          <Button
            name="Kontak"
            icon={<FiMessageSquare size={24} />}
            width="w-[170px]"
            color="bg-button"
            onClick={handleClick}
          />
        </div>

        <img
          src={ContactImg}
          alt="contact-img"
          draggable="false"
          className="rounded-xl w-full h-[406px] object-cover"
        />
      </div>
    </section>
  );
};

export default ContactSection;
