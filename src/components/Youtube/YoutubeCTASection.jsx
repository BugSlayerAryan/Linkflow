import { BadgeCheck, Download } from "lucide-react";
import ctaRocket from "../../assets/images/cta-rocket.png";

const benefits = ["No Sign Up", "No App Install", "MP4 & MP3"];

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function YoutubeCTASection() {
  return (
    <section
      id="youtube-start-download"
      aria-labelledby="youtube-cta-title"
      className={`platform-youtube theme-section relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-14 xl:px-20 ${transitionClass}`}
    >
      <div className="theme-layer theme-youtube-hero-dark" />
      <div className="theme-layer theme-youtube-hero-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 z-[1] h-44 w-[300px] -translate-x-1/2 rounded-full bg-[#FF0000]/14 blur-[85px] sm:w-[520px]" />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div
          className={`relative overflow-hidden rounded-[30px] border border-red-500/25 bg-gradient-to-r from-red-700/80 via-red-600/75 to-rose-500/70 p-px shadow-[0_24px_90px_rgba(255,0,0,0.22)] ${transitionClass}`}
        >
          <div className="relative overflow-hidden rounded-[29px] bg-[radial-gradient(circle_at_12%_45%,rgba(255,0,0,0.25),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(244,63,94,0.18),transparent_30%),linear-gradient(115deg,rgba(15,5,8,0.96),rgba(18,7,12,0.98)_52%,rgba(7,10,20,0.98))] px-5 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-8">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.08)_42%,transparent_70%)]" />
            <div className="pointer-events-none absolute -left-16 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-red-400/12 blur-[85px]" />
            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-rose-400/14 blur-[90px]" />

            <div className="relative grid items-center gap-6 lg:grid-cols-[190px_minmax(0,1fr)_auto] lg:gap-8">
              <div className="mx-auto lg:mx-0">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-28 w-28 rounded-full bg-red-400/15 blur-[55px] sm:h-32 sm:w-32" />

                  <img
                    src={ctaRocket}
                    alt="YouTube video downloader for MP4 and MP3 downloads"
                    loading="lazy"
                    className="relative z-10 w-[130px] drop-shadow-[0_20px_40px_rgba(255,0,0,0.28)] sm:w-[150px] lg:w-[165px]"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <p className="mb-2 inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-[11px] font-semibold text-red-200">
                  YouTube Video Downloader
                </p>

                <h2
                  id="youtube-cta-title"
                  className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[34px] lg:text-[40px]"
                >
                  YouTube Video{" "}
                  <span className="bg-gradient-to-r from-[#FF0000] via-red-400 to-rose-300 bg-clip-text text-transparent">
                    Downloader
                  </span>
                </h2>

                <p className="mx-auto mt-3 max-w-[660px] text-[14px] leading-6 text-white/82 sm:text-[15px] sm:leading-7 lg:mx-0">
                  Paste a YouTube video, Shorts, or music link and download
                  supported MP4 or MP3 formats online with SnapDL.
                </p>
              </div>

              <div className="mx-auto flex w-full max-w-[340px] flex-col items-center gap-3.5 lg:mx-0 lg:w-auto lg:max-w-none lg:items-end">
                <a
                  href="#hero"
                  aria-label="Start downloading YouTube videos with SnapDL"
                  className={`group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF0000] via-red-600 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(255,0,0,0.28)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 sm:w-auto sm:min-w-[250px] ${transitionClass}`}
                >
                  <Download className="h-4 w-4 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5" />
                  Download YouTube Video
                </a>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12.5px] font-semibold text-white/88 lg:justify-end">
                  {benefits.map((item, index) => (
                    <span key={item} className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-red-300" />
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

export default YoutubeCTASection;