import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchDestination = ({ onContinentChange }) => {
  const [activeButton, setActiveButton] = useState("semua");
  const navigate = useNavigate();

  const continentMap = {
    asia: "Asia",
    america: "Amerika",
    australia: "Australia",
    europe: "Eropa",
    africa: "Afrika",
    semua: "Semua",
  };

  const handleButtonClick = (continent) => {
    setActiveButton(continent);
    onContinentChange(continent);
    navigate(`?continent=${continent}`);
  };

  return (
    <div className="px-8 flex gap-x-4 mb-2 lg:px-0">
      <div className="flex gap-x-4 overflow-x-auto py-2">
        <div
          className={`min-w-[126px] h-[48px] rounded-xl flex items-center justify-center ${
            activeButton === "semua"
              ? "bg-[#7126B5] text-white hover:bg-purple-900"
              : "bg-[#E2D4F0] text-black hover:bg-[#C594F6] hover:shadow-xl"
          }`}
        >
          <a
            href="#"
            onClick={() => handleButtonClick("semua")}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <FiSearch
              className={`w-5 h-5 ${
                activeButton === "semua" ? "text-white" : "text-black"
              }`}
            />
            {continentMap["semua"]}
          </a>
        </div>

        {["asia", "america", "australia", "europe", "africa"].map(
          (continent) => (
            <div
              key={continent}
              className={`min-w-[126px] h-[48px] px-4 rounded-xl flex items-center justify-center cursor-pointer ${
                activeButton === continent
                  ? "bg-[#7126B5] text-white hover:bg-purple-900"
                  : "bg-[#E2D4F0] text-black hover:bg-[#7126B5] hover:text-white hover:shadow-xl"
              } transition-all duration-300 ease-in-out`}
              onClick={() => handleButtonClick(continent)}
            >
              <a
                href="#"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <FiSearch
                  className={`w-5 h-5 ${
                    activeButton === continent ? "text-white" : "text-black"
                  }hover:text-white`}
                />
                {continentMap[continent]}
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchDestination;
