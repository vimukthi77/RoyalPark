"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function TwinTowerLogo({ size = "md", showText = true, className = "" }: LogoProps) {
  const iconDimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const subtitleSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  return (
    <Link href="/" className={`flex items-center gap-3 group transition-all ${className}`}>
      {/* Twin Towers SVG Icon */}
      <div className={`relative ${iconDimensions[size]} flex items-center justify-center shrink-0`}>
        <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-md group-hover:bg-blue-500/40 transition-all duration-300" />
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Platform / Foundation */}
          <path
            d="M10 88H90"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="text-blue-500"
          />
          <path
            d="M20 94H80"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-blue-400/60"
          />

          {/* Tower 1 (West Tower) */}
          <path
            d="M22 88V30L34 20L44 26V88"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="text-blue-500"
          />
          {/* Tower 1 Spire & Crown */}
          <path
            d="M34 20V8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-amber-400"
          />
          <circle cx="34" cy="7" r="2" fill="#F59E0B" />

          {/* Tower 1 Glass Windows Grid */}
          <line x1="28" y1="36" x2="38" y2="36" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/70" />
          <line x1="28" y1="46" x2="38" y2="46" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/70" />
          <line x1="28" y1="56" x2="38" y2="56" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/70" />
          <line x1="28" y1="66" x2="38" y2="66" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/70" />
          <line x1="28" y1="76" x2="38" y2="76" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/70" />

          {/* Skybridge Linking Twin Towers */}
          <rect
            x="44"
            y="48"
            width="12"
            height="8"
            rx="1.5"
            fill="currentColor"
            className="text-blue-500/30"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Tower 2 (East Tower) */}
          <path
            d="M56 88V26L66 20L78 30V88"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="text-blue-500"
          />
          {/* Tower 2 Spire & Crown */}
          <path
            d="M66 20V8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-amber-400"
          />
          <circle cx="66" cy="7" r="2" fill="#F59E0B" />

          {/* Tower 2 Glass Windows Grid */}
          <line x1="62" y1="36" x2="72" y2="36" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/70" />
          <line x1="62" y1="46" x2="72" y2="46" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/70" />
          <line x1="62" y1="56" x2="72" y2="56" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/70" />
          <line x1="62" y1="66" x2="72" y2="66" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/70" />
          <line x1="62" y1="76" x2="72" y2="76" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/70" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-heading font-bold tracking-tight bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 dark:from-white dark:via-blue-200 dark:to-blue-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-amber-300 transition-all ${textSizes[size]}`}
          >
            ROYAL PARK
          </span>
          <span
            className={`tracking-widest uppercase font-medium text-slate-400 dark:text-slate-400 flex items-center gap-1.5 ${subtitleSizes[size]}`}
          >
            <span>CONDOMINIUM</span>
            <span className="w-1 h-1 rounded-full bg-amber-400 inline-block" />
            <span className="text-blue-400 font-semibold">ESTATE</span>
          </span>
        </div>
      )}
    </Link>
  );
}

export default TwinTowerLogo;
