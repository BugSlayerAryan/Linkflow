import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import Logo from "../common/Logo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Formats", href: "#formats" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function applyTheme(theme, shouldSave = true) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.setAttribute("data-theme", theme);

  if (shouldSave) {
    localStorage.setItem("linkflow-theme", theme);
  }
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("linkflow-theme") || "dark";
    applyTheme(savedTheme, false);
    setTheme(savedTheme);
  }, []);

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

  const handleLogoClick = (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsOpen(false);
  };

  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header className="sticky top-0 z-50 overflow-hidden backdrop-blur-2xl">
      <div className="theme-layer theme-nav-dark" />
      <div className="theme-layer theme-nav-light" />

      <nav className="relative z-10 mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[76px] lg:px-14 xl:px-20 2xl:px-24">
        <a
          href="#"
          onClick={handleLogoClick}
          aria-label="Go to top"
          className={`cursor-pointer ${transitionClass}`}
        >
          <Logo />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-[var(--nav-link-text)] hover:-translate-y-0.5 hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] ${transitionClass}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--nav-link-text)] hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] active:translate-y-0 ${transitionClass}`}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <ThemeIcon className="h-[18px] w-[18px]" />
          </button>

          <button
            type="button"
            className={`cursor-pointer rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-5 py-3 text-sm font-medium text-[var(--nav-link-text)] hover:-translate-y-0.5 hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] active:translate-y-0 ${transitionClass}`}
          >
            Log In
          </button>

          <button
            type="button"
            className={`cursor-pointer rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(168,85,247,0.24)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 ${transitionClass}`}
          >
            Sign Up
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className={`grid h-10 w-10 cursor-pointer place-items-center rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--logo-title)] hover:border-violet-400/35 hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] active:scale-95 lg:hidden ${transitionClass}`}
          aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-[18px] w-[18px]" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      <div
        className={`relative z-10 overflow-hidden backdrop-blur-2xl lg:hidden ${transitionClass} ${
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 pt-3 sm:px-8">
          <div
            className={`mx-auto max-w-sm rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-strong)] p-3 shadow-[0_24px_80px_var(--shadow-soft)] ${transitionClass}`}
          >
            <div className="mb-3 flex items-center justify-between px-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">
                Navigation
              </p>

              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-500">
                LinkFlow
              </span>
            </div>

            <div className="grid gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className={`group relative flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-[14px] font-medium text-[var(--nav-link-text)] hover:translate-x-1 hover:bg-[var(--nav-link-hover-bg)] hover:text-[var(--nav-link-hover-text)] ${transitionClass}`}
                >
                  <span
                    className={`absolute left-0 h-5 w-1 rounded-full bg-gradient-to-b from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 ${transitionClass}`}
                  />

                  <span>{link.label}</span>

                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-violet-400 opacity-0 shadow-[0_0_14px_rgba(168,85,247,0.9)] group-hover:opacity-100 ${transitionClass}`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;