import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Bug,
  CheckCircle2,
  Clock3,
  FileText,
  HelpCircle,
  LifeBuoy,
  Lock,
  Mail,
  MessageCircle,
  MessageSquarePlus,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const supportItems = [
  {
    icon: HelpCircle,
    title: "Help Center",
    text: "Learn how to use SnapDL, download videos, and fix common issues.",
    href: "/help",
  },
  {
    icon: Bug,
    title: "Report Issue",
    text: "Report broken links, download errors, or MP4/MP3 format problems.",
    href: "/report",
  },
  {
    icon: MessageSquarePlus,
    title: "Feedback",
    text: "Share ideas, feature requests, and new platform suggestions.",
    href: "/feedback",
  },
  {
    icon: FileText,
    title: "DMCA Request",
    text: "Submit copyright, takedown, or removal-related requests.",
    href: "/dmca",
  },
];

const contactReasons = [
  "General SnapDL support",
  "Video downloader questions",
  "Supported website request",
  "Privacy or account safety question",
  "Business or partnership message",
  "Other support request",
];

const faqs = [
  {
    question: "How can I contact SnapDL support?",
    answer:
      "Use this Contact page to send a general support message. For broken links or download errors, use the Report Issue page for faster review.",
  },
  {
    question: "Can I report MP4 or MP3 download problems?",
    answer:
      "Yes. You can contact us about MP4 video download issues, MP3 audio options, unsupported links, wrong previews, or failed downloads.",
  },
  {
    question: "Does SnapDL ask for social account passwords?",
    answer:
      "No. SnapDL never asks for YouTube, Instagram, Facebook, X/Twitter, or other social media passwords.",
  },
  {
    question: "Where should I send feedback?",
    answer:
      "Use the Feedback page for feature requests, UI suggestions, new platform ideas, or product improvement suggestions.",
  },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "Contact SnapDL Support",
      url: "https://www.snapdl.tech/contact",
      description:
        "Contact SnapDL support for online video downloader questions, MP4 and MP3 format help, privacy requests, supported website questions, and general support.",
      mainEntity: {
        "@type": "Organization",
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

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General Support",
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

    if (cleanMessage.length < 10) {
      toast.error("Please write a message with at least 10 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      const savedMessages = JSON.parse(
        localStorage.getItem("snapdl-contact-messages") || "[]"
      );

      localStorage.setItem(
        "snapdl-contact-messages",
        JSON.stringify([
          ...savedMessages,
          {
            ...formData,
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage,
            createdAt: new Date().toISOString(),
          },
        ])
      );

      toast.success("Message saved successfully. We’ll review it soon.");

      setFormData({
        name: "",
        email: "",
        topic: "General Support",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Message failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact SnapDL Support | Online Video Downloader Help</title>

        <meta
          name="description"
          content="Contact SnapDL support for online video downloader help, MP4 and MP3 format questions, supported website requests, privacy questions, and general support."
        />

        <meta
          name="keywords"
          content="contact SnapDL, SnapDL support, online video downloader support, MP4 downloader help, MP3 downloader help, video downloader contact, SnapDL help, downloader support"
        />

        <link rel="canonical" href="https://www.snapdl.tech/contact" />

        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SnapDL" />

        <meta
          property="og:title"
          content="Contact SnapDL Support - Online Video Downloader Help"
        />

        <meta
          property="og:description"
          content="Get help with SnapDL video downloads, MP4 and MP3 formats, supported websites, privacy questions, and general support."
        />

        <meta property="og:url" content="https://www.snapdl.tech/contact" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Contact SnapDL Support - Video Downloader Help"
        />

        <meta
          name="twitter:description"
          content="Contact SnapDL for online video downloader support, MP4/MP3 help, and supported website questions."
        />

        <script type="application/ld+json">
          {JSON.stringify(contactPageSchema)}
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
          aria-labelledby="contact-title"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
              <MessageCircle className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)] shadow-[0_12px_34px_rgba(124,58,237,0.12)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--badge-icon)]" />
              SnapDL Support
            </p>

            <h1
              id="contact-title"
              className="mt-5 text-[34px] font-black leading-tight tracking-[-0.045em] text-[var(--text-heading)] sm:text-[48px] lg:text-[60px]"
            >
              Contact{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                SnapDL Support
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              Need help with SnapDL? Contact us for online video downloader
              questions, MP4 or MP3 format help, supported website requests,
              privacy questions, or general support.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {supportItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`group rounded-[26px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_16px_45px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] ${transitionClass}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                      <Icon className="h-5 w-5" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-[var(--text-soft)] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-violet-400" />
                  </div>

                  <h2 className="mt-4 text-[17px] font-bold tracking-[-0.02em] text-[var(--text-heading)]">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-[13.5px] leading-6 text-[var(--text-muted)]">
                    {item.text}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5">
            <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
              <section
                className={`flex h-full flex-col rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6 ${transitionClass}`}
                aria-labelledby="contact-reasons-title"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                    <LifeBuoy className="h-6 w-6" />
                  </div>

                  <div>
                    <h2
                      id="contact-reasons-title"
                      className="text-[22px] font-black tracking-[-0.035em] text-[var(--text-heading)] sm:text-[26px]"
                    >
                      What can we help with?
                    </h2>

                    <p className="mt-2 text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                      Use this page for general SnapDL support. For broken
                      downloads, feature ideas, or copyright requests, the quick
                      links above will guide you to the best page.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid flex-1 gap-2">
                  {contactReasons.map((item) => (
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

              <form
                onSubmit={handleSubmit}
                className={`flex h-full flex-col rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_20px_65px_var(--shadow-soft)] backdrop-blur-xl sm:p-6 ${transitionClass}`}
              >
                <div className="flex items-center gap-3 border-b border-[var(--border-soft)] pb-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-[22px] font-black tracking-[-0.035em] text-[var(--text-heading)]">
                      Send a support message
                    </h2>

                    <p className="mt-1 text-[12.5px] leading-5 text-[var(--text-muted)]">
                      Tell us how we can help with SnapDL.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                    >
                      Name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Your name"
                      autoComplete="name"
                      className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
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

                <div className="mt-3">
                  <label
                    htmlFor="contact-topic"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Topic
                  </label>

                  <select
                    id="contact-topic"
                    value={formData.topic}
                    onChange={(event) =>
                      updateField("topic", event.target.value)
                    }
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none focus:border-violet-400/50"
                  >
                    <option>General Support</option>
                    <option>Video Downloader Help</option>
                    <option>Supported Website Request</option>
                    <option>Format Help</option>
                    <option>Privacy Question</option>
                    <option>Business Message</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]"
                  >
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    placeholder="Write your message..."
                    rows={6}
                    className="w-full resize-none rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                  />
                </div>

                <div className="mt-auto flex flex-col items-start gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(168,85,247,0.24)] hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${transitionClass}`}
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>

                  <p className="max-w-[300px] text-[11.5px] leading-5 text-[var(--text-soft)]">
                    For broken links, use the Report Issue page and include the
                    video URL.
                  </p>
                </div>
              </form>
            </div>

            <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
              <section
                className={`flex h-full rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6 ${transitionClass}`}
                aria-labelledby="trust-title"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                    <Lock className="h-6 w-6" />
                  </div>

                  <div>
                    <h2
                      id="trust-title"
                      className="text-[22px] font-black tracking-[-0.035em] text-[var(--text-heading)] sm:text-[26px]"
                    >
                      Privacy-first support
                    </h2>

                    <p className="mt-2 text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                      SnapDL never asks for passwords, private social media
                      account access, or login credentials. Only share public
                      links and non-sensitive details when contacting support.
                    </p>
                  </div>
                </div>
              </section>

              <section
                className="flex h-full rounded-[30px] border border-violet-500/20 bg-violet-500/10 p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
                aria-labelledby="response-title"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                    <Clock3 className="h-6 w-6" />
                  </div>

                  <div>
                    <h2
                      id="response-title"
                      className="text-[22px] font-black tracking-[-0.035em] text-[var(--text-heading)] sm:text-[26px]"
                    >
                      Support response note
                    </h2>

                    <p className="mt-2 text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                      This frontend demo currently saves messages locally in the
                      browser. Connect your backend or email service later for
                      real support delivery.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <section
            className="mt-8 rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
            aria-labelledby="contact-faq-title"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                <AlertCircle className="h-6 w-6" />
              </div>

              <div>
                <h2
                  id="contact-faq-title"
                  className="text-[24px] font-black tracking-[-0.04em] text-[var(--text-heading)] sm:text-[30px]"
                >
                  Contact support FAQs
                </h2>

                <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
                  Quick answers before you send a support message to SnapDL.
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
                    Need faster help?
                  </h2>

                  <p className="mt-1 text-[14px] leading-6 text-[var(--text-muted)]">
                    Visit the Help Center or Report Issue page for more specific
                    SnapDL support options.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  to="/help"
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-5 py-3 text-sm font-bold text-[var(--text-heading)] shadow-[0_12px_34px_var(--shadow-soft)] hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] ${transitionClass}`}
                >
                  Help Center
                </Link>

                <Link
                  to="/report"
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_42px_rgba(168,85,247,0.24)] hover:-translate-y-0.5 hover:brightness-110 ${transitionClass}`}
                >
                  Report Issue
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

export default ContactPage;