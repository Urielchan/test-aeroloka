import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalDateFilter = ({ isOpen, onClose, onSelectDate, selectedDate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="flex justify-between mb-4">
        <button onClick={onClose} className="text-gray-600 text-lg font-bold">
          <img src="/icons/fi_close.svg" alt="Tutup" />
        </button>
      </div>

      <DatePicker selected={selectedDate} onChange={onSelectDate} inline />

      <div className="flex justify-between mt-4">
        {selectedDate && (
          <button
            onClick={() => {
              onSelectDate(selectedDate);
              onClose();
            }}
            className="text-purple-500 underline"
          ></button>
        )}
      </div>
    </div>
  );
};

export default ModalDateFilter;
