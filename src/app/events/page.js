"use client";
import React, { useEffect, useState } from "react";
import EventCard from "@/components/common/Card/EventCard";
import { api } from "../api/axiox";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await api.get("/api/events?pagination[pageSize]=100");
        setEvents(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.eventName?.toLowerCase().includes(search.toLowerCase())
  );

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
          E V E N T S
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-2xl flex items-center gap-3 bg-[#730000] rounded-full p-1">

          {/* Search icon pill */}
          <div
            className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center border"
            style={{
              backgroundColor: "#0e0808",
              borderColor: "#7a1a1a",
              borderWidth: "1.5px",
            }}
          >
            <svg
              className="w-5 h-5"
              style={{ color: "#9b4444" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </div>

          {/* Input pill */}
          <div
            className="flex-1 flex items-center px-5 py-3 rounded-full border"
            style={{
              backgroundColor: "#0e0808",
              borderColor: "#7a1a1a",
              borderWidth: "1.5px",
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Events"
              className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none"
            />
          </div>

        </div>
      </div>

      <div className="w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading && (
          <p className="text-center text-gray-500 py-20 text-xl font-light tracking-widest">
            LOADING...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 py-20 text-xl font-light tracking-widest">
            {error.toUpperCase()}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="page pt-10 flex items-center justify-center gap-10 flex-wrap">
              {filteredEvents.map((eventData) => (
                <EventCard
                  key={eventData.id}
                  eventName={eventData.eventName}
                  regUrl={eventData.makeMyPassUrl}
                />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <p className="text-center text-gray-500 py-20 text-xl font-light tracking-widest">
                {search ? "NO RESULTS FOUND" : "NO EVENTS FOUND"}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}