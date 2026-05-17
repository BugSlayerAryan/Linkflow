import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

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
        <title>Contact SnapDL | Report Issue</title>
        <meta
          name="description"
          content="Contact SnapDL for support, report an issue, ask a question, or send a DMCA request related to SnapDL online video downloader tools."
        />
        <link rel="canonical" href="https://www.snapdl.tech/contact" />
      </Helmet>

      <main className={`theme-section relative min-h-screen overflow-hidden ${transitionClass}`}>
        <div className="theme-layer theme-hero-dark" />
        <div className="theme-layer theme-hero-light" />

        <div className="pointer-events-none absolute left-1/2 top-16 z-[1] h-72 w-[340px] -translate-x-1/2 rounded-full bg-violet-500/16 blur-[100px] sm:w-[620px]" />
        <div className="pointer-events-none absolute -left-28 bottom-20 z-[1] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-52 z-[1] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1180px] px-5 py-14 sm:px-8 sm:py-20 lg:px-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
              <MessageCircle className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
              SnapDL Support
            </p>

            <h1 className="mt-5 text-[34px] font-black leading-tight tracking-[-0.04em] text-[var(--text-heading)] sm:text-[48px] lg:text-[56px]">
              Contact{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                SnapDL
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              Ask a question, report an issue, request support, or send a DMCA-related message.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                <Mail className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-[24px] font-bold tracking-[-0.03em] text-[var(--text-heading)]">
                How can we help?
              </h2>

              <p className="mt-3 text-[14px] leading-7 text-[var(--text-muted)]">
                Use this page for downloader issues, broken links, supported format questions, privacy requests, or DMCA messages.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Report broken download links",
                  "Ask about MP4 or MP3 formats",
                  "Send privacy or DMCA questions",
                  "Suggest product improvements",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-3 text-[13px] font-semibold text-[var(--text-heading)]"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>
            </aside>

            <form
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] font-bold text-[var(--text-heading)]">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Your name"
                    className="h-12 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] font-bold text-[var(--text-heading)]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-[13px] font-bold text-[var(--text-heading)]">
                  Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(event) => updateField("topic", event.target.value)}
                  className="h-12 w-full rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 text-sm text-[var(--text-heading)] outline-none focus:border-violet-400/50"
                >
                  <option>General Question</option>
                  <option>Report Issue</option>
                  <option>Supported Website</option>
                  <option>Privacy Request</option>
                  <option>DMCA Request</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-[13px] font-bold text-[var(--text-heading)]">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Write your message..."
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--text-heading)] outline-none placeholder:text-[var(--text-soft)] focus:border-violet-400/50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(168,85,247,0.24)] transition-all duration-500 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <p className="mt-3 text-[12px] leading-5 text-[var(--text-soft)]">
                This frontend version saves messages locally. Connect it to your backend later for real email delivery.
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default ContactPage;