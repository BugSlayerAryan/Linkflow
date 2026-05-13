import BrandLogo from "../common/BrandLogo";

const platforms = [
  { name: "youtube", label: "YouTube" },
  { name: "tiktok", label: "TikTok" },
  { name: "instagram", label: "Instagram" },
  { name: "facebook", label: "Facebook" },
  { name: "twitter", label: "Twitter/X" },
  { name: "vimeo", label: "Vimeo" },
  { name: "dailymotion", label: "Dailymotion" },
  { name: "more", label: "+ More" },
];

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function PlatformsSection() {
  return (
    <section
      id="platforms"
      className={`relative overflow-hidden px-5 py-11 sm:px-8 sm:py-14 lg:px-14 lg:py-16 xl:px-20 ${transitionClass}`}
    >
      <div className="theme-platforms-dark" />
      <div className="theme-platforms-light" />

      <div className="pointer-events-none absolute left-1/2 top-6 h-44 w-[320px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[80px] sm:w-[520px] sm:blur-[95px]" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className={`text-[28px] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-heading)] sm:text-[34px] lg:text-[36px] ${transitionClass}`}
          >
            Supports{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              1000+ Websites
            </span>
          </h2>

          <p
            className={`mx-auto mt-3 max-w-2xl text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] sm:leading-7 ${transitionClass}`}
          >
            Download videos from all popular platforms and thousands of other
            websites.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-[720px] grid-cols-2 gap-3 min-[520px]:grid-cols-3 sm:mt-9 md:grid-cols-4 lg:max-w-none lg:flex lg:flex-wrap lg:items-center lg:justify-center">
          {platforms.map((platform) => (
            <div
              key={platform.label}
              className={`group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl border border-[var(--platform-card-border)] bg-[var(--platform-card-bg)] px-3.5 py-2.5 text-[13px] font-medium text-[var(--text-heading)] shadow-[0_12px_36px_var(--platform-card-shadow)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-violet-400/35 hover:bg-[var(--platform-card-hover)] sm:gap-3 sm:px-4 sm:text-sm lg:min-h-0 lg:px-5 lg:py-3 ${transitionClass}`}
            >
              <BrandLogo
                name={platform.name}
                className={`h-5 w-5 shrink-0 group-hover:scale-105 ${transitionClass}`}
              />

              <span className="truncate whitespace-nowrap tracking-[-0.01em]">
                {platform.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlatformsSection;