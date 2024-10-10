import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-10 px-4 text-main gap-5">
      <div className="text-sm">
        Halaman {currentPage} dari {totalPages}
      </div>
      <div className="mt-2 sm:mt-0">
        <button
          className={`ml-0 sm:ml-4 px-4 py-2 text-sm border border-abu rounded-xl bg-white hover:bg-main hover:text-white text-main ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Sebelumnya
        </button>
        <button
          className={`ml-2 px-4 py-2 text-sm border border-abu rounded-xl bg-white hover:bg-main hover:text-white text-main ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default Pagination;
