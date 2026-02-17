import Image from "next/image";
import localFont from "next/font/local";

import { Abril_Fatface, Playfair, Prompt} from "next/font/google";
const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
  style: ["normal","italic"],
});

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
  style: ["normal","italic"],
});



export default function GpcCard({ date, eventName, regFee, expDate, description }) {
    return (
        <div className="bg-[#FFDEAC] w-75 h-130 p-3 flex flex-col gap-2">

            <div className="flex gap-2 flex-1">

                <div className="flex flex-[1.2] flex-col w-22.5 gap-2">
                    <div 
    className="flex-1 relative border-2 border-[#730000] bg-cover bg-center" 
    style={{backgroundImage: 'url(/images/gpcDesign1.svg)'}}
>
</div>

                    {/* Date and Fee Box */}
                    <div className="flex-1 border-2 border-[#730000] flex flex-col justify-between items-center text-[#730000] py-4">
                        <div className="flex flex-col items-center leading-none">
                        <span className={`${playfair.className} text-[22px]`}>FEB</span>
                        <span className={`${playfair.className} text-[28px]`}>{date}</span>
                        </div>

                        <div className="relative w-full flex justify-center">
                        <div className="w-[70%] h-0.5 bg-[#730000] rotate-35"></div>
                        </div>

                        <div className="flex flex-col items-center leading-none">
                            <span className={`${prompt.className} text-[20px] font-bold`}>{regFee}</span>
                            <span className={`${playfair.className} text-[12px] font-semibold`}>Registration</span>
                            <span className={`${playfair.className} text-[12px] font-semibold`}>fee</span>
                        </div>
                    </div>
                </div>

                {/* Main Image */}
                <div className="flex-3 relative h-full border-2 border-[#730000] bg-[url('/images/gpcDesign2.svg')] bg-cover bg-center">
</div>

            </div>

            {/* Event Name Section */}
            <div className="flex gap-2 h-15">
                <div className="flex-1 border-2 border-[#730000] flex items-center justify-center">
                    <span className={`${abril.className} text-[25px] text-[#730000]`}>{eventName}</span>
                </div>
                <div className="w-12.5 relative flex items-center justify-center bg-[#FFDEAC]">
                    <Image 
                        src = "/images/gpcDesign3.svg"
                        alt = "Design3"
                        fill
                        className = "object-contain"
                    />
                </div>
            </div>

            {/* Closing Date */}
            <div className="h-7.5 border-2 border-[#730000] flex items-center justify-center">
                <span className={`${playfair.className} text-[10px] text-[#730000] font-medium`}>Closing date : {expDate}</span>
            </div>

        </div>
    );
}