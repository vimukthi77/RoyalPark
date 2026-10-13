"use client";

import React, { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Percent,
  Sliders,
  Wallet,
  Clock,
  ArrowRight,
  Save,
  CheckCircle2,
  AlertCircle,
  PiggyBank,
} from "lucide-react";
import { InfoModal } from "@/components/InfoModal";
import { formatCurrency } from "@/lib/utils";

export default function PayrollPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [payroll, setPayroll] = useState<any>({
    annualBaseSalary: 115000,
    targetAnnualBonus: 22000,
    currency: "USD",
    loans: {
      totalLoans: 18000,
      pendingLoans: 1,
      remainingBalance: 9200,
      monthlyDeduction: 750,
    },
    overtime: {
      singleOTHours: 14,
      doubleOTHours: 6,
      estOTPaid: 1575,
    },
    taxBracketPercentage: 14,
    providentFundPercentage: 8,
  });

  useEffect(() => {
    fetch("/api/payroll")
      .then((res) => res.json())
      .then((res) => {
        if (res.data) setPayroll(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // OT Hourly Rates (Derived from Base Salary assuming 2080 annual working hours)
  const hourlyBaseRate = Math.round((payroll.annualBaseSalary || 115000) / 2080);
  const singleOTRate = hourlyBaseRate * 1.5;
  const doubleOTRate = hourlyBaseRate * 2.0;

  // Real-time calculated OT
  const calculatedOT = Math.round(
    (payroll.overtime?.singleOTHours || 0) * singleOTRate +
      (payroll.overtime?.doubleOTHours || 0) * doubleOTRate
  );

  // Monthly Financial Breakdown
  const monthlyBase = Math.round((payroll.annualBaseSalary || 0) / 12);
  const loanDeduction = payroll.loans?.monthlyDeduction || 0;
  const taxDeduction = Math.round(monthlyBase * ((payroll.taxBracketPercentage || 12) / 100));
  const epfDeduction = Math.round(monthlyBase * ((payroll.providentFundPercentage || 8) / 100));
  const estimatedNetSalary = monthlyBase + calculatedOT - loanDeduction - taxDeduction - epfDeduction;

  const handleSliderChange = (field: "singleOTHours" | "doubleOTHours", value: number) => {
    const updatedOT = {
      ...payroll.overtime,
      [field]: value,
    };
    const newEst = Math.round(
      (field === "singleOTHours" ? value : payroll.overtime.singleOTHours) * singleOTRate +
        (field === "doubleOTHours" ? value : payroll.overtime.doubleOTHours) * doubleOTRate
    );
    updatedOT.estOTPaid = newEst;

    setPayroll({
      ...payroll,
      overtime: updatedOT,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...payroll,
        overtime: {
          ...payroll.overtime,
          estOTPaid: calculatedOT,
        },
      };
      const res = await fetch("/api/payroll", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Payroll, Loans & Overtime Module
            </h1>
            <InfoModal
              title="Payroll & Overtime Module Guide"
              overview="Calculates condominium executive base earnings, annual incentives, active staff loan deductions, and dynamic 1.5x / 2.0x overtime computations."
              howToUse={[
                "Adjust Annual Base Salary and Target Annual Bonus in the executive compensation card.",
                "Inspect active facility loan accounts, pending installments, and fixed monthly deductions.",
                "Drag the Single OT (1.5x) and Double OT (2.0x) interactive sliders to simulate additional shift payouts.",
                "Review the Net Monthly Take-Home breakdown which factors taxes and retirement contributions.",
                "Click 'Save Payroll Settings' to update the MongoDB schema.",
              ]}
              tips={[
                "Single OT (1.5x) applies to weekdays past standard shift hours; Double OT (2.0x) applies to weekend emergency repairs and statutory holidays.",
              ]}
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compensation structures, interactive overtime multipliers & loan ledger.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          {saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Saved to DB!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Payroll Settings"}</span>
            </>
          )}
        </button>
      </div>

      {/* Top 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border-blue-500/20">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Annual Base Salary
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-heading font-black text-white">
            {formatCurrency(payroll.annualBaseSalary || 0)}
          </div>
          <p className="text-xs text-blue-400 mt-1">
            Base Monthly: {formatCurrency(monthlyBase)}
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border-emerald-500/20">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Target Annual Incentive
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-heading font-black text-emerald-400">
            {formatCurrency(payroll.targetAnnualBonus || 0)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Subject to Condominium KPI & Audits
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border-amber-500/20">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Estimated Net Monthly
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-heading font-black text-amber-400">
            {formatCurrency(estimatedNetSalary)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            After OT, Loans, EPF & Tax Deductions
          </p>
        </div>
      </div>

      {/* Interactive Overtime Sliders Card */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>Interactive Overtime (OT) Simulator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Standard base rate: ~${hourlyBaseRate}/hr • Single OT: ${singleOTRate}/hr (1.5x) • Double OT: ${doubleOTRate}/hr (2.0x)
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated OT Paid</span>
            <span className="text-lg font-heading font-bold text-emerald-400">
              +{formatCurrency(calculatedOT)}
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slider 1: Single OT */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Single OT Hours (1.5x Multiplier)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 font-mono font-bold text-xs">
                {payroll.overtime?.singleOTHours || 0} hrs
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={payroll.overtime?.singleOTHours || 0}
              onChange={(e) => handleSliderChange("singleOTHours", parseInt(e.target.value) || 0)}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0 hrs</span>
              <span className="text-blue-400">Payout: +{formatCurrency((payroll.overtime?.singleOTHours || 0) * singleOTRate)}</span>
              <span>60 hrs</span>
            </div>
          </div>

          {/* Slider 2: Double OT */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Double OT Hours (2.0x Multiplier)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold text-xs">
                {payroll.overtime?.doubleOTHours || 0} hrs
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={payroll.overtime?.doubleOTHours || 0}
              onChange={(e) => handleSliderChange("doubleOTHours", parseInt(e.target.value) || 0)}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0 hrs</span>
              <span className="text-amber-400">Payout: +{formatCurrency((payroll.overtime?.doubleOTHours || 0) * doubleOTRate)}</span>
              <span>40 hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financials & Staff Loans Ledger */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <PiggyBank className="w-4 h-4 text-purple-400" />
            <span>Staff Loans & Monthly Deductions</span>
          </h3>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
            {payroll.loans?.pendingLoans || 0} Active Loan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase font-medium">Principal Sanctioned</span>
            <div className="text-lg font-heading font-bold text-white mt-1">
              {formatCurrency(payroll.loans?.totalLoans || 0)}
            </div>
            <span className="text-[10px] text-slate-500">Corporate Staff Facility Loan</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase font-medium">Remaining Balance</span>
            <div className="text-lg font-heading font-bold text-amber-400 mt-1">
              {formatCurrency(payroll.loans?.remainingBalance || 0)}
            </div>
            <span className="text-[10px] text-slate-500">Scheduled payoff in 12 months</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase font-medium">Monthly Deduction</span>
            <div className="text-lg font-heading font-bold text-rose-400 mt-1">
              -{formatCurrency(payroll.loans?.monthlyDeduction || 0)}
            </div>
            <span className="text-[10px] text-slate-500">Auto-deducted from salary</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 uppercase font-medium">Statutory EPF & Tax</span>
            <div className="text-lg font-heading font-bold text-slate-300 mt-1">
              -{formatCurrency(taxDeduction + epfDeduction)}
            </div>
            <span className="text-[10px] text-slate-500">Tax {payroll.taxBracketPercentage}% • EPF {payroll.providentFundPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
