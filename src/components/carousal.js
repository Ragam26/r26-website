"use client";

import { useRef, useState, useEffect } from "react";
import ProshowCard from "@/components/proshowCard";

export default function FocusCarousel({ items = [] }) {
    const containerRef = useRef(null);
    const [active, setActive] = useState(Math.floor(items.length / 2));
    const [spacer, setSpacer] = useState(0);

    /* ---------- initial center on mount ---------- */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const children = Array.from(el.children);
        const target = children[active + 1]; // +1 for spacer
        if (!target) return;

        target.scrollIntoView({
            behavior: "auto", // no animation on first load
            inline: "center",
            block: "nearest",
        });
    }, [spacer]); // run after spacer computed
    /* ---------- initial center on mount ---------- */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const children = Array.from(el.children);
        const target = children[active + 1];
        if (!target) return;

        const left =
            target.offsetLeft - el.clientWidth / 2 + target.clientWidth / 2;

        el.scrollTo({ left, behavior: "auto" });
    }, [spacer]);

    /* ---------- calculate dynamic spacer ---------- */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const updateSpacer = () => {
            const firstCard = el.querySelector("[data-card]");
            if (!firstCard) return;

            const containerWidth = el.clientWidth;
            const cardWidth = firstCard.clientWidth;

            setSpacer(containerWidth / 2 - cardWidth / 2);
        };

        updateSpacer();
        window.addEventListener("resize", updateSpacer);
        return () => window.removeEventListener("resize", updateSpacer);
    }, []);

    /* ---------- scroll to active ---------- */


    /* ---------- sync focus on swipe ---------- */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const children = Array.from(el.children).slice(1, -1);
            const containerRect = el.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;

            let closest = 0;
            let minDist = Infinity;

            children.forEach((child, i) => {
                const rect = child.getBoundingClientRect();
                const childCenter = rect.left + rect.width / 2;
                const dist = Math.abs(containerCenter - childCenter);

                if (dist < minDist) {
                    minDist = dist;
                    closest = i;
                }
            });

            setActive(closest);
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    /* ---------- arrows ---------- */
    const prev = () => setActive((a) => Math.max(a - 1, 0));
    const next = () => setActive((a) => Math.min(a + 1, items.length - 1));

    return (
        <div className="relative w-full">


            {/* scroll container */}
            <div
                ref={containerRef}
                className="flex overflow-x-auto  gap-6 px-12 py-8"
            >
                {/* LEFT dynamic spacer */}
                <div style={{ width: spacer }} className="shrink-1" />

                {items.map((item, i) => {
                    const isActive = i === active;

                    return (
                        <div
                            key={item.id ?? i}
                            data-card
                            className=" shrink-0 w-[70vw] sm:w-[50vw] md:w-[40vw] transition-all duration-300"
                            style={{
                                transform: `scale(${isActive ? 0.9 : 0.7})`,
                                filter: `brightness(${isActive ? 1.1 : 0.2})`,
                            }}
                        >
                            <ProshowCard tilt={item.tilt} />

                            {/* reflection */}
                            <div
                                className="scale-y-[-1] opacity-30 mt-6 pointer-events-none"
                                style={{
                                    filter: "url(#water-ripple) blur(3px)",
                                    maskImage:
                                        "linear-gradient(to top, rgba(0,0,0,1) 20%, transparent 90%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to top, rgba(0,0,0,1) 20%, transparent 90%)",
                                }}
                            >
                                <ProshowCard tilt={item.tilt} />
                            </div>
                        </div>
                    );
                })}

                {/* RIGHT dynamic spacer */}
                <div style={{ width: spacer }} className="shrink-0" />
            </div>
        </div>
    );
}
