import { features } from "../../data/features";

const colorTransitionClass =
  "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const smoothTransitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="theme-section relative overflow-hidden border-0"
    >
      <div className="theme-layer theme-features-dark" />
      <div className="theme-layer theme-features-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 z-[1] h-44 w-[320px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[80px] sm:w-[520px] sm:blur-[95px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
        <div className="mx-auto max-w-[980px] text-center">
          <h2
            id="features-title"
            className={`mx-auto text-[30px] font-bold leading-[1.12] tracking-[-0.035em] text-[var(--text-heading)] sm:text-[40px] lg:text-[48px] ${colorTransitionClass}`}
          >
            <span className="hidden sm:inline">
              Powerful Online Video Downloader{" "}
            </span>
            <span className="sm:hidden">Fast Video Downloader </span>
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-[780px] text-[15.5px] leading-7 text-[var(--text-muted)] sm:text-[17px] sm:leading-8 lg:text-[18px] ${colorTransitionClass}`}
          >
            Download videos from YouTube, Instagram, Facebook, X/Twitter, and
            more in MP4 or MP3 format with fast, secure, and easy-to-use tools.
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-[430px] gap-4 sm:mt-12 sm:max-w-[900px] sm:grid-cols-2 sm:gap-5 lg:max-w-[1180px] lg:grid-cols-3 xl:max-w-[1500px] xl:grid-cols-6 xl:gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={`group relative overflow-hidden rounded-[24px] border border-[var(--feature-card-border)] bg-[var(--feature-card-bg)] px-5 py-5 shadow-[0_18px_55px_var(--feature-card-shadow)] backdrop-blur-xl hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[var(--feature-card-hover)] sm:px-6 sm:py-6 sm:text-center xl:min-h-[220px] xl:px-4 xl:py-6 ${smoothTransitionClass}`}
              >
                <div
                  className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent opacity-0 group-hover:opacity-100 ${smoothTransitionClass}`}
                />

                <div className="flex items-center gap-4 sm:block">
                  <div
                    className={`grid h-[54px] w-[54px] shrink-0 place-items-center rounded-[20px] border border-violet-300/35 bg-violet-500/[0.06] text-violet-500 shadow-[0_0_28px_rgba(139,92,246,0.14)] group-hover:scale-105 group-hover:bg-violet-500/12 sm:mx-auto sm:mb-4 sm:h-[58px] sm:w-[58px] xl:h-[56px] xl:w-[56px] ${smoothTransitionClass}`}
                  >
                    <Icon className="h-[24px] w-[24px] stroke-[1.9] sm:h-[28px] sm:w-[28px]" />
                  </div>

                  <div className="min-w-0 text-left sm:text-center">
                    <h3
                      className={`text-[16px] font-bold leading-snug tracking-[-0.015em] text-[var(--text-heading)] sm:text-[17px] xl:text-[16px] ${colorTransitionClass}`}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className={`mt-1.5 text-[14px] leading-6 text-[var(--text-muted)] sm:mx-auto sm:mt-2.5 sm:max-w-[250px] sm:text-[14.5px] sm:leading-6 xl:max-w-[190px] xl:text-[13.5px] xl:leading-6 ${colorTransitionClass}`}
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

export default FeaturesSection;