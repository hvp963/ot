import { ArrowRight } from "lucide-react";

export default function FlowDiagram({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="card p-5 mb-4">
      <div className="text-base font-semibold c-muted mb-3 uppercase tracking-wide">{title}</div>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            <span
              className={`badge ${
                step === "AEP" || step === "CPS + AEP"
                  ? "bg-primary-soft c-primary"
                  : "bg-surface-3 c-text"
              }`}
            >
              {step}
            </span>
            {i < steps.length - 1 && <ArrowRight size={14} className="c-dim" />}
          </span>
        ))}
      </div>
    </div>
  );
}
