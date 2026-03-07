import React, { useState } from "react";
import Image from "next/image";

export default function TeamMemberCard({ name, image }) {
  const [imgError, setImgError] = useState(false);
  const displayName = name && name.toString().trim() ? name : "Name";

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 0,
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
          padding: 12,
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {image && !imgError ? (
            <Image
              src={image}
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
              }}
            />
          )}
        </div>
      </div>

      {/* Name area only */}
      <div
        style={{
          background: "#ffffff",
          padding: "0.9rem 1rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: "1rem",
            color: "#6b0000",
            letterSpacing: "0.03em",
            fontFamily: '"Anton", sans-serif',
          }}
        >
          {displayName}
        </p>
      </div>
    </div>
  );
}
