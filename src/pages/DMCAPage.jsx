import { Helmet } from "react-helmet-async";
import { Copyright, Mail } from "lucide-react";

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

function DMCAPage() {
  return (
    <>
      <Helmet>
        <title>DMCA Policy | SnapDL</title>
        <meta
          name="description"
          content="Read the SnapDL DMCA Policy for copyright removal requests, reporting content concerns, and responsible online video downloader use."
        />
        <link rel="canonical" href="https://www.snapdl.tech/dmca" />
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
              <Copyright className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
              Copyright Policy
            </p>

            <h1 className="mt-5 text-[34px] font-black leading-tight tracking-[-0.04em] text-[var(--text-heading)] sm:text-[48px] lg:text-[56px]">
              DMCA{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              SnapDL respects copyright rights and responds to valid removal requests.
            </p>

            <p className="mt-3 text-xs font-medium text-[var(--text-soft)]">
              Last updated: January 2026
            </p>
          </div>

          <div className="mt-10 grid gap-5">
            <LegalSection title="1. Copyright Respect">
              <p>
                SnapDL is a tool for processing user-provided public links. We do not encourage copyright infringement or unauthorized downloading.
              </p>
            </LegalSection>

            <LegalSection title="2. Reporting Copyright Concerns">
              <p>
                If you believe content connected to SnapDL violates your copyright, please send a clear DMCA notice with enough information for review.
              </p>
            </LegalSection>

            <LegalSection title="3. Include This Information">
              <p>Your notice should include:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Your name and contact information.</li>
                <li>A description of the copyrighted work.</li>
                <li>The URL or details related to the allegedly infringing content.</li>
                <li>A statement that you believe the use is not authorized.</li>
                <li>A statement that your notice is accurate.</li>
                <li>Your physical or electronic signature.</li>
              </ul>
            </LegalSection>

            <LegalSection title="4. False Claims">
              <p>
                Submitting false or misleading DMCA claims may have legal consequences. Please make sure your report is accurate.
              </p>
            </LegalSection>

            <LegalSection title="5. Response">
              <p>
                After receiving a valid notice, SnapDL may remove access, block related functionality, or take other appropriate action.
              </p>
            </LegalSection>

            <div className="rounded-[28px] border border-violet-500/20 bg-violet-500/10 p-5 text-[14px] leading-7 text-[var(--text-heading)] shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-violet-400" />
                <p>
                  For DMCA requests, use the Contact page and include “DMCA Request” in your message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DMCAPage;