import { Helmet } from "react-helmet-async";
import {
  AlertTriangle,
  CheckCircle2,
  Copyright,
  FileText,
  Globe2,
  Mail,
  Scale,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const dmcaHighlights = [
  {
    icon: Copyright,
    title: "Copyright Respect",
    text: "SnapDL respects creator rights, copyright owners, and valid removal requests.",
  },
  {
    icon: FileText,
    title: "Clear Notices",
    text: "Send complete copyright details so we can review your DMCA request faster.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible Use",
    text: "Use SnapDL only with public links and content you are allowed to save.",
  },
];

const noticeRequirements = [
  "Your full name, company name if applicable, and valid contact information.",
  "A clear description of the copyrighted work you believe has been infringed.",
  "The URL, video link, page link, or details related to the reported content.",
  "A statement that you believe the reported use is not authorized by the copyright owner, agent, or law.",
  "A statement that the information in your notice is accurate.",
  "Your physical or electronic signature.",
];

const responsibleUse = [
  "Only download videos, reels, clips, shorts, or audio you own or have permission to save.",
  "Do not use SnapDL to redistribute copyrighted MP4 videos or MP3 audio without permission.",
  "Respect platform rules on YouTube, Instagram, Facebook, X/Twitter, and other supported websites.",
  "Do not submit false, misleading, incomplete, or abusive copyright reports.",
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

function DMCAPage() {
  return (
    <>
      <Helmet>
        <title>DMCA Policy | SnapDL Copyright Removal Requests</title>
        <meta
          name="description"
          content="Read the SnapDL DMCA Policy for copyright removal requests, reporting content concerns, online video downloader use, MP4 downloads, MP3 audio, and responsible use of YouTube, Instagram, Facebook, and X/Twitter links."
        />
        <meta
          name="keywords"
          content="SnapDL DMCA policy, copyright removal request, online video downloader DMCA, MP4 downloader copyright, MP3 downloader copyright, YouTube downloader DMCA, Instagram video downloader DMCA, Facebook video downloader DMCA, X Twitter video downloader DMCA"
        />
        <link rel="canonical" href="https://www.snapdl.tech/dmca" />
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
          aria-labelledby="dmca-title"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_34px_rgba(139,92,246,0.2)]">
              <Copyright className="h-7 w-7" />
            </div>

            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)]">
              <Scale className="h-3.5 w-3.5 text-[var(--badge-icon)]" />
              SnapDL Copyright Policy
            </p>

            <h1
              id="dmca-title"
              className="mt-5 text-[34px] font-black leading-tight tracking-[-0.04em] text-[var(--text-heading)] sm:text-[48px] lg:text-[58px]"
            >
              DMCA{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
              SnapDL respects copyright rights and responds to valid copyright
              removal requests related to our online video downloader, MP4
              download tools, MP3 audio options, and supported platform pages.
            </p>

            <p className="mt-3 text-xs font-medium text-[var(--text-soft)]">
              Last updated: January 2026
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {dmcaHighlights.map((item) => {
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
            <LegalSection icon={Copyright} title="1. Copyright Respect">
              <p>
                SnapDL is a browser-based tool that helps users process
                user-provided public links and view available download options.
                We respect copyright owners, creators, publishers, and valid
                copyright removal requests.
              </p>

              <p>
                SnapDL does not encourage copyright infringement, unauthorized
                downloading, or redistribution of protected videos, music,
                reels, shorts, clips, posts, or audio files.
              </p>

              <p>
                Users are responsible for making sure they have permission to
                download, convert, save, share, or reuse any content processed
                through SnapDL.
              </p>
            </LegalSection>

            <LegalSection icon={Globe2} title="2. Third-Party Content and Platforms">
              <p>
                SnapDL may help users check public links from third-party
                platforms such as YouTube, Instagram, Facebook, X/Twitter, and
                other supported websites. These platforms are independent
                services with their own copyright rules, privacy policies, and
                terms of use.
              </p>

              <p>
                SnapDL does not own, host, publish, or control the original
                third-party videos or audio files. Reported content may be
                located on another website or platform, and copyright owners may
                also need to contact the original hosting platform directly.
              </p>
            </LegalSection>

            <LegalSection icon={Mail} title="3. Reporting Copyright Concerns">
              <p>
                If you believe content connected to SnapDL violates your
                copyright, please send a clear copyright removal notice through
                the Contact page and choose or mention “DMCA Request” in your
                message.
              </p>

              <p>
                A complete notice helps us review the request faster. Please
                include enough detail for us to identify the copyrighted work,
                the reported link, and your authority to submit the request.
              </p>
            </LegalSection>

            <LegalSection icon={FileText} title="4. What to Include in a DMCA Notice">
              <p>Your copyright notice should include:</p>

              <ul className="grid gap-2 pt-1">
                {noticeRequirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-2xl border border-violet-500/15 bg-violet-500/5 p-3 text-[13.5px] leading-6 text-[var(--text-muted)]"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-violet-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </LegalSection>

            <LegalSection icon={ShieldAlert} title="5. False or Misleading Claims">
              <p>
                Please do not submit false, incomplete, misleading, abusive, or
                bad-faith copyright notices. Submitting incorrect claims may
                delay review and may have legal consequences.
              </p>

              <p>
                Before submitting a DMCA request, make sure you own the
                copyrighted work or are authorized to act on behalf of the
                copyright owner.
              </p>
            </LegalSection>

            <LegalSection icon={UserCheck} title="6. Response to Valid Requests">
              <p>
                After receiving a valid copyright notice, SnapDL may review the
                reported information and take appropriate action. This may
                include removing access, blocking related functionality, limiting
                visibility, or responding for more information.
              </p>

              <p>
                Because SnapDL may not host the original third-party content,
                some copyright issues may need to be handled by the platform
                where the original video, reel, short, post, music, or audio is
                hosted.
              </p>
            </LegalSection>

            <LegalSection icon={ShieldCheck} title="7. Responsible Use of SnapDL">
              <p>
                SnapDL is intended for lawful and responsible use. Users should
                only download public content they own, have permission to save,
                or are legally allowed to download.
              </p>

              <ul className="grid gap-2 pt-1">
                {responsibleUse.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-3 text-[13.5px] leading-6 text-[var(--text-muted)]"
                  >
                    <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </LegalSection>

            <LegalSection icon={AlertTriangle} title="8. Repeat Abuse and Misuse">
              <p>
                SnapDL may limit, block, or take other action against misuse of
                the service, abusive requests, harmful automation, repeated
                policy violations, or attempts to use the website for unlawful
                downloading.
              </p>

              <p>
                This helps protect SnapDL users, copyright owners, creators,
                platform rights, and the stability of our online video
                downloader tools.
              </p>
            </LegalSection>

            <LegalSection icon={FileText} title="9. Updates to This DMCA Policy">
              <p>
                We may update this DMCA Policy when SnapDL changes features,
                adds supported downloader pages, improves MP4 or MP3 support,
                updates copyright review steps, or changes how users submit
                copyright concerns.
              </p>

              <p>
                When we update this page, the “Last updated” date may change.
                Continued use of SnapDL means you accept the updated DMCA
                Policy.
              </p>
            </LegalSection>

            <div className="rounded-[28px] border border-violet-500/20 bg-violet-500/10 p-5 text-[14px] leading-7 text-[var(--text-heading)] shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl sm:p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-violet-400" />

                <div>
                  <h2 className="text-[18px] font-bold tracking-[-0.02em]">
                    Submit a DMCA request
                  </h2>

                  <p className="mt-2 text-[14px] leading-7">
                    For copyright removal requests, use the SnapDL Contact page
                    and include “DMCA Request” in your message. Add the reported
                    URL, copyrighted work details, your contact information, and
                    your authorization to submit the request.
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

export default DMCAPage;