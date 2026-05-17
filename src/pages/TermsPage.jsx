import { Helmet } from "react-helmet-async";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Copyright,
  FileText,
  Globe2,
  Lock,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const termHighlights = [
  {
    icon: CheckCircle2,
    title: "Use Public Links",
    text: "Only download videos, audio, or clips you are allowed to access and save.",
  },
  {
    icon: ShieldCheck,
    title: "No Login Needed",
    text: "SnapDL does not ask for social passwords or private account access.",
  },
  {
    icon: Copyright,
    title: "Respect Copyright",
    text: "Follow platform rules, creator rights, and applicable copyright laws.",
  },
];

const allowedUses = [
  "Saving your own videos, clips, reels, or public social content.",
  "Downloading royalty-free, educational, or permission-based content.",
  "Checking available MP4, MP3, and quality formats before saving.",
  "Using SnapDL for personal, fair, lawful, and responsible downloads.",
];

const prohibitedUses = [
  "Downloading private, restricted, paid, or account-only content without permission.",
  "Using SnapDL to violate copyright, privacy rights, or platform terms.",
  "Attempting to bypass security, access controls, paywalls, or login requirements.",
  "Using automated abuse, scraping, malware, spam, or harmful activity.",
];

function LegalSection({ icon: Icon, title, children }) {
  return (
    <section
      className={`group rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] sm:p-6 ${transitionClass}`}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_26px_rgba(139,92,246,0.16)]">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <div className="min-w-0">
          <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--text-heading)] sm:text-[23px]">
            {title}
          </h2>

          <div className="mt-3 space-y-3 text-[14px] leading-7 text-[var(--text-muted)] sm:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function TermsPage() {
  return (
    <>
      <Helmet>
        <title>
          Terms of Service | SnapDL Online Video Downloader Rules
        </title>
        <meta
          name="description"
          content="Read the SnapDL Terms of Service for responsible use of our online video downloader, MP4 downloader, MP3 converter, YouTube downloader, Instagram downloader, Facebook downloader, and X/Twitter video downloader tools."
        />
        <meta
          name="keywords"
          content="SnapDL terms of service, online video downloader terms, MP4 downloader rules, MP3 converter terms, YouTube downloader terms, Instagram downloader terms, Facebook video downloader terms, X Twitter video downloader terms"
        />
        <link rel="canonical" href="https://www.snapdl.tech/terms" />
      </Helmet>

      <main
        className={`theme-section relative min-h-screen overflow-hidden ${transitionClass}`}
      >
        <div className="theme-layer theme-hero-dark" />
        <div className="theme-layer theme-hero-light" />

        <div className="pointer-events-none absolute left-1/2 top-16 z-[1] h-72 w-[340px] -translate-x-1/2 rounded-full bg-violet-500/16 blur-[100px] sm:w-[620px]" />
        <div className="pointer-events-none absolute -left-28 bottom-20 z-[1] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-52 z-[1] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

        <section
          className="relative z-10 mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20"
          aria-labelledby="terms-title"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
              <FileText className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--badge-icon)]" />
              SnapDL Terms & Responsible Use
            </p>

            <h1
              id="terms-title"
              className="mt-5 text-[34px] font-black leading-tight tracking-[-0.04em] text-[var(--text-heading)] sm:text-[48px] lg:text-[58px]"
            >
              Terms of{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Service
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              These Terms explain how you may use SnapDL, including our online
              video downloader, MP4 download tools, MP3 audio options, and
              platform-specific downloaders for YouTube, Instagram, Facebook,
              and X/Twitter.
            </p>

            <p className="mt-3 text-xs font-medium text-[var(--text-soft)]">
              Last updated: January 2026
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {termHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className={`rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-4 shadow-[0_16px_45px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] ${transitionClass}`}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2 className="mt-4 text-[16px] font-bold tracking-[-0.02em] text-[var(--text-heading)]">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-[13px] leading-6 text-[var(--text-muted)]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5">
            <LegalSection icon={UserCheck} title="1. Acceptance of Terms">
              <p>
                By accessing or using SnapDL, you agree to these Terms of
                Service. If you do not agree with these rules, you should stop
                using the website and any SnapDL downloader tools.
              </p>

              <p>
                These Terms apply to all SnapDL pages and services, including
                the online video downloader, YouTube downloader, Instagram video
                downloader, Facebook video downloader, X/Twitter downloader,
                MP4 download options, MP3 audio tools, contact page, privacy
                page, and DMCA page.
              </p>
            </LegalSection>

            <LegalSection icon={Globe2} title="2. Use of SnapDL">
              <p>
                SnapDL provides browser-based tools that help users check public
                video links and view available download formats such as MP4
                video, MP3 audio, and supported quality options.
              </p>

              <p>
                You may use SnapDL for personal, lawful, and responsible
                downloading only. You are responsible for making sure you have
                permission to download, convert, save, or reuse any content.
              </p>

              <p>
                SnapDL does not host the original videos shown on third-party
                websites. It helps process user-provided links and display
                available download information when supported.
              </p>
            </LegalSection>

            <LegalSection icon={ShieldCheck} title="3. Allowed Use">
              <p>
                SnapDL is intended for safe, simple, and user-controlled online
                downloads. Examples of allowed use include:
              </p>

              <ul className="grid gap-2 pt-1">
                {allowedUses.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-3 text-[13.5px] leading-6 text-[var(--text-muted)]"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </LegalSection>

            <LegalSection icon={Ban} title="4. Prohibited Use">
              <p>
                You must not use SnapDL for unlawful, harmful, abusive, or
                unauthorized activity. Prohibited use includes:
              </p>

              <ul className="grid gap-2 pt-1">
                {prohibitedUses.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-2xl border border-rose-500/15 bg-rose-500/5 p-3 text-[13.5px] leading-6 text-[var(--text-muted)]"
                  >
                    <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-rose-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </LegalSection>

            <LegalSection icon={Copyright} title="5. Copyright and Platform Rules">
              <p>
                You are responsible for respecting copyright law, creator rights,
                privacy rights, and the terms of the platform where the content
                is hosted. This includes YouTube, Instagram, Facebook,
                X/Twitter, and any other supported website.
              </p>

              <p>
                SnapDL should not be used to download copyrighted content
                without permission or to redistribute videos, music, clips,
                reels, shorts, posts, or audio files in a way that violates
                applicable rules.
              </p>

              <p>
                If you believe content or usage connected to SnapDL creates a
                copyright concern, please use the DMCA page or Contact page to
                submit a clear request.
              </p>
            </LegalSection>

            <LegalSection icon={Lock} title="6. Account Safety and Privacy">
              <p>
                SnapDL does not require a SnapDL account for basic use, and it
                does not ask for passwords from YouTube, Instagram, Facebook,
                X/Twitter, or other third-party platforms.
              </p>

              <p>
                Do not paste private, restricted, confidential, or account-only
                links that you are not allowed to access or download. You are
                responsible for the links you submit and the content you save.
              </p>
            </LegalSection>

            <LegalSection icon={RefreshCcw} title="7. Availability and Changes">
              <p>
                SnapDL may update, limit, pause, remove, or change features at
                any time. We do not guarantee that every website, video link,
                file quality, MP4 format, MP3 option, or download button will
                always be available.
              </p>

              <p>
                Third-party platforms may change their systems, link formats,
                availability, permissions, or restrictions. These changes can
                affect whether a video, reel, short, clip, or audio file can be
                processed.
              </p>
            </LegalSection>

            <LegalSection icon={AlertTriangle} title="8. Disclaimer and Limitation">
              <p>
                SnapDL is provided on an “as is” and “as available” basis. We
                aim to provide a clean, fast, and reliable browser-based video
                downloader experience, but we do not promise uninterrupted
                access, perfect accuracy, or full compatibility with every link.
              </p>

              <p>
                To the maximum extent permitted by law, SnapDL is not
                responsible for losses, damages, disputes, platform restrictions,
                copyright claims, or misuse caused by how users download or use
                third-party content.
              </p>
            </LegalSection>

            <LegalSection icon={FileText} title="9. Updates to These Terms">
              <p>
                We may update these Terms when SnapDL changes its features,
                improves downloader support, updates MP4 or MP3 options, adds
                platform pages, changes contact processes, or improves legal and
                safety guidance.
              </p>

              <p>
                Continued use of SnapDL after changes means you accept the
                updated Terms of Service. Please review this page from time to
                time if you use SnapDL regularly.
              </p>
            </LegalSection>

            <div className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-5 text-[14px] leading-7 text-[var(--text-heading)] shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />

                <div>
                  <h2 className="text-[18px] font-bold tracking-[-0.02em]">
                    Responsible use reminder
                  </h2>

                  <p className="mt-2 text-[14px] leading-7">
                    Use SnapDL only with public links and content you are
                    allowed to download. Respect copyright, creator rights,
                    platform rules, and local laws when saving MP4 videos or MP3
                    audio online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TermsPage;