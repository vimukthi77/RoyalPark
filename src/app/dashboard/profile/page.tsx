"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Briefcase,
  Users,
  Phone,
  Heart,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Building,
  Shield,
  Calendar,
} from "lucide-react";
import { InfoModal } from "@/components/InfoModal";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profile, setProfile] = useState<any>({
    fullName: "",
    email: "",
    roleTitle: "",
    workStatus: "Active",
    employmentType: "Permanent Full-Time",
    civilStatus: "Married",
    spouseFullName: "",
    spouseContactPhone: "",
    numberOfChildren: 0,
    childrenDetails: [],
    department: "Estate Management & Engineering",
    employeeId: "RPC-DIR-009",
    joinDate: "2019-03-15",
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setProfile(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
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

  const handleAddChild = () => {
    setProfile({
      ...profile,
      numberOfChildren: (profile.childrenDetails?.length || 0) + 1,
      childrenDetails: [...(profile.childrenDetails || []), { name: "", age: 1 }],
    });
  };

  const handleRemoveChild = (index: number) => {
    const updated = [...(profile.childrenDetails || [])];
    updated.splice(index, 1);
    setProfile({
      ...profile,
      numberOfChildren: updated.length,
      childrenDetails: updated,
    });
  };

  const handleChildChange = (index: number, field: string, value: any) => {
    const updated = [...(profile.childrenDetails || [])];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, childrenDetails: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header with Info Modal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Staff & Resident Profile
            </h1>
            <InfoModal
              title="Profile Module Guide"
              overview="Maintains comprehensive identity records for condominium leadership and staff. Stores employment status, roles, civil registry, spouse details, and dependants data synced with MongoDB."
              howToUse={[
                "Update personal demographics such as Full Name, Official Email, and Role Title.",
                "Toggle Work Status between Active and Inactive.",
                "Select Civil Status (Single, Married, Divorced, Widowed) and maintain spouse contact information.",
                "Use the '+ Add Child' button to append dependent children details (name and age).",
                "Click 'Save Profile Changes' to commit the updates directly to MongoDB Atlas.",
              ]}
              tips={[
                "All changes are instantly persisted and synchronized across payroll and benefits calculation engines.",
              ]}
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Personal, marital, and residential dependent credentials registry.
          </p>
        </div>

        {/* Save button in header */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          {saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Employment & Identification Overview */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>Official Employment Details</span>
            </h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/25">
              {profile.employeeId || "RPC-DIR-009"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName || ""}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                value={profile.email || ""}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Executive Role Title
              </label>
              <input
                type="text"
                value={profile.roleTitle || ""}
                onChange={(e) => setProfile({ ...profile, roleTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Work Status
              </label>
              <select
                value={profile.workStatus || "Active"}
                onChange={(e) => setProfile({ ...profile, workStatus: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="Active">Active Duty</option>
                <option value="Inactive">Inactive / On Leave</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Employment Type
              </label>
              <select
                value={profile.employmentType || "Permanent Full-Time"}
                onChange={(e) => setProfile({ ...profile, employmentType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="Permanent Full-Time">Permanent Full-Time</option>
                <option value="Contract">Fixed-Term Contract</option>
                <option value="Probation">Probationary Period</option>
                <option value="Part-Time">Part-Time Specialist</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Department
              </label>
              <input
                type="text"
                value={profile.department || "Estate Management & Engineering"}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Civil Status & Spouse Information */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span>Civil Status & Spouse Particulars</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Civil Status
              </label>
              <select
                value={profile.civilStatus || "Married"}
                onChange={(e) => setProfile({ ...profile, civilStatus: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Spouse Full Name
              </label>
              <input
                type="text"
                value={profile.spouseFullName || ""}
                onChange={(e) => setProfile({ ...profile, spouseFullName: e.target.value })}
                placeholder="Spouse Name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Spouse Contact Phone
              </label>
              <input
                type="text"
                value={profile.spouseContactPhone || ""}
                onChange={(e) => setProfile({ ...profile, spouseContactPhone: e.target.value })}
                placeholder="+94 77 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Dependent Children Details */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Dependent Children Details</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Total Children: {profile.childrenDetails?.length || 0}
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddChild}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Child</span>
            </button>
          </div>

          {(!profile.childrenDetails || profile.childrenDetails.length === 0) ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              No dependent children logged. Click &quot;Add Child&quot; to append a record.
            </div>
          ) : (
            <div className="space-y-3">
              {profile.childrenDetails.map((child: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Child's Full Name"
                      value={child.name || ""}
                      onChange={(e) => handleChildChange(idx, "name", e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Age"
                        value={child.age || ""}
                        onChange={(e) => handleChildChange(idx, "age", parseInt(e.target.value) || 0)}
                        min={0}
                        max={30}
                        className="w-24 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                      <span className="text-xs text-slate-400">years old</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveChild(idx)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-all"
                    title="Remove entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
