"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; 

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-[#0B0D10]/80 backdrop-blur-md border-white/10 py-3" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg">
            <Image
              src="/logo.png"
              alt="MagnaCV Logo"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-[--accent-primary] transition-colors">
            MagnaCV
          </span>
        </Link>
      </div>
    </header>
  );
}
