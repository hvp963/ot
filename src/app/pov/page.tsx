import PageShell from "@/components/PageShell";
import Callout from "@/components/Callout";
import FlowDiagram from "@/components/FlowDiagram";
import OrgChart from "@/components/OrgChart";
import ReleaseGates from "@/components/ReleaseGates";
import UnifiedPlatformDiagram from "@/components/UnifiedPlatformDiagram";
import org from "@/data/org-architecture.json";

export default function POVPage() {
  const { hero, intro, flows, orgChart, releaseEngineering, unifiedPlatform, bmad, closing } = org;

  return (
    <PageShell>
      <div className="hero-eyebrow mb-3">{hero.eyebrow}</div>
      <h1 className="hero-title mb-5">{hero.heading}</h1>
      <p className="prose-lede mb-12">{hero.lede}</p>

      <div className="section-eyebrow">{intro.eyebrow}</div>
      <h2 className="section-heading mb-4">{intro.heading}</h2>
      {intro.paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed c-muted mb-4">
          {p}
        </p>
      ))}

      <div className="grid md:grid-cols-2 gap-4 mt-6 mb-16">
        {flows.map((flow) => (
          <FlowDiagram key={flow.title} title={flow.title} steps={flow.steps} />
        ))}
      </div>

      <div className="divider mb-16" />

      <div className="section-eyebrow">{orgChart.eyebrow}</div>
      <h2 className="section-heading mb-2">{orgChart.heading}</h2>
      <p className="text-base c-muted mb-8">{orgChart.description}</p>
      <OrgChart build={orgChart.build} grow={orgChart.grow} />

      <div className="divider my-16" />

      <div className="section-eyebrow">{releaseEngineering.eyebrow}</div>
      <h2 className="section-heading mb-2">{releaseEngineering.heading}</h2>
      <p className="text-base c-muted mb-6">{releaseEngineering.description}</p>
      <ReleaseGates gates={releaseEngineering.gates} />

      <div className="divider my-16" />

      <div className="section-eyebrow">{unifiedPlatform.eyebrow}</div>
      <h2 className="section-heading mb-2">{unifiedPlatform.heading}</h2>
      <p className="text-base c-muted mb-8">{unifiedPlatform.description}</p>
      <UnifiedPlatformDiagram businesses={unifiedPlatform.businesses} platform={unifiedPlatform.platform} />

      <div className="divider my-16" />

      <div className="section-eyebrow">{bmad.eyebrow}</div>
      <h2 className="section-heading mb-4">{bmad.heading}</h2>
      {bmad.paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed c-muted mb-4">
          {p}
        </p>
      ))}

      <div className="mt-10">
        <Callout text={closing.text} bold={closing.bold} />
      </div>
    </PageShell>
  );
}
