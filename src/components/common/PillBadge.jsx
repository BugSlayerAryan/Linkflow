import { Sparkles } from "lucide-react";

function PillBadge({ children, className = "" }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-3.5 py-1.5 text-xs font-semibold text-[var(--badge-text)] shadow-[0_10px_30px_rgba(124,58,237,0.12)] backdrop-blur-xl transition-colors duration-300 ${className}`}
    >
      <Sparkles className="h-3.5 w-3.5 text-[var(--badge-icon)]" />
      {children}
    </div>
  );
}

export default PillBadge;