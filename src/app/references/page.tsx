import PageShell from "@/components/PageShell";
import evidence from "@/data/evidence.json";
import operatingModel from "@/data/operating-model.json";
import pov from "@/data/pov.json";
import sections from "@/data/sections.json";
import Callout from "@/components/Callout";
import FlowDiagram from "@/components/FlowDiagram";
import { Quote, ExternalLink, CheckCircle2, Hammer, GitBranch } from "lucide-react";

const RESPONSIBILITY_ICONS = { build: Hammer, bridge: GitBranch };

export default function ReferencesPage() {
  const { references, profile } = evidence;

  return (
    <PageShell>
      <div className="section-eyebrow">{references.eyebrow}</div>
      <h1 className="section-heading mb-2">{references.heading}</h1>
      <p className="text-base c-muted mb-6">{references.intro}</p>

      <div className="grid lg:grid-cols-4 gap-4 mb-4 items-stretch">
        {references.items.map((r) => (
          <div key={r.author} className="card p-6 bl-primary-lg flex flex-col h-full">
            <Quote size={18} className="c-primary mb-2" />
            <p className="text-base leading-relaxed c-text italic mb-3">&ldquo;{r.quote}&rdquo;</p>
            <div className="text-base c-muted mt-auto">
              <div>
                <span className="font-semibold c-text">{r.author}</span>
                {r.detail ? `, ${r.detail}` : ""}
              </div>
              <div>
                {r.company}, {r.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-4 mb-4">
        <div className="card p-4 lg:col-span-3 text-center">
          <span className="text-base font-semibold c-muted">{references.titleCaptions[0].title}</span>
        </div>
        <div className="card p-4 text-center">
          <span className="text-base font-semibold c-muted">{references.titleCaptions[1].title}</span>
        </div>
      </div>

      <p className="text-base c-dim mb-6">{references.moreNote}</p>

      <a
        href={profile.href}
        target="_blank"
        rel="noopener noreferrer"
        className="card card-hover p-5 flex items-center justify-between mb-16"
      >
        <div className="font-semibold text-base c-text">{profile.title}</div>
        <ExternalLink size={18} className="c-primary shrink-0" />
      </a>

      <div className="divider mb-16" />

      <div className="section-eyebrow">Proposed operating model</div>
      <h2 className="section-heading mb-4">{operatingModel.heading}</h2>
      <p className="text-base leading-relaxed c-muted mb-8">
        {operatingModel.intro}
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-6 items-stretch">
        {operatingModel.responsibilities.map((r) => {
          const Icon = RESPONSIBILITY_ICONS[r.id as keyof typeof RESPONSIBILITY_ICONS];
          return (
            <div key={r.id} className="card p-6 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className="c-primary" />
                <span className="text-base font-semibold c-primary uppercase tracking-wide">
                  {r.label}
                </span>
              </div>
              <h3 className="section-heading mb-1 mt-1">{r.title}</h3>
              <div className="text-base c-muted mb-4">{r.reportingLine}</div>
              <p className="text-base c-muted mb-4">{r.summary}</p>
              <div className="space-y-2 mt-auto">
                {r.points.map((s) => (
                  <div key={s} className="flex items-start gap-2 text-base">
                    <CheckCircle2 size={15} className="c-green mt-0.5 shrink-0" />
                    <span className="c-text">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-6">
        <Callout text={operatingModel.closing.text} bold={operatingModel.closing.bold} />
      </div>

      <p className="text-base c-dim mb-4">
        <span className="font-semibold c-text">CPS</span> is Core Platform & Solutions, the
        current business. <span className="font-semibold c-text">AEP</span> is AI Platform &
        Emerging Products, the next business.
      </p>

      <div className="mb-4">
        {sections.businessCase.flows.map((flow) => (
          <FlowDiagram key={flow.title} title={flow.title} steps={flow.steps} />
        ))}
      </div>

      <p className="text-base leading-relaxed c-muted mb-16">
        Build runs the first flow. Bridge strengthens the second.
      </p>

      <div className="divider mb-16" />

      <div className="section-eyebrow">{pov.eyebrow}</div>
      <h2 className="section-heading mb-6">{pov.heading}</h2>
      {pov.paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed c-muted mb-4">
          {p}
        </p>
      ))}

      <div className="mt-10 mb-10">
        <div className="section-eyebrow">{pov.devLifecycle.eyebrow}</div>
        <h3 className="section-heading mb-4">{pov.devLifecycle.heading}</h3>
        {pov.devLifecycle.paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed c-muted mb-4">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10">
        <div className="section-eyebrow">{pov.close.eyebrow}</div>
        <h3 className="section-heading mb-4">{pov.close.heading}</h3>
        <Callout>{pov.close.statement}</Callout>
      </div>
    </PageShell>
  );
}
