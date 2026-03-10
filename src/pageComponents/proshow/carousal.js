"use client";

import {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import ProshowCard from "@/pageComponents/proshow/proshowCard";

const TILT_PER_OFFSET = 10;
const MAX_TILT = 25;
const CARD_GAP_RATIO = 0.26;
const SCALE_CENTER = 0.64;
const SCALE_STEP = 0.12;
const SCALE_MIN = 0.42;
const BRIGHTNESS_CENTER = 1;
const BRIGHTNESS_STEP = 0.3;
const BRIGHTNESS_MIN = 0.2;
const AUTO_SCROLL_INTERVAL = 2500;

export default function FocusCarousel({ items = [] }) {
  const n = items.length;
  const [activeIndex, setActiveIndex] = useState(() => {
    const revealed = items
      .map((a, i) => (a.revealed ? i : -1))
      .filter((i) => i >= 0);
    return revealed.length > 0 ? revealed[0] : Math.floor(n / 2);
  });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(375);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const containerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const userInteractedRef = useRef(false);
  const audioRef = useRef(null);

  const cardGapPx = containerWidth * CARD_GAP_RATIO;
  const wrap = useCallback((idx) => ((idx % n) + n) % n, [n]);

  const revealedIndices = useMemo(() => {
    return items.map((a, i) => (a.revealed ? i : -1)).filter((i) => i >= 0);
  }, [items]);

  const hasRevealed = revealedIndices.length > 0;

  const stopAutoScroll = useCallback(() => {
    userInteractedRef.current = true;
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  const stopOldAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  const playSong = useCallback(
    (songUrl) => {
      stopOldAudio();
      if (songUrl) {
        const audio = new Audio(songUrl);
        audioRef.current = audio;
        audio.play().catch((err) => console.error("Playback failed:", err));
      }
    },
    [stopOldAudio],
  );

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goTo = useCallback(
    (index) => {
      setActiveIndex(wrap(index));
      setDragOffset(0);
      setIsDragging(false);
    },
    [wrap],
  );

  // Auto-scroll (No audio logic here!)
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
  }, [hasRevealed, revealedIndices]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopOldAudio();
  }, [stopOldAudio]);

  const handleTouchStart = (e) => {
    stopAutoScroll();
    startXRef.current = e.touches[0].clientX;
    startTimeRef.current = Date.now();
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startXRef.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    const elapsed = Date.now() - startTimeRef.current;
    const velocity = Math.abs(dragOffset) / Math.max(elapsed, 1);
    const threshold = velocity > 0.4 ? 25 : 60;

    if (dragOffset < -threshold) {
      goTo(activeIndex + 1);
    } else if (dragOffset > threshold) {
      goTo(activeIndex - 1);
    } else {
      goTo(activeIndex);
    }
  };

  const handleCardClick = (i) => {
    // Only play if it's the center card being clicked
    if (!isDragging) {
      stopAutoScroll();
      if (i !== activeIndex) {
        goTo(i);
      }
      // Play song on click regardless of whether it was already active
      playSong(items[i]?.song);
    }
  };

  const dragFraction = isDragging ? dragOffset / cardGapPx : 0;

  const ringOffset = useCallback(
    (i) => {
      let off = i - activeIndex;
      if (off > n / 2) off -= n;
      if (off < -n / 2) off += n;
      return off;
    },
    [activeIndex, n],
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative w-full flex items-end justify-center"
        style={{ height: "420px" }}
      >
        {items.map((item, i) => {
          const baseOffset = ringOffset(i);
          const effectiveOffset = baseOffset + dragFraction;
          const absOffset = Math.abs(effectiveOffset);

          const scale = Math.max(
            SCALE_MIN,
            SCALE_CENTER - absOffset * SCALE_STEP,
          );
          const brightness = Math.max(
            BRIGHTNESS_MIN,
            BRIGHTNESS_CENTER - absOffset * BRIGHTNESS_STEP,
          );
          const tiltDeg = Math.max(
            -MAX_TILT,
            Math.min(MAX_TILT, effectiveOffset * TILT_PER_OFFSET),
          );
          const translateX = effectiveOffset * cardGapPx;
          const zIndex = Math.max(1, 10 - Math.round(absOffset * 3));
          const isHidden = absOffset > 3;
          const cardOpacity = isHidden ? 0 : Math.max(0.3, 1 - absOffset * 0.2);

          return (
            <div
              key={item.id ?? i}
              className="absolute bottom-0 cursor-pointer"
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                filter: `brightness(${brightness})`,
                opacity: cardOpacity,
                zIndex,
                transition: isDragging
                  ? "none"
                  : "all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)",
                willChange: "transform, filter",
              }}
              onClick={() => handleCardClick(i)}
            >
              <ProshowCard {...item} tilt={tiltDeg} />
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between px-6 py-2 z-30">
        <button
          onClick={() => {
            stopAutoScroll();
            goTo(activeIndex - 1);
          }}
          className="w-8 h-8 flex items-center justify-center text-[#F4EFCF]/70 active:text-[#F4EFCF] text-4xl select-none"
        >
          ‹
        </button>
        <span className="text-[#F4EFCF]/60 text-sm font-league-gothic tracking-widest select-none">
          {activeIndex + 1}/{n}
        </span>
        <button
          onClick={() => {
            stopAutoScroll();
            goTo(activeIndex + 1);
          }}
          className="w-8 h-8 flex items-center justify-center text-[#F4EFCF]/70 active:text-[#F4EFCF] text-4xl select-none"
        >
          ›
        </button>
      </div>

      {/* Reflection */}
      <div className="overflow-hidden w-full pointer-events-none select-none">
        <div
          className="relative flex items-start justify-center scale-y-[-1] opacity-30"
          style={{
            filter: "url(#water-ripple) blur(2px)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 65%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 65%)",
            height: "250px",
          }}
        >
          {items.map((item, i) => {
            const baseOffset = ringOffset(i);
            const effectiveOffset = baseOffset + dragFraction;
            const absOffset = Math.abs(effectiveOffset);
            const scale = Math.max(
              SCALE_MIN,
              SCALE_CENTER - absOffset * SCALE_STEP,
            );
            const brightness = Math.max(
              BRIGHTNESS_MIN,
              BRIGHTNESS_CENTER - absOffset * BRIGHTNESS_STEP,
            );
            const tiltDeg = Math.max(
              -MAX_TILT,
              Math.min(MAX_TILT, effectiveOffset * TILT_PER_OFFSET),
            );
            const translateX = effectiveOffset * cardGapPx;
            const zIndex = Math.max(1, 10 - Math.round(absOffset * 3));

            return (
              <div
                key={`ref-${item.id ?? i}`}
                className="absolute bottom-0"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  filter: `brightness(${brightness})`,
                  zIndex,
                  opacity: absOffset > 3 ? 0 : 1,
                  transition: isDragging
                    ? "none"
                    : "all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                <ProshowCard {...item} tilt={tiltDeg} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
