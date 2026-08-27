"use client";

import PageShell from "@/components/PageShell";
import links from "@/data/architecture-links.json";
import HighlightedText from "@/components/HighlightedText";
import { useDiagramViewer } from "@/components/DiagramViewer";
import { FileImage, Eye } from "lucide-react";

function LinkCard({ label, file, note }: { label: string; file: string; note: string }) {
  const { open } = useDiagramViewer();
  return (
    <button
      onClick={() => open(label, file)}
      className="card card-hover p-5 flex items-start gap-4 text-left w-full"
    >
      <div className="w-10 h-10 rounded-lg bg-primary-soft flex items-center justify-center shrink-0">
        <FileImage size={18} className="c-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-base c-text">{label}</div>
        <div className="text-base c-muted mt-1">{note}</div>
      </div>
      <Eye size={18} className="c-dim shrink-0 mt-1" />
    </button>
  );
}

export default function ArchitecturePage() {
  const { intro, functional, technical } = links;

  return (
    <PageShell>
      <div className="section-eyebrow">{intro.eyebrow}</div>
      <h1 className="section-heading mb-6">{intro.heading}</h1>
      {intro.paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed c-muted mb-4">
          {p}
        </p>
      ))}

      <div className="grid lg:grid-cols-2 gap-10 mt-12">
        <div>
          <div className="section-eyebrow">{functional.eyebrow}</div>
          <h2 className="section-heading mb-2">{functional.heading}</h2>
          <p className="text-base c-muted mb-6">
            <HighlightedText text={functional.description} bold={["CPS", "AEP"]} />
          </p>
          <div className="space-y-3">
            {functional.links.map((l) => (
              <LinkCard key={l.file} {...l} />
            ))}
          </div>
        </div>

        <div>
          <div className="section-eyebrow">{technical.eyebrow}</div>
          <h2 className="section-heading mb-2">{technical.heading}</h2>
          <p className="text-base c-muted mb-6">{technical.description}</p>
          <div className="space-y-3">
            {technical.links.map((l) => (
              <LinkCard key={l.file} {...l} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
