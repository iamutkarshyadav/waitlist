"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, FileText, CheckCircle, XCircle } from "lucide-react";

export default function AtsVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animation: Resume Explodes into Data Blocks
      tl.to(resumeRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
      })
      .fromTo(
        blocksRef.current,
        { 
          opacity: 0, 
          scale: 0, 
          x: (i) => (Math.random() - 0.5) * 500,
          y: (i) => (Math.random() - 0.5) * 500,
          rotation: (i) => (Math.random() - 0.5) * 90 
        },
        { 
          opacity: 1, 
          scale: 1, 
          x: 0, 
          y: 0, 
          rotation: 0, 
          duration: 1.5, 
          ease: "back.out(1.7)",
          stagger: 0.05 
        }
      )
      .to(blocksRef.current, {
        backgroundColor: "rgba(57, 255, 20, 0.1)", // Neon Green Tint
        borderColor: "var(--accent-primary)",
        boxShadow: "0 0 10px rgba(57, 255, 20, 0.3)",
        duration: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !blocksRef.current.includes(el)) {
      blocksRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="min-h-screen w-full flex items-center justify-center relative bg-[#0B0D10] z-10 py-16 md:py-24">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left: Text Content */}
        <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            How ATS <span className="text-[--accent-primary]">Actually</span> Sees Your Resume
          </h2>
          <p className="text-lg md:text-xl text-[--color-muted-foreground] leading-relaxed">
            To you, it’s a career story. To an ATS, it’s unstructured data.
            <br className="hidden md:block"/><br className="hidden md:block"/>
            Formatting errors, hidden tables, and low keyword density can make you invisible before a human ever looks.
          </p>
          
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex items-center gap-4 p-4 glass rounded-xl">
               <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><XCircle size={24} /></div>
               <div>
                 <h4 className="font-bold text-white text-sm md:text-base">Parsing Errors</h4>
                 <p className="text-xs md:text-sm text-[--color-muted-foreground]">Complex layouts break parsers</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-4 glass rounded-xl border-l-4 border-l-[--accent-primary]">
               <div className="p-2 bg-[--accent-primary]/10 rounded-lg text-[--accent-primary]"><CheckCircle size={24} /></div>
               <div>
                 <h4 className="font-bold text-white text-sm md:text-base">Structured Data</h4>
                 <p className="text-xs md:text-sm text-[--color-muted-foreground]">Clean JSON output for recruiters</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Visual Storytelling */}
        <div ref={containerRef} className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center order-1 lg:order-2">
            
            {/* Initial Resume View */}
            <div ref={resumeRef} className="absolute inset-0 m-auto w-[85%] md:w-3/4 h-full bg-white text-black p-6 md:p-8 rounded-lg shadow-2xl flex flex-col gap-4 origin-center">
                 <div className="w-1/3 h-6 md:h-8 bg-gray-300 rounded" />
                 <div className="w-1/2 h-3 md:h-4 bg-gray-200 rounded" />
                 <div className="w-full h-[1px] bg-gray-300 my-2 md:my-4" />
                 <div className="space-y-2">
                     <div className="w-full h-2 md:h-3 bg-gray-100 rounded" />
                     <div className="w-full h-2 md:h-3 bg-gray-100 rounded" />
                     <div className="w-3/4 h-2 md:h-3 bg-gray-100 rounded" />
                 </div>
                 <div className="space-y-2 mt-2 md:mt-4">
                     <div className="w-1/4 h-3 md:h-4 bg-gray-300 rounded mb-2" />
                     <div className="grid grid-cols-2 gap-2">
                        <div className="h-12 md:h-16 bg-gray-100 rounded" />
                        <div className="h-12 md:h-16 bg-gray-100 rounded" />
                     </div>
                 </div>
            </div>

            {/* Exploded Data Blocks (Hidden Initially) */}
            <div className="absolute inset-0 grid grid-cols-3 gap-2 p-2 md:p-4">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div 
                        key={i} 
                        ref={addToRefs}
                        className="glass border border-white/10 rounded-lg flex flex-col items-center justify-center p-1 md:p-2 opacity-0"
                    >
                         <div className="text-[--accent-primary] mb-1"><FileText size={16} className="md:w-5 md:h-5" /></div>
                         <div className="w-8 md:w-10 h-1.5 md:h-2 bg-white/20 rounded-full" />
                         <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-[--color-muted-foreground] mt-1 md:mt-2">Node</span>
                    </div>
                ))}
            </div>

        </div>
      </div>
    </section>
  );
}
