import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
//   CheckCircle2,
  Download,
  FileQuestion,
  HelpCircle,
//   Layers3,
  Link2,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const helpCards = [
  {
    icon: Link2,
    title: "Paste a Video Link",
    text: "Copy a public video URL from YouTube, Instagram, Facebook, X/Twitter, or another supported platform.",
  },
  {
    icon: PlayCircle,
    title: "Preview Available Formats",
    text: "SnapDL checks the link and shows available MP4 video or MP3 audio download options when supported.",
  },
  {
    icon: Download,
    title: "Download Online",
    text: "Choose your preferred format and save the video directly from your browser without installing software.",
  },
];

const faqs = [
  {
    question: "How do I download videos with SnapDL?",
    answer:
      "Copy a public video link, paste it into SnapDL, click the download button, preview available formats, and save the file in MP4 or MP3 format when available.",
  },
  {
    question: "Which platforms does SnapDL support?",
    answer:
      "SnapDL supports popular platforms such as YouTube, Instagram, Facebook, X/Twitter, TikTok, Vimeo, Dailymotion, and many other websites where public links are supported.",
  },
  {
    question: "Can I download videos in MP4?",
    answer:
      "Yes. SnapDL can show MP4 video download options when the pasted link is supported and publicly accessible.",
  },
  {
    question: "Can I download audio in MP3?",
    answer:
      "SnapDL can show MP3 or audio download options when supported by the video source and available formats.",
  },
  {
    question: "Do I need to install an app?",
    answer:
      "No. SnapDL works online in your browser, so you do not need to install software, extensions, or mobile apps.",
  },
  {
    question: "Can I download private videos?",
    answer:
      "No. SnapDL is intended for public links only. Private, restricted, or account-only content may not work.",
  },
];

function HelpPage() {
  return (
    <>
      <Helmet>
        <title>Help Center | How to Use SnapDL Video Downloader</title>
        <meta
          name="description"
          content="Visit the SnapDL Help Center to learn how to download videos online from YouTube, Instagram, Facebook, X/Twitter and more in MP4 or MP3 format."
        />
        <meta
          name="keywords"
          content="SnapDL help center, how to download videos online, video downloader help, MP4 download help, MP3 download help, YouTube downloader help, Instagram downloader help, Facebook downloader help"
        />
        <link rel="canonical" href="https://www.snapdl.tech/help" />
        <meta name="robots" content="index, follow" />
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
          aria-labelledby="help-title"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
              <HelpCircle className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--badge-icon)]" />
              SnapDL Help Center
            </p>

            <h1
              id="help-title"
              className="mt-5 text-[34px] font-black leading-tight tracking-[-0.045em] text-[var(--text-heading)] sm:text-[48px] lg:text-[60px]"
            >
              How to Use{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                SnapDL
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              Learn how to download videos online from YouTube, Instagram,
              Facebook, X/Twitter, and more in MP4 or MP3 format using SnapDL.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {helpCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className={`rounded-[26px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_16px_45px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] ${transitionClass}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-black text-[var(--text-soft)]">
                      0{index + 1}
                    </span>
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

          <section
            className="mt-8 rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
            aria-labelledby="help-faq-title"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                <FileQuestion className="h-6 w-6" />
              </div>

              <div>
                <h2
                  id="help-faq-title"
                  className="text-[24px] font-black tracking-[-0.04em] text-[var(--text-heading)] sm:text-[32px]"
                >
                  Frequently Asked Questions
                </h2>

                <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                  Quick answers about video downloads, supported platforms,
                  MP4, MP3, public links, and browser-based downloading.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {faqs.map((item) => (
                <article
                  key={item.question}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 shadow-[0_12px_34px_var(--shadow-soft)]"
                >
                  <h3 className="text-[14px] font-bold text-[var(--text-heading)]">
                    {item.question}
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-[var(--text-muted)]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-8 rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <h2 className="text-[18px] font-bold text-[var(--text-heading)]">
                    Still need help?
                  </h2>
                  <p className="mt-1 text-[14px] leading-6 text-[var(--text-muted)]">
                    Contact SnapDL support for downloader issues, format help,
                    privacy questions, or supported website requests.
                  </p>
                </div>
              </div>

              <Link
                to="/contact"
                className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_42px_rgba(168,85,247,0.24)] hover:-translate-y-0.5 hover:brightness-110 ${transitionClass}`}
              >
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HelpPage;