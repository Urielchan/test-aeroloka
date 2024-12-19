import React from "react";
import PropTypes from "prop-types";

const PaidButton = ({ type, children }) => {
  const baseStyle =
    "flex items-center justify-center text-white font-medium text-sm px-4 py-2 rounded-[16px] transition duration-300";

  const typeStyles = {
    issued: "bg-[#73CA5C] hover:bg-[#66b852]", // Hijau untuk status "Issued"
    cancelled: "bg-[#8A8A8A] hover:bg-[#7a7a7a]", // Abu-abu untuk "Cancelled"
    unpaid: "bg-[#FF0000] hover:bg-[#FF4D4D]", // Merah untuk "Unpaid"
  };

  return (
    <button className={`${baseStyle} ${typeStyles[type] || ""}`}>
      {children}
    </button>
  );
};

PaidButton.propTypes = {
  type: PropTypes.oneOf(["issued", "cancelled", "unpaid"]).isRequired,
  children: PropTypes.node.isRequired,
};

export default PaidButton;
