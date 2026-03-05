"use client";
import React from "react";

export default function ContactPage() {
  return (
    <main
      className="min-h-screen bg-black bg-top bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: "url('/images/contact/contactbg.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "top center",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `
            radial-gradient(
              circle at center,
              rgba(0,0,0,0) 20%,
              rgba(0,0,0,0.7) 85%,
              rgba(0,0,0,1) 100%
            )
          `,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="pt-16 md:pt-24 pb-4 md:pb-6 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] mt-8 sm:mt-10 md:mt-12 mb-4 md:mb-6 lg:mb-8 text-center">
            CONTACT
          </h1>
        </div>

        <div className="flex justify-center px-4 pb-16 md:pb-20">
          <div className="max-w-md w-full">
            <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 sm:p-8 md:p-12">
              <div className="text-center space-y-4 sm:space-y-6">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2">
                    Name
                  </p>
                  <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-wider">
                    Sreehari
                  </h2>
                </div>

                <div className="border-t border-white/10 pt-4 sm:pt-6">
                  <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2">
                    Phone
                  </p>
                  <a
                    href="tel:8714815466"
                    className="text-white text-lg sm:text-xl md:text-2xl font-light tracking-wider hover:text-gray-300 transition-colors inline-block"
                  >
                    8714815466
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
