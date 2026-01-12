"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      ).fromTo(
        visualRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.5"
      );

      // Scroll Parallax
      gsap.to(visualRef.current, {
        y: 50, // Reduced from 100 to prevent overlap
        scale: 0.9,
        opacity: 0, // Fade out completely
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 30%", // Finish animation earlier
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 md:pt-20 md:pb-0 z-0"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--color-accent-primary)_0%,_transparent_40%)] opacity-5 blur-[60px] md:blur-[100px]" />

      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Text Content */}
        <div ref={textRef} className="max-w-4xl mx-auto mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-4 md:mb-6 leading-[1.1]">
            Your resume isn’t bad. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--color-accent-primary] to-[--color-accent-secondary] glow-text">
              It’s invisible.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-[--color-muted-foreground] max-w-2xl mx-auto leading-relaxed px-4">
            ATS systems don’t read resumes like humans.
            <br className="hidden md:block" /> This tool does.
          </p>
        </div>

        {/* Visual Element */}
        <div
          ref={visualRef}
          className="relative w-full max-w-lg aspect-square md:max-w-2xl"
        >
          {/* Conceptual Visual: Glassmorphic Container */}
          <div className="absolute inset-0 bg-gradient-to-b from-[--color-card-border] to-transparent rounded-full opacity-20 blur-xl animate-pulse" />
          
          <div className="relative w-full h-full glass rounded-3xl flex items-center justify-center border border-[--color-card-border] overflow-hidden">
            <div className="text-[--color-muted-foreground] text-sm font-mono p-8 text-center">
              <span className="text-[--accent-primary] text-xs uppercase tracking-[0.2em] mb-4 block">System Analyzing</span>
              <div className="space-y-2 opacity-50">
                 <div className="h-2 w-24 bg-white/20 rounded mx-auto overflow-hidden relative">
                    <div className="absolute inset-0 bg-[--accent-primary] w-full animate-[progress_2s_infinite]" />
                 </div>
                 <span className="text-xs">Parsing Layout...</span>
              </div>
            </div>
            
            {/* Decoration: Scan line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[--color-accent-primary] shadow-[0_0_20px_var(--color-accent-primary)] animate-[scan_3s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}
