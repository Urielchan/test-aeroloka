import React from "react";
import transitIcon from "src/assets/icons/fi_box.svg";
import fasilitasIcon from "src/assets/icons/fi_heart.svg";
import hargaIcon from "src/assets/icons/fi_dollar-sign.svg";

const FilterSection = () => {
  const filters = [
    { label: "Transit", icon: transitIcon },
    { label: "Fasilitas", icon: fasilitasIcon },
    { label: "Harga", icon: hargaIcon },
  ];

  return (
    <aside className="w-full md:w-1/4 bg-white rounded-lg shadow-lg p-4 top-4 border border-slate-200 max-h-screen">
      <h3 className="font-semibold text-lg mb-4">Filter</h3>
      <div className="space-y-4">
        {filters.map(({ label, icon }, index) => (
          <div
            key={label}
            className={`rounded-lg shadow-sm p-2 w-full ${
              index < filters.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <button className="flex items-center justify-between w-full text-gray-600">
              <span className="flex items-center">
                <img src={icon} alt={label} className="w-5 h-5 mr-2" />
                {label}
              </span>
              <span className="text-xl text-gray-400">&gt;</span>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSection;
