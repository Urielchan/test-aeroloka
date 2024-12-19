import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SubHeader = (props) => {
  const navigate = useNavigate();
  const { label, children } = props;

  const handleBeranda = () => {
    navigate("/");
  };

  return (
    <div className="shadow-md">
      <div className="max-w-7xl pl-4 mx-auto mt-32 font-bold text-xl flex items-center">
        <p>{label}</p>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl pl-4 mx-auto py-3 px-4">
        <div className="flex items-center space-x-2">
          {/* Beranda Button */}
          <button
            className="flex-1 flex items-center space-x-4 text-white bg-purple-500 p-2 rounded-lg"
            onClick={handleBeranda}
          >
            <FaArrowLeft />
            <span>Beranda</span>
          </button>
          {label === "Notifikasi" && (
            <div className="flex items-center space-x-2">
              <img
                src="/icons/filter_icon.svg"
                alt="Filter Icon"
                className=" h-8"
              />
              <img
                src="/icons/search_notif_icon.svg"
                alt="Search Icon"
                className="w-6 h-6"
              />
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default SubHeader;
