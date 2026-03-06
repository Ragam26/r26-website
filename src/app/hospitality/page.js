"use client";

import HospCard from "@/components/common/Card/HospCard";
import { useState } from "react";
import { useCommittees } from "@/hooks/useCommittees";
import { magilio } from "@/lib/fonts";
import InfoCard from "@/components/common/infoCard/infoCard";

export default function Hospitality() {
    let { committeeData, isCommitteeLoading, committeeError } = useCommittees("Hospitality");

    const [isInfoOpen, setIsInfoOpen] = useState(false);

    return (
        <main
            className="min-h-screen pb-12 md:pb-24 bg-black bg-top bg-no-repeat"
            style={{
                backgroundImage: "url('/images/hospitality/bg.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "top center",
            }}
        >
            <div className="w-full pt-25 bg-transparent">
                <div className="w-full relative">
                <div className="w-full bg-[#580000] h-8 absolute top-1/2 -translate-y-3/4"/>
    
                {/* Title on top of bar */}
                <h1 className="relative text-[#FFE7C0] font-bold text-5xl md:text-7xl px-8 text-center tracking-widest"
                    style={{ fontFamily: magilio.style.fontFamily }}
                >
                    FOOD AND ACCOMODATION
                </h1>
            </div>
            <div className="pt-5 md:pt-12 pb-6 md:pb-12 flex flex-col items-center justify-center px-4 gap-6">
                <button
                    onClick={() => setIsInfoOpen(true)}
                    className="px-4 py-2 rounded-full bg-[#730000] text-[#FFDEAC] font-semibold hover:bg-[#FFDEAC] hover:text-[#730000] transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center text-sm md:text-lg whitespace-nowrap"
                >
                    Contact for more details
                </button>
            </div>
            </div>
            <div className="flex flex-row items-center justify-center mb-8 md:mb-12 gap-8 mt-12 md:mt-12 px-4 md:px-12 overflow-x-auto">
                <HospCard roomType="Dorm Rooms" priceList={[{ days: 1, price: 199, perPerson: 0 }, { days: 2, price: 359, perPerson: 0 }, { days: 3, price: 499, perPerson: 0 }, { days: 4, price: 679, perPerson: 0 }]} />
                <HospCard roomType="3 Sharing Rooms" priceList={[{ days: 1, price: 1049, perPerson: 349 }, { days: 2, price: 1949, perPerson: 675 }, { days: 3, price: 2849, perPerson: 989 }, { days: 4, price: 3699, perPerson: 1299 }]} />
                <HospCard roomType="4 Sharing Rooms" priceList={[{ days: 1, price: 1199, perPerson: 299 }, { days: 2, price: 2099, perPerson: 525 }, { days: 3, price: 2999, perPerson: 749 }, { days: 4, price: 3899, perPerson: 975 }]} />
            </div>
            <div className="w-full  bg-transparent">
                <div className="w-full relative flex items-center">
                <div className="w-full bg-[#854224] h-12 md:h-8 absolute top-1/2 -translate-y-1/2"/>

                <button className="relative z-10 bg-[#D0995F] text-[#62161F] font-bold text-xl md:text-3xl px-8 py-4 md:px-6 md:py-2 rounded-full ml-4 md:ml-8 whitespace-nowrap hover:scale-105 transition-transform hover:bg-[#62161F] hover:text-[#D0995F]"
                    style={{ fontFamily: magilio.style.fontFamily }}
                    onClick={() => window.open('https://makemypass.com/event/ragam26-accommodation', '_blank')}
                >
                    BOOK NOW
                </button>

                {/* Text inside bar */}
                <h1 className="relative text-[#D0995F] font-bold text-lg md:text-xl px-8 text-center md:tracking-[0.5em] flex-1"
                    style={{ fontFamily: magilio.style.fontFamily }}
                >
                    Breakfast available (Veg Only) @ Rs. 149
                </h1>
            </div>
            </div>
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