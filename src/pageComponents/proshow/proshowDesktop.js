"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ProshowCard from "@/pageComponents/proshow/proshowCard";

const TILT_PER_OFFSET = 8;
const MAX_TILT = 20;
const SPACING_VW = [0, 17, 31, 42];
const SCALE = [1.05, 0.88, 0.72, 0.58];
const BRIGHTNESS = [1, 0.7, 0.45, 0.35];
const VISIBLE_RANGE = 3;
const AUTO_SCROLL_INTERVAL = 2500;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpFromTable(table, absOffset) {
  const idx = Math.min(Math.floor(absOffset), table.length - 2);
  const frac = absOffset - idx;
  return lerp(table[idx], table[idx + 1], frac);
}

export default function ProshowDesktop({ artists }) {
  const n = artists.length;
  const [activeIndex, setActiveIndex] = useState(() => {
    const revealed = artists
      .map((a, i) => (a.revealed ? i : -1))
      .filter((i) => i >= 0);
    return revealed.length > 0 ? revealed[0] : Math.floor(artists.length / 2);
  });
  const autoScrollRef = useRef(null);
  const userInteractedRef = useRef(false);
  const audioRef = useRef(null);

  const revealedIndices = useMemo(() => {
    return artists.map((a, i) => (a.revealed ? i : -1)).filter((i) => i >= 0);
  }, [artists]);

  const hasRevealed = revealedIndices.length > 0;

  const wrap = useCallback((idx) => ((idx % n) + n) % n, [n]);

  const goLeft = useCallback(() => setActiveIndex((p) => wrap(p - 1)), [wrap]);
  const goRight = useCallback(() => setActiveIndex((p) => wrap(p + 1)), [wrap]);

  const stopAutoScroll = useCallback(() => {
    userInteractedRef.current = true;
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  const handleArrowLeft = useCallback(() => {
    stopAutoScroll();
    goLeft();
  }, [stopAutoScroll, goLeft]);

  const handleArrowRight = useCallback(() => {
    stopAutoScroll();
    goRight();
  }, [stopAutoScroll, goRight]);

  // Handle the audio logic directly inside the click event
  const playSong = useCallback((songUrl) => {
    // 1. Always stop currently playing audio first
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // 2. Play the new song if it exists
    if (songUrl) {
      const audio = new Audio(songUrl);
      audioRef.current = audio;
      audio.play().catch((err) => {
        console.error("Playback failed:", err);
      });
    }
  }, []);

  const handleCardClick = useCallback(
    (i) => {
      stopAutoScroll();
      setActiveIndex(i);
      playSong(artists[i]?.song); // Trigger audio here, not in a useEffect
    },
    [stopAutoScroll, artists, playSong],
  );

  // Auto-scroll logic
  useEffect(() => {
    if (!hasRevealed || userInteractedRef.current) return;

    autoScrollRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const curPos = revealedIndices.indexOf(prev);
        if (curPos === -1) return revealedIndices[0];
        return revealedIndices[(curPos + 1) % revealedIndices.length];
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [hasRevealed, revealedIndices, activeIndex]);

  // Clean up audio strictly when the component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const getCardStyle = useCallback(
    (index) => {
      let offset = index - activeIndex;
      if (offset > n / 2) offset -= n;
      if (offset < -n / 2) offset += n;

      const absOffset = Math.abs(offset);
      const sign = offset >= 0 ? 1 : -1;

      const scale =
        absOffset >= SCALE.length
          ? SCALE[SCALE.length - 1]
          : lerpFromTable(SCALE, absOffset);

      const brightness =
        absOffset >= BRIGHTNESS.length
          ? BRIGHTNESS[BRIGHTNESS.length - 1]
          : lerpFromTable(BRIGHTNESS, absOffset);

      const translateX =
        absOffset >= SPACING_VW.length
          ? sign *
            (SPACING_VW[SPACING_VW.length - 1] +
              (absOffset - SPACING_VW.length + 1) *
                (SPACING_VW[SPACING_VW.length - 1] -
                  SPACING_VW[SPACING_VW.length - 2]))
          : sign * lerpFromTable(SPACING_VW, absOffset);

      const tiltDeg = Math.max(
        -MAX_TILT,
        Math.min(MAX_TILT, offset * TILT_PER_OFFSET),
      );
      const zIndex = 10 - Math.round(absOffset);
      const visible = absOffset <= VISIBLE_RANGE;

      return { scale, brightness, tiltDeg, translateX, zIndex, visible };
    },
    [activeIndex, n],
  );

  return (
    <div className="relative scale-[0.85] origin-top">
      {/* Left Arrow */}
      <button
        onClick={handleArrowLeft}
        className="absolute -translate-x-12 left-0 top-[30%] z-30 w-12 h-12 flex items-center justify-center
          text-[#F4EFCF]/50 hover:text-[#F4EFCF] text-8xl
          transition-all duration-300 select-none hover:scale-110"
        aria-label="Previous artist"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleArrowRight}
        className="absolute translate-x-12 right-0 top-[30%] z-30 w-12 h-12 flex items-center justify-center
          text-[#F4EFCF]/50 hover:text-[#F4EFCF] text-8xl
          transition-all duration-300 select-none hover:scale-110"
        aria-label="Next artist"
      >
        ›
      </button>

      {/* Cards */}
      <div
        className="relative flex items-end justify-center overflow-hidden"
        style={{ height: "560px" }}
      >
        {artists.map((artist, i) => {
          const { scale, brightness, tiltDeg, translateX, zIndex, visible } =
            getCardStyle(i);

          return (
            <div
              key={artist.id}
              className="absolute bottom-0 cursor-pointer"
              style={{
                transform: `translateX(${translateX}vw) scale(${scale})`,
                filter: `brightness(${brightness})`,
                zIndex,
                opacity: visible ? 1 : 0,
                transition: "all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)",
                willChange: "transform, filter, opacity",
              }}
              onClick={() => handleCardClick(i)}
            >
              <ProshowCard {...artist} tilt={tiltDeg} />
            </div>
          );
        })}
      </div>

      {/* Reflection */}
      <div className="overflow-hidden w-full pointer-events-none select-none">
        <div
          className="relative flex items-start justify-center scale-y-[-1] opacity-30 mt-[2vw]"
          style={{
            filter: "url(#water-ripple) blur(3px)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 65%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 65%)",
            height: "420px",
          }}
        >
          {artists.map((artist, i) => {
            const { scale, brightness, tiltDeg, translateX, zIndex, visible } =
              getCardStyle(i);

            return (
              <div
                key={`ref-${artist.id}`}
                className="absolute bottom-0"
                style={{
                  transform: `translateX(${translateX}vw) scale(${scale})`,
                  filter: `brightness(${brightness})`,
                  zIndex,
                  opacity: visible ? 1 : 0,
                  transition: "all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                <ProshowCard {...artist} tilt={tiltDeg} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
