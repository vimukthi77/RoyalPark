"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Sparkles,
  ChevronRight,
  Shield,
  HelpCircle,
} from "lucide-react";
import { useNavLayout } from "@/context/NavigationLayoutContext";
import { navItems } from "./navigationData";

export function Sidebar() {
  const pathname = usePathname();
  const { navMode, sidebarOpen } = useNavLayout();

  // If in horizontal mode or closed, hide sidebar
  if (navMode !== "vertical" || !sidebarOpen) {
    return null;
  }

  return (
    <aside className="w-64 xl:w-72 shrink-0 border-r border-slate-800/80 bg-[#0A0E1A]/95 dark:bg-[#090D16]/95 backdrop-blur-xl flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 z-30 overflow-y-auto">
      {/* Top Section: Navigation Links */}
      <div className="p-4 space-y-6">
        {/* Estate Overview Mini Widget */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-slate-950/80 border border-blue-500/20 shadow-inner">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Estate Status</span>
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px]">
              95.7% Occupied
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            280 Residential Apartments across West & East Towers
          </p>
        </div>

        {/* Navigation Group */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-3">
            Management Modules
          </span>

          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-850 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-800/80 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <div className="truncate">
                      <div className="truncate text-xs font-semibold">{item.name}</div>
                      <div
                        className={`text-[10px] truncate ${
                          isActive ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {item.badge ? (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-mono rounded-md border shrink-0 ${
                        isActive ? "bg-white/20 text-white border-white/30" : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                        isActive ? "opacity-100 text-white" : "text-slate-400"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section: Facilities Hotline & Security Stamp */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Control Desk 24/7</span>
          </span>
          <span className="text-blue-400 font-mono font-semibold">+94 11 250 8800</span>
        </div>
        <div className="text-[10px] text-slate-400 text-center font-mono">
          Royal Park Condominium © 2026
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
