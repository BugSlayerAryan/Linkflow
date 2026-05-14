import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileMusic,
  Home,
  Loader2,
  Play,
  ShieldCheck,
  Video,
  X,
} from "lucide-react";

import {
  getActiveDownloads,
  getRecentDownloads,
} from "../utils/downloadHistory";
import { getPreviewVideoUrl } from "../api/api";

function getMediaKind(item) {
  if (item?.type === "audio" || item?.aspectRatio === "audio") return "audio";
  if (item?.aspectRatio === "portrait") return "portrait";
  if (item?.aspectRatio === "square") return "square";
  return "landscape";
}

function getPlayerClass(item) {
  const kind = getMediaKind(item);

  if (kind === "portrait") {
    return "h-[min(72svh,720px)] aspect-[9/16]";
  }

  if (kind === "square") {
    return "h-[min(68svh,640px)] aspect-square";
  }

  if (kind === "audio") {
    return "w-full max-w-[900px] min-h-[360px] sm:min-h-[440px]";
  }

  return "w-full max-w-[1080px] aspect-video";
}

function getPlayablePreviewUrl(item) {
  if (!item) return "";

  if (item.type === "audio" || item.aspectRatio === "audio") {
    return item.audioPreviewUrl || item.previewUrl || "";
  }

  if (item.previewUrl) {
    return item.previewUrl;
  }

  const originalUrl = item.originalUrl || item.sourceUrl || "";

  if (originalUrl) {
    return getPreviewVideoUrl(originalUrl);
  }

  return "";
}

function DownloadPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const standaloneAudioRef = useRef(null);

  const [item, setItem] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const mediaKind = useMemo(() => getMediaKind(item), [item]);
  const playablePreviewUrl = useMemo(() => getPlayablePreviewUrl(item), [item]);

  useEffect(() => {
    let savedItem = null;

    try {
      const sessionItem = sessionStorage.getItem("linkflow-player-item");

      if (sessionItem) {
        const parsed = JSON.parse(sessionItem);

        if (String(parsed?.id) === String(id)) {
          savedItem = parsed;
        }
      }
    } catch {
      savedItem = null;
    }

    if (!savedItem) {
      const allItems = [...getRecentDownloads(), ...getActiveDownloads()];
      savedItem = allItems.find((entry) => String(entry.id) === String(id));
    }

    setItem(savedItem || null);
    setIsReady(true);
  }, [id]);

  useEffect(() => {
    if (!item) return;

    const timer = setTimeout(async () => {
      try {
        if (mediaKind === "audio" && standaloneAudioRef.current) {
          await standaloneAudioRef.current.play();
          return;
        }

        if (videoRef.current) {
          await videoRef.current.play();
        }
      } catch {
        // Browser can block autoplay with sound. User can click play.
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [item, mediaKind]);

  const handleDownloadAgain = () => {
    if (item?.originalUrl || item?.sourceUrl) {
      navigate(
        `/download?url=${encodeURIComponent(
          item.originalUrl || item.sourceUrl
        )}`
      );
    }
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
              {mediaKind === "audio" ? (
                <FileMusic className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 fill-current" />
              )}
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-[22px] font-bold tracking-[-0.02em] text-[var(--text-heading)] sm:text-[28px]">
                {item?.title || "Download Player"}
              </h1>

              <p className="mt-0.5 truncate text-xs text-[var(--text-muted)] sm:text-sm">
                {item?.quality || "Preview"} · {item?.size || "Unknown"}
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

            <Link
              to="/downloads"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--text-body)] hover:bg-[var(--surface-hover)]"
              aria-label="Close player"
            >
              <X className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="grid flex-1 place-items-center py-6 lg:py-8">
          {!isReady ? (
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-500" />
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                Loading player...
              </p>
            </div>
          ) : !item ? (
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface)] text-violet-500 shadow-[0_20px_60px_var(--shadow-soft)]">
                <Video className="h-9 w-9" />
              </div>

              <h2 className="mt-6 text-[28px] font-bold tracking-[-0.03em] text-[var(--text-heading)]">
                Preview not found
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                This item is not available anymore. Please download it again.
              </p>

              <Link
                to="/downloads"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white"
              >
                Back to Downloads
              </Link>
            </div>
          ) : (
            <div className="w-full">
              <div className="mx-auto grid w-full max-w-[1180px] gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
                <div className="grid place-items-center">
                  <div
                    className={`relative overflow-hidden rounded-[30px] bg-black shadow-[0_30px_95px_rgba(2,6,23,0.42)] ${getPlayerClass(
                      item
                    )}`}
                  >
                    {mediaKind === "audio" ? (
                      <div className="flex h-full min-h-[360px] flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-slate-950 to-fuchsia-950 px-5 sm:min-h-[440px]">
                        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/10 text-violet-200">
                          <FileMusic className="h-10 w-10" />
                        </div>

                        <p className="mt-4 text-sm font-semibold text-white">
                          Audio Preview
                        </p>

                        {playablePreviewUrl ? (
                          <audio
                            ref={standaloneAudioRef}
                            key={playablePreviewUrl}
                            src={playablePreviewUrl}
                            controls
                            preload="metadata"
                            className="mt-6 w-full max-w-[520px]"
                          />
                        ) : (
                          <p className="mt-5 text-sm text-slate-300">
                            Audio preview is not available.
                          </p>
                        )}
                      </div>
                    ) : playablePreviewUrl ? (
                      <video
                        ref={videoRef}
                        key={playablePreviewUrl}
                        src={playablePreviewUrl}
                        poster={item.thumb || undefined}
                        controls
                        playsInline
                        preload="metadata"
                        muted={false}
                        onLoadedMetadata={(event) => {
                          event.currentTarget.muted = false;
                          event.currentTarget.volume = 1;
                        }}
                        onPlay={(event) => {
                          event.currentTarget.muted = false;
                          event.currentTarget.volume = 1;
                        }}
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    ) : item.thumb ? (
                      <img
                        src={item.thumb}
                        alt={item.title || "Download preview"}
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-slate-950 text-violet-400">
                        <Video className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                </div>

                <aside className="rounded-[30px] border border-[var(--border-soft)] bg-[var(--surface)] p-5 shadow-[0_18px_60px_var(--shadow-soft)] backdrop-blur-xl">
                  <h2 className="line-clamp-3 text-[24px] font-bold leading-tight tracking-[-0.03em] text-[var(--text-heading)]">
                    {item.title || "Downloaded file"}
                  </h2>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3">
                      <p className="text-xs text-[var(--text-muted)]">
                        Format
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-heading)]">
                        {item.type === "audio" ? "Audio" : "Video"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3">
                      <p className="text-xs text-[var(--text-muted)]">
                        Quality
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-heading)]">
                        {item.quality || "Default"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3">
                      <p className="text-xs text-[var(--text-muted)]">Size</p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-heading)]">
                        {item.size || "Unknown"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3">
                      <p className="text-xs text-[var(--text-muted)]">
                        Duration
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-heading)]">
                        {item.durationText || "--"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

                    <p className="text-sm leading-6 text-[var(--text-muted)]">
                      This preview uses your backend preview route, so social
                      media videos such as X.com are streamed through the server
                      instead of raw temporary CDN links.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadAgain}
                    disabled={!item.originalUrl && !item.sourceUrl}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(168,85,247,0.24)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Download className="h-4 w-4" />
                    Download Again
                  </button>
                </aside>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default DownloadPlayerPage;