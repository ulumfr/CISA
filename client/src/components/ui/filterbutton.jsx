import React, { useEffect, useState } from "react";
import axios from "axios";

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get("/api/kegiatan/jenis");
        const apiFilters = response.data.rows.map((item) => item.namaKegiatan);
        setFilters(["Semua Aktivitas", ...apiFilters]);
      } catch (error) {
        console.error("Error fetching filter options: ", error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full ${
            currentFilter === filter
              ? "bg-main text-white font-medium"
              : "bg-white border border-main text-main font-medium"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
