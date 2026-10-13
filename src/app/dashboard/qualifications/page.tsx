"use client";

import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  Award,
  Plus,
  Trash2,
  Calendar,
  Building,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { InfoModal } from "@/components/InfoModal";

export default function QualificationsPage() {
  const [loading, setLoading] = useState(true);
  const [quals, setQuals] = useState<any>({
    educationalDegrees: [],
    certifications: [],
  });

  // Modal / Form States
  const [showAddDegree, setShowAddDegree] = useState(false);
  const [newDegree, setNewDegree] = useState({ degree: "", institution: "", year: new Date().getFullYear() });

  const [showAddCert, setShowAddCert] = useState(false);
  const [newCert, setNewCert] = useState({ title: "", authority: "", issueDate: "", credentialId: "" });

  const fetchQuals = async () => {
    try {
      const res = await fetch("/api/qualifications");
      const data = await res.json();
      if (data.data) setQuals(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuals();
  }, []);

  const handleAddDegree = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDegree.degree || !newDegree.institution) return;
    try {
      const res = await fetch("/api/qualifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "degree", item: newDegree }),
      });
      const data = await res.json();
      if (data.success) {
        setQuals(data.data);
        setShowAddDegree(false);
        setNewDegree({ degree: "", institution: "", year: new Date().getFullYear() });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDegree = async (index: number) => {
    try {
      const res = await fetch(`/api/qualifications?type=degree&index=${index}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) setQuals(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.authority) return;
    try {
      const res = await fetch("/api/qualifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "certification", item: newCert }),
      });
      const data = await res.json();
      if (data.success) {
        setQuals(data.data);
        setShowAddCert(false);
        setNewCert({ title: "", authority: "", issueDate: "", credentialId: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCert = async (index: number) => {
    try {
      const res = await fetch(`/api/qualifications?type=certification&index=${index}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) setQuals(data.data);
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
              Qualifications & Credentials
            </h1>
            <InfoModal
              title="Qualifications Module Guide"
              overview="Maintains audited academic degrees and professional certifications for engineering, safety, and condominium management personnel."
              howToUse={[
                "Click '+ Add Degree' to enter a degree title, university institution, and graduation year.",
                "Click '+ Add Certification' to register professional licenses (e.g. IFMA CFM, LEED AP, NFPA Safety).",
                "Click the trash icon next to any entry to remove it from the MongoDB database.",
              ]}
              tips={[
                "Accredited credentials boost the Condominium's ISO 9001 and high-rise fire safety compliance ratings.",
              ]}
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Academic degrees and certified professional licensure records.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowAddDegree(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Degree</span>
          </button>
          <button
            onClick={() => setShowAddCert(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>
      </div>

      {/* 1. Educational Degrees List */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-white">
                Educational Degrees
              </h3>
              <p className="text-xs text-slate-400">
                {quals.educationalDegrees?.length || 0} Higher Education Degrees Listed
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quals.educationalDegrees?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all flex items-start justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/25">
                  Graduated {item.year}
                </span>
                <h4 className="text-sm font-heading font-bold text-white pt-1">
                  {item.degree}
                </h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.institution}</span>
                </p>
              </div>
              <button
                onClick={() => handleDeleteDegree(idx)}
                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                title="Delete degree record"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Professional Certifications List */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-white">
                Professional Certifications & Licenses
              </h3>
              <p className="text-xs text-slate-400">
                {quals.certifications?.length || 0} Industry Accreditations
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quals.certifications?.map((cert: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    Issued {cert.issueDate}
                  </span>
                  <button
                    onClick={() => handleDeleteCert(idx)}
                    className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete certification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-white">
                  {cert.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {cert.authority}
                </p>
              </div>

              {cert.credentialId && (
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>ID:</span>
                  <span className="text-slate-300 font-semibold">{cert.credentialId}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Add Educational Degree */}
      {showAddDegree && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0F172A] border border-blue-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span>Add Educational Degree</span>
            </h3>
            <form onSubmit={handleAddDegree} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Degree Name</label>
                <input
                  type="text"
                  placeholder="e.g. B.Sc. Civil Engineering"
                  value={newDegree.degree}
                  onChange={(e) => setNewDegree({ ...newDegree, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Institution / University</label>
                <input
                  type="text"
                  placeholder="e.g. University of Moratuwa"
                  value={newDegree.institution}
                  onChange={(e) => setNewDegree({ ...newDegree, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Year of Graduation</label>
                <input
                  type="number"
                  value={newDegree.year}
                  onChange={(e) => setNewDegree({ ...newDegree, year: parseInt(e.target.value) || 2020 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDegree(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Save Degree
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Certification */}
      {showAddCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0F172A] border border-emerald-500/30 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Add Professional Certification</span>
            </h3>
            <form onSubmit={handleAddCert} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Certification Title</label>
                <input
                  type="text"
                  placeholder="e.g. Certified Facility Manager (CFM)"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Issuing Authority</label>
                <input
                  type="text"
                  placeholder="e.g. IFMA"
                  value={newCert.authority}
                  onChange={(e) => setNewCert({ ...newCert, authority: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={newCert.issueDate}
                    onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Credential ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. CFM-9901"
                    value={newCert.credentialId}
                    onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCert(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
