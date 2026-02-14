/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";

function KathakaliEyes() {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  // Refs to track the eyes
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // We calculate rotation based on the center of the screen
      // or the specific eye position for more accuracy.
      // Here is a simple "Look at Cursor" logic:

      const x = (e.clientX - window.innerWidth / 2) / 400; // Divide by 30 to limit movement distance
      const y = (e.clientY - window.innerHeight / 2) / 400;

      setPupilPos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-auto h-full bg-black overflow-hidden">
      {/* Container for the Face */}
      <div className="relative w-auto h-full">
        {/* 1. THE FACE IMAGE (Main Layer) */}
        {/* Ideally, use an image where the pupils are erased/white */}
        <img
          src="/assets/images/polaroid_page/face.svg" // Replace with your image path
          alt="Kathakali Face"
          className="relative w-auto h-full object-cover border border-[#F4EFCF] z-10 pointer-events-none"
        />

        {/* 2. THE MOVING PUPILS (Overlay Layer) */}
        {/* We position absolute divs exactly where the eyes are. */}

        {/* LEFT EYE */}
        <img
          className="absolute z-20 bg-black rounded-full"
          src={"/assets/images/polaroid_page/eyes.png"}
          style={{
            width: "7.5%", // Adjust size to match image eyes
            height: "auto",
            top: "55%",
            aspectRatio: 1 / 1, // Adjust these % until it sits perfectly on the left eye
            left: "28.7%",
            transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
          }}
        />

        {/* RIGHT EYE */}
        <img
          className="absolute z-20 bg-black rounded-full"
          src={"/assets/images/polaroid_page/eyes.png"}
          style={{
            width: "7.5%", // Adjust size
            height: "auto",
            top: "56%", // Adjust these % until it sits perfectly on the right eye
            aspectRatio: 1 / 1, // Adjust these % until it sits perfectly on the left eye
            left: "64%",
            transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
          }}
        />
      </div>
    </div>
  );
}

export default KathakaliEyes;
