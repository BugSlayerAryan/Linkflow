import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowDownToLine,
  Check,
  CheckCircle2,
  Clipboard,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import PillBadge from "../common/PillBadge";
import BrandLogo from "../common/BrandLogo";
import HeroPreview from "../home/HeroPreview";
import { fetchMediaInfo } from "../../api/api";

const colorTransitionClass =
  "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const smoothTransitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const platformLinks = [
  { name: "youtube", label: "YouTube Video Downloader", href: "/youtube" },
  {
    name: "instagram",
    label: "Instagram Video Downloader",
    href: "/instagram",
  },
  { name: "facebook", label: "Facebook Video Downloader", href: "/facebook" },
  { name: "twitter", label: "Twitter/X Video Downloader", href: "/x.com" },
];

const supportedDomains = [
  "x.com",
  "twitter.com",
  "mobile.twitter.com",
  "m.twitter.com",
  "t.co",
];

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "SnapDL X Video Downloader",
      url: "https://www.snapdl.tech/x.com",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      description:
        "Download X videos, Twitter videos, posts, clips and supported x.com links online in MP4 format with SnapDL.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I download X videos online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Copy the X or Twitter video URL, paste it into SnapDL, click Download X Video, preview the available formats, and save the video in MP4 format.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download Twitter videos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. SnapDL supports public Twitter and X video links when the post is accessible.",
          },
        },
        {
          "@type": "Question",
          name: "Can I save X videos in MP4?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. SnapDL lets you save supported X and Twitter video links in MP4 format directly from your browser.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download private X videos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SnapDL only works with X or Twitter videos that are publicly accessible through a valid link.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to install an X video downloader app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. SnapDL works online in your browser without software, extensions, or app installation.",
          },
        },
      ],
    },
  ],
};

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function waitForPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

function isValidPlatformUrl(value) {
  try {
    const url = new URL(value.trim());

    if (!["http:", "https:"].includes(url.protocol)) {
      return false;
    }

    const hostname = url.hostname.replace(/^www\./, "").toLowerCase();

    return supportedDomains.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

async function fetchMediaWithRetry(url, onRetry) {
  const maxAttempts = 2;
  let lastErrorData = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const data = await fetchMediaInfo(url);

      if (data?.status === "success") {
        return data;
      }

      lastErrorData = data;

      if (attempt < maxAttempts) {
        onRetry?.();
        await wait(900);
        continue;
      }

      throw new Error(
        data?.error || "Unable to fetch X video details. Please try again."
      );
    } catch (error) {
      if (attempt < maxAttempts) {
        onRetry?.();
        await wait(900);
        continue;
      }

      throw new Error(
        lastErrorData?.error ||
          error?.message ||
          "Backend connection failed. Please try again.",
        { cause: error }
      );
    }
  }

  throw new Error("Unable to fetch X video details. Please try again.");
}

function PreparingOverlay({ progress, loadingText }) {
  const steps = ["Checking X link", "Finding MP4 formats", "Opening preview"];

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] grid place-items-center bg-white/70 px-4 backdrop-blur-xl dark:bg-slate-950/72 sm:px-5">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_35%_65%,rgba(14,165,233,0.16),transparent_28%)]" />

      <div
        className={`relative z-10 w-full max-w-[520px] overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_30px_110px_rgba(15,23,42,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90 dark:shadow-[0_34px_120px_rgba(0,0,0,0.48)] sm:p-6 ${smoothTransitionClass}`}
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/80 to-transparent" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/12 blur-[75px]" />
        <div className="pointer-events-none absolute -bottom-20 left-8 h-48 w-48 rounded-full bg-sky-500/18 blur-[85px]" />

        <div className="relative z-10 flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-sky-500/20 bg-sky-500/12 text-sky-500 shadow-[0_0_34px_rgba(14,165,233,0.20)] dark:text-sky-300">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[18px] font-bold tracking-[-0.02em] text-slate-950 dark:text-white">
                {loadingText}
              </h3>

              <Sparkles className="h-4 w-4 shrink-0 fill-sky-400 text-sky-400" />
            </div>

            <p className="mt-1.5 text-[13.5px] leading-6 text-slate-600 dark:text-slate-300">
              Fetching X preview, title, quality options, and download formats.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>Please wait</span>
            <span>{progress}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-white via-sky-400 to-slate-400 shadow-[0_0_28px_rgba(14,165,233,0.45)] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 animate-pulse bg-white/25" />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-5 grid grid-cols-3 gap-2">
          {steps.map((step, index) => {
            const isDone =
              progress >= 35 + index * 30 || (index === 2 && progress === 100);

            return (
              <div
                key={step}
                className={`rounded-2xl border px-3 py-2.5 text-center text-[11px] font-semibold ${
                  isDone
                    ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-slate-200 bg-slate-50 text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                }`}
              >
                <div className="mx-auto mb-1 grid h-5 w-5 place-items-center">
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                  )}
                </div>

                <span className="line-clamp-1">{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

function PlatformLinks() {
  return (
    <div className="mt-4 flex items-center justify-center gap-3.5 lg:justify-start">
      {platformLinks.map((platform) => (
        <Link
          key={platform.name}
          to={platform.href}
          aria-label={platform.label}
          title={platform.label}
          className="group rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <BrandLogo
            name={platform.name}
            className={`h-10 w-10 shadow-[0_0_18px_rgba(14,165,233,0.16)] transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-110 ${
              platform.name === "twitter"
                ? "scale-110 ring-2 ring-white/35 ring-offset-2 ring-offset-transparent"
                : ""
            }`}
          />

          <span className="sr-only">{platform.label}</span>
        </Link>
      ))}
    </div>
  );
}

function SeoIntroSection() {
  return (
    <section
      id="x-seo-content"
      aria-labelledby="x-seo-title"
      className="platform-x theme-section relative overflow-hidden px-5 py-14 sm:px-8 lg:py-20"
    >
      <div className="theme-layer theme-x-hero-dark" />
      <div className="theme-layer theme-x-hero-light" />

      <div className="pointer-events-none absolute left-[10%] top-10 h-72 w-72 rounded-full bg-white/8 blur-[90px]" />
      <div className="pointer-events-none absolute right-[12%] bottom-10 h-72 w-72 rounded-full bg-sky-400/10 blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-[980px] text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold text-slate-200 shadow-[0_12px_34px_rgba(255,255,255,0.08)]">
          X / Twitter MP4 Downloader
        </p>

        <h2
          id="x-seo-title"
          className={`mt-5 text-2xl font-bold tracking-[-0.02em] text-[var(--text-heading)] sm:text-3xl ${colorTransitionClass}`}
        >
          Free X Video Downloader Online
        </h2>

        <p
          className={`mx-auto mt-4 max-w-[760px] text-[14.5px] leading-7 text-[var(--text-body)] sm:text-[16px] sm:leading-8 ${colorTransitionClass}`}
        >
          SnapDL helps you download X videos, Twitter videos, public posts,
          clips, and supported x.com links in MP4 format. Paste your X or
          Twitter video URL, preview the available quality options, and save the
          video directly from your browser.
        </p>

        <div className="mx-auto mt-7 grid max-w-[860px] gap-3 text-left sm:grid-cols-3">
          {[
            {
              title: "X Videos",
              text: "Download public x.com videos in MP4 format using a simple link.",
            },
            {
              title: "Twitter Videos",
              text: "Save public Twitter videos from posts and supported links.",
            },
            {
              title: "No App Needed",
              text: "Use SnapDL online without installing software or extensions.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <h3 className="text-sm font-bold text-[var(--text-heading)]">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-[var(--text-body)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function XHeroSection() {
  const navigate = useNavigate();
  const progressTimerRef = useRef(null);

  const [videoUrl, setVideoUrl] = useState("");
  const [isPasted, setIsPasted] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Preparing X video");

  const startProgress = () => {
    clearInterval(progressTimerRef.current);

    setProgress(12);

    progressTimerRef.current = setInterval(() => {
      setProgress((current) => {
        if (current >= 86) return current;

        const step = current < 35 ? 7 : current < 65 ? 5 : 2;
        return Math.min(current + step, 86);
      });
    }, 330);
  };

  const stopProgress = () => {
    clearInterval(progressTimerRef.current);
    progressTimerRef.current = null;
  };

  const resetPreparingState = () => {
    stopProgress();

    setTimeout(() => {
      setIsPreparing(false);
      setProgress(0);
      setLoadingText("Preparing X video");
    }, 450);
  };

  useEffect(() => {
    return () => {
      stopProgress();
    };
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (text) {
        setVideoUrl(text);
        setIsPasted(true);

        setTimeout(() => {
          setIsPasted(false);
        }, 1600);
      }
    } catch (error) {
      toast.error("Clipboard access failed. Please paste the X link manually.");
      console.error("Clipboard access failed:", error);
    }
  };

  const handleDownload = async () => {
    const trimmedUrl = videoUrl.trim();

    if (isPreparing) return;

    if (!trimmedUrl) {
      toast.error("Please paste an X video link first.");
      return;
    }

    if (!isValidPlatformUrl(trimmedUrl)) {
      toast.error("Invalid X link. Please paste a valid X video URL.");
      return;
    }

    let shouldResetPreparing = true;

    try {
      setIsPreparing(true);
      setLoadingText("Checking X link...");
      setProgress(12);
      startProgress();

      await waitForPaint();

      const startedAt = Date.now();

      const data = await fetchMediaWithRetry(trimmedUrl, () => {
        setLoadingText("Still working, retrying safely...");
        setProgress((current) => Math.max(current, 52));
      });

      const elapsed = Date.now() - startedAt;

      if (elapsed < 1100) {
        await wait(1100 - elapsed);
      }

      setLoadingText("Opening X video preview...");
      setProgress(100);

      const cacheKey = `linkflow-media-v5:${trimmedUrl}`;

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          url: trimmedUrl,
          data,
          createdAt: Date.now(),
        })
      );

      await wait(450);

      shouldResetPreparing = false;
      navigate(`/download?url=${encodeURIComponent(trimmedUrl)}`);
    } catch (error) {
      console.error("X video prepare error:", error);
      toast.error(error.message || "Backend connection failed.");
    } finally {
      if (shouldResetPreparing) {
        resetPreparingState();
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>X Video Downloader - Download Twitter Videos in MP4 | SnapDL</title>

        <meta
          name="description"
          content="Use SnapDL X Video Downloader to download X videos, Twitter videos, posts, clips and supported x.com links online in MP4 format. Paste an X or Twitter URL and save videos on any device."
        />

        <meta
          name="keywords"
          content="X video downloader, Twitter video downloader, download X video, download Twitter video, X MP4 downloader, Twitter MP4 downloader, save X video online, save Twitter video online, download x.com videos"
        />

        <link rel="canonical" href="https://www.snapdl.tech/x.com" />

        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SnapDL" />

        <meta
          property="og:title"
          content="X Video Downloader - Download Twitter Videos in MP4"
        />

        <meta
          property="og:description"
          content="Paste an X or Twitter video post link and download it online in MP4 format with SnapDL."
        />

        <meta property="og:url" content="https://www.snapdl.tech/x.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="X Video Downloader - SnapDL" />

        <meta
          name="twitter:description"
          content="Fast online X video downloader for saving X and Twitter videos in MP4 format."
        />

        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <section
        id="hero"
        className="platform-x theme-section relative overflow-hidden lg:min-h-[calc(100vh-72px)]"
      >
        <div className="theme-layer theme-x-hero-dark" />
        <div className="theme-layer theme-x-hero-light" />

        <div className="theme-grid absolute inset-0 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line-2)_1px,transparent_1px)] bg-[size:82px_82px] opacity-20" />

        <div className="pointer-events-none absolute left-[7%] top-[10%] h-80 w-80 rounded-full bg-white/8 blur-[105px]" />
        <div className="pointer-events-none absolute right-[12%] top-[18%] h-96 w-96 rounded-full bg-sky-400/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[6%] left-[43%] h-72 w-72 rounded-full bg-slate-400/8 blur-[100px]" />

        {isPreparing && (
          <PreparingOverlay progress={progress} loadingText={loadingText} />
        )}

        <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-14 lg:py-12 xl:gap-12 xl:px-20 2xl:px-24">
          <div className="relative z-10 mx-auto w-full max-w-[680px] text-center lg:mx-0 lg:text-left">
            <PillBadge>X / Twitter Video Downloader</PillBadge>

            <h1
              className={`mx-auto mt-5 max-w-[640px] text-[39px] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--text-heading)] xs:text-[43px] sm:text-[54px] md:text-[62px] lg:mx-0 lg:text-[60px] xl:text-[66px] ${colorTransitionClass}`}
            >
              <span className="whitespace-nowrap">Twitter Video</span>
              <br />
              Downloader
              <br />
              <span className="bg-gradient-to-r from-white via-sky-300 to-slate-400 bg-clip-text text-transparent">
                X MP4
              </span>
            </h1>

            <p
              className={`mx-auto mt-5 max-w-[580px] text-[14.5px] leading-7 text-[var(--text-body)] sm:text-[16px] sm:leading-8 lg:mx-0 lg:text-[17px] ${colorTransitionClass}`}
            >
              Download X and Twitter videos, clips, and public post videos
              online in high-quality MP4. Paste your X or Twitter video URL,
              preview available formats, and save it on any device.
            </p>

            <div className="mx-auto mt-7 max-w-[460px] rounded-[1.35rem] border border-[var(--input-border)] bg-[var(--input-shell-bg)] p-1.5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:mx-0">
              <div className="flex items-center gap-2 rounded-[1rem] border border-[var(--input-border)] bg-[var(--input-inner-bg)] px-2.5 py-2.5 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-3">
                <div className="hidden h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white sm:grid">
                  <Search className="h-4 w-4" />
                </div>

                <Search className="h-4 w-4 shrink-0 text-white sm:hidden" />

                <label htmlFor="x-url-input" className="sr-only">
                  Paste X video link
                </label>

                <input
                  id="x-url-input"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  value={videoUrl}
                  disabled={isPreparing}
                  onChange={(event) => setVideoUrl(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleDownload();
                  }}
                  placeholder="Paste X video link here."
                  className={`h-9 min-w-0 flex-1 bg-transparent text-[13px] font-normal text-[var(--text-heading)] outline-none placeholder:text-[var(--input-placeholder)] disabled:cursor-not-allowed sm:text-sm ${colorTransitionClass}`}
                />

                <button
                  type="button"
                  onClick={handlePaste}
                  disabled={isPreparing}
                  aria-label="Paste X video link from clipboard"
                  className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--input-border)] bg-[var(--input-button-bg)] px-3 text-xs font-semibold text-[var(--input-button-text)] shadow-inner shadow-white/5 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-sky-400/35 hover:bg-sky-500/15 hover:text-sky-300 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:h-10 sm:px-3.5"
                >
                  {isPasted ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="hidden xs:inline">Pasted</span>
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-3.5 w-3.5" />
                      <span className="hidden xs:inline">Paste</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isPreparing}
              className="mx-auto mt-4 inline-flex w-full max-w-[460px] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-white via-sky-300 to-slate-400 px-6 py-4 text-sm font-bold text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.18)] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-75 lg:mx-0"
            >
              {isPreparing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowDownToLine className="h-4 w-4" />
              )}

              {isPreparing ? loadingText : "Download X Video"}
            </button>

            <div className="mt-6">
              <p
                className={`text-center text-xs font-medium text-[var(--text-soft)] lg:text-left ${colorTransitionClass}`}
              >
                More Video Downloaders
              </p>

              <PlatformLinks />
            </div>

            <div
              className={`mx-auto mt-5 flex max-w-[560px] flex-wrap justify-center gap-x-4 gap-y-3 text-[11px] font-medium text-[var(--text-muted)] lg:mx-0 lg:justify-start ${colorTransitionClass}`}
            >
              {[
                "X & Twitter Videos",
                "MP4 Video Downloads",
                "Works on All Devices",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-sky-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroPreview />
          </div>
        </div>
      </section>

      <SeoIntroSection />
    </>
  );
}

export default XHeroSection;