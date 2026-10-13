"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Columns,
  Rows,
  Database,
  RefreshCw,
  Bell,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { TwinTowerLogo } from "./TwinTowerLogo";
import { ThemeToggle } from "./ThemeToggle";
import { useNavLayout } from "@/context/NavigationLayoutContext";
import { navItems } from "./navigationData";

export function DashboardHeader() {
  const { navMode, toggleNavMode, sidebarOpen, toggleSidebar } = useNavLayout();
  const pathname = usePathname();
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  const handleSeedDatabase = async () => {
    try {
      setSeeding(true);
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeedSuccess(true);
        setTimeout(() => {
          setSeedSuccess(false);
          window.location.reload();
        }, 1200);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 dark:border-slate-800/80 bg-[#090D16]/90 dark:bg-[#090D16]/95 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left Section: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          {navMode === "vertical" && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all focus:outline-none"
              title="Toggle Sidebar"
              aria-label="Toggle Sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          <TwinTowerLogo size="md" />

          {/* Luxury Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Condo OS v4.2</span>
          </div>
        </div>

        {/* Center / Horizontal Menu (when Horizontal Layout is active) */}
        {navMode === "horizontal" && (
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1 px-2 rounded-2xl bg-slate-900/60 border border-slate-800/70 max-w-[850px]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Section: Controls, Layout Switcher & Theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* MongoDB Status Indicator */}
          <div
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
            title="MongoDB Atlas Cluster Connected"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Database className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px] font-mono">Cluster0 Live</span>
          </div>

          {/* Quick Seed / Reset Button */}
          <button
            onClick={handleSeedDatabase}
            disabled={seeding || seedSuccess}
            title="Seed/Reset Royal Park Condominium Data"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800/60 dark:bg-slate-800/80 hover:bg-slate-700/60 border border-slate-700/50 text-slate-300 hover:text-white transition-all disabled:opacity-50"
          >
            {seedSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400">Synced!</span>
              </>
            ) : (
              <>
                <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${seeding ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline text-[11px]">Sync DB</span>
              </>
            )}
          </button>

          {/* Dynamic Navigation Switcher: Vertical <-> Horizontal */}
          <button
            onClick={toggleNavMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-600/30 hover:to-indigo-600/30 border border-blue-500/30 text-blue-300 hover:text-white shadow-sm transition-all group"
            title={`Switch to ${navMode === "vertical" ? "Top Horizontal Navigation" : "Left Sidebar Navigation"}`}
          >
            {navMode === "vertical" ? (
              <>
                <Rows className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline text-[11px]">Top Nav</span>
              </>
            ) : (
              <>
                <Columns className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline text-[11px]">Sidebar</span>
              </>
            )}
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Profile Avatar Pill */}
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 transition-all ml-1"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              AV
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight text-slate-200">
                A. Vance
              </span>
              <span className="text-[10px] text-slate-400 leading-tight">Facilities Dir.</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
