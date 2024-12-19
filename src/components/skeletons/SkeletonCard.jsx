import React from "react";

const SkeletonCard = () => {
  return (
    <>
      <div className="relative flex flex-col mb-1 items-start justify-center p-3 bg-slate-200 rounded-lg shadow-lg">
        <div className="relative mb-3 w-full h-auto">
          <div className="w-full min-h-44 bg-slate-300 rounded-lg md:min-h-36"></div>
          <div className="absolute top-0 right-0 w-[50%] h-[25%] text-base font-medium rounded-tl-xl rounded-bl-xl bg-slate-400 text-center text-white flex items-center justify-center lg:text-xs"></div>
        </div>
        <div className="flex flex-col gap-1 text-left w-full md:gap-1.5">
          <p className="flex flex-wrap items-center max-w-52 min-h-4 bg-slate-400"></p>
          <p className="flex items-center max-w-24 min-h-4 bg-slate-400"></p>
          <p className="flex items-center max-w-32 min-h-4 bg-slate-400"></p>
          <p className="flex items-center max-w-40 min-h-4 bg-slate-400"></p>
        </div>
      </div>
    </>
  );
};

export default SkeletonCard;
