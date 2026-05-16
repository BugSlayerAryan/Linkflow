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
import { getDownloadBlob } from "../utils/downloadBlobStore";

function getDimensionsFromQualityText(quality = "") {
  const match = String(quality || "").match(/(\d{3,4})\s*[x×]\s*(\d{3,4})/i);

  if (!match) {
    return { width: 0, height: 0 };
  }

  const width = Number(match[1]);
  const height = Number(match[2]);

  return {
    width: Number.isFinite(width) ? width : 0,
    height: Number.isFinite(height) ? height : 0,
  };
}

function getMediaKind(item) {
  if (item?.type === "audio" || item?.aspectRatio === "audio") return "audio";

  const width = Number(item?.width || 0);
  const height = Number(item?.height || 0);

  if (width > 0 && height > 0) {
    if (height > width) return "portrait";
    if (width === height) return "square";
    return "landscape";
  }

  const qualityDimensions = getDimensionsFromQualityText(item?.quality || "");

  if (qualityDimensions.width > 0 && qualityDimensions.height > 0) {
    if (qualityDimensions.height > qualityDimensions.width) return "portrait";
    if (qualityDimensions.width === qualityDimensions.height) return "square";
    return "landscape";
  }

  if (item?.aspectRatio === "portrait") return "portrait";
  if (item?.aspectRatio === "square") return "square";

  return "landscape";
}

function getPlayerClass(item, naturalKind = "") {
  const kind = naturalKind || getMediaKind(item);

  if (kind === "portrait") {
    return "h-[min(74svh,760px)] aspect-[9/16]";
  }

  if (kind === "square") {
    return "h-[min(68svh,640px)] aspect-square";
  }

  if (kind === "audio") {
    return "w-full max-w-[900px] min-h-[360px] sm:min-h-[440px]";
  }

  return "w-full max-w-[1080px] aspect-video";
}

function getNaturalKindFromVideo(video) {
  if (!video?.videoWidth || !video?.videoHeight) return "";

  if (video.videoHeight > video.videoWidth) return "portrait";
  if (video.videoHeight === video.videoWidth) return "square";

  return "landscape";
}

function getPlayableSources(item, localBlobUrl = "") {
  if (!item) {
    return {
      videoUrl: "",
      audioUrl: "",
      audioOnlyUrl: "",
      poster: "",
      sourceNote: "",
    };
  }

  const cachedData = item.cachedData || {};
  const originalUrl = item.originalUrl || item.sourceUrl || cachedData.webpage_url || "";

  if (item.type === "audio" || item.aspectRatio === "audio") {
    return {
      videoUrl: "",
      audioUrl: "",
      audioOnlyUrl:
        localBlobUrl ||
        item.audioPreviewUrl ||
        item.previewUrl ||
        cachedData.rawPreviewAudioUrl ||
        cachedData.audio?.[0]?.url ||
        "",
      poster: item.thumb || cachedData.thumb || "",
      sourceNote: localBlobUrl ? "Local browser cache" : "Saved audio preview",
    };
  }

  /**
   * Best source is the locally cached downloaded blob.
   * This keeps Recent Downloads playable even after CDN preview URLs expire.
   */
  const videoUrl =
    localBlobUrl ||
    item.previewUrl ||
    cachedData.rawPreviewUrl ||
    cachedData.video?.[0]?.url ||
    (originalUrl ? getPreviewVideoUrl(originalUrl) : "");

  const audioUrl = localBlobUrl
    ? ""
    : item.audioPreviewUrl ||
      cachedData.rawPreviewAudioUrl ||
      cachedData.video?.find((entry) => entry?.url === videoUrl)?.audioUrl ||
      cachedData.video?.[0]?.audioUrl ||
      "";

  return {
    videoUrl,
    audioUrl,
    audioOnlyUrl: "",
    poster: item.thumb || cachedData.thumb || "",
    sourceNote: localBlobUrl ? "Local browser cache" : "Saved preview",
  };
}

function DownloadPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const standaloneAudioRef = useRef(null);

  const [item, setItem] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [naturalKind, setNaturalKind] = useState("");
  const [videoFailed, setVideoFailed] = useState(false);
  const [localBlobUrl, setLocalBlobUrl] = useState("");
  const [localCacheStatus, setLocalCacheStatus] = useState("idle");

  const mediaKind = useMemo(() => getMediaKind(item), [item]);
  const playableSources = useMemo(
    () => getPlayableSources(item, localBlobUrl),
    [item, localBlobUrl]
  );
  const playerKind = naturalKind || mediaKind;

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
    let revokeUrl = "";
    let cancelled = false;

    const loadLocalBlob = async () => {
      setLocalBlobUrl("");
      setLocalCacheStatus("idle");

      if (!item?.localBlobId) return;

      try {
        setLocalCacheStatus("loading");

        const record = await getDownloadBlob(item.localBlobId);

        if (cancelled) return;

        if (record?.blob) {
          const objectUrl = URL.createObjectURL(record.blob);
          revokeUrl = objectUrl;
          setLocalBlobUrl(objectUrl);
          setLocalCacheStatus("ready");
        } else {
          setLocalCacheStatus("missing");
        }
      } catch (error) {
        console.warn("Local download cache load failed:", error.message);

        if (!cancelled) {
          setLocalCacheStatus("missing");
        }
      }
    };

    loadLocalBlob();

    return () => {
      cancelled = true;

      if (revokeUrl) {
        URL.revokeObjectURL(revokeUrl);
      }
    };
  }, [item?.localBlobId]);

  useEffect(() => {
    setNaturalKind("");
    setVideoFailed(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }

    if (standaloneAudioRef.current) {
      standaloneAudioRef.current.pause();
      standaloneAudioRef.current.load();
    }
  }, [playableSources.videoUrl, playableSources.audioUrl, playableSources.audioOnlyUrl]);

  useEffect(() => {
    if (!item || videoFailed) return;

    const timer = setTimeout(async () => {
      try {
        if (playerKind === "audio" && standaloneAudioRef.current) {
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
  }, [item, playerKind, videoFailed]);

  const syncAudioTime = () => {
    if (!videoRef.current || !audioRef.current || !playableSources.audioUrl) return;

    if (
      Math.abs(audioRef.current.currentTime - videoRef.current.currentTime) >
      0.25
    ) {
      audioRef.current.currentTime = videoRef.current.currentTime;
    }

    audioRef.current.volume = videoRef.current.volume;
    audioRef.current.muted = videoRef.current.muted;
  };

  const handleVideoLoadedMetadata = () => {
    const detected = getNaturalKindFromVideo(videoRef.current);

    if (detected) {
      setNaturalKind(detected);
    }
  };

  const handleVideoPlay = async () => {
    if (!videoRef.current || !audioRef.current || !playableSources.audioUrl) {
      return;
    }

    try {
      audioRef.current.currentTime = videoRef.current.currentTime;
      audioRef.current.volume = videoRef.current.volume;
      audioRef.current.muted = videoRef.current.muted;
      await audioRef.current.play();
    } catch {
      // ignore sync failure
    }
  };

  const handleVideoPause = () => {
    if (audioRef.current) audioRef.current.pause();
  };

  const handleVideoEnded = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleDownloadAgain = () => {
    if (item?.originalUrl || item?.sourceUrl) {
      navigate(
        `/download?url=${encodeURIComponent(
          item.originalUrl || item.sourceUrl
        )}`
      );
    }
  };

  const handleRetryFromOriginal = () => {
    if (item?.originalUrl || item?.sourceUrl) {
      navigate(
        `/download?url=${encodeURIComponent(
          item.originalUrl || item.sourceUrl
        )}&autoplay=1`
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
              {playerKind === "audio" ? (
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
                      item,
                      playerKind
                    )}`}
                  >
                    {playerKind === "audio" ? (
                      <div className="flex h-full min-h-[360px] flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-slate-950 to-fuchsia-950 px-5 sm:min-h-[440px]">
                        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/10 text-violet-200">
                          <FileMusic className="h-10 w-10" />
                        </div>

                        <p className="mt-4 text-sm font-semibold text-white">
                          Audio Preview
                        </p>

                        {playableSources.audioOnlyUrl ? (
                          <audio
                            ref={standaloneAudioRef}
                            key={playableSources.audioOnlyUrl}
                            src={playableSources.audioOnlyUrl}
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
                    ) : playableSources.videoUrl && !videoFailed ? (
                      <>
                        <video
                          ref={videoRef}
                          key={`${playableSources.videoUrl}-${playableSources.audioUrl || ""}`}
                          src={playableSources.videoUrl}
                          poster={playableSources.poster || undefined}
                          controls
                          playsInline
                          preload="metadata"
                          onLoadedMetadata={handleVideoLoadedMetadata}
                          onPlay={handleVideoPlay}
                          onPause={handleVideoPause}
                          onEnded={handleVideoEnded}
                          onSeeked={syncAudioTime}
                          onTimeUpdate={syncAudioTime}
                          onVolumeChange={syncAudioTime}
                          onError={() => setVideoFailed(true)}
                          className="absolute inset-0 h-full w-full object-contain"
                        />

                        {playableSources.audioUrl && (
                          <audio
                            ref={audioRef}
                            key={playableSources.audioUrl}
                            src={playableSources.audioUrl}
                            preload="metadata"
                            className="hidden"
                          />
                        )}
                      </>
                    ) : item.thumb || playableSources.poster ? (
                      <>
                        <img
                          src={item.thumb || playableSources.poster}
                          alt={item.title || "Download preview"}
                          className="absolute inset-0 h-full w-full object-contain"
                        />

                        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/70 p-4 text-center backdrop-blur-xl">
                          <p className="text-sm font-semibold text-white">
                            Preview link expired or cannot be played.
                          </p>

                          <button
                            type="button"
                            onClick={handleRetryFromOriginal}
                            className="mt-3 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-950"
                          >
                            Reload preview
                          </button>
                        </div>
                      </>
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
                      {localCacheStatus === "ready"
                        ? "Playing from local browser cache. This keeps recent downloads playable even if the original CDN link expires."
                        : "Recent downloads store preview metadata. Smaller completed files can also be saved in local browser cache for playback."}
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
