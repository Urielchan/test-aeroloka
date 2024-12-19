import React, { useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const FlightModal = ({ isOpen, onClose, onSelectFlight, currentLocation }) => {
  const [searchTerm, setSearchTerm] = useState(currentLocation || "");
  const modalRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const [locations, setLocations] = useState([
    "Jakarta",
    "Bandung",
    "Surabaya",
    "Denpasar",
  ]);

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (!searchTerm) return;
    const existingIndex = locations.findIndex(
      (location) => location.toLowerCase() === searchTerm.toLowerCase()
    );
    let updatedLocations = [...locations];
    if (existingIndex !== -1) {
      updatedLocations.splice(existingIndex, 1);
    }
    updatedLocations = [searchTerm, ...updatedLocations];
    setLocations(updatedLocations);
    onSelectFlight(searchTerm);
    onClose();
  };

  const removeLocation = (index) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  const handleLocationSelect = (location) => {
    setSearchTerm(location);
    onSelectFlight(location);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setSearchTerm(currentLocation || "");
    }
  }, [isOpen, currentLocation]);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleHoverStart = (index) => {
    setHovered(index);
  };

  const handleHoverEnd = () => {
    setHovered(null);
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-70 flex justify-center items-center">
      <div
        ref={modalRef}
        className="w-[90%] min-h-[350px] bg-white p-6 rounded-lg shadow-xl lg:w-[50%]"
      >
        <div className="relative w-full flex mb-4">
          <button>
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </button>
          <input
            type="text"
            placeholder="Masukkan Kota atau Negara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full h-[40px] py-5 pl-12 mr-3 cursor-pointer rounded-lg border border-[#D0D0D0] focus:outline-none focus:border-[#7126B5] placeholder:text-sm md:placeholder:text-base"
          />
          <button onClick={onClose} className="text-gray-600 text-lg font-bold">
            <FiX size={25} className="text-gray-600" />
          </button>
        </div>

        <div className="w-full p-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold mb-4">Pencarian terkini</h2>
            <p
              onClick={() => setLocations([])}
              className="text-red-500 font-medium cursor-pointer"
            >
              Hapus
            </p>
          </div>

          <ul className="space-y-1 h-[180px] overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleLocationSelect(location);
                  }}
                  onMouseEnter={() => handleHoverStart(index)}
                  onMouseLeave={handleHoverEnd}
                  className={`w-full flex justify-between items-center cursor-pointer p-3 border border-[#E2D4F0] rounded-lg focus:outline-none transition-all duration-300 ${
                    hovered === index
                      ? "bg-[#4B1979] text-white shadow-lg"
                      : "hover:bg-[#E2D4F0]"
                  }`}
                >
                  <span>{location}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLocation(index);
                    }}
                  >
                    <FiX
                      size={20}
                      className={`text-gray-600 transition-all duration-300 ${
                        hovered === index ? "text-white" : "hover:text-white"
                      }`}
                    />
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Tidak ada lokasi yang cocok</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlightModal;
