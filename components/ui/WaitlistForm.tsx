"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { cn } from "@/lib/utils";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail("");
      } else {
        console.error("Failed to join waitlist");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[60vh] w-full flex flex-col items-center justify-center relative bg-[#0B0D10] py-20 z-20 overflow-hidden">
      {/* Background: Subtle 'Human' Gradient - Organic Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(57,255,20,0.03),transparent_40%,rgba(124,58,237,0.03))] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(57,255,20,0.05),transparent_60%)] opacity-50 blur-[80px] pointer-events-none" />

      <div className="container px-4 text-center max-w-2xl relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Stop guessing. <br />
          See your resume the way <span className="text-[--accent-primary] relative inline-block">
            ATS does.
            <Sparkles className="absolute -top-6 -right-6 w-6 h-6 text-[--accent-primary] animate-pulse opacity-50" />
          </span>
        </h2>
        
        <p className="text-[--color-muted-foreground] mb-12 text-lg">
          Join the waitlist for early access to the invisible system.
        </p>

        {!success ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full items-center">
            <div className={cn(
              "relative flex-grow group w-full transition-all duration-300 transform",
              focused ? "scale-105" : "scale-100"
            )}>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-full px-6 text-white placeholder-[--color-muted-foreground] focus:outline-none focus:border-[--accent-primary] focus:bg-white/10 transition-all font-mono text-sm shadow-[0_0_0_1px_rgba(255,255,255,0.05)] focus:shadow-[0_0_20px_rgba(57,255,20,0.2)]"
              />
            </div>
            
            <MagneticButton strength={0.4}>
              <button
                type="submit"
                disabled={loading}
                className="h-14 px-8 rounded-full bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-[--accent-primary] transition-colors disabled:opacity-50 text-sm tracking-wide uppercase whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Request Access <ArrowRight size={16} /></>}
              </button>
            </MagneticButton>
          </form>
        ) : (
          <div className="border border-green-500/20 bg-green-500/5 text-green-400 px-8 py-6 rounded-2xl inline-flex items-center gap-4 animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4 backdrop-blur-sm">
            <div className="w-8 h-8 flex items-center justify-center border border-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]">
              <Check size={16} />
            </div>
            <div className="text-left">
                <span className="block font-bold text-white mb-1">You're on the list.</span>
                <span className="font-mono text-xs opacity-80 uppercase tracking-wide">We'll be in touch soon.</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
