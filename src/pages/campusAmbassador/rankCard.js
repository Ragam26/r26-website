import React from "react";

function RankCard({ rank, name, points }) {
  return (
    <div className="flex flex-row items-center justify-between border-b-2 border-b-[#7D0A0A] h-8 sm:h-10 md:h-12 lg:h-12 p-2 bg-[#000000] m-2 rounded-sm">
      <div className="flex flex-row justify-center items-center gap-8">
        <div className="text-white text-sm sm:text-xl md:text-2xl">{rank}</div>
        <div className="flex flex-row justify-center items-center gap-1">
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:w-8 lg:h-8 rounded-4xl bg-amber-50 border-3 border-[#7D0A0A]"></div>
          <div className="text-white text-sm sm:text-xl md:text-2xl">{name}</div>
        </div>
      </div>

      <div className="text-white text-sm sm:text-xl md:text-2xl">{points}</div>
    </div>
  );
}

export default RankCard;
