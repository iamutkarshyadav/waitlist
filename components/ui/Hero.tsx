"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();

      // Text Reveal
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Scramble Effect for "Invisible"
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
      const targetText = "Invisible.";
      const scrambleText = () => {
        if (!scrambleRef.current) return;
        let iterations = 0;
        const interval = setInterval(() => {
          scrambleRef.current!.innerText = targetText
            .split("")
            .map((letter, index) => {
              if (index < iterations) {
                return targetText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
          
          if (iterations >= targetText.length) {
            clearInterval(interval);
          }
          iterations += 1 / 3;
        }, 30);
      };
      
      // Trigger scramble after a slight delay
      setTimeout(scrambleText, 800);

      // Visual Reveal (Animate the container)
      tl.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
        "-=0.5"
      );

      // Scroll Parallax for Visual (Container only)
      gsap.to(visualRef.current, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(tiltRef.current, {
      rotationY: x * 20,
      rotationX: -y * 20,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    if (!tiltRef.current) return;
    gsap.to(tiltRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 0.8,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 md:pt-20 md:pb-0 z-0"
    >
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Glow Center */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.08)_0%,transparent_50%)] blur-[100px]" />

      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Text Content */}
        <div ref={textRef} className="max-w-5xl mx-auto mb-12 md:mb-16 z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[--accent-primary] mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--accent-primary] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[--accent-primary]"></span>
            </span>
            SYSTEM ONLINE V2.0
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 md:mb-8 leading-[0.9]">
            Your resume isn’t bad. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--color-accent-primary] via-white to-[--color-accent-secondary] glow-text">
               It’s <span ref={scrambleRef} className="font-mono">Invisible.</span>
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-[--color-muted-foreground] max-w-2xl mx-auto leading-relaxed px-4 mb-4">
            Legacy ATS systems reject 75% of qualified candidates.
          </p>
          <div className="flex items-center justify-center gap-2 text-[--color-muted-foreground]/60 text-sm md:text-base">
            <MoveRight className="w-4 h-4" />
            <span>Scroll to decode the system</span>
            <MoveRight className="w-4 h-4" />
          </div>
        </div>

        {/* 3D Visual Element Container */}
        <div
          ref={visualRef}
          className="relative w-[300px] h-[400px] md:w-[600px] md:h-[400px] mx-auto z-10 perspective-1000"
        >
           {/* Inner Tilt Element */}
           <div ref={tiltRef} className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                {/* Main Card */}
                <div className="absolute inset-0 bg-[#0B0D10]/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
                    
                    {/* Header UI */}
                    <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <div className="ml-auto w-24 h-4 rounded-full bg-white/10" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 relative">
                        {/* Resume Skeleton */}
                        <div className="space-y-4 opacity-30 blur-[1px]">
                            <div className="h-8 w-1/3 bg-white/20 rounded-md" />
                            <div className="flex gap-4">
                                <div className="h-32 w-1/4 bg-white/10 rounded-md" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-full bg-white/10 rounded" />
                                    <div className="h-4 w-5/6 bg-white/10 rounded" />
                                    <div className="h-4 w-4/6 bg-white/10 rounded" />
                                </div>
                            </div>
                            <div className="h-40 w-full bg-white/5 rounded-md" />
                        </div>

                        {/* Scanning overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[--accent-primary]/10 to-transparent h-[20%] w-full animate-[scan_3s_ease-in-out_infinite] border-b border-[--accent-primary]/50 shadow-[0_0_20px_rgba(57,255,20,0.3)] pointer-events-none" />
                        
                        {/* Floating Analysis Badges (3D elements) */}
                        <div className="absolute top-1/4 -right-12 bg-[#0B0D10] border border-[--accent-primary] p-3 rounded-lg shadow-[0_0_30px_rgba(57,255,20,0.2)] transform translate-z-20 animate-pulse">
                            <div className="text-[--accent-primary] text-xs font-mono font-bold">MATCH: 98%</div>
                        </div>

                        <div className="absolute bottom-1/3 -left-8 bg-[#0B0D10] border border-red-500/50 p-3 rounded-lg shadow-lg transform translate-z-10">
                            <div className="text-red-400 text-xs font-mono font-bold flex items-center gap-2">
                                <span>⚠ KEYWORD MISSING</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Background Glow Behind Card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[--accent-primary] opacity-5 blur-[80px] -z-10 pointer-events-none transform translate-z-[-50px]" />
           </div>
        </div>
      </div>
    </section>
  );
}

