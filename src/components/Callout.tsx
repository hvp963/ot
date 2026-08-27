import { Lightbulb } from "lucide-react";
import HighlightedText from "./HighlightedText";

type CalloutProps = {
  children?: React.ReactNode;
  text?: string;
  bold?: string[];
};

export default function Callout({ children, text, bold }: CalloutProps) {
  return (
    <div className="card bl-primary-lg p-6 bg-primary-tint border-primary-soft flex items-start gap-3">
      <Lightbulb size={20} className="c-primary shrink-0 mt-0.5" />
      <p className="text-base leading-relaxed c-text">
        {text ? <HighlightedText text={text} bold={bold ?? []} /> : children}
      </p>
    </div>
  );
}
