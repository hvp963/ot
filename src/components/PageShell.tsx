"use client";

import { useEffect, useState } from "react";
import NavRail from "./NavRail";

const STORAGE_KEY = "ot-nav-collapsed";

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {}

    const onStorage = () => {
      try {
        setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
      } catch {}
    };
    window.addEventListener("nav-collapse-change", onStorage);
    return () => window.removeEventListener("nav-collapse-change", onStorage);
  }, []);

  return (
    <div className="min-h-screen">
      <NavRail />
      <main className={`transition-[padding] duration-200 ${collapsed ? "pl-16" : "pl-60"}`}>
        <div className="w-[90%] mx-auto px-6 py-16">{children}</div>
      </main>
    </div>
  );
}
