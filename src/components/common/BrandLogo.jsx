function YouTubeLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#FF0000] text-white ${className}`}
      aria-label="YouTube"
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="currentColor">
        <path d="M23.5 6.4a3 3 0 0 0-2.1-2.1C19.5 3.8 12 3.8 12 3.8s-7.5 0-9.4.5A3 3 0 0 0 .5 6.4 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.6 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.6ZM9.6 15.8V8.2l6.6 3.8-6.6 3.8Z" />
      </svg>
    </span>
  );
}

function TikTokLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white text-black ${className}`}
      aria-label="TikTok"
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="currentColor">
        <path d="M15.7 3c.4 1.4 1.3 2.7 2.5 3.5.9.6 1.8.9 2.9 1v3.1c-1.8-.1-3.6-.7-5.1-1.7v6.2c0 3.3-2.7 5.9-6 5.9S4 18.4 4 15.1s2.7-5.9 6-5.9c.3 0 .6 0 .9.1v3.2a2.7 2.7 0 0 0-.9-.2c-1.6 0-2.9 1.2-2.9 2.8S8.4 18 10 18s2.9-1.2 2.9-2.8V3h2.8Z" />
      </svg>
    </span>
  );
}

function InstagramLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_12%,#fd5949_35%,#d6249f_62%,#285AEB_100%)] text-white ${className}`}
      aria-label="Instagram"
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none">
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="3.2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="16.6" cy="7.4" r="1.1" fill="currentColor" />
      </svg>
    </span>
  );
}

function FacebookLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#1877F2] text-white ${className}`}
      aria-label="Facebook"
    >
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="currentColor">
        <path d="M14.2 8.1V6.6c0-.7.5-.9.9-.9h2.3V2h-3.2c-3.5 0-4.3 2.6-4.3 4.3v1.8H7.1v3.8h2.8V22h4.3V11.9h3.1l.5-3.8h-3.6Z" />
      </svg>
    </span>
  );
}

function TwitterLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border border-white/15 bg-black text-white ${className}`}
      aria-label="Twitter X"
    >
      <svg viewBox="0 0 24 24" className="h-[48%] w-[48%]" fill="currentColor">
        <path d="M18.2 2.8h3.1l-6.8 7.8 8 10.6h-6.3l-4.9-6.4-5.6 6.4H2.6l7.3-8.3L2.2 2.8h6.5l4.4 5.8 5.1-5.8Zm-1.1 16.5h1.7L7.8 4.6H6l11.1 14.7Z" />
      </svg>
    </span>
  );
}

function VimeoLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#1AB7EA] text-white ${className}`}
      aria-label="Vimeo"
    >
      <span className="text-[11px] font-black italic leading-none">v</span>
    </span>
  );
}

function DailymotionLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#0066DC] text-white ${className}`}
      aria-label="Dailymotion"
    >
      <span className="text-[11px] font-black leading-none">D</span>
    </span>
  );
}

function MoreLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-slate-800 text-white ${className}`}
      aria-label="More"
    >
      <span className="text-[13px] font-black leading-none">+</span>
    </span>
  );
}

const logos = {
  youtube: YouTubeLogo,
  tiktok: TikTokLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  twitter: TwitterLogo,
  vimeo: VimeoLogo,
  dailymotion: DailymotionLogo,
  more: MoreLogo,
};

function BrandLogo({ name, className = "" }) {
  const Logo = logos[name];

  if (!Logo) return null;

  return <Logo className={className} />;
}

export default BrandLogo;