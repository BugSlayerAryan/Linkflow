function Logo() {
  return (
    <div className="group inline-flex items-center gap-2.5">
      {/* Premium SnapDL app mark */}
      <div className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[15px] bg-[#0B1020] shadow-[0_14px_34px_rgba(15,23,42,0.34)] ring-1 ring-white/15 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_46px_rgba(124,58,237,0.34)]">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,#111827_0%,#4338CA_48%,#8B5CF6_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.36),transparent_30%)]" />
        <div className="absolute inset-[1px] rounded-[14px] bg-[linear-gradient(145deg,rgba(255,255,255,0.14),transparent_44%,rgba(255,255,255,0.06))]" />
        <div className="absolute -bottom-7 -right-7 h-16 w-16 rounded-full bg-fuchsia-400/28 blur-2xl" />

        {/* Sharp custom download symbol */}
        <svg
          viewBox="0 0 28 28"
          aria-hidden="true"
          className="relative z-10 h-[25px] w-[25px] drop-shadow-[0_0_14px_rgba(255,255,255,0.25)]"
        >
          <path
            d="M14 4.5V17"
            fill="none"
            stroke="white"
            strokeWidth="2.55"
            strokeLinecap="round"
          />
          <path
            d="M8.5 12.2L14 17.7L19.5 12.2"
            fill="none"
            stroke="white"
            strokeWidth="2.55"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 22H21"
            fill="none"
            stroke="url(#snapdl-mark-line)"
            strokeWidth="2.55"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="snapdl-mark-line"
              x1="7"
              y1="22"
              x2="21"
              y2="22"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DDD6FE" />
              <stop offset="0.5" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F0ABFC" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Premium wordmark */}
      <div className="flex items-baseline leading-none">
        <span className="text-[28px] font-black tracking-[-0.085em] text-[var(--logo-title)] antialiased transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          Snap
        </span>

        <span className="ml-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500 bg-clip-text text-[28px] font-black tracking-[-0.085em] text-transparent antialiased">
          DL
        </span>
      </div>
    </div>
  );
}

export default Logo;