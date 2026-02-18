"use client";
import React from "react";
import GpcCard from "@/components/common/Card/GpcCard";
export default function EventsPage({ eventsArray }) {
  const dummyEvents = [
    { id: 1, date: "12", eventName: "Design Jam", regFee: "₹100", expDate: "10 Feb 2026" },
    { id: 2, date: "18", eventName: "Hack Night", regFee: "Free", expDate: "15 Feb 2026" },
    { id: 3, date: "25", eventName: "AI Workshop", regFee: "₹200", expDate: "20 Feb 2026" },
    { id: 4, date: "03", eventName: "Gaming Arena", regFee: "₹50", expDate: "01 Mar 2026" },
  ];
  const events = eventsArray?.length ? eventsArray : dummyEvents;
  return (
    <main
      className="min-h-screen bg-black bg-top bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/images/events/bg.png')",
        backgroundPosition: "top center",
      }}
    >
      {/* ---------- Heading ---------- */}
      <div className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 flex flex-col items-center px-4">
        <h1 className="text-white font-serif tracking-[0.3em] text-center text-[clamp(2.5rem,6vw,5rem)]">
          G P C
        </h1>
      </div>
      {/* ---------- Events ---------- */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-7 md:gap-8">
          {events.map((event) => (
            <div key={event.id} className="
                w-[300px]
                group
                transition-all duration-300 ease-in-out
                hover:scale-[1.04] hover:-translate-y-2
                hover:drop-shadow-[0_8px_32px_rgba(255,222,172,0.35)]
                focus-within:scale-[1.04] focus-within:-translate-y-2
                focus-within:drop-shadow-[0_8px_32px_rgba(255,222,172,0.35)]
                cursor-pointer
                rounded-sm
                outline-none
              ">
              <GpcCard
                date={event.date}
                eventName={event.eventName}
                regFee={event.regFee}
                expDate={event.expDate}
              />
            </div>
          ))}
        </div>
        {events.length === 0 && (
          <p className="text-center text-gray-400 py-24 text-[clamp(1rem,2.5vw,1.25rem)] font-light tracking-widest">
            NO EVENTS FOUND
          </p>
        )}
      </div>
    </main>
  );
}