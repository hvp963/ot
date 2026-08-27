"use client";

import { useEffect, useState } from "react";

const SUBSECTIONS = [
  { id: "mind-map", label: "Mind Map" },
  { id: "business-case", label: "Business Case & Scale" },
  { id: "full-architecture", label: "Full Architecture" },
  { id: "crosswalk", label: "Marketecture Crosswalk" },
];

export default function AppendixNav() {
  const [active, setActive] = useState(SUBSECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    SUBSECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="no-print sticky top-0 z-10 bg-surface-2/95 backdrop-blur border-b border-base -mx-6 px-6 py-3 mb-10 flex gap-1 overflow-x-auto">
      {SUBSECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`tab-btn whitespace-nowrap ${active === s.id ? "active" : ""}`}
        >
          {s.label}
        </a>
      ))}
    </div>
  );
}
