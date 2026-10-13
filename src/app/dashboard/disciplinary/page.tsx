"use client";

import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Plus,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  UserCheck,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { InfoModal } from "@/components/InfoModal";

export default function DisciplinaryPage() {
  const [loading, setLoading] = useState(true);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [expandedWarning, setExpandedWarning] = useState<string | null>(null);
  const [disc, setDisc] = useState<any>({
    warningLetters: [],
  });

  // New Warning Form State
  const [newWarning, setNewWarning] = useState({
    warningId: `WL-2026-00${Math.floor(Math.random() * 90) + 10}`,
    title: "",
    issuedDate: new Date().toISOString().split("T")[0],
    severity: "Medium",
    status: "Active",
    reason: "",
    actionLogs: [
      {
        date: new Date().toISOString().split("T")[0],
        author: "Estate HR & Legal",
        note: "Formal notice issued and logged into residential management registry.",
      },
    ],
  });

  // Append Log Form State
  const [logNotes, setLogNotes] = useState<{ [key: string]: string }>({});

  const fetchDisciplinary = async () => {
    try {
      const res = await fetch("/api/disciplinary");
      const data = await res.json();
      if (data.data) setDisc(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisciplinary();
  }, []);

  const handleIssueWarning = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWarning.title || !newWarning.reason) return;
    try {
      const res = await fetch("/api/disciplinary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "issue_warning", warningLetter: newWarning }),
      });
      const data = await res.json();
      if (data.success) {
        setDisc(data.data);
        setShowIssueModal(false);
        setNewWarning({
          warningId: `WL-2026-00${Math.floor(Math.random() * 90) + 10}`,
          title: "",
          issuedDate: new Date().toISOString().split("T")[0],
          severity: "Medium",
          status: "Active",
          reason: "",
          actionLogs: [],
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAppendLog = async (warningId: string) => {
    const note = logNotes[warningId];
    if (!note) return;
    try {
      const logEntry = {
        date: new Date().toISOString().split("T")[0],
        author: "Management Committee",
        note,
      };
      const res = await fetch("/api/disciplinary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "append_log", warningId, logEntry }),
      });
      const data = await res.json();
      if (data.success) {
        setDisc(data.data);
        setLogNotes({ ...logNotes, [warningId]: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (warningId: string, status: string) => {
    try {
      const res = await fetch("/api/disciplinary", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ warningId, status }),
      });
      const data = await res.json();
      if (data.success) setDisc(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteWarning = async (warningId: string) => {
    try {
      const res = await fetch(`/api/disciplinary?warningId=${warningId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) setDisc(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      case "High":
        return "bg-orange-500/20 text-orange-300 border-orange-500/40";
      case "Medium":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Disciplinary Actions & Warning Notices
            </h1>
            <InfoModal
              title="Disciplinary Module Guide"
              overview="Records official caution notices, health & safety violations, sub-contractor breaches, and tracks follow-up corrective counseling milestones."
              howToUse={[
                "Click '+ Issue Warning' to draft an official caution letter with severity tier (Low, Medium, High, Critical).",
                "Expand any warning item to view past action logs and append new counseling notes in real time.",
                "Toggle status between Active, Expired, and Resolved to reflect staff performance turnaround.",
              ]}
              tips={[
                "Expired warning letters are retained in accordance with condominium statutory employment compliance laws.",
              ]}
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Active cautions, severity classifications, and corrective action logs.
          </p>
        </div>

        <button
          onClick={() => setShowIssueModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Issue Warning</span>
        </button>
      </div>

      {/* Warnings List */}
      <div className="space-y-4">
        {(!disc.warningLetters || disc.warningLetters.length === 0) ? (
          <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 text-xs">
            No disciplinary warnings recorded on file.
          </div>
        ) : (
          disc.warningLetters.map((w: any) => {
            const isExpanded = expandedWarning === w.warningId;
            const severityClass = getSeverityBadge(w.severity);
            const isActive = w.status === "Active";

            return (
              <div
                key={w.warningId}
                className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                {/* Warning Header Row */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {w.warningId}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${severityClass}`}>
                        {w.severity} Severity
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          isActive
                            ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        {w.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Issued: {w.issuedDate}
                      </span>
                    </div>

                    <h3 className="text-base font-heading font-bold text-white">
                      {w.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {w.reason}
                    </p>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    <select
                      value={w.status}
                      onChange={(e) => handleStatusChange(w.warningId, e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Expired">Expired</option>
                    </select>

                    <button
                      onClick={() => setExpandedWarning(isExpanded ? null : w.warningId)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all flex items-center gap-1.5"
                    >
                      <span>Action Logs ({w.actionLogs?.length || 0})</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleDeleteWarning(w.warningId)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expandable Action Logs Section */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                      <span>Counseling & Corrective Action Log History</span>
                    </h4>

                    <div className="space-y-2.5">
                      {w.actionLogs?.map((log: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-slate-400">
                            <span className="font-semibold text-blue-300">{log.author}</span>
                            <span className="font-mono">{log.date}</span>
                          </div>
                          <p className="text-slate-300 leading-snug">{log.note}</p>
                        </div>
                      ))}
                    </div>

                    {/* Append Log Input Form */}
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Append follow-up counseling or corrective milestone..."
                        value={logNotes[w.warningId] || ""}
                        onChange={(e) => setLogNotes({ ...logNotes, [w.warningId]: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() => handleAppendLog(w.warningId)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shrink-0"
                      >
                        Append Note
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Issue New Warning Letter */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0F172A] border border-rose-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>Issue Disciplinary Warning Notice</span>
            </h3>
            <form onSubmit={handleIssueWarning} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Warning Reference ID</label>
                  <input
                    type="text"
                    value={newWarning.warningId}
                    onChange={(e) => setNewWarning({ ...newWarning, warningId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={newWarning.issuedDate}
                    onChange={(e) => setNewWarning({ ...newWarning, issuedDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Incident Title</label>
                <input
                  type="text"
                  placeholder="e.g. Sub-Contractor Safety Induction Delay"
                  value={newWarning.title}
                  onChange={(e) => setNewWarning({ ...newWarning, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Severity Classification</label>
                  <select
                    value={newWarning.severity}
                    onChange={(e) => setNewWarning({ ...newWarning, severity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Low">Low (Notice of Caution)</option>
                    <option value="Medium">Medium (Written Warning)</option>
                    <option value="High">High (Severe Reprimand)</option>
                    <option value="Critical">Critical (Final Notice)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Status</label>
                  <select
                    value={newWarning.status}
                    onChange={(e) => setNewWarning({ ...newWarning, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Detailed Incident Reason</label>
                <textarea
                  rows={3}
                  placeholder="Describe the operational or safety breach, date, and observed evidence..."
                  value={newWarning.reason}
                  onChange={(e) => setNewWarning({ ...newWarning, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white"
                >
                  Confirm & Issue Warning
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
