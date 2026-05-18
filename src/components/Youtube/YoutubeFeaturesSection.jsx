import {
  BadgeCheck,
  Download,
  FileAudio,
  MonitorDown,
  ShieldCheck,
  Zap,
} from "lucide-react";

const colorTransitionClass =
  "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const smoothTransitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const youtubeFeatures = [
  {
    title: "YouTube MP4 Download",
    text: "Download YouTube videos online in MP4 format.",
    icon: MonitorDown,
  },
  {
    title: "YouTube MP3 Converter",
    text: "Convert YouTube videos to high-quality MP3 audio.",
    icon: FileAudio,
  },
  {
    title: "YouTube Shorts",
    text: "Download YouTube Shorts videos on any device.",
    icon: Download,
  },
  {
    title: "Fast Video Processing",
    text: "Get YouTube video download links in seconds.",
    icon: Zap,
  },
  {
    title: "No App Required",
    text: "Use the YouTube downloader online without installation.",
    icon: BadgeCheck,
  },
  {
    title: "Secure Downloads",
    text: "Safe and private browser-based YouTube downloading.",
    icon: ShieldCheck,
  },
];

function YoutubeFeaturesSection() {
  return (
    <section
      id="youtube-features"
      aria-labelledby="youtube-features-title"
      className="platform-youtube theme-section relative overflow-hidden border-0"
    >
      <div className="theme-layer theme-youtube-hero-dark" />
      <div className="theme-layer theme-youtube-hero-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 z-[1] h-44 w-[320px] -translate-x-1/2 rounded-full bg-[#FF0000]/18 blur-[80px] sm:w-[520px] sm:blur-[95px]" />
      <div className="pointer-events-none absolute right-[12%] bottom-10 z-[1] h-56 w-56 rounded-full bg-rose-500/10 blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
        <div className="mx-auto max-w-[980px] text-center">
          <p className="mx-auto mb-3 inline-flex items-center rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-[12px] font-bold text-red-300">
            YouTube Downloader Features
          </p>

          <h2
            id="youtube-features-title"
            className={`mx-auto text-[30px] font-bold leading-[1.12] tracking-[-0.035em] text-[var(--text-heading)] sm:text-[40px] lg:text-[48px] ${colorTransitionClass}`}
          >
            <span className="hidden sm:inline">
              Powerful YouTube Video Downloader{" "}
            </span>
            <span className="sm:hidden">YouTube Downloader </span>
            <span className="bg-gradient-to-r from-[#FF0000] via-red-500 to-rose-400 bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-[780px] text-[15.5px] leading-7 text-[var(--text-muted)] sm:text-[17px] sm:leading-8 lg:text-[18px] ${colorTransitionClass}`}
          >
            Download YouTube videos, Shorts, and supported links in MP4 or MP3
            format with a fast, secure, and browser-based video downloader.
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-[430px] gap-4 sm:mt-12 sm:max-w-[900px] sm:grid-cols-2 sm:gap-5 lg:max-w-[1180px] lg:grid-cols-3 xl:max-w-[1500px] xl:grid-cols-6 xl:gap-5">
          {youtubeFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={`group relative overflow-hidden rounded-[24px] border border-red-500/10 bg-[var(--feature-card-bg)] px-5 py-5 shadow-[0_18px_55px_var(--feature-card-shadow)] backdrop-blur-xl hover:-translate-y-1 hover:border-red-400/40 hover:bg-[var(--feature-card-hover)] sm:px-6 sm:py-6 sm:text-center xl:min-h-[220px] xl:px-4 xl:py-6 ${smoothTransitionClass}`}
              >
                <div
                  className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-400/55 to-transparent opacity-0 group-hover:opacity-100 ${smoothTransitionClass}`}
                />

                <div className="flex items-center gap-4 sm:block">
                  <div
                    className={`grid h-[54px] w-[54px] shrink-0 place-items-center rounded-[20px] border border-red-500/15 bg-red-500/10 text-red-400 shadow-[0_0_28px_rgba(255,0,0,0.14)] group-hover:scale-105 group-hover:bg-red-500/15 sm:mx-auto sm:mb-4 sm:h-[58px] sm:w-[58px] xl:h-[56px] xl:w-[56px] ${smoothTransitionClass}`}
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

export default YoutubeFeaturesSection;