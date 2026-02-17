"use client";

import {useEffect, useState} from "react";
import { usePathname } from "next/navigation";
import MenuOverlay from "./MenuOverlay";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { gsap } from "gsap";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if(pathname !== "/") {
            gsap.set("#global-navbar", { 
                opacity: 1, 
                translateY: 0, 
                pointerEvents: "auto" 
            });
        }
    }, [pathname]);
    return (
        <>
            <nav id="global-navbar"className="fixed top-0 left-0 w-full z-50 text-white pointer-events-none opacity-0 translate-y-[-40px] backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
                <div className="px-6 py-5">
                    <div className="grid grid-cols-3 items-center">
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