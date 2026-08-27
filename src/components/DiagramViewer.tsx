"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

type DiagramState = { label: string; file: string } | null;

const DiagramContext = createContext<{
  open: (label: string, file: string) => void;
} | null>(null);

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

function DiagramModal({ active, onClose }: { active: NonNullable<DiagramState>; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

  const zoomIn = () => setZoom((z) => clampZoom(z + ZOOM_STEP));
  const zoomOut = () =>
    setZoom((z) => {
      const next = clampZoom(z - ZOOM_STEP);
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
      return next;
    });
  const reset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => {
      const next = clampZoom(z - e.deltaY * 0.0015);
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom === MIN_ZOOM) return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.panX + dx, y: dragRef.current.panY + dy });
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-surface rounded-xl shadow-lg w-[95vw] h-[90vh] flex flex-col p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3 shrink-0">
          <span className="text-base font-semibold c-text">{active.label}</span>
          <div className="flex items-center gap-3">
            <button onClick={zoomOut} className="c-dim hover:c-text" aria-label="Zoom out" disabled={zoom === MIN_ZOOM}>
              <ZoomOut size={18} />
            </button>
            <span className="text-base c-muted w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={zoomIn} className="c-dim hover:c-text" aria-label="Zoom in" disabled={zoom === MAX_ZOOM}>
              <ZoomIn size={18} />
            </button>
            <button onClick={reset} className="c-dim hover:c-text" aria-label="Reset zoom">
              <RotateCcw size={16} />
            </button>
            <button onClick={onClose} className="c-dim hover:c-text ml-2" aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>
        <div
          className="flex-1 overflow-hidden rounded-lg bg-surface-2 flex items-center justify-center"
          style={{ cursor: zoom > MIN_ZOOM ? (dragRef.current ? "grabbing" : "grab") : "default" }}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <img
            src={active.file}
            alt={active.label}
            className="max-w-full max-h-full select-none"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: dragRef.current ? "none" : "transform 0.1s ease-out",
            }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

export function DiagramViewerProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<DiagramState>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <DiagramContext.Provider value={{ open: (label, file) => setActive({ label, file }) }}>
      {children}
      {active && <DiagramModal active={active} onClose={() => setActive(null)} />}
    </DiagramContext.Provider>
  );
}

export function useDiagramViewer() {
  const ctx = useContext(DiagramContext);
  if (!ctx) throw new Error("useDiagramViewer must be used within DiagramViewerProvider");
  return ctx;
}
