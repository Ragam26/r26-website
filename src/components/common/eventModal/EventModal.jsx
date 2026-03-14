'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export const EventModal = ({ event = {}, onClose, isOpen }) => {
  const modalRef = useRef(null);

  const {
    title = "FASHION",
    prizesWorth = "Rs. 25,000",
    registrationFee = "Rs. 499",
    eventDate = "21 OCT 2022",
    regDeadline = "15 OCT 2022",
    about = "Potenti felis facilisi feugiat volutpat amet. Elementum sed quisque eget vulputate et neque, cursus tellus. Adipiscing cras pellentesque velit commodo. It dictumst a cras nisi facilisis cursus dolor. Ornare morbi lobortis tristique diam. Adipiscing sed at id sit et, consequat. Ornare diam mattis eu nunc ornare erat. Vehicula ultrices orci, nunc vel. Vestibulum lacus, cursus tellus consectetur nisl lorem ullamcorper non. Arcu ipsum, congue tortor non eget. Fermentum, platea sit mi vulputate et nisl. In ornare habitasse tempus, tempor. Purus in id quisque viverra.",
    contacts = [
      { name: "JOHN DOE", phone: "+91 12345 67890" },
      { name: "JANE DOE", phone: "+91 12345 67890" },
    ],
    brochure = null,
    guidelines = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n4. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n5. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  } = event;

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.dataset.scrollY = scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.dataset.scrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY));
    }
  }, [isOpen]);

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onMouseDown={handleOverlayClick}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "70px 20px 20px",
        fontFamily: "'Trebuchet MS', sans-serif",
      }}
    >
      <div
        ref={modalRef}
        style={{
          background: "#2a0f0a",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "780px",
          maxHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          color: "#e8d5a3",
        }}
      >
        {/* Header — fixed, never scrolls */}
        <div style={{
          background: "#1a0805",
          borderRadius: "12px 12px 0 0",
          padding: "28px 32px 32px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          {/* Mandala decoration */}
          <div style={{
            position: "absolute", top: "-20px", right: "-20px",
            width: "160px", height: "160px",
            opacity: 0.75,
            backgroundImage: `url("/images/events/mandala.png")`,
            backgroundSize: "cover",
          }} />

          {/* Back button */}
          <button onClick={onClose} style={{
            background: "none", border: "none",
            color: "#e8d5a3", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "8px",
            fontSize: "13px", fontWeight: "600",
            letterSpacing: "1px", marginBottom: "16px",
            padding: 0,
          }}>
            <span style={{ fontSize: "18px" }}>←</span> BACK
          </button>

          <h1 style={{
            fontSize: "clamp(40px, 8vw, 64px)",
            fontWeight: "900",
            color: "#fff",
            margin: 0,
            letterSpacing: "2px",
            lineHeight: 1,
            textTransform: "uppercase",
          }}>{title}</h1>
        </div>

        {/* Body — on mobile: single scroll with register first, on desktop: two side-by-side columns */}
        <div
          className="flex flex-col md:flex-row md:overflow-hidden"
          style={{ flex: 1, minHeight: 0, overflowY: "auto" }}
        >

          {/* Left column — main content */}
          <div
            className="flex-1 overflow-y-auto md:border-r md:border-[#4a2a20]"
            style={{ padding: "0 24px 24px" }}
            onWheel={(e) => { e.currentTarget.scrollTop += e.deltaY; }}
          >
            {/* Register card — mobile only, at top of scroll */}
            <Link href={event.regUrl} target="_blank" className="block md:hidden" style={{ paddingTop: "20px" }}>
            <div className="block md:hidden" style={{ paddingTop: "20px" }}>
              <div style={{ background: "#c9a84c", borderRadius: "12px", padding: "20px", textAlign: "left", marginBottom: "4px" }}>
                <button
                  style={{ background: "#2a0f0a", color: "#e8d5a3", border: "none", borderRadius: "6px", padding: "10px 20px", fontWeight: "800", fontSize: "20px", letterSpacing: "1.5px", cursor: "pointer", width: "100%", textTransform: "uppercase" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1a0805"}
                  onMouseLeave={e => e.currentTarget.style.background = "#2a0f0a"}
                >REGISTER NOW</button>
              </div>
            </div>
            </Link>

            {/* Prizes Worth */}
            {prizesWorth && prizesWorth !== "Rs. 0" && (
            <Section label="PRIZES WORTH">
              <p style={{ fontSize: "28px", fontWeight: "700", color: "#e8d5a3", margin: "8px 0 0" }}>
                Rs.{prizesWorth}
              </p>
            </Section>
            )}

            {/* Details */}
            {(eventDate || regDeadline) && (
              <Section label="DETAILS">
                <div style={{ display: "flex", gap: "24px", marginTop: "12px", flexWrap: "wrap" }}>
                  <DetailItem icon="📅" label="EVENT DATE" value={eventDate} />
                  {regDeadline && regDeadline !== "N/A" && (
                    <DetailItem icon="🗓" label="REG. DEADLINE" value={regDeadline} />
                  )}
                </div>
            </Section>
            )}

            {/* About */}
            {about && (
              <Section label="ABOUT">
                <div style={{ marginTop: "12px" }}>
                  {about.split("\n").map((line, i) =>
                    line.trim() === ""
                      ? <br key={i} />
                    : <p key={i} style={{ fontSize: "18px", lineHeight: "1.7", color: "#c4aa7a", margin: "0 0 8px" }}>{line}</p>
                )}
              </div>
            </Section>
            )}

            {/* Guidelines */}
            {guidelines && (
              <Section label="GUIDELINES">
                <div style={{ marginTop: "12px" }}>
                  {guidelines.split("\n").map((line, i) =>
                    line.trim() === ""
                      ? <br key={i} />
                    : <p key={i} style={{ fontSize: "16px", lineHeight: "1.7", color: "#c4aa7a", margin: "0 0 8px" }}>{line}</p>
                )}
              </div>
            </Section>
            )}

            {/* Contacts */}
            {contacts.length > 0 && (
              <Section label="CONTACTS">
                <div style={{ display: "flex", gap: "16px", marginTop: "12px", flexWrap: "wrap" }}>
                  {contacts.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "#c9a84c",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "16px", flexShrink: 0,
                    }}>📞</div>
                    <div>
                      <p style={{ margin: 0, fontSize: "16px", fontWeight: "700", letterSpacing: "1px", color: "#e8d5a3" }}>{c.name}</p>
                      <p style={{ margin: 0, fontSize: "14px", color: "#c4aa7a" }}>{c.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
            )}
          </div>

          {/* Right column — register card (desktop only) */}
          <div
            className="hidden md:block"
            style={{
              width: "204px",
              flexShrink: 0,
              overflowY: "auto",
              padding: "24px 16px",
            }}
            onWheel={(e) => { e.currentTarget.scrollTop += e.deltaY; }}
          >
            <div style={{
              background: "#c9a84c",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "left",
            }}>
              {/* <p style={{
                margin: "0 0 16px",
                fontWeight: "800",
                fontSize: "16px",
                letterSpacing: "1.5px",
                color: "#1a0805",
                textTransform: "uppercase",
              }}>REGISTER</p>

              <div style={{
                background: "#fff",
                borderRadius: "8px",
                padding: "10px 14px",
                display: "inline-block",
                marginBottom: "16px",
              }}>
                <span style={{
                  fontSize: "20px", fontWeight: "800",
                  color: "#2a0f0a",
                }}>{registrationFee}</span>
              </div> */}
              <Link href={event.regUrl} target="_blank">
              <button
                style={{
                  background: "#2a0f0a",
                  color: "#e8d5a3",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  cursor: "pointer",
                  width: "100%",
                  textTransform: "uppercase",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#1a0805"}
                onMouseLeave={e => e.currentTarget.style.background = "#2a0f0a"}
              >
                REGISTER NOW
              </button>
              </Link>
            </div>

            {brochure && (
              <a
                href={brochure}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  marginTop: "12px",
                  textAlign: "center",
                  background: "#fff",
                  color: "#1a0805",
                  borderRadius: "8px",
                  padding: "10px",
                  fontWeight: "700",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Download Brochure
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

const Section = ({ label, children }) => (
  <div style={{ marginTop: "20px" }}>
    <div style={{
      display: "inline-block",
      background: "#1a0805",
      border: "1.5px solid #c9a84c",
      borderRadius: "4px",
      padding: "4px 14px",
      fontSize: "16px",
      fontWeight: "800",
      letterSpacing: "1.5px",
      color: "#e8d5a3",
      textTransform: "uppercase",
    }}>{label}</div>
    <div style={{
      borderBottom: "1px solid #4a2a20",
      paddingBottom: "16px",
    }}>{children}</div>
  </div>
);

const DetailItem = ({ icon, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div style={{
      width: "36px", height: "36px", borderRadius: "50%",
      background: "#c9a84c",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "16px", flexShrink: 0,
    }}>{icon}</div>
    <div>
      <p style={{ margin: 0, fontSize: "14px", fontWeight: "700", letterSpacing: "1px", color: "#8a6a3a", textTransform: "uppercase" }}>{label}</p>
      <p style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#e8d5a3" }}>{value}</p>
    </div>
  </div>
);