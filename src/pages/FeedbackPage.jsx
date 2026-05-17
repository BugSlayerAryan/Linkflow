import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  // HelpCircle,
  Info,
  Lightbulb,
  Mail,
  MessageCircle,
  MessageSquarePlus,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Stars,
  ThumbsUp,
  WandSparkles,
} from "lucide-react";
import { toast } from "react-toastify";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const feedbackTypes = [
  "General feedback",
  "Feature request",
  "New platform request",
  "UI/UX suggestion",
  "Speed improvement",
  "Format request",
  "Bug improvement idea",
  "Other suggestion",
];

const platforms = [
  "General SnapDL",
  "YouTube",
  "Instagram",
  "Facebook",
  "X / Twitter",
  "TikTok",
  "Vimeo",
  "Dailymotion",
  "Other",
];

const priorities = ["Nice to have", "Useful", "Important", "Very important"];

const feedbackCards = [
  {
    icon: Lightbulb,
    title: "Feature Ideas",
    text: "Suggest new tools, formats, platform pages, or downloader improvements.",
  },
  {
    icon: Stars,
    title: "UI/UX Feedback",
    text: "Tell us how SnapDL can feel smoother, faster, cleaner, and easier to use.",
  },
  {
    icon: Rocket,
    title: "Platform Requests",
    text: "Request support for more websites, social apps, or media formats.",
  },
  {
    icon: HeartHandshake,
    title: "Product Suggestions",
    text: "Share what would make SnapDL more helpful for daily video downloads.",
  },
];

const feedbackTips = [
  "Describe the feature, improvement, or issue clearly",
  "Mention the platform or downloader page you use most",
  "Explain why the suggestion would improve your workflow",
  "Add device or browser details if your feedback is UI-related",
  "Tell us if the suggestion is urgent or just nice to have",
  "Keep the message specific so it is easier to review",
];

const improvementAreas = [
  {
    title: "New downloader pages",
    text: "Request support for additional websites, apps, or video platforms.",
  },
  {
    title: "MP4 and MP3 options",
    text: "Suggest better format labels, quality choices, or audio/video improvements.",
  },
  {
    title: "Mobile experience",
    text: "Share ideas to improve layout, buttons, loading states, and usability on phones.",
  },
  {
    title: "Speed and reliability",
    text: "Tell us where SnapDL can feel faster, smoother, or more stable.",
  },
];

const faqs = [
  {
    question: "What kind of feedback can I send?",
    answer:
      "You can send feature requests, UI/UX suggestions, new platform requests, speed improvement ideas, format requests, and general product feedback.",
  },
  {
    question: "Can I request a new platform?",
    answer:
      "Yes. Use the feedback form and choose New platform request. Mention the platform name and what type of media you want to download.",
  },
  {
    question: "Can I suggest MP4 or MP3 improvements?",
    answer:
      "Yes. You can suggest better MP4 quality options, MP3 audio support, format labels, preview improvements, or download flow changes.",
  },
  {
    question: "Where should I report a broken download?",
    answer:
      "Use the Report Issue page for broken download links, wrong previews, unsupported URLs, MP4 problems, MP3 problems, or website bugs.",
  },
];

const feedbackPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "SnapDL Feedback",
      url: "https://www.snapdl.tech/feedback",
      description:
        "Share feedback for SnapDL, including feature requests, UI/UX suggestions, new platform requests, MP4 and MP3 format improvements, and product ideas.",
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

function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "General feedback",
    platform: "General SnapDL",
    priority: "Useful",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanMessage = formData.message.trim();

    if (!cleanName) {
      toast.error("Please enter your name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (cleanMessage.length < 15) {
      toast.error("Please write feedback with at least 15 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      const savedFeedback = JSON.parse(
        localStorage.getItem("snapdl-feedback") || "[]"
      );

      localStorage.setItem(
        "snapdl-feedback",
        JSON.stringify([
          ...savedFeedback,
          {
            ...formData,
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage,
            createdAt: new Date().toISOString(),
          },
        ])
      );

      toast.success("Feedback saved. Thanks for helping SnapDL improve.");

      setFormData({
        name: "",
        email: "",
        feedbackType: "General feedback",
        platform: "General SnapDL",
        priority: "Useful",
        message: "",
      });
    } catch (error) {
      console.error("Feedback form error:", error);
      toast.error("Feedback failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Feedback | Suggest Features & Improvements for SnapDL</title>

        <meta
          name="description"
          content="Share feedback for SnapDL. Suggest new platforms, video downloader features, MP4 or MP3 format improvements, UI/UX ideas, speed improvements, and product suggestions."
        />

        <meta
          name="keywords"
          content="SnapDL feedback, video downloader feedback, request new platform, SnapDL feature request, MP4 downloader suggestion, MP3 downloader suggestion, downloader UI feedback, SnapDL product suggestions"
        />

        <link rel="canonical" href="https://www.snapdl.tech/feedback" />

        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SnapDL" />

        <meta
          property="og:title"
          content="Feedback - Suggest Features for SnapDL"
        />

        <meta
          property="og:description"
          content="Share SnapDL feedback, feature requests, UI/UX ideas, new platform requests, and MP4/MP3 format suggestions."
        />

        <meta property="og:url" content="https://www.snapdl.tech/feedback" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="SnapDL Feedback - Feature Requests & Suggestions"
        />

        <meta
          name="twitter:description"
          content="Suggest new features, platforms, UI improvements, speed improvements, and format ideas for SnapDL."
        />

        <script type="application/ld+json">
          {JSON.stringify(feedbackPageSchema)}
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
          aria-labelledby="feedback-title"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
              <MessageSquarePlus className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--badge-icon)]" />
              SnapDL Feedback
            </p>

            <h1
              id="feedback-title"
              className="mt-5 text-[34px] font-black leading-tight tracking-[-0.045em] text-[var(--text-heading)] sm:text-[48px] lg:text-[60px]"
            >
              Help Improve{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                SnapDL
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              Share feature requests, UI/UX suggestions, new platform ideas,
              MP4 or MP3 format improvements, and product feedback to make
              SnapDL faster, cleaner, and more useful.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#feedback-form"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_42px_rgba(168,85,247,0.26)] hover:-translate-y-0.5 hover:brightness-110 sm:w-auto ${transitionClass}`}
              >
                Share Feedback
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                to="/report"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-5 py-3 text-sm font-bold text-[var(--text-heading)] shadow-[0_12px_34px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] sm:w-auto ${transitionClass}`}
              >
                Report an Issue
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {feedbackCards.map((item) => {
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
                aria-labelledby="feedback-tips-title"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                    <WandSparkles className="h-6 w-6" />
                  </div>

                  <div>
                    <h2
                      id="feedback-tips-title"
                      className="text-[22px] font-black tracking-[-0.035em] text-[var(--text-heading)] sm:text-[26px]"
                    >
                      How to write helpful feedback
                    </h2>

                    <p className="mt-2 text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                      Clear feedback helps us improve SnapDL’s download flow,
                      format support, speed, and user experience.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid flex-1 content-start gap-2">
                  {feedbackTips.map((item) => (
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

              <div className="grid gap-5 md:grid-cols-2">
                <section
                  className="flex h-full rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
                  aria-labelledby="feedback-safe-title"
                >
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />

                    <div>
                      <h2
                        id="feedback-safe-title"
                        className="text-[18px] font-bold tracking-[-0.02em] text-[var(--text-heading)]"
                      >
                        Privacy note
                      </h2>

                      <p className="mt-2 text-[13.5px] leading-6 text-[var(--text-muted)]">
                        Do not share passwords or private account details.
                        Feedback should be non-sensitive.
                      </p>
                    </div>
                  </div>
                </section>

                <section
                  className="flex h-full rounded-[28px] border border-violet-500/20 bg-violet-500/10 p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
                  aria-labelledby="feedback-review-title"
                >
                  <div className="flex items-start gap-3">
                    <ThumbsUp className="mt-1 h-5 w-5 shrink-0 text-violet-400" />

                    <div>
                      <h2
                        id="feedback-review-title"
                        className="text-[18px] font-bold tracking-[-0.02em] text-[var(--text-heading)]"
                      >
                        Review note
                      </h2>

                      <p className="mt-2 text-[13.5px] leading-6 text-[var(--text-muted)]">
                        Feedback is saved locally now. Connect backend later for
                        real collection.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <form
              id="feedback-form"
              onSubmit={handleSubmit}
              className={`flex h-full flex-col rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_20px_65px_var(--shadow-soft)] backdrop-blur-xl sm:p-6 ${transitionClass}`}
            >
              <div className="flex items-center gap-3 border-b border-[var(--border-soft)] pb-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-[22px] font-black tracking-[-0.035em] text-[var(--text-heading)]">
                    Send feedback
                  </h2>

                  <p className="mt-1 text-[12.5px] leading-5 text-[var(--text-muted)]">
                    Tell us what would make SnapDL better.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="feedback-name"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Name
                  </label>

                  <input
                    id="feedback-name"
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
                    htmlFor="feedback-email"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Email
                  </label>

                  <input
                    id="feedback-email"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                  />
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="feedback-type"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Feedback Type
                  </label>

                  <select
                    id="feedback-type"
                    value={formData.feedbackType}
                    onChange={(event) =>
                      updateField("feedbackType", event.target.value)
                    }
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none focus:border-violet-400/50"
                  >
                    {feedbackTypes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="feedback-platform"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Related Platform
                  </label>

                  <select
                    id="feedback-platform"
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
                  htmlFor="feedback-priority"
                  className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                >
                  Priority
                </label>

                <select
                  id="feedback-priority"
                  value={formData.priority}
                  onChange={(event) =>
                    updateField("priority", event.target.value)
                  }
                  className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none focus:border-violet-400/50"
                >
                  {priorities.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="mt-3 flex flex-1 flex-col">
                <label
                  htmlFor="feedback-message"
                  className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                >
                  Your Feedback
                </label>

                <textarea
                  id="feedback-message"
                  value={formData.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Example: Please add support for another platform, improve mobile layout, or add better MP4 quality labels..."
                  rows={7}
                  className="min-h-[210px] flex-1 resize-none rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                />
              </div>

              <div className="mt-auto flex flex-col items-start gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(168,85,247,0.24)] hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${transitionClass}`}
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                </button>

                <p className="max-w-[320px] text-[11.5px] leading-5 text-[var(--text-soft)]">
                  Specific feedback helps us improve SnapDL faster.
                </p>
              </div>
            </form>
          </div>

          <section
            className="mt-8 rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
            aria-labelledby="improvement-areas-title"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                <MessageCircle className="h-6 w-6" />
              </div>

              <div>
                <h2
                  id="improvement-areas-title"
                  className="text-[24px] font-black tracking-[-0.04em] text-[var(--text-heading)] sm:text-[30px]"
                >
                  What feedback helps most?
                </h2>

                <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                  These are the types of feedback that help improve SnapDL’s
                  video downloader experience.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {improvementAreas.map((item) => (
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
            aria-labelledby="feedback-faq-title"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                <Info className="h-6 w-6" />
              </div>

              <div>
                <h2
                  id="feedback-faq-title"
                  className="text-[24px] font-black tracking-[-0.04em] text-[var(--text-heading)] sm:text-[30px]"
                >
                  Feedback FAQs
                </h2>

                <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                  Quick answers about sending suggestions, feature requests, and
                  product feedback.
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
                  Need help instead?
                </h2>

                <p className="mt-1 text-[14px] leading-6 text-[var(--text-muted)]">
                  Use the Help Center for guides or Report Issue for broken
                  download links and website bugs.
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

export default FeedbackPage;