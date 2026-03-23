import { grotapDemo, poppins } from "@/lib/fonts";
import { useEffect, useRef } from "react";

export default function InfoCard({
  isOpen,
  onClose,
  title,
  description,
  pocList = [],
  brochure
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.dataset.scrollY = scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.dataset.scrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY));
    }
  }, [isOpen]);

  const handleOverLayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onMouseDown={handleOverLayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur"
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        className={`relative ${description ? "max-w-4xl" : "max-w-sm"} w-[90%] bg-[#1e0b0b]/50 shadow-2xl overflow-hidden border-r border-l border-b border-white/20 rounded-lg transition-all`}
      >

        <div className ="relative px-8 py-2 bg-[url('/images/infoCard/banner.svg')] h-15 bg-cover bg-center">
          {/* Title */}
          <h2 className="text-4xl text-center font-bold text-white tracking-wide" style={{ fontFamily: grotapDemo.style.fontFamily }}>
            {title}
          </h2>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-white hover:scale-115 transition"
          >
            <img src="https://cdn.ragam.co.in/infoCard/X.svg" alt="Close" className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className={`flex flex-col ${description? "md:flex-row" :"" } max-h-[60vh] overflow-y-auto md:overflow-hidden`}
          onWheel={(e) => {
            if (window.innerWidth < 768) e.currentTarget.scrollTop += e.deltaY;
          }}
        >

          {/* RIGHT COLUMN */}
          <div
            className={`p-8 space-y-6 w-full ${description ? "md:w-[33%] md:order-2" : ""} md:max-h-[60vh] md:overflow-y-auto`}
            onWheel={(e) => {
              if (window.innerWidth >= 768) e.currentTarget.scrollTop += e.deltaY;
            }}
          >
            {/* POC */}
            <div className="rounded-xl border border-white bg-[#1e0b0b]/60 p-4">
              <h3 className="mb-3 font-semibold text-lg text-white text-center tracking-wide" style={{ fontFamily: grotapDemo.style.fontFamily}}>Contact Us</h3>
              <div className="space-y-3">
                {pocList.map((poc, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="font-bold text-white" style={{ fontFamily: poppins.style.fontFamily }}>
                      {poc.name}
                    </span>
                    <span className="text-white font-light text-sm" style={{ fontFamily: poppins.style.fontFamily }}>
                      {poc.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brochure */}
            {brochure && (
              <a
                href={brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center rounded-xl bg-white text-black py-3 font-bold hover:bg-gray-200 transition"
              >
                Download Brochure
              </a>
            )}
          </div>

          {/* DIVIDER - mobile only (horizontal) */}
          {description && <div className="block md:hidden mx-8 border-t border-white/20" />}

          {/* LEFT COLUMN */}
          {description && (
            <div
              className="md:order-1 flex-1 p-8 space-y-6 md:max-h-[60vh] md:overflow-y-auto md:border-r border-white"
              onWheel={(e) => {
                if (window.innerWidth >= 768) e.currentTarget.scrollTop += e.deltaY;
              }}
          >
            <div className="text-white leading-relaxed" style={{ fontFamily: poppins.style.fontFamily }}>
              {description?.split("\n").map((line, index) => (
                line.trim() === "" ? <br key={index} /> : <p key={index} className="mb-4">{line}</p>
                ))}
            </div>
          </div>
          )}
      </div>
    </div>
    </div>
  );
}