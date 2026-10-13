import {
  LayoutDashboard,
  User,
  BadgeDollarSign,
  GraduationCap,
  BookOpenCheck,
  Award,
  CalendarDays,
  Clock,
  AlertTriangle,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
  description: string;
}

export const navItems: NavItem[] = [
  {
    name: "Executive Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Real-time KPIs, attendance trends & financials",
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
    description: "Employee and family demographics registry",
  },
  {
    name: "Payroll & OT",
    href: "/dashboard/payroll",
    icon: BadgeDollarSign,
    description: "Base compensation, loans & overtime sliders",
  },
  {
    name: "Qualifications",
    href: "/dashboard/qualifications",
    icon: GraduationCap,
    description: "Academic degrees & professional certifications",
  },
  {
    name: "Training & Dev",
    href: "/dashboard/training",
    icon: BookOpenCheck,
    badge: "CPD 54",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    description: "Continuous professional development & audits",
  },
  {
    name: "Performance",
    href: "/dashboard/performance",
    icon: Award,
    description: "Annual ratings, 2023-2025 appraisal scores",
  },
  {
    name: "Leave Details",
    href: "/dashboard/leave",
    icon: CalendarDays,
    description: "Balance counters, increment actions & policies",
  },
  {
    name: "Late Attendance",
    href: "/dashboard/attendance",
    icon: Clock,
    badge: "MTD 2",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    description: "Delay calculations & policy breach thresholds",
  },
  {
    name: "Disciplinary",
    href: "/dashboard/disciplinary",
    icon: AlertTriangle,
    badge: "1 Active",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    description: "Warning letters, severity tiers & action logs",
  },
];
