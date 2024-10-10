import React from "react";
import { FaRegBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CardInfor = ({ id, img, title, detail, date, tagSekolah }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/informasi/${id}`);
  };

  const extractTextFromPTags = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    return Array.from(paragraphs)
      .map((p) => p.textContent)
      .join(" ");
  };

  return (
    <div
      className="bg-white w-full md:w-[375px] rounded-xl mb-6 border border-abugelap border-opacity-30 shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={img[0]}
          alt={`img-card`}
          draggable="false"
          className={`rounded-t-xl object-cover w-full h-48`}
        />
      </div>
      <div className="p-5 flex flex-col h-[206px]">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-3">
            <div className="flex mb-2 text-white font-semibold text-[13px] gap-2">
              {tagSekolah.map((tag, index) => (
                <span
                  key={index}
                  className="bg-button px-2 py-1 rounded-md flex items-center gap-2 capitalize"
                >
                  <FaRegBuilding /> {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col text-main">
              <h3 className="text-xl font-semibold mb-2 truncate">{title}</h3>
              <p className="mb-2 font-normal truncate">
                {extractTextFromPTags(detail)}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-abugelap font-semibold text-sm">{date}</p>
            <button
              onClick={handleClick}
              className="text-button text-sm font-semibold"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfor;
