// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   CheckCircle2,
//   Download,
//   FileMusic,
//   FolderOpen,
//   Home,
//   Play,
//   Settings,
//   Trash2,
//   Video,
// } from "lucide-react";

// import {
//   getActiveDownloads,
//   getRecentDownloads,
//   removeActiveDownload,
//   subscribeDownloads,
// } from "../utils/downloadHistory";

// const transitionClass =
//   "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

// function formatTime(timestamp) {
//   if (!timestamp) return "";

//   try {
//     return new Date(timestamp).toLocaleString([], {
//       month: "short",
//       day: "numeric",
//       hour: "numeric",
//       minute: "2-digit",
//     });
//   } catch {
//     return "";
//   }
// }

// function getMediaKind(item) {
//   if (item?.type === "audio" || item?.aspectRatio === "audio") return "audio";
//   if (item?.aspectRatio === "portrait") return "portrait";
//   if (item?.aspectRatio === "square") return "square";
//   return "landscape";
// }

// function getThumbClass(item) {
//   const kind = getMediaKind(item);

//   if (kind === "portrait") {
//     return "h-[118px] w-[74px] sm:h-[126px] sm:w-[80px]";
//   }

//   if (kind === "square") {
//     return "h-[92px] w-[92px] sm:h-[104px] sm:w-[104px]";
//   }

//   if (kind === "audio") {
//     return "h-[86px] w-[112px] sm:h-[98px] sm:w-[136px]";
//   }

//   return "h-[86px] w-[128px] sm:h-[98px] sm:w-[160px]";
// }

// function MediaThumbnail({ item }) {
//   const kind = getMediaKind(item);

//   return (
//     <div
//       className={`relative shrink-0 overflow-hidden rounded-[22px] bg-slate-950 shadow-[0_16px_42px_rgba(2,6,23,0.24)] ${getThumbClass(
//         item
//       )}`}
//     >
//       {item?.thumb ? (
//         <img
//           src={item.thumb}
//           alt={item.title || "Download preview"}
//           className="h-full w-full object-cover"
//         />
//       ) : (
//         <div className="grid h-full w-full place-items-center bg-violet-500/10 text-violet-500">
//           {kind === "audio" ? (
//             <FileMusic className="h-7 w-7" />
//           ) : (
//             <Video className="h-7 w-7" />
//           )}
//         </div>
//       )}

//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

//       <div className="absolute bottom-2 left-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-md sm:h-9 sm:w-9">
//         {kind === "audio" ? (
//           <FileMusic className="h-4 w-4" />
//         ) : (
//           <Play className="ml-0.5 h-4 w-4 fill-current" />
//         )}
//       </div>
//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="mx-auto grid min-h-[calc(100svh-180px)] max-w-[560px] place-items-center text-center">
//       <div>
//         <div className="mx-auto grid h-20 w-20 place-items-center rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface)] text-violet-500 shadow-[0_20px_60px_var(--shadow-soft)]">
//           <Download className="h-9 w-9" />
//         </div>

//         <h2 className="mt-6 text-[28px] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[34px]">
//           No downloads yet
//         </h2>

//         <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-muted)] sm:text-[15px]">
//           Paste a video link from the home page. Active downloads and completed
//           files will appear here automatically.
//         </p>

//         <Link
//           to="/"
//           className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(168,85,247,0.25)] transition hover:-translate-y-0.5 hover:brightness-110"
//         >
//           <Home className="h-4 w-4" />
//           Go Home
//         </Link>
//       </div>
//     </div>
//   );
// }

// function DownloadCard({ item, variant, onOpen, onRemove }) {
//   const isActive = variant === "active";

//   return (
//     <article
//       role="button"
//       tabIndex={0}
//       onClick={() => onOpen(item)}
//       onKeyDown={(event) => {
//         if (event.key === "Enter") onOpen(item);
//       }}
//       className={`group cursor-pointer rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface)] p-3 shadow-[0_18px_60px_var(--shadow-soft)] outline-none backdrop-blur-xl hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-[var(--surface-hover)] sm:rounded-[30px] sm:p-4 ${transitionClass}`}
//     >
//       <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
//         <div className="flex min-w-0 gap-3 sm:gap-4">
//           <MediaThumbnail item={item} />

//           <div className="min-w-0 self-center">
//             <div className="flex flex-wrap items-center gap-2">
//               <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-[var(--text-heading)] sm:text-[17px]">
//                 {item.title || "Downloaded file"}
//               </h3>

//               {!isActive && (
//                 <span className="hidden rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-500 sm:inline-flex">
//                   Completed
//                 </span>
//               )}
//             </div>

//             <p className="mt-1.5 line-clamp-1 text-[13px] text-[var(--text-muted)] sm:text-sm">
//               {item.quality || item.type?.toUpperCase()} ·{" "}
//               {item.size || "Unknown"}
//               {!isActive && item.completedAt
//                 ? ` · ${formatTime(item.completedAt)}`
//                 : ""}
//             </p>

//             {!isActive && (
//               <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-emerald-500 sm:hidden">
//                 <CheckCircle2 className="h-4 w-4" />
//                 Completed
//               </div>
//             )}
//           </div>
//         </div>

//         {isActive && (
//           <div className="min-w-0">
//             <div className="flex items-center justify-between gap-3 text-sm">
//               <span className="font-semibold text-[var(--text-heading)]">
//                 {Math.round(item.progress || 0)}%
//               </span>

//               <span className="truncate text-[var(--text-muted)]">
//                 {item.speed || "Preparing..."}
//               </span>
//             </div>

//             <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--border-soft)]">
//               <div
//                 className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 transition-all duration-500 ease-out"
//                 style={{
//                   width: `${Math.min(
//                     Math.max(Number(item.progress || 0), 0),
//                     100
//                   )}%`,
//                 }}
//               />
//             </div>
//           </div>
//         )}

//         <div
//           className="flex items-center justify-end gap-2"
//           onClick={(event) => event.stopPropagation()}
//         >
//           {!isActive && (
//             <button
//               type="button"
//               onClick={() => onOpen(item)}
//               className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3.5 text-sm font-semibold text-[var(--text-body)] hover:bg-[var(--surface-hover)]"
//               aria-label="Open player"
//             >
//               <FolderOpen className="h-4 w-4" />
//               <span className="hidden sm:inline">Open</span>
//             </button>
//           )}

//           {isActive && (
//             <button
//               type="button"
//               onClick={() => onRemove(item.id)}
//               className="grid h-11 w-11 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/15"
//               aria-label="Remove download"
//             >
//               <Trash2 className="h-4 w-4" />
//             </button>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }

// function DownloadsPage() {
//   const navigate = useNavigate();

//   const [activeDownloads, setActiveDownloads] = useState([]);
//   const [recentDownloads, setRecentDownloads] = useState([]);

//   const hasActive = activeDownloads.length > 0;
//   const hasRecent = recentDownloads.length > 0;
//   const isEmpty = !hasActive && !hasRecent;

//   const totalActiveProgress = useMemo(() => {
//     if (!activeDownloads.length) return 0;

//     const total = activeDownloads.reduce(
//       (sum, item) => sum + Number(item.progress || 0),
//       0
//     );

//     return Math.round(total / activeDownloads.length);
//   }, [activeDownloads]);

//   const refreshDownloads = () => {
//     setActiveDownloads(getActiveDownloads());
//     setRecentDownloads(getRecentDownloads());
//   };

//   useEffect(() => {
//     refreshDownloads();

//     return subscribeDownloads(refreshDownloads);
//   }, []);

//   const handleOpenItem = (item) => {
//     sessionStorage.setItem("linkflow-player-item", JSON.stringify(item));
//     navigate(`/downloads/player/${encodeURIComponent(item.id)}`);
//   };

//   return (
//     <main className="theme-section relative min-h-screen overflow-hidden">
//       <div className="theme-layer theme-hero-dark" />
//       <div className="theme-layer theme-hero-light" />

//       <div className="theme-grid pointer-events-none absolute inset-0 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line-2)_1px,transparent_1px)] bg-[size:82px_82px] opacity-20" />

//       <section className="relative z-10 mx-auto flex min-h-screen max-w-[1540px] flex-col px-4 py-5 sm:px-6 lg:px-10 lg:py-6 xl:px-14">
//         <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
//           <div className="flex min-w-0 items-center gap-3">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--text-body)] hover:bg-[var(--surface-hover)] sm:h-11 sm:w-11"
//               aria-label="Go back"
//             >
//               <ArrowLeft className="h-4 w-4" />
//             </button>

//             <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-500/12 text-violet-500">
//               <Download className="h-5 w-5" />
//             </div>

//             <div className="min-w-0">
//               <h1 className="truncate text-[24px] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[30px]">
//                 Downloads
//               </h1>

//               <p className="mt-0.5 truncate text-xs text-[var(--text-muted)]">
//                 Active progress and recently saved files
//               </p>
//             </div>
//           </div>

//           <div className="flex shrink-0 items-center gap-2">
//             <Link
//               to="/"
//               className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--text-body)] hover:bg-[var(--surface-hover)]"
//               aria-label="Go home"
//             >
//               <Home className="h-4 w-4" />
//             </Link>

//             <button
//               type="button"
//               className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--text-body)] hover:bg-[var(--surface-hover)]"
//               aria-label="Settings"
//             >
//               <Settings className="h-4 w-4" />
//             </button>
//           </div>
//         </header>

//         <div className="flex flex-1 flex-col py-6 lg:py-8">
//           {isEmpty ? (
//             <EmptyState />
//           ) : (
//             <div className="mx-auto w-full max-w-[1280px] space-y-9">
//               {hasActive && (
//                 <section>
//                   <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
//                     <div>
//                       <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--text-heading)] sm:text-[24px]">
//                         Active Downloads
//                       </h2>

//                       <p className="mt-1 text-sm text-[var(--text-muted)]">
//                         Overall progress {totalActiveProgress}%
//                       </p>
//                     </div>
//                   </div>

//                   <div className="grid gap-4">
//                     {activeDownloads.map((item) => (
//                       <DownloadCard
//                         key={item.id}
//                         item={item}
//                         variant="active"
//                         onOpen={handleOpenItem}
//                         onRemove={removeActiveDownload}
//                       />
//                     ))}
//                   </div>
//                 </section>
//               )}

//               {hasRecent && (
//                 <section>
//                   <div className="mb-4">
//                     <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--text-heading)] sm:text-[24px]">
//                       Recent Downloads
//                     </h2>

//                     <p className="mt-1 text-sm text-[var(--text-muted)]">
//                       Click a file to open it in the player.
//                     </p>
//                   </div>

//                   <div className="grid gap-4">
//                     {recentDownloads.map((item) => (
//                       <DownloadCard
//                         key={item.id}
//                         item={item}
//                         variant="recent"
//                         onOpen={handleOpenItem}
//                         onRemove={removeActiveDownload}
//                       />
//                     ))}
//                   </div>
//                 </section>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }

// export default DownloadsPage;


import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileMusic,
  FolderOpen,
  Home,
  Play,
  Settings,
  Trash2,
  Video,
} from "lucide-react";

import {
  getActiveDownloads,
  getRecentDownloads,
  removeActiveDownload,
  subscribeDownloads,
} from "../utils/downloadHistory";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function formatTime(timestamp) {
  if (!timestamp) return "";

  try {
    return new Date(timestamp).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function getMediaKind(item) {
  if (item?.type === "audio" || item?.aspectRatio === "audio") return "audio";
  if (item?.aspectRatio === "portrait") return "portrait";
  if (item?.aspectRatio === "square") return "square";
  return "landscape";
}

function getThumbClass(item) {
  const kind = getMediaKind(item);

  if (kind === "portrait") {
    return "h-[118px] w-[74px] sm:h-[126px] sm:w-[80px]";
  }

  if (kind === "square") {
    return "h-[92px] w-[92px] sm:h-[104px] sm:w-[104px]";
  }

  if (kind === "audio") {
    return "h-[86px] w-[112px] sm:h-[98px] sm:w-[136px]";
  }

  return "h-[86px] w-[128px] sm:h-[98px] sm:w-[160px]";
}

function MediaThumbnail({ item }) {
  const kind = getMediaKind(item);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[22px] bg-slate-950 shadow-[0_16px_42px_rgba(2,6,23,0.24)] ${getThumbClass(
        item
      )}`}
    >
      {item?.thumb ? (
        <img
          src={item.thumb}
          alt={item.title || "Download preview"}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-violet-500/10 text-violet-500">
          {kind === "audio" ? (
            <FileMusic className="h-7 w-7" />
          ) : (
            <Video className="h-7 w-7" />
          )}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

      <div className="absolute bottom-2 left-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-md sm:h-9 sm:w-9">
        {kind === "audio" ? (
          <FileMusic className="h-4 w-4" />
        ) : (
          <Play className="ml-0.5 h-4 w-4 fill-current" />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto grid min-h-[calc(100svh-180px)] max-w-[560px] place-items-center text-center">
      <div>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface)] text-violet-500 shadow-[0_20px_60px_var(--shadow-soft)]">
          <Download className="h-9 w-9" />
        </div>

        <h2 className="mt-6 text-[28px] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[34px]">
          No downloads yet
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-muted)] sm:text-[15px]">
          Paste a video link from the home page. Active downloads and completed
          files will appear here automatically.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(168,85,247,0.25)] transition hover:-translate-y-0.5 hover:brightness-110"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}

function DownloadCard({ item, variant, onOpen, onRemove }) {
  const isActive = variant === "active";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={(event) => {
        if (event.key === "Enter") onOpen(item);
      }}
      className={`group cursor-pointer rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface)] p-3 shadow-[0_18px_60px_var(--shadow-soft)] outline-none backdrop-blur-xl hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-[var(--surface-hover)] sm:rounded-[30px] sm:p-4 ${transitionClass}`}
    >
      <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
        <div className="flex min-w-0 gap-3 sm:gap-4">
          <MediaThumbnail item={item} />

          <div className="min-w-0 self-center">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-[var(--text-heading)] sm:text-[17px]">
                {item.title || "Downloaded file"}
              </h3>

              {!isActive && (
                <span className="hidden rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-500 sm:inline-flex">
                  Completed
                </span>
              )}
            </div>

            <p className="mt-1.5 line-clamp-1 text-[13px] text-[var(--text-muted)] sm:text-sm">
              {item.quality || item.type?.toUpperCase()} ·{" "}
              {item.size || "Unknown"}
              {!isActive && item.completedAt
                ? ` · ${formatTime(item.completedAt)}`
                : ""}
            </p>

            {!isActive && (
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-emerald-500 sm:hidden">
                <CheckCircle2 className="h-4 w-4" />
                Completed
              </div>
            )}
          </div>
        </div>

        {isActive && (
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-[var(--text-heading)]">
                {Math.round(item.progress || 0)}%
              </span>

              <span className="truncate text-[var(--text-muted)]">
                {item.speed || "Preparing..."}
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--border-soft)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(
                    Math.max(Number(item.progress || 0), 0),
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        <div
          className="flex items-center justify-end gap-2"
          onClick={(event) => event.stopPropagation()}
        >
          {!isActive && (
            <button
              type="button"
              onClick={() => onOpen(item)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3.5 text-sm font-semibold text-[var(--text-body)] hover:bg-[var(--surface-hover)]"
              aria-label="Open player"
            >
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Open</span>
            </button>
          )}

          {isActive && (
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/15"
              aria-label="Remove download"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function DownloadsPage() {
  const navigate = useNavigate();

  const [activeDownloads, setActiveDownloads] = useState([]);
  const [recentDownloads, setRecentDownloads] = useState([]);

  const hasActive = activeDownloads.length > 0;
  const hasRecent = recentDownloads.length > 0;
  const isEmpty = !hasActive && !hasRecent;

  const totalActiveProgress = useMemo(() => {
    if (!activeDownloads.length) return 0;

    const total = activeDownloads.reduce(
      (sum, item) => sum + Number(item.progress || 0),
      0
    );

    return Math.round(total / activeDownloads.length);
  }, [activeDownloads]);

  const refreshDownloads = () => {
    setActiveDownloads(getActiveDownloads());
    setRecentDownloads(getRecentDownloads());
  };

  useEffect(() => {
    refreshDownloads();

    return subscribeDownloads(refreshDownloads);
  }, []);

  const handleOpenItem = (item) => {
    sessionStorage.setItem("linkflow-player-item", JSON.stringify(item));
    navigate(`/downloads/player/${encodeURIComponent(item.id)}`);
  };

  return (
    <main className="theme-section relative min-h-screen overflow-hidden">
      <div className="theme-layer theme-hero-dark" />
      <div className="theme-layer theme-hero-light" />

      <div className="theme-grid pointer-events-none absolute inset-0 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line-2)_1px,transparent_1px)] bg-[size:82px_82px] opacity-20" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-[1540px] flex-col px-4 py-5 sm:px-6 lg:px-10 lg:py-6 xl:px-14">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--text-body)] hover:bg-[var(--surface-hover)] sm:h-11 sm:w-11"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-500/12 text-violet-500">
              <Download className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-[24px] font-bold tracking-[-0.03em] text-[var(--text-heading)] sm:text-[30px]">
                Downloads
              </h1>

              <p className="mt-0.5 truncate text-xs text-[var(--text-muted)]">
                Active progress and recently saved files
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--text-body)] hover:bg-[var(--surface-hover)]"
              aria-label="Go home"
            >
              <Home className="h-4 w-4" />
            </Link>

            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--text-body)] hover:bg-[var(--surface-hover)]"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="flex flex-1 flex-col py-6 lg:py-8">
          {isEmpty ? (
            <EmptyState />
          ) : (
            <div className="mx-auto w-full max-w-[1280px] space-y-9">
              {hasActive && (
                <section>
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--text-heading)] sm:text-[24px]">
                        Active Downloads
                      </h2>

                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Overall progress {totalActiveProgress}%
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {activeDownloads.map((item) => (
                      <DownloadCard
                        key={item.id}
                        item={item}
                        variant="active"
                        onOpen={handleOpenItem}
                        onRemove={removeActiveDownload}
                      />
                    ))}
                  </div>
                </section>
              )}

              {hasRecent && (
                <section>
                  <div className="mb-4">
                    <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--text-heading)] sm:text-[24px]">
                      Recent Downloads
                    </h2>

                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      Click a file to open it in the player.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {recentDownloads.map((item) => (
                      <DownloadCard
                        key={item.id}
                        item={item}
                        variant="recent"
                        onOpen={handleOpenItem}
                        onRemove={removeActiveDownload}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default DownloadsPage;