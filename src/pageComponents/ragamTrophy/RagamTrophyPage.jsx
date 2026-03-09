"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brixton, playfair } from "@/lib/fonts";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const DOT_COLORS = ["#fef08a", "#fde68a", "#fdba74", "#fb923c", "#f97316"];

function SparkCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = containerRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    let dots = [], lastEmit = 0, rafId;

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
          cx, cy,
        });
      }
    }

    function draw(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (now - lastEmit > 35) { emit(now); lastEmit = now; }
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
          d.size, d.size,
        );
      }
      dots = alive;
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
    </div>
  );
}

const HISTORY = [
  {
    year: "1978",
    winner: "NIT Calicut",
    caption: "The very first Ragam Trophy was awarded in the inaugural edition — a fierce three-day battle of wit, art, and athleticism.",
  },
  {
    year: "1985",
    winner: "IIT Madras",
    caption: "A legendary comeback — IIT Madras snatched the trophy on the final night with a jaw-dropping classical dance performance.",
  },
  {
    year: "1993",
    winner: "College of Engineering, Trivandrum",
    caption: "CET swept every major category — from literary arts to fine arts — making it the most dominant Ragam Trophy run ever recorded.",
  },
  {
    year: "2001",
    winner: "NIT Calicut",
    caption: "NIT Calicut reclaimed glory after a 12-year drought. The crowd's roar when the results were announced shook the auditorium.",
  },
  {
    year: "2010",
    winner: "PSG College of Technology",
    caption: "PSG's inter-collegiate literary team was unstoppable — they won 11 of 14 literary events, setting a record that still stands.",
  },
  {
    year: "2018",
    winner: "IIT Palakkad",
    caption: "The newest entrant IIT Palakkad stunned all with a flawless street play and a dominating music programme lineup.",
  },
  {
    year: "2023",
    winner: "NIT Calicut",
    caption: "NIT Calicut cemented their dynasty with a comprehensive victory — their third trophy in the 21st century.",
  },
  {
    year: "2025",
    winner: "IIT Madras",
    caption: "A razor-thin margin decided it — IIT Madras edged NIT Calicut by 40 points in the most competitive Ragam in recent history.",
  },
];

const GUIDELINES = [
  {
    icon: "🏛️",
    title: "Eligible Institutions",
    body: "Any degree-granting institution with a valid affiliation letter may field a team. Participants must be currently enrolled students with a valid ID card.",
  },
  {
    icon: "🎭",
    title: "Points Across Categories",
    body: "Points are accumulated across Cultural, Literary, Fine Arts, Music, Dance, and Sports categories. Each event carries weighted points based on difficulty and participation tier.",
  },
  {
    icon: "🏆",
    title: "How Winners Are Decided",
    body: "The institution with the highest cumulative points at the close of all events wins the Ragam Trophy. In the event of a tie, the institution with more first-place finishes is declared the winner.",
  },
  {
    icon: "📋",
    title: "Team Registration",
    body: "A minimum contingent of 25 participants is required. Teams must pre-register at least 30 days before the fest. Late entries are subject to availability and incur a 10% point penalty.",
  },
  {
    icon: "⚖️",
    title: "Code of Conduct",
    body: "Any form of misconduct, plagiarism, or unsportsmanlike behaviour results in immediate disqualification from that event and a 50-point deduction from the team's total.",
  },
  {
    icon: "🎯",
    title: "Pro-Shows & Special Events",
    body: "Pro-shows and celebrity performances do not contribute to trophy points. However, the Trophy Night Gala performance carries a special 200-point bonus.",
  },
];

function HistoryCard({ entry, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: index % 2 === 0 ? -80 : 80, y: 30 },
      {
        opacity: 1, x: 0, y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col md:flex-row items-start gap-6 md:gap-10 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Year bubble */}
      <div className="shrink-0 flex flex-col items-center">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-black font-bold text-sm border-4 border-orange-400 shadow-[0_0_24px_4px_rgba(251,146,60,0.5)]`}
          style={{ background: "linear-gradient(135deg,#fb923c,#fde68a)" }}
        >
          <span className={`${brixton.className} text-xs leading-tight text-center`}>{entry.year}</span>
        </div>
        <div className="w-0.5 h-full min-h-12 bg-linear-to-b from-orange-400/60 to-transparent mt-2" />
      </div>

      {/* Card */}
      <div
        className="flex-1 rounded-2xl border border-orange-400/20 bg-white/3 backdrop-blur-sm p-6 md:p-8 hover:border-orange-400/50 transition-all duration-300 hover:shadow-[0_0_32px_4px_rgba(251,146,60,0.15)]"
      >
        <p className="text-orange-400 text-xs tracking-[0.3em] uppercase mb-2 font-semibold">Winner</p>
        <h3 className={`${brixton.className} text-white text-xl md:text-2xl mb-3`}>{entry.winner}</h3>
        <p className={`${playfair.className} text-gray-400 text-sm md:text-base leading-relaxed italic`}>
          &ldquo;{entry.caption}&rdquo;
        </p>
      </div>
    </div>
  );
}

function GuidelineCard({ item, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          once: true,
        },
        delay: (index % 3) * 0.12,
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-orange-500/20 bg-white/3 p-6 hover:bg-white/6 hover:border-orange-400/50 transition-all duration-300 hover:shadow-[0_0_24px_2px_rgba(251,146,60,0.1)] group"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
      <h3 className={`${brixton.className} text-orange-300 text-lg mb-3`}>{item.title}</h3>
      <p className={`${playfair.className} text-gray-400 text-sm leading-relaxed`}>{item.body}</p>
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
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.7 }
      );
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.out", delay: 1.1, transformOrigin: "left" }
      );

      // Section titles
      [historyTitleRef, guidelineTitleRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 80%", once: true }
          }
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
            background: "radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 70%)",
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
            style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", textShadow: "0 0 80px rgba(251,146,60,0.4)" }}
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

          <div ref={dividerRef} className="h-px w-full bg-linear-to-r from-transparent via-orange-400 to-transparent mb-6" />

          <p
            ref={subtitleRef}
            className={`${playfair.className} text-gray-300 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed italic`}
          >
            A legacy forged in passion, discipline, and the relentless pursuit of cultural excellence — earned, never given.
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-linear-to-b from-orange-400 to-transparent" />
          <span className={`${brixton.className} text-orange-400/60 text-xs tracking-widest`}>SCROLL</span>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <AboutSection />
      </section>

      {/* ── HISTORY SECTION ── */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <h2
          ref={historyTitleRef}
          className={`${brixton.className} text-center text-white text-4xl md:text-6xl mb-4`}
          style={{ textShadow: "0 0 40px rgba(251,146,60,0.4)" }}
        >
          HALL OF
          <span className="text-orange-400"> CHAMPIONS</span>
        </h2>
        <p className={`${playfair.className} text-gray-500 text-center italic mb-16`}>
          Past winners who wrote their names in Ragam history
        </p>

        <div className="flex flex-col gap-12">
          {HISTORY.map((entry, i) => (
            <HistoryCard key={entry.year} entry={entry} index={i} />
          ))}
        </div>
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
        <p className={`${playfair.className} text-gray-500 text-center italic mb-16`}>
          The rules, scoring system, and everything you need to claim the trophy
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDELINES.map((item, i) => (
            <GuidelineCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>

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
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true }
      }
    );
  }, []);

  return (
    <div ref={ref}>
      <div
        className="inline-block px-5 py-2 rounded-full border border-orange-400/30 bg-orange-400/5 mb-10"
      >
        <span className={`${brixton.className} text-orange-400 text-xs tracking-[0.4em]`}>SINCE 1978</span>
      </div>
      <p className={`${playfair.className} text-gray-300 text-lg md:text-xl leading-relaxed mb-8`}>
        The <span className="text-orange-400 font-semibold">Ragam Trophy</span> is the most prestigious inter-collegiate award in South India&apos;s cultural circuit. Instituted at the very first edition of Ragam in 1978, it recognises the institution that collectively excels across every pillar of the fest — arts, literature, music, dance, dramatics, and sports.
      </p>
      <p className={`${playfair.className} text-gray-400 text-base md:text-lg leading-relaxed`}>
        Unlike trophies that celebrate a single event, the Ragam Trophy demands consistent brilliance across days of competition. Institutions send their finest minds and greatest performers — and only the best, across all disciplines, earns the right to hoist the golden flame.
      </p>

      {/* Stats row */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: "48", label: "Years of Legacy" },
          { value: "120+", label: "Competing Colleges" },
          { value: "300+", label: "Events Across Days" },
          { value: "∞", label: "Glory on the Line" },
        ].map((stat) => (
          <StatPill key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}

function StatPill({ value, label }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true }
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center p-6 rounded-2xl border border-orange-400/20 bg-white/3 hover:border-orange-400/50 transition-colors duration-300"
    >
      <span
        className={`${brixton.className} text-orange-400 text-3xl md:text-4xl mb-2`}
        style={{ textShadow: "0 0 20px rgba(251,146,60,0.6)" }}
      >
        {value}
      </span>
      <span className={`${playfair.className} text-gray-500 text-xs tracking-widest uppercase`}>{label}</span>
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
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true }
      }
    );
  }, []);

  return (
    <section className="py-32 px-4 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(251,146,60,0.08) 0%, transparent 70%)",
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
        <p className={`${playfair.className} text-gray-400 italic mb-10 text-lg`}>
          Register your contingent and begin your journey to the most prized trophy in South Indian cultural history.
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
