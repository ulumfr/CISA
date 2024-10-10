import React, { useState } from "react";
import FaqItem from "../../../../components/ui/faqitem";
import { faqData } from "../../../../data/datafaq";

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(
    faqData.length > 0 ? faqData[0].id : null
  );

  return (
    <div className="shadow-md p-7 rounded-xl flex flex-col gap-5 bg-white">
      <h1 className="text-main font-semibold text-2xl">
        Pertanyaan yang sering ditanyakan
      </h1>
      <div className="sm:border sm:border-main rounded-lg overflow-hidden">
        {faqData.map((faq) => (
          <div
            key={faq.id}
            className="sm:border-b last:border-b-0 border-main py-[17px] sm:px-[27px]"
          >
            <FaqItem
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
