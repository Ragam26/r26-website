import { BiX } from "react-icons/bi";
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-[90%] max-w-4xl bg-white rounded-xl shadow-2xl"
      >

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-gray-600 hover:text-black"
        >
          <BiX />
        </button>

        {/* Title */}
        <h2 className="px-8 pt-6 pb-4 text-2xl font-semibold border-b">
          {title}
        </h2>

        {/* Body */}
        <div className="flex">
        
          {/* LEFT COLUMN */}
          <div className="flex-1 max-h-[60vh] p-8 space-y-6 border-r overflow-y-auto" onWheel={(e) => e.currentTarget.scrollTop += e.deltaY}>

            <div className="text-gray-700 leading-relaxed">
              {description}
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="p-8 space-y-6 w-[33%]">

            {/* POC */}
            <div className="rounded-lg border p-4">
              <h3 className="mb-3 font-semibold text-lg">
                Contact Us
              </h3>

              <div className="space-y-3">
                {pocList.map((poc, index) => (
                  <div key={index} className="flex flex-col text-md">
                    <span className="font-medium">
                      {poc.name}
                    </span>
                    <span className="text-gray-600">
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
                className="block text-center rounded-lg bg-black text-white py-3 font-medium hover:bg-gray-800 transition"
              >
                Download Brochure
              </a>
            )}

        </div>
        </div>
      </div>
    </div>
  );
}