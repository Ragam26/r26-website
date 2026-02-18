"use client";
import React, { useEffect, useState } from "react";

function Eyes({ width, top, aspectRatio, leftVal, pupilX, pupilY }) {
  return (
    <img
      className="absolute z-20"
      src="/images/polaroid_page/eyes.png"
      style={{
        width,
        top,
        left: leftVal,
        aspectRatio,
        transform: `translate(${pupilX}px, ${pupilY}px)`,
      }}
    />
  );
}

function KathakaliEyes() {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 400;
      const y = (e.clientY - window.innerHeight / 2) / 400;
      setPupilPos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex items-center justify-center h-full overflow-hidden">
      <div className="relative h-full">
        <img
          src="/images/polaroid_page/face.svg"
          alt="Kathakali Face"
          className="h-full object-cover border-3 border-[#F4EFCF] pointer-events-none"
        />

        <Eyes
          width="7.5%"
          top="55%"
          aspectRatio={1}
          leftVal="28.7%"
          pupilX={pupilPos.x}
          pupilY={pupilPos.y}
        />

        <Eyes
          width="7.5%"
          top="56%"
          aspectRatio={1}
          leftVal="64%"
          pupilX={pupilPos.x}
          pupilY={pupilPos.y}
        />
      </div>
    </div>
  );
}

export default KathakaliEyes;
