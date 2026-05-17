import { useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Lock,
  Shield,
  ShieldCheck,
} from "lucide-react";

const faqs = [
  {
    question: "Is SnapDL X Video Downloader free?",
    answer:
      "Yes. SnapDL X Video Downloader is free for basic downloads. Paste a public X or Twitter video link and preview available MP4 download options.",
  },
  {
    question: "Can I download Twitter videos in MP4?",
    answer:
      "Yes. SnapDL supports public Twitter video links and can show available MP4 download options when the post is accessible.",
  },
  {
    question: "Does SnapDL support x.com video links?",
    answer:
      "Yes. You can paste supported x.com video post links and preview available video download formats directly in your browser.",
  },
  {
    question: "Can I download private X or Twitter videos?",
    answer:
      "No. SnapDL only works with X or Twitter videos that are publicly accessible through a valid link.",
  },
  {
    question: "Do I need an X video downloader extension?",
    answer:
      "No. SnapDL works online without browser extensions, so you can download X or Twitter videos on mobile, tablet, or desktop.",
  },
  {
    question: "Is SnapDL safe for Twitter video downloads?",
    answer:
      "SnapDL uses a browser-based flow and does not require personal information for basic downloads. Only paste public links you are allowed to save.",
  },
];

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function XFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section
      id="x-faq"
      aria-labelledby="x-faq-title"
      className={`platform-x theme-section relative overflow-hidden px-5 py-11 sm:px-8 sm:py-14 lg:px-14 lg:py-16 xl:px-20 ${transitionClass}`}
    >
      <div className="theme-layer theme-x-hero-dark" />
      <div className="theme-layer theme-x-hero-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 z-[1] h-44 w-[320px] -translate-x-1/2 rounded-full bg-white/10 blur-[80px] sm:h-52 sm:w-[560px] sm:blur-[95px]" />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="x-faq-title"
            className={`text-[28px] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-heading)] sm:text-[34px] lg:text-[36px] ${transitionClass}`}
          >
            Twitter Video Downloader{" "}
            <span className="bg-gradient-to-r from-white via-sky-300 to-slate-400 bg-clip-text text-transparent">
              FAQs
            </span>
          </h2>

          <p
            className={`mx-auto mt-3 max-w-xl text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] ${transitionClass}`}
          >
            Find answers about downloading X videos, Twitter videos, MP4 files,
            public post links, safety, and browser support.
          </p>
        </div>

        <div
          className={`mx-auto mt-8 grid max-w-[720px] gap-4 rounded-[24px] border border-[var(--faq-shell-border)] bg-[var(--faq-shell-bg)] p-3 shadow-[0_20px_65px_var(--faq-shell-shadow)] backdrop-blur-xl sm:mt-10 sm:p-4 lg:max-w-none lg:grid-cols-[1.05fr_0.95fr] lg:gap-5 lg:rounded-[28px] lg:p-5 ${transitionClass}`}
        >
          <div className="space-y-2.5 sm:space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `x-faq-answer-${index}`;
              const buttonId = `x-faq-button-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border ${transitionClass} ${
                    isOpen
                      ? "border-sky-300/30 bg-[var(--faq-item-active-bg)] shadow-[0_12px_34px_var(--faq-item-active-shadow)]"
                      : "border-[var(--faq-item-border)] bg-[var(--faq-item-bg)] hover:border-sky-300/25 hover:bg-[var(--faq-item-hover)]"
                  }`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => handleToggle(index)}
                      className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left sm:gap-4 sm:px-4"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span
                        className={`text-[13.5px] font-medium leading-6 sm:text-[14px] ${transitionClass} ${
                          isOpen
                            ? "text-[var(--text-heading)]"
                            : "text-[var(--faq-question-text)]"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg sm:h-8 sm:w-8 ${transitionClass} ${
                          isOpen
                            ? "bg-sky-400/10 text-sky-300"
                            : "bg-[var(--faq-chevron-bg)] text-[var(--text-soft)]"
                        }`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`px-3.5 pb-3 pr-10 text-[12.8px] leading-6 text-[var(--text-muted)] sm:px-4 sm:pr-12 sm:text-[13px] ${transitionClass}`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`relative overflow-hidden rounded-[22px] border border-[var(--faq-safety-border)] bg-[var(--faq-safety-bg)] p-5 shadow-[0_16px_50px_var(--faq-safety-shadow)] backdrop-blur-xl sm:rounded-[24px] sm:p-6 ${transitionClass}`}
          >
            <div className="pointer-events-none absolute right-4 top-4 h-44 w-44 rounded-full bg-sky-400/14 blur-[70px] sm:right-8 sm:top-8 sm:h-52 sm:w-52" />

            <div className="relative grid gap-6 lg:h-full lg:grid-cols-[1fr_150px] lg:items-center xl:grid-cols-[1fr_170px]">
              <div>
                <div
                  className={`mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/8 text-sky-300 shadow-[0_0_28px_rgba(14,165,233,0.18)] sm:mb-5 sm:h-12 sm:w-12 ${transitionClass}`}
                >
                  <ShieldCheck className="h-6 w-6 stroke-[1.8] sm:h-7 sm:w-7" />
                </div>

                <h3
                  className={`text-[18px] font-semibold tracking-[-0.015em] text-[var(--text-heading)] sm:text-[20px] ${transitionClass}`}
                >
                  Safe X/Twitter Downloads
                </h3>

                <p
                  className={`mt-3 max-w-md text-[13.5px] leading-7 text-[var(--text-muted)] sm:text-[14px] ${transitionClass}`}
                >
                  SnapDL keeps X and Twitter video downloading browser-based,
                  simple, and secure without requiring extra extensions.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "Public post links only",
                    "No browser extension",
                    "Works on any device",
                  ].map((item) => (
                    <p
                      key={item}
                      className={`flex items-center gap-2.5 text-[13.5px] font-medium text-[var(--faq-check-text)] sm:text-[14px] ${transitionClass}`}
                    >
                      <BadgeCheck className="h-[17px] w-[17px] shrink-0 text-emerald-400 sm:h-[18px] sm:w-[18px]" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div
                className={`relative mx-auto grid h-[130px] w-[130px] place-items-center rounded-[24px] border border-white/15 bg-gradient-to-br from-white/15 via-sky-400/12 to-slate-400/10 shadow-[0_0_45px_rgba(14,165,233,0.16)] sm:h-[150px] sm:w-[150px] sm:rounded-[28px] lg:mx-0 xl:h-[160px] xl:w-[160px] ${transitionClass}`}
              >
                <Shield className="h-20 w-20 text-sky-300 sm:h-24 sm:w-24" />
                <Lock className="absolute h-8 w-8 text-white sm:h-10 sm:w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default XFAQSection;