import PageShell from "@/components/PageShell";
import Callout from "@/components/Callout";
import context from "@/data/context.json";
import evidence from "@/data/evidence.json";
import { Hammer, Sparkles, FileText, Boxes } from "lucide-react";

function StatGrid({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="card p-4">
          <div className="stat-number c-primary">{s.value}</div>
          <div className="text-base c-muted mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function CompanySection({ data }: { data: typeof evidence.adobe }) {
  return (
    <div className="mb-14">
      <h3 className="section-heading mb-1">{data.org}</h3>
      <p className="text-base c-muted mb-5">{data.role}</p>

      <div className="section-eyebrow mt-5">Scale</div>
      <div className="mb-5">
        <StatGrid stats={data.scale} />
      </div>

      <div className="section-eyebrow mt-5">Business impact</div>
      <div className="mb-5">
        <StatGrid stats={data.business} />
      </div>

      <p className="text-base leading-relaxed c-muted mt-4">{data.narrative}</p>
    </div>
  );
}

export default function HomePage() {
  const { hero, context: ctx, experience } = context;
  const { adobe, silverLabs, whitePaper, engineeringOS } = evidence;

  return (
    <PageShell>
      <div className="hero-eyebrow mb-3">{hero.eyebrow}</div>
      <h1 className="hero-title mb-5">{hero.title}</h1>
      <p className="prose-lede mb-16">{hero.lede}</p>

      <div className="section-eyebrow">{ctx.eyebrow}</div>
      <h2 className="section-heading mb-4">{ctx.heading}</h2>
      <p className="text-base leading-relaxed c-muted mb-10">{ctx.intro}</p>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="c-primary shrink-0" />
            <span className="font-semibold c-text">{ctx.sriram.heading}</span>
          </div>
          <div className="space-y-3">
            {ctx.sriram.points.map((p, i) => (
              <p key={i} className="text-base leading-relaxed c-muted">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Hammer size={18} className="c-primary shrink-0" />
            <span className="font-semibold c-text">{ctx.dv.heading}</span>
          </div>
          <div className="space-y-3">
            {ctx.dv.points.map((p, i) => (
              <p key={i} className="text-base leading-relaxed c-muted">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-20">
        <Callout>{ctx.closing}</Callout>
      </div>

      <div className="divider mb-16" />

      <div className="section-eyebrow">{experience.eyebrow}</div>
      <h2 className="section-heading mb-4">{experience.heading}</h2>
      {experience.paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed c-muted mb-4">
          {p}
        </p>
      ))}

      <div className="mt-10">
        <CompanySection data={adobe} />
        <CompanySection data={silverLabs} />
      </div>

      <div className="divider mb-16" />

      <div className="section-eyebrow">Research and practice</div>
      <h2 className="section-heading mb-8">
        Backing this up: published research and a working engineering discipline
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={18} className="c-primary shrink-0" />
            <span className="font-semibold c-text">{whitePaper.title}</span>
          </div>
          <div className="text-base c-dim mb-3">{whitePaper.venue}</div>
          <p className="text-base c-muted mb-3">{whitePaper.summary}</p>
          <p className="text-base c-text">{whitePaper.relevance}</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Boxes size={18} className="c-primary shrink-0" />
            <span className="font-semibold c-text">{engineeringOS.title}</span>
          </div>
          <p className="text-base c-muted mb-3">{engineeringOS.summary}</p>
          <p className="text-base c-text">{engineeringOS.relevance}</p>
        </div>
      </div>
    </PageShell>
  );
}
