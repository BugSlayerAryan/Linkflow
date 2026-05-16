

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  BadgeCheck,
  CheckCircle2,
  Download,
  FileMusic,
  Home,
  Loader2,
  Play,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  addActiveDownload,
  addRecentDownload,
  removeActiveDownload,
  updateActiveDownload,
} from "../utils/downloadHistory";

import {
  downloadDirectMedia,
  downloadFallbackMedia,
  downloadSingleMedia,
  getFallbackOpenMedia,
  fetchMediaInfo,
  getApiBaseUrl,
  getProxyImageUrl,
} from "../api/api";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function getDomainLabel(urlValue) {
  try {
    const url = new URL(urlValue);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return "Supported platform";
  }
}

function getDownloadFileName(title, format) {
  const safeTitle = String(title || "linkflow-download")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

  const extension = format === "audio" ? "mp3" : "mp4";

  return `${safeTitle || "linkflow-download"}.${extension}`;
}

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

function getResolutionValue(media = {}, fallbackQuality = "") {
  const quality = String(fallbackQuality || media?.quality || "");
  const qualityDims = getDimensionsFromQualityText(quality);

  const width = Number(media?.width || qualityDims.width || 0);
  const height = Number(media?.height || qualityDims.height || 0);

  if (width > 0 && height > 0) {
    /**
     * Use the shorter side as the quality number.
     * 1920x1080 and 1080x1920 both become 1080p.
     */
    return Math.min(width, height);
  }

  const numericMatch = quality.match(/(4320|2160|1440|1080|720|480|360|240)/);

  if (numericMatch) {
    return Number(numericMatch[1]);
  }

  const normalized = quality.toLowerCase();

  if (normalized.includes("4k") || normalized.includes("uhd")) return 2160;
  if (normalized.includes("2k") || normalized.includes("qhd")) return 1440;
  if (normalized.includes("full hd") || normalized.includes("fhd")) return 1080;
  if (normalized.includes("hd")) return 720;
  if (normalized.includes("sd")) return 480;

  return 0;
}

function getResolutionLabel(value = 0) {
  const resolution = Number(value || 0);

  if (resolution >= 4320) return "4320p (8K)";
  if (resolution >= 2160) return "2160p (4K)";
  if (resolution >= 1440) return "1440p (2K)";
  if (resolution >= 1080) return "1080p (Full HD)";
  if (resolution >= 720) return "720p (HD)";
  if (resolution >= 480) return "480p (SD)";
  if (resolution >= 360) return "360p";
  if (resolution >= 240) return "240p";

  return "";
}

function getPrimaryQuality(quality = "", media = {}) {
  const resolution = getResolutionValue(media, quality);

  if (resolution >= 4320) return "8K";
  if (resolution >= 2160) return "4K";
  if (resolution >= 1440) return "2K";
  if (resolution >= 1080) return "1080p";
  if (resolution >= 720) return "HD";
  if (resolution >= 480) return "SD";
  if (resolution >= 360) return "360p";
  if (resolution >= 240) return "240p";

  const normalized = String(quality || "").toLowerCase();

  if (normalized.includes("audio")) return "Audio";
  if (normalized.includes("hd")) return "HD";
  if (normalized.includes("sd")) return "SD";

  return quality || "Default";
}


async function saveResponseToFile(response, fileName) {
  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.URL.revokeObjectURL(blobUrl);
}

function getSplitDownloadFileName(title, type, ext = "") {
  const safeTitle = String(title || "linkflow-download")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

  const extension =
    ext || (type === "audio" ? "mp3" : "mp4");

  return `${safeTitle || "linkflow-download"}-${
    type === "audio" ? "audio" : "video-only"
  }.${extension}`;
}

function getPrettyQuality(quality = "", ext = "", media = {}) {
  const resolution = getResolutionValue(media, quality);
  const resolutionLabel = getResolutionLabel(resolution);
  const normalized = String(quality || "").toLowerCase();

  let label = resolutionLabel || quality || "Default";

  if (!resolutionLabel) {
    if (normalized.includes("audio")) label = "Audio";
    else if (normalized.includes("hd")) label = "720p (HD)";
    else if (normalized.includes("sd")) label = "480p (SD)";
  }

  const badges = [];

  if (normalized.includes("no_watermark") || normalized.includes("no watermark")) {
    badges.push("No watermark");
  } else if (normalized.includes("watermark")) {
    badges.push("Watermark");
  }

  const extension = ext ? String(ext).toUpperCase() : "";

  return [label, extension, ...badges].filter(Boolean).join(" · ");
}


function getFixedPreviewUrl(originalUrl) {
  if (!originalUrl) return "";

  return `${getApiBaseUrl()}/api/v1/preview?url=${encodeURIComponent(
    originalUrl
  )}`;
}

function getMediaAspectRatio(media, fallback = "landscape") {
  const width = Number(media?.width || 0);
  const height = Number(media?.height || 0);

  if (width > 0 && height > 0) {
    if (height > width) return "portrait";
    if (width === height) return "square";
    return "landscape";
  }

  const quality = String(media?.quality || "");
  const match = quality.match(/(\d{3,4})\s*[x×]\s*(\d{3,4})/i);

  if (match) {
    const parsedWidth = Number(match[1]);
    const parsedHeight = Number(match[2]);

    if (parsedWidth > 0 && parsedHeight > 0) {
      if (parsedHeight > parsedWidth) return "portrait";
      if (parsedWidth === parsedHeight) return "square";
      return "landscape";
    }
  }

  return media?.aspectRatio || fallback || "landscape";
}

function getNaturalAspectRatioFromVideo(videoElement) {
  const width = Number(videoElement?.videoWidth || 0);
  const height = Number(videoElement?.videoHeight || 0);

  if (width > 0 && height > 0) {
    if (height > width) return "portrait";
    if (width === height) return "square";
    return "landscape";
  }

  return "";
}

function hasConfirmedAudio(media) {
  const acodec = String(media?.acodec || "").toLowerCase();

  return Boolean(acodec && acodec !== "none" && acodec !== "unknown");
}

function DownloadPreviewPage() {
  const [searchParams] = useSearchParams();

  const url = searchParams.get("url") || "";
  const shouldAutoplay = searchParams.get("autoplay") === "1";
  const platform = useMemo(() => getDomainLabel(url), [url]);

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const standaloneAudioRef = useRef(null);
  const hasFetchedRef = useRef(false);
  const hasShownErrorRef = useRef(false);
  const hasAutoplayedRef = useRef(false);
  const downloadAbortRef = useRef(null);
  const processingTimerRef = useRef(null);

  const [format, setFormat] = useState("video");
  const [videoInfo, setVideoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [naturalAspectRatio, setNaturalAspectRatio] = useState("");
  const [activeDownload, setActiveDownload] = useState(null);

  const videoOptions = videoInfo?.video || [];
  const audioOptions = videoInfo?.audio || [];
  const availableOptions = format === "video" ? videoOptions : audioOptions;

  /**
   * Use selectedMedia first. This keeps preview shape matched with selected format.
   * If rawPreviewUrl is from another format, portrait shorts can look like landscape.
   */
  const selectedPreview =
    format === "video"
      ? selectedMedia?.url || videoInfo?.rawPreviewUrl || videoInfo?.previewUrl || ""
      : "";

  const syncedAudioUrl =
    format === "video"
      ? selectedMedia?.audioUrl || videoInfo?.rawPreviewAudioUrl || ""
      : "";

  const audioPreviewUrl = format === "audio" ? selectedMedia?.url || "" : "";

  const activeAspectRatio =
    naturalAspectRatio ||
    getMediaAspectRatio(selectedMedia, videoInfo?.aspectRatio || "landscape");

  const isPortrait = activeAspectRatio === "portrait";
  const isSquare = activeAspectRatio === "square";

  const stopProcessingTimer = () => {
    clearInterval(processingTimerRef.current);
    processingTimerRef.current = null;
  };

  const resetPreviewMedia = () => {
    setNaturalAspectRatio("");

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }

    if (standaloneAudioRef.current) {
      standaloneAudioRef.current.pause();
      standaloneAudioRef.current.currentTime = 0;
      standaloneAudioRef.current.load();
    }
  };

  const startProcessingTimer = (downloadId) => {
    stopProcessingTimer();

    processingTimerRef.current = setInterval(() => {
      setActiveDownload((current) => {
        if (!current || current.id !== downloadId) return current;

        const nextProgress = Math.min(Number(current.progress || 0) + 2, 88);

        updateActiveDownload(downloadId, {
          progress: nextProgress,
          speed: "Server processing",
          status: "Preparing full video...",
        });

        return {
          ...current,
          progress: nextProgress,
          speed: "Server processing",
          status: "Preparing full video...",
        };
      });
    }, 850);
  };

  useEffect(() => {
    const controller = new AbortController();

    const getBestDefaultVideo = (items = []) => {
      return (
        items.find((item) => item.ext === "mp4" && item.hasAudio) ||
        items.find((item) => item.ext === "mp4") ||
        items[0] ||
        null
      );
    };

    const applyVideoData = (data) => {
      setVideoInfo(data);

      if (Array.isArray(data.video) && data.video.length > 0) {
        setFormat("video");
        setSelectedMedia(getBestDefaultVideo(data.video));
      } else if (Array.isArray(data.audio) && data.audio.length > 0) {
        setFormat("audio");
        setSelectedMedia(data.audio[0]);
      } else {
        setSelectedMedia(null);
      }
    };

    const fetchVideoInfo = async () => {
      try {
        if (!url) {
          toast.error("Video URL is missing.");
          setIsLoading(false);
          return;
        }

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          toast.error(
            "Preview data is no longer available. Please download again."
          );
          setIsLoading(false);
          return;
        }

        /**
         * v2 cache key prevents old cached responses with empty formats.
         */
        const cacheKey = `linkflow-media-v5:${url}`;
        const cachedRaw = sessionStorage.getItem(cacheKey);

        if (cachedRaw) {
          try {
            const cached = JSON.parse(cachedRaw);
            const isFresh = Date.now() - cached.createdAt < 10 * 60 * 1000;

            if (
              cached.url === url &&
              cached.data?.status === "success" &&
              isFresh
            ) {
              const originalUrl = cached.data.webpage_url || url;

              const fixedCachedData = {
                ...cached.data,
                previewUrl: getFixedPreviewUrl(originalUrl),
              };

              applyVideoData(fixedCachedData);
              setIsLoading(false);
              return;
            }
          } catch {
            sessionStorage.removeItem(cacheKey);
          }
        }

        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        setIsLoading(true);

        const data = await fetchMediaInfo(url, controller.signal);

        if (data.status !== "success") {
          if (!hasShownErrorRef.current) {
            hasShownErrorRef.current = true;
            toast.error(data.error || "Unable to fetch video details.");
          }

          return;
        }

        const fixedData = {
          ...data,
          previewUrl: getFixedPreviewUrl(data.webpage_url || url),
        };

        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({
            url,
            data: fixedData,
            createdAt: Date.now(),
          })
        );

        hasShownErrorRef.current = false;
        applyVideoData(fixedData);
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Video info error:", error);

        if (!hasShownErrorRef.current) {
          hasShownErrorRef.current = true;
          toast.error(error.message || "Backend connection failed.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoInfo();

    return () => {
      controller.abort();
    };
  }, [url]);

  useEffect(() => {
    resetPreviewMedia();
    hasAutoplayedRef.current = false;
  }, [
    videoInfo?.rawPreviewUrl,
    videoInfo?.rawPreviewAudioUrl,
    videoInfo?.previewUrl,
    selectedMedia?.url,
    selectedMedia?.audioUrl,
    format,
  ]);

  useEffect(() => {
    if (
      !shouldAutoplay ||
      isLoading ||
      !selectedMedia ||
      hasAutoplayedRef.current
    ) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        if (format === "audio" && standaloneAudioRef.current) {
          hasAutoplayedRef.current = true;
          await standaloneAudioRef.current.play();
          return;
        }

        if (format === "video" && videoRef.current) {
          hasAutoplayedRef.current = true;
          await videoRef.current.play();
        }
      } catch {
        // Browser can block autoplay with sound.
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [shouldAutoplay, isLoading, selectedMedia, format]);

  useEffect(() => {
    return () => {
      stopProcessingTimer();

      if (downloadAbortRef.current) {
        downloadAbortRef.current.abort();
      }
    };
  }, []);

  const syncAudioTime = () => {
    if (!videoRef.current || !audioRef.current || !syncedAudioUrl) return;

    const videoTime = videoRef.current.currentTime;
    const audioTime = audioRef.current.currentTime;

    if (Math.abs(audioTime - videoTime) > 0.25) {
      audioRef.current.currentTime = videoTime;
    }

    audioRef.current.volume = videoRef.current.volume;
    audioRef.current.muted = videoRef.current.muted;
  };

  const handleVideoLoadedMetadata = () => {
    const detectedAspectRatio = getNaturalAspectRatioFromVideo(videoRef.current);

    if (detectedAspectRatio) {
      setNaturalAspectRatio(detectedAspectRatio);
    }
  };

  const handleVideoPlay = async () => {
    if (!audioRef.current || !videoRef.current || !syncedAudioUrl) return;

    try {
      audioRef.current.currentTime = videoRef.current.currentTime;
      audioRef.current.volume = videoRef.current.volume;
      audioRef.current.muted = videoRef.current.muted;

      await audioRef.current.play();
    } catch (error) {
      console.log("Audio preview sync failed:", error.message);
    }
  };

  const handleVideoPause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  };

  const handleVideoEnded = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleVolumeChange = () => {
    if (!videoRef.current || !audioRef.current) return;

    audioRef.current.volume = videoRef.current.volume;
    audioRef.current.muted = videoRef.current.muted;
  };

  const handleSelectMedia = (option) => {
    resetPreviewMedia();
    setSelectedMedia(option);
  };

  const handleFormatChange = (nextFormat) => {
    resetPreviewMedia();
    setFormat(nextFormat);

    const nextOptions = nextFormat === "video" ? videoOptions : audioOptions;

    if (nextOptions.length > 0) {
      const preferred =
        nextFormat === "video"
          ? nextOptions.find((item) => item.ext === "mp4" && item.hasAudio) ||
            nextOptions.find((item) => item.ext === "mp4") ||
            nextOptions[0]
          : nextOptions[0];

      setSelectedMedia(preferred);
    } else {
      setSelectedMedia(null);
    }
  };

  const handleCancelDownload = () => {
    stopProcessingTimer();

    if (downloadAbortRef.current) {
      downloadAbortRef.current.abort();
      downloadAbortRef.current = null;
    }

    if (activeDownload?.id) {
      removeActiveDownload(activeDownload.id);
    }

    setActiveDownload(null);
    setIsDownloading(false);

    toast.dismiss();
    toast.info("Download cancelled.");
  };

  const handleDownload = async () => {
    const downloadId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    try {
      if (!selectedMedia?.url) {
        toast.error("Please select a valid download quality.");
        return;
      }

      const prettyQuality = getPrettyQuality(
        selectedMedia?.quality,
        selectedMedia?.ext,
        selectedMedia
      );

      const originalUrl = videoInfo?.webpage_url || url;

      const cachedData = videoInfo
        ? {
            ...videoInfo,
            video: videoOptions,
            audio: audioOptions,
          }
        : null;

      const downloadMeta = {
        id: downloadId,
        title: videoInfo?.title || "linkflow-download",
        type: format,
        quality: prettyQuality,
        size: selectedMedia?.size || "1 MB",
        aspectRatio:
          format === "audio"
            ? "audio"
            : getMediaAspectRatio(
                selectedMedia,
                videoInfo?.aspectRatio || "landscape"
              ),
        originalUrl,
        sourceUrl: originalUrl,
        platform: videoInfo?.platform || platform,
        durationText: videoInfo?.durationText || "--",

        /**
         * Save backend preview URL, not raw CDN URL.
         */
        previewUrl: format === "video" ? videoInfo?.previewUrl || "" : "",
        audioPreviewUrl: format === "audio" ? selectedMedia?.url || "" : "",
        hasAudio: hasConfirmedAudio(selectedMedia),

        cachedData,
        thumb: videoInfo?.thumb ? getProxyImageUrl(videoInfo.thumb) : "",
      };

      addActiveDownload(downloadMeta);

      setIsDownloading(true);

      setActiveDownload({
        id: downloadId,
        title: downloadMeta.title,
        quality: downloadMeta.quality,
        size: downloadMeta.size,
        progress: 6,
        speed: "Server processing",
        status: "Preparing full video...",
        type: format,
      });

      updateActiveDownload(downloadId, {
        progress: 6,
        speed: "Server processing",
        status: "preparing",
      });

      startProcessingTimer(downloadId);

      const controller = new AbortController();
      downloadAbortRef.current = controller;

      const payload = {
        type: format,
        title: videoInfo?.title || "linkflow-download",
        originalUrl,
        platform: videoInfo?.platform || "",
        videoUrl: format === "video" ? selectedMedia.url : "",
        audioUrl:
          format === "audio"
            ? selectedMedia.url
            : selectedMedia.audioUrl || "",
        videoFormatId: format === "video" ? selectedMedia.formatId || "" : "",
        audioFormatId:
          format === "audio"
            ? selectedMedia.formatId || ""
            : selectedMedia.audioFormatId || "",
        hasAudio: hasConfirmedAudio(selectedMedia),
        ext: selectedMedia.ext || "",
      };

      let response;

      try {
        console.log("Trying direct download route with selected video/audio URLs...");
        response = await downloadDirectMedia(payload, controller.signal);
      } catch (directError) {
        console.warn(
          "Direct download failed, trying fallback download route:",
          directError.message
        );

        try {
          response = await downloadFallbackMedia(
            {
              type: format,
              title: videoInfo?.title || "linkflow-download",
              originalUrl,
            },
            controller.signal
          );
        } catch (fallbackError) {
          console.warn(
            "Fallback server merge failed, trying single-file fallback:",
            fallbackError.message
          );

          const errorData = fallbackError.data || {};
          const singleVideoUrl =
            errorData.singleVideoUrl ||
            errorData.openUrl ||
            selectedMedia?.url ||
            "";
          const singleAudioUrl =
            errorData.singleAudioUrl ||
            errorData.audioUrl ||
            selectedMedia?.audioUrl ||
            "";

          /**
           * Last reliable fallback:
           * if server cannot merge video+audio, download the selected stream alone.
           * For separate-stream platforms, also download audio separately when available.
           */
          if (format === "video" && singleVideoUrl) {
            try {
              toast.info(
                singleAudioUrl
                  ? "Full video merge failed. Downloading video-only and audio separately."
                  : "Full video merge failed. Downloading video-only."
              );

              const videoOnlyResponse = await downloadSingleMedia(
                {
                  url: singleVideoUrl,
                  title: videoInfo?.title || "linkflow-download",
                  type: "video",
                  ext: selectedMedia?.ext || "mp4",
                },
                controller.signal
              );

              await saveResponseToFile(
                videoOnlyResponse,
                getSplitDownloadFileName(
                  videoInfo?.title,
                  "video",
                  selectedMedia?.ext || "mp4"
                )
              );

              if (singleAudioUrl) {
                const audioOnlyResponse = await downloadSingleMedia(
                  {
                    url: singleAudioUrl,
                    title: videoInfo?.title || "linkflow-download",
                    type: "audio",
                    ext: "m4a",
                  },
                  controller.signal
                );

                await saveResponseToFile(
                  audioOnlyResponse,
                  getSplitDownloadFileName(videoInfo?.title, "audio", "m4a")
                );
              }

              removeActiveDownload(downloadId);
              addRecentDownload({
                ...downloadMeta,
                progress: 100,
                status: singleAudioUrl
                  ? "Downloaded video/audio separately"
                  : "Downloaded video-only",
              });

              setActiveDownload(null);
              setIsDownloading(false);
              toast.success(
                singleAudioUrl
                  ? "Downloaded video-only and audio separately."
                  : "Downloaded video-only."
              );
              return;
            } catch (singleError) {
              console.warn("Single-file fallback failed:", singleError.message);
            }
          }

          try {
            const openData = await getFallbackOpenMedia(
              { originalUrl },
              controller.signal
            );

            if (openData.openUrl) {
              window.open(openData.openUrl, "_blank", "noopener,noreferrer");
              toast.info(
                openData.audioUrl
                  ? "Server merge failed. Opened video in a new tab. Audio may be separate."
                  : "Server merge failed. Opened video in a new tab."
              );

              removeActiveDownload(downloadId);
              setActiveDownload(null);
              setIsDownloading(false);
              return;
            }
          } catch (openError) {
            console.warn("Manual open fallback failed:", openError.message);
          }

          throw fallbackError;
        }
      }

      console.log("Download engine:", response.headers.get("X-Download-Engine"));
      console.log("Fallback used:", response.headers.get("X-Fallback-Used"));

      stopProcessingTimer();

      const contentLength = response.headers.get("content-length");
      const total = contentLength ? Number(contentLength) : 0;
      const reader = response.body?.getReader();

      setActiveDownload((current) =>
        current
          ? {
              ...current,
              progress: Math.max(current.progress, 18),
              speed: "Starting transfer",
              status: "Downloading...",
            }
          : null
      );

      if (!reader) {
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = getDownloadFileName(videoInfo?.title, format);
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        window.URL.revokeObjectURL(blobUrl);

        removeActiveDownload(downloadId);
        addRecentDownload({
          ...downloadMeta,
          progress: 100,
        });

        setActiveDownload(null);
        toast.success("Download completed.");
        return;
      }

      const chunks = [];
      let receivedLength = 0;
      const startedAt = Date.now();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        const elapsedSeconds = Math.max((Date.now() - startedAt) / 1000, 1);
        const speed = receivedLength / 1024 / 1024 / elapsedSeconds;

        const progress = total
          ? Math.min(Math.round((receivedLength / total) * 100), 99)
          : Math.min(95, Math.max(18, Math.round(receivedLength / 1200000)));

        const nextDownloadState = {
          id: downloadId,
          title: downloadMeta.title,
          quality: downloadMeta.quality,
          size: downloadMeta.size,
          progress,
          speed: `${speed.toFixed(2)} MB/s`,
          status: "Downloading...",
          type: format,
        };

        setActiveDownload(nextDownloadState);

        updateActiveDownload(downloadId, {
          progress,
          speed: `${speed.toFixed(2)} MB/s`,
          status: "downloading",
        });
      }

      updateActiveDownload(downloadId, {
        progress: 100,
        speed: "Completed",
        status: "completed",
      });

      setActiveDownload((current) =>
        current
          ? {
              ...current,
              progress: 100,
              speed: "Completed",
              status: "Finalizing...",
            }
          : null
      );

      const blob = new Blob(chunks);
      const blobUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = getDownloadFileName(videoInfo?.title, format);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      window.URL.revokeObjectURL(blobUrl);

      removeActiveDownload(downloadId);
      addRecentDownload({
        ...downloadMeta,
        progress: 100,
      });

      setTimeout(() => {
        setActiveDownload(null);
      }, 450);

      toast.success("Download completed.");
    } catch (error) {
      stopProcessingTimer();

      removeActiveDownload(downloadId);
      setActiveDownload(null);

      if (error.name === "AbortError") {
        return;
      }

      console.error("Download error:", error);
      toast.error(error.message || "Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
      downloadAbortRef.current = null;
    }
  };

  return (
    <main className="theme-section relative min-h-[calc(100svh-64px)] overflow-hidden lg:min-h-[calc(100svh-76px)]">
      <div className="theme-layer theme-hero-dark" />
      <div className="theme-layer theme-hero-light" />

      <div className="theme-grid absolute inset-0 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line-2)_1px,transparent_1px)] bg-[size:82px_82px] opacity-20" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-64px)] max-w-[1540px] flex-col px-4 py-5 sm:px-6 lg:min-h-[calc(100svh-76px)] lg:px-10 lg:py-6 xl:px-14">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-500/12 text-violet-500">
              <Play className="h-5 w-5 fill-current" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-[22px] font-bold tracking-[-0.02em] text-[var(--text-heading)]">
                Video Preview
              </h1>

              <p className="mt-0.5 truncate text-xs text-[var(--text-muted)]">
                Source: {videoInfo?.platform || platform}
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
              aria-label="Downloads"
            >
              <Download className="h-4 w-4" />
            </Link>

            <Link
              to="/"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-[var(--text-body)] hover:bg-[var(--surface-hover)]"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-8 pt-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(390px,0.8fr)] xl:grid-cols-[minmax(0,1.12fr)_minmax(430px,0.78fr)]">
          <div className="min-w-0">
            <div
              className={`relative mx-auto overflow-hidden rounded-[26px] bg-black shadow-[0_28px_90px_rgba(2,6,23,0.38)] ${
                isPortrait
                  ? "h-[min(72svh,720px)] max-h-[720px] aspect-[9/16]"
                  : isSquare
                  ? "h-[min(66svh,620px)] max-h-[620px] aspect-square"
                  : "w-full max-w-[980px] aspect-video"
              }`}
            >
              {isLoading ? (
                <div className="absolute inset-0 grid place-items-center bg-slate-950">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-400" />
                    <p className="mt-3 text-sm font-medium text-slate-300">
                      Loading preview...
                    </p>
                  </div>
                </div>
              ) : format === "audio" ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-slate-950 to-fuchsia-950 px-5">
                  <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/10 text-violet-200">
                    <FileMusic className="h-10 w-10" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-white">
                    Audio Preview
                  </p>

                  <audio
                    ref={standaloneAudioRef}
                    key={audioPreviewUrl}
                    src={audioPreviewUrl}
                    controls
                    preload="metadata"
                    autoPlay={shouldAutoplay}
                    className="mt-5 w-full max-w-[440px]"
                  />
                </div>
              ) : selectedPreview ? (
                <>
                  <video
                    ref={videoRef}
                    key={`${selectedPreview}-${selectedMedia?.formatId || ""}`}
                    src={selectedPreview}
                    poster={
                      videoInfo?.thumb
                        ? getProxyImageUrl(videoInfo.thumb)
                        : undefined
                    }
                    controls
                    playsInline
                    preload="metadata"
                    autoPlay={shouldAutoplay}
                    onLoadedMetadata={handleVideoLoadedMetadata}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onEnded={handleVideoEnded}
                    onSeeked={syncAudioTime}
                    onTimeUpdate={syncAudioTime}
                    onVolumeChange={handleVolumeChange}
                    className="absolute inset-0 h-full w-full object-contain"
                  />

                  {syncedAudioUrl && (
                    <audio
                      ref={audioRef}
                      key={`${syncedAudioUrl}-${selectedMedia?.audioFormatId || ""}`}
                      src={syncedAudioUrl}
                      preload="metadata"
                      className="hidden"
                    />
                  )}
                </>
              ) : videoInfo?.thumb ? (
                <img
                  src={getProxyImageUrl(videoInfo.thumb)}
                  alt={videoInfo?.title || "Video thumbnail"}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_20%),radial-gradient(circle_at_55%_35%,rgba(34,197,94,0.32),transparent_26%),linear-gradient(135deg,#1e293b,#020617_58%,#0f172a)]" />
              )}
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isLoading || isDownloading || !selectedMedia?.url}
              className="mx-auto mt-5 flex w-full max-w-[430px] cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(168,85,247,0.26)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDownloading ? (
                <Loader2 className="h-[18px] w-[18px] animate-spin" />
              ) : (
                <Download className="h-[18px] w-[18px]" />
              )}

              {isDownloading
                ? "Downloading..."
                : `Download ${getPrimaryQuality(selectedMedia?.quality, selectedMedia)}`}
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[13px] font-medium text-[var(--text-muted)]">
              <ShieldCheck className="h-[18px] w-[18px] text-emerald-500" />
              Secure and fast download
            </div>
          </div>

          <aside className="min-w-0">
            <h2 className="line-clamp-2 text-[26px] font-bold leading-tight tracking-[-0.03em] text-[var(--text-heading)] sm:text-[32px]">
              {isLoading
                ? "Fetching video details..."
                : videoInfo?.title || "Video Preview"}
            </h2>

            <div className="mt-5 grid grid-cols-3 divide-x divide-[var(--border-soft)]">
              {[
                ["Duration", videoInfo?.durationText || "--"],
                ["Video", videoOptions.length || "--"],
                ["Audio", audioOptions.length || "--"],
              ].map(([label, value]) => (
                <div key={label} className="px-3 first:pl-0">
                  <p className="text-xs font-medium text-[var(--text-muted)] sm:text-sm">
                    {label}
                  </p>

                  <p className="mt-1.5 truncate text-base font-semibold text-[var(--text-heading)] sm:text-lg">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-[15px] font-semibold text-[var(--text-heading)]">
                Choose Format
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleFormatChange("video")}
                  disabled={!videoOptions.length}
                  className={`rounded-2xl border p-4 text-left ${transitionClass} ${
                    format === "video"
                      ? "border-violet-500 bg-violet-500/10 text-violet-500"
                      : "border-[var(--border-soft)] bg-[var(--surface)] text-[var(--text-muted)]"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-600 text-white">
                      <Play className="h-5 w-5 fill-current" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">Video</p>
                      <p className="text-xs">
                        {videoOptions.length || 0} files
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleFormatChange("audio")}
                  disabled={!audioOptions.length}
                  className={`rounded-2xl border p-4 text-left ${transitionClass} ${
                    format === "audio"
                      ? "border-violet-500 bg-violet-500/10 text-violet-500"
                      : "border-[var(--border-soft)] bg-[var(--surface)] text-[var(--text-muted)]"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <div className="flex items-center gap-3">
                    <FileMusic className="h-9 w-9 shrink-0" />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">Audio</p>
                      <p className="text-xs">
                        {audioOptions.length || 0} files
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-[15px] font-semibold text-[var(--text-heading)]">
                Select Quality
              </h3>

              <div className="custom-scrollbar mt-3 max-h-[250px] overflow-y-auto rounded-2xl border border-[var(--border-soft)]">
                {isLoading && (
                  <div className="bg-[var(--surface)] px-4 py-4 text-sm text-[var(--text-muted)]">
                    Fetching available download formats...
                  </div>
                )}

                {!isLoading && availableOptions.length === 0 && (
                  <div className="bg-[var(--surface)] px-4 py-4 text-sm text-[var(--text-muted)]">
                    No {format} formats found for this link.
                  </div>
                )}

                {!isLoading &&
                  availableOptions.map((option) => {
                    const isSelected =
                      selectedMedia?.formatId === option.formatId ||
                      selectedMedia?.url === option.url;

                    const prettyQuality = getPrettyQuality(
                      option.quality,
                      option.ext,
                      option
                    );

                    return (
                      <button
                        key={option.formatId || option.url}
                        type="button"
                        onClick={() => handleSelectMedia(option)}
                        className={`flex w-full items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-4 py-3.5 text-left last:border-b-0 ${transitionClass} ${
                          isSelected
                            ? "bg-violet-500/10 text-violet-500"
                            : "bg-[var(--surface)] text-[var(--text-body)] hover:bg-[var(--surface-hover)]"
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          {isSelected ? (
                            <CheckCircle2 className="h-[18px] w-[18px] shrink-0" />
                          ) : (
                            <span className="h-[18px] w-[18px] shrink-0 rounded-full border-2 border-slate-400" />
                          )}

                          <span className="truncate text-sm font-medium">
                            {prettyQuality}
                          </span>
                        </span>

                        <span
                          className={`shrink-0 rounded-lg px-2 py-0.5 text-xs ${
                            isSelected
                              ? "bg-violet-500/12 text-violet-500"
                              : "text-[var(--text-muted)]"
                          }`}
                        >
                          {option.size || "1 MB"}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4">
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald-500" />

                <p className="text-sm leading-6 text-[var(--text-muted)]">
                  {isLoading
                    ? "Checking your link and preparing download options."
                    : "Your link is valid. Choose a format and quality, then start your secure download."}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {activeDownload && (
        <div className="fixed bottom-4 left-1/2 z-[80] w-[calc(100%-24px)] max-w-[620px] -translate-x-1/2 sm:bottom-6">
          <div className="overflow-hidden rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface)] shadow-[0_24px_90px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <div className="flex items-start gap-3 p-3.5 sm:p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet-500/12 text-violet-500">
                {activeDownload.type === "audio" ? (
                  <FileMusic className="h-5 w-5" />
                ) : (
                  <Download className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--text-heading)]">
                      {activeDownload.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                      {activeDownload.quality} · {activeDownload.size}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCancelDownload}
                    className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-2.5 text-[11px] font-semibold text-red-500 hover:bg-red-500/15"
                    aria-label="Cancel download"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-[11px] font-medium text-[var(--text-muted)]">
                  <span className="truncate">{activeDownload.status}</span>
                  <span className="shrink-0">
                    {Math.round(activeDownload.progress)}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--border-soft)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.min(
                        Math.max(Number(activeDownload.progress || 0), 0),
                        100
                      )}%`,
                    }}
                  />
                </div>

                <div className="mt-2 text-right text-[11px] font-medium text-[var(--text-muted)]">
                  {activeDownload.speed}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default DownloadPreviewPage;