"use client";
import React, { useEffect, useState } from "react";
import EventCard from "@/components/common/Card/EventCard";
import EventCardPrem from "@/components/common/Card/EventCardPrem";
import { useEvents } from "@/hooks/useEvents";
import { useCommittees } from "@/hooks/useCommittees";
import CategoryMenu from "@/components/common/categoryMenu/CategoryMenu";
import InfoCard from "@/components/common/infoCard/infoCard";

const CATEGORY_CONFIG = [
  {
    name: "Flagship Events",
    label: "Flagship Events",
    banner: "/images/banner/banner1.svg",
  },
  {
    name: "Dramatics",
    label: "Dramatics",
    banner: "/images/banner/banner2.svg",
  },
  {
    name: "Kalolsavam (group)",
    label: "Kalolsavam (group)",
    banner: "/images/banner/banner1.svg",
  },
  {
    name: "Kalolsavam -solo-pass",
    label: "Kalolsavam (solo)",
    banner: "/images/banner/banner2.svg",
  },
  {
    name: "M&D-pass",
    label: "Music & Dance",
    banner: "/images/banner/banner1.svg",
  },
  { name: "Other", label: "Other", banner: "/images/banner/banner1.svg" },
];

export default function EventsPage() {
  let { data, isLoading, error } = useEvents("events");

  let { committeeData, isCommitteeLoading, committeeError } = useCommittees("Events");

  const [activeCategory, setActiveCategory] = useState(CATEGORY_CONFIG[0].name);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const selectedCategory = CATEGORY_CONFIG.find(
    (category) => category.name === activeCategory,
  );

  const filteredEvents = data.filter(
    (event) => event.category?.trim() === activeCategory,
  );

  return (
    <main
      className="min-h-screen pb-12 md:pb-24 bg-black bg-top bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/images/events/events_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      <div className="pt-20 md:pt-32 pb-6 md:pb-16 flex flex-col items-center justify-center px-4 gap-6">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-serif tracking-[0.3em] mt-20 mb-4 md:mb-12">
          EVENTS
        </h1>
        <button
          onClick={() => setIsInfoOpen(true)}
          className="px-4 py-2 rounded-full bg-[#730000] text-[#FFDEAC] font-semibold hover:bg-[#FFDEAC] hover:text-[#730000] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center text-sm md:text-lg whitespace-nowrap"
        >
          Know More
        </button>
      </div>

      <div className="flex justify-center">
        <CategoryMenu
          categories={CATEGORY_CONFIG}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
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

      {!isLoading && !error && selectedCategory && (
        <section className="mb-10">
          <div className="w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <div className="page pt-10 flex items-center md:justify-left justify-center gap-10 flex-wrap">
              {filteredEvents.map((event) =>
                activeCategory === "Flagship Events" ? (
                  <EventCardPrem
                    key={event.id}
                    day={event.eventDay}
                    month={event.eventMonth}
                    eventName={event.eventName}
                    regUrl={event.makeMyPassUrl}
                    regFee={0}
                    eventimage={event.eventCover ?? "/images/card/dancerBg.svg"}
                  />
                ) : (
                  <EventCard
                    key={event.id}
                    day={event.eventDay}
                    month={event.eventMonth}
                    eventName={event.eventName}
                    regUrl={event.makeMyPassUrl}
                    regFee={0}
                    eventimage={event.eventCover ?? "/images/card/dancerBg.svg"}
                  />
                ),
              )}
            </div>
          </div>
        </section>
      )}
      {!isLoading && !error && data.length === 0 && (
        <p className="text-center text-gray-500 py-20 text-xl font-light tracking-widest">
          NO EVENTS FOUND
        </p>
      )}
      <InfoCard
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title={committeeData?.Name}
        description={committeeData?.description}
        pocList={committeeData?.contact?.map((contact) => ({
          name: contact.name,
          phone: contact.phoneNo,
        })) ?? []}
        brochure={committeeData?.brochureUrl}
      />
    </main>
  );
}
