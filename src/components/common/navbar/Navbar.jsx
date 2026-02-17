"use client";

import {use, useEffect, useState} from "react";
import { usePathname } from "next/navigation";
import MenuOverlay from "./MenuOverlay";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if(pathname !== "/") {
            gsap.set("#global-navbar", { 
                opacity: 1, 
                y: 0, 
                pointerEvents: "auto" 
            });
        }
    }, [pathname]);

    useEffect(() => {
        const navbar = document.querySelector("#global-navbar");
        if (!navbar) return;

        if (isMenuOpen) {

            // keep navbar visible
            gsap.to(navbar, {
                opacity: 1,
                y: 0,
                pointerEvents: "auto",
                duration: 0.3,
                overwrite: "auto",
            });

            // ===== FREEZE SCROLL (REAL FIX) =====
            const scrollY = window.scrollY;

            document.body.dataset.scrollY = scrollY;

            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";

        } else {

            // ===== RESTORE SCROLL =====
            const scrollY = document.body.dataset.scrollY || 0;

            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";

            window.scrollTo(0, parseInt(scrollY));
            
        }
    }, [isMenuOpen]);


    return (
        <>
            <nav id="global-navbar"className="fixed top-0 inset-x-0 w-full max-w-[100vw] overflow-x-hidden box-border z-[2000] text-white pointer-events-none opacity-0 backdrop-blur-lg bg-black/30 border-b border-b border-white/20">
                <div className="px-6 py-5">
                    <div className="grid grid-cols-3 items-center min-w-0">
                        {/* Left Side */}
                        <div/>

                        {/* Center Logo */}
                        <div className="flex justify-center">
                            <Image
                                src="/images/ragam-logo.svg"
                                alt="Logo"
                                width={100}
                                height={100}
                                className="w-auto h-12 object-contain select-none"
                            />
                        </div>

                        {/* Right Side */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="
                                    uppercase
                                    text-sm
                                    tracking-wide
                                    cursor-pointer
                                    select-none
                                "
                            >
                                {isMenuOpen ? <IoMdClose size={30} /> : <MdOutlineMenu size={30} />}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-px bg-white/20" />
            </nav>

            <MenuOverlay isOpen={isMenuOpen} />
        </>
    );
}