import { features } from "../../data/features";

const colorTransitionClass =
  "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const smoothTransitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function FeaturesSection() {
  return (
    <section id="features" className="theme-section relative overflow-hidden">
      <div className="theme-layer theme-features-dark" />
      <div className="theme-layer theme-features-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 z-[1] h-44 w-[320px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[80px] sm:w-[520px] sm:blur-[95px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-11 sm:px-8 sm:py-14 lg:px-14 lg:py-16 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className={`text-[27px] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-heading)] sm:text-[34px] lg:text-[36px] ${colorTransitionClass}`}
          >
            Powerful{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              Features You’ll Love
            </span>
          </h2>

          <p
            className={`mx-auto mt-3 max-w-xl text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] ${colorTransitionClass}`}
          >
            Everything you need to download, convert, and save videos faster.
          </p>
        </div>

        <div className="mt-7 grid gap-3 min-[520px]:grid-cols-2 sm:mt-10 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl border border-[var(--feature-card-border)] bg-[var(--feature-card-bg)] p-4 shadow-[0_18px_55px_var(--feature-card-shadow)] backdrop-blur-xl hover:-translate-y-1 hover:border-violet-400/35 hover:bg-[var(--feature-card-hover)] sm:px-5 sm:py-6 sm:text-center xl:px-4 xl:py-5 ${smoothTransitionClass}`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/45 to-transparent opacity-0 group-hover:opacity-100 ${smoothTransitionClass}`}
                />

                <div className="flex items-center gap-4 sm:block">
                  <div
                    className={`grid h-[46px] w-[46px] shrink-0 place-items-center rounded-2xl border border-[var(--feature-icon-border)] bg-[var(--feature-icon-bg)] text-[var(--feature-icon-color)] shadow-[0_0_28px_rgba(139,92,246,0.18)] group-hover:scale-105 group-hover:bg-violet-500/15 sm:mx-auto sm:mb-3.5 sm:h-[52px] sm:w-[52px] ${smoothTransitionClass}`}
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

export default FeaturesSection;