import { BadgeCheck, Download } from "lucide-react";
import ctaRocket from "../../assets/images/cta-rocket.png";

const benefits = ["No Sign Up", "No Limits", "100% Free"];

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function CTASection() {
  return (
    <section
      id="contact"
      className={`relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-14 xl:px-20 ${transitionClass}`}
    >
      <div className="theme-cta-dark" />
      <div className="theme-cta-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 h-44 w-[300px] -translate-x-1/2 rounded-full bg-violet-500/12 blur-[85px] sm:w-[520px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <div
          className={`relative overflow-hidden rounded-[30px] border border-[var(--cta-border)] bg-[var(--cta-shell-bg)] p-px shadow-[0_24px_90px_var(--cta-shadow)] ${transitionClass}`}
        >
          <div
            className={`relative overflow-hidden rounded-[29px] bg-[var(--cta-card-bg)] px-5 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-8 ${transitionClass}`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.08)_42%,transparent_70%)]" />
            <div className="pointer-events-none absolute -left-16 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-blue-400/12 blur-[85px]" />
            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-fuchsia-400/14 blur-[90px]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full bg-violet-400/12 blur-[95px]" />

            <div className="relative grid items-center gap-6 lg:grid-cols-[190px_minmax(0,1fr)_auto] lg:gap-8">
              <div className="mx-auto lg:mx-0">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-28 w-28 rounded-full bg-blue-400/15 blur-[55px] sm:h-32 sm:w-32" />

                  <img
                    src={ctaRocket}
                    alt="Rocket illustration"
                    className="relative z-10 w-[130px] drop-shadow-[0_20px_40px_rgba(124,58,237,0.28)] sm:w-[150px] lg:w-[165px]"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-[var(--cta-title)] sm:text-[34px] lg:text-[40px]">
                  Start Downloading Now
                </h2>

                <p className="mx-auto mt-3 max-w-[640px] text-[14px] leading-6 text-[var(--cta-body)] sm:text-[15px] sm:leading-7 lg:mx-0">
                  Join millions of users who trust LinkFlow for fast, secure and
                  unlimited downloads.
                </p>
              </div>

              <div className="mx-auto flex w-full max-w-[340px] flex-col items-center gap-3.5 lg:mx-0 lg:w-auto lg:max-w-none lg:items-end">
                <a
                  href="#hero"
                  className={`group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--cta-button-bg)] px-6 py-3 text-sm font-semibold text-[var(--cta-button-text)] shadow-[0_16px_40px_var(--cta-button-shadow)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 sm:w-auto sm:min-w-[250px] ${transitionClass}`}
                >
                  <Download className="h-4 w-4 transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5" />
                  Start Free Download
                </a>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12.5px] font-semibold text-[var(--cta-benefit-text)] lg:justify-end">
                  {benefits.map((item, index) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[var(--cta-benefit-icon)]" />
                      {item}

                      {index !== benefits.length - 1 && (
                        <span className="ml-2 hidden h-4 w-px bg-[var(--cta-divider)] opacity-70 md:inline-block" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;