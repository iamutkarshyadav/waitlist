"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SpotlightCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop to save performance/battery on mobile
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      // Move the large spotlight with a slight delay
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power2.out",
      });
      // Move the small dot instantly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      {/* Large Spotlight Glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 shadow-[0_0_200px_80px_rgba(57,255,20,0.15)] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen hidden md:block"
        style={{ width: "20px", height: "20px" }} // Invisible center, just carries shadow
      />
      {/* Small Dot */}
      <div 
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-[--accent-primary] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
    </>
  );
}
