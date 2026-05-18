import BrandLogo from "../common/BrandLogo";

const platforms = [
  { name: "youtube", label: "YouTube", href: "/youtube" },
  { name: "instagram", label: "Instagram", href: "/instagram" },
  { name: "facebook", label: "Facebook", href: "/facebook" },
  { name: "twitter", label: "Twitter/X", href: "/twitter" },
  { name: "tiktok", label: "TikTok", href: "/tiktok" },
  { name: "snapchat", label: "Snapchat", href: "/snapchat" },
  { name: "sharechat", label: "ShareChat", href: "/sharechat" },
  { name: "vimeo", label: "Vimeo", href: "/vimeo" },
  { name: "dailymotion", label: "Dailymotion", href: "/dailymotion" },
  { name: "reddit", label: "Reddit", href: "/reddit" },
];

const platformHighlights = [
  "Fast MP4 video downloads",
  "HD video saving online",
  "Works on mobile, tablet & desktop",
];

const colorTransitionClass =
  "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const smoothTransitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function PlatformsSection() {
  const handlePlatformClick = (event, platform) => {
    event.preventDefault();

    const navigate = () => {
      window.location.href = platform.href;
    };

    if (document.startViewTransition) {
      document.startViewTransition(navigate);
      return;
    }

    window.setTimeout(navigate, 80);
  };

  return (
    <section
      id="platforms"
      aria-labelledby="platforms-title"
      className={`theme-section relative overflow-hidden ${colorTransitionClass}`}
    >
      <div className="theme-layer theme-platforms-dark" />
      <div className="theme-layer theme-platforms-light" />

      <div className="pointer-events-none absolute left-1/2 top-10 z-[1] h-48 w-[340px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[90px] sm:w-[620px]" />
      <div className="pointer-events-none absolute -left-28 bottom-10 z-[1] h-64 w-64 rounded-full bg-purple-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 top-32 z-[1] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
        <div className="mx-auto max-w-[1180px] text-center">
          <div
            className={`mx-auto mb-4 inline-flex items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-2 text-[12.5px] font-semibold text-violet-500 shadow-[0_14px_40px_var(--shadow-soft)] backdrop-blur-xl ${smoothTransitionClass}`}
          >
            Supported video platforms
          </div>

          <h2
            id="platforms-title"
            className={`mx-auto max-w-[1180px] text-[30px] font-bold leading-[1.12] tracking-[-0.04em] text-[var(--text-heading)] min-[420px]:text-[32px] sm:text-[42px] lg:whitespace-nowrap lg:text-[48px] ${colorTransitionClass}`}
          >
            Online Video Downloader For{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              Popular Platforms
            </span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-[780px] text-[15.5px] leading-7 text-[var(--text-muted)] sm:text-[17px] sm:leading-8 lg:text-[18px] ${colorTransitionClass}`}
          >
            Download videos online from YouTube, Instagram, Facebook, TikTok,
            Twitter/X, Snapchat, ShareChat, Vimeo, Dailymotion, and Reddit. Save
            public videos in MP4 format quickly, securely, and without
            installing any app.
          </p>
        </div>

        <ul className="mx-auto mt-9 grid max-w-6xl grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {platforms.map((platform) => (
            <li key={platform.name}>
              <a
                href={platform.href}
                onClick={(event) => handlePlatformClick(event, platform)}
                aria-label={`${platform.label} video downloader`}
                title={`${platform.label} video downloader`}
                className={`group relative flex min-h-[76px] items-center gap-2.5 overflow-hidden rounded-[22px] border border-[var(--platform-card-border)] bg-[var(--platform-card-bg)] px-3 py-3 text-[13.5px] font-bold text-[var(--text-heading)] shadow-[0_14px_42px_var(--platform-card-shadow)] backdrop-blur-xl hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[var(--platform-card-hover)] active:scale-[0.985] sm:min-h-[88px] sm:gap-3.5 sm:rounded-[26px] sm:px-5 sm:py-4 sm:text-[15.5px] ${smoothTransitionClass}`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-[16px] border border-[var(--border-soft)] bg-[var(--surface-soft)] shadow-[0_10px_24px_rgba(139,92,246,0.12)] group-hover:scale-105 group-hover:bg-violet-500/10 sm:h-12 sm:w-12 sm:rounded-[20px] ${smoothTransitionClass}`}
                >
                  <BrandLogo
                    name={platform.name}
                    className={`h-7 w-7 shrink-0 sm:h-8 sm:w-8 ${smoothTransitionClass}`}
                  />
                </div>

                <span className="min-w-0 truncate tracking-[-0.02em]">
                  {platform.label}
                </span>

                <span className="ml-auto hidden translate-x-2 text-violet-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:inline">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-7 grid max-w-6xl gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
          {platformHighlights.map((item) => (
            <div
              key={item}
              className={`rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-3.5 text-center text-[13.5px] font-bold text-[var(--text-heading)] shadow-[0_14px_42px_var(--shadow-soft)] backdrop-blur-xl sm:rounded-[24px] sm:px-5 sm:py-4 sm:text-[15px] ${smoothTransitionClass}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlatformsSection;