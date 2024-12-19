import React, { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Pagination = ({ currPage, totalPages, onPageChange }) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const prev = () => {
    if (currPage > 1) {
      onPageChange(currPage - 1);
    }
  };

  const next = () => {
    if (currPage < totalPages) {
      onPageChange(currPage + 1);
    }
  };

  const handleMouseEnter = (page) => {
    const id = setTimeout(() => {
      setHoveredButton(page);
    }, 3000);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setHoveredButton(null);
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button
        onClick={prev}
        disabled={currPage === 1}
        className={`mx-3 ${
          currPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaAngleLeft />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <div className="">
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            className={`px-3 py-1 text-sm font-medium rounded-md ${
              currPage === index + 1
                ? "bg-[#7126B5] text-white"
                : `bg-[#E2D4F0] text-[#7126B5] ${
                    hoveredButton === index + 1
                      ? "bg-[#7126B5] text-white"
                      : "hover:bg-[#7126B5] hover:text-white"
                  }`
            } transition-all duration-300 ease-in-out`}
          >
            {index + 1}
          </button>
        </div>
      ))}
      <button
        onClick={next}
        disabled={currPage === totalPages}
        className={`mx-3 ${
          currPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
