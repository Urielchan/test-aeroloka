import React from "react";
import { useLocation, Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

const Stepper = (props) => {
  const { stage2 = "text-[#8A8A8A]", stage3 = "text-[#8A8A8A]" } = props;
  return (
    <div className="shadow-md">
      <div className="max-w-7xl mx-auto mt-32 font-bold text-xl flex">
        <span>Isi Data Diri</span>
        <span className="mt-1">
          <MdNavigateNext />
        </span>
        <span className={`${stage2}`}>Bayar</span>
        <span className="mt-1">
          <MdNavigateNext />
        </span>
        <span className={`${stage3} mb-4`}>Selesai</span>
      </div>
    </div>
  );
};

export default Stepper;
