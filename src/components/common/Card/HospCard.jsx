import Image from "next/image";
import { magilio } from "@/lib/fonts";

const commonBorderStyle = "border border-[#730000] group-hover:border-[#FFDEAC] transition-colors";

export default function HospCard({roomType = "3 Sharing Rooms",priceList = [{ days: 1, price: 180, perPerson: 0 }, { days: 2, price: 350, perPerson: 0 }, { days: 3, price: 500, perPerson: 0 }, { days: 4, price: 600, perPerson: 0 }]}) {
    return (
        <div className="group bg-[#FFDEAC] hover:bg-[#730000] transition-colors md:w-110 w-60 md:h-80 h-40 p-3 flex flex-col gap-2">
            {/* Heading */}
            <div className={`${commonBorderStyle} flex items-center justify-center py-2`}>
                <span className={`${magilio.className} text-[#730000] group-hover:text-[#FFDEAC] tracking-wider transition-colors text-center text-lg md:text-xl font-semibold`}>
                    {roomType}
                </span>
            </div>

            {/* Body */}
            <div className={`${commonBorderStyle} flex flex-row flex-1`}>

                <div className="w-1/3 relative min-h-40">
                    <Image
                        src="/images/card/normBg.svg"
                        alt="design"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="w-2/3 flex flex-col h-full justify-center gap-2 px-4 py-3 text-[#730000] group-hover:text-[#FFDEAC] transition-colors">
                    {priceList.map(({ days, price, perPerson }) => (
                        <div key={days} className="flex justify-between items-center">
                            <span className={`${magilio.className} text-lg md:text-2xl font-semibold`}>
                                {days} Day{days > 1 ? "s" : ""}
                            </span>
                            <div className="flex flex-col items-end">
                                <span className={`${magilio.className} text-lg md:text-2xl font-bold`}>
                                    ₹{price}
                                </span>
                                {perPerson !==0 && (
                                    <span className={`${magilio.className} text-xs opacity-80 font-light`}>
                                        ₹{perPerson}/pax
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
    