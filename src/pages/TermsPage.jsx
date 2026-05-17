import { Helmet } from "react-helmet-async";
import { FileText, ShieldCheck } from "lucide-react";

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

function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | SnapDL</title>
        <meta
          name="description"
          content="Read the SnapDL Terms of Service for rules about using SnapDL online video downloader, MP4 downloads, MP3 downloads, and supported tools."
        />
        <link rel="canonical" href="https://www.snapdl.tech/terms" />
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
              <FileText className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
              SnapDL Terms
            </p>

            <h1 className="mt-5 text-[34px] font-black leading-tight tracking-[-0.04em] text-[var(--text-heading)] sm:text-[48px] lg:text-[56px]">
              Terms of{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Service
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              These Terms explain the rules for using SnapDL and our online video downloader services.
            </p>

            <p className="mt-3 text-xs font-medium text-[var(--text-soft)]">
              Last updated: January 2026
            </p>
          </div>

          <div className="mt-10 grid gap-5">
            <LegalSection title="1. Acceptance of Terms">
              <p>
                By using SnapDL, you agree to these Terms of Service. If you do not agree, please stop using the website.
              </p>
            </LegalSection>

            <LegalSection title="2. Use of SnapDL">
              <p>
                SnapDL provides browser-based tools for checking supported public video links and showing available download formats such as MP4 or MP3.
              </p>
              <p>
                You are responsible for making sure you have permission to download or save any content.
              </p>
            </LegalSection>

            <LegalSection title="3. User Responsibility">
              <p>
                You must not use SnapDL to violate copyright, platform rules, privacy rights, or any applicable law.
              </p>
            </LegalSection>

            <LegalSection title="4. No Account Guarantee">
              <p>
                SnapDL may change, update, limit, or remove features at any time. We do not guarantee that every website, format, or video link will always work.
              </p>
            </LegalSection>

            <LegalSection title="5. Prohibited Use">
              <p>
                You may not use SnapDL for abuse, scraping private content, bypassing access restrictions, distributing malware, or downloading content you do not have rights to access.
              </p>
            </LegalSection>

            <LegalSection title="6. Disclaimer">
              <p>
                SnapDL is provided as-is. We do not guarantee uninterrupted service, accuracy of third-party content, or availability of all formats.
              </p>
            </LegalSection>

            <LegalSection title="7. Changes to Terms">
              <p>
                We may update these Terms from time to time. Continued use of SnapDL means you accept the updated terms.
              </p>
            </LegalSection>

            <div className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-5 text-[14px] leading-7 text-[var(--text-heading)] shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
                <p>
                  Use SnapDL responsibly and only download content you are allowed to save.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default TermsPage;