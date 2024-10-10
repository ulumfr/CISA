import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FaqItem = ({ id, question, answer, openFaq, setOpenFaq }) => {
  const isFaqOpen = openFaq === id;

  const toggleFaq = () => {
    setOpenFaq(isFaqOpen ? null : id);
  };

  return (
    <div>
      <button
        className="flex justify-between w-full text-main"
        onClick={toggleFaq}
      >
        <span className="font-semibold text-start text-lg">{question}</span>
        {isFaqOpen ? (
          <IoIosArrowUp className="hidden sm:block text-textSecondary text-2xl" />
        ) : (
          <IoIosArrowDown className="hidden sm:block text-textSecondary text-2xl" />
        )}
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-base text-textTertiary ${
          isFaqOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <h4 className="overflow-hidden pr-10 text-abugelap">{answer}</h4>
      </div>
    </div>
  );
};

export default FaqItem;
