"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ThreeScene from "./ThreeScene";

export default function MenuOverlay({ isOpen }) {
    const overlayRef = useRef(null);

    useEffect(() => {
        if (!overlayRef.current) return;

        gsap.to(overlayRef.current, {
            opacity: isOpen ? 1 : 0,
            duration: 0.5,
            ease: "power3.out",
            pointerEvents: isOpen ? "all" : "none",
        });
    }, [isOpen]);

    const links = [
        "Studio",
        "Jack",
        "Fayis",
        "Coolboy",
        "Damn",
        "Bro",
        "Thicc"
    ];

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 opacity-0 pointer-events-none flex justify-end bg-[#1a1a1a] z-40"
        >
            <ThreeScene />
            {/* Links */}
            <div className="relative w-[45%] h-full flex flex-col justify-center">
                {links.map((item) => (
                    <div key={item} className="menu-item">
                        <a
                            className="
                            text-[4rem] text-[#4d4d4d]
                            uppercase font-semibold
                            bg-[linear-gradient(#fff,#fff)]
                            bg-left bg-no-repeat
                            bg-[length:0%_100%]
                            bg-clip-text
                            text-transparent
                            transition-all duration-300
                            hover:bg-[length:100%_100%]
                            "
                            href="#"
                        >
                            {item}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}