import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = "", variant = 'dark' }: LogoProps) {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* The thin circular frame - Significant reduction in size for navbar fit */}
        <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center p-2 relative">
          {/* I.A Script - Using the now-available font-script */}
          <span className="font-script text-3xl mt-[-2px] select-none text-black/80">
            I.A
          </span>
          
          {/* Accent circles/arcs based on image - one arc is prominent */}
          <div className="absolute inset-0 rounded-full border-l border-b border-[#8B7E74]/40 rotate-45" />
          <div className="absolute inset-2 rounded-full border-t border-black/[0.03]" />
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-0.5">
        {/* CLOTHING */}
        <span className="font-display font-medium text-[9px] tracking-[0.5em] uppercase text-black/80">
          Clothing
        </span>
        
        {/* Tagline */}
        <div className="flex items-center gap-1.5 w-full px-1">
          <div className="h-[0.5px] w-3 bg-black/20" />
          <span className="text-[5px] font-medium tracking-[0.1em] whitespace-nowrap opacity-40 uppercase">
            Casual Wear, Everyday Confidence
          </span>
          <div className="h-[0.5px] w-3 bg-black/20" />
        </div>
      </div>
    </div>
  );
}
