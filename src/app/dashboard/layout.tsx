import React from "react";
import { LayoutShell } from "@/components/LayoutShell";

export const metadata = {
  title: "Dashboard | Royal Park Condominium",
  description: "Executive Overview & Facility Management Modules",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutShell>{children}</LayoutShell>;
}
