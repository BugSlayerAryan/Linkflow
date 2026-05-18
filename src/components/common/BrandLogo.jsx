// function YouTubeLogo({ className = "" }) {
//   return (
//     <span
//       className={`inline-flex items-center justify-center rounded-full bg-[#FF0000] text-white ${className}`}
//       aria-label="YouTube"
//     >
//       <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="currentColor">
//         <path d="M23.5 6.4a3 3 0 0 0-2.1-2.1C19.5 3.8 12 3.8 12 3.8s-7.5 0-9.4.5A3 3 0 0 0 .5 6.4 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.6 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.6ZM9.6 15.8V8.2l6.6 3.8-6.6 3.8Z" />
//       </svg>
//     </span>
//   );
// }

// function TikTokLogo({ className = "" }) {
//   return (
//     <span
//       className={`inline-flex items-center justify-center rounded-full bg-white text-black ${className}`}
//       aria-label="TikTok"
//     >
//       <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="currentColor">
//         <path d="M15.7 3c.4 1.4 1.3 2.7 2.5 3.5.9.6 1.8.9 2.9 1v3.1c-1.8-.1-3.6-.7-5.1-1.7v6.2c0 3.3-2.7 5.9-6 5.9S4 18.4 4 15.1s2.7-5.9 6-5.9c.3 0 .6 0 .9.1v3.2a2.7 2.7 0 0 0-.9-.2c-1.6 0-2.9 1.2-2.9 2.8S8.4 18 10 18s2.9-1.2 2.9-2.8V3h2.8Z" />
//       </svg>
//     </span>
//   );
// }

// function InstagramLogo({ className = "" }) {
//   return (
//     <span
//       className={`inline-flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_12%,#fd5949_35%,#d6249f_62%,#285AEB_100%)] text-white ${className}`}
//       aria-label="Instagram"
//     >
//       <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none">
//         <rect
//           x="5"
//           y="5"
//           width="14"
//           height="14"
//           rx="4"
//           stroke="currentColor"
//           strokeWidth="2"
//         />
//         <circle
//           cx="12"
//           cy="12"
//           r="3.2"
//           stroke="currentColor"
//           strokeWidth="2"
//         />
//         <circle cx="16.6" cy="7.4" r="1.1" fill="currentColor" />
//       </svg>
//     </span>
//   );
// }

// function FacebookLogo({ className = "" }) {
//   return (
//     <span
//       className={`inline-flex items-center justify-center rounded-full bg-[#1877F2] text-white ${className}`}
//       aria-label="Facebook"
//     >
//       <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="currentColor">
//         <path d="M14.2 8.1V6.6c0-.7.5-.9.9-.9h2.3V2h-3.2c-3.5 0-4.3 2.6-4.3 4.3v1.8H7.1v3.8h2.8V22h4.3V11.9h3.1l.5-3.8h-3.6Z" />
//       </svg>
//     </span>
//   );
// }

// function TwitterLogo({ className = "" }) {
//   return (
//     <span
//       className={`inline-flex items-center justify-center rounded-full border border-white/15 bg-black text-white ${className}`}
//       aria-label="Twitter X"
//     >
//       <svg viewBox="0 0 24 24" className="h-[48%] w-[48%]" fill="currentColor">
//         <path d="M18.2 2.8h3.1l-6.8 7.8 8 10.6h-6.3l-4.9-6.4-5.6 6.4H2.6l7.3-8.3L2.2 2.8h6.5l4.4 5.8 5.1-5.8Zm-1.1 16.5h1.7L7.8 4.6H6l11.1 14.7Z" />
//       </svg>
//     </span>
//   );
// }

// function VimeoLogo({ className = "" }) {
//   return (
//     <span
//       className={`inline-flex items-center justify-center rounded-full bg-[#1AB7EA] text-white ${className}`}
//       aria-label="Vimeo"
//     >
//       <span className="text-[11px] font-black italic leading-none">v</span>
//     </span>
//   );
// }

// function DailymotionLogo({ className = "" }) {
//   return (
//     <span
//       className={`inline-flex items-center justify-center rounded-full bg-[#0066DC] text-white ${className}`}
//       aria-label="Dailymotion"
//     >
//       <span className="text-[11px] font-black leading-none">D</span>
//     </span>
//   );
// }

// function MoreLogo({ className = "" }) {
//   return (
//     <span
//       className={`inline-flex items-center justify-center rounded-full bg-slate-800 text-white ${className}`}
//       aria-label="More"
//     >
//       <span className="text-[13px] font-black leading-none">+</span>
//     </span>
//   );
// }

// const logos = {
//   youtube: YouTubeLogo,
//   tiktok: TikTokLogo,
//   instagram: InstagramLogo,
//   facebook: FacebookLogo,
//   twitter: TwitterLogo,
//   vimeo: VimeoLogo,
//   dailymotion: DailymotionLogo,
//   more: MoreLogo,
// };

// function BrandLogo({ name, className = "" }) {
//   const Logo = logos[name];

//   if (!Logo) return null;

//   return <Logo className={className} />;
// }

// export default BrandLogo;


function YouTubeLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#FF0000] text-white shadow-sm ${className}`}
      aria-label="YouTube"
      title="YouTube"
    >
      <svg viewBox="0 0 24 24" className="h-[64%] w-[64%]" fill="currentColor">
        <path d="M23.5 6.4a3 3 0 0 0-2.1-2.1C19.5 3.8 12 3.8 12 3.8s-7.5 0-9.4.5A3 3 0 0 0 .5 6.4 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.6 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.6ZM9.6 15.8V8.2l6.6 3.8-6.6 3.8Z" />
      </svg>
    </span>
  );
}

function TikTokLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-black text-white shadow-sm ${className}`}
      aria-label="TikTok"
      title="TikTok"
    >
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="currentColor">
        <path d="M15.7 3c.4 1.4 1.3 2.7 2.5 3.5.9.6 1.8.9 2.9 1v3.1c-1.8-.1-3.6-.7-5.1-1.7v6.2c0 3.3-2.7 5.9-6 5.9S4 18.4 4 15.1s2.7-5.9 6-5.9c.3 0 .6 0 .9.1v3.2a2.7 2.7 0 0 0-.9-.2c-1.6 0-2.9 1.2-2.9 2.8S8.4 18 10 18s2.9-1.2 2.9-2.8V3h2.8Z" />
      </svg>
    </span>
  );
}

function InstagramLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_12%,#fd5949_35%,#d6249f_62%,#285AEB_100%)] text-white shadow-sm ${className}`}
      aria-label="Instagram"
      title="Instagram"
    >
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="none">
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
      className={`inline-flex items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm ${className}`}
      aria-label="Facebook"
      title="Facebook"
    >
      <svg viewBox="0 0 24 24" className="h-[68%] w-[68%]" fill="currentColor">
        <path d="M14.2 8.1V6.6c0-.7.5-.9.9-.9h2.3V2h-3.2c-3.5 0-4.3 2.6-4.3 4.3v1.8H7.1v3.8h2.8V22h4.3V11.9h3.1l.5-3.8h-3.6Z" />
      </svg>
    </span>
  );
}

function TwitterLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border border-white/15 bg-black text-white shadow-sm ${className}`}
      aria-label="Twitter X"
      title="X"
    >
      <svg viewBox="0 0 24 24" className="h-[54%] w-[54%]" fill="currentColor">
        <path d="M18.2 2.8h3.1l-6.8 7.8 8 10.6h-6.3l-4.9-6.4-5.6 6.4H2.6l7.3-8.3L2.2 2.8h6.5l4.4 5.8 5.1-5.8Zm-1.1 16.5h1.7L7.8 4.6H6l11.1 14.7Z" />
      </svg>
    </span>
  );
}

function VimeoLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#1AB7EA] text-white shadow-sm ${className}`}
      aria-label="Vimeo"
      title="Vimeo"
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="currentColor">
        <path d="M22.8 7.1c-.1 2.7-2 6.4-5.6 11.1-3.8 4.9-7 7.3-9.6 7.3-1.6 0-3-1.5-4.1-4.5L1.2 12.7C.4 9.7-.4 8.2-1.1 8.2c-.2 0-.8.4-1.8 1.1L-4 7.9c1.2-1.1 2.5-2.2 3.7-3.3C1.9 2.7 3.5 1.8 4.6 1.7c2.7-.3 4.3 1.6 4.9 5.5.6 4.3 1 6.9 1.2 8 .7 3.7 1.5 5.6 2.4 5.6.7 0 1.7-1.1 3.1-3.2 1.4-2.1 2.1-3.8 2.2-4.9.2-1.9-.5-2.8-2.2-2.8-.8 0-1.6.2-2.4.5 1.6-5.2 4.6-7.7 9-7.6 3.2.1 4.7 1.6 4.6 4.3Z" />
      </svg>
    </span>
  );
}

function DailymotionLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#0066DC] text-white shadow-sm ${className}`}
      aria-label="Dailymotion"
      title="Dailymotion"
    >
      <span className="text-[13px] font-black leading-none">d</span>
    </span>
  );
}

function ShareChatLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#FFC400] text-white shadow-sm ${className}`}
      aria-label="ShareChat"
      title="ShareChat"
    >
      <svg viewBox="0 0 24 24" className="h-[66%] w-[66%]" fill="none">
        <path
          d="M12 3.5c5 0 8.8 3.2 8.8 7.6 0 4.3-3.8 7.6-8.8 7.6-.8 0-1.7-.1-2.4-.3L5 21l1.2-4.1c-1.9-1.4-3-3.4-3-5.8 0-4.4 3.8-7.6 8.8-7.6Z"
          fill="#FF5A1F"
        />
        <circle cx="8.8" cy="10.9" r="1.15" fill="white" />
        <circle cx="12" cy="10.9" r="1.15" fill="white" />
        <circle cx="15.2" cy="10.9" r="1.15" fill="white" />
        <path
          d="M8.2 14.2c1 .9 2.3 1.4 3.8 1.4s2.8-.5 3.8-1.4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function SnapchatLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#FFFC00] text-black shadow-sm ${className}`}
      aria-label="Snapchat"
      title="Snapchat"
    >
      <svg viewBox="0 0 24 24" className="h-[68%] w-[68%]" fill="currentColor">
        <path d="M12 2.6c2.7 0 4.9 2 4.9 4.8v3c0 .4.2.7.6.9.5.2 1 .3 1.5.5.5.2.8.6.7 1.1-.1.7-.9 1.1-2.3 1.3.5 1.2 1.4 2.2 2.6 2.8.5.3.5 1 .1 1.3-.6.5-1.5.7-2.6.7-.5 0-.8.1-1.1.5-.7.8-1.8 1.9-4.4 1.9s-3.7-1.1-4.4-1.9c-.3-.4-.6-.5-1.1-.5-1.1 0-2-.2-2.6-.7-.4-.3-.4-1 .1-1.3 1.2-.6 2.1-1.6 2.6-2.8-1.4-.2-2.2-.6-2.3-1.3-.1-.5.2-.9.7-1.1.5-.2 1-.3 1.5-.5.4-.2.6-.5.6-.9v-3c0-2.8 2.2-4.8 4.9-4.8Z" />
      </svg>
    </span>
  );
}

function RedditLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#FF4500] text-white shadow-sm ${className}`}
      aria-label="Reddit"
      title="Reddit"
    >
      <svg viewBox="0 0 24 24" className="h-[68%] w-[68%]" fill="currentColor">
        <path d="M21.5 11.9c0-1.4-1.1-2.5-2.5-2.5-.7 0-1.3.3-1.8.7-1.2-.8-2.8-1.3-4.5-1.4l.9-4.1 2.9.6c.1 1 1 1.8 2 1.8 1.1 0 2-.9 2-2s-.9-2-2-2c-.8 0-1.5.5-1.8 1.2l-3.6-.8c-.4-.1-.8.2-.9.6l-1 4.7c-1.8.1-3.4.6-4.7 1.4-.5-.5-1.1-.7-1.8-.7-1.4 0-2.5 1.1-2.5 2.5 0 1 .6 1.9 1.5 2.3v.4c0 3.3 3.7 6 8.3 6s8.3-2.7 8.3-6v-.4c.9-.4 1.5-1.3 1.5-2.3ZM8.7 13.7c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6-.7 1.6-1.6 1.6-1.6-.7-1.6-1.6Zm6.9 3.5c-.9.9-2.2 1.3-3.6 1.3s-2.7-.5-3.6-1.3c-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 .7.6 1.7 1 2.9 1s2.2-.4 2.9-1c.2-.2.5-.2.7 0 .2.2.2.5 0 .7Zm-1.9-1.9c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6Z" />
      </svg>
    </span>
  );
}

function MoreLogo({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-slate-800 text-white shadow-sm ${className}`}
      aria-label="More"
      title="More"
    >
      <span className="text-[15px] font-black leading-none">+</span>
    </span>
  );
}

const logos = {
  youtube: YouTubeLogo,
  tiktok: TikTokLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  twitter: TwitterLogo,
  x: TwitterLogo,
  vimeo: VimeoLogo,
  dailymotion: DailymotionLogo,
  sharechat: ShareChatLogo,
  snapchat: SnapchatLogo,
  reddit: RedditLogo,
  more: MoreLogo,
};

function BrandLogo({ name, className = "h-9 w-9" }) {
  const Logo = logos[name?.toLowerCase()];

  if (!Logo) return null;

  return <Logo className={className} />;
}

export default BrandLogo;