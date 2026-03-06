import Link from "next/link";
import Image from "next/image";
import { abril, playfair, prompt } from "@/lib/fonts";

const commonBorderStyle =
  "border border-[#FFDEAC] group-hover:border-[#730000] transition-colors";

export default function EventCard({
  day = "", // DD format,
  month = "", // "FEB" or "MAR" 
  eventName = "Event Name",
  eventimage = "/images/card/dancerBg.svg",
  regFee = "000", // in INR
  expDate = "00/00",
  regUrl = "",
}) {
  return (
    <div className="group bg-[#730000] hover:bg-[#FFDEAC] transition-colors md:w-100 w-80 md:h-130 h-110 p-3 flex flex-col gap-2">
      <div className="flex gap-2 flex-1">
        <div className=" w-5 flex flex-[1.2] flex-col gap-2">
          <div
            className={`${commonBorderStyle} flex-1 relative bg-cover bg-center`}
            style={{ backgroundImage: "url(/images/card/premBg.svg)" }}
          ></div>

          {/* Date and Fee Box */}
          <div className={`${commonBorderStyle} flex-1 flex flex-col justify-between items-center text-[#FFDEAC] group-hover:text-[#730000] py-4 transition-colors`}>
            <div className="flex flex-col items-center leading-none">
              {day && (
                <>
                  <span className={`${playfair.className} md:text-[22px] text-[18px]`}>{month}</span>
                  <span className={`${playfair.className} md:text-[30px] text-[24px] font-bold`}>
                    {day} <sup className="text-[12px] ">{day % 10 === 1 ? "st" : day % 10 === 2 ? "nd" : day % 10 === 3 ? "rd" : "th"}</sup>
                  </span>
                </>
              )}
            </div>

            <div className="relative w-full flex justify-center">
              <div className="w-[70%] md:flex hidden h-px bg-[#FFDEAC] group-hover:bg-[#730000] transition-colors rotate-45"></div>
            </div>

            {regFee !== 0 && regFee !== null ? (
              <div className="flex flex-col items-center leading-none gap-1 text-center">
                <span className={`${prompt.className} text-[20px]`}>
                  ₹<bold className="font-bold">{regFee}</bold>
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
        <Link className={`${commonBorderStyle} flex-3 relative h-full pl-1 pr-1`} href={regUrl} target="_blank">
          <div
            className={`flex items-center justify-center relative w-full h-full bg-neutral bg-center`}
          >
            <Image
              src={eventimage}
              alt={eventName}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain object-center"
            />
          </div>
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
          </Link>
        </div>
      </div>

      {/* Closing Date */}
      {expDate && (
        <div className="h-7.5 border border-[#FFDEAC] group-hover:border-[#730000] transition-colors flex items-center justify-center">
          <span
            className={`${playfair.className} text-[14px] text-[#FFDEAC] group-hover:text-[#730000] transition-colors font-medium`}
          >
            Click to Register
          </span>
        </div>
      )}
    </div>
  );
}