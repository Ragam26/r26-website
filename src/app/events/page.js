"use client";
import React, { useEffect, useState } from "react";
import EventCard from "@/components/common/Card/EventCard";
import EventCardPrem from "@/components/common/Card/EventCardPrem";
import CategoryBanner from "@/components/common/categoryBanner/CategoryBanner";
import { useEvents } from "@/hooks/useEvents";

const CATEGORY_CONFIG = [
  { name: "Flagship Events", banner: "/images/banner/banner1.svg"},
  { name: "Dramatics", banner: "/images/banner/banner2.svg"},
  { name: "Kalolsavam (group)", banner: "/images/banner/banner1.svg"},
  { name: "Kalolsavam -solo-pass", banner: "/images/banner/banner2.svg"},
  { name: "M&D-pass", banner: "/images/banner/banner1.svg"},
  { name: "General-Pass", banner: "/images/banner/banner2.svg"},
  { name: "Other", banner: "/images/banner/banner1.svg"},
];

  
export default function EventsPage() {
  let {data, isLoading, error} = useEvents("events");

  const groupedEvents = CATEGORY_CONFIG.map((category) => ({
    ...category,
    events: data.filter(
      (event) => event.category?.trim() === category.name
    ),
  }));

  return (
    <main
      className="min-h-screen pb-12 md:pb-24 bg-black bg-top bg-no-repeat bg-fixed"
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
      </div>

      {isLoading && (
        <p className="text-center text-gray-500 py-20 text-xl font-light tracking-widest">
          LOADING...
        </p>
      )}

      {error && (
        <p className="text-center text-gray-500 py-20 text-xl font-light tracking-widest">
          ERROR LOADING EVENTS. PLEASE TRY AGAIN LATER.
        </p>
      )}

      {!isLoading && !error && 
        groupedEvents.map((category, index) => {
          if (category.events.length === 0) return null;

          const isFlagship = category.name === "Flagship Events";
          const align = index % 2 === 0 ? "left" : "right";
          const variant = index % 2 === 0 ? "light" : "dark";

        return (
          <section key={category.name} className="mb-10">
            <CategoryBanner
              title={category.name.toUpperCase()}
              image={category.banner}
              align={align}
              variant={variant}
            />

            <div className="w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pt-10">
              <div className="page pt-10 flex items-center md:justify-left justify-center gap-10 flex-wrap">
                {category.events.map((event) => 
                  isFlagship ? (
                    <EventCardPrem
                      key={event.id} 
                      date={event.eventDay}
                      eventName={event.eventName} 
                      regUrl={event.makeMyPassUrl} 
                      regFee={0}
                      eventimage={event.eventImage ?? "/images/card/dancerBg.svg"}
                    />
                  ) : (
                    <EventCard
                      key={event.id} 
                      date={event.eventDay}
                      eventName={event.eventName} 
                      regUrl={event.makeMyPassUrl} 
                      regFee={0}
                      eventimage={event.eventImage ?? "/images/card/dancerBg.svg"}
                    />
                   )
                  )}
              </div>
            </div>
          </section>
        );
      })}
      {!isLoading && !error && data.length === 0 && (
        <p className="text-center text-gray-500 py-20 text-xl font-light tracking-widest">
          NO EVENTS FOUND
        </p>
      )}
    </main>
  );
}
