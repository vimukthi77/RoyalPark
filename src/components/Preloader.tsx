"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 10;
        return Math.min(100, prev + increment);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="twin-tower-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070A12] text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-24" />

          {/* Animated Twin Towers Architectural Silhouette */}
          <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ground level lines */}
              <motion.line
                x1="20"
                y1="175"
                x2="180"
                y2="175"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.line
                x1="45"
                y1="184"
                x2="155"
                y2="184"
                stroke="rgba(147, 197, 253, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.2 }}
              />

              {/* Tower 1 (Left Tower Outline) */}
              <motion.path
                d="M48 175 V58 L72 38 L92 50 V175"
                stroke="#60A5FA"
                strokeWidth="2.8"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
              {/* Tower 1 Crown Spire */}
              <motion.line
                x1="72"
                y1="38"
                x2="72"
                y2="16"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <motion.circle
                cx="72"
                cy="14"
                r="3"
                fill="#FBBF24"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 1.4 }}
              />

              {/* Skybridge Between Towers */}
              <motion.rect
                x="92"
                y="94"
                width="20"
                height="14"
                rx="2"
                stroke="#38BDF8"
                strokeWidth="2"
                fill="rgba(56, 189, 248, 0.25)"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              />

              {/* Tower 2 (Right Tower Outline) */}
              <motion.path
                d="M112 175 V50 L132 38 L156 58 V175"
                stroke="#60A5FA"
                strokeWidth="2.8"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
              />
              {/* Tower 2 Crown Spire */}
              <motion.line
                x1="132"
                y1="38"
                x2="132"
                y2="16"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              />
              <motion.circle
                cx="132"
                cy="14"
                r="3"
                fill="#FBBF24"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 1.5 }}
              />

              {/* Animated Windows Glint */}
              {[70, 90, 110, 130, 150].map((y, i) => (
                <React.Fragment key={y}>
                  <motion.line
                    x1="58"
                    y1={y}
                    x2="82"
                    y2={y}
                    stroke="rgba(191, 219, 254, 0.6)"
                    strokeWidth="1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.7] }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  />
                  <motion.line
                    x1="122"
                    y1={y}
                    x2="146"
                    y2={y}
                    stroke="rgba(191, 219, 254, 0.6)"
                    strokeWidth="1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.7] }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                  />
                </React.Fragment>
              ))}
            </svg>
          </div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center space-y-1.5"
          >
            <h1 className="text-2xl md:text-3xl font-heading font-extrabold tracking-wider bg-gradient-to-r from-blue-300 via-white to-amber-200 bg-clip-text text-transparent">
              ROYAL PARK CONDOMINIUM
            </h1>
            <p className="text-xs md:text-sm font-medium tracking-[0.25em] text-slate-400 uppercase">
              Enterprise Residence Management Platform
            </p>
          </motion.div>

          {/* Progress Bar & Percentage */}
          <motion.div
            initial={{ opacity: 0, width: "0%" }}
            animate={{ opacity: 1, width: "240px" }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <div className="w-60 h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-[1px] border border-slate-700/50">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between w-60 text-[11px] text-slate-400 font-mono">
              <span>INITIALIZING SYSTEM</span>
              <span className="text-blue-400 font-semibold">{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
