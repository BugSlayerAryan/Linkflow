import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Globe2,
  HeartHandshake,
  Layers3,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const highlights = [
  {
    icon: Zap,
    title: "Fast Online Downloads",
    text: "SnapDL is built to make video downloading simple, quick, and browser-friendly.",
  },
  {
    icon: ShieldCheck,
    title: "Safe by Design",
    text: "No software installation, no extension required, and no social account password needed.",
  },
  {
    icon: Layers3,
    title: "MP4 & MP3 Formats",
    text: "Preview available video and audio formats before saving supported media files.",
  },
];

const platformCards = [
  {
    title: "YouTube Downloader",
    text: "Download YouTube videos, Shorts, and supported links in MP4 or MP3 format.",
    href: "/youtube",
  },
  {
    title: "Instagram Downloader",
    text: "Save public Instagram Reels, videos, stories, and post videos online.",
    href: "/instagram",
  },
  {
    title: "Facebook Downloader",
    text: "Download Facebook videos, Reels, stories, public posts, and Watch links.",
    href: "/facebook",
  },
  {
    title: "X/Twitter Downloader",
    text: "Save public X and Twitter videos, clips, and post videos in MP4 format.",
    href: "/x.com",
  },
];

const values = [
  "Simple online video downloading experience",
  "Clean interface for mobile, tablet, and desktop",
  "No unnecessary app installation or browser extension",
  "Support for popular platforms and public video links",
  "Privacy-friendly flow without social account login",
  "Helpful preview before saving supported formats",
];

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About SnapDL | Free Online Video Downloader for MP4 & MP3</title>

        <meta
          name="description"
          content="Learn about SnapDL, a free online video downloader for YouTube, Instagram, Facebook, X/Twitter and more. Download videos in MP4 or MP3 format directly from your browser."
        />

        <meta
          name="keywords"
          content="about SnapDL, SnapDL video downloader, online video downloader, free video downloader, MP4 downloader, MP3 downloader, YouTube downloader, Instagram downloader, Facebook downloader, X Twitter video downloader"
        />

        <link rel="canonical" href="https://www.snapdl.tech/about" />

        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SnapDL" />
        <meta
          property="og:title"
          content="About SnapDL - Free Online Video Downloader"
        />
        <meta
          property="og:description"
          content="SnapDL helps users download videos online from YouTube, Instagram, Facebook, X/Twitter and more in MP4 or MP3 format."
        />
        <meta property="og:url" content="https://www.snapdl.tech/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About SnapDL - Online Video Downloader"
        />
        <meta
          name="twitter:description"
          content="Learn how SnapDL makes online video downloads fast, simple, and browser-based."
        />
      </Helmet>

      <main
        className={`theme-section relative min-h-screen overflow-hidden ${transitionClass}`}
      >
        <div className="theme-layer theme-hero-dark" />
        <div className="theme-layer theme-hero-light" />

        <div className="pointer-events-none absolute left-1/2 top-14 z-[1] h-72 w-[340px] -translate-x-1/2 rounded-full bg-violet-500/16 blur-[100px] sm:w-[620px]" />
        <div className="pointer-events-none absolute -left-28 bottom-24 z-[1] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-56 z-[1] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

        <section
          className="relative z-10 mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20"
          aria-labelledby="about-title"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
              <Sparkles className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)] shadow-[0_12px_34px_rgba(124,58,237,0.12)]">
              <HeartHandshake className="h-3.5 w-3.5 text-[var(--badge-icon)]" />
              About SnapDL
            </p>

            <h1
              id="about-title"
              className="mt-5 text-[34px] font-black leading-tight tracking-[-0.045em] text-[var(--text-heading)] sm:text-[48px] lg:text-[60px]"
            >
              Simple, Fast & Secure{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Video Downloader
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              SnapDL is a free online video downloader built to help users save
              public videos from popular platforms in MP4 or MP3 format. Paste a
              video link, check available formats, and download directly from
              your browser.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_42px_rgba(168,85,247,0.26)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 sm:w-auto ${transitionClass}`}
              >
                <Download className="h-4 w-4" />
                Start Downloading
              </Link>

              <Link
                to="/contact"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-6 py-3.5 text-sm font-bold text-[var(--text-heading)] shadow-[0_14px_34px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] active:translate-y-0 sm:w-auto ${transitionClass}`}
              >
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className={`rounded-[26px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_16px_45px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] ${transitionClass}`}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2 className="mt-4 text-[17px] font-bold tracking-[-0.02em] text-[var(--text-heading)]">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--text-muted)]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <section
              className={`rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6 ${transitionClass}`}
              aria-labelledby="mission-title"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                  <Globe2 className="h-6 w-6" />
                </div>

                <div>
                  <h2
                    id="mission-title"
                    className="text-[22px] font-black tracking-[-0.035em] text-[var(--text-heading)] sm:text-[26px]"
                  >
                    Our Mission
                  </h2>

                  <div className="mt-3 space-y-3 text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                    <p>
                      Our mission is to make online video downloading easier for
                      everyone. SnapDL focuses on a clean, fast, and accessible
                      experience for users who want to save public videos,
                      Reels, Shorts, clips, posts, or audio where supported.
                    </p>

                    <p>
                      We support popular platforms like YouTube, Instagram,
                      Facebook, and X/Twitter through one simple browser-based
                      interface. No complicated tools, no heavy software, and no
                      unnecessary steps.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              className={`rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6 ${transitionClass}`}
              aria-labelledby="safety-title"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                  <Lock className="h-6 w-6" />
                </div>

                <div>
                  <h2
                    id="safety-title"
                    className="text-[22px] font-black tracking-[-0.035em] text-[var(--text-heading)] sm:text-[26px]"
                  >
                    Privacy & Safety
                  </h2>

                  <div className="mt-3 space-y-3 text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                    <p>
                      SnapDL does not ask for your YouTube, Instagram,
                      Facebook, or X/Twitter password. You only paste a public
                      link, preview supported formats, and save the file when
                      available.
                    </p>

                    <p>
                      We encourage responsible use. Download only content you
                      own, have permission to save, or are legally allowed to
                      download. Respect copyright, creators, privacy rights, and
                      platform rules.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section
            className="mt-8 rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
            aria-labelledby="platforms-title"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="platforms-title"
                  className="text-[24px] font-black tracking-[-0.04em] text-[var(--text-heading)] sm:text-[30px]"
                >
                  Built for popular video platforms
                </h2>

                <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                  SnapDL gives each platform a focused page with relevant
                  downloader text, clean UI, and SEO-friendly structure.
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-fuchsia-400"
              >
                Try SnapDL
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {platformCards.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`group rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 shadow-[0_12px_34px_var(--shadow-soft)] hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] ${transitionClass}`}
                >
                  <h3 className="text-[15px] font-bold tracking-[-0.02em] text-[var(--text-heading)]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[12.5px] leading-6 text-[var(--text-muted)]">
                    {item.text}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 group-hover:text-fuchsia-400">
                    Open page
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section
            className="mt-8 rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
            aria-labelledby="why-title"
          >
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
                  Why SnapDL
                </p>

                <h2
                  id="why-title"
                  className="mt-4 text-[26px] font-black tracking-[-0.04em] text-[var(--text-heading)] sm:text-[34px]"
                >
                  A smoother way to download videos online
                </h2>

                <p className="mt-3 text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                  SnapDL is made for users who want a direct, clean, and
                  reliable online downloader without installing extra tools.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {values.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-3 text-[13.5px] leading-6 text-[var(--text-muted)]"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-8 rounded-[28px] border border-violet-500/20 bg-violet-500/10 p-5 text-center shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6">
            <h2 className="text-[24px] font-black tracking-[-0.04em] text-[var(--text-heading)] sm:text-[32px]">
              Ready to use SnapDL?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
              Paste a video link and download supported online videos in MP4 or
              MP3 format with a fast, simple, browser-based experience.
            </p>

            <Link
              to="/"
              className={`mx-auto mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_42px_rgba(168,85,247,0.26)] hover:-translate-y-0.5 hover:brightness-110 ${transitionClass}`}
            >
              Go to Downloader
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default AboutPage;