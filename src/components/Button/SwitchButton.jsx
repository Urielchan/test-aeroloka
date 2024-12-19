import React from "react";

const ToggleSwitch = ({ isOn, onToggle }) => {
    const handleToggle = () => {
        onToggle(!isOn);
    };

    return (
        <div
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all ${
                isOn ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={handleToggle}
        >
            <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                    isOn ? "translate-x-6" : "translate-x-0"
                }`}
            />
        </div>
    );
};

export default ToggleSwitch;