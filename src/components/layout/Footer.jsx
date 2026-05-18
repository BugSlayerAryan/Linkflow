import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { toast } from "react-toastify";

import Logo from "../common/Logo";
import BrandLogo from "../common/BrandLogo";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const socialLinks = [
  { name: "youtube", label: "YouTube", href: "/youtube" },
  { name: "instagram", label: "Instagram", href: "/instagram" },
  { name: "facebook", label: "Facebook", href: "/facebook" },
  { name: "twitter", label: "Twitter/X", href: "/x.com" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "DMCA", href: "/dmca" },
];

const legalColumnLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "About Us", href: "/about" },
  { label: "DMCA", href: "/dmca" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Help Center", href: "/help" },
  { label: "Report Issue", href: "/report" },
  { label: "Feedback", href: "/feedback" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "DMCA", href: "/dmca" },
];

const footerConfig = {
  home: {
    footerDark: "theme-footer-dark",
    footerLight: "theme-footer-light",
    description:
      "SnapDL is a fast online video downloader for saving videos from YouTube, Instagram, Facebook, X/Twitter, and more in MP4 or MP3 format.",
    madeFor: "Made for fast, secure online video downloads.",
    glow: "bg-violet-500/12",
    secondGlow: "bg-blue-500/8",
    hoverBorder: "hover:border-violet-400/40",
    hoverBg: "hover:bg-violet-500/10",
    buttonGradient: "from-violet-600 to-fuchsia-600",
    focusBorder: "focus-within:border-violet-400/45",
    columns: [
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
        title: "Downloaders",
        links: [
          { label: "YouTube Downloader", href: "/youtube" },
          { label: "Instagram Downloader", href: "/instagram" },
          { label: "Facebook Downloader", href: "/facebook" },
          { label: "X/Twitter Downloader", href: "/x.com" },
        ],
      },
      {
        title: "Legal",
        links: legalColumnLinks,
      },
      {
        title: "Support",
        links: [
          { label: "Contact Us", href: "/contact" },
          { label: "Help Center", href: "/help" },
          { label: "Report Issue", href: "/report" },
          { label: "Feedback", href: "/feedback" },
          { label: "FAQ", href: "#faq" },
          { label: "Start Download", href: "#start-download" },
        ],
      },
    ],
  },

  youtube: {
    footerDark: "theme-youtube-footer-dark",
    footerLight: "theme-youtube-footer-light",
    description:
      "Download YouTube videos, Shorts, and music links online in MP4 or MP3 format with SnapDL YouTube Video Downloader.",
    madeFor: "Made for fast YouTube MP4 and MP3 downloads.",
    glow: "bg-red-500/12",
    secondGlow: "bg-rose-500/8",
    hoverBorder: "hover:border-red-400/40",
    hoverBg: "hover:bg-red-500/10",
    buttonGradient: "from-[#FF0000] to-rose-500",
    focusBorder: "focus-within:border-red-400/45",
    columns: [
      {
        title: "YouTube Tool",
        links: [
          { label: "Features", href: "#youtube-features" },
          { label: "How It Works", href: "#youtube-how-it-works" },
          { label: "Formats", href: "#youtube-formats" },
          { label: "FAQ", href: "#youtube-faq" },
        ],
      },
      {
        title: "Other Downloaders",
        links: [
          { label: "Instagram Downloader", href: "/instagram" },
          { label: "Facebook Downloader", href: "/facebook" },
          { label: "X/Twitter Downloader", href: "/x.com" },
          { label: "All Video Tools", href: "/" },
        ],
      },
      {
        title: "Formats",
        links: [
          { label: "YouTube MP4", href: "#youtube-formats" },
          { label: "YouTube MP3", href: "#youtube-formats" },
          { label: "YouTube Shorts", href: "#youtube-features" },
          { label: "Start Download", href: "#hero" },
        ],
      },
      {
        title: "Support",
        links: supportLinks,
      },
    ],
  },

  instagram: {
    footerDark: "theme-instagram-footer-dark",
    footerLight: "theme-instagram-footer-light",
    description:
      "Download Instagram Reels, videos, stories, and post videos online in MP4 format with SnapDL Instagram Video Downloader.",
    madeFor: "Made for fast Instagram Reels and MP4 downloads.",
    glow: "bg-pink-500/12",
    secondGlow: "bg-orange-400/8",
    hoverBorder: "hover:border-pink-400/40",
    hoverBg: "hover:bg-pink-500/10",
    buttonGradient: "from-[#833AB4] via-[#E1306C] to-[#FCAF45]",
    focusBorder: "focus-within:border-pink-400/45",
    columns: [
      {
        title: "Instagram Tool",
        links: [
          { label: "Features", href: "#instagram-features" },
          { label: "How It Works", href: "#instagram-how-it-works" },
          { label: "Formats", href: "#instagram-formats" },
          { label: "FAQ", href: "#instagram-faq" },
        ],
      },
      {
        title: "Other Downloaders",
        links: [
          { label: "YouTube Downloader", href: "/youtube" },
          { label: "Facebook Downloader", href: "/facebook" },
          { label: "X/Twitter Downloader", href: "/x.com" },
          { label: "All Video Tools", href: "/" },
        ],
      },
      {
        title: "Formats",
        links: [
          { label: "Instagram Reels MP4", href: "#instagram-formats" },
          { label: "Instagram Videos", href: "#instagram-features" },
          { label: "Stories Support", href: "#instagram-faq" },
          { label: "Start Download", href: "#hero" },
        ],
      },
      {
        title: "Support",
        links: supportLinks,
      },
    ],
  },

  facebook: {
    footerDark: "theme-facebook-footer-dark",
    footerLight: "theme-facebook-footer-light",
    description:
      "Download Facebook videos, Reels, Watch links, stories, and public post videos online in MP4 format with SnapDL.",
    madeFor: "Made for fast Facebook video and Reels downloads.",
    glow: "bg-blue-500/12",
    secondGlow: "bg-sky-400/8",
    hoverBorder: "hover:border-blue-400/40",
    hoverBg: "hover:bg-blue-500/10",
    buttonGradient: "from-[#0B5FEA] via-[#1877F2] to-[#14B8FF]",
    focusBorder: "focus-within:border-blue-400/45",
    columns: [
      {
        title: "Facebook Tool",
        links: [
          { label: "Features", href: "#facebook-features" },
          { label: "How It Works", href: "#facebook-how-it-works" },
          { label: "Formats", href: "#facebook-formats" },
          { label: "FAQ", href: "#facebook-faq" },
        ],
      },
      {
        title: "Other Downloaders",
        links: [
          { label: "YouTube Downloader", href: "/youtube" },
          { label: "Instagram Downloader", href: "/instagram" },
          { label: "X/Twitter Downloader", href: "/x.com" },
          { label: "All Video Tools", href: "/" },
        ],
      },
      {
        title: "Formats",
        links: [
          { label: "Facebook MP4", href: "#facebook-formats" },
          { label: "Facebook Reels", href: "#facebook-features" },
          { label: "Watch Links", href: "#facebook-faq" },
          { label: "Start Download", href: "#hero" },
        ],
      },
      {
        title: "Support",
        links: supportLinks,
      },
    ],
  },

  twitter: {
    footerDark: "theme-x-footer-dark",
    footerLight: "theme-x-footer-light",
    description:
      "Download X videos, Twitter videos, clips, and public post videos online in MP4 format with SnapDL.",
    madeFor: "Made for fast X and Twitter MP4 video downloads.",
    glow: "bg-white/10",
    secondGlow: "bg-sky-400/8",
    hoverBorder: "hover:border-sky-300/40",
    hoverBg: "hover:bg-sky-400/10",
    buttonGradient: "from-white via-sky-300 to-slate-400",
    focusBorder: "focus-within:border-sky-300/45",
    columns: [
      {
        title: "X/Twitter Tool",
        links: [
          { label: "Features", href: "#x-features" },
          { label: "How It Works", href: "#x-how-it-works" },
          { label: "Formats", href: "#x-formats" },
          { label: "FAQ", href: "#x-faq" },
        ],
      },
      {
        title: "Other Downloaders",
        links: [
          { label: "YouTube Downloader", href: "/youtube" },
          { label: "Instagram Downloader", href: "/instagram" },
          { label: "Facebook Downloader", href: "/facebook" },
          { label: "All Video Tools", href: "/" },
        ],
      },
      {
        title: "Formats",
        links: [
          { label: "Twitter MP4", href: "#x-formats" },
          { label: "X Video Posts", href: "#x-features" },
          { label: "Browser Based", href: "#x-faq" },
          { label: "Start Download", href: "#hero" },
        ],
      },
      {
        title: "Support",
        links: supportLinks,
      },
    ],
  },
};

function getPageType(pathname) {
  const path = pathname.toLowerCase();

  if (path.includes("youtube")) return "youtube";
  if (path.includes("instagram")) return "instagram";
  if (path.includes("facebook")) return "facebook";
  if (path.includes("twitter") || path.includes("x.com")) return "twitter";

  return "home";
}

function scrollToSection(selector) {
  window.setTimeout(() => {
    const target = document.querySelector(selector);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, 80);
}

function FooterColumn({ title, links, onSmartLinkClick }) {
  return (
    <div>
      <h3
        className={`text-[15px] font-semibold leading-6 tracking-[-0.01em] text-[var(--footer-heading)] sm:text-[15.5px] lg:text-[16px] ${transitionClass}`}
      >
        {title}
      </h3>

      <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={(event) => onSmartLinkClick(event, link.href)}
              className={`inline-flex text-[14px] font-medium leading-6 text-[var(--footer-link)] hover:translate-x-0.5 hover:text-[var(--footer-link-hover)] sm:text-[14.5px] lg:text-[15px] ${transitionClass}`}
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
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageType = useMemo(
    () => getPageType(location.pathname),
    [location.pathname]
  );

  const config = footerConfig[pageType] || footerConfig.home;
  const isTwitter = pageType === "twitter";

  const handleSmartLinkClick = (event, href) => {
    if (!href || href === "#") return;

    event.preventDefault();

    if (href.startsWith("#")) {
      scrollToSection(href);
      return;
    }

    const currentPath = location.pathname.toLowerCase();
    const targetPath = href.toLowerCase();

    if (currentPath === targetPath) {
      scrollToSection("#hero");
      return;
    }

    navigate(href);

    window.setTimeout(() => {
      scrollToSection("#hero");
    }, 260);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);

      const savedEmails = JSON.parse(
        localStorage.getItem("snapdl-newsletter-emails") || "[]"
      );

      if (savedEmails.includes(cleanEmail)) {
        toast.info("You are already subscribed.");
        setEmail("");
        return;
      }

      localStorage.setItem(
        "snapdl-newsletter-emails",
        JSON.stringify([...savedEmails, cleanEmail])
      );

      toast.success("Thanks! You are subscribed to SnapDL updates.");
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscribe error:", error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="footer"
      className={`theme-section relative overflow-hidden px-4 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-16 xl:px-20 ${transitionClass}`}
    >
      <div className={`theme-layer ${config.footerDark}`} />
      <div className={`theme-layer ${config.footerLight}`} />

      <div
        className={`pointer-events-none absolute left-1/2 top-0 z-[1] h-56 w-[320px] -translate-x-1/2 rounded-full ${config.glow} blur-[90px] sm:w-[560px]`}
      />
      <div
        className={`pointer-events-none absolute bottom-0 right-0 z-[1] h-64 w-64 rounded-full ${config.secondGlow} blur-[100px]`}
      />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div
          className={`rounded-[30px] border border-[var(--footer-shell-border)] bg-[var(--footer-shell-bg)] p-5 shadow-[0_24px_80px_var(--footer-shell-shadow)] backdrop-blur-xl sm:p-6 lg:p-7 ${transitionClass}`}
        >
          <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr_1.2fr] lg:gap-10 xl:gap-12">
            <div className="max-w-[390px]">
              <a
                href="/"
                onClick={(event) => handleSmartLinkClick(event, "/")}
                aria-label="Go to SnapDL homepage"
                className="inline-flex"
              >
                <Logo />
              </a>

              <p
                className={`mt-5 max-w-[370px] text-[14px] leading-7 text-[var(--footer-muted)] sm:text-[14.5px] lg:text-[15px] ${transitionClass}`}
              >
                {config.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    onClick={(event) =>
                      handleSmartLinkClick(event, social.href)
                    }
                    aria-label={`Open ${social.label} downloader`}
                    title={`${social.label} Downloader`}
                    className={`grid h-10 w-10 place-items-center rounded-xl border border-[var(--footer-social-border)] bg-[var(--footer-social-bg)] hover:-translate-y-0.5 ${config.hoverBorder} ${config.hoverBg} sm:h-11 sm:w-11 ${transitionClass}`}
                  >
                    <BrandLogo
                      name={social.name}
                      className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4 lg:gap-x-8 xl:gap-x-10">
              {config.columns.map((column) => (
                <FooterColumn
                  key={column.title}
                  title={column.title}
                  links={column.links}
                  onSmartLinkClick={handleSmartLinkClick}
                />
              ))}
            </div>

            <div className="max-w-[390px] lg:ml-auto">
              <h3
                className={`text-[15px] font-semibold leading-6 tracking-[-0.01em] text-[var(--footer-heading)] sm:text-[15.5px] lg:text-[16px] ${transitionClass}`}
              >
                Stay Updated
              </h3>

              <p
                className={`mt-4 max-w-[360px] text-[14px] leading-7 text-[var(--footer-muted)] sm:text-[14.5px] lg:text-[15px] ${transitionClass}`}
              >
                Subscribe for SnapDL product updates, downloader improvements,
                and useful video download tips.
              </p>

              <form
                onSubmit={handleSubmit}
                className={`mt-5 flex h-12 w-full max-w-[370px] overflow-hidden rounded-2xl border border-[var(--footer-input-border)] bg-[var(--footer-input-bg)] shadow-[0_12px_36px_var(--footer-input-shadow)] ${config.focusBorder} sm:h-[52px] ${transitionClass}`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isSubmitting}
                  className="min-w-0 flex-1 bg-transparent px-4 text-[14px] text-[var(--footer-input-text)] outline-none placeholder:text-[var(--footer-placeholder)] disabled:cursor-not-allowed sm:text-[14.5px]"
                  placeholder="Enter your email"
                  aria-label="Email address"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`grid w-[52px] shrink-0 place-items-center bg-gradient-to-r ${config.buttonGradient} ${
                    isTwitter ? "text-slate-950" : "text-white"
                  } hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-14 ${transitionClass}`}
                  aria-label="Subscribe"
                >
                  <Send className="h-[18px] w-[18px]" />
                </button>
              </form>

              <p
                className={`mt-3 text-[13px] leading-5 text-[var(--footer-soft)] sm:text-[13.5px] ${transitionClass}`}
              >
                No spam. Only product updates and useful tips.
              </p>
            </div>
          </div>

          <div className="mt-9 border-t border-[var(--footer-divider)] pt-5 sm:mt-10 lg:mt-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                className={`text-[13px] leading-5 text-[var(--footer-muted)] sm:text-[13.5px] ${transitionClass}`}
              >
                &copy; 2026 SnapDL. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] leading-5 text-[var(--footer-soft)] sm:justify-end sm:gap-x-5 sm:text-[13.5px]">
                {legalLinks.map((item, index) => (
                  <div
                    key={item.label}
                    className="inline-flex items-center gap-x-4"
                  >
                    {index !== 0 && (
                      <span className="hidden h-1 w-1 rounded-full bg-[var(--footer-dot)] sm:block" />
                    )}

                    <a
                      href={item.href}
                      onClick={(event) =>
                        handleSmartLinkClick(event, item.href)
                      }
                      className={`hover:text-[var(--footer-link-hover)] ${transitionClass}`}
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <p
              className={`mt-3 text-[13px] leading-5 text-[var(--footer-soft)] sm:text-right sm:text-[13.5px] ${transitionClass}`}
            >
              {config.madeFor}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;