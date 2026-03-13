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
import DayPassPanel from "./DayPassPanel";

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

  const revealedIndices = useMemo(
    () => items.map((a, i) => (a.revealed ? i : -1)).filter((i) => i >= 0),
    [items],
  );
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
      if (containerRef.current)
        setContainerWidth(containerRef.current.clientWidth);
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

  useEffect(() => () => stopOldAudio(), [stopOldAudio]);

  const handleTouchStart = (e) => {
    stopAutoScroll();
    startXRef.current = e.touches[0].clientX;
    startTimeRef.current = Date.now();
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - startXRef.current);
  };

  const handleTouchEnd = () => {
    const elapsed = Date.now() - startTimeRef.current;
    const velocity = Math.abs(dragOffset) / Math.max(elapsed, 1);
    const threshold = velocity > 0.4 ? 25 : 60;
    if (dragOffset < -threshold) goTo(activeIndex + 1);
    else if (dragOffset > threshold) goTo(activeIndex - 1);
    else goTo(activeIndex);
  };

  const handleCardClick = (i) => {
    if (!isDragging) {
      stopAutoScroll();
      if (i !== activeIndex) goTo(i);
      playSong(items[i]?.song);
    }
  };

  const activeDay = items[activeIndex]?.day ?? "DAY 1";

  const handleDayClick = useCallback(
    (dayLabel) => {
      stopAutoScroll();
      const revealedOfDay = items.findIndex(
        (a) => a.day === dayLabel && a.revealed,
      );
      const anyOfDay = items.findIndex((a) => a.day === dayLabel);
      const target = revealedOfDay >= 0 ? revealedOfDay : anyOfDay;
      if (target >= 0) goTo(target);
    },
    [items, stopAutoScroll, goTo],
  );

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

  const getCardStyle = (i) => {
    const baseOffset = ringOffset(i);
    const effectiveOffset = baseOffset + dragFraction;
    const absOffset = Math.abs(effectiveOffset);
    const scale = Math.max(SCALE_MIN, SCALE_CENTER - absOffset * SCALE_STEP);
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
    const opacity = isHidden ? 0 : Math.max(0.3, 1 - absOffset * 0.2);

    return {
      scale,
      brightness,
      tiltDeg,
      translateX,
      zIndex,
      opacity,
      isHidden,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden flex flex-col items-end"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Controls */}
      <div className="absolute top-[380px] left-0 right-0 flex items-center justify-between px-6 z-30 pointer-events-none">
        <button
          onClick={() => {
            stopAutoScroll();
            goTo(activeIndex - 1);
          }}
          className="w-8 h-8 flex items-center justify-center text-[#F4EFCF]/70 active:text-[#F4EFCF] text-6xl select-none pointer-events-auto"
        >
          ‹
        </button>
        <span className="text-[#F4EFCF]/60 translate-y-2 text-lg font-league-gothic tracking-widest select-none pointer-events-auto">
          {activeIndex + 1}/{n}
        </span>
        <button
          onClick={() => {
            stopAutoScroll();
            goTo(activeIndex + 1);
          }}
          className="w-8 h-8 flex items-center justify-center text-[#F4EFCF]/70 active:text-[#F4EFCF] text-6xl select-none pointer-events-auto"
        >
          ›
        </button>
      </div>

      {/* Cards Stage */}
      <div className="relative w-full flex items-end justify-center h-[400px] mt-10">
        {items.map((item, i) => {
          const {
            scale,
            brightness,
            tiltDeg,
            translateX,
            zIndex,
            opacity,
            isHidden,
          } = getCardStyle(i);
          return (
            <div
              key={item.id ?? i}
              className="absolute bottom-0 cursor-pointer"
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                filter: `brightness(${brightness})`,
                opacity,
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

      <div className="absolute left-0 right-0 z-20" style={{ top: "450px" }}>
        <DayPassPanel
          artists={items}
          activeDay={activeDay}
          onDayClick={handleDayClick}
          allDayPassLink={"https://ragam.co.in/proshows"}
        />
      </div>

      {/* Reflection */}
      <div className="overflow-hidden w-full pointer-events-none select-none h-[300px] overflow-hidden">
        <div
          className="relative flex items-start justify-center scale-y-[-1] opacity-30 h-[600px]"
          style={{
            filter: "url(#water-ripple) blur(2px)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 85%)",
          }}
        >
          {items.map((item, i) => {
            const { scale, brightness, tiltDeg, translateX, zIndex, isHidden } =
              getCardStyle(i);
            return (
              <div
                key={`ref-${item.id ?? i}`}
                className="absolute bottom-0"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  filter: `brightness(${brightness})`,
                  zIndex,
                  opacity: isHidden ? 0 : 1,
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
