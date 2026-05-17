import {
  BadgeCheck,
  Download,
  MonitorDown,
  PlaySquare,
  ShieldCheck,
  Zap,
} from "lucide-react";

const colorTransitionClass =
  "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const smoothTransitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const facebookFeatures = [
  {
    title: "Facebook Videos",
    text: "Download public Facebook videos online in MP4 format.",
    icon: MonitorDown,
  },
  {
    title: "Facebook Reels",
    text: "Save Facebook Reels from supported public video links.",
    icon: PlaySquare,
  },
  {
    title: "Watch Links",
    text: "Download videos from Facebook Watch and public posts.",
    icon: Download,
  },
  {
    title: "Quick Processing",
    text: "Paste a Facebook URL and preview available formats fast.",
    icon: Zap,
  },
  {
    title: "Browser Based",
    text: "Use the Facebook downloader without installing an app.",
    icon: BadgeCheck,
  },
  {
    title: "Safe & Simple",
    text: "Clean download flow designed for mobile and desktop users.",
    icon: ShieldCheck,
  },
];

function FacebookFeaturesSection() {
  return (
    <section
      id="facebook-features"
      aria-labelledby="facebook-features-title"
      className="platform-facebook theme-section relative overflow-hidden"
    >
      <div className="theme-layer theme-facebook-hero-dark" />
      <div className="theme-layer theme-facebook-hero-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 z-[1] h-44 w-[320px] -translate-x-1/2 rounded-full bg-[#1877F2]/18 blur-[80px] sm:w-[520px] sm:blur-[95px]" />
      <div className="pointer-events-none absolute right-[12%] bottom-10 z-[1] h-56 w-56 rounded-full bg-sky-400/12 blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-11 sm:px-8 sm:py-14 lg:px-14 lg:py-16 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mx-auto mb-3 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-300">
            Facebook Downloader Features
          </p>

          <h2
            id="facebook-features-title"
            className={`text-[27px] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-heading)] sm:text-[34px] lg:text-[36px] ${colorTransitionClass}`}
          >
            Download Facebook Videos{" "}
            <span className="bg-gradient-to-r from-[#0B5FEA] via-[#1877F2] to-[#14B8FF] bg-clip-text text-transparent">
              Reels In MP4
            </span>
          </h2>

          <p
            className={`mx-auto mt-3 max-w-2xl text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] ${colorTransitionClass}`}
          >
            Download Facebook videos, Reels, stories, public posts, and Watch
            links online in MP4 format with a fast and easy Facebook video
            downloader.
          </p>
        </div>

        <div className="mt-7 grid gap-3 min-[520px]:grid-cols-2 sm:mt-10 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {facebookFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl border border-blue-500/10 bg-[var(--feature-card-bg)] p-4 shadow-[0_18px_55px_var(--feature-card-shadow)] backdrop-blur-xl hover:-translate-y-1 hover:border-blue-400/35 hover:bg-[var(--feature-card-hover)] sm:px-5 sm:py-6 sm:text-center xl:px-4 xl:py-5 ${smoothTransitionClass}`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/55 to-transparent opacity-0 group-hover:opacity-100 ${smoothTransitionClass}`}
                />

                <div className="flex items-center gap-4 sm:block">
                  <div
                    className={`grid h-[46px] w-[46px] shrink-0 place-items-center rounded-2xl border border-blue-500/15 bg-blue-500/10 text-blue-400 shadow-[0_0_28px_rgba(24,119,242,0.18)] group-hover:scale-105 group-hover:bg-blue-500/15 sm:mx-auto sm:mb-3.5 sm:h-[52px] sm:w-[52px] ${smoothTransitionClass}`}
                  >
                    <Icon className="h-[22px] w-[22px] stroke-[1.8] sm:h-7 sm:w-7" />
                  </div>

                  <div className="min-w-0 text-left sm:text-center">
                    <h3
                      className={`text-[14px] font-semibold tracking-[-0.005em] text-[var(--text-heading)] sm:text-[15px] xl:text-[14px] ${colorTransitionClass}`}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className={`mt-1.5 text-[12.5px] leading-5 text-[var(--text-muted)] sm:mx-auto sm:mt-2 sm:max-w-[220px] sm:text-[13px] sm:leading-6 xl:max-w-[170px] xl:text-[12.5px] xl:leading-5 ${colorTransitionClass}`}
                    >
                      {feature.text}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FacebookFeaturesSection;