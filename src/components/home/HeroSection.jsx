// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   ArrowDownToLine,
//   Check,
//   CheckCircle2,
//   Clipboard,
//   Loader2,
//   Search,
//   ShieldCheck,
//   Sparkles,
// } from "lucide-react";

// import PillBadge from "../common/PillBadge";
// import BrandLogo from "../common/BrandLogo";
// import HeroPreview from "./HeroPreview";

// const RAW_API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:3030";

// const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

// /**
//  * Must match DownloadPreviewPage cache version.
//  */
// const MEDIA_CACHE_VERSION = "raw-preview-download-audio-v18";

// const colorTransitionClass =
//   "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

// const supportedDomains = [
//   "youtube.com",
//   "youtu.be",
//   "instagram.com",
//   "facebook.com",
//   "fb.watch",
//   "twitter.com",
//   "x.com",
//   "tiktok.com",
//   "vimeo.com",
//   "dailymotion.com",
//   "ted.com",
//   "archive.org",
//   "reddit.com",
// ];

// const steps = ["Analyze", "Formats", "Preview"];

// function isValidVideoUrl(value) {
//   try {
//     const url = new URL(value.trim());

//     if (!["http:", "https:"].includes(url.protocol)) {
//       return false;
//     }

//     const hostname = url.hostname.replace(/^www\./, "").toLowerCase();

//     return supportedDomains.some(
//       (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
//     );
//   } catch {
//     return false;
//   }
// }

// function wait(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// function getFriendlyError(error) {
//   const code = error?.cause?.data?.code;
//   const message = error?.cause?.data?.error || error?.message;

//   if (code === "YOUTUBE_BLOCKED_ON_SERVER") {
//     return "YouTube blocked this server request. Please try another platform for now.";
//   }

//   if (code === "INSTAGRAM_RATE_LIMITED") {
//     return "Instagram is rate-limiting the server. Please wait and try another public reel.";
//   }

//   if (code === "INSTAGRAM_LOGIN_REQUIRED") {
//     return "Instagram could not access this content. It may require login or may be unavailable.";
//   }

//   if (code === "RATE_LIMITED") {
//     return "This platform is rate-limiting the server. Please wait and try again later.";
//   }

//   if (code === "LOGIN_OR_COOKIES_REQUIRED") {
//     return "This video may require login or cookies. Try another public video link.";
//   }

//   if (code === "UNSUPPORTED_URL") {
//     return "This website or link format is not supported yet.";
//   }

//   return message || "Unable to fetch video details. Please try again.";
// }

// async function fetchMediaWithRetry(url, onRetry) {
//   const maxAttempts = 2;
//   let lastErrorData = null;

//   for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/v1/media`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           urls: url,
//         }),
//       });

//       const data = await response.json().catch(() => null);

//       if (response.ok && data?.status === "success") {
//         return {
//           ...data,
//           previewUrl: data.previewUrl || "",
//           rawPreviewUrl: data.rawPreviewUrl || "",
//         };
//       }

//       lastErrorData = data;

//       if (attempt < maxAttempts) {
//         onRetry?.();
//         await wait(900);
//         continue;
//       }

//       const error = new Error(
//         data?.error || "Unable to fetch video details. Please try again."
//       );

//       error.cause = {
//         status: response.status,
//         data,
//       };

//       throw error;
//     } catch (error) {
//       if (attempt < maxAttempts) {
//         onRetry?.();
//         await wait(900);
//         continue;
//       }

//       if (error?.cause?.data) {
//         throw error;
//       }

//       const wrappedError = new Error(
//         lastErrorData?.error ||
//           error?.message ||
//           "Backend connection failed. Please try again."
//       );

//       wrappedError.cause = {
//         data: lastErrorData,
//       };

//       throw wrappedError;
//     }
//   }

//   throw new Error("Unable to fetch video details. Please try again.");
// }

// function PreparingOverlay({ progress, loadingText }) {
//   return (
//     <div className="fixed inset-0 z-[999] grid place-items-center bg-slate-950/60 px-5 backdrop-blur-md">
//       <div className="relative w-full max-w-[460px] overflow-hidden rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_28px_90px_rgba(2,6,23,0.25)] dark:border-white/10 dark:bg-slate-950">
//         <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500" />

//         <div className="flex items-start gap-4">
//           <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-500/12 text-violet-500">
//             <Loader2 className="h-6 w-6 animate-spin" />
//           </div>

//           <div className="min-w-0 flex-1">
//             <div className="flex items-center gap-2">
//               <h3 className="truncate text-base font-bold tracking-[-0.02em] text-slate-950 dark:text-white">
//                 {loadingText}
//               </h3>

//               <Sparkles className="h-4 w-4 shrink-0 fill-violet-400 text-violet-400" />
//             </div>

//             <p className="mt-1.5 text-[13.5px] leading-6 text-slate-600 dark:text-slate-300">
//               Fetching preview, title, video formats, and audio formats.
//             </p>
//           </div>
//         </div>

//         <div className="relative mt-6">
//           <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
//             <span>Please wait</span>
//             <span>{progress}%</span>
//           </div>

//           <div className="h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
//             <div
//               className="relative h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 shadow-[0_0_28px_rgba(168,85,247,0.55)] transition-all duration-500 ease-out"
//               style={{ width: `${progress}%` }}
//             >
//               <div className="absolute inset-0 animate-pulse bg-white/25" />
//             </div>
//           </div>
//         </div>

//         <div className="relative mt-5 grid grid-cols-3 gap-2">
//           {steps.map((step, index) => {
//             const isDone =
//               progress >= 35 + index * 30 || (index === 2 && progress === 100);

//             return (
//               <div
//                 key={step}
//                 className={`rounded-2xl border px-3 py-2.5 text-center text-[11px] font-semibold ${
//                   isDone
//                     ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
//                     : "border-slate-200 bg-slate-50 text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
//                 }`}
//               >
//                 <div className="mx-auto mb-1 grid h-5 w-5 place-items-center">
//                   {isDone ? (
//                     <CheckCircle2 className="h-4 w-4" />
//                   ) : (
//                     <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
//                   )}
//                 </div>

//                 <span className="line-clamp-1">{step}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// function HeroSection() {
//   const navigate = useNavigate();

//   const progressTimerRef = useRef(null);

//   const [videoUrl, setVideoUrl] = useState("");
//   const [isPasted, setIsPasted] = useState(false);
//   const [isPreparing, setIsPreparing] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [loadingText, setLoadingText] = useState("Preparing your video");

//   const startProgress = () => {
//     clearInterval(progressTimerRef.current);

//     setProgress(7);

//     progressTimerRef.current = setInterval(() => {
//       setProgress((current) => {
//         if (current >= 86) return current;

//         const step = current < 35 ? 7 : current < 65 ? 5 : 2;
//         return Math.min(current + step, 86);
//       });
//     }, 330);
//   };

//   const stopProgress = () => {
//     clearInterval(progressTimerRef.current);
//     progressTimerRef.current = null;
//   };

//   const resetPreparingState = () => {
//     stopProgress();

//     setTimeout(() => {
//       setIsPreparing(false);
//       setProgress(0);
//       setLoadingText("Preparing your video");
//     }, 450);
//   };

//   useEffect(() => {
//     return () => {
//       stopProgress();
//     };
//   }, []);

//   const handlePaste = async () => {
//     try {
//       const text = await navigator.clipboard.readText();

//       if (text) {
//         setVideoUrl(text);
//         setIsPasted(true);

//         setTimeout(() => {
//           setIsPasted(false);
//         }, 1600);
//       }
//     } catch (error) {
//       toast.error("Clipboard access failed. Please paste the link manually.");
//       console.error("Clipboard access failed:", error);
//     }
//   };

//   const handleDownload = async () => {
//     const trimmedUrl = videoUrl.trim();

//     if (isPreparing) return;

//     if (!trimmedUrl) {
//       toast.error("Please paste a video link first.");
//       return;
//     }

//     if (!isValidVideoUrl(trimmedUrl)) {
//       toast.error("Invalid video link. Please paste a valid public URL.");
//       return;
//     }

//     try {
//       setIsPreparing(true);
//       setLoadingText("Preparing your video");
//       startProgress();

//       const startedAt = Date.now();

//       const data = await fetchMediaWithRetry(trimmedUrl, () => {
//         setLoadingText("Still working, retrying safely...");
//         setProgress((current) => Math.max(current, 48));
//       });

//       const minimumLoadingTime = 900;
//       const elapsed = Date.now() - startedAt;

//       if (elapsed < minimumLoadingTime) {
//         await wait(minimumLoadingTime - elapsed);
//       }

//       setLoadingText("Opening preview page...");
//       setProgress(100);

//       const cacheKey = `${MEDIA_CACHE_VERSION}:linkflow-media:${trimmedUrl}`;

//       sessionStorage.setItem(
//         cacheKey,
//         JSON.stringify({
//           url: trimmedUrl,
//           data: {
//             ...data,
//             previewUrl: data.previewUrl || "",
//             rawPreviewUrl: data.rawPreviewUrl || "",
//           },
//           createdAt: Date.now(),
//         })
//       );

//       await wait(350);

//       navigate(`/download?url=${encodeURIComponent(trimmedUrl)}&autoplay=1`);
//     } catch (error) {
//       console.error("Video prepare error:", error);
//       toast.error(getFriendlyError(error));
//     } finally {
//       resetPreparingState();
//     }
//   };

//   return (
//     <section id="hero" className="theme-section relative overflow-hidden">
//       <div className="theme-layer theme-hero-dark" />
//       <div className="theme-layer theme-hero-light" />

//       <div className="theme-grid absolute inset-0 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line-2)_1px,transparent_1px)] bg-[size:82px_82px] opacity-20" />

//       {isPreparing && (
//         <PreparingOverlay progress={progress} loadingText={loadingText} />
//       )}

//       <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-14 lg:py-12 xl:gap-12 xl:px-20 2xl:px-24">
//         <div className="relative z-10 mx-auto w-full max-w-[680px] text-center lg:mx-0 lg:text-left">
//           <PillBadge>Fast, Secure, Unlimited</PillBadge>

//           <h1
//             className={`mt-5 text-[42px] font-bold leading-[1.04] tracking-[-0.025em] text-[var(--text-heading)] xs:text-[46px] sm:text-[56px] md:text-[64px] lg:text-[60px] xl:text-[66px] ${colorTransitionClass}`}
//           >
//             Download Videos
//             <br />
//             From Any Link
//             <br />
//             <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
//               Instantly
//             </span>
//           </h1>

//           <p
//             className={`mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-[var(--text-body)] sm:text-[16px] sm:leading-8 lg:mx-0 lg:text-[17px] ${colorTransitionClass}`}
//           >
//             Save videos from Instagram, Facebook, X.com, TikTok, Vimeo and more
//             public websites in MP4 or MP3 format. Fast, secure and easy to use.
//           </p>

//           <div className="mx-auto mt-7 max-w-[460px] rounded-[1.35rem] border border-[var(--input-border)] bg-[var(--input-shell-bg)] p-1.5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:mx-0">
//             <div className="flex items-center gap-2 rounded-[1rem] border border-[var(--input-border)] bg-[var(--input-inner-bg)] px-2.5 py-2.5 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-3">
//               <div className="hidden h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--input-icon-bg)] text-[var(--input-icon-text)] sm:grid">
//                 <Search className="h-4 w-4" />
//               </div>

//               <Search className="h-4 w-4 shrink-0 text-[var(--input-icon-text)] sm:hidden" />

//               <input
//                 type="url"
//                 value={videoUrl}
//                 onChange={(event) => setVideoUrl(event.target.value)}
//                 onKeyDown={(event) => {
//                   if (event.key === "Enter") {
//                     handleDownload();
//                   }
//                 }}
//                 placeholder="Paste your video link here..."
//                 className={`h-9 min-w-0 flex-1 bg-transparent text-[13px] font-normal text-[var(--text-heading)] outline-none placeholder:text-[var(--input-placeholder)] sm:text-sm ${colorTransitionClass}`}
//               />

//               <button
//                 type="button"
//                 onClick={handlePaste}
//                 className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--input-border)] bg-[var(--input-button-bg)] px-3 text-xs font-semibold text-[var(--input-button-text)] shadow-inner shadow-white/5 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-violet-400/35 hover:bg-violet-500/15 hover:text-violet-600 active:translate-y-0 sm:h-10 sm:px-3.5"
//               >
//                 {isPasted ? (
//                   <>
//                     <Check className="h-3.5 w-3.5 text-emerald-400" />
//                     <span className="hidden xs:inline">Pasted</span>
//                   </>
//                 ) : (
//                   <>
//                     <Clipboard className="h-3.5 w-3.5" />
//                     <span className="hidden xs:inline">Paste</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleDownload}
//             disabled={isPreparing}
//             className="mx-auto mt-4 inline-flex w-full max-w-[460px] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(168,85,247,0.22)] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-75 lg:mx-0"
//           >
//             {isPreparing ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <ArrowDownToLine className="h-4 w-4" />
//             )}
//             {isPreparing ? "Preparing..." : "Download Now"}
//           </button>

//           <div className="mt-6">
//             <p
//               className={`text-center text-xs font-medium text-[var(--text-soft)] lg:text-left ${colorTransitionClass}`}
//             >
//               Supported Platforms
//             </p>

//             <div className="mt-4 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
//               {["instagram", "facebook", "twitter", "tiktok"].map((brand) => (
//                 <BrandLogo
//                   key={brand}
//                   name={brand}
//                   className="h-10 w-10 shadow-[0_0_18px_rgba(168,85,247,0.16)] transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-110"
//                 />
//               ))}
//             </div>

//             <p className="mt-3 text-center text-[11px] font-medium text-[var(--text-muted)] lg:text-left">
//               Also supports Vimeo, TED, Internet Archive, and selected Reddit
//               public video posts.
//             </p>
//           </div>

//           <div
//             className={`mx-auto mt-5 flex max-w-[520px] flex-wrap justify-center gap-x-4 gap-y-3 text-[11px] font-medium text-[var(--text-muted)] lg:mx-0 lg:justify-start ${colorTransitionClass}`}
//           >
//             {[
//               "Public Links Only",
//               "No Software to Install",
//               "Works on All Devices",
//             ].map((item) => (
//               <span key={item} className="inline-flex items-center gap-2">
//                 <ShieldCheck className="h-4 w-4 text-violet-400" />
//                 {item}
//               </span>
//             ))}
//           </div>
//         </div>

//         <HeroPreview />
//       </div>
//     </section>
//   );
// }

// export default HeroSection;


import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowDownToLine,
  Check,
  CheckCircle2,
  Clipboard,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import PillBadge from "../common/PillBadge";
import BrandLogo from "../common/BrandLogo";
import HeroPreview from "./HeroPreview";

const RAW_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3030";

const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

/**
 * Must match DownloadPreviewPage cache version.
 */
const MEDIA_CACHE_VERSION = "raw-preview-download-audio-v22";

const colorTransitionClass =
  "transition-colors duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const supportedDomains = [
  "youtube.com",
  "youtu.be",
  "instagram.com",
  "facebook.com",
  "fb.watch",
  "twitter.com",
  "x.com",
  "tiktok.com",
  "vimeo.com",
  "dailymotion.com",
  "ted.com",
  "archive.org",
  "reddit.com",
];

const steps = ["Analyze", "Formats", "Preview"];

function isValidVideoUrl(value) {
  try {
    const url = new URL(value.trim());

    if (!["http:", "https:"].includes(url.protocol)) {
      return false;
    }

    const hostname = url.hostname.replace(/^www\./, "").toLowerCase();

    return supportedDomains.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getFriendlyError(error) {
  const code = error?.cause?.data?.code;
  const message = error?.cause?.data?.error || error?.message;

  if (code === "YOUTUBE_BLOCKED_ON_SERVER") {
    return "YouTube blocked this server request. Please try another platform for now.";
  }

  if (code === "INSTAGRAM_RATE_LIMITED") {
    return "Instagram is rate-limiting the server. Please wait and try another public reel.";
  }

  if (code === "INSTAGRAM_LOGIN_REQUIRED") {
    return "Instagram could not access this content. It may require login or may be unavailable.";
  }

  if (code === "RATE_LIMITED") {
    return "This platform is rate-limiting the server. Please wait and try again later.";
  }

  if (code === "LOGIN_OR_COOKIES_REQUIRED") {
    return "This video may require login or cookies. Try another public video link.";
  }

  if (code === "UNSUPPORTED_URL") {
    return "This website or link format is not supported yet.";
  }

  return message || "Unable to fetch video details. Please try again.";
}

async function fetchMediaWithRetry(url, onRetry) {
  const maxAttempts = 2;
  let lastErrorData = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: url,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.status === "success") {
        return {
          ...data,
          previewUrl: data.previewUrl || "",
          rawPreviewUrl: data.rawPreviewUrl || "",
        };
      }

      lastErrorData = data;

      if (attempt < maxAttempts) {
        onRetry?.();
        await wait(900);
        continue;
      }

      const error = new Error(
        data?.error || "Unable to fetch video details. Please try again."
      );

      error.cause = {
        status: response.status,
        data,
      };

      throw error;
    } catch (error) {
      if (attempt < maxAttempts) {
        onRetry?.();
        await wait(900);
        continue;
      }

      if (error?.cause?.data) {
        throw error;
      }

      const wrappedError = new Error(
        lastErrorData?.error ||
          error?.message ||
          "Backend connection failed. Please try again."
      );

      wrappedError.cause = {
        data: lastErrorData,
      };

      throw wrappedError;
    }
  }

  throw new Error("Unable to fetch video details. Please try again.");
}

function PreparingOverlay({ progress, loadingText }) {
  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-slate-950/60 px-5 backdrop-blur-md">
      <div className="relative w-full max-w-[460px] overflow-hidden rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_28px_90px_rgba(2,6,23,0.25)] dark:border-white/10 dark:bg-slate-950">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500" />

        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-500/12 text-violet-500">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-bold tracking-[-0.02em] text-slate-950 dark:text-white">
                {loadingText}
              </h3>

              <Sparkles className="h-4 w-4 shrink-0 fill-violet-400 text-violet-400" />
            </div>

            <p className="mt-1.5 text-[13.5px] leading-6 text-slate-600 dark:text-slate-300">
              Fetching preview, title, video formats, and audio formats.
            </p>
          </div>
        </div>

        <div className="relative mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>Please wait</span>
            <span>{progress}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 shadow-[0_0_28px_rgba(168,85,247,0.55)] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 animate-pulse bg-white/25" />
            </div>
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-3 gap-2">
          {steps.map((step, index) => {
            const isDone =
              progress >= 35 + index * 30 || (index === 2 && progress === 100);

            return (
              <div
                key={step}
                className={`rounded-2xl border px-3 py-2.5 text-center text-[11px] font-semibold ${
                  isDone
                    ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-slate-200 bg-slate-50 text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                }`}
              >
                <div className="mx-auto mb-1 grid h-5 w-5 place-items-center">
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                  )}
                </div>

                <span className="line-clamp-1">{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();

  const progressTimerRef = useRef(null);

  const [videoUrl, setVideoUrl] = useState("");
  const [isPasted, setIsPasted] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Preparing your video");

  const startProgress = () => {
    clearInterval(progressTimerRef.current);

    setProgress(7);

    progressTimerRef.current = setInterval(() => {
      setProgress((current) => {
        if (current >= 86) return current;

        const step = current < 35 ? 7 : current < 65 ? 5 : 2;
        return Math.min(current + step, 86);
      });
    }, 330);
  };

  const stopProgress = () => {
    clearInterval(progressTimerRef.current);
    progressTimerRef.current = null;
  };

  const resetPreparingState = () => {
    stopProgress();

    setTimeout(() => {
      setIsPreparing(false);
      setProgress(0);
      setLoadingText("Preparing your video");
    }, 450);
  };

  useEffect(() => {
    return () => {
      stopProgress();
    };
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (text) {
        setVideoUrl(text);
        setIsPasted(true);

        setTimeout(() => {
          setIsPasted(false);
        }, 1600);
      }
    } catch (error) {
      toast.error("Clipboard access failed. Please paste the link manually.");
      console.error("Clipboard access failed:", error);
    }
  };

  const handleDownload = async () => {
    const trimmedUrl = videoUrl.trim();

    if (isPreparing) return;

    if (!trimmedUrl) {
      toast.error("Please paste a video link first.");
      return;
    }

    if (!isValidVideoUrl(trimmedUrl)) {
      toast.error("Invalid video link. Please paste a valid public URL.");
      return;
    }

    try {
      setIsPreparing(true);
      setLoadingText("Preparing your video");
      startProgress();

      const startedAt = Date.now();

      const data = await fetchMediaWithRetry(trimmedUrl, () => {
        setLoadingText("Still working, retrying safely...");
        setProgress((current) => Math.max(current, 48));
      });

      const minimumLoadingTime = 900;
      const elapsed = Date.now() - startedAt;

      if (elapsed < minimumLoadingTime) {
        await wait(minimumLoadingTime - elapsed);
      }

      setLoadingText("Opening preview page...");
      setProgress(100);

      const cacheKey = `${MEDIA_CACHE_VERSION}:linkflow-media:${trimmedUrl}`;

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          url: trimmedUrl,
          data: {
            ...data,
            previewUrl: data.previewUrl || "",
            rawPreviewUrl: data.rawPreviewUrl || "",
          },
          createdAt: Date.now(),
        })
      );

      await wait(350);

      navigate(`/download?url=${encodeURIComponent(trimmedUrl)}&autoplay=1`);
    } catch (error) {
      console.error("Video prepare error:", error);
      toast.error(getFriendlyError(error));
    } finally {
      resetPreparingState();
    }
  };

  return (
    <section id="hero" className="theme-section relative overflow-hidden">
      <div className="theme-layer theme-hero-dark" />
      <div className="theme-layer theme-hero-light" />

      <div className="theme-grid absolute inset-0 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line-2)_1px,transparent_1px)] bg-[size:82px_82px] opacity-20" />

      {isPreparing && (
        <PreparingOverlay progress={progress} loadingText={loadingText} />
      )}

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-14 lg:py-12 xl:gap-12 xl:px-20 2xl:px-24">
        <div className="relative z-10 mx-auto w-full max-w-[680px] text-center lg:mx-0 lg:text-left">
          <PillBadge>Fast, Secure, Unlimited</PillBadge>

          <h1
            className={`mt-5 text-[42px] font-bold leading-[1.04] tracking-[-0.025em] text-[var(--text-heading)] xs:text-[46px] sm:text-[56px] md:text-[64px] lg:text-[60px] xl:text-[66px] ${colorTransitionClass}`}
          >
            Download Videos
            <br />
            From Any Link
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>

          <p
            className={`mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-[var(--text-body)] sm:text-[16px] sm:leading-8 lg:mx-0 lg:text-[17px] ${colorTransitionClass}`}
          >
            Save videos from Instagram, Facebook, X.com, TikTok, Vimeo and more
            public websites in MP4 or MP3 format. Fast, secure and easy to use.
          </p>

          <div className="mx-auto mt-7 max-w-[460px] rounded-[1.35rem] border border-[var(--input-border)] bg-[var(--input-shell-bg)] p-1.5 shadow-[0_18px_55px_var(--shadow-soft)] backdrop-blur-xl transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:mx-0">
            <div className="flex items-center gap-2 rounded-[1rem] border border-[var(--input-border)] bg-[var(--input-inner-bg)] px-2.5 py-2.5 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-3">
              <div className="hidden h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--input-icon-bg)] text-[var(--input-icon-text)] sm:grid">
                <Search className="h-4 w-4" />
              </div>

              <Search className="h-4 w-4 shrink-0 text-[var(--input-icon-text)] sm:hidden" />

              <input
                type="url"
                value={videoUrl}
                onChange={(event) => setVideoUrl(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleDownload();
                  }
                }}
                placeholder="Paste your video link here..."
                className={`h-9 min-w-0 flex-1 bg-transparent text-[13px] font-normal text-[var(--text-heading)] outline-none placeholder:text-[var(--input-placeholder)] sm:text-sm ${colorTransitionClass}`}
              />

              <button
                type="button"
                onClick={handlePaste}
                className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--input-border)] bg-[var(--input-button-bg)] px-3 text-xs font-semibold text-[var(--input-button-text)] shadow-inner shadow-white/5 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-violet-400/35 hover:bg-violet-500/15 hover:text-violet-600 active:translate-y-0 sm:h-10 sm:px-3.5"
              >
                {isPasted ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="hidden xs:inline">Pasted</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline">Paste</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isPreparing}
            className="mx-auto mt-4 inline-flex w-full max-w-[460px] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(168,85,247,0.22)] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-75 lg:mx-0"
          >
            {isPreparing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowDownToLine className="h-4 w-4" />
            )}
            {isPreparing ? "Preparing..." : "Download Now"}
          </button>

          <div className="mt-6">
            <p
              className={`text-center text-xs font-medium text-[var(--text-soft)] lg:text-left ${colorTransitionClass}`}
            >
              Supported Platforms
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              {["instagram", "facebook", "twitter", "tiktok"].map((brand) => (
                <BrandLogo
                  key={brand}
                  name={brand}
                  className="h-10 w-10 shadow-[0_0_18px_rgba(168,85,247,0.16)] transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-110"
                />
              ))}
            </div>

            <p className="mt-3 text-center text-[11px] font-medium text-[var(--text-muted)] lg:text-left">
              Also supports Vimeo, TED, Internet Archive, and selected Reddit
              public video posts.
            </p>
          </div>

          <div
            className={`mx-auto mt-5 flex max-w-[520px] flex-wrap justify-center gap-x-4 gap-y-3 text-[11px] font-medium text-[var(--text-muted)] lg:mx-0 lg:justify-start ${colorTransitionClass}`}
          >
            {[
              "Public Links Only",
              "No Software to Install",
              "Works on All Devices",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-violet-400" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

export default HeroSection;