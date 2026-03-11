"use client";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import {
  CalendarDays,
  Phone,
  Users,
  LayoutList,
  Trophy,
  Scale,
  Copy,
  Check,
} from "lucide-react";
import Image from "next/image";
import { alata, ibmPlexMono, archivo, neuemachina } from "@/lib/fonts";

const policyButtons = [
  { label: "BROCHURE", href: null },
  { label: "GUIDELINES", href: null },
  { label: "ACCOMMODATION", href: null },
  { label: "EQUITY POLICY", href: null },
  { label: "TAB POLICY", href: null },
  { label: "SCHEDULE", href: null },
];

const details = [
  { type: "EVENT DATES", value: "27–28 MARCH 2026", icon: CalendarDays },
  { type: "REG DEADLINE", value: "17 MARCH 2026", icon: CalendarDays },
  { type: "TEAM CAP", value: "16 TEAMS", icon: Users },
  { type: "FORMAT", value: "4 PRELIMS + SEMIS + FINAL", icon: LayoutList },
  { type: "BREAK", value: "TOP 4 TO SEMIFINALS", icon: Trophy },
  { type: "ADJ POLICY", value: "N=N+1", icon: Scale },
];

const contacts = [
  { name: "RAHAN", phone: "+91 91885 90540" },
  { name: "KUMAYL", phone: "+91 72639 27374" },
];

const INSTAGRAM_URL = "https://www.instagram.com/donttellthewarden/";

function SectionHeading({ children }) {
  return (
    <div className="flex items-end w-full mb-4">
      <div className="inline-block bg-[#BA9B64] rounded-4xl rounded-br-none px-8 py-2 shrink-0">
        <h2
          className={`${ibmPlexMono.className} text-white text-sm md:text-base font-bold tracking-normal uppercase`}
        >
          {children}
        </h2>
      </div>
      <div className="flex-1 h-1 bg-[#BA9B64]" />
    </div>
  );
}

function IconCircle({ children }) {
  return (
    <div className="w-12 h-12 rounded-full bg-[#C5963A]/20 border border-[#C5963A] flex items-center justify-center shrink-0">
      {children}
    </div>
  );
}

function ContactCard({ contact }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    try {
      await navigator.clipboard.writeText(contact.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="flex items-center gap-4">
      <IconCircle>
        <Phone className="w-5 h-5 text-[#BA9B64]" />
      </IconCircle>
      <div className="w-full">
        <p className="text-white/50 text-xs tracking-[0.15em] uppercase">
          {contact.name}
        </p>
        <div className="h-px bg-[#C5963A]/90 w-[80%] my-1" />
        <button
          onClick={handleClick}
          className="flex items-center gap-2 group cursor-pointer"
        >
          {revealed ? (
            <>
              <span className="text-white text-sm font-semibold tracking-wide">
                {contact.phone}
              </span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80 transition-colors" />
              )}
            </>
          ) : (
            <span className="text-white/40 text-sm italic hover:text-white/70 transition-colors">
              Click to reveal
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

const GAVEL_CONFIG = {
  //  wrapper height
  wrapperHeight: 84, // px
  // scale
  gavelScale: 0.9,
  baseScale: 0.45,
  // offsets
  gavelOffsetX: 8, // px
  gavelOffsetY: -35, // px
  baseOffsetX: 0, // px
  baseOffsetY: -30, // px
  // animation
  animDurationMs: 600, // total animation time before redirect
  redirectUrl: "https://makemypass.com/event/sahitiparliamentarydebate",
};

const GavelAnimation = forwardRef(function GavelAnimation(
  { onAnimationEnd },
  ref,
) {
  const {
    wrapperHeight,
    gavelScale,
    baseScale,
    gavelOffsetX,
    gavelOffsetY,
    baseOffsetX,
    baseOffsetY,
    animDurationMs,
  } = GAVEL_CONFIG;

  const [striking, setStriking] = useState(false);

  const strike = () => {
    if (striking) return;
    setStriking(true);
    setTimeout(() => {
      setStriking(false);
      onAnimationEnd?.();
    }, animDurationMs);
  };

  // expose strike() to parent via ref
  useImperativeHandle(ref, () => ({ strike }));

  return (
    <div
      className="relative flex items-end justify-center cursor-pointer select-none"
      style={{ height: wrapperHeight }}
      onClick={strike}
    >
      {/* gavel */}
      <div
        className="absolute z-10"
        style={{
          right: `calc(50% - ${gavelOffsetX}px)`,
          bottom: gavelOffsetY,
          transformOrigin: "80% 90%",
          transition: striking
            ? `transform ${animDurationMs * 0.35}ms cubic-bezier(.6,0,.4,1)`
            : `transform ${animDurationMs * 0.45}ms cubic-bezier(.2,.8,.3,1)`,
          transform: striking
            ? `scale(${gavelScale}) rotate(65deg)`
            : `scale(${gavelScale}) rotate(0deg)`,
        }}
      >
        <Image
          src="/images/debate/gavel.png"
          alt="Gavel"
          width={200}
          height={200}
          className="object-contain"
          draggable={false}
        />
      </div>

      {/* base */}
      <div
        className="absolute z-0"
        style={{
          left: `calc(50% + ${baseOffsetX}px)`,
          bottom: baseOffsetY,
          transform: `scale(${baseScale}) translateX(-50%)`,
          transformOrigin: "center bottom",
        }}
      >
        <Image
          src="/images/debate/base.png"
          alt="Base"
          width={200}
          height={200}
          className="object-contain"
          draggable={false}
        />
      </div>

      {/*  falsh thing for impavt */}
      {striking && (
        <span
          className="absolute z-20 rounded-full bg-white/40 animate-ping"
          style={{
            width: 18,
            height: 18,
            bottom: baseOffsetY + 10,
            left: "50%",
            marginLeft: -9,
          }}
        />
      )}
    </div>
  );
});

function RegisterCard() {
  const gavelRef = useRef(null);
  const [animating, setAnimating] = useState(false);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (animating) return;
    setAnimating(true);
    // call strike() directly via the exposed ref
    gavelRef.current?.strike();
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
    const url = GAVEL_CONFIG.redirectUrl;
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-[#BA9B64] rounded-xl p-6 md:p-8 md:px-2 flex flex-col gap-3 w-full lg:w-85 shrink-0">
      <h2
        className={`${archivo.className} text-white text-2xl md:text-3xl  font-bold tracking-wide uppercase`}
      >
        REGISTER
      </h2>
      <div className="h-px bg-[#560C00] w-[80%]" />

      <div className="inline-flex self-start bg-white rounded-full px-4 py-2 pt-4">
        <span
          className={`${neuemachina.className} text-[#560C00] text-2xl md:text-xl font-bold`}
        >
          Rs. 1400 per person
        </span>
      </div>

      {/* gavel and base naimation */}
      <GavelAnimation ref={gavelRef} onAnimationEnd={handleAnimationEnd} />

      <button
        onClick={handleRegisterClick}
        disabled={animating}
        className={`${ibmPlexMono.className} relative overflow-hidden bg-[#560C00] rounded-full px-4 py-3 text-white/80 text-md uppercase text-center group cursor-pointer disabled:opacity-60`}
      >
        <span className="relative z-10">{animating ? "..." : "REGISTER"}</span>
      </button>
    </div>
  );
}

export default function DetailsSection() {
  return (
    <section className="relative w-full py-12 md:py-20 px-4 md:px-12 lg:px-26">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Mobile: Register card on top */}
        <div className="block lg:hidden">
          <RegisterCard />
        </div>

        {/* Left column */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <SectionHeading>TOURNAMENT INFO</SectionHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {policyButtons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href || "#"}
                  target={btn.href ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`${ibmPlexMono.className} relative overflow-hidden border border-[#C5963A]/50 rounded-full px-4 py-3 text-white/80 text-sm uppercase text-center group`}
                >
                  <span className="absolute inset-0 bg-[#BA9B64] -translate-x-full group-hover:translate-x-0 transition-transform duration-800 ease-in-out" />
                  <span className="relative z-10">{btn.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <SectionHeading>DETAILS</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {details.map((d, i) => {
                const Icon = d.icon;

                return (
                  <div key={i} className="flex items-center gap-4">
                    <IconCircle>
                      <Icon className="w-5 h-5 text-[#BA9B64]" />
                    </IconCircle>
                    <div className="w-full">
                      <p className="text-white/50 text-xs tracking-[0.15em] uppercase">
                        {d.type}
                      </p>
                      <div className="h-px bg-[#C5963A]/90 w-[80%] my-1" />
                      <p className="text-white text-sm font-semibold tracking-wide">
                        {d.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* About */}
          <div>
            <SectionHeading>ABOUT</SectionHeading>
            <p
              className={`${alata.className} text-white/60 text-sm leading-relaxed mt-2`}
            >
              Introducing the debut edition of Sahiti, the premier Asian
              Parliamentary Debate at Ragam &apos;26. Organized in collaboration
              with{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300 underline underline-offset-2"
              >
                The Literary and Debating Club
              </a>
              , this event marks a new chapter in our legacy, bringing the
              high-stakes Asian Parliamentary Debate format to NIT Calicut for
              the very first time. Sahiti is a sophisticated arena where logic
              meets persuasion, challenging the region&apos;s sharpest minds to
              tackle complex global issues with clinical precision and
              rapid-fire wit.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <SectionHeading>CONTACTS</SectionHeading>
            <div className="w-full h-px bg-[#C5963A]/30 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {contacts.map((c, i) => (
                <ContactCard key={i} contact={c} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Register card on right */}
        <div className="hidden lg:block pt-2 pb-44">
          <div className="top-24 sticky">
            <RegisterCard />
          </div>
        </div>
      </div>
    </section>
  );
}
