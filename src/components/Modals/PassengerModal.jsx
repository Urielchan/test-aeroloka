import React, { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const PassengerModal = ({ isOpen, onClose, passengers, onPassengerChange }) => {
  const [tempPassengers, setTempPassengers] = useState(passengers);
  const modalRef = useRef(null);

  const passengerDetails = [
    {
      type: "Dewasa",
      description: "(12 tahun keatas)",
      iconPath: "/icons/fi_adult.svg",
    },
    {
      type: "Anak",
      description: " (2 - 11 tahun)",
      iconPath: "/icons/fi_child.svg",
    },
    {
      type: "Bayi",
      description: "(Dibawah 2 tahun)",
      iconPath: "/icons/fi_baby.svg",
    },
  ];

  const handleIncrement = (type) => {
    setTempPassengers({
      ...tempPassengers,
      [type]: tempPassengers[type] + 1,
    });
  };

  const handleDecrement = (type) => {
    if (tempPassengers[type] > 0) {
      setTempPassengers({
        ...tempPassengers,
        [type]: tempPassengers[type] - 1,
      });
    }
  };

  const handleSave = () => {
    onPassengerChange(tempPassengers);
    onClose();
  };

  const hasPassengers = Object.values(tempPassengers).some(
    (count) => count > 0
  );

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

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-70 flex justify-center items-center">
      <div
        ref={modalRef}
        className="w-[90%] min-h-[305px] bg-white p-6 rounded-lg shadow-xl lg:w-[30%]"
      >
        <button className="w-full pb-5 flex justify-end">
          <img onClick={onClose} src="/icons/fi_close.svg" alt="Close Button" />
        </button>
        <div className="space-y-4">
          {passengerDetails.map(({ type, description, iconPath }) => (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={iconPath} alt="Passenger Icon" />
                <div className="ml-2">
                  <h3 className="capitalize font-bold">{type}</h3>
                  <p className="text-sm">{description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleDecrement(type)}
                  className="w-10 h-10 bg-white rounded-md flex justify-center items-center border border-[#7126B5] hover:border-2"
                >
                  <FaMinus className="text-[#D0D0D0] hover:text-[#7126B5]" />
                </button>
                <span
                  className={`w-14 h-10 text-center flex items-center justify-center rounded-md border ${
                    tempPassengers[type] > 0
                      ? "border-[#7126B5] text-[#7126B5] border-2 font-semibold"
                      : "border-[#D0D0D0] text-[#D0D0D0]"
                  }`}
                >
                  {tempPassengers[type]}
                </span>
                <button
                  onClick={() => handleIncrement(type)}
                  className="w-10 h-10 bg-white rounded-md flex justify-center items-center border border-[#7126B5] hover:border-2"
                >
                  <FaPlus className="text-[#D0D0D0] hover:text-[#7126B5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className={`w-[150px] p-3 py-2 rounded-lg ${
              hasPassengers
                ? "bg-[#A06ECE] text-white hover:bg-[#4B1979] transition-colors duration-300"
                : "bg-[#D0D0D0] text-gray-500 cursor-not-allowed"
            }`}
            disabled={!hasPassengers}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerModal;
