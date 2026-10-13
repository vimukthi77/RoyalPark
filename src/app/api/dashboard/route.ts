import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import Leave from "@/models/Leave";
import Payroll from "@/models/Payroll";
import Performance from "@/models/Performance";
import Disciplinary from "@/models/Disciplinary";
import { defaultDashboardStats, defaultAttendanceData, defaultPayrollData } from "@/lib/mockData";

export async function GET() {
  try {
    await connectToDatabase();
    const [att, leave, payroll, perf, disc] = await Promise.all([
      Attendance.findOne().lean(),
      Leave.findOne().lean(),
      Payroll.findOne().lean(),
      Performance.findOne().lean(),
      Disciplinary.findOne().lean(),
    ]);

    const activeWarnings =
      disc?.warningLetters?.filter((w: any) => w.status === "Active")?.length ?? 1;

    const data = {
      kpi: {
        totalApartments: defaultDashboardStats.totalApartments,
        occupancyRate: defaultDashboardStats.occupancyRate,
        activeLeaveRequests: leave?.leaveHistory?.filter((l: any) => l.status === "Pending")?.length ?? 3,
        pendingPolicyAlerts: activeWarnings,
        monthlyExpenses: defaultDashboardStats.monthlyExpenses,
        monthlyPayrollTotal: payroll?.annualBaseSalary
          ? Math.round(payroll.annualBaseSalary / 12 + (payroll.overtime?.estOTPaid || 0))
          : defaultDashboardStats.monthlyPayrollTotal,
        tenantSatisfactionRate: perf?.tenantSatisfactionRate ?? 98.4,
      },
      attendanceTrend: att?.attendanceTrend || defaultAttendanceData.attendanceTrend,
      leaveDistribution: [
        { name: "Annual Leave", value: leave?.annualLeave ?? 15, color: "#3B82F6" },
        { name: "Casual Pre-Approved", value: leave?.casualPreApproved ?? 5, color: "#10B981" },
        { name: "Casual Post-Approved", value: leave?.casualPostApproved ?? 2, color: "#F59E0B" },
        { name: "Medical Leave", value: leave?.medicalLeave ?? 12, color: "#8B5CF6" },
      ],
      overtimeComparison: [
        { name: "Base Monthly", amount: Math.round((payroll?.annualBaseSalary || 115000) / 12) },
        { name: "Single OT (1.5x)", amount: (payroll?.overtime?.singleOTHours || 14) * 45 },
        { name: "Double OT (2.0x)", amount: (payroll?.overtime?.doubleOTHours || 6) * 60 },
        { name: "Loan Deductions", amount: -(payroll?.loans?.monthlyDeduction || 750) },
      ],
      performanceHistory: [
        { year: "2023", score: perf?.ratings?.year2023?.score ?? 93, tag: perf?.ratings?.year2023?.tag ?? "Strong" },
        { year: "2024", score: perf?.ratings?.year2024?.score ?? 97, tag: perf?.ratings?.year2024?.tag ?? "Exceeds" },
        { year: "2025", score: perf?.ratings?.year2025?.score ?? 95, tag: perf?.ratings?.year2025?.tag ?? "Exceeds" },
      ],
    };

    return NextResponse.json({ success: true, data, source: "mongodb" });
  } catch (error: any) {
    console.warn("MongoDB fetch warning (Dashboard):", error?.message);
    return NextResponse.json({
      success: true,
      data: {
        kpi: defaultDashboardStats,
        attendanceTrend: defaultAttendanceData.attendanceTrend,
        leaveDistribution: [
          { name: "Annual Leave", value: 15, color: "#3B82F6" },
          { name: "Casual Pre-Approved", value: 5, color: "#10B981" },
          { name: "Casual Post-Approved", value: 2, color: "#F59E0B" },
          { name: "Medical Leave", value: 12, color: "#8B5CF6" },
        ],
        overtimeComparison: [
          { name: "Base Monthly", amount: 9583 },
          { name: "Single OT (1.5x)", amount: 630 },
          { name: "Double OT (2.0x)", amount: 360 },
          { name: "Loan Deductions", amount: -750 },
        ],
        performanceHistory: [
          { year: "2023", score: 93, tag: "Strong" },
          { year: "2024", score: 97, tag: "Exceeds" },
          { year: "2025", score: 95, tag: "Exceeds" },
        ],
      },
      source: "fallback",
      error: error?.message,
    });
  }
}
