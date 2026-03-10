import Link from "next/link";

export default function EventCardLong({
  alignment,
  eventImage,
  day,
  divasam,
  description,
  name,
  date,
  regUrl,
  regFee,
  earlyBirdFee,
}) {
  const LETTERS_ARR = ['D', 'A', 'Y', day]
  const reverse = alignment === 'right'

  const commonBorderStyle =
    "border border-[#7d1912] group-hover:border-[#fdebc8] transition-colors"

  return (
    <div className='group max-w-6xl w-[85%] mx-auto p-1.5 bg-[#fdebc8] hover:bg-[#7d1912] font-serif text-[#7d1912] hover:text-[#fdebc8] transition-colors'>
      <div
        className={`flex flex-wrap md:flex-nowrap gap-2 w-full md:min-h-[400px] ${
          reverse ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div className={`w-full md:w-[8%] flex flex-row md:flex-col items-center justify-between py-4 px-6 md:px-0 md:py-8 ${commonBorderStyle} order-1`}>
          <div className='flex flex-row md:flex-col items-center gap-2 md:gap-4 md:mt-4'>
            {LETTERS_ARR.map((char, idx) => (
              <span
                key={idx}
                className='text-xl md:text-3xl font-extrabold'
              >
                {char}
              </span>
            ))}
          </div>

          <div className='flex items-center justify-center md:pb-2'>
            <Link
              href={regUrl}
              target="_blank"
              className="bg-[url(/images/card/normArrow.svg)] group-hover:bg-[url(/images/card/premArrow.svg)] group-hover:rotate-12 transition-all duration-500 bg-contain bg-no-repeat bg-center w-6 md:w-10 h-6 md:h-10"
            />
          </div>
        </div>

        <div
          style={{ backgroundImage: "url('/images/card/normBg.svg')" }}
          className={`w-[calc(25%-0.25rem)] md:w-[10%] min-h-[250px] md:min-h-[150px] bg-cover bg-center ${commonBorderStyle} ${reverse ? 'order-3 md:order-3' : 'order-2 md:order-3'}`}
        ></div>

        <Link
          href={regUrl}
          target="_blank"
          style={{
            backgroundImage: eventImage
              ? `url('${eventImage}')`
              : "url('/images/card/dancerBg.svg')",
          }}
          className={`w-[calc(75%-0.25rem)] md:w-[35%] min-h-[300px] md:min-h-[250px] bg-cover bg-center bg-black ${commonBorderStyle} ${reverse? 'order-2 md:order-2' : 'order-3 md:order-2'}`}
        />

        <Link
          href={regUrl}
          target="_blank"
          className={`w-full md:flex-1 p-6 md:p-8 flex flex-col justify-between ${commonBorderStyle} order-4 text-left`}
        >
          <div>
            <div className='text-3xl md:text-4xl'>
              <span className='font-bold'>{date} </span>
              <span className='font-light'>MARCH</span>
            </div>
            <div className='text-xl md:text-2xl mt-1 font-light'>
              {divasam}
            </div>
          </div>

          <div className='mt-8 md:mt-auto'>
            <h1 className='text-3xl md:text-6xl font-extrabold mb-4 tracking-wide'>
              {name.toUpperCase()}
            </h1>
            <div className='flex items-center gap-3 ml-auto md:ml-0 mt-1'>
              <span className={`text-lg md:text-xl font-medium ${earlyBirdFee ? 'line-through opacity-50' : 'text-2xl font-extrabold'}`}>
                ₹{regFee}
              </span>
              {earlyBirdFee && (
                <span className='text-xl md:text-2xl font-extrabold'>
                  ₹{earlyBirdFee}
                </span>
              )}
              {earlyBirdFee && (
                <span className='text-xs md:text-md font-bold uppercase tracking-widest opacity-80'>
                  (Early Bird Offer)
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}