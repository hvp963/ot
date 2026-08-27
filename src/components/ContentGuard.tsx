"use client";

import { useEffect } from "react";

export default function ContentGuard() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => e.preventDefault();
    const blockDragStart = (e: DragEvent) => e.preventDefault();
    const blockSelectStart = (e: Event) => e.preventDefault();
    const blockCopyCutKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (key === "c" || key === "x" || key === "s" || key === "p")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockDragStart);
    document.addEventListener("selectstart", blockSelectStart);
    document.addEventListener("keydown", blockCopyCutKeys);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockDragStart);
      document.removeEventListener("selectstart", blockSelectStart);
      document.removeEventListener("keydown", blockCopyCutKeys);
    };
  }, []);

  return null;
}
