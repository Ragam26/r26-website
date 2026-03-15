"use client";
import React from "react";

export default function InformalsPage() {
  return (
    <main
      className="min-h-screen bg-black bg-top bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/images/card/dancerBg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="pt-20 md:pt-32 pb-12 md:pb-16 flex flex-col items-center justify-center px-4">
        <h1 className="text-white text-4xl md:text-7xl lg:text-8xl font-serif tracking-[0.3em] mt-20 mb-8 md:mb-12">
          INFORMALS
        </h1>
      </div>

      <div className="w-full max-w-350 mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <p className="text-center text-gray-500 py-20 text-xl font-light tracking-widest">
          NO INFORMALS EVENTS RIGHT NOW
        </p>
      </div>
    </main>
  );
}
