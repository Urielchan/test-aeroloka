import React, { useState } from "react";

const FilterButton = ({ onFilterChange, selectedFilter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temporaryFilter, setTemporaryFilter] = useState(selectedFilter);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setTemporaryFilter(selectedFilter);
  };

  const handleFilterSelect = (filter) => {
    setTemporaryFilter(filter);
  };

  const applyFilter = () => {
    onFilterChange(temporaryFilter);
    setIsModalOpen(false); // Tutup modal
  };

  return (
    <div className="w-full md:w-4/5 mx-auto mt-5 flex items-center justify-end mb-7 p-2">
      <button
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 focus:outline-none bg-white text-purple-500 border border-purple-400 hover:bg-purple-600 hover:text-white shadow-lg h-[32px] min-w-fit p-5 rounded-[16px]"
        type="button"
        onClick={handleModalToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-up-down w-5 h-5 mr-2"
        >
          <path d="m21 16-4 4-4-4"></path>
          <path d="M17 20V4"></path>
          <path d="m3 8 4-4 4 4"></path>
          <path d="M7 4v16"></path>
        </svg>
        <span className="text-sm font-medium leading-none cursor-pointer">
          {selectedFilter}
        </span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-[16px] shadow-lg w-[400px] h-[384px]">
            {/* Close */}
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-800"
              onClick={handleModalToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="bg-white text-center py-3 rounded-t-[16px] mb-2"></div>

            {/* List Options */}
            <ul className="w-full">
              {[
                "Harga - Termurah",
                "Durasi - Terpendek",
                "Keberangkatan - Paling Awal",
                "Keberangkatan - Paling Akhir",
                "Kedatangan - Paling Awal",
                "Kedatangan - Paling Akhir",
              ].map((option) => (
                <li
                  key={option}
                  onClick={() => handleFilterSelect(option)}
                  className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 last:border-b-0 cursor-pointer ${
                    temporaryFilter === option
                      ? "bg-[#7126B5] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>

            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleModalToggle}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-[#7126B5] text-white rounded hover:bg-[#5a1b8a]"
                onClick={applyFilter}
              >
                Pilih
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
