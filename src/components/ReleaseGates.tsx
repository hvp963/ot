import { GitPullRequestArrow, ShieldCheck, FileCheck2, ArrowRight } from "lucide-react";

type Gate = { name: string; detail: string };

const ICONS = [GitPullRequestArrow, ShieldCheck, FileCheck2];

export default function ReleaseGates({ gates }: { gates: Gate[] }) {
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-2">
      {gates.map((g, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <div key={g.name} className="flex items-center gap-2 flex-1">
            <div className="card p-4 flex-1 h-full">
              <Icon size={18} className="c-primary mb-2" />
              <div className="text-base font-semibold c-text">{g.name}</div>
              <div className="text-base c-muted mt-0.5">{g.detail}</div>
            </div>
            {i < gates.length - 1 && (
              <ArrowRight size={16} className="c-dim shrink-0 hidden md:block" />
            )}
          </div>
        );
      })}
    </div>
  );
}
