import { BadgeCheck, Download } from "lucide-react";
import ctaRocket from "../../assets/images/cta-rocket.png";

const benefits = ["No Sign Up", "No Extension", "MP4 Video"];

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function XCTASection() {
  return (
    <section
      id="x-start-download"
      aria-labelledby="x-cta-title"
      className={`platform-x theme-section relative overflow-hidden px-4 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-16 xl:px-20 ${transitionClass}`}
    >
      <div className="theme-layer theme-x-hero-dark" />
      <div className="theme-layer theme-x-hero-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 z-[1] h-44 w-[300px] -translate-x-1/2 rounded-full bg-white/10 blur-[85px] sm:w-[520px]" />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div
          className={`relative overflow-hidden rounded-[30px] border border-white/15 bg-gradient-to-r from-white/25 via-sky-300/25 to-slate-400/20 p-px shadow-[0_24px_90px_rgba(14,165,233,0.16)] ${transitionClass}`}
        >
          <div
            className={`relative overflow-hidden rounded-[29px] bg-[radial-gradient(circle_at_12%_45%,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(115deg,rgba(2,6,23,0.98),rgba(0,0,0,0.98)_52%,rgba(7,10,20,0.98))] px-5 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-8 ${transitionClass}`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.08)_42%,transparent_70%)]" />
            <div className="pointer-events-none absolute -left-16 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-white/8 blur-[85px]" />
            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-sky-400/12 blur-[90px]" />

            <div className="relative grid items-center gap-6 lg:grid-cols-[190px_minmax(0,1fr)_auto] lg:gap-8">
              <div className="mx-auto lg:mx-0">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-28 w-28 rounded-full bg-sky-400/12 blur-[55px] sm:h-32 sm:w-32" />

                  <img
                    src={ctaRocket}
                    alt="X and Twitter video downloader for MP4 downloads"
                    loading="lazy"
                    className="relative z-10 w-[130px] drop-shadow-[0_20px_40px_rgba(14,165,233,0.22)] sm:w-[150px] lg:w-[165px]"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <p
                  className={`mb-3 inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px] font-medium text-slate-200 sm:mb-4 sm:px-3.5 sm:text-xs ${transitionClass}`}
                >
                  X / Twitter Video Downloader
                </p>

                <h2
                  id="x-cta-title"
                  className={`mx-auto max-w-[560px] text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-white min-[420px]:text-[30px] sm:text-[36px] lg:mx-0 lg:text-[42px] ${transitionClass}`}
                >
                  Twitter Video{" "}
                  <span className="bg-gradient-to-r from-white via-sky-300 to-slate-400 bg-clip-text text-transparent">
                    Downloader
                  </span>
                </h2>

                <p
                  className={`mx-auto mt-4 max-w-[580px] text-[13.5px] leading-7 text-white/82 sm:mt-5 sm:text-[15px] sm:leading-8 lg:mx-0 ${transitionClass}`}
                >
                  Paste an X or Twitter video post link and download supported
                  MP4 videos online with SnapDL.
                </p>
              </div>

              <div className="mx-auto flex w-full max-w-[340px] flex-col items-center gap-3.5 lg:mx-0 lg:w-auto lg:max-w-none lg:items-end">
                <a
                  href="#hero"
                  aria-label="Start downloading X or Twitter videos with SnapDL"
                  className={`group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-white via-sky-300 to-slate-400 px-6 py-3 text-[13.5px] font-semibold text-slate-950 shadow-[0_16px_40px_rgba(14,165,233,0.2)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 sm:w-auto sm:min-w-[250px] sm:text-[14px] ${transitionClass}`}
                >
                  <Download className="h-4 w-4 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5" />
                  Download Twitter Video
                </a>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11.5px] font-medium text-white/88 sm:text-[12.5px] lg:justify-end">
                  {benefits.map((item, index) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-sky-300" />
                      {item}

                      {index !== benefits.length - 1 && (
                        <span className="ml-2 hidden h-4 w-px bg-white/20 opacity-70 md:inline-block" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default XCTASection;