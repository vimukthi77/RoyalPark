"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Plus,
  Minus,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Clock,
  Shield,
  Info,
} from "lucide-react";
import { InfoModal } from "@/components/InfoModal";

export default function LeavePage() {
  const [loading, setLoading] = useState(true);
  const [leave, setLeave] = useState<any>({
    annualLeave: 15,
    annualLeaveMax: 21,
    casualPreApproved: 5,
    casualPostApproved: 2,
    medicalLeave: 12,
    medicalLeaveMax: 14,
    noPayAbsenteeism: 0,
    employmentTypeRules: "",
    leaveHistory: [],
  });

  const fetchLeave = async () => {
    try {
      const res = await fetch("/api/leave");
      const data = await res.json();
      if (data.data) setLeave(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, []);

  const handleAdjust = async (field: string, delta: number) => {
    try {
      const res = await fetch("/api/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "adjust_counter", field, delta }),
      });
      const data = await res.json();
      if (data.success) setLeave(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Leave Details & Allocation Counters
            </h1>
            <InfoModal
              title="Leave Management Module Guide"
              overview="Tracks categorized leave quotas, pre/post-approved casual days, medical certificates, and no-pay absenteeism flags with dynamic increment/decrement controls."
              howToUse={[
                "Use the '+' and '-' buttons on any leave category card to grant or deduct days in real time.",
                "Observe the No-Pay Absenteeism red indicator which flags unexcused attendance.",
                "Review the Employment Type Rules banner to ensure quota compliance.",
                "Inspect historical leave requests in the ledger below.",
              ]}
              tips={[
                "Casual leaves require pre-approval at least 48 hours in advance as per Royal Park staff guidelines.",
              ]}
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dynamic balance counters, real-time adjustments (+/-), and employment rules.
          </p>
        </div>
      </div>

      {/* Employment Rules Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900/80 border border-blue-500/30 flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-heading font-bold text-blue-300">
            Employment Grade Policy Rules
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {leave.employmentTypeRules ||
              "Permanent Executive Grade: 21 Days Annual Leave + 14 Days Medical Leave. Pre-approval required 48 hours prior for Casual Leave. Absenteeism without authorization triggers No-Pay payroll deduction."}
          </p>
        </div>
      </div>

      {/* Interactive Leave Counter Cards Grid (+ / -) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Annual Leave */}
        <div className="glass-card p-5 rounded-2xl border-blue-500/20 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Annual Leave</span>
            <span className="text-[10px] font-mono text-blue-400">Max {leave.annualLeaveMax || 21}d</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-heading font-black text-white">
              {leave.annualLeave} <span className="text-xs font-normal text-slate-400">days</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleAdjust("annualLeave", -1)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                title="Deduct 1 Day"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleAdjust("annualLeave", 1)}
                className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all shadow-md shadow-blue-600/30"
                title="Add 1 Day"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">Scheduled personal vacations</p>
        </div>

        {/* 2. Casual (Pre-Approved) */}
        <div className="glass-card p-5 rounded-2xl border-emerald-500/20 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Casual (Pre-Approved)</span>
            <span className="text-[10px] font-mono text-emerald-400">Authorized</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-heading font-black text-emerald-400">
              {leave.casualPreApproved} <span className="text-xs font-normal text-slate-400">days</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleAdjust("casualPreApproved", -1)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleAdjust("casualPreApproved", 1)}
                className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all shadow-md shadow-emerald-600/30"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">Filed 48 hours in advance</p>
        </div>

        {/* 3. Casual (Post-Approved) */}
        <div className="glass-card p-5 rounded-2xl border-amber-500/20 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Casual (Post-Approved)</span>
            <span className="text-[10px] font-mono text-amber-400">Emergency</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-heading font-black text-amber-400">
              {leave.casualPostApproved} <span className="text-xs font-normal text-slate-400">days</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleAdjust("casualPostApproved", -1)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleAdjust("casualPostApproved", 1)}
                className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center transition-all shadow-md shadow-amber-600/30"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">Ratified upon return to duty</p>
        </div>

        {/* 4. Medical Leave */}
        <div className="glass-card p-5 rounded-2xl border-purple-500/20 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Medical Leave</span>
            <span className="text-[10px] font-mono text-purple-400">Max {leave.medicalLeaveMax || 14}d</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-heading font-black text-purple-400">
              {leave.medicalLeave} <span className="text-xs font-normal text-slate-400">days</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleAdjust("medicalLeave", -1)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleAdjust("medicalLeave", 1)}
                className="w-8 h-8 rounded-lg bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all shadow-md shadow-purple-600/30"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">Backed by medical certificates</p>
        </div>
      </div>

      {/* No-Pay Absenteeism Red Alert Indicator */}
      <div className={`p-4 rounded-2xl border transition-all ${
        leave.noPayAbsenteeism > 0
          ? "bg-rose-950/40 border-rose-500/50 text-white"
          : "bg-slate-900/60 border-slate-800 text-slate-300"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              leave.noPayAbsenteeism > 0 ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-heading font-bold text-white">
                  No-Pay Absenteeism Status
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  leave.noPayAbsenteeism > 0 ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"
                }`}>
                  {leave.noPayAbsenteeism > 0 ? "Payroll Alert Active" : "Clean Record (0 Days)"}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Unauthorized absences trigger immediate daily rate salary deductions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-lg font-mono font-bold text-rose-400">
              {leave.noPayAbsenteeism} Days
            </span>
            <button
              onClick={() => handleAdjust("noPayAbsenteeism", -1)}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
            >
              -
            </button>
            <button
              onClick={() => handleAdjust("noPayAbsenteeism", 1)}
              className="w-7 h-7 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center text-xs"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Historical Leave Log */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-heading font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <FileCheck className="w-4 h-4 text-blue-400" />
          <span>Leave Request History & Approvals</span>
        </h3>

        <div className="space-y-3">
          {leave.leaveHistory?.map((hist: any, idx: number) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {hist.type}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400">
                    {hist.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {hist.startDate} to {hist.endDate} • Reason: {hist.reason || "Approved"}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-blue-400 self-start sm:self-auto">
                {hist.days} Day{hist.days > 1 ? "s" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
