"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brixton, playfair } from "@/lib/fonts";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const DOT_COLORS = ["#fde68a", "#fb923c", "#a78bfa", "#60a5fa", "#e5e7eb"];

function SparkCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
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
      const cy = canvas.height * 0.6;
      for (let i = 0; i < 1; i++) {
        dots.push({
          angle: Math.random() * 2 * Math.PI,
          born: now,
          duration: (8 + Math.random() * 4) * 1000,
          size: Math.random() > 0.5 ? 1 : 2,
          color: DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)],
          cx,
          cy,
        });
      }
    }

    function draw(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (now - lastEmit > 35) {
        emit(now);
        lastEmit = now;
      }
      const alive = [];
      for (const d of dots) {
        const t = (now - d.born) / d.duration;
        if (t >= 1) continue;
        alive.push(d);
        ctx.globalAlpha = (1 - t) * 0.8;
        ctx.fillStyle = d.color;
        ctx.fillRect(
          d.cx + Math.cos(d.angle) * 2000 * t,
          d.cy + Math.sin(d.angle) * 2000 * t,
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
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}

const EVENT_CATEGORIES = [
  {
    title: "Dramatics",
    events: ["Street Play", "Spoof", "Mime", "Drama"],
  },
  {
    title: "Kalolsavam – Group",
    events: [
      "Oppana",
      "Duffmuttu",
      "Kolkali",
      "Vattapattu",
      "Sanganritham",
      "Thiruvathira",
      "Nadanpaatt",
    ],
  },
  {
    title: "Kalolsavam – Solo",
    events: [
      "Swararaga",
      "Acoustics",
      "Bharathanatyam",
      "Mohiniyattam",
      "Rajan Memorial Light Music",
      "Classical Music (Solo)",
      "Mono Act",
    ],
  },
  {
    title: "Literary",
    events: [
      "Kavitha Parayanam",
      "Poem Recitation (English & Hindi)",
      "Upanyasam",
      "JAM (Malayalam, Hindi & English)",
      "Katha Rajana",
      "Kavitha Rajana",
    ],
  },
  {
    title: "Music",
    events: [
      "Beat Boxing",
      "Western Solo",
      "Eastern Solo",
      "String Solo",
      "Alfaz",
    ],
  },
  {
    title: "Dance",
    events: ["Tal Se Tal Mila", "Tangled", "Dance Off", "Free Style"],
  },
];

const GUIDELINES = [
  {
    icon: "🏛️",
    title: "CATEGORY PARTICIPATION REQUIREMENT",
    body: "To remain eligible for the Ragam Ever-Rolling Trophy, a college must participate in at least one event from each major category listed in the official Ragam event lineup. This ensures that institutions showcase versatility across diverse cultural disciplines and engage with the full spectrum of the festival’s competitive spirit.",
  },
  {
    icon: "🎭",
    title: "PARTICIPATION POINTS SYSTEM",
    body: "Every valid participation in a Ragam event contributes to the institution’s overall points tally. Colleges accumulate points through active involvement across events, ensuring that each performance and entry strengthens the team’s cumulative standing on the Ragam Trophy leaderboard.",
  },
  {
    icon: "🏆",
    title: "PODIUM PERFORMANCE WEIGHTAGE",
    body: "Outstanding performances receive additional scoring weightage. Podium finishes—First, Second, and Third place—carry significantly higher points compared to regular participation. These results play a crucial role in shaping the final leaderboard and determining the Ragam Trophy champion.",
  },
];

function GuidelineCard({ item, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const el = cardRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        delay: index * 0.1,
      },
    );

    // floating icon animation
    gsap.to(el.querySelector(".icon"), {
      y: -6,
      x: 2,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [index]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * -10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="
      relative
      rounded-2xl
      border border-orange-500/20
      bg-white/3
      backdrop-blur-lg
      p-6
      transition-all
      duration-300
      hover:scale-[1.04]
      hover:border-orange-400/60
      hover:shadow-[0_0_40px_rgba(251,146,60,0.15)]
      group
      overflow-hidden
      flex flex-col items-start justify-center
      "
    >
      {/* glow overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/10 pointer-events-none" />

      {/* icon */}
      <div className="icon text-4xl mb-4 transition-transform duration-300 group-hover:scale-125">
        {item.icon}
      </div>

      {/* title */}
      <h3 className={`${brixton.className} text-orange-300 text-lg mb-3`}>
        {item.title}
      </h3>

      {/* body */}
      <p
        className={`${playfair.className} text-gray-400 text-sm leading-relaxed`}
      >
        {item.body}
      </p>
    </div>
  );
}
function CategoryCard({ category, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const el = cardRef.current;

    // entrance animation
    gsap.fromTo(
      el,
      { opacity: 0, y: 70, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        delay: index * 0.1,
      },
    );

    // floating title effect
    const title = el.querySelector(".cat-title");
    gsap.to(title, {
      y: -4,
      x: 2,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [index]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 8;
    const rotateY = (x / rect.width - 0.5) * -8;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="
      relative
      rounded-2xl
      border border-orange-400/20
      bg-white/3
      backdrop-blur-sm
      p-6
      transition-all
      duration-300
      hover:scale-[1.04]
      hover:border-orange-400/50
      hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]
      overflow-hidden
      group
      "
    >
      {/* glow overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/10 pointer-events-none" />

      {/* title */}
      <h3
        className={`cat-title ${brixton.className} text-orange-400 text-xl mb-4`}
        style={{ textShadow: "0 0 15px rgba(251,146,60,0.4)" }}
      >
        {category.title}
      </h3>

      {/* events */}
      <ul className={`${playfair.className} text-gray-400 text-sm space-y-2`}>
        {category.events.map((event) => (
          <li
            key={event}
            className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300"
          >
            <span className="text-orange-400 group-hover:text-orange-300 transition-colors">
              •
            </span>
            <span>{event}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RagamTrophyPageContent() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef = useRef(null);
  const historyTitleRef = useRef(null);
  const guidelineTitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0, filter: "blur(20px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          delay: 0.2,
        },
      );
      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.7 },
      );
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 1.1,
          transformOrigin: "left",
        },
      );

      // Section titles
      [historyTitleRef, guidelineTitleRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={heroRef}
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(251,146,60,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 100%, rgba(251,146,60,0.05) 0%, transparent 50%)
        `,
      }}
    >
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <SparkCanvas />

        {/* Back link */}
        <div className="absolute top-24 left-6 z-20">
          <Link
            href="/"
            className={`${brixton.className} text-orange-400 text-sm tracking-widest uppercase hover:text-orange-300 transition-colors flex items-center gap-2`}
          >
            <span>←</span> Back to Home
          </Link>
        </div>

        {/* Glowing orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <p
            className={`${brixton.className} text-orange-400 tracking-[0.5em] text-xs md:text-sm uppercase mb-6 opacity-80`}
          >
            South India&apos;s Most Coveted Cultural Prize
          </p>

          <h1
            ref={titleRef}
            className={`${brixton.className} text-white leading-none mb-6`}
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              textShadow: "0 0 80px rgba(251,146,60,0.4)",
            }}
          >
            RAGAM
            <br />
            <span
              style={{
                WebkitTextStroke: "2px #fb923c",
                color: "transparent",
                textShadow: "none",
              }}
            >
              TROPHY
            </span>
          </h1>

          <div
            ref={dividerRef}
            className="h-px w-full bg-linear-to-r from-transparent via-orange-400 to-transparent mb-6"
          />

          <p
            ref={subtitleRef}
            className={`${playfair.className} text-gray-300 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed italic`}
          >
            The Ultimate Testament to Cultural Spirit
          </p>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <AboutSection />
      </section>

      {/* ── GUIDELINES SECTION ── */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <h2
          ref={guidelineTitleRef}
          className={`${brixton.className} text-center text-white text-4xl md:text-6xl mb-4`}
          style={{ textShadow: "0 0 40px rgba(251,146,60,0.4)" }}
        >
          HOW TO
          <span className="text-orange-400"> WIN IT</span>
        </h2>
        <p
          className={`${playfair.className} text-gray-500 text-center italic mb-16`}
        >
          The rules, scoring system, and everything you need to claim the trophy
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDELINES.map((item, i) => (
            <GuidelineCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>
      {/* EVENT CATEGORIES */}
      <div className="mt-20 flex flex-col justify-center items-center  ">
        <h3
          className={`${brixton.className} text-center text-white text-3xl md:text-4xl mb-6`}
        >
          EVENT
          <span className="text-orange-400"> CATEGORIES</span>
        </h3>

        <p
          className={`${playfair.className} text-gray-500 text-center italic mb-12 max-w-2xl mx-auto`}
        >
          The Ragam Ever-Rolling Trophy spans a wide spectrum of cultural
          expression, from classical traditions to contemporary performance and
          literary excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_CATEGORIES.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <BottomCTA />
    </main>
  );
}

function AboutSection() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      },
    );
  }, []);

  return (
    <div ref={ref}>
      <div className="inline-block px-5 py-2 rounded-full border border-orange-400/30 bg-orange-400/5 mb-10">
        <span
          className={`${brixton.className} text-orange-400 text-xs tracking-[0.4em]`}
        >
          Ragam Ever-Rolling Trophy
        </span>
      </div>
      <p
        className={`${playfair.className} text-gray-300 text-lg md:text-xl leading-relaxed mb-8`}
      >
        After a long-awaited hiatus, the{" "}
        <span className="text-orange-400 font-semibold">
          Ragam Ever-Rolling Trophy
        </span>{" "}
        returns—reimagined not merely as an award for numerical dominance, but
        as a celebration of the Cultural Spirit that defines Ragam. It honours
        colleges that bring sustained energy, diversity of expression, and
        collective talent to the festival, transforming participation into
        presence and performance into legacy.
      </p>
      <p
        className={`${playfair.className} text-gray-400 text-base md:text-lg leading-relaxed`}
      >
        What sets the Ever-Rolling Trophy apart is its emphasis on breadth over
        isolation, and continuity over momentary triumph. It recognises
        institutions that move in harmony with Ragam’s many forms, embodying
        balance, collaboration, and depth across the festival.
      </p>
    </div>
  );
}

function BottomCTA() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      },
    );
  }, []);

  return (
    <section className="py-32 px-4 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(251,146,60,0.08) 0%, transparent 70%)",
        }}
      />
      <div ref={ref} className="relative z-10 max-w-2xl mx-auto">
        <h2
          className={`${brixton.className} text-white text-3xl md:text-5xl mb-6`}
          style={{ textShadow: "0 0 40px rgba(251,146,60,0.3)" }}
        >
          WILL YOUR COLLEGE
          <br />
          <span className="text-orange-400">CLAIM IT IN 2026?</span>
        </h2>
        <p
          className={`${playfair.className} text-gray-400 italic  text-lg`}
        >
          To vie for the Ever-Rolling Trophy is to become part of a legacy that
          defines Ragam itself. Beyond competition, it is an expression of
          collective pride—where individual excellence converges to represent an
          institution’s spirit on South India’s grandest cultural stage.
        </p>
        <p
          className={`${playfair.className} text-gray-100 italic text-lg`}
        >
          The stage is set.
        </p>
        <p
          className={`${playfair.className} text-gray-100 italic text-lg`}
        >
          The stakes are historic.
        </p>
        <p
          className={`${playfair.className} text-gray-100 italic mb-10 text-lg`}
        >
          The legacy is yours for the taking.
        </p>
        <Link
          href="/events"
          className={`${brixton.className} inline-block px-10 py-4 rounded-full text-black font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_8px_rgba(251,146,60,0.5)]`}
          style={{ background: "linear-gradient(135deg,#fb923c,#fde68a)" }}
        >
          Explore Events
        </Link>
      </div>
    </section>
  );
}
