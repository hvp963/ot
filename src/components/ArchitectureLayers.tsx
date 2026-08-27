"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import architecture from "@/data/architecture.json";

type Component = { name: string; detail: string; example: string };
type ModuleObj = { name: string; tagline?: string; components: Component[] };
type Layer = (typeof architecture.layers)[number];

function ownerClasses(owner: string) {
  if (owner === "CPS") return "bg-primary-soft c-primary border-primary-soft";
  if (owner === "AEP") return "bg-amber-soft c-amber border-amber-soft";
  return "bg-green-soft c-green border-green-soft";
}

function isModuleObj(m: string | ModuleObj): m is ModuleObj {
  return typeof m === "object";
}

function ModuleDetail({ mod }: { mod: ModuleObj }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-base rounded-lg bg-surface-2 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left"
      >
        <div>
          <div className="text-sm font-semibold c-text">{mod.name}</div>
          {mod.tagline && <div className="text-xs c-dim">{mod.tagline}</div>}
        </div>
        {open ? <ChevronDown size={16} className="c-muted shrink-0" /> : <ChevronRight size={16} className="c-muted shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in">
          {mod.components.map((c) => (
            <div key={c.name} className="bl-amber pl-3">
              <div className="text-sm font-medium c-text">{c.name}</div>
              <div className="text-xs c-muted">{c.detail}</div>
              <div className="text-xs c-dim italic mt-0.5">{c.example}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LayerCard({ layer }: { layer: Layer }) {
  const [expanded, setExpanded] = useState(false);
  const hasRichModules = layer.modules.length > 0 && isModuleObj(layer.modules[0] as string | ModuleObj);

  return (
    <div className="card p-5 mb-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="section-heading c-dim">{layer.number}</span>
          <div>
            <h3 className="section-heading">{layer.title}</h3>
            <p className="text-base c-muted mt-0.5">{layer.description}</p>
          </div>
        </div>
        <span className={`badge border ${ownerClasses(layer.owner)} shrink-0`}>{layer.owner}</span>
      </div>

      {hasRichModules ? (
        <div className="space-y-2 mt-4">
          {(layer.modules as ModuleObj[]).map((mod) => (
            <ModuleDetail key={mod.name} mod={mod} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-3">
          {(layer.modules as string[]).map((m) => (
            <span key={m} className="badge bg-surface-3 c-text border border-base">
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ArchitectureLayers() {
  return (
    <div>
      {architecture.layers.map((layer) => (
        <LayerCard key={layer.id} layer={layer} />
      ))}
    </div>
  );
}
