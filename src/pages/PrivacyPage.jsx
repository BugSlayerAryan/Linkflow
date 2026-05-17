import { Helmet } from "react-helmet-async";
import {
  Cookie,
  Database,
  EyeOff,
  FileText,
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const privacyHighlights = [
  {
    icon: EyeOff,
    title: "No Passwords Needed",
    text: "SnapDL never asks for social account passwords or private login access.",
  },
  {
    icon: Database,
    title: "Minimal Data Use",
    text: "Video links are used only to check available download formats.",
  },
  {
    icon: Cookie,
    title: "Browser Preferences",
    text: "We may store theme, newsletter, or local app preferences in your browser.",
  },
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

function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>
          Privacy Policy | SnapDL Online Video Downloader Privacy & Security
        </title>
        <meta
          name="description"
          content="Read the SnapDL Privacy Policy to learn how our online video downloader handles video links, MP4 and MP3 download requests, browser storage, newsletter emails, security, and user privacy."
        />
        <meta
          name="keywords"
          content="SnapDL privacy policy, online video downloader privacy, MP4 downloader privacy, MP3 downloader privacy, YouTube downloader privacy, Instagram video downloader privacy, Facebook video downloader privacy, X Twitter video downloader privacy"
        />
        <link rel="canonical" href="https://www.snapdl.tech/privacy" />
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
          aria-labelledby="privacy-title"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
              <Lock className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
              SnapDL Privacy & Security
            </p>

            <h1
              id="privacy-title"
              className="mt-5 text-[34px] font-black leading-tight tracking-[-0.04em] text-[var(--text-heading)] sm:text-[48px] lg:text-[58px]"
            >
              Privacy{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              This Privacy Policy explains how SnapDL handles video links,
              download requests, browser storage, newsletter emails, and basic
              usage information when you use our online video downloader for MP4
              and MP3 downloads.
            </p>

            <p className="mt-3 text-xs font-medium text-[var(--text-soft)]">
              Last updated: January 2026
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {privacyHighlights.map((item) => {
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
            <LegalSection icon={Database} title="1. Information We Collect">
              <p>
                SnapDL is designed to work with minimal information. When you
                paste a video URL from platforms such as YouTube, Instagram,
                Facebook, X/Twitter, or other supported websites, we process
                that link only to check available video or audio download
                formats.
              </p>

              <p>
                The link may be used to show preview details, available MP4
                download options, MP3 audio options, file quality, and supported
                formats before you save the file.
              </p>

              <p>
                If you subscribe to SnapDL updates or use the contact form, we
                may store the email address, name, topic, and message you
                provide so we can respond or send relevant product updates.
              </p>
            </LegalSection>

            <LegalSection icon={FileText} title="2. How We Use Information">
              <p>
                We use submitted links to provide the core SnapDL service:
                checking video availability, identifying downloadable formats,
                and helping users save online videos in MP4 or MP3 format.
              </p>

              <p>
                We may use basic technical information to improve speed,
                reliability, interface quality, mobile responsiveness, and error
                handling for our online video downloader tools.
              </p>

              <p>
                Newsletter emails are used only for SnapDL product updates,
                downloader improvements, feature announcements, and useful video
                download tips. We do not use newsletter emails to ask for social
                media passwords or private account access.
              </p>
            </LegalSection>

            <LegalSection icon={Cookie} title="3. Cookies and Local Storage">
              <p>
                SnapDL may use browser storage to remember your theme preference,
                interface state, newsletter subscription status, or contact form
                demo submissions. This helps the website feel faster and more
                personal when you return.
              </p>

              <p>
                Browser storage may also help keep light mode or dark mode
                consistent across pages such as the YouTube downloader,
                Instagram downloader, Facebook downloader, X/Twitter downloader,
                Privacy Policy, Terms, DMCA, and Contact pages.
              </p>

              <p>
                You can clear local storage, cookies, and cached website data
                from your browser settings at any time.
              </p>
            </LegalSection>

            <LegalSection icon={ShieldCheck} title="4. Security and Safety">
              <p>
                SnapDL aims to provide a safe and simple download flow. We do
                not require users to create an account for basic downloads, and
                we do not ask for passwords from YouTube, Instagram, Facebook,
                X/Twitter, or any other platform.
              </p>

              <p>
                Users should only paste public links they are allowed to access
                and download. Avoid pasting private links, confidential content,
                account-only media, or links you do not have permission to use.
              </p>

              <p>
                No online service can guarantee perfect security, but we work to
                keep the SnapDL website clean, lightweight, browser-based, and
                focused on the requested download action.
              </p>
            </LegalSection>

            <LegalSection icon={Mail} title="5. Contact Forms and Support Requests">
              <p>
                When you send a support request, report an issue, ask about MP4
                or MP3 formats, submit a privacy question, or send a DMCA
                message, we may use the details you provide to understand and
                respond to your request.
              </p>

              <p>
                Support messages may include your name, email address, selected
                topic, message text, and the time of submission. This information
                helps us review broken links, downloader errors, supported site
                questions, and copyright-related requests.
              </p>
            </LegalSection>

            <LegalSection icon={UserCheck} title="6. User Choices and Control">
              <p>
                You can choose not to subscribe to product updates. You can also
                avoid using the contact form if you do not want to share your
                name, email address, or message.
              </p>

              <p>
                You can clear saved browser preferences from your browser
                settings. This may reset your theme choice, local newsletter
                status, and other local SnapDL preferences.
              </p>

              <p>
                For privacy questions, correction requests, or removal requests,
                you can contact us through the SnapDL Contact page.
              </p>
            </LegalSection>

            <LegalSection icon={Lock} title="7. Third-Party Platforms">
              <p>
                SnapDL may help users process links from third-party platforms,
                including YouTube, Instagram, Facebook, X/Twitter, and other
                websites. These platforms are independent services with their
                own privacy policies, terms, and rules.
              </p>

              <p>
                SnapDL is not responsible for the privacy practices, content,
                availability, or rules of third-party platforms. Users should
                review and follow the policies of the platform where the content
                is hosted.
              </p>
            </LegalSection>

            <LegalSection icon={FileText} title="8. Updates to This Privacy Policy">
              <p>
                We may update this Privacy Policy when SnapDL changes features,
                adds new downloader tools, improves MP4 or MP3 support, updates
                contact options, or changes how browser preferences are handled.
              </p>

              <p>
                When we update this page, the “Last updated” date may change.
                Continued use of SnapDL after changes means you accept the
                updated Privacy Policy.
              </p>
            </LegalSection>

            <div className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-5 text-[14px] leading-7 text-[var(--text-heading)] shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />

                <div>
                  <h2 className="text-[18px] font-bold tracking-[-0.02em]">
                    Privacy-first reminder
                  </h2>

                  <p className="mt-2 text-[14px] leading-7">
                    SnapDL does not ask for passwords, private account access, or
                    social media login details for basic online video downloads.
                    Use SnapDL only with public links and content you are allowed
                    to save.
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

export default PrivacyPage;