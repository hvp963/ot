import { Users, GitCommit } from "lucide-react";

type Report = { role: string; note: string };

type OrgChartProps = {
  build: {
    label: string;
    sublabel: string;
    directReports: Report[];
    dottedReports: Report[];
  };
  grow: {
    label: string;
    sublabel: string;
    note: string;
  };
};

function ReportCard({ report, dotted }: { report: Report; dotted?: boolean }) {
  return (
    <div className={`card p-3 ${dotted ? "border-dashed" : ""}`}>
      <div className="text-base font-semibold c-text">{report.role}</div>
      <div className="text-base c-muted mt-0.5">{report.note}</div>
    </div>
  );
}

export default function OrgChart({ build, grow }: OrgChartProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="card bl-primary-lg p-5">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="section-heading">{build.label}</span>
          <span className="badge bg-primary-soft c-primary">{build.sublabel}</span>
        </div>

        <div className="flex items-center gap-2 mt-5 mb-2 text-base font-semibold c-text">
          <Users size={15} className="c-primary" />
          Direct reports
        </div>
        <div className="space-y-2">
          {build.directReports.map((r) => (
            <ReportCard key={r.role} report={r} />
          ))}
        </div>

        <div className="flex items-center gap-2 mt-5 mb-2 text-base font-semibold c-text">
          <GitCommit size={15} className="c-amber" />
          Dotted reports, from CPS engineering
        </div>
        <div className="space-y-2">
          {build.dottedReports.map((r) => (
            <ReportCard key={r.role} report={r} dotted />
          ))}
        </div>
      </div>

      <div className="card bl-amber p-5 h-full flex flex-col">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="section-heading">{grow.label}</span>
          <span className="badge bg-amber-soft c-amber">{grow.sublabel}</span>
        </div>
        <p className="text-base c-muted mt-5 leading-relaxed">{grow.note}</p>
      </div>
    </div>
  );
}
