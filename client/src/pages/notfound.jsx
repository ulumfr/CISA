import React, { useEffect } from "react";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Cita Sakinah | Not Found";

    const timeout = setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-main">
        <h1 className="mb-1 text-4xl font-semibold">404</h1>
        <h2 className="mb-4 text-3xl font-semibold">Page Not Found</h2>
        <p className="text-center">
          Maaf, halaman yang Anda cari tidak dapat ditemukan.
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
