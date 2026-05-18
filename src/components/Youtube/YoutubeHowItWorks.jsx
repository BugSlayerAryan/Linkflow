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

const youtubeSteps = [
  {
    title: "Paste YouTube Link",
    text: "Copy and paste a public YouTube video, Shorts, or music video URL.",
    icon: Clipboard,
  },
  {
    title: "Preview Formats",
    text: "Check available YouTube MP4 video and MP3 audio download options.",
    icon: Search,
  },
  {
    title: "Download File",
    text: "Choose your preferred format and save it securely on any device.",
    icon: Download,
  },
];

const youtubeStepLabels = [
  "Paste a public YouTube URL",
  "Select MP4 or MP3 format",
  "Download safely on any device",
];

function YoutubeHowItWorks() {
  return (
    <section
      id="youtube-how-it-works"
      aria-labelledby="youtube-how-it-works-title"
      className={`platform-youtube theme-section relative overflow-hidden ${colorTransitionClass}`}
    >
      <div className="theme-layer theme-youtube-hero-dark" />
      <div className="theme-layer theme-youtube-hero-light" />

      <div className="pointer-events-none absolute left-1/2 top-10 z-[1] h-48 w-[340px] -translate-x-1/2 rounded-full bg-[#FF0000]/14 blur-[90px] sm:w-[620px]" />
      <div className="pointer-events-none absolute -left-28 bottom-10 z-[1] h-64 w-64 rounded-full bg-red-600/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 top-32 z-[1] h-72 w-72 rounded-full bg-rose-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
        <div className="mx-auto max-w-[860px] text-center">
          <div
            className={`mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-[12.5px] font-semibold text-red-400 shadow-[0_14px_40px_var(--shadow-soft)] backdrop-blur-xl ${smoothTransitionClass}`}
          >
            <Sparkles className="h-3.5 w-3.5 fill-red-400 text-red-400" />
            Simple YouTube download steps
          </div>

          <h2
            id="youtube-how-it-works-title"
            className={`text-[32px] font-bold leading-[1.12] tracking-[-0.04em] text-[var(--text-heading)] sm:text-[42px] lg:text-[48px] ${colorTransitionClass}`}
          >
            Download YouTube Videos{" "}
            <span className="bg-gradient-to-r from-[#FF0000] via-red-500 to-rose-400 bg-clip-text text-transparent">
              In MP4/MP3
            </span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-[780px] text-[15.5px] leading-7 text-[var(--text-muted)] sm:text-[17px] sm:leading-8 lg:text-[18px] ${colorTransitionClass}`}
          >
            Download YouTube videos, Shorts, and music videos online in MP4 or
            MP3 format. Paste your YouTube URL, preview available formats, and
            save your file in seconds.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-6xl sm:mt-12">
          <div className="absolute left-1/2 top-[72px] hidden h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500/35 to-transparent lg:block" />

          <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
            {youtubeSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === youtubeSteps.length - 1;

              return (
                <article
                  key={step.title}
                  className={`group relative overflow-hidden rounded-[30px] border border-[var(--how-card-border)] bg-[var(--how-card-bg)] p-5 shadow-[0_18px_55px_var(--how-card-shadow)] backdrop-blur-xl hover:-translate-y-1 hover:border-red-400/40 hover:bg-[var(--how-card-hover)] sm:p-6 ${smoothTransitionClass}`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-red-500/10 blur-3xl" />

                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-14 w-14 place-items-center rounded-[22px] bg-gradient-to-br from-[#FF0000] via-red-600 to-rose-500 text-[18px] font-bold text-white shadow-[0_18px_40px_rgba(255,0,0,0.28)]">
                          {index + 1}
                        </div>

                        <div
                          className={`grid h-12 w-12 place-items-center rounded-2xl border border-red-500/15 bg-red-500/10 text-red-400 shadow-[0_12px_30px_rgba(255,0,0,0.12)] group-hover:scale-105 group-hover:bg-red-500/15 ${smoothTransitionClass}`}
                        >
                          <Icon className="h-[22px] w-[22px] stroke-[1.9]" />
                        </div>
                      </div>

                      {!isLast && (
                        <div className="hidden h-10 w-10 place-items-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400 lg:grid">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    <h3
                      className={`text-[19px] font-bold tracking-[-0.02em] text-[var(--text-heading)] sm:text-[21px] ${colorTransitionClass}`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`mt-3 min-h-[56px] text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] sm:leading-7 ${colorTransitionClass}`}
                    >
                      {step.text}
                    </p>

                    <div
                      className={`mt-5 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3.5 ${smoothTransitionClass}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                        <p className="text-[13px] font-semibold leading-5 text-[var(--text-heading)]">
                          {youtubeStepLabels[index]}
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

export default YoutubeHowItWorks;