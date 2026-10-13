"use client";

import React, { useEffect, useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Award,
  ShieldCheck,
  PlayCircle,
  TrendingUp,
  FileText,
  Calendar,
  Sparkles,
  Plus,
} from "lucide-react";
import { InfoModal } from "@/components/InfoModal";

export default function TrainingPage() {
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState<any>({
    earnedCredits: 54,
    complianceAudit: {
      compliantModules: 9,
      pendingActions: 1,
      overdueCount: 0,
    },
    completedPrograms: [],
    ongoingCourses: [],
    mandatoryCompliance: [],
  });

  const fetchTraining = async () => {
    try {
      const res = await fetch("/api/training");
      const data = await res.json();
      if (data.data) setTraining(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraining();
  }, []);

  const handleToggleCompliance = async (name: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Compliant" ? "Pending" : "Compliant";
    try {
      const res = await fetch("/api/training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_compliance_status",
          payload: { name, status: nextStatus },
        }),
      });
      const data = await res.json();
      if (data.success) setTraining(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCredit = async () => {
    try {
      const res = await fetch("/api/training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_credits",
          payload: { amount: 2 },
        }),
      });
      const data = await res.json();
      if (data.success) setTraining(data.data);
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
              Training & Professional Development
            </h1>
            <InfoModal
              title="Training & Compliance Development Guide"
              overview="Tracks Continuous Professional Development (CPD) hours, mandatory statutory audits (Information Security, Anti-Bribery, Fire Safety), and active executive course milestones."
              howToUse={[
                "Examine the CPD Earned Credits counter and use '+2 CPD Credits' to record certified hours.",
                "Review the Compliance Audit Summary for compliant vs pending legal and engineering checks.",
                "Check progress on Ongoing Courses to ensure high-rise operational readiness.",
                "Click on any Mandatory Compliance item status to toggle between 'Compliant' and 'Pending'.",
              ]}
              tips={[
                "Maintaining 100% compliance ensures Royal Park retains its 5-star condominium facility accreditation.",
              ]}
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Continuous development hours, regulatory audits, and skill growth metrics.
          </p>
        </div>

        <button
          onClick={handleAddCredit}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+2 CPD Credits</span>
        </button>
      </div>

      {/* Top Audit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border-blue-500/20">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Earned CPD Credits
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-black text-blue-400">
              {training.earnedCredits || 0}
            </span>
            <span className="text-xs text-slate-400">/ 60 Annual Goal</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${Math.min(100, ((training.earnedCredits || 0) / 60) * 100)}%` }}
            />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border-emerald-500/20">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Compliant Modules
          </span>
          <div className="mt-2 text-3xl font-heading font-black text-emerald-400">
            {training.complianceAudit?.compliantModules || 0}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Statutory standards verified
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border-amber-500/20">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Pending Actions
          </span>
          <div className="mt-2 text-3xl font-heading font-black text-amber-400">
            {training.complianceAudit?.pendingActions || 0}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Scheduled for Q4 review
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border-slate-700/50">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Overdue Audits
          </span>
          <div className="mt-2 text-3xl font-heading font-black text-slate-200">
            {training.complianceAudit?.overdueCount || 0}
          </div>
          <p className="text-xs text-emerald-400 mt-1">
            Zero overdue compliance gaps
          </p>
        </div>
      </div>

      {/* Mandatory Statutory Compliance Checklist */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Mandatory Legal & Environmental Standards</span>
          </h3>
          <span className="text-xs text-slate-400">Click badge to toggle status</span>
        </div>

        <div className="space-y-3">
          {training.mandatoryCompliance?.map((item: any, idx: number) => {
            const isCompliant = item.status === "Compliant";
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Next Due Date: {item.dueDate}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleCompliance(item.name, item.status)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                    isCompliant
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30"
                  }`}
                >
                  {item.status}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ongoing Executive Courses */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <PlayCircle className="w-4 h-4 text-blue-400" />
            <span>Ongoing Specialized Courses</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {training.ongoingCourses?.map((course: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  {course.instructor}
                </span>
                <span className="text-xs font-mono font-bold text-blue-400">
                  {course.progress}%
                </span>
              </div>
              <h4 className="text-sm font-heading font-bold text-white">
                {course.title}
              </h4>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>Target Completion:</span>
                <span className="text-slate-300 font-medium">{course.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Programs Log */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-heading font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Award className="w-4 h-4 text-purple-400" />
          <span>Completed Programs & Certifications Archive</span>
        </h3>

        <div className="space-y-3">
          {training.completedPrograms?.map((prog: any, idx: number) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">
                  {prog.title}
                </h4>
                <p className="text-[11px] text-slate-400">
                  Provider: {prog.provider} • Completed on {prog.completionDate}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-400 font-mono text-xs font-bold border border-purple-500/25 self-start sm:self-auto">
                Score: {prog.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
