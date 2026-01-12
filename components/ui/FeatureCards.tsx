"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function FeatureCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Animation
      gsap.fromTo(
        cardsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
    });

    // Update gradient/shine position if needed
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const features = [
    {
      icon: <Search className="w-8 h-8 text-[--accent-primary]" />,
      title: "Parsing Accuracy",
      desc: "Our engine reads complex layouts, tables, and columns better than 99% of legacy ATS software.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[--accent-secondary]" />,
      title: "Score Simulation",
      desc: "Get an exact match score against your target job description before you hit apply.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
      title: "Keyword Gap Detection",
      desc: "Identify missing critical skills and keywords that are causing auto-rejection.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Instant Feedback",
      desc: "Recruiter-level feedback on impact, clarity, and brevity in milliseconds.",
    },
  ];

  return (
    <section ref={sectionRef} className="min-h-screen w-full flex flex-col items-center justify-center py-20 relative bg-[#0B0D10] z-20">
       {/* Background Decoration */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)] pointer-events-none" />

       <div className="container px-4 md:px-6">
         <div className="text-center mb-10 md:mb-16 space-y-4">
             <h2 className="text-3xl md:text-5xl font-bold">Humanized <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--accent-primary] to-[--accent-secondary]">Intelligence</span></h2>
             <p className="text-[--color-muted-foreground] max-w-2xl mx-auto text-base md:text-lg px-4">
                Stop playing guessing games. Get the tools you need to beat the system.
             </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((f, i) => (
                <div
                    key={i}
                    ref={addToRefs}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="glass p-6 md:p-8 rounded-2xl flex flex-col gap-3 md:gap-4 relative group hover:border-[--accent-primary] transition-colors duration-300"
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Shine Effect */}
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-2xl"
                        style={{
                            background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)"
                        }}
                    />

                    <div className="translate-z-10 bg-white/5 p-3 rounded-lg w-fit mb-2">
                        {f.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold translate-z-10">{f.title}</h3>
                    <p className="text-[--color-muted-foreground] text-sm leading-relaxed translate-z-10">
                        {f.desc}
                    </p>
                </div>
            ))}
         </div>
       </div>
    </section>
  );
}
