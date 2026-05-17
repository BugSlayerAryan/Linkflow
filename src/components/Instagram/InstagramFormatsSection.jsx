import { CheckCircle2, Music2, Video } from "lucide-react";
import formatsPreview from "../../assets/images/formats-clean.png";

const videoFormats = ["MP4", "WEBM", "MOV", "AVI", "MKV"];
const audioFormats = ["MP3", "M4A", "AAC", "OGG", "WAV"];

const colorTransitionClass =
  "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const smoothTransitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function FormatPill({ children }) {
  return (
    <span
      className={`inline-flex min-w-[44px] items-center justify-center rounded-lg border border-[var(--format-pill-border)] bg-[var(--format-pill-bg)] px-2.5 py-1.5 text-[11.5px] font-medium text-[var(--format-pill-text)] hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-pink-500 sm:min-w-[50px] sm:px-3 sm:py-2 sm:text-[12.5px] ${smoothTransitionClass}`}
    >
      {children}
    </span>
  );
}

function FormatGroup({ title, subtitle, items, type }) {
  const Icon = type === "video" ? Video : Music2;

  return (
    <div
      className={`rounded-2xl border border-[var(--format-card-border)] bg-[var(--format-card-bg)] p-4 shadow-[0_10px_28px_var(--format-card-shadow)] backdrop-blur-xl hover:border-pink-400/30 hover:bg-[var(--format-card-hover)] sm:p-4 ${smoothTransitionClass}`}
    >
      <div className="flex items-center justify-center gap-3 sm:justify-start">
        <div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-pink-500/15 bg-pink-500/10 text-pink-400 ${smoothTransitionClass}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </div>

        <div className="text-left">
          <h3
            className={`text-[13.5px] font-semibold leading-none text-[var(--text-heading)] sm:text-[14px] ${colorTransitionClass}`}
          >
            {title}
          </h3>

          <p
            className={`mt-1.5 text-[11.5px] leading-5 text-[var(--text-soft)] sm:text-xs ${colorTransitionClass}`}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-2.5">
        {items.map((item) => (
          <FormatPill key={item}>{item}</FormatPill>
        ))}
      </div>
    </div>
  );
}

function InstagramFormatsSection() {
  return (
    <section
      id="instagram-formats"
      aria-labelledby="instagram-formats-title"
      className="platform-instagram theme-section relative overflow-hidden"
    >
      <div className="theme-layer theme-instagram-hero-dark" />
      <div className="theme-layer theme-instagram-hero-light" />

      <div className="pointer-events-none absolute left-[18%] top-20 z-[1] h-56 w-56 rounded-full bg-pink-500/8 blur-[90px] sm:h-72 sm:w-72 sm:blur-[100px]" />
      <div className="pointer-events-none absolute right-[18%] top-20 z-[1] h-56 w-56 rounded-full bg-orange-400/12 blur-[100px] sm:h-64 sm:w-64 sm:blur-[110px]" />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-8 px-4 py-10 sm:px-8 sm:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-14 lg:py-16 xl:gap-12 xl:px-20">
        <div className="order-2 mt-2 flex justify-center lg:order-1 lg:mt-0 lg:justify-start">
          <img
            src={formatsPreview}
            alt="Instagram Reels and video downloader preview with MP4 format options"
            className="w-full max-w-[360px] object-contain drop-shadow-[0_22px_70px_rgba(225,48,108,0.16)] min-[420px]:max-w-[400px] sm:max-w-[560px] md:max-w-[640px] lg:max-w-[700px] xl:max-w-[760px]"
          />
        </div>

        <div className="order-1 mx-auto max-w-[680px] text-center lg:order-2 lg:mx-0 lg:text-left">
          <div
            className={`mb-3 inline-flex rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[11px] font-medium text-pink-300 sm:mb-4 sm:px-3.5 sm:text-xs ${smoothTransitionClass}`}
          >
            Instagram Reels MP4 Formats
          </div>

          <h2
            id="instagram-formats-title"
            className={`mx-auto max-w-[560px] text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--text-heading)] min-[420px]:text-[30px] sm:text-[36px] lg:mx-0 lg:text-[42px] ${colorTransitionClass}`}
          >
            Download Instagram
            <br />
            <span className="bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FCAF45] bg-clip-text text-transparent">
              Reels & Videos MP4
            </span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-[580px] text-[13.5px] leading-7 text-[var(--text-muted)] sm:mt-5 sm:text-[15px] sm:leading-8 lg:mx-0 ${colorTransitionClass}`}
          >
            Download Instagram Reels, videos, stories, and post videos in MP4
            format. Preview available video quality and save Instagram content
            smoothly on any device.
          </p>

          <div className="mx-auto mt-6 grid max-w-[360px] gap-3 min-[520px]:max-w-none sm:mt-7 sm:grid-cols-2 sm:gap-4 lg:mx-0">
            <FormatGroup
              type="video"
              title="Instagram Video Formats"
              subtitle="MP4, WEBM, MOV, AVI, MKV"
              items={videoFormats}
            />

            <FormatGroup
              type="audio"
              title="Audio Format Options"
              subtitle="MP3, M4A, AAC, OGG, WAV"
              items={audioFormats}
            />
          </div>

          <div className="mx-auto mt-5 flex max-w-[360px] flex-wrap justify-center gap-2.5 sm:mt-7 sm:max-w-none sm:justify-start sm:gap-3">
            {["Reels MP4 Download", "Stories Supported", "Mobile Friendly"].map(
              (item) => (
                <div
                  key={item}
                  className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--format-check-border)] bg-[var(--format-check-bg)] px-3 py-2 text-[11.5px] font-medium text-[var(--format-check-text)] sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-[12.5px] ${smoothTransitionClass}`}
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 sm:h-[18px] sm:w-[18px]" />
                  <span>{item}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstagramFormatsSection;