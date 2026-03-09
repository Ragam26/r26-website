"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brixton } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

function MorphText({ texts = [], morphTime = 2.5, cooldownTime = 2 }) {
  const containerRef = useRef(null);
  const t1 = useRef(null);
  const t2 = useRef(null);

  useEffect(() => {
    if (texts.length < 2) return;

    let idx = 0;
    let cancelled = false;
    const el1 = t1.current;
    const el2 = t2.current;

    const playMorph = () => {
      if (cancelled) return;

      el1.textContent = texts[idx % texts.length];
      el2.textContent = texts[(idx + 1) % texts.length];

      const tl = gsap.timeline({
        onComplete: () => {
          idx = (idx + 1) % texts.length;
          gsap.delayedCall(cooldownTime, playMorph);
        },
      });

      tl.fromTo(
        el1,
        { filter: "blur(0px)", opacity: 1 },
        {
          filter: "blur(12px)",
          opacity: 0,
          duration: morphTime,
          ease: "sine.inOut",
        },
        0,
      );

      tl.fromTo(
        el2,
        { filter: "blur(12px)", opacity: 0 },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: morphTime,
          ease: "sine.inOut",
        },
        0,
      );
    };

    playMorph();
    return () => {
      cancelled = true;
      gsap.killTweensOf([el1, el2]);
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <>
      <div ref={containerRef} className="morph-container">
        <span ref={t1} className="morph-text" />
        <span ref={t2} className="morph-text" />
      </div>

      <style jsx>{`
        .morph-container {
          filter: url(#threshold);
          display: grid;
          place-items: center;
          will-change: filter;
          -webkit-font-smoothing: antialiased;
          min-width: 1px;
          min-height: 1px;
        }
        .morph-text {
          grid-area: 1/1;
          position: relative;
          display: inline-block;
          user-select: none;
          transform: translateZ(0);
        }
      `}</style>

      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="threshold">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 14 -5"
          />
        </filter>
      </svg>
    </>
  );
}

const DOT_COLORS = ["#fef08a", "#fde68a", "#fdba74", "#fb923c"];

function RadialDots({ count = 0.8, maxDistance = 3000, originY = 0.85 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (count === 0) return;
    const canvas = canvasRef.current;
    const wrap = containerRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    let dots = [],
      lastEmit = 0,
      rafId;

    function resize() {
      const r = wrap.getBoundingClientRect();
      canvas.width = Math.max(r.width, 1);
      canvas.height = Math.max(r.height, 1);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    function emit(now) {
      const cx = canvas.width * 0.5;
      const cy = canvas.height * originY;
      const n = Math.floor(count) + (Math.random() < count % 1 ? 1 : 0);
      for (let i = 0; i < n; i++) {
        dots.push({
          angle: Math.random() * 2 * Math.PI,
          born: now,
          duration: (10 + Math.random() * 0.5) * 1000,
          size: Math.random() > 0.5 ? 1 : 2,
          color: DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)],
          cx,
          cy,
        });
      }
    }

    function draw(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (now - lastEmit > 28) {
        emit(now);
        lastEmit = now;
      }
      const alive = [];
      for (const d of dots) {
        const t = (now - d.born) / d.duration;
        if (t >= 1) continue;
        alive.push(d);
        ctx.globalAlpha = 1 - t;
        ctx.fillStyle = d.color;
        ctx.fillRect(
          d.cx + Math.cos(d.angle) * maxDistance * t,
          d.cy + Math.sin(d.angle) * maxDistance * t,
          d.size,
          d.size,
        );
      }
      dots = alive;
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [count, maxDistance, originY]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {count > 0 && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            overflow: "visible",
          }}
        />
      )}
    </div>
  );
}

export default function RagamTrophy() {
  const sectionRef = useRef(null);
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);
  const linkRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(max-width: 400px)", () => {
      const el = mobileRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 100, scale: 1.2 },
        {
          y: 0,
          scale: 1.8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "+=120%",
            scrub: 1,
          },
        },
      );
    });

    mm.add("(min-width: 401px) and (max-width: 768px)", () => {
      const el = mobileRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 150, scale: 0.6 },
        {
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "+=120%",
            scrub: 1,
          },
        },
      );
    });

    mm.add("(min-width: 769px)", () => {
      const el = desktopRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 250, scale: 0.6 },
        {
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "+=90%",
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!linkRef.current) return;
    gsap.from(linkRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: linkRef.current,
        start: "bottom 110%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative ${brixton.className} h-[65vh] sm:min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden`}
      style={{
        backgroundImage: `
          radial-gradient(ellipse at center,
            rgba(0,0,0,0) 25%,
            rgba(0,0,0,0.8) 50%,
            rgba(0,0,0,0.9) 100%),
          url('/images/legacy/fire-background.png')
        `,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ zIndex: 5, pointerEvents: "none" }}
      >
        <RadialDots
          count={isMobile ? 0.2 : 0.4}
          maxDistance={3000}
          originY={0.85}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none">
        <Image
          src="/images/legacy/fire.svg"
          alt="fire"
          className="hidden lg:block w-auto translate-x-60"
          width={800}
          height={800}
          priority
          loading="eager"
        />
        <Image
          src="/images/legacy/fire2.svg"
          alt="fire"
          className="block lg:hidden w-auto"
          width={600}
          height={600}
          priority
          loading="eager"
          style={{
            height: "clamp(180px, 52vw, 420px)",
            objectFit: "contain",
            objectPosition: "bottom center",
          }}
        />
      </div>

      <div className="relative z-20 md:py-16 mt-0 md:mt-18 lg:mt-0 sm:py-8 sm:px-2">
        {/* Eyebrow label */}
        <p
          className="text-center tracking-[0.45em] uppercase mb-2 sm:mb-4 eyebrow-text"
          style={{
            color: "#fb923c",
            opacity: 0.85,
            fontSize: "clamp(0.55rem, 1.5vw, 0.85rem)",
            letterSpacing: "0.45em",
          }}
        >
          South India&apos;s Most Coveted Cultural Prize
        </p>

        <div className="flex justify-center gap-8">
          <div
            className="w-auto flex self-start justify-center text-white font-bold -mr-8 left-text"
            style={{ fontSize: "max(10vw, 6rem)", willChange: "filter" }}
          >
            <MorphText
              texts={["RAGAM", "STILL"]}
              morphTime={1.5}
              cooldownTime={1}
            />
          </div>

          <div
            className="w-auto flex self-start -mt-[8%] sm:-mt-[6%] justify-center text-orange-500 font-bold right-text"
            style={{ fontSize: "max(24vw, 12rem)", willChange: "filter" }}
          >
            <MorphText
              texts={["TROPHY", "BURNS"]}
              morphTime={1.5}
              cooldownTime={1}
            />
          </div>
        </div>

        {/* Divider line */}
        <div
          className="mx-auto mt-2 sm:mt-4 divider-line"
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, #fb923c88, transparent)",
            maxWidth: "clamp(160px, 40vw, 480px)",
          }}
        />

        {/* Tagline */}
        <p
          className="text-center mt-3 sm:mt-5 tagline-text px-4"
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "clamp(0.65rem, 1.6vw, 1rem)",
            fontStyle: "italic",
            letterSpacing: "0.05em",
          }}
        >
          Earned through excellence across every stage, every art, every discipline.
        </p>

        <style jsx>{`
          @media (max-width: 400px) {
            .left-text {
              font-size: 3rem !important;
            }
            .right-text {
              font-size: 7rem !important;
            }
            .eyebrow-text {
              font-size: 0.5rem !important;
            }
            .tagline-text {
              font-size: 0.6rem !important;
            }
          }
        `}</style>
      </div>

      <div className="absolute inset-0 z-30 flex items-end justify-center overflow-hidden pointer-events-none">
        <Image
          ref={mobileRef}
          src="/images/legacy/Rajan2.svg"
          alt="character"
          width={500}
          height={800}
          className="block lg:hidden object-cover w-auto max-h-[60vh] sm:max-h-[75vh] md:max-h-[95vh]"
          priority
          loading="eager"
          style={{ willChange: "transform" }}
        />
        <Image
          ref={desktopRef}
          src="/images/legacy/Rajan.svg"
          alt="character"
          width={800}
          height={1200}
          className="hidden lg:block h-full w-auto translate-x-60"
          priority
          loading="eager"
          style={{ willChange: "transform" }}
        />
      </div>

      <div
        ref={linkRef}
        className="absolute z-40 bottom-8 sm:bottom-10 left-0 right-0 p-4 flex flex-col items-center gap-3"
        style={{ willChange: "transform, opacity" }}
      >
        <Link
          href="/ragam-trophy"
          className={`${brixton.className} relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-black font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 active:scale-95`}
          style={{
            background: "linear-gradient(135deg,#fb923c,#fde68a)",
            fontSize: "clamp(0.75rem, 2.2vw, 1.1rem)",
            boxShadow: "0 0 32px 4px rgba(251,146,60,0.45), 0 0 0 1px rgba(251,146,60,0.2)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#7c2d12",
              boxShadow: "0 0 6px 2px rgba(124,45,18,0.6)",
            }}
          />
          Discover the Trophy
          <span style={{ opacity: 0.7, fontSize: "1.1em" }}>→</span>
        </Link>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-32 z-50 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
}
