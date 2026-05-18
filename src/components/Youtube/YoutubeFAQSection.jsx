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
    question: "Is SnapDL YouTube Video Downloader free?",
    answer:
      "Yes. SnapDL YouTube Video Downloader is free to use for basic downloads. Paste a public YouTube video link and download available MP4 or MP3 formats without installing software.",
  },
  {
    question: "Can I download YouTube videos in MP4?",
    answer:
      "Yes. SnapDL helps you download supported YouTube videos in MP4 format when available from the video link.",
  },
  {
    question: "Can I convert YouTube videos to MP3?",
    answer:
      "Yes. When audio formats are available, SnapDL can show MP3 or other audio options so you can save supported YouTube content as audio.",
  },
  {
    question: "Does SnapDL support YouTube Shorts?",
    answer:
      "Yes. You can paste a public YouTube Shorts link and preview available download options before saving the file.",
  },
  {
    question: "Do I need to install a YouTube downloader app?",
    answer:
      "No. SnapDL works directly in your browser, so you can download YouTube videos online on mobile, tablet, or desktop.",
  },
  {
    question: "Is downloading YouTube videos safe with SnapDL?",
    answer:
      "SnapDL uses a browser-based download flow and does not require personal information for basic downloads. Only paste public links you have permission to save.",
  },
];

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function YoutubeFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section
      id="youtube-faq"
      aria-labelledby="youtube-faq-title"
      className={`platform-youtube theme-section relative overflow-hidden px-4 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-16 xl:px-20 ${transitionClass}`}
    >
      <div className="theme-layer theme-youtube-hero-dark" />
      <div className="theme-layer theme-youtube-hero-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 z-[1] h-44 w-[320px] -translate-x-1/2 rounded-full bg-[#FF0000]/15 blur-[80px] sm:h-52 sm:w-[560px] sm:blur-[95px]" />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div className="mx-auto max-w-[980px] text-center">
          <div
            className={`mx-auto mb-3 inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-[11px] font-medium text-red-300 sm:mb-4 sm:px-3.5 sm:text-xs ${transitionClass}`}
          >
            Help Center
          </div>

          <h2
            id="youtube-faq-title"
            className={`mx-auto max-w-[980px] text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--text-heading)] min-[420px]:text-[30px] sm:text-[36px] lg:whitespace-nowrap lg:text-[42px] ${transitionClass}`}
          >
            YouTube Video Downloader{" "}
            <span className="bg-gradient-to-r from-[#FF0000] via-red-500 to-rose-400 bg-clip-text text-transparent">
              FAQs
            </span>
          </h2>

          <p
            className={`mx-auto mt-4 max-w-[620px] text-[13.5px] leading-7 text-[var(--text-muted)] sm:mt-5 sm:text-[15px] sm:leading-8 ${transitionClass}`}
          >
            Find answers about downloading YouTube videos, Shorts, MP4 files,
            MP3 audio, safety, and browser support.
          </p>
        </div>

        <div
          className={`mx-auto mt-8 grid max-w-[760px] gap-4 rounded-[24px] border border-[var(--faq-shell-border)] bg-[var(--faq-shell-bg)] p-3 shadow-[0_20px_65px_var(--faq-shell-shadow)] backdrop-blur-xl sm:mt-10 sm:p-4 lg:max-w-none lg:grid-cols-[1.05fr_0.95fr] lg:gap-5 lg:rounded-[28px] lg:p-5 ${transitionClass}`}
        >
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `youtube-faq-answer-${index}`;
              const buttonId = `youtube-faq-button-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border ${transitionClass} ${
                    isOpen
                      ? "border-red-400/30 bg-[var(--faq-item-active-bg)] shadow-[0_12px_34px_var(--faq-item-active-shadow)]"
                      : "border-[var(--faq-item-border)] bg-[var(--faq-item-bg)] hover:border-red-400/25 hover:bg-[var(--faq-item-hover)]"
                  }`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => handleToggle(index)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span
                        className={`text-[15px] font-semibold leading-6 tracking-[-0.01em] sm:text-[15.5px] lg:text-[16px] ${transitionClass} ${
                          isOpen
                            ? "text-[var(--text-heading)]"
                            : "text-[var(--faq-question-text)]"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg sm:h-9 sm:w-9 ${transitionClass} ${
                          isOpen
                            ? "bg-red-500/10 text-red-400"
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
                        className={`px-4 pb-4 pr-12 text-[14px] leading-7 text-[var(--text-muted)] sm:px-5 sm:pb-5 sm:pr-14 sm:text-[14.5px] lg:text-[15px] ${transitionClass}`}
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
            <div className="pointer-events-none absolute right-4 top-4 h-44 w-44 rounded-full bg-red-600/18 blur-[70px] sm:right-8 sm:top-8 sm:h-52 sm:w-52" />

            <div className="relative grid gap-6 lg:h-full lg:grid-cols-[1fr_150px] lg:items-center xl:grid-cols-[1fr_170px]">
              <div>
                <div
                  className={`mb-4 grid h-10 w-10 place-items-center rounded-2xl border border-red-500/15 bg-red-500/10 text-red-400 shadow-[0_0_28px_rgba(255,0,0,0.2)] sm:mb-5 sm:h-11 sm:w-11 ${transitionClass}`}
                >
                  <ShieldCheck className="h-5 w-5 stroke-[1.8] sm:h-6 sm:w-6" />
                </div>

                <h3
                  className={`text-[18px] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-heading)] sm:text-[20px] ${transitionClass}`}
                >
                  Safe YouTube Downloads
                </h3>

                <p
                  className={`mt-3 max-w-md text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px] ${transitionClass}`}
                >
                  SnapDL keeps YouTube downloading simple and browser-based. No
                  account or unknown software is required for basic downloads.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "No registration required",
                    "No app installation",
                    "Works on mobile and desktop",
                  ].map((item) => (
                    <p
                      key={item}
                      className={`flex items-center gap-2.5 text-[14px] font-medium text-[var(--faq-check-text)] sm:text-[14.5px] ${transitionClass}`}
                    >
                      <BadgeCheck className="h-[17px] w-[17px] shrink-0 text-emerald-400 sm:h-[18px] sm:w-[18px]" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div
                className={`relative mx-auto grid h-[130px] w-[130px] place-items-center rounded-[24px] border border-red-400/20 bg-gradient-to-br from-red-600/20 to-rose-600/10 shadow-[0_0_45px_rgba(255,0,0,0.2)] sm:h-[150px] sm:w-[150px] sm:rounded-[28px] lg:mx-0 xl:h-[160px] xl:w-[160px] ${transitionClass}`}
              >
                <Shield className="h-20 w-20 text-red-400 sm:h-24 sm:w-24" />
                <Lock className="absolute h-8 w-8 text-white sm:h-10 sm:w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default YoutubeFAQSection;