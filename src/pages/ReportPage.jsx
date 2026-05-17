import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Bug,
  CheckCircle2,
  Clock3,
  FileWarning,
  HelpCircle,
  Info,
  Link2,
  Mail,
  MonitorSmartphone,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { toast } from "react-toastify";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const issueTypes = [
  "Broken download",
  "Unsupported link",
  "Wrong preview",
  "MP4 format not showing",
  "MP3 format not showing",
  "Slow loading",
  "Website bug",
  "Security concern",
  "Other issue",
];

const platforms = [
  "YouTube",
  "Instagram",
  "Facebook",
  "X / Twitter",
  "TikTok",
  "Vimeo",
  "Dailymotion",
  "Other",
];

const reportCards = [
  {
    icon: Link2,
    title: "Broken Download Link",
    text: "Report links that fail, load forever, or cannot fetch video details.",
  },
  {
    icon: Wrench,
    title: "Format Problems",
    text: "Tell us when MP4, MP3, video quality, audio, or preview options do not appear.",
  },
  {
    icon: Bug,
    title: "Website Bug",
    text: "Share UI problems, mobile layout bugs, button issues, or loading errors.",
  },
  {
    icon: ShieldAlert,
    title: "Safety Concern",
    text: "Report suspicious redirects, unsafe behavior, or security-related issues.",
  },
];

const checklistItems = [
  "The video URL or page link you tried to download",
  "The platform name, such as YouTube, Instagram, Facebook, or X/Twitter",
  "Your device type, such as mobile, tablet, desktop, Android, iPhone, or laptop",
  "Your browser name, such as Chrome, Safari, Edge, Firefox, or Brave",
  "What happened after clicking the download button",
  "Any error message you saw on the page",
];

const commonIssues = [
  {
    title: "Preview does not load",
    text: "This can happen when the link is private, unsupported, removed, expired, or restricted by the source platform.",
  },
  {
    title: "MP4 format not showing",
    text: "Some videos may not provide every quality option. Report the link so we can review format detection.",
  },
  {
    title: "MP3 option missing",
    text: "Audio formats depend on source availability. Some links may only show video formats.",
  },
  {
    title: "Wrong video preview",
    text: "Paste the exact link again and report it with platform name so the issue can be checked.",
  },
];

const faqs = [
  {
    question: "What should I include in a SnapDL issue report?",
    answer:
      "Include the video URL, platform name, device, browser, issue type, and a short message explaining what happened after clicking the download button.",
  },
  {
    question: "Can I report MP4 or MP3 download problems?",
    answer:
      "Yes. Use this Report Issue page to report MP4 format not showing, MP3 audio not available, wrong preview, failed download, or unsupported link problems.",
  },
  {
    question: "Why is my video link not working?",
    answer:
      "A link may fail if the video is private, removed, region-restricted, unsupported, expired, or blocked by the source platform.",
  },
  {
    question: "Does SnapDL support private videos?",
    answer:
      "No. SnapDL is intended for public links only and does not ask for private social account access or passwords.",
  },
];

const reportPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Report SnapDL Issue",
      url: "https://www.snapdl.tech/report",
      description:
        "Report SnapDL video downloader issues, broken download links, unsupported URLs, MP4 and MP3 format problems, wrong previews, and website bugs.",
      isPartOf: {
        "@type": "WebSite",
        name: "SnapDL",
        url: "https://www.snapdl.tech/",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

function ReportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "Broken download",
    platform: "YouTube",
    videoUrl: "",
    device: "",
    browser: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const isValidOptionalUrl = (value) => {
    if (!value) return true;

    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol);
    } catch {
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanUrl = formData.videoUrl.trim();
    const cleanDevice = formData.device.trim();
    const cleanBrowser = formData.browser.trim();
    const cleanMessage = formData.message.trim();

    if (!cleanName) {
      toast.error("Please enter your name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (cleanUrl && !isValidOptionalUrl(cleanUrl)) {
      toast.error("Please enter a valid video URL or leave it empty.");
      return;
    }

    if (cleanMessage.length < 15) {
      toast.error("Please describe the issue with at least 15 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      const savedReports = JSON.parse(
        localStorage.getItem("snapdl-report-issues") || "[]"
      );

      localStorage.setItem(
        "snapdl-report-issues",
        JSON.stringify([
          ...savedReports,
          {
            ...formData,
            name: cleanName,
            email: cleanEmail,
            videoUrl: cleanUrl,
            device: cleanDevice,
            browser: cleanBrowser,
            message: cleanMessage,
            createdAt: new Date().toISOString(),
          },
        ])
      );

      toast.success("Issue report saved. We’ll review it soon.");

      setFormData({
        name: "",
        email: "",
        issueType: "Broken download",
        platform: "YouTube",
        videoUrl: "",
        device: "",
        browser: "",
        message: "",
      });
    } catch (error) {
      console.error("Report form error:", error);
      toast.error("Report failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Report Issue | SnapDL Video Downloader Bug & Error Support</title>

        <meta
          name="description"
          content="Report SnapDL video downloader issues, broken download links, unsupported URLs, wrong previews, website bugs, MP4 format not showing, MP3 format missing, and download errors."
        />

        <meta
          name="keywords"
          content="report SnapDL issue, SnapDL not working, video downloader not working, broken download link, MP4 not showing, MP3 not showing, wrong video preview, downloader error, report video download problem, unsupported video link"
        />

        <link rel="canonical" href="https://www.snapdl.tech/report" />

        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SnapDL" />

        <meta
          property="og:title"
          content="Report SnapDL Issue - Video Downloader Support"
        />

        <meta
          property="og:description"
          content="Report broken download links, MP4/MP3 format problems, unsupported URLs, wrong previews, and SnapDL website bugs."
        />

        <meta property="og:url" content="https://www.snapdl.tech/report" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Report SnapDL Issue - Downloader Support"
        />

        <meta
          name="twitter:description"
          content="Tell us about SnapDL download errors, broken links, MP4/MP3 problems, and unsupported video URLs."
        />

        <script type="application/ld+json">
          {JSON.stringify(reportPageSchema)}
        </script>
      </Helmet>

      <main
        className={`theme-section relative min-h-screen overflow-hidden ${transitionClass}`}
      >
        <div className="theme-layer theme-hero-dark" />
        <div className="theme-layer theme-hero-light" />

        <div className="pointer-events-none absolute left-1/2 top-12 z-[1] h-72 w-[340px] -translate-x-1/2 rounded-full bg-violet-500/16 blur-[100px] sm:w-[620px]" />
        <div className="pointer-events-none absolute -left-28 bottom-20 z-[1] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-52 z-[1] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

        <section
          className="relative z-10 mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20"
          aria-labelledby="report-title"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
              <AlertCircle className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--badge-icon)]" />
              Report a SnapDL Issue
            </p>

            <h1
              id="report-title"
              className="mt-5 text-[34px] font-black leading-tight tracking-[-0.045em] text-[var(--text-heading)] sm:text-[48px] lg:text-[60px]"
            >
              Report Downloader{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Problems
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              Found a broken video download link, unsupported URL, wrong
              preview, MP4 format issue, MP3 audio problem, or SnapDL website
              bug? Send a detailed report so we can improve the downloader.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/help"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-5 py-3 text-sm font-bold text-[var(--text-heading)] shadow-[0_12px_34px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] sm:w-auto ${transitionClass}`}
              >
                <HelpCircle className="h-4 w-4" />
                Check Help Center
              </Link>

              <a
                href="#report-form"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_42px_rgba(168,85,247,0.26)] hover:-translate-y-0.5 hover:brightness-110 sm:w-auto ${transitionClass}`}
              >
                Report Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reportCards.map((item) => {
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

          <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:items-stretch">
            <div className="flex h-full flex-col gap-5">
              <section
                className={`flex flex-1 flex-col rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6 ${transitionClass}`}
                aria-labelledby="checklist-title"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                    <FileWarning className="h-6 w-6" />
                  </div>

                  <div>
                    <h2
                      id="checklist-title"
                      className="text-[22px] font-black tracking-[-0.035em] text-[var(--text-heading)] sm:text-[26px]"
                    >
                      What to include
                    </h2>

                    <p className="mt-2 text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                      A clear report helps us understand video downloader
                      issues faster.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid flex-1 content-start gap-2">
                  {checklistItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-3 text-[13px] leading-6 text-[var(--text-muted)]"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <section
                  className="flex h-full rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
                  aria-labelledby="safe-title"
                >
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />

                    <div>
                      <h2
                        id="safe-title"
                        className="text-[18px] font-bold tracking-[-0.02em] text-[var(--text-heading)]"
                      >
                        Safety reminder
                      </h2>

                      <p className="mt-2 text-[13.5px] leading-6 text-[var(--text-muted)]">
                        SnapDL never asks for passwords. Only report public
                        links and non-sensitive details.
                      </p>
                    </div>
                  </div>
                </section>

                <section
                  className="flex h-full rounded-[28px] border border-violet-500/20 bg-violet-500/10 p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
                  aria-labelledby="response-title"
                >
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-1 h-5 w-5 shrink-0 text-violet-400" />

                    <div>
                      <h2
                        id="response-title"
                        className="text-[18px] font-bold tracking-[-0.02em] text-[var(--text-heading)]"
                      >
                        Response note
                      </h2>

                      <p className="mt-2 text-[13.5px] leading-6 text-[var(--text-muted)]">
                        Reports are saved locally now. Connect backend later for
                        real delivery.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <form
              id="report-form"
              onSubmit={handleSubmit}
              className={`flex h-full flex-col rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_20px_65px_var(--shadow-soft)] backdrop-blur-xl sm:p-6 ${transitionClass}`}
            >
              <div className="flex items-center gap-3 border-b border-[var(--border-soft)] pb-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-[22px] font-black tracking-[-0.035em] text-[var(--text-heading)]">
                    Issue details
                  </h2>

                  <p className="mt-1 text-[12.5px] leading-5 text-[var(--text-muted)]">
                    Add the video link and describe what went wrong.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="report-name"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Name
                  </label>

                  <input
                    id="report-name"
                    type="text"
                    value={formData.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="report-email"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Email
                  </label>

                  <input
                    id="report-email"
                    type="email"
                    value={formData.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                  />
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="report-issue-type"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Issue Type
                  </label>

                  <select
                    id="report-issue-type"
                    value={formData.issueType}
                    onChange={(event) =>
                      updateField("issueType", event.target.value)
                    }
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none focus:border-violet-400/50"
                  >
                    {issueTypes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="report-platform"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Platform
                  </label>

                  <select
                    id="report-platform"
                    value={formData.platform}
                    onChange={(event) =>
                      updateField("platform", event.target.value)
                    }
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none focus:border-violet-400/50"
                  >
                    {platforms.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label
                  htmlFor="report-video-url"
                  className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                >
                  Video Link
                </label>

                <input
                  id="report-video-url"
                  type="url"
                  value={formData.videoUrl}
                  onChange={(event) =>
                    updateField("videoUrl", event.target.value)
                  }
                  placeholder="https://..."
                  autoComplete="url"
                  className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                />
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="report-device"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Device
                  </label>

                  <input
                    id="report-device"
                    type="text"
                    value={formData.device}
                    onChange={(event) =>
                      updateField("device", event.target.value)
                    }
                    placeholder="Mobile, desktop, iPhone..."
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="report-browser"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Browser
                  </label>

                  <input
                    id="report-browser"
                    type="text"
                    value={formData.browser}
                    onChange={(event) =>
                      updateField("browser", event.target.value)
                    }
                    placeholder="Chrome, Safari, Edge..."
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-1 flex-col">
                <label
                  htmlFor="report-message"
                  className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                >
                  What happened?
                </label>

                <textarea
                  id="report-message"
                  value={formData.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Example: The preview loads, but MP4 format does not show after clicking Download..."
                  rows={7}
                  className="min-h-[190px] flex-1 resize-none rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                />
              </div>

              <div className="mt-auto flex flex-col items-start gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(168,85,247,0.24)] hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${transitionClass}`}
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </button>

                <p className="max-w-[320px] text-[11.5px] leading-5 text-[var(--text-soft)]">
                  Include exact link and browser details for faster review.
                </p>
              </div>
            </form>
          </div>

          <section
            className="mt-8 rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
            aria-labelledby="common-issues-title"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                <MonitorSmartphone className="h-6 w-6" />
              </div>

              <div>
                <h2
                  id="common-issues-title"
                  className="text-[24px] font-black tracking-[-0.04em] text-[var(--text-heading)] sm:text-[30px]"
                >
                  Common downloader issues
                </h2>

                <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                  These are common reasons a video downloader link may not work
                  as expected.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {commonIssues.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4 shadow-[0_12px_34px_var(--shadow-soft)]"
                >
                  <h3 className="text-[14px] font-bold text-[var(--text-heading)]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-[var(--text-muted)]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="mt-8 rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
            aria-labelledby="report-faq-title"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                <Info className="h-6 w-6" />
              </div>

              <div>
                <h2
                  id="report-faq-title"
                  className="text-[24px] font-black tracking-[-0.04em] text-[var(--text-heading)] sm:text-[30px]"
                >
                  Report issue FAQs
                </h2>

                <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                  Quick answers about reporting SnapDL video downloader
                  problems.
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

          <div className="mt-8 rounded-[28px] border border-violet-500/20 bg-violet-500/10 p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-[20px] font-black tracking-[-0.03em] text-[var(--text-heading)]">
                  Not sure what to report?
                </h2>

                <p className="mt-1 text-[14px] leading-6 text-[var(--text-muted)]">
                  Visit the Help Center for basic download instructions or
                  contact SnapDL support for general questions.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  to="/help"
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-5 py-3 text-sm font-bold text-[var(--text-heading)] shadow-[0_12px_34px_var(--shadow-soft)] hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] ${transitionClass}`}
                >
                  Help Center
                </Link>

                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_42px_rgba(168,85,247,0.24)] hover:-translate-y-0.5 hover:brightness-110 ${transitionClass}`}
                >
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ReportPage;