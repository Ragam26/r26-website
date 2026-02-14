/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VinylDisc from "./vinylAnimation";
import KathakaliEyes from "./eyesAnimation";

gsap.registerPlugin(ScrollTrigger);

function Polaroid() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-black overflow-hidden">
      <div className="relative flex flex-col sm:flex-row items-center justify-center w-full h-[90%] sm:h-[60%] md:h-[70%] lg:h-[80%]  border-t border-b border-[#F4EFCF] sm:pl-3 sm:pr-3 sm:gap-2 ">
        <img
          src={"/assets/images/polaroid_page/upper.svg"}
          alt="Background texture"
          className="absolute top-0 left-0 w-full sm:w-[50%] max-w-250 z-0"
        />
        <img
          src={"/assets/images/polaroid_page/lower.svg"}
          alt="Background texture"
          className="absolute bottom-0 right-0 w-full sm:w-[50%] max-w-250 z-0"
        />
        <div className="relative flex flex-col z-10 sm:w-1/2 items-center justify-center h-full gap-2 sm:gap-10 pt-5 pb-5">
          <div className="flex flex-row items-center h-[30%] sm:min-h-35 md:h-40 lg:h-55  min-w-80 gap-0 justify-center  ">
            <img
              src={"/assets/images/polaroid_page/rangoli.svg"}
              alt="rangoli"
              className="w-auto h-full object-cover"
            />
            <KathakaliEyes />
          </div>
          <div className="flex flex-row items-end font-black justify-center gap-2">
            <div className="flex flex-row items-end gap-1 font-black text-[#b0a695] ">
              <div className="flex flex-col font-[--font-slackey] text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase leading-none tracking-wide  text-[#8F7B75] gap-2">
                <div className="flex flex-row justify-between gap-1">
                  <span className="lowercase">march</span>
                  <span>27</span>
                </div>

                {/* Row 2 */}
                <div className="flex flex-row justify-between gap-1">
                  <span className="lowercase">march</span>
                  <span>28</span>
                </div>

                {/* Row 3 */}
                <div className="flex flex-row justify-between gap-1">
                  <span className="lowercase">march</span>
                  <span>29</span>
                </div>
              </div>
            </div>
            <img
              src={"/assets/images/polaroid_page/queen.svg"}
              alt="queen"
              className="w-15 sm:min-w-17 md:min-w-20 lg:min-w-24 object-cover"
            />
            <img
              src={"/assets/images/polaroid_page/king.svg"}
              alt="king"
              className="w-15 sm:min-w-17 md:min-w-20 lg:min-w-24 object-cover"
            />
          </div>
        </div>
        <div className="relative flex sm:w-1/2 flex-rows items-center justify-start z-10 bottom-25 sm:bottom-0 m-2">
          <div className="flex flex-col  items-center justify-start sm:-mt-18 ">
            <img
              src={"/assets/images/polaroid_page/camera.svg"}
              alt="camera"
              className="max-w-33 sm:min-w-35 md:max-w-45 lg:max-w-55  h-full object-cover z-10"
            />
            <img
              src={"/assets/images/polaroid_page/frame1.svg"}
              alt="frame1"
              className="max-w-25 sm:max-w-25 md:max-w-30 lg:min-w-40 h-full object-cover -mt-[25%] z-9"
            />
            <img
              src={"/assets/images/polaroid_page/frame2.svg"}
              alt="frame2"
              className="max-w-25 sm:max-w-25 md:max-w-30 lg:min-w-40 h-full object-cover -mt-[25%] z-9"
            />
          </div>
          <div className="flex flex-col justify-between items-center gap-5 sm:gap-8 md:gap-10 z-10 sm:mr-10 sm:w-90">
            <VinylDisc />
            <div className="relative">
              <img
                src={"/assets/images/polaroid_page/retro_tv.svg"}
                alt="retro_tv"
                className="relative max-w-40 sm:min-w-50 md:max-w-60 lg:min-w-70   object-cover z-10"
              />
              <div className="absolute top-[23.5%] left-[19%] w-[52%] h-[55%] z-10 overflow-hidden rounded-2xl bg-black">
                <img
                  src="/assets/images/polaroid_page/tvVideo.gif" // Replace with your GIF path
                  alt="Screen Animation"
                  className="w-full h-full object-cover opacity-80" // opacity-80 makes it look like it's "inside" the glass
                />

                {/* Optional: CRT Scanline Effect Overlay */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Polaroid;
