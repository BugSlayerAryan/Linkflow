import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { steps } from "../../data/steps";

const colorTransitionClass =
  "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const smoothTransitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const stepLabels = [
  "Paste a public video URL",
  "Preview formats instantly",
  "Save video or audio securely",
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={`theme-section relative overflow-hidden ${colorTransitionClass}`}
    >
      <div className="theme-layer theme-how-dark" />
      <div className="theme-layer theme-how-light" />

      <div className="pointer-events-none absolute left-1/2 top-10 z-[1] h-48 w-[340px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[90px] sm:w-[620px]" />
      <div className="pointer-events-none absolute -left-28 bottom-10 z-[1] h-64 w-64 rounded-full bg-purple-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 top-32 z-[1] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={`mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-2 text-[12px] font-semibold text-violet-500 shadow-[0_14px_40px_var(--shadow-soft)] backdrop-blur-xl ${smoothTransitionClass}`}
          >
            <Sparkles className="h-3.5 w-3.5 fill-violet-400 text-violet-400" />
            Simple 3-step workflow
          </div>

          <h2
            className={`text-[30px] font-bold leading-tight tracking-[-0.04em] text-[var(--text-heading)] sm:text-[40px] lg:text-[46px] ${colorTransitionClass}`}
          >
            How It Works
          </h2>

          <p
            className={`mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-[var(--text-muted)] sm:text-[16px] ${colorTransitionClass}`}
          >
            Paste a video link, preview available formats, then download your
            selected video or audio in seconds.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-6xl sm:mt-12">
          <div className="absolute left-1/2 top-[72px] hidden h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/35 to-transparent lg:block" />

          <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <article
                  key={step.title}
                  className={`group relative overflow-hidden rounded-[30px] border border-[var(--how-card-border)] bg-[var(--how-card-bg)] p-5 shadow-[0_18px_55px_var(--how-card-shadow)] backdrop-blur-xl hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[var(--how-card-hover)] sm:p-6 ${smoothTransitionClass}`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />

                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-14 w-14 place-items-center rounded-[22px] bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-[18px] font-bold text-white shadow-[0_18px_40px_rgba(168,85,247,0.3)]">
                          {index + 1}
                        </div>

                        <div
                          className={`grid h-12 w-12 place-items-center rounded-2xl border border-[var(--how-icon-border)] bg-[var(--how-icon-bg)] text-[var(--how-icon-color)] shadow-[0_12px_30px_rgba(139,92,246,0.12)] group-hover:scale-105 group-hover:bg-violet-500/15 ${smoothTransitionClass}`}
                        >
                          <Icon className="h-[22px] w-[22px] stroke-[1.9]" />
                        </div>
                      </div>

                      {!isLast && (
                        <div className="hidden h-10 w-10 place-items-center rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400 lg:grid">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    <h3
                      className={`text-[18px] font-bold tracking-[-0.02em] text-[var(--text-heading)] sm:text-[20px] ${colorTransitionClass}`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`mt-3 min-h-[52px] text-[13.5px] leading-6 text-[var(--text-muted)] sm:text-[14px] ${colorTransitionClass}`}
                    >
                      {step.text}
                    </p>

                    <div
                      className={`mt-5 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3.5 ${smoothTransitionClass}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                        <p className="text-[12.5px] font-semibold leading-5 text-[var(--text-heading)]">
                          {stepLabels[index]}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div
          className={`mx-auto mt-8 max-w-4xl overflow-hidden rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface)] shadow-[0_20px_65px_var(--shadow-soft)] backdrop-blur-xl ${smoothTransitionClass}`}
        >
          <div className="grid gap-4 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <h3
                className={`text-[15px] font-semibold text-[var(--text-heading)] sm:text-[16px] ${colorTransitionClass}`}
              >
                Smart validation before download
              </h3>

              <p
                className={`mt-1 text-[13px] leading-6 text-[var(--text-muted)] sm:text-[14px] ${colorTransitionClass}`}
              >
                Empty or invalid links stay on the landing page with a toast
                message. Valid links open the download preview page
                automatically.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-[12px] font-semibold text-violet-500 sm:block">
              Fast · Secure · Simple
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;