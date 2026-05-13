import { Flame } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-[0_10px_30px_rgba(124,58,237,0.28)] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        <Flame className="h-5 w-5 fill-white/10" />
      </div>

      <div className="leading-none">
        <p className="text-[17px] font-bold tracking-[-0.02em] text-[var(--logo-title)] transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          LinkFlow
        </p>

        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--logo-subtitle)] transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          Downloader
        </p>
      </div>
    </div>
  );
}

export default Logo;