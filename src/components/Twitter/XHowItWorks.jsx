import {
  ArrowRight,
  CheckCircle2,
  Clipboard,
  Download,
  Search,
  Sparkles,
} from "lucide-react";

const colorTransitionClass =
  "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const smoothTransitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const xSteps = [
  {
    title: "Paste X/Twitter Link",
    text: "Copy and paste a public X or Twitter video post URL into the downloader.",
    icon: Clipboard,
  },
  {
    title: "Preview MP4 Format",
    text: "SnapDL checks the X link and shows available Twitter video download options.",
    icon: Search,
  },
  {
    title: "Download X Video",
    text: "Choose the available MP4 format and save your X or Twitter video securely.",
    icon: Download,
  },
];

const xStepLabels = [
  "Paste a public X/Twitter URL",
  "Preview Twitter MP4 formats",
  "Download X video securely",
];

function XHowItWorks() {
  return (
    <section
      id="x-how-it-works"
      aria-labelledby="x-how-it-works-title"
      className={`platform-x theme-section relative overflow-hidden ${colorTransitionClass}`}
    >
      <div className="theme-layer theme-x-hero-dark" />
      <div className="theme-layer theme-x-hero-light" />

      <div className="pointer-events-none absolute left-1/2 top-10 z-[1] h-48 w-[340px] -translate-x-1/2 rounded-full bg-white/10 blur-[90px] sm:w-[620px]" />
      <div className="pointer-events-none absolute -left-28 bottom-10 z-[1] h-64 w-64 rounded-full bg-slate-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 top-32 z-[1] h-72 w-72 rounded-full bg-sky-400/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={`mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[12px] font-semibold text-slate-200 shadow-[0_14px_40px_var(--shadow-soft)] backdrop-blur-xl ${smoothTransitionClass}`}
          >
            <Sparkles className="h-3.5 w-3.5 fill-sky-300 text-sky-300" />
            Simple X/Twitter download steps
          </div>

          <h2
            id="x-how-it-works-title"
            className={`text-[30px] font-bold leading-tight tracking-[-0.04em] text-[var(--text-heading)] sm:text-[40px] lg:text-[46px] ${colorTransitionClass}`}
          >
            Download Twitter{" "}
            <span className="bg-gradient-to-r from-white via-sky-300 to-slate-400 bg-clip-text text-transparent">
              X MP4
            </span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-[var(--text-muted)] sm:text-[16px] ${colorTransitionClass}`}
          >
            Download X videos, Twitter videos, clips, and public post videos
            online in MP4 format. Paste your X or Twitter URL, preview formats,
            and save your video.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-6xl sm:mt-12">
          <div className="absolute left-1/2 top-[72px] hidden h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-300/35 to-transparent lg:block" />

          <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
            {xSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === xSteps.length - 1;

              return (
                <article
                  key={step.title}
                  className={`group relative overflow-hidden rounded-[30px] border border-[var(--how-card-border)] bg-[var(--how-card-bg)] p-5 shadow-[0_18px_55px_var(--how-card-shadow)] backdrop-blur-xl hover:-translate-y-1 hover:border-sky-300/40 hover:bg-[var(--how-card-hover)] sm:p-6 ${smoothTransitionClass}`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-sky-400/10 blur-3xl" />

                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-14 w-14 place-items-center rounded-[22px] bg-gradient-to-br from-white via-sky-300 to-slate-400 text-[18px] font-bold text-slate-950 shadow-[0_18px_40px_rgba(14,165,233,0.18)]">
                          {index + 1}
                        </div>

                        <div
                          className={`grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/8 text-sky-300 shadow-[0_12px_30px_rgba(14,165,233,0.12)] group-hover:scale-105 group-hover:bg-sky-400/10 ${smoothTransitionClass}`}
                        >
                          <Icon className="h-[22px] w-[22px] stroke-[1.9]" />
                        </div>
                      </div>

                      {!isLast && (
                        <div className="hidden h-10 w-10 place-items-center rounded-full border border-sky-300/20 bg-sky-400/10 text-sky-300 lg:grid">
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
                          {xStepLabels[index]}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default XHowItWorks;