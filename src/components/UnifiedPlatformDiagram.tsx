import { Layers } from "lucide-react";

type UnifiedPlatformDiagramProps = {
  businesses: string[];
  platform: { label: string; note: string };
};

export default function UnifiedPlatformDiagram({ businesses, platform }: UnifiedPlatformDiagramProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid grid-cols-3 gap-3 w-full">
        {businesses.map((b) => (
          <div key={b} className="card p-4 text-center">
            <div className="text-base font-semibold c-text">{b}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1 py-1">
        <div className="w-px h-4 bg-[var(--border-bright)]" />
      </div>
      <div className="card bl-primary-lg p-5 w-full flex items-center gap-3">
        <Layers size={18} className="c-primary shrink-0" />
        <div>
          <div className="text-base font-semibold c-text">{platform.label}</div>
          <div className="text-base c-muted mt-0.5">{platform.note}</div>
        </div>
      </div>
    </div>
  );
}
