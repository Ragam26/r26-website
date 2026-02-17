"use client";

import {useState} from "react";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            <nav className="fixed w-full flex justify-between items-start p-4 z-50">
                <div className="p-4 cursor pointer w-16">
                    <a className="uppercase text-sm font-semibold">
                        RAGAM
                    </a>
                </div>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-4 uppercase text-sm font-semibold"
                >
                    {isMenuOpen ? "Close" : "Menu"}
                </button>
            </nav>

            <MenuOverlay isOpen={isMenuOpen} />
        </>
    );
}