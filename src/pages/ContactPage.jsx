import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AlertCircle,
  FileText,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const supportItems = [
  {
    icon: AlertCircle,
    title: "Report Issue",
    text: "Broken links or download errors",
  },
  {
    icon: FileText,
    title: "DMCA Request",
    text: "Copyright or removal messages",
  },
  {
    icon: ShieldCheck,
    title: "Format Help",
    text: "MP4, MP3, Reels, Shorts support",
  },
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General Question",
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
        topic: "General Question",
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
        <title>Contact SnapDL Support | Report Video Downloader Issues</title>
        <meta
          name="description"
          content="Contact SnapDL support to report video downloader issues, broken links, MP4 or MP3 format problems, privacy questions, and DMCA requests."
        />
        <link rel="canonical" href="https://www.snapdl.tech/contact" />
      </Helmet>

      <main
        className={`theme-section relative min-h-[calc(100vh-76px)] overflow-hidden ${transitionClass}`}
      >
        <div className="theme-layer theme-hero-dark" />
        <div className="theme-layer theme-hero-light" />

        <div className="pointer-events-none absolute left-1/2 top-10 z-[1] h-64 w-[320px] -translate-x-1/2 rounded-full bg-violet-500/16 blur-[100px] sm:w-[620px]" />
        <div className="pointer-events-none absolute -left-28 bottom-10 z-[1] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-40 z-[1] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

        <section
          className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] max-w-[1180px] items-center px-5 py-6 sm:px-8 lg:px-14"
          aria-labelledby="contact-title"
        >
          <div className="grid w-full items-center gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="inline-grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
                <MessageCircle className="h-6 w-6" />
              </div>

              <p className="mt-4 inline-flex rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
                SnapDL Support
              </p>

              <h1
                id="contact-title"
                className="mt-4 text-[34px] font-black leading-[1.04] tracking-[-0.045em] text-[var(--text-heading)] sm:text-[44px] lg:text-[54px]"
              >
                Contact{" "}
                <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                  SnapDL
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px]">
                Report video downloader issues, broken links, MP4/MP3 format
                problems, privacy questions, or DMCA requests.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {supportItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className={`group flex items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3 shadow-[0_14px_34px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] ${transitionClass}`}
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-[13px] font-bold text-[var(--text-heading)]">
                          {item.title}
                        </h2>
                        <p className="mt-0.5 text-[12px] leading-5 text-[var(--text-muted)]">
                          {item.text}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-[12.5px] leading-5 text-[var(--text-heading)]">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <p>
                    SnapDL never asks for passwords or private social account
                    access.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-4 shadow-[0_20px_65px_var(--shadow-soft)] backdrop-blur-xl sm:p-5 ${transitionClass}`}
            >
              <div className="flex items-center gap-3 border-b border-[var(--border-soft)] pb-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-[20px] font-black tracking-[-0.035em] text-[var(--text-heading)]">
                    Send a message
                  </h2>
                  <p className="mt-1 text-[12.5px] text-[var(--text-muted)]">
                    We’ll review your support request soon.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="Your name"
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]">
                  Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(event) =>
                    updateField("topic", event.target.value)
                  }
                  className="h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none focus:border-violet-400/50"
                >
                  <option>General Question</option>
                  <option>Report Issue</option>
                  <option>Supported Website</option>
                  <option>Privacy Request</option>
                  <option>DMCA Request</option>
                </select>
              </div>

              <div className="mt-3">
                <label className="mb-1.5 block text-[12.5px] font-bold text-[var(--text-heading)]">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Write your message..."
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                />
              </div>

              <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(168,85,247,0.24)] hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${transitionClass}`}
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                <p className="max-w-[280px] text-[11.5px] leading-5 text-[var(--text-soft)]">
                  Frontend demo saves messages locally. Connect backend later
                  for real email delivery.
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default ContactPage;