export default function EventCard({
  alignment,
  imageURL,
  day,
  description,
  name,
}) {
  const LETTERS_ARR = ['D', 'A', 'Y', day]
  const reverse = alignment === 'right'
  return (
    <div className='max-w-6xl w-full mx-auto p-1.5 bg-[#fdebc8] font-serif text-[#7d1912]'>
      <div
        className={`flex flex-wrap md:flex-nowrap gap-2 w-full md:min-h-[400px] ${reverse ? 'md:flex-row-reverse' : ''}`}
      >
        <div className='w-full md:w-[12%] flex flex-row md:flex-col items-center justify-between py-4 px-6 md:px-0 md:py-8 border border-[#7d1912] order-1'>
          <div className='flex flex-row md:flex-col items-center gap-2 md:gap-4 md:mt-4'>
            {LETTERS_ARR.map((char, idx) => (
              <span key={idx} className='text-xl md:text-3xl font-extrabold'>
                {char}
              </span>
            ))}
          </div>
          <div className='flex items-center justify-center md:pb-2'>
            <img
              src='/images/card/normDownArrow.svg'
              alt='Arrow'
              className='-rotate-90 md:rotate-0 w-6 md:w-auto'
            />
          </div>
        </div>
        <div
          style={{ backgroundImage: "url('/images/card/normBg.svg')" }}
          className='w-[calc(35%-0.25rem)] md:w-[15%] min-h-[250px] md:min-h-[150px] bg-cover bg-center border border-[#7d1912] order-2 md:order-3'
        ></div>
        <div
          style={{
            backgroundImage: imageURL
              ? `url('${imageURL}')`
              : "url('/images/card/dancerBg.svg')",
          }}
          className='w-[calc(65%-0.25rem)] md:w-[25%] min-h-[250px] md:min-h-[250px] bg-cover bg-center bg-black border border-[#7d1912] order-3 md:order-2'
        ></div>
        <div className='w-full md:flex-1 p-6 md:p-8 flex flex-col justify-between border border-[#7d1912] order-4 text-right md:text-left'>
          <div>
            <div className='text-3xl md:text-4xl'>
              <span className='font-bold'>23 </span>
              <span className='font-light'>MARCH</span>
            </div>
            <div className='text-xl md:text-2xl mt-1 font-light'>Sunday</div>
          </div>
          <div className='mt-8 md:mt-auto'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-wide'>
              {name}
            </h1>
            <p className='text-sm font-medium leading-5 md:max-w-lg ml-auto md:ml-0'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
