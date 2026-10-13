"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  CalendarCheck,
  AlertOctagon,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  GraduationCap,
  Award,
  Clock,
  Sparkles,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { InfoModal } from "@/components/InfoModal";
import { formatCurrency } from "@/lib/utils";
import { navItems } from "@/components/navigationData";

export default function ExecutiveDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setData(res.data);
      })
      .catch((err) => console.error("Error fetching dashboard data:", err))
      .finally(() => setLoading(false));
  }, []);

  const kpi = data?.kpi || {
    totalApartments: 280,
    occupancyRate: 95.7,
    activeLeaveRequests: 3,
    pendingPolicyAlerts: 1,
    monthlyExpenses: 84500,
    monthlyPayrollTotal: 98400,
    tenantSatisfactionRate: 98.4,
  };

  const attendanceTrend = data?.attendanceTrend || [
    { month: "May", lateCount: 1, minutesLate: 12 },
    { month: "Jun", lateCount: 0, minutesLate: 0 },
    { month: "Jul", lateCount: 2, minutesLate: 24 },
    { month: "Aug", lateCount: 1, minutesLate: 15 },
    { month: "Sep", lateCount: 3, minutesLate: 45 },
    { month: "Oct", lateCount: 2, minutesLate: 28 },
  ];

  const leaveDistribution = data?.leaveDistribution || [
    { name: "Annual Leave", value: 15, color: "#3B82F6" },
    { name: "Casual Pre-Approved", value: 5, color: "#10B981" },
    { name: "Casual Post-Approved", value: 2, color: "#F59E0B" },
    { name: "Medical Leave", value: 12, color: "#8B5CF6" },
  ];

  const overtimeComparison = data?.overtimeComparison || [
    { name: "Base Monthly", amount: 9583 },
    { name: "Single OT (1.5x)", amount: 630 },
    { name: "Double OT (2.0x)", amount: 360 },
    { name: "Loan Deductions", amount: -750 },
  ];

  const performanceHistory = data?.performanceHistory || [
    { year: "2023", score: 93, tag: "Strong" },
    { year: "2024", score: 97, tag: "Exceeds" },
    { year: "2025", score: 95, tag: "Exceeds" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Header Banner with Guidance Icon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Executive Overview Dashboard
            </h1>
            <InfoModal
              title="Executive Overview Dashboard"
              overview="Centralized operational intelligence command center for Royal Park Condominium. It tracks residential occupancy, facilities staff metrics, overtime expenditure, leave balances, and attendance policy alerts."
              howToUse={[
                "Review real-time KPI metric cards at the top for immediate high-level health checks.",
                "Inspect the Attendance Trend Area Chart to spot seasonal delay patterns.",
                "Analyze the Overtime Cost breakdown and Leave Distribution donut chart for workforce optimization.",
                "Click on any Quick Shortcut card below to dive deep into that specific management sub-module.",
              ]}
              tips={[
                "Use the 'Sync DB' button in the top navigation bar to reset or re-seed sample data across all collections.",
                "Switch between Vertical Sidebar and Top Horizontal Navigation anytime via the layout toggle.",
              ]}
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time management intelligence for Royal Park Condominium Twin Towers.
          </p>
        </div>

        {/* Live Timestamp & Sync pill */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>FY 2026/Q4 • Active</span>
          </div>
        </div>
      </div>

      {/* 2. KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* KPI 1: Total Units & Occupancy */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Condominium Units
            </span>
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-black text-white">
              {kpi.totalApartments}
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              {kpi.occupancyRate}% Occupied
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            268 of 280 Twin Tower suites inhabited
          </p>
        </div>

        {/* KPI 2: Active Leave Requests */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Active Leave Requests
            </span>
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/25">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-black text-white">
              {kpi.activeLeaveRequests}
            </span>
            <span className="text-xs text-purple-400 font-medium">Pending Review</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            2 Casual Pre-Approved, 1 Medical Leave
          </p>
        </div>

        {/* KPI 3: Policy & Warning Alerts */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pending Policy Alerts
            </span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-black text-amber-400">
              {kpi.pendingPolicyAlerts}
            </span>
            <span className="text-xs text-amber-300 font-medium">Active Warning</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            WL-2026-001 Contractor Safety Induction
          </p>
        </div>

        {/* KPI 4: Monthly Expense & Payroll */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Monthly Ops & Payroll
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-black text-white">
              {formatCurrency(kpi.monthlyExpenses + kpi.monthlyPayrollTotal)}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Ops: {formatCurrency(kpi.monthlyExpenses)} • Payroll: {formatCurrency(kpi.monthlyPayrollTotal)}
          </p>
        </div>
      </div>

      {/* 3. Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Late Arrival & Attendance Trends (Area Chart) */}
        <div className="lg:col-span-2 glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                <span>Late Arrival & Attendance Delay Trends</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Last 6 Months
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Month-to-Date late arrival instances vs total accumulated minutes delayed.
              </p>
            </div>
            <Link
              href="/dashboard/attendance"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLateCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
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
                  fill="url(#colorMinutes)"
                />
                <Area
                  type="monotone"
                  dataKey="lateCount"
                  name="Late Instances"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorLateCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Leave Category Distribution (Donut Chart) */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-heading font-bold text-white">
                Leave Balance Allocation
              </h3>
              <Link
                href="/dashboard/leave"
                className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs text-slate-400">
              Active entitlement days breakdown across categories.
            </p>
          </div>

          <div className="h-48 sm:h-52 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leaveDistribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#F8FAFC",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
            {leaveDistribution.map((item: any) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate text-slate-300">{item.name}:</span>
                <span className="font-semibold text-white ml-auto">{item.value}d</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Second Row Charts: Overtime Cost & Annual Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Overtime Breakdown & Monthly Cashflow */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-heading font-bold text-white">
              Overtime Cost & Net Deductions ($)
            </h3>
            <Link
              href="/dashboard/payroll"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
            >
              <span>Payroll Module</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Base monthly compensation vs 1.5x Single OT, 2.0x Double OT and Loan Deductions.
          </p>

          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overtimeComparison} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  formatter={(val: any) => [`$${val}`, "Amount"]}
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderColor: "rgba(59,130,246,0.3)",
                    borderRadius: "12px",
                    color: "#F8FAFC",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Annual Performance Scores (2023 - 2025) */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-heading font-bold text-white">
              Annual Performance Appraisal History
            </h3>
            <Link
              href="/dashboard/performance"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
            >
              <span>Performance Module</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Audited executive ratings: 2023, 2024, and current FY 2025.
          </p>

          <div className="space-y-4 pt-2">
            {performanceHistory.map((item: any) => (
              <div key={item.year} className="space-y-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-bold text-white">Year {item.year} Evaluation</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {item.tag}
                    </span>
                    <span className="font-mono font-bold text-blue-400">{item.score}%</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Quick Action Shortcut Cards to All 8 Sub-Modules */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Condominium Management Sub-Modules</span>
          </h2>
          <span className="text-xs text-slate-400">Direct Navigation Shortcuts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {navItems
            .filter((item) => item.href !== "/dashboard")
            .map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className="glass-card p-4 rounded-2xl border-slate-800 hover:border-blue-500/40 flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    {module.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono border ${module.badgeColor}`}>
                        {module.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-heading font-bold text-white group-hover:text-blue-300 transition-colors flex items-center justify-between">
                      <span>{module.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {module.description}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
