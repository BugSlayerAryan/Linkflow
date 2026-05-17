import { Helmet } from "react-helmet-async";
import { Lock, ShieldCheck } from "lucide-react";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function LegalSection({ title, children }) {
  return (
    <section className="rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6">
      <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--text-heading)] sm:text-[24px]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | SnapDL</title>
        <meta
          name="description"
          content="Read the SnapDL Privacy Policy to understand how SnapDL handles basic usage data, privacy, security, and online video downloader information."
        />
        <link rel="canonical" href="https://www.snapdl.tech/privacy" />
      </Helmet>

      <main className={`theme-section relative min-h-screen overflow-hidden ${transitionClass}`}>
        <div className="theme-layer theme-hero-dark" />
        <div className="theme-layer theme-hero-light" />

        <div className="pointer-events-none absolute left-1/2 top-16 z-[1] h-72 w-[340px] -translate-x-1/2 rounded-full bg-violet-500/16 blur-[100px] sm:w-[620px]" />
        <div className="pointer-events-none absolute -left-28 bottom-20 z-[1] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-52 z-[1] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-20 lg:px-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
              <Lock className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
              SnapDL Privacy
            </p>

            <h1 className="mt-5 text-[34px] font-black leading-tight tracking-[-0.04em] text-[var(--text-heading)] sm:text-[48px] lg:text-[56px]">
              Privacy{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              This Privacy Policy explains how SnapDL handles information when you use our online video downloader tools.
            </p>

            <p className="mt-3 text-xs font-medium text-[var(--text-soft)]">
              Last updated: January 2026
            </p>
          </div>

          <div className="mt-10 grid gap-5">
            <LegalSection title="1. Information We Collect">
              <p>
                SnapDL is designed to work with minimal data. When you paste a video URL, we process that link only to fetch available download information and formats.
              </p>
              <p>
                If you subscribe to updates, we may store the email address you provide for product updates and helpful download tips.
              </p>
            </LegalSection>

            <LegalSection title="2. How We Use Information">
              <p>
                We use submitted links to provide video preview, available MP4 or MP3 formats, and download options. We use newsletter emails only to send relevant SnapDL updates.
              </p>
            </LegalSection>

            <LegalSection title="3. Cookies and Local Storage">
              <p>
                SnapDL may use browser storage to remember your theme preference, recent app state, or newsletter subscription status. This helps improve user experience.
              </p>
            </LegalSection>

            <LegalSection title="4. Third-Party Services">
              <p>
                SnapDL may rely on hosting, analytics, or backend services to operate the website. These services may process limited technical data such as browser type, device information, or usage patterns.
              </p>
            </LegalSection>

            <LegalSection title="5. Security">
              <p>
                We aim to keep the download flow simple and secure. However, no online service can guarantee complete security, so users should only paste public links they are allowed to access.
              </p>
            </LegalSection>

            <LegalSection title="6. Your Choices">
              <p>
                You can avoid newsletter emails by not subscribing. You can also clear browser storage from your browser settings.
              </p>
            </LegalSection>

            <LegalSection title="7. Contact">
              <p>
                For privacy questions, reports, or removal requests, please contact us through the Contact page.
              </p>
            </LegalSection>

            <div className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-5 text-[14px] leading-7 text-[var(--text-heading)] shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
                <p>
                  SnapDL does not ask for passwords or private account access for basic video downloads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PrivacyPage;