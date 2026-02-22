import EventCard from '@/components/common/Card/EventCard'
import React from 'react'

const events = [
    {
        date: "29",
        eventName: "Event Name",
        eventimage: "/images/gpcDesign2.svg",
        regFee: "340",
        expDate: "12/02",
        regUrl: "https://www.google.com",
    },
    {
        date: "30",
        eventName: "Extraordinary Event",
        eventimage: "/images/gpcDesign2.svg",
        regFee: "450",
        expDate: "13/02",
        regUrl: "https://www.google.com",
    },
    {
        date: "31",
        eventName: "Spectacular Showdown",
        eventimage: "/images/gpcDesign2.svg",
        regFee: "500",
        expDate: "14/02",
        regUrl: "https://www.google.com",
    }
]

const page = () => {
  return (
    <>
    <div className="page pt-40 flex items-center justify-center gap-5 flex-wrap">

        {events.map((event, index) => (
            <EventCard key={index} {...event} />
        ))}
    </div>
    
    <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center">
        {events.map((event, index) => (
            <EventCard key={index} {...event} />
        ))}
    </div>
    </>
  )
}

export default page