"use client";
import React, { useEffect, useState } from "react";
import EventCard from "@/components/common/Card/EventCard";
import { api } from "../api/axiox";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const response = await api.get("/api/workshops");
      setEvents(response.data.data);
    };

    getEvents();
  }, []);

  return (
    <main
      className="min-h-screen bg-black bg-top bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/images/events/bg.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "top center",
      }}
    >
      <div className="pt-20 md:pt-32 pb-12 md:pb-16 flex flex-col items-center justify-center px-4">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif tracking-[0.3em] mt-20 mb-8 md:mb-12">
          W O R K S H O P S
        </h1>
      </div>

      <div className="w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {events.map((eventData) => (
            <EventCard key={eventData.id} eventName={eventData.eventName} regUrl={eventData.makeMyPassUrl}/>
          ))}
        </div>

        {events.length === 0 && (
          <p className="text-center text-gray-500 py-20 text-xl font-light tracking-widest">
            NO EVENTS FOUND
          </p>
        )}
      </div>
    </main>
  );
}
