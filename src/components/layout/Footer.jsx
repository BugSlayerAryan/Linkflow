
import { Send } from "lucide-react";

import Logo from "../common/Logo";
import BrandLogo from "../common/BrandLogo";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Formats", href: "#formats" },
      { label: "Supported Sites", href: "#platforms" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "#" },
      { label: "Updates", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "DMCA", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Report Issue", href: "#" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
];

const socialLinks = [
  { name: "instagram", label: "Instagram" },
  { name: "twitter", label: "Twitter/X" },
  { name: "facebook", label: "Facebook" },
  { name: "youtube", label: "YouTube" },
  { name: "tiktok", label: "TikTok" },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3
        className={`text-[13.5px] font-semibold tracking-[-0.01em] text-[var(--footer-heading)] sm:text-[14px] ${transitionClass}`}
      >
        {title}
      </h3>

      <ul className="mt-3.5 space-y-2.5 sm:mt-4 sm:space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={`inline-flex text-[12.5px] font-medium text-[var(--footer-link)] hover:translate-x-0.5 hover:text-[var(--footer-link-hover)] sm:text-[13px] ${transitionClass}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <footer
      id="footer"
      className={`relative overflow-hidden px-5 py-11 sm:px-8 sm:py-14 lg:px-14 lg:py-16 xl:px-20 ${transitionClass}`}
    >
      <div className="theme-footer-dark" />
      <div className="theme-footer-light" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[320px] -translate-x-1/2 rounded-full bg-violet-500/12 blur-[90px] sm:w-[560px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-500/8 blur-[100px]" />

      <div className="relative mx-auto max-w-[1440px]">
        <div
          className={`rounded-[30px] border border-[var(--footer-shell-border)] bg-[var(--footer-shell-bg)] p-5 shadow-[0_24px_80px_var(--footer-shell-shadow)] backdrop-blur-xl sm:p-6 lg:p-7 ${transitionClass}`}
        >
          <div className="grid gap-9 lg:grid-cols-[1.25fr_2fr_1.2fr] lg:gap-10 xl:gap-12">
            {/* Brand */}
            <div className="max-w-[380px]">
              <Logo />

              <p
                className={`mt-4 max-w-[350px] text-[13px] leading-6 text-[var(--footer-muted)] sm:mt-5 sm:text-[14px] sm:leading-7 ${transitionClass}`}
              >
                The easiest and fastest way to download videos from any link.
                Built for speed, privacy, and simplicity.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    aria-label={social.label}
                    className={`grid h-9 w-9 place-items-center rounded-xl border border-[var(--footer-social-border)] bg-[var(--footer-social-bg)] hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-violet-500/10 sm:h-10 sm:w-10 ${transitionClass}`}
                  >
                    <BrandLogo
                      name={social.name}
                      className="h-[18px] w-[18px] sm:h-5 sm:w-5"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:gap-x-8 xl:gap-x-10">
              {footerColumns.map((column) => (
                <FooterColumn
                  key={column.title}
                  title={column.title}
                  links={column.links}
                />
              ))}
            </div>

            {/* Newsletter */}
            <div className="max-w-[380px] lg:ml-auto">
              <h3
                className={`text-[13.5px] font-semibold tracking-[-0.01em] text-[var(--footer-heading)] sm:text-[14px] ${transitionClass}`}
              >
                Stay Updated
              </h3>

              <p
                className={`mt-3.5 max-w-[340px] text-[13px] leading-6 text-[var(--footer-muted)] sm:mt-4 sm:text-[14px] ${transitionClass}`}
              >
                Subscribe to get product updates and helpful download tips.
              </p>

              <form
                onSubmit={handleSubmit}
                className={`mt-4 flex h-11 w-full max-w-[360px] overflow-hidden rounded-2xl border border-[var(--footer-input-border)] bg-[var(--footer-input-bg)] shadow-[0_12px_36px_var(--footer-input-shadow)] focus-within:border-violet-400/45 sm:mt-5 sm:h-12 ${transitionClass}`}
              >
                <input
                  type="email"
                  className="min-w-0 flex-1 bg-transparent px-4 text-[13px] text-[var(--footer-input-text)] outline-none placeholder:text-[var(--footer-placeholder)] sm:text-sm"
                  placeholder="Enter your email"
                  aria-label="Email address"
                />

                <button
                  type="submit"
                  className={`grid w-12 shrink-0 place-items-center bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:brightness-110 sm:w-[52px] ${transitionClass}`}
                  aria-label="Subscribe"
                >
                  <Send className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </button>
              </form>

              <p
                className={`mt-3 text-[12px] leading-5 text-[var(--footer-soft)] ${transitionClass}`}
              >
                No spam. Only product updates and useful tips.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-9 border-t border-[var(--footer-divider)] pt-5 sm:mt-10 lg:mt-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                className={`text-[12.5px] text-[var(--footer-muted)] sm:text-[13px] ${transitionClass}`}
              >
                &copy; 2026 LinkFlow Downloader. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] text-[var(--footer-soft)] sm:justify-end sm:gap-x-5 sm:text-[13px]">
                <a
                  href="#"
                  className={`hover:text-[var(--footer-link-hover)] ${transitionClass}`}
                >
                  Privacy
                </a>

                <span className="hidden h-1 w-1 rounded-full bg-[var(--footer-dot)] sm:block" />

                <a
                  href="#"
                  className={`hover:text-[var(--footer-link-hover)] ${transitionClass}`}
                >
                  Terms
                </a>

                <span className="hidden h-1 w-1 rounded-full bg-[var(--footer-dot)] sm:block" />

                <a
                  href="#"
                  className={`hover:text-[var(--footer-link-hover)] ${transitionClass}`}
                >
                  DMCA
                </a>
              </div>
            </div>

            <p
              className={`mt-3 text-[12px] text-[var(--footer-soft)] sm:text-right ${transitionClass}`}
            >
              Made for fast, secure downloads.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;