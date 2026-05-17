import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft, Sparkles } from "lucide-react";
import BrandLogo from "../components/common/BrandLogo";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const quickLinks = [
  { label: "YouTube", href: "/youtube", logo: "youtube" },
  { label: "Instagram", href: "/instagram", logo: "instagram" },
  { label: "Facebook", href: "/facebook", logo: "facebook" },
  { label: "X/Twitter", href: "/x.com", logo: "twitter" },
];

function NotFoundPage() {
  return (
    <main
      className={`theme-section relative min-h-screen overflow-hidden ${transitionClass}`}
    >
      <div className="theme-layer theme-hero-dark" />
      <div className="theme-layer theme-hero-light" />

      <div className="pointer-events-none absolute left-1/2 top-16 z-[1] h-72 w-[340px] -translate-x-1/2 rounded-full bg-violet-500/16 blur-[100px] sm:w-[620px]" />
      <div className="pointer-events-none absolute -left-28 bottom-20 z-[1] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-52 z-[1] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] items-center justify-center px-5 py-16 text-center sm:px-8 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-[22px] border border-violet-400/20 bg-violet-500/10 text-violet-400 shadow-[0_0_40px_rgba(139,92,246,0.24)] backdrop-blur-xl">
            <Search className="h-8 w-8" />
          </div>

          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-4 py-2 text-xs font-bold text-[var(--badge-text)] shadow-[0_12px_34px_rgba(124,58,237,0.12)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--badge-icon)]" />
            Page Not Found
          </div>

          <h1 className="mt-6 text-[86px] font-black leading-none tracking-[-0.08em] text-[var(--text-heading)] sm:text-[118px] lg:text-[142px]">
            4
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              0
            </span>
            4
          </h1>

          <h2 className="mt-5 text-[30px] font-black leading-tight tracking-[-0.04em] text-[var(--text-heading)] sm:text-[42px] lg:text-[50px]">
            This page could not be found
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[var(--text-muted)] sm:text-[16px]">
            The page you are looking for may have been moved, renamed, or does
            not exist. Go back home and start downloading videos with SnapDL.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className={`group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_42px_rgba(168,85,247,0.26)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 sm:w-auto ${transitionClass}`}
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-6 py-3.5 text-sm font-bold text-[var(--text-heading)] shadow-[0_14px_34px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] active:translate-y-0 sm:w-auto ${transitionClass}`}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>

          <div className="mx-auto mt-9 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {quickLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`group flex items-center justify-center gap-2.5 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-3 text-[13px] font-bold text-[var(--text-heading)] shadow-[0_12px_32px_var(--shadow-soft)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] ${transitionClass}`}
              >
                <BrandLogo
                  name={item.logo}
                  className={`h-4.5 w-4.5 shrink-0 group-hover:scale-110 ${transitionClass}`}
                />

                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;