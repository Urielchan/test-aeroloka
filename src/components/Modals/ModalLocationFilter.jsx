// ModalLocationFilter.js
import React from "react";

const ModalLocationFilter = ({
  isOpen,
  onClose,
  searchLocation,
  onLocationChange,
  onKeyDown,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="w-[700px] h-[300px] bg-white p-6 rounded-lg shadow-xl">
        <div className="relative w-full flex mb-4">
          <input
            type="text"
            placeholder="Cari kota keberangkatan"
            value={searchLocation}
            onChange={onLocationChange}
            onKeyDown={onKeyDown}
            className="w-full h-[40px] py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-[#7126B5]"
          />
          <button
            onClick={onClose}
            className="absolute top-1 right-2 text-gray-600 text-lg font-bold"
          >
            <img src="/icons/fi_close.svg" alt="Tutup" />
          </button>
        </div>

        <ul className="space-y-2 h-[130px] overflow-y-auto">
          {searchLocation ? (
            <li className="w-full flex justify-between items-center cursor-pointer pb-3 pr-2 border-b-2 border-[#D0D0D0] focus:outline-none hover:border-[#7126B5]">
              <span>{searchLocation} (Kode Kota)</span>
            </li>
          ) : (
            <li className="text-gray-500">Tidak ada kota yang cocok</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ModalLocationFilter;
