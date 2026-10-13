"use client";

import React, { useState } from "react";
import { Info, X, HelpCircle, CheckCircle2, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoModalProps {
  title: string;
  overview: string;
  howToUse: string[];
  tips?: string[];
  variant?: "button" | "icon";
}

export function InfoModal({
  title,
  overview,
  howToUse,
  tips = [],
  variant = "icon",
}: InfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button / Icon */}
      {variant === "icon" ? (
        <button
          onClick={() => setIsOpen(true)}
          title={`Help & Guidance: ${title}`}
          aria-label={`Help & Guidance: ${title}`}
          className="p-1.5 rounded-full text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 inline-flex items-center justify-center shrink-0"
        >
          <Info className="w-4 h-4 text-blue-400/90 hover:text-blue-300" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-all"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Guide</span>
        </button>
      )}

      {/* Glassmorphism Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl bg-[#0F172A]/90 dark:bg-[#0d1322]/95 border border-blue-500/30 text-slate-100 shadow-2xl shadow-blue-950/50 backdrop-blur-2xl overflow-hidden p-6 z-10"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-amber-400" />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                      Interactive System Guide
                    </span>
                    <h3 className="text-lg font-heading font-bold text-white tracking-tight">
                      {title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Content */}
              <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {/* 1. Module Overview */}
                <div className="space-y-1.5 bg-slate-900/40 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
                    <Info className="w-3.5 h-3.5" />
                    <span>Module Overview</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {overview}
                  </p>
                </div>

                {/* 2. How to Use Step-by-Step */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>How to Use (Step-by-Step)</span>
                  </div>
                  <div className="space-y-2 pl-1">
                    {howToUse.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold shrink-0 mt-0.5 border border-blue-500/30">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Pro Tips (Optional) */}
                {tips.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Pro Admin Tips</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-amber-200/90 space-y-1 pl-1">
                      {tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-700/60 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-700/30 transition-all"
                >
                  Got It, Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default InfoModal;
