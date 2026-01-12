"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
        // Optionally handle error state here
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
          See your resume the way <span className="text-[--accent-primary]">ATS does.</span>
        </h2>
        
        <p className="text-[--color-muted-foreground] mb-12 text-lg">
          Join the waitlist for early access to the invisible system.
        </p>

        {!success ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
            <div className="relative flex-grow group">
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-sm px-4 text-white placeholder-[--color-muted-foreground] focus:outline-none focus:border-[--accent-primary] focus:bg-white/10 transition-all font-mono text-sm"
              />
              {/* Subtle line indicator instead of heavy glow */}
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[--accent-primary] transition-all duration-500 group-focus-within:w-full" />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="h-12 px-6 rounded-sm bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-[--accent-primary] transition-colors disabled:opacity-50 text-sm tracking-wide uppercase"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <>Request Access <ArrowRight size={16} /></>}
            </button>
          </form>
        ) : (
          <div className="border border-green-500/20 bg-green-500/5 text-green-400 px-6 py-4 rounded-sm inline-flex items-center gap-3 animate-in fade-in zoom-in duration-300">
            <div className="w-5 h-5 flex items-center justify-center border border-green-500 rounded-sm">
                <Check size={12} />
            </div>
            <span className="font-mono text-sm tracking-tight">YOU'RE ON THE LIST. WE'LL BE IN TOUCH.</span>
          </div>
        )}

      </div>
    </section>
  );
}
