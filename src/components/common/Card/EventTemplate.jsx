import EventCardLong from './EventCardLong'

export default function EventTemplate() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <EventCardLong
        day="27"
        month="MAR"
        eventName="Your Event Name"
        eventimage="/images/card/dancerBg.svg"
        regFee="500"
        expDate="20/03"
        regUrl="https://registration-link.com"
      />
    </div>
  )
}