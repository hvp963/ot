"use client";

import dynamic from "next/dynamic";

const MindMap = dynamic(() => import("./MindMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "620px" }}
      className="rounded-xl border border-base bg-surface-2 flex items-center justify-center text-sm c-dim"
    >
      Loading map…
    </div>
  ),
});

export default function MindMapLoader() {
  return <MindMap />;
}
