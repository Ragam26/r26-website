"use client";
import React from "react";
import EventCard from "@/components/common/Card/GpcCard";

export default function EventsPage({ eventsArray = [] }) {
  return (
    <main
      className="min-h-screen bg-black bg-top bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/images/events/bg.png')",
        backgroundPosition: "top center",
      }}
    >
      
      <div className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 flex flex-col items-center px-4">
        <h1
          className="
            text-white font-serif tracking-[0.3em] text-center
            text-[clamp(2.5rem,6vw,5rem)]
          "
        >
          G P C
        </h1>
      </div>

      {/* ---------- Events Grid ---------- */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div
          className="
            grid gap-6 sm:gap-7 md:gap-8
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5
          "
        >
          {eventsArray?.map((eventData) => (
            <EventCard key={eventData.id} event={eventData} />
          ))}
        </div>

        {eventsArray.length === 0 && (
          <p
            className="
              text-center text-gray-400 py-24
              text-[clamp(1rem,2.5vw,1.25rem)]
              font-light tracking-widest
            "
          >
            NO EVENTS FOUND
          </p>
        )}
      </div>
    </main>
  );
}
