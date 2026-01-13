"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight, AlertTriangle, CheckCircle2, Ban, Server, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VisualStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = contentRef.current;
      const trigger = triggerRef.current;
      if (!content || !trigger) return;

      const totalWidth = content.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      // Horizontal Scroll
      gsap.to(content, {
        x: () => -(totalWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1, // Smooth scrubbing
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax/Fade effects for items inside the scroll
      const cards = gsap.utils.toArray<HTMLElement>(".journey-card");
      cards.forEach((card) => {
        gsap.to(card, {
          scale: 0.95,
          opacity: 0.8,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getById("h-scroll"), // Link to horiz scroll if we named it, but easier to just use simple scroll-based staggering if we had a non-native scroll. 
            // Since we are using native horizontal scroll via transform, standard triggers might be tricky without extra setup.
            // Simplified: We rely on the CSS transitions for hover and focus.
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0B0D10] z-10">
      <div ref={triggerRef} className="h-screen w-full flex items-center overflow-hidden sticky top-0">
        
        {/* Intro Text */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 max-w-[300px] pointer-events-none mix-blend-exclusion text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 tracking-tighter">The Journey</h2>
          <p className="text-sm md:text-base opacity-70">Scroll to see what happens after "Apply".</p>
        </div>

        {/* Horizontal Moving Content */}
        <div ref={contentRef} className="flex items-center h-full px-8 md:px-24 gap-6 md:gap-16 w-fit will-change-transform">
            
            {/* CARD 1: THE BLACK HOLE */}
            <JourneyCard 
                number="01"
                title="The Black Hole"
                accentColor="text-white"
                gradient="from-gray-900/80 to-black/80"
                borderColor="border-white/10"
            >
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="relative w-64 h-64">
                         {/* Accretion Disk */}
                         <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-[spin_8s_linear_infinite]" />
                         <div className="absolute inset-4 rounded-full border border-dashed border-white/20 animate-[spin_12s_linear_infinite_reverse]" />
                         <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-black rounded-full shadow-[0_0_50px_rgba(255,255,255,0.1)] -translate-x-1/2 -translate-y-1/2 z-10" />
                    </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {['Workday', 'Taleo', 'Greenhouse', 'Lever'].map((name, i) => (
                        <div key={i} className="absolute px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/50 backdrop-blur-sm animate-float-in"
                        style={{
                            top: `${10 + Math.random() * 80}%`,
                            left: `${10 + Math.random() * 80}%`,
                            animationDelay: `${i * 1.5}s`,
                            animationDuration: '8s'
                        }}>
                            {name}
                        </div>
                    ))}
                </div>

                <div className="relative z-10 mt-auto">
                    <div className="glass p-5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-md">
                        <div className="flex justify-between items-end mb-2">
                             <span className="text-xs text-uppercase tracking-wider opacity-60">Competition</span>
                             <span className="text-2xl font-mono font-bold text-white">250+</span>
                        </div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                             <div className="bg-white h-full w-[90%] opacity-80" />
                        </div>
                        <p className="text-xs text-white/50 mt-3 leading-relaxed">
                            Your resume is fighting against hundreds of others in an unranked pile.
                        </p>
                    </div>
                </div>
            </JourneyCard>


            {/* CARD 2: THE SHREDDER */}
            <JourneyCard 
                number="02"
                title="The Shredder"
                accentColor="text-red-500"
                gradient="from-red-950/30 to-black/90"
                borderColor="border-red-500/20"
                icon={<Ban size={24} className="text-red-500" />}
            >
                 <div className="absolute inset-0 overflow-hidden opacity-10 select-none pointer-events-none">
                     <div className="font-mono text-[10px] text-red-500/80 leading-none whitespace-pre p-4">
                         {`ERROR: TABLE_DETECTED -> STRIPPING FORMAT\nWARNING: MULTI_COL_LAYOUT -> FLATTENING\nCRITICAL: GRAPHIC_HEADER -> NULL\n`.repeat(10)}
                     </div>
                 </div>

                 <div className="relative z-10 mt-auto">
                    <div className="glass p-5 rounded-xl border border-red-500/20 bg-red-950/10 backdrop-blur-md">
                        <div className="flex items-center gap-4 mb-4">
                             <div className="relative flex items-center justify-center w-12 h-12">
                                 <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                     <path className="text-red-900/30" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                     <path className="text-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]" strokeDasharray="43, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                 </svg>
                                 <span className="absolute text-xs font-bold text-red-500">43%</span>
                             </div>
                             <div>
                                 <div className="text-sm font-bold text-red-400">Parsing Failure</div>
                                 <div className="text-[10px] text-red-400/60 uppercase tracking-widest">Format unsupported</div>
                             </div>
                        </div>
                        <div className="space-y-1.5 opacity-60">
                             <div className="h-1.5 w-full bg-red-900/20 rounded flex"><div className="w-1/4 h-full bg-red-500/50 rounded" /></div>
                             <div className="h-1.5 w-full bg-red-900/20 rounded flex"><div className="w-1/2 h-full bg-red-500/50 rounded" /></div>
                             <div className="h-1.5 w-2/3 bg-red-900/20 rounded flex"><div className="w-1/3 h-full bg-red-500/50 rounded" /></div>
                        </div>
                    </div>
                </div>
            </JourneyCard>


            {/* CARD 3: THE GATEKEEPER */}
            <JourneyCard 
                number="03"
                title="The Gatekeeper"
                accentColor="text-yellow-500"
                gradient="from-yellow-950/20 to-black/90"
                borderColor="border-yellow-500/20"
                icon={<AlertTriangle size={24} className="text-yellow-500" />}
            >
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Server size={200} />
                 </div>

                 <div className="relative z-10 mt-auto flex flex-col gap-3">
                    <div className="glass p-4 rounded-xl border border-yellow-500/20 bg-yellow-950/10 backdrop-blur-md flex items-center justify-between">
                         <div>
                            <div className="text-xs text-yellow-500/60 uppercase tracking-wider">Keywords</div>
                            <div className="text-2xl font-mono font-bold text-yellow-500">4<span className="text-yellow-500/40 text-lg">/15</span></div>
                         </div>
                         <div className="w-10 h-10 rounded-full border border-yellow-500/30 flex items-center justify-center text-yellow-500">
                            <span className="text-xs font-bold">FAIL</span>
                         </div>
                    </div>

                    <div className="w-full bg-black/40 p-3 rounded-lg border border-white/5">
                        <div className="flex justify-between items-end mb-1 text-xs text-gray-500">
                             <span>Match Score</span>
                             <span>28%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full w-[28%] bg-yellow-600 shadow-[0_0_10px_rgba(202,138,4,0.5)]" />
                        </div>
                    </div>
                </div>
            </JourneyCard>


            {/* CARD 4: THE PRIZE */}
            <JourneyCard 
                number="04"
                title="The Prize"
                accentColor="text-[--accent-primary]"
                gradient="from-green-950/30 to-black/90"
                borderColor="border-green-500/20"
                icon={<CheckCircle2 size={24} className="text-[--accent-primary]" />}
            >
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(57,255,20,0.15),transparent_60%)]" />

                 <div className="relative z-10 flex flex-col items-center justify-center h-full">
                     <div className="relative group cursor-default">
                         <div className="absolute inset-0 bg-[--accent-primary] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                         
                         <div className="relative bg-[#0B0D10]/90 border border-[--accent-primary]/30 p-8 rounded-2xl flex flex-col items-center text-center shadow-2xl backdrop-blur-xl transform group-hover:scale-105 transition-transform duration-500">
                             <div className="w-14 h-14 bg-[--accent-primary]/10 rounded-full flex items-center justify-center text-[--accent-primary] mb-4 border border-[--accent-primary]/20">
                                 <CheckCircle2 size={28} />
                             </div>
                             <h4 className="text-white font-bold text-xl tracking-tight">Shortlisted</h4>
                             <p className="text-[--color-muted-foreground] text-sm mt-1">Top 2% Selected</p>
                             
                             <div className="mt-6 flex items-center gap-2 px-3 py-1.5 bg-[--accent-primary]/10 rounded-full border border-[--accent-primary]/20 text-[10px] text-[--accent-primary] font-mono tracking-wider">
                                 <span className="w-2 h-2 rounded-full bg-[--accent-primary] animate-pulse" />
                                 INTERVIEW READY
                             </div>
                         </div>
                     </div>
                 </div>
            </JourneyCard>


            {/* Final CTA */}
            <div className="w-[85vw] md:w-[400px] h-[55vh] md:h-[500px] flex-shrink-0 flex items-center justify-center">
                 <div className="text-center p-8">
                     <h3 className="text-3xl md:text-5xl font-bold mb-4">Don't settle.</h3>
                     <p className="text-[--color-muted-foreground] text-lg">
                        Beat the system at its own game.
                     </p>
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
}

// Reusable Card Component for consistency
function JourneyCard({ 
    number, 
    title, 
    children, 
    accentColor,
    gradient,
    borderColor,
    icon 
}: { 
    number: string; 
    title: string; 
    children: React.ReactNode; 
    accentColor: string;
    gradient: string;
    borderColor: string;
    icon?: React.ReactNode;
}) {
    return (
        <div className={cn(
            "journey-card relative w-[85vw] md:w-[450px] h-[55vh] md:h-[550px] flex-shrink-0 rounded-[2rem] border p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-br transition-all duration-300 hover:border-opacity-50",
            borderColor,
            gradient
        )}>
             {/* Dynamic Noise Texture */}
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
             
             <div className="relative z-10 flex justify-between items-start mb-6">
                <div>
                    <span className="text-5xl md:text-7xl font-bold text-white/40 font-geist-mono block leading-none -ml-1 text-shadow-sm">{number}</span>
                    <h3 className={cn("text-2xl font-bold mt-2 flex items-center gap-3", accentColor)}>
                        {title}
                    </h3>
                </div>
                {icon && (
                    <div className="p-3 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
                        {icon}
                    </div>
                )}
            </div>

            {children}
        </div>
    );
}
