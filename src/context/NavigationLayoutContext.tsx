"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type NavMode = "vertical" | "horizontal";

interface NavContextType {
  navMode: NavMode;
  setNavMode: (mode: NavMode) => void;
  toggleNavMode: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const NavContext = createContext<NavContextType>({
  navMode: "vertical",
  setNavMode: () => {},
  toggleNavMode: () => {},
  sidebarOpen: true,
  setSidebarOpen: () => {},
  toggleSidebar: () => {},
});

export function NavigationLayoutProvider({ children }: { children: React.ReactNode }) {
  const [navMode, setNavModeState] = useState<NavMode>("vertical");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem("rpc_nav_layout_mode") as NavMode | null;
    if (saved === "vertical" || saved === "horizontal") {
      setNavModeState(saved);
    }
  }, []);

  const setNavMode = (mode: NavMode) => {
    setNavModeState(mode);
    localStorage.setItem("rpc_nav_layout_mode", mode);
  };

  const toggleNavMode = () => {
    const nextMode = navMode === "vertical" ? "horizontal" : "vertical";
    setNavMode(nextMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <NavContext.Provider
      value={{
        navMode,
        setNavMode,
        toggleNavMode,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export const useNavLayout = () => useContext(NavContext);
