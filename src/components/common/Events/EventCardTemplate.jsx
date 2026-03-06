import { useState } from "react";

const mandalaPath = `M100,100 m-75,0 a75,75 0 1,0 150,0 a75,75 0 1,0 -150,0`;

function MandalaWatermark() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        right: "-10px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "260px",
        height: "260px",
        opacity: 0.18,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {[...Array(12)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 30}, 100, 100)`}>
          <ellipse cx="100" cy="45" rx="6" ry="20" fill="#8B1A1A" />
          <ellipse cx="100" cy="62" rx="4" ry="13" fill="#8B1A1A" opacity="0.7" />
          <line x1="100" y1="25" x2="100" y2="75" stroke="#8B1A1A" strokeWidth="1" />
        </g>
      ))}
      {[...Array(8)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 45}, 100, 100)`}>
          <ellipse cx="100" cy="30" rx="4" ry="14" fill="#8B1A1A" opacity="0.5" />
        </g>
      ))}
      <circle cx="100" cy="100" r="70" fill="none" stroke="#8B1A1A" strokeWidth="1.2" opacity="0.6" />
      <circle cx="100" cy="100" r="55" fill="none" stroke="#8B1A1A" strokeWidth="0.8" opacity="0.5" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="#8B1A1A" strokeWidth="0.8" opacity="0.4" />
      <circle cx="100" cy="100" r="18" fill="none" stroke="#8B1A1A" strokeWidth="1" opacity="0.6" />
      <circle cx="100" cy="100" r="8" fill="#8B1A1A" opacity="0.4" />
      {[...Array(16)].map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const x = 100 + Math.cos(angle) * 55;
        const y = 100 + Math.sin(angle) * 55;
        return <circle key={i} cx={x} cy={y} r="2.5" fill="#8B1A1A" opacity="0.5" />;
      })}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = 100 + Math.cos(angle) * 40;
        const y = 100 + Math.sin(angle) * 40;
        return <circle key={i} cx={x} cy={y} r="1.8" fill="#8B1A1A" opacity="0.4" />;
      })}
    </svg>
  );
}

export default function EventCard({
  day = 1,
  date = "23",
  month = "MARCH",
  weekday = "Sunday",
  eventName = "Event Name",
  description = "Lorem ipsum dolor sit amet. Atque corruptione sint reprehenderit galilcae et corruptidinisicituros. Eos quia nulla et cius molestisad explandu sis sed voluptatem. Lorem ipsum dolor sit amet. Atque consetetur natus turpis turpine galilcae et corruptidinisicituros. Nec quis nulla ut quae elaboretur explicabo eos sed voluptatem.",
  imageSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bharatanatyam_Performance_2.jpg/640px-Bharatanatyam_Performance_2.jpg",
  imageAlt = "Bharatanatyam dancer",
  onClick,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        display: "flex",
        width: "620px",
        height: "220px",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 8px 32px rgba(139,26,26,0.22), 0 2px 8px rgba(0,0,0,0.10)"
          : "0 4px 18px rgba(139,26,26,0.12), 0 1px 4px rgba(0,0,0,0.07)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        border: "1.5px solid rgba(139,26,26,0.18)",
      }}
      onClick={onClick}
    >
      {/* LEFT PANEL */}
      <div
        style={{
          background: "#F5EDD8",
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px 20px 16px 20px",
          overflow: "hidden",
        }}
      >
        {/* Date */}
        <div style={{ zIndex: 2, position: "relative" }}>
          <div style={{ lineHeight: 1 }}>
            <span
              style={{
                fontSize: "26px",
                fontWeight: "900",
                color: "#5C1010",
                letterSpacing: "-1px",
              }}
            >
              {date}
            </span>{" "}
            <span
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#5C1010",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              {month}
            </span>
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#5C1010",
              letterSpacing: "1.5px",
              marginTop: "1px",
              fontStyle: "italic",
            }}
          >
            {weekday}
          </div>
        </div>

        {/* Mandala Watermark */}
        <MandalaWatermark />

        {/* Event Name + Description */}
        <div style={{ zIndex: 2, position: "relative" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "900",
              color: "#3A0A0A",
              letterSpacing: "-0.5px",
              marginBottom: "6px",
              fontStyle: "italic",
            }}
          >
            {eventName}
          </div>
          <p
            style={{
              fontSize: "9.5px",
              color: "#5C2A0A",
              lineHeight: "1.6",
              margin: 0,
              opacity: 0.85,
              maxWidth: "290px",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* CENTER IMAGE PANEL */}
      <div
        style={{
          width: "175px",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          background: "#1a0a00",
        }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        {/* Mandala overlay on image left edge */}
        <svg
          viewBox="0 0 200 200"
          style={{
            position: "absolute",
            left: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "160px",
            height: "160px",
            opacity: 0.22,
            pointerEvents: "none",
          }}
        >
          {[...Array(12)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 30}, 100, 100)`}>
              <ellipse cx="100" cy="45" rx="6" ry="20" fill="#E8C090" />
            </g>
          ))}
          <circle cx="100" cy="100" r="70" fill="none" stroke="#E8C090" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#E8C090" strokeWidth="1" />
        </svg>
      </div>

      {/* RIGHT SIDEBAR */}
      <div
        style={{
          width: "44px",
          flexShrink: 0,
          background: "#F5EDD8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "14px",
          paddingBottom: "14px",
          borderLeft: "1.5px solid rgba(139,26,26,0.15)",
        }}
      >
        {/* DAY text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0px",
          }}
        >
          {["D", "A", "Y", day].map((char, i) => (
            <span
              key={i}
              style={{
                fontSize: i === 3 ? "17px" : "13px",
                fontWeight: "900",
                color: "#3A0A0A",
                lineHeight: "1.35",
                letterSpacing: i < 3 ? "1px" : "0",
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div
          style={{
            width: "30px",
            height: "30px",
            background: "#5C1010",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 3 L13 13 M13 13 L13 6 M13 13 L6 13"
              stroke="#F5EDD8"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}