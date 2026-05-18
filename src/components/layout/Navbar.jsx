import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import Logo from "../common/Logo";

const platformStyles = {
  home: {
    badge: "SnapDL",
    navDark: "theme-nav-dark",
    navLight: "theme-nav-light",
    badgeClass: "border-violet-400/20 bg-violet-500/10 text-violet-500",
    activeDot: "bg-violet-400 shadow-[0_0_14px_rgba(168,85,247,0.9)]",
    sideLine: "from-violet-400 to-fuchsia-400",
    hoverBorder: "hover:border-violet-400/40",
    ctaGradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    ctaShadow: "shadow-[0_10px_30px_rgba(168,85,247,0.24)]",
    navGlow: "bg-violet-500/10",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Formats", href: "#formats" },
      { label: "FAQ", href: "#faq" },
      { label: "Start Download", href: "#start-download" },
    ],
  },

  youtube: {
    badge: "YouTube",
    navDark: "theme-youtube-nav-dark",
    navLight: "theme-youtube-nav-light",
    badgeClass: "border-red-400/20 bg-red-500/10 text-red-400",
    activeDot: "bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.9)]",
    sideLine: "from-red-400 to-rose-400",
    hoverBorder: "hover:border-red-400/40",
    ctaGradient: "from-[#FF0000] via-red-600 to-rose-500",
    ctaShadow: "shadow-[0_10px_30px_rgba(255,0,0,0.24)]",
    navGlow: "bg-red-500/10",
    links: [
      { label: "Features", href: "#youtube-features" },
      { label: "How It Works", href: "#youtube-how-it-works" },
      { label: "Formats", href: "#youtube-formats" },
      { label: "FAQ", href: "#youtube-faq" },
      { label: "Start Download", href: "#youtube-start-download" },
    ],
  },

  instagram: {
    badge: "Instagram",
    navDark: "theme-instagram-nav-dark",
    navLight: "theme-instagram-nav-light",
    badgeClass: "border-pink-400/20 bg-pink-500/10 text-pink-400",
    activeDot: "bg-pink-400 shadow-[0_0_14px_rgba(244,114,182,0.9)]",
    sideLine: "from-pink-400 to-orange-300",
    hoverBorder: "hover:border-pink-400/40",
    ctaGradient: "from-[#833AB4] via-[#E1306C] to-[#FCAF45]",
    ctaShadow: "shadow-[0_10px_30px_rgba(225,48,108,0.24)]",
    navGlow: "bg-pink-500/10",
    links: [
      { label: "Features", href: "#instagram-features" },
      { label: "How It Works", href: "#instagram-how-it-works" },
      { label: "Formats", href: "#instagram-formats" },
      { label: "FAQ", href: "#instagram-faq" },
      { label: "Start Download", href: "#instagram-start-download" },
    ],
  },

  facebook: {
    badge: "Facebook",
    navDark: "theme-facebook-nav-dark",
    navLight: "theme-facebook-nav-light",
    badgeClass: "border-blue-400/20 bg-blue-500/10 text-blue-400",
    activeDot: "bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.9)]",
    sideLine: "from-blue-400 to-sky-400",
    hoverBorder: "hover:border-blue-400/40",
    ctaGradient: "from-[#0B5FEA] via-[#1877F2] to-[#14B8FF]",
    ctaShadow: "shadow-[0_10px_30px_rgba(24,119,242,0.24)]",
    navGlow: "bg-blue-500/10",
    links: [
      { label: "Features", href: "#facebook-features" },
      { label: "How It Works", href: "#facebook-how-it-works" },
      { label: "Formats", href: "#facebook-formats" },
      { label: "FAQ", href: "#facebook-faq" },
      { label: "Start Download", href: "#facebook-start-download" },
    ],
  },

  twitter: {
    badge: "X/Twitter",
    navDark: "theme-x-nav-dark",
    navLight: "theme-x-nav-light",
    badgeClass: "border-white/15 bg-white/8 text-slate-200",
    activeDot: "bg-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.9)]",
    sideLine: "from-white to-sky-300",
    hoverBorder: "hover:border-sky-300/40",
    ctaGradient: "from-white via-sky-300 to-slate-400",
    ctaShadow: "shadow-[0_10px_30px_rgba(14,165,233,0.18)]",
    navGlow: "bg-white/8",
    links: [
      { label: "Features", href: "#x-features" },
      { label: "How It Works", href: "#x-how-it-works" },
      { label: "Formats", href: "#x-formats" },
      { label: "FAQ", href: "#x-faq" },
      { label: "Start Download", href: "#x-start-download" },
    ],
  },
};

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function applyTheme(theme, shouldSave = true) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.setAttribute("data-theme", theme);

  if (shouldSave) {
    localStorage.setItem("snapdl-theme", theme);
  }
}

function getPageType(pathname) {
  const path = pathname.toLowerCase();

  if (path.includes("youtube")) return "youtube";
  if (path.includes("instagram")) return "instagram";
  if (path.includes("facebook")) return "facebook";
  if (path.includes("twitter") || path.includes("x.com")) return "twitter";

  return "home";
}

function Navbar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const pageType = useMemo(
    () => getPageType(location.pathname),
    [location.pathname]
  );

  const currentStyle = useMemo(() => {
    return platformStyles[pageType] || platformStyles.home;
  }, [pageType]);

  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const isTwitter = pageType === "twitter";

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("snapdl-theme") ||
      localStorage.getItem("linkflow-theme") ||
      "dark";

    applyTheme(savedTheme, false);
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    const updateTheme = () => {
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    document.documentElement.classList.add("theme-switching");

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        updateTheme();
      });
    } else {
      document.documentElement.getBoundingClientRect();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updateTheme();
        });
      });
    }

    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-switching");
    }, 750);
  };

  const handleNavClick = (event, href) => {
    event.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsOpen(false);
  };

  const handleLogoClick = () => {
    setIsOpen(false);

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <header className="sticky top-0 z-50 overflow-hidden border-b border-[var(--border-soft)] backdrop-blur-2xl">
      <div className={`theme-layer ${currentStyle.navDark}`} />
      <div className={`theme-layer ${currentStyle.navLight}`} />

      <div
        className={`pointer-events-none absolute left-1/2 top-0 z-[1] h-24 w-[420px] -translate-x-1/2 rounded-full blur-[80px] ${currentStyle.navGlow}`}
      />

      <nav
        aria-label="Main navigation"
        className="relative z-10 mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:h-[76px] lg:px-14 xl:px-20 2xl:px-24"
      >
        <Link
          to="/"
          onClick={handleLogoClick}
          aria-label="Go to SnapDL homepage"
          className={`shrink-0 cursor-pointer ${transitionClass}`}
        >
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] p-1 shadow-[0_12px_34px_var(--shadow-soft)] backdrop-blur-xl lg:flex">
          {currentStyle.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className={`cursor-pointer rounded-full px-[18px] py-2.5 text-[14.5px] font-semibold leading-5 tracking-[-0.01em] text-[var(--nav-link-text)] hover:-translate-y-0.5 hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] xl:px-5 xl:text-[15px] ${currentStyle.hoverBorder} ${transitionClass}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--nav-link-text)] hover:-translate-y-0.5 ${currentStyle.hoverBorder} hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] active:translate-y-0 ${transitionClass}`}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <ThemeIcon className="h-[18px] w-[18px]" />
          </button>

          <button
            type="button"
            className={`cursor-pointer rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-5 py-3 text-[14.5px] font-semibold leading-5 tracking-[-0.01em] text-[var(--nav-link-text)] hover:-translate-y-0.5 ${currentStyle.hoverBorder} hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] active:translate-y-0 xl:text-[15px] ${transitionClass}`}
          >
            Log In
          </button>

          <button
            type="button"
            className={`cursor-pointer rounded-2xl bg-gradient-to-r ${currentStyle.ctaGradient} px-5 py-3 text-[14.5px] font-semibold leading-5 tracking-[-0.01em] ${
              isTwitter ? "text-slate-950" : "text-white"
            } ${currentStyle.ctaShadow} hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 xl:text-[15px] ${transitionClass}`}
          >
            Sign Up
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className={`grid h-11 w-11 cursor-pointer place-items-center rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--logo-title)] ${currentStyle.hoverBorder} hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] active:scale-95 lg:hidden ${transitionClass}`}
          aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`relative z-10 overflow-hidden backdrop-blur-2xl lg:hidden ${transitionClass} ${
          isOpen ? "max-h-[760px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-5 pt-3 sm:px-8">
          <div
            className={`mx-auto max-w-sm rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-strong)] p-3 shadow-[0_24px_80px_var(--shadow-soft)] sm:max-w-md sm:p-4 ${transitionClass}`}
          >
            <div className="mb-3 flex items-center justify-between px-2">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--text-soft)] sm:text-[12.5px]">
                Navigation
              </p>

              <span
                className={`rounded-full border px-3 py-1.5 text-[12px] font-semibold leading-none ${currentStyle.badgeClass}`}
              >
                {currentStyle.badge}
              </span>
            </div>

            <div className="grid gap-1.5">
              {currentStyle.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className={`group relative flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-semibold leading-6 tracking-[-0.01em] text-[var(--nav-link-text)] hover:translate-x-1 hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] sm:text-[15.5px] ${transitionClass}`}
                >
                  <span
                    className={`absolute left-0 h-5 w-1 rounded-full bg-gradient-to-b ${currentStyle.sideLine} opacity-0 group-hover:opacity-100 ${transitionClass}`}
                  />

                  <span>{link.label}</span>

                  <span
                    className={`h-1.5 w-1.5 rounded-full opacity-0 group-hover:opacity-100 ${currentStyle.activeDot} ${transitionClass}`}
                  />
                </a>
              ))}

              <button
                type="button"
                onClick={toggleTheme}
                className={`mt-2 flex w-full items-center justify-between rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-3.5 text-[15px] font-semibold leading-6 tracking-[-0.01em] text-[var(--nav-link-text)] hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] sm:text-[15.5px] ${currentStyle.hoverBorder} ${transitionClass}`}
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                <ThemeIcon className="h-5 w-5" />
              </button>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-3.5 text-[15px] font-semibold leading-6 tracking-[-0.01em] text-[var(--nav-link-text)] hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] sm:text-[15.5px] ${currentStyle.hoverBorder} ${transitionClass}`}
                >
                  Log In
                </button>

                <button
                  type="button"
                  className={`rounded-2xl bg-gradient-to-r ${currentStyle.ctaGradient} px-4 py-3.5 text-[15px] font-semibold leading-6 tracking-[-0.01em] sm:text-[15.5px] ${
                    isTwitter ? "text-slate-950" : "text-white"
                  } ${currentStyle.ctaShadow} hover:brightness-110 ${transitionClass}`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;