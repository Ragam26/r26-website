'use client'
import React, { useEffect, useState } from 'react'
import EventCard from '@/components/common/Card/EventCard'
import { useSports } from '@/hooks/useEvents'
import { useCommittees } from '@/hooks/useCommittees'
import InfoCard from '@/components/common/infoCard/infoCard'

export default function EventsPage() {
  let { data, isLoading, error } = useSports()

  const coverEvents = [...(data || [])].sort(
    (a, b) => (!!b.eventCover) - (!!a.eventCover)
  );

  const sortedEvents = [...coverEvents].sort((a, b) => {
    return (b.priority ?? 0) - (a.priority ?? 0);
  });


  let { committeeData, isCommitteeLoading, committeeError } = useCommittees("Sports");
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <main
      className='min-h-screen bg-black bg-top bg-no-repeat bg-fixed'
      style={{
        backgroundImage: "url('https://cdn.ragam.co.in/sports/sports_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      <div className='pt-20 md:pt-32 pb-12 md:pb-16 flex flex-col items-center justify-center px-4'>
        <h1 className='text-white text-4xl md:text-7xl lg:text-8xl font-serif tracking-[0.3em] mt-20 mb-8 md:mb-12'>
          SPORTS
        </h1>
        <button
          onClick={() => setIsInfoOpen(true)}
          className="px-4 py-2 rounded-full bg-[#730000] text-[#FFDEAC] font-semibold hover:bg-[#FFDEAC] hover:text-[#730000] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center text-sm md:text-lg whitespace-nowrap"
        >
          Contact Us
        </button>
      </div>

      {isLoading ? (
        <p className='text-center text-gray-500 py-20 text-xl font-light tracking-widest'>
          LOADING...
        </p>
      ) : error ? (
        <p className='text-center text-gray-500 py-20 text-xl font-light tracking-widest'>
          ERROR LOADING EVENTS. PLEASE TRY AGAIN LATER.
        </p>
      ) : (
        <div className='w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
          <div className='page pt-10 flex items-center md:justify-left justify-center gap-10 flex-wrap'>
            {sortedEvents.map((eventData) => (
              <EventCard
                key={eventData.id}
                day={eventData.eventDay}
                month={eventData.eventMonth}
                eventName={eventData.eventName || eventData.name}
                regUrl={eventData.makeMyPassUrl}
                regFee={eventData.regFee}
                eventimage={eventData.eventCover ?? '"https://cdn.ragam.co.in/card/dancerBg.svg'}
              />
            ))}
          </div>

          {sortedEvents.length === 0 && (
            <p className='text-center text-gray-500 py-20 text-xl font-light tracking-widest'>
              NO EVENTS FOUND
            </p>
          )}
        </div>
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
  )
}
