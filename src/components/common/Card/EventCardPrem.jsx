import Image from "next/image";

import Link from "next/link";
import {abril, playfair, prompt} from "@/lib/fonts";

const commonBorderStyle =
  "border border-[#FFDEAC] group-hover:border-[#730000] transition-colors";

export default function EventCard({
  date = "", // DD format
  eventName = "Event Name",
  eventimage = "/images/card/dancerBg.svg",
  regFee = "000", // in INR
  expDate = "00/00",
  regUrl = "",
}) {
  return (
    <div className="group bg-[#730000] hover:bg-[#FFDEAC] transition-colors w-100 h-130 p-3 flex flex-col gap-2">
      <div className="flex gap-2 flex-1">
        <div className=" w-5 flex flex-[1.2] flex-col gap-2">
          <div
            className={`${commonBorderStyle} flex-1 relative bg-cover bg-center`}
            style={{ backgroundImage: "url(/images/card/premBg.svg)" }}
          ></div>

          {/* Date and Fee Box */}
          <div className={`${commonBorderStyle} flex-1 flex flex-col justify-between items-center text-[#FFDEAC] group-hover:text-[#730000] py-4 transition-colors`}>
            <div className="flex flex-col items-center leading-none">
              {date && (
                <>
                  <span className={`${playfair.className} text-[22px]`}></span>
                  <span className={`${playfair.className} text-[30px]`}>
                    {date}<sup className="text-[12px] ">{date%10 === 1 ? "st" : date%10 === 2 ? "nd" : date%10 === 3 ? "rd" : "th"}</sup>
                  </span>
                </>
              )}
            </div>

            <div className="relative w-full flex justify-center">
              <div className="w-[70%] h-px bg-[#FFDEAC] group-hover:bg-[#730000] transition-colors rotate-35"></div>
            </div>

            {regFee !== 0 && regFee !== null ? (
            <div className="flex flex-col items-center leading-none gap-1">
              <span className={`${prompt.className} text-[20px] font-bold`}>
                ₹{regFee}
              </span>
              <span
                className={`${playfair.className} text-[12px] font-semibold`}
              >
                Registration Fee
              </span>
            </div>
            ) : (
              <div className="flex flex-col items-center leading-none gap-1 text-wrap p-1">
              <span
                className={`${playfair.className} md:text-[24px] text-[20px] font-semibold text-wrap text-center`}
              >
               Register Now!
              </span>
            </div>
            )}
          </div>
        </div>

        {/* Main Image */}
        <Link  className={`${commonBorderStyle} flex-3 relative h-full p-2`} href={regUrl} target="_blank">
        <div
          className={`flex-3 relative h-full bg-cover bg-center object-cover`}
          style={{ backgroundImage: `url(${eventimage})` }}
        ></div>
        </Link>
      </div>

      {/* Event Name Section */}
      <div className="flex gap-2 h-15">
        <div className={`${commonBorderStyle} flex-1 flex items-center justify-center`}>
          <span className={`${abril.className} text-[25px] text-[#FFDEAC] group-hover:text-[#730000] transition-colors`}>
            {eventName}
          </span>
        </div>
        <div className="w-12.5 relative flex items-center justify-center bg-[#730000] group-hover:bg-[#FFDEAC] transition-colors bg-cover bg-center">
          <Link 
            href={regUrl} 
            target="_blank" className=" bg-[url(/images/card/premArrow.svg)] group-hover:bg-[url(/images/card/normArrow.svg)] group-hover:rotate-12 transition-500 transition-all bg-fit bg-no-repeat bg-center w-full h-full flex items-center justify-center">
            {/* <Image
              src="/images/gpcDesign3.svg"
              alt="Design3"
              fill
              className="object-contain"
            /> */}
          </Link>
        </div>
      </div>

      {/* Closing Date */}
      {expDate && (
      <div className="h-7.5 border border-[#FFDEAC] group-hover:border-[#730000] transition-colors flex items-center justify-center">
        <span
          className={`${playfair.className} text-[14px] text-[#FFDEAC] group-hover:text-[#730000] transition-colors font-medium`}
        >
          {/* Closing date : {expDate} */}
          Click to Register
        </span>
      </div>
      )}
    </div>
  );
}
