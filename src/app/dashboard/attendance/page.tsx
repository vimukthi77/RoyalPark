"use client";

import React, { useEffect, useState } from "react";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Plus,
  TrendingDown,
  Calendar,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { InfoModal } from "@/components/InfoModal";

export default function AttendancePage() {
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);
  const [att, setAtt] = useState<any>({
    mtdLateArrivals: 2,
    totalMinutesLate: 28,
    monthsWithInfractions: 1,
    thresholdLimit: 3,
    complianceStatus: "Compliant",
    attendanceTrend: [],
    recentRecords: [],
  });

  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split("T")[0],
    checkInTime: "08:45 AM",
    expectedTime: "08:30 AM",
    delayMinutes: 15,
    reason: "Severe traffic congestion",
  });

  const fetchAttendance = async () => {
    try {
      const res = await fetch("/api/attendance");
      const data = await res.json();
      if (data.data) setAtt(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleSetThreshold = async (newLimit: number) => {
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "set_threshold", thresholdLimit: newLimit }),
      });
      const data = await res.json();
      if (data.success) setAtt(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogLate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "log_late_arrival", newRecord: newLog }),
      });
      const data = await res.json();
      if (data.success) {
        setAtt(data.data);
        setShowLogModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Average delay minutes per late instance
  const avgDelay = att.mtdLateArrivals > 0 ? Math.round(att.totalMinutesLate / att.mtdLateArrivals) : 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Policy Breach":
        return {
          bg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
          icon: ShieldAlert,
          label: "Policy Breach (Action Required)",
        };
      case "Watchlist":
        return {
          bg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          icon: AlertTriangle,
          label: "Threshold Watchlist",
        };
      default:
        return {
          bg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          icon: CheckCircle2,
          label: "Compliant (Within Policy)",
        };
    }
  };

  const statusBadge = getStatusBadge(att.complianceStatus || "Compliant");
  const StatusIcon = statusBadge.icon;

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Late Attendance & Punctuality
            </h1>
            <InfoModal
              title="Late Attendance Module Guide"
              overview="Monitors Month-to-Date (MTD) check-in delays, accumulated minutes, and enforces condominium punctuality thresholds with real-time status alerts."
              howToUse={[
                "Review the MTD Late Arrivals counter against the monthly allowance.",
                "Adjust the Policy Threshold Limit selector (e.g. 2, 3, or 5 allowed incidents).",
                "Observe the compliance badge automatically transition to Watchlist or Policy Breach if delays exceed threshold.",
                "Click '+ Log Late Arrival' to record a new check-in delay incident.",
              ]}
              tips={[
                "Breaching the monthly threshold prompts a HR advisory notice or escalation under the Disciplinary module.",
              ]}
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Month-to-Date delay counters, policy thresholds, and automated breach indicators.
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Late Arrival</span>
        </button>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: MTD Late Count */}
        <div className="glass-card p-5 rounded-2xl border-blue-500/20">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            MTD Late Arrivals
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-black text-white">
              {att.mtdLateArrivals}
            </span>
            <span className="text-xs text-slate-400">/ {att.thresholdLimit} Allowed</span>
          </div>
          <p className="text-[11px] text-blue-400 mt-1">
            {Math.max(0, att.thresholdLimit - att.mtdLateArrivals)} incidents remaining before breach
          </p>
        </div>

        {/* Card 2: Total Minutes Late */}
        <div className="glass-card p-5 rounded-2xl border-amber-500/20">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Accumulated Minutes Late
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-black text-amber-400">
              {att.totalMinutesLate}m
            </span>
            <span className="text-xs text-slate-400">Total</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Avg: {avgDelay} mins per late arrival
          </p>
        </div>

        {/* Card 3: Months with Infractions */}
        <div className="glass-card p-5 rounded-2xl border-purple-500/20">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Infraction Months (YTD)
          </span>
          <div className="mt-2 text-3xl font-heading font-black text-purple-400">
            {att.monthsWithInfractions}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Within annual allowable tolerance
          </p>
        </div>

        {/* Card 4: Compliance Status Badge */}
        <div className="glass-card p-5 rounded-2xl border-slate-700/50 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Policy Status
          </span>
          <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${statusBadge.bg}`}>
            <StatusIcon className="w-4 h-4" />
            <span>{statusBadge.label}</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Evaluated against Threshold Limit
          </p>
        </div>
      </div>

      {/* Dynamic Threshold Limit Configurator */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>Policy Threshold Limit Selector</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Set maximum tolerated unexcused late arrivals per month before triggering policy escalation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[2, 3, 4, 5].map((limit) => (
              <button
                key={limit}
                onClick={() => handleSetThreshold(limit)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                  att.thresholdLimit === limit
                    ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                }`}
              >
                {limit} Max
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delay Trend Chart */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-heading font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <TrendingDown className="w-4 h-4 text-sky-400" />
          <span>Attendance Delay History (Monthly Trends)</span>
        </h3>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={att.attendanceTrend || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "rgba(59,130,246,0.3)",
                  borderRadius: "12px",
                  color: "#F8FAFC",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="minutesLate"
                name="Delay (Minutes)"
                stroke="#3B82F6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#attGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Late Arrival Records Log */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-heading font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Recent Arrival Delay Records</span>
        </h3>

        <div className="space-y-3">
          {att.recentRecords?.map((rec: any, idx: number) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {rec.date}
                  </span>
                  <span className="text-xs text-rose-400 font-mono font-bold">
                    +{rec.delayMinutes} mins delay
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Checked in at {rec.checkInTime} (Target: {rec.expectedTime}) • {rec.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Log Late Arrival */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0F172A] border border-blue-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>Log Late Arrival Incident</span>
            </h3>
            <form onSubmit={handleLogLate} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Date</label>
                <input
                  type="date"
                  value={newLog.date}
                  onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Actual Check-In</label>
                  <input
                    type="text"
                    value={newLog.checkInTime}
                    onChange={(e) => setNewLog({ ...newLog, checkInTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Delay (Minutes)</label>
                  <input
                    type="number"
                    value={newLog.delayMinutes}
                    onChange={(e) => setNewLog({ ...newLog, delayMinutes: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Stated Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Detour due to marathon / road works"
                  value={newLog.reason}
                  onChange={(e) => setNewLog({ ...newLog, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Save Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
