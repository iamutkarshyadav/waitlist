"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, ShieldAlert, Cpu, CheckCheck } from "lucide-react";

export default function VisualStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = contentRef.current;
      if (!content) return;

      const totalWidth = content.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      gsap.to(content, {
        x: () => -(totalWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1, // Added for smoother pinning
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stages = [
    {
      title: "Submission",
      desc: "Your resume enters the black box.",
      icon: <MoveRight size={40} className="text-[--color-muted-foreground]" />,
      color: "bg-gray-800",
      status: "neutral"
    },
    {
      title: "Parsing Layer",
      desc: "Tables & columns are stripped. 30% of data is lost.",
      icon: <ShieldAlert size={40} className="text-red-400" />,
      color: "bg-red-900/20",
      status: "danger"
    },
    {
      title: "Keyword & Semantic Matching",
      desc: "AI compares your skills against the job description.",
      icon: <Cpu size={40} className="text-yellow-400" />,
      color: "bg-yellow-900/20",
      status: "warning"
    },
    {
      title: "Human Review",
      desc: "Only the top 2% make it here. You are now visible.",
      icon: <CheckCheck size={40} className="text-[--accent-primary]" />,
      color: "bg-green-900/20",
      status: "success"
    }
  ];

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0B0D10] z-10">
      <div ref={triggerRef} className="h-screen w-full flex items-center overflow-hidden">
        
        {/* Intro Text (Absolute) - Hidden on super small screens or customized */}
        <div className="absolute top-8 left-8 md:top-10 md:left-10 z-20 max-w-[200px] md:max-w-md pointer-events-none mix-blend-difference">
          <h2 className="text-2xl md:text-5xl font-bold mb-2">The Journey</h2>
          <p className="text-xs md:text-base text-[--color-muted-foreground]">Scroll to see what happens after you hit "Apply".</p>
        </div>

        {/* Horizontal Moving Content */}
        <div ref={contentRef} className="flex items-center h-full px-4 md:px-20 gap-4 md:gap-20 w-fit">
            
            {stages.map((stage, i) => (
                <div 
                    key={i} 
                    className={`relative w-[85vw] md:w-[60vh] h-[55vh] md:h-[60vh] flex-shrink-0 rounded-3xl border border-[--card-border] p-5 md:p-8 flex flex-col justify-between ${stage.color} backdrop-blur-md`}
                >
                    <div className="flex justify-between items-start">
                        <span className="text-4xl md:text-6xl font-bold opacity-10">0{i + 1}</span>
                        <div className="p-2 md:p-4 bg-black/30 rounded-full border border-white/10">
                            {stage.icon}
                        </div>
                    </div>

                    <div className="space-y-2 md:space-y-4">
                        <div className={`w-full h-1 bg-white/10 rounded-full overflow-hidden`}>
                             <div className={`h-full ${stage.status === 'success' ? 'bg-[--accent-primary] w-full' : stage.status === 'danger' ? 'bg-red-500 w-1/4' : 'bg-yellow-500 w-1/2'} transition-all`} />
                        </div>
                        <h3 className="text-xl md:text-3xl font-bold">{stage.title}</h3>
                        <p className="text-base md:text-xl text-[--color-muted-foreground]">{stage.desc}</p>
                    </div>

                    {/* Resume Visual Moving */}
                    {i < stages.length - 1 && (
                        <div className="absolute top-1/2 -right-8 md:-right-12 transform -translate-y-1/2 z-10 text-white/20 hidden md:block">
                            <MoveRight size={48} />
                        </div>
                    )}
                </div>
            ))}

            {/* Final CTA Card */}
            <div className="w-[85vw] md:w-[50vh] h-[55vh] md:h-[50vh] flex-shrink-0 flex items-center justify-center">
                 <div className="text-center space-y-4 md:space-y-6 px-4">
                     <h3 className="text-2xl md:text-4xl font-bold">Don't get stuck at Step 2.</h3>
                     <p className="text-[--color-muted-foreground]">Optimize before you submit.</p>
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
}
