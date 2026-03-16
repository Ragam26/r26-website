"use client";
import { useEffect } from "react";
import Image from "next/image";
import { archivo, instrument } from "@/lib/fonts";

export default function AdjModal({ adj, onClose }) {
  // Lock scroll and listen for Escape
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!adj) return null;

  return (
    // Backdrop — click outside to close
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* Modal box — stop propagation so clicking inside doesn't close */}
      <div
        className="relative bg-[#120306] border border-[#D4AF37]/30 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/60 hover:text-white text-xl font-light leading-none transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Left panel — photo + name + institution */}
        <div className="flex flex-col items-center justify-center gap-4 p-8 md:w-[42%] border-b md:border-b-0 md:border-r border-[#D4AF37]/20">
          <div className="relative w-52 h-64 rounded-xl overflow-hidden border border-[#D4AF37]/40">
            <Image
              src={adj.image}
              alt={adj.name}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="text-center">
            <h2
              className={`${archivo.className} text-white text-3xl font-light tracking-wide`}
            >
              {adj.name}
            </h2>
            <p
              className={`${instrument.className} text-[#D4AF37] text-sm mt-1 font-light`}
            >
              {adj.institution}
            </p>
          </div>
        </div>

        {/* Right panel — bio + accomplishments */}
        <div className="flex flex-col gap-6 p-8 md:w-[58%]">
          {adj.bio && (
            <div>
              <h3
                className={`${instrument.className} text-[#D4AF37] text-xs uppercase tracking-widest mb-3`}
              >
                About
              </h3>
              <p
                className={`${instrument.className} text-white/80 text-sm leading-relaxed`}
              >
                {adj.bio}
              </p>
            </div>
          )}

          {adj.accomplishments?.length > 0 && (
            <div>
              <h3
                className={`${instrument.className} text-[#D4AF37] text-xs uppercase tracking-widest mb-3`}
              >
                Prior Experience
              </h3>
              <ul className="flex flex-col gap-2">
                {adj.accomplishments.map((item, i) => (
                  <li
                    key={i}
                    className={`${instrument.className} text-white/75 text-sm flex gap-2`}
                  >
                    <span className="text-[#D4AF37] mt-0.5 shrink-0">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
