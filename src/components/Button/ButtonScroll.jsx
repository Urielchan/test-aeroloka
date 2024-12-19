import React from "react";

const ButtonScroll = ({ direction, onClick, disabled }) => {
  const isLeft = direction === "left";

  return (
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-[#A06ECE] shadow-lg shadow-purple-500/50 hover:bg-[#7126B5] h-9 px-4 py-2 text-gray-600 hover:text-black disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-white"
      >
        {isLeft ? (
          <>
            <path d="M19 12H5"></path>
            <path d="m12 19-7-7 7-7"></path>
          </>
        ) : (
          <>
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </>
        )}
      </svg>
    </button>
  );
};

export default ButtonScroll;
