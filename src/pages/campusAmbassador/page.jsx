"use client";
import RankCard from "@/pages/campusAmbassador/rankCard";
import React, { useState } from "react";
export default function CA() {
  const [copied, setCopied] = useState(false);
  const referralCode = "a25- zppdo";
  const handleCopy = async () => {
    // Check if the modern Clipboard API is available (Secure Context)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(referralCode);
        setCopied(true);
      } catch (err) {
        console.error("Failed to copy using Clipboard API", err);
      }
    } else {
      // --- FALLBACK FOR INSECURE CONTEXTS (HTTP) ---
      // This creates a temporary hidden text box to copy from
      const textArea = document.createElement("textarea");
      textArea.value = referralCode;

      // Ensure it's not visible but part of the DOM
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy"); // The old way that works everywhere
        setCopied(true);
      } catch (err) {
        console.error("Fallback copy failed", err);
      }

      document.body.removeChild(textArea);
    }

    // Reset the "Copied" status after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className=" relative flex w-full h-screen flex-col items-center  justify-center gap-4 bg-[url('/images/flames.png')] bg-contain bg-no-repeat bg-bottom-left">
      <img
        src={"/images/tathva.png"}
        alt=""
        className="w-auto h-13 sm:absolute top-3 right-3"
      />
      <div className="flex flex-col justify-center gap-2 items-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]  ">
        {/* TOP BAR */}
        <div className="flex flex-row justify-between p-2 items-center gap-2 bg-[#1B0D0D] w-full  h-[15%] sm:h-[18%] sm:p-3">
          <div className="flex flex-rows justify-center items-center sm:gap-3">
            <div className="flex flex-col justify-center items-center">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 rounded-4xl bg-amber-50 border-3 border-[#7D0A0A]"></div>
            </div>
            <div className="flex flex-col justify-center text-white  text-xs sm:text-sm">
              <div className="font-bold">Hardcore Messi Fan</div>
              <div>NIT Calicut</div>
            </div>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <div className="flex flex-row justify-center items-center">
              <div className="text-white text-xs sm:text-sm">
                Refer And Win Prizes
              </div>
              <img
                className="w-6 sm:w-7 h-auto"
                src={"/images/share.png"}
                alt=""
              />
            </div>
            <div className="flex flex-row p-1 gap-2 justify-center items-center bg-[#801313] w-full h-6 sm:h-8">
              <div
                className={`flex items-center p-1 text-xs sm:text-sm bg-white w-full h-4 sm:h-6 ${copied ? "text-red-600" : "text-black"}`}
              >
                {copied ? "Copied" : referralCode}
              </div>
              <img
                onClick={handleCopy}
                className="w-auto h-4 sm:h-6 cursor-pointer"
                src={"/images/clipboard.png"}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* 123 Ranks */}
        <div className="flex flex-row items-end w-full gap-2 p-2  h-[40%] sm:h-[45%] md:h-[50%] lg:h-[55%]">
          {/* Rank2 */}
          <div className="rounded-sm p-0.5 bg-linear-to-b w-full h-[80%] from-[#381218] to-[#666666] shadow-lg">
            <div className=" relative flex flex-col w-full h-full bg-[#330F0F] rounded-sm  ">
              <img
                className="absolute w-[19%] sm:w-[18%] md:w-[17%] lg:w-[16%] right-1 h-auto z-1"
                src={"/images/silver.png"}
                alt=""
              />
              <div className="flex flex-row  items-center gap-0.5 m-0.5 z-2 flex-wrap">
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 rounded-4xl bg-amber-50 border-3 border-[#7D0A0A]"></div>
                <div className="flex flex-row  justify-center items-center text-xs sm:text-sm md:text-xl text-[#FF0000]">
                  Donkey
                </div>
                <div className="absolute bottom-2 w-full flex flex-col justify-center items-center gap-1">
                  <div className="text-[#717171] text-xs sm:text-sm">
                    points
                  </div>
                  <div className="text-white text-sm sm:text-xl">1 WC</div>
                </div>
              </div>
            </div>
          </div>
          {/* Rank1 */}
          <div className="rounded-sm p-0.5 bg-linear-to-b w-full h-full from-[#350912] to-[#B26320] shadow-lg">
            <div className=" relative flex flex-col w-full h-full bg-[#330F0F] rounded-sm  ">
              <img
                className="absolute w-[20%] sm:w-[18%] md:w-[17%] lg:w-[16%] right-1 h-auto z-1"
                src={"/images/gold.png"}
                alt=""
              />
              <div className="flex flex-row  items-center gap-0.5 m-0.5 z-2 flex-wrap">
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 rounded-4xl bg-amber-50 border-3 border-[#7D0A0A]"></div>
                <div className="flex flex-row  justify-center items-center text-xs md:text-xl text-[#FF0000]">
                  Donkey
                </div>
                <div className="absolute bottom-2 w-full flex flex-col justify-center items-center gap-1">
                  <div className="text-[#717171] text-xs sm:text-sm">
                    points
                  </div>
                  <div className="text-white text-sm sm:text-xl">1 WC</div>
                </div>
              </div>
            </div>
          </div>
          {/* Rank3 */}
          <div className="rounded-sm p-0.5 bg-linear-to-b w-full h-[70%] from-[#1D0B06] to-[#833019] shadow-lg">
            <div className=" relative flex flex-col w-full h-full bg-[#330F0F] rounded-sm  ">
              <img
                className="absolute w-[20%] sm:w-[18%] md:w-[17%] lg:w-[16%] right-1 h-auto z-1"
                src={"/images/bronze.png"}
                alt=""
              />
              <div className="flex flex-row  items-center gap-0.5 m-0.5 z-2 flex-wrap">
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 rounded-4xl bg-amber-50 border-3 border-[#7D0A0A]"></div>
                <div className="flex flex-row  justify-center items-center text-xs md:text-xl text-[#FF0000]">
                  Donkey
                </div>
                <div className="absolute bottom-2 w-full flex flex-col justify-center items-center gap-1">
                  <div className="text-[#717171] text-xs sm:text-sm">
                    points
                  </div>
                  <div className="text-white text-sm sm:text-xl">1 WC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Rank List Section */}
        <div className="flex flex-col justify-center bg-[#330F0F] h-auto p-1 gap-4 overflow-hidden w-full rounded-sm border-1 border-[#6E1C2D] border-b-[#D43657]">
          <div className=" flex flex-col mt-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl shrink-0 items-center w-full  text-[#FF0000]">
            LEADERBOARD
          </div>
          <div className="flex flex-col gap-0 overflow-auto">
            <div className="flex flex-row items-center justify-between text-xs sm:text-sm md:text-xl text-[#717171] h-8 p-3">
              <div className="flex flex-row gap-8">
                <div>Rank</div>
                <div>Name </div>
              </div>

              <div>Points</div>
            </div>
            <div
              className="flex flex-col gap-0 overflow-auto [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-[#1B0D0D]
    [&::-webkit-scrollbar-thumb]:bg-[#801313]
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:border-2
    [&::-webkit-scrollbar-thumb]:border-[#1B0D0D]"
            >
              <RankCard rank={1} name={"Donkey"} points={"1 WC"} />
              <RankCard rank={2} name={"Donkey"} points={"1 WC"} />
              <RankCard rank={3} name={"Donkey"} points={"1 WC"} />
              <RankCard rank={4} name={"Donkey"} points={"1 WC"} />
              <RankCard rank={5} name={"Donkey"} points={"1 WC"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
