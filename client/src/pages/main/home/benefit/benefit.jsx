import React from "react";
import CardBenefit from "../../../../components/ui/cardbenefit";
import { benefitData } from "../../../../data/databenefit";

const BenefitSection = () => {
  return (
    <section
      className="relative mx-[50px] md:mx-[120px] bg-main rounded-3xl text-white"
      id="benefit"
    >
      <div className="absolute left-0 m-[21px] w-[26px] h-[26px] bg-white rounded-full" />
      <div className="absolute right-0 m-[21px] w-[26px] h-[26px] bg-white rounded-full" />
      <div className="absolute left-0 bottom-0 m-[21px] w-[26px] h-[26px] bg-white rounded-full" />
      <div className="absolute right-0 bottom-0 m-[21px] w-[26px] h-[26px] bg-white rounded-full" />

      <div className="px-[60px] py-[135px] flex flex-col items-center gap-[75px]">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center md:px-[230px]">
          Mengapa Anda Harus <span className="text-second">Memilih</span>{" "}
          Kami?
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[60px]">
          {benefitData.map((benefit, index) => (
            <CardBenefit key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
