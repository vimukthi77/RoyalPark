"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Building,
  Sparkles,
  Users,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import { TwinTowerLogo } from "@/components/TwinTowerLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LandingPage() {
  const [imageSrc, setImageSrc] = useState("/hero.jpeg");

  return (
    <div className="relative min-h-screen bg-[#070A12] text-white overflow-hidden flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* 1. Full-Screen Hero Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt="Royal Park Condominium Twin Towers"
          onError={() => {
            if (imageSrc !== "/hero.jpg") {
              setImageSrc("/hero.jpg");
            }
          }}
          className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.06] transition-transform duration-1000 ease-out"
        />

        {/* Balanced Luxury Cinematic Overlays: protects readability while showcasing the towers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/50 to-[#070A12]/30" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* 2. Top Navigation Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <TwinTowerLogo size="md" />

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all text-white hover:border-blue-400/50 shadow-lg"
          >
            <span>Staff Portal</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
          </Link>
        </div>
      </header>

      {/* 3. Hero Centerpiece Content */}
      <main className="relative z-20 max-w-5xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center my-auto">
        {/* Prestigious Estate Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/40 backdrop-blur-xl mb-6 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-100">
            Colombo&apos;s Iconic Twin Towers Residence
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-xs font-mono text-blue-200">EST. 1998</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] text-white max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-amber-200 bg-clip-text text-transparent">
            Royal Park Condominium
          </span>{" "}
          Management System
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl lg:text-2xl text-slate-200 max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          Premium Living & High-End Residence Management Platform.
        </motion.p>

        {/* Key Feature Stats Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mt-8 max-w-3xl w-full"
        >
          <div className="glass-card p-3 sm:p-4 rounded-2xl flex flex-col items-center border-blue-500/30 bg-slate-900/80 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-heading font-bold text-blue-300">280 Units</span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Twin Tower Residences</span>
          </div>
          <div className="glass-card p-3 sm:p-4 rounded-2xl flex flex-col items-center border-emerald-500/30 bg-slate-900/80 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-heading font-bold text-emerald-300">95.7%</span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Verified Occupancy</span>
          </div>
          <div className="col-span-2 sm:col-span-1 glass-card p-3 sm:p-4 rounded-2xl flex flex-col items-center border-amber-500/30 bg-slate-900/80 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-heading font-bold text-amber-300">24/7 BMS</span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium">Smart Engineering</span>
          </div>
        </motion.div>

        {/* Styled Call-To-Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl text-base sm:text-lg font-heading font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_10px_35px_rgba(37,99,235,0.55)] hover:shadow-[0_15px_45px_rgba(37,99,235,0.75)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-blue-400/50"
          >
            <span className="relative z-10 tracking-wide">Explore Dashboard</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-amber-300 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
          </Link>
        </motion.div>
      </main>

      {/* 4. Luxury Footer */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 backdrop-blur-sm bg-black/20">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-blue-400" />
          <span>Royal Park Condominium Management System • Lake Drive, Rajagiriya</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Enterprise Grade</span>
          <span>•</span>
          <span>Mongoose Powered</span>
          <span>•</span>
          <span>Next.js 14 App Router</span>
        </div>
      </footer>
    </div>
  );
}
