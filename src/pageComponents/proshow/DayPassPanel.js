"use client";

import { useMemo } from "react";
import { leagueGothic } from "@/lib/fonts";

export default function DayPassPanel({
  artists,
  activeDay,
  onDayClick,
  allDayPassLink,
}) {
  const days = useMemo(() => {
    const dayMap = {};
    artists.forEach((a) => {
      if (!a.day) return;
      if (!dayMap[a.day]) {
        dayMap[a.day] = {
          label: a.day,
          date: `${a.month} ${a.date}`,
          artists: [],
          passLink: a.passLink ?? null,
        };
      }
      dayMap[a.day].artists.push(a.revealed ? a.name : "TBA");
      // use passLink from any artist in that day that has it
      if (a.passLink && !dayMap[a.day].passLink) {
        dayMap[a.day].passLink = a.passLink;
      }
    });
    // sort by day number
    return Object.values(dayMap).sort((a, b) => a.label.localeCompare(b.label));
  }, [artists]);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-3xl mx-auto">
      {/* day tabs */}
      <div className="flex gap-4">
        {days.map((d) => (
          <button
            key={d.label}
            onClick={() => onDayClick(d.label)}
            className={`
              px-5 py-2 rounded-full text-lg ${leagueGothic.className} tracking-widest uppercase
              transition-all duration-300 border-3
              ${
                activeDay === d.label
                  ? "bg-[#F4EFCF] text-black border-[#F4EFCF]"
                  : "bg-transparent text-[#F4EFCF]/60 border-[#F4EFCF]/20 hover:border-[#F4EFCF]/50 hover:text-[#F4EFCF]"
              }
            `}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* active day */}
      {days.map((d) => {
        if (d.label !== activeDay) return null;
        return (
          <div
            key={d.label}
            className="flex flex-col items-center gap-3 animate-[fadeIn_0.3s_ease]"
          >
            {/* artist names */}
            <div className="flex flex-wrap justify-center gap-x-4">
              {d.artists.map((name, i) => (
                <span
                  key={i}
                  className={`text-[#F4EFCF] text-3xl ${leagueGothic.className} tracking-wide`}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {/* 3-day pass */}
      <div className="flex flex-col items-center gap-1">
        {allDayPassLink ? (
          <a
            href={allDayPassLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-2.5 rounded-full border-3 border-[#F4EFCF] text-[#F4EFCF] text-2xl ${leagueGothic.className} tracking-widest uppercase
              hover:bg-[#F4EFCF] hover:text-black transition-all duration-300`}
          >
            Grab Your Passes Now
          </a>
        ) : (
          <span className={`px-8 py-2.5 rounded-full border-3 border-[#F4EFCF]/20 text-[#F4EFCF]/25 text-2xl ${leagueGothic.className} tracking-widest uppercase cursor-not-allowed`}>
            Grab Your Passes Now
          </span>
        )}
        {/* <span className="text-[#F4EFCF]/70 text-md ${leagueGothic.className} tracking-wider uppercase animate-pulse">
          Early Bird Pricing Available Now
        </span> */}
      </div>
    </div>
  );
}
