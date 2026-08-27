import PageShell from "@/components/PageShell";
import MindMapLoader from "@/components/MindMapLoader";
import AppendixNav from "@/components/AppendixNav";
import ArchitectureLayers from "@/components/ArchitectureLayers";
import CrosswalkTable from "@/components/CrosswalkTable";
import Callout from "@/components/Callout";
import FlowDiagram from "@/components/FlowDiagram";
import HighlightedText from "@/components/HighlightedText";
import ProtectedImage from "@/components/ProtectedImage";
import sections from "@/data/sections.json";
import architecture from "@/data/architecture.json";

export default function AppendixPage() {
  const { businessCase, scaleProposal } = sections;
  const { intro, bridgeCrosswalk, workSample } = architecture;

  return (
    <PageShell>
      <div className="section-eyebrow">Appendix</div>
      <h1 className="section-heading mb-2">Supporting detail</h1>
      <p className="text-base c-muted mb-8">
        Extended material behind the main narrative, kept here as supporting reference.
      </p>

      <AppendixNav />

      <section id="mind-map" className="mb-20 scroll-mt-20">
        <div className="section-eyebrow">Map of this proposal</div>
        <h2 className="section-heading mb-2">Mind Map</h2>
        <p className="text-base c-muted mb-6">Click any node to explore. Scroll and drag to navigate.</p>
        <MindMapLoader />
      </section>

      <section id="business-case" className="mb-20 scroll-mt-20">
        <div className="section-eyebrow">{businessCase.eyebrow}</div>
        <h2 className="section-heading mb-6">{businessCase.heading}</h2>

        {businessCase.paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed c-muted mb-4">
            {p}
          </p>
        ))}

        <div className="mt-8 mb-6">
          {businessCase.flows.map((flow) => (
            <FlowDiagram key={flow.title} title={flow.title} steps={flow.steps} />
          ))}
        </div>

        <div className="mb-14">
          <Callout>{businessCase.closing}</Callout>
        </div>

        <div className="section-eyebrow">{scaleProposal.eyebrow}</div>
        <h3 className="section-heading mb-4">{scaleProposal.heading}</h3>
        <p className="text-base leading-relaxed c-muted mb-8">{scaleProposal.intro}</p>

        <div className="relative pl-6 mb-10">
          <div className="timeline-rail absolute left-0 top-1 bottom-1" />
          {scaleProposal.milestones.map((m) => (
            <div key={m.period} className="relative mb-8 pl-6">
              <div className="absolute -left-[calc(1.5rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="text-base font-semibold c-primary uppercase tracking-wide mb-1">
                {m.period}
              </div>
              <ul className="text-base c-muted space-y-1 mb-2">
                {m.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {m.target && <div className="text-base font-semibold c-text">{m.target}</div>}
            </div>
          ))}
        </div>

        <div className="card bl-primary-lg p-6">
          <h3 className="section-heading mb-2">{scaleProposal.governanceGraph.heading}</h3>
          <p className="text-base c-muted mb-4">{scaleProposal.governanceGraph.description}</p>
          <div className="flex flex-wrap gap-2">
            {scaleProposal.governanceGraph.outcomes.map((o) => (
              <span key={o} className="badge bg-primary-soft c-primary">
                {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="full-architecture" className="mb-20 scroll-mt-20">
        <div className="section-eyebrow">{intro.eyebrow}</div>
        <h2 className="section-heading mb-4">{intro.heading}</h2>
        {intro.paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed c-muted mb-4">
            <HighlightedText text={p} bold={["CPS", "AEP"]} />
          </p>
        ))}

        <div className="flex flex-wrap gap-3 my-6">
          <span className="badge bg-primary-soft c-primary border border-primary-soft">CPS — existing, in production</span>
          <span className="badge bg-amber-soft c-amber border border-amber-soft">AEP — new, built by this function</span>
          <span className="badge bg-green-soft c-green border border-green-soft">Dual — shared contract or substrate</span>
        </div>

        <div className="mt-8">
          <ArchitectureLayers />
        </div>

        <div className="mt-10">
          <div className="section-eyebrow">{workSample.eyebrow}</div>
          <h3 className="section-heading mb-3">{workSample.heading}</h3>
          <p className="text-base leading-relaxed c-muted mb-4">{workSample.description}</p>
          <p className="text-base leading-relaxed c-muted mb-6">{workSample.evolutionNote}</p>
          <div className="space-y-6">
            <figure className="card p-3">
              <ProtectedImage
                src="/diagrams/architecture-evolution-summary6.png"
                alt="Where the three architectures actually diverge"
                className="w-full rounded-lg border border-base select-none"
              />
              <figcaption className="text-base c-dim mt-2 px-2">
                Where the three architectures diverge: traditional ML, current-generation GenAI, and agentic orchestration.
              </figcaption>
            </figure>
            <figure className="card p-3">
              <ProtectedImage
                src="/diagrams/architecture-evolution-details6.png"
                alt="Full architecture evolution matrix"
                className="w-full rounded-lg border border-base select-none"
              />
              <figcaption className="text-base c-dim mt-2 px-2">
                The full evolution matrix: sixteen capability rows.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="crosswalk" className="mb-20 scroll-mt-20">
        <div className="section-eyebrow">{bridgeCrosswalk.eyebrow}</div>
        <h2 className="section-heading mb-3">{bridgeCrosswalk.heading}</h2>
        <p className="text-base leading-relaxed c-muted mb-6">{bridgeCrosswalk.description}</p>
        <CrosswalkTable />
      </section>
    </PageShell>
  );
}
