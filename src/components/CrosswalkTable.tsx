import architecture from "@/data/architecture.json";

export default function CrosswalkTable() {
  const { rows } = architecture.bridgeCrosswalk;
  return (
    <div className="overflow-x-auto rounded-xl border border-base">
      <table className="w-full text-sm border-collapse min-w-[720px]">
        <thead>
          <tr className="bg-surface-2 border-b border-base">
            <th className="text-left px-4 py-3 font-semibold c-text w-1/3">Marketecture</th>
            <th className="text-left px-4 py-3 font-semibold c-text w-1/3">Functional Architecture</th>
            <th className="text-left px-4 py-3 font-semibold c-text w-1/3">Capability Enabled</th>
          </tr>
        </thead>
        <tbody className="divide-faint">
          {rows.map((row, i) => (
            <tr key={i} className="bg-surface">
              <td className="px-4 py-3 c-green align-top">{row.marketecture}</td>
              <td className="px-4 py-3 c-primary align-top">{row.functional}</td>
              <td className="px-4 py-3 c-amber align-top">{row.capability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
