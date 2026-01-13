"use client";

import React, { useRef, ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
}

export default function MagneticButton({ children, strength = 0.5 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      style={{ touchAction: "none" }}
    >
      {children}
    </div>
  );
}
