import React from "react";

const Modal = ({
  isOpen,
  onCancel,
  onConfirm,
  confirm,
  children,
  width,
  justify,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-3xl px-12 py-8 flex flex-col ${width} ${justify} max-h-screen`}
      >
        {children}
        <div className="flex gap-4 justify-center items-center mt-6">
          <button
            className="rounded-2xl border border-main text-main font-medium text-base py-2 px-10"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="rounded-2xl bg-main text-white font-medium text-base py-2 px-10"
            onClick={onConfirm}
          >
            {confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
