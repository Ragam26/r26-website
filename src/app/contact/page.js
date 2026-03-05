"use client";
import React, { useEffect, useState } from "react";

export default function ContactPage() {
  return (
    <main
      className="min-h-screen relative"
      style={{
        backgroundColor: "#000",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/images/contact/contactbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `
      radial-gradient(
        circle at center,
        rgba(0,0,0,0) 20%,
        rgba(0,0,0,0.7) 85%,
        rgba(0,0,0,1) 100%
      )
    `,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 3 }}></div>
    </main>
  );
}
