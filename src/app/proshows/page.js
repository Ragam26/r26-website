'use client'
import React, { useEffect, useState } from 'react'
import EventCard from '@/components/common/Card/EventCard'
import { useProshows } from '@/hooks/useEvents'
import EventCardLong from '@/components/common/Card/EventCardLong'

export default function EventsPage() {
  let { data, isLoading, error } = useProshows()

  return (
    <main
      className='min-h-screen bg-black bg-top bg-no-repeat bg-fixed'
      style={{
        backgroundImage: "url('/images/proshow/proshows_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      <div className='pt-20 md:pt-32 pb-12 md:pb-16 flex flex-col items-center justify-center px-4'>
        <h1 className='text-white text-4xl md:text-7xl lg:text-8xl font-serif tracking-[0.3em] mt-20 mb-8 md:mb-12'>
          PROSHOWS
        </h1>
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
            {data.map((eventData) => (
              <EventCardLong
                key={eventData.id}
                day='1'
                date={eventData.eventDay}
                month={eventData.eventMonth}
                name={eventData.eventName}
                regUrl={eventData.makeMyPassUrl}
                regFee={eventData.regFee}
                alignment="left"
                description={eventData.description}
                eventimage={eventData.eventCover ?? '/images/card/dancerBg.svg'}
              />
            ))}
          </div>

          {data.length === 0 && (
            <p className='text-center text-gray-500 py-20 text-xl font-light tracking-widest'>
              NO EVENTS FOUND
            </p>
          )}
        </div>
      )}
    </main>
  )
}
