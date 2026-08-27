function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightedText({ text, bold }: { text: string; bold: string[] }) {
  if (bold.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${bold.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        bold.includes(part) ? (
          <strong key={i} className="font-semibold c-text">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
