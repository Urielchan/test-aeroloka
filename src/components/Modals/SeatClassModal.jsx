import React, { useEffect, useRef, useState } from "react";

const SeatClassModal = ({
  isOpen,
  onClose,
  initialSeatClass,
  onSeatClassChange,
}) => {
  const [selectSeatClass, setSelectSeatClass] = useState(initialSeatClass);
  const modalRef = useRef(null);

  const seatClasses = [
    { label: "Economy", price: 4950000 },
    { label: "Premium Economy", price: 7550000 },
    { label: "Business", price: 29220000 },
    { label: "First Class", price: 87620000 },
  ];

  const handleSeatClass = (seatClass) => {
    setSelectSeatClass(seatClass);
  };

  const handleSave = () => {
    if (selectSeatClass) {
      onSeatClassChange(selectSeatClass);
    }
    onClose();
  };

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
        className="w-[90%] min-h-[400px] bg-white p-6 rounded-lg shadow-xl lg:w-[30%]"
      >
        <button className="w-full pb-5 flex justify-end">
          <img onClick={onClose} src="/icons/fi_close.svg" alt="Close Button" />
        </button>
        <div className="flex flex-col items-center justify-center">
          {seatClasses.map((seatClass) => {
            return (
              <div
                key={seatClass.label}
                className={`w-full h-[60px] flex flex-col justify-center p-3 text-sm my-[2px] rounded-md cursor-pointer hover:bg-[#4B1979] hover:text-white  ${
                  selectSeatClass?.label === seatClass.label
                    ? "bg-[#4B1979] text-white"
                    : " "
                }`}
                onClick={() => handleSeatClass(seatClass)}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">{seatClass.label}</h3>
                    <p>IDR {seatClass.price.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between">
                    {selectSeatClass?.label === seatClass.label && (
                      <img src="/icons/fi_check.svg" alt="Checklist Icon" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className={`w-[150px] p-3 py-2 rounded-lg  ${
              selectSeatClass
                ? "bg-[#A06ECE] text-white hover:bg-[#4B1979] transition-colors duration-300"
                : "bg-[#D0D0D0] text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectSeatClass}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatClassModal;
