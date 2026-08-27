"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Network, Award, ChevronLeft, ChevronRight } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Context & Experience", icon: Compass },
  { href: "/architecture", label: "Architecture", icon: Network },
  { href: "/references", label: "References & POV", icon: Award },
];

const STORAGE_KEY = "ot-nav-collapsed";

export default function NavRail() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {}
  }, []);

  const toggle = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {}
      window.dispatchEvent(new Event("nav-collapse-change"));
      return next;
    });
  };

  return (
    <nav
      className={`no-print fixed left-0 top-0 h-screen border-r border-base bg-surface flex flex-col py-6 px-3 z-20 transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="px-3 mb-8 overflow-hidden">
        <div className="font-display font-bold text-sm c-text whitespace-nowrap">
          {collapsed ? "OT" : "OneTrust"}
        </div>
        {!collapsed && <div className="text-xs c-dim whitespace-nowrap">AI Platform Proposal</div>}
      </div>
      <div className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`nav-rail-item ${active ? "active" : ""} ${collapsed ? "justify-center px-0" : ""}`}
            >
              <Icon size={16} strokeWidth={2} className="shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </div>
      {!collapsed && (
        <div className="mt-auto px-3 text-xs c-dim whitespace-nowrap">
          Prepared by Haresh Parekh
        </div>
      )}

      <button
        onClick={toggle}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full border border-base bg-surface flex items-center justify-center c-dim hover:c-text shadow-sm"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </nav>
  );
}
