"use client";

import React from "react";
import { NavigationLayoutProvider, useNavLayout } from "@/context/NavigationLayoutContext";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

function DashboardInnerShell({ children }: { children: React.ReactNode }) {
  const { navMode } = useNavLayout();

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 dark:bg-[#090D16] transition-colors duration-200">
      <DashboardHeader />
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto">
        <Sidebar />
        <main
          className={`flex-1 min-w-0 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
            navMode === "horizontal" ? "w-full" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <NavigationLayoutProvider>
      <DashboardInnerShell>{children}</DashboardInnerShell>
    </NavigationLayoutProvider>
  );
}

export default LayoutShell;
