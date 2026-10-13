"use client";

import React, { useEffect, useState } from "react";
import {
  Award,
  TrendingUp,
  Target,
  CheckSquare,
  Square,
  Save,
  CheckCircle2,
  Sparkles,
  Users,
  ShieldAlert,
  BarChart2,
} from "lucide-react";
import { InfoModal } from "@/components/InfoModal";

export default function PerformancePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [perf, setPerf] = useState<any>({
    ratings: {
      year2023: { score: 93, tag: "Strong Performer" },
      year2024: { score: 97, tag: "Exceeds Expectations" },
      year2025: { score: 95, tag: "Exceeds Expectations" },
    },
    coreFocusDetails: "",
    milestonesAchieved: [],
    kpiExecutionScore: 96,
    leadershipScore: 94,
    tenantSatisfactionRate: 98,
  });

  const fetchPerformance = async () => {
    try {
      const res = await fetch("/api/performance");
      const data = await res.json();
      if (data.data) setPerf(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, []);

  const handleToggleMilestone = async (index: number) => {
    try {
      const res = await fetch("/api/performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_milestone", index }),
      });
      const data = await res.json();
      if (data.success) setPerf(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveFocus = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/performance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(perf),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Annual Performance & Appraisal
            </h1>
            <InfoModal
              title="Annual Performance Module Guide"
              overview="Evaluates multi-year leadership and engineering delivery scores, benchmarks against resident satisfaction indices, and tracks strategic infrastructure milestones."
              howToUse={[
                "Examine the 2023, 2024, and 2025 performance ratings, percentages, and assessment badges.",
                "Edit the Core Focus & Strategic Priorities narrative and click 'Save Focus Narrative'.",
                "Click on any Strategic Infrastructure Milestone checkbox to toggle between achieved and pending.",
              ]}
              tips={[
                "A score over 95% qualifies for the annual Presidential Excellence Bonus.",
              ]}
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Executive appraisal history, core focus mandates, and delivery milestones.
          </p>
        </div>

        <button
          onClick={handleSaveFocus}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          {saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Focus Narrative"}</span>
            </>
          )}
        </button>
      </div>

      {/* 1. Yearly Appraisal Cards (2023, 2024, 2025) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { year: "2023", data: perf.ratings?.year2023, border: "border-blue-500/30" },
          { year: "2024", data: perf.ratings?.year2024, border: "border-purple-500/30" },
          { year: "2025", data: perf.ratings?.year2025, border: "border-emerald-500/30" },
        ].map((item) => (
          <div
            key={item.year}
            className={`glass-card p-5 rounded-2xl ${item.border} space-y-3`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 font-mono">
                FY {item.year}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {item.data?.tag || "Strong Performer"}
              </span>
            </div>
            <div className="text-3xl font-heading font-black text-white">
              {item.data?.score || 90}%
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                style={{ width: `${item.data?.score || 90}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Evaluated by Management Committee
            </p>
          </div>
        ))}
      </div>

      {/* 2. Executive Pillar Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-300 font-semibold">KPI Execution</span>
          <span className="text-lg font-mono font-bold text-blue-400">{perf.kpiExecutionScore || 96}%</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-300 font-semibold">Leadership & HSE</span>
          <span className="text-lg font-mono font-bold text-purple-400">{perf.leadershipScore || 94}%</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-300 font-semibold">Resident Satisfaction</span>
          <span className="text-lg font-mono font-bold text-emerald-400">{perf.tenantSatisfactionRate || 98}%</span>
        </div>
      </div>

      {/* 3. Core Strategic Focus Textarea */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-400" />
          <span>Core Focus & Strategic Objectives (Current FY)</span>
        </h3>
        <textarea
          rows={3}
          value={perf.coreFocusDetails || ""}
          onChange={(e) => setPerf({ ...perf, coreFocusDetails: e.target.value })}
          className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed"
          placeholder="State key priorities, energy reduction targets, and operational milestones..."
        />
      </div>

      {/* 4. Strategic Infrastructure Milestones Checklist */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span>Infrastructure Milestones & Capital Deliverables</span>
          </h3>
          <span className="text-xs text-slate-400">Interactive toggle</span>
        </div>

        <div className="space-y-3">
          {perf.milestonesAchieved?.map((milestone: any, idx: number) => {
            const isDone = milestone.achieved;
            return (
              <div
                key={idx}
                onClick={() => handleToggleMilestone(idx)}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all select-none ${
                  isDone
                    ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                  <span className={`text-xs sm:text-sm font-medium ${isDone ? "line-through text-slate-300" : ""}`}>
                    {milestone.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-slate-400">
                    Target: {milestone.targetDate}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                      isDone ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isDone ? "Completed" : "In Progress"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
