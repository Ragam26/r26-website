import React, { useState } from "react";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function TeamMemberCard({ name, image, hoverImage, position, linkedin, github }) {
  const [imgError, setImgError] = useState(false);
  const displayName = name && name.toString().trim() ? name : "Name";
  const displayPosition = position && position.toString().trim() ? position : null;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: "url('/images/meetheteam/cardBg.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        borderRadius: 2,
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* Square photo area */}
      <div
        style={{
          width: "100%",
          position: "relative",
          flexShrink: 0,
          padding: 8,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsHovered(true);
          setTimeout(() => setIsHovered(false), 1000);
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            position: "relative",
            overflow: "hidden",
            borderRadius: 6,
          }}
        >
          {image && !imgError ? (
            <Image
              src={hoverImage && isHovered ? hoverImage : image}
              alt={displayName}
              fill
              style={{ objectFit: "cover" }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#000000",
                borderRadius: 2,
              }}
            />
          )}
        </div>
      </div>

      {/* Name and position area */}
      <div
        style={{
          background: "transparent",
          padding: "0.5rem 1rem 1.1rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: 1000,
            fontSize: "2rem",
            color: "#6b0000",
            letterSpacing: "0.03em",
            fontFamily: '"Anton", sans-serif',
          }}
        >
          {displayName}
        </p>

        {displayPosition && (
          <p
            style={{
              margin: "0.25rem 0 0",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#6b0000",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: '"Anton", sans-serif',
            }}
          >
            {displayPosition}
          </p>
        )}

        {(linkedin || github) && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "0.5rem",
            }}
          >
            {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#6b0000',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.65rem',
              }}
            >
              <FaGithub />
            </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#6b0000',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1.65rem',
                }}
              >
                <FaLinkedinIn />
              </a>
          )}
          
        </div>
        )}
      </div>
    </div>
  );
}