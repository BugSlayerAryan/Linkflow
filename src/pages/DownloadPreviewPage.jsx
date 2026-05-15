

import { useEffect, useMemo, useRef, useState } from "react";
import Hls from "hls.js";
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
  fetchMediaInfo,
  getProxyImageUrl,
} from "../api/api";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * Must match HeroSection cache version.
 */
const MEDIA_CACHE_VERSION = "raw-preview-download-audio-v32";

const OLD_MEDIA_CACHE_VERSIONS = [];

function isHlsUrl(url = "") {
  return String(url || "").toLowerCase().includes(".m3u8");
}

/**
 * IMPORTANT:
 * X.com .m3u8 URLs must NEVER be loaded directly in the browser.
 * Set VITE_API_URL in your frontend hosting dashboard to your deployed backend URL.
 * Example: VITE_API_URL=https://your-backend.onrender.com
 */
function getApiBaseUrl() {
  const envApiUrl = import.meta.env.VITE_API_URL;

  if (!envApiUrl) {
    console.error(
      "VITE_API_URL is missing. X.com HLS proxy cannot work. Set it to your backend URL."
    );
    return "";
  }

  const cleaned = String(envApiUrl).replace(/\/$/, "");

  if (cleaned.includes("localhost") && window.location.protocol === "https:") {
    console.error(
      "VITE_API_URL points to localhost on a live HTTPS site. Use your deployed backend URL."
    );
    return "";
  }

  return cleaned;
}

function getHlsProxyUrl(rawUrl = "") {
  if (!rawUrl) return "";

  const apiBase = getApiBaseUrl();

  if (!apiBase) return "";

  return `${apiBase}/api/v1/hls-proxy?url=${encodeURIComponent(rawUrl)}`;
}

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

function getPrettyQuality(quality = "", ext = "") {
  const normalized = String(quality || "").toLowerCase();

  let label = quality || "Default";

  if (normalized.includes("4320")) label = "4320p (8K)";
  else if (normalized.includes("2160")) label = "2160p (4K)";
  else if (normalized.includes("1440")) label = "1440p (2K)";
  else if (normalized.includes("1080")) label = "1080p (Full HD)";
  else if (normalized.includes("720")) label = "720p (HD)";
  else if (normalized.includes("480")) label = "480p (SD)";
  else if (normalized.includes("360")) label = "360p";
  else if (normalized.includes("240")) label = "240p";

  const extension = ext ? String(ext).toUpperCase() : "";

  return extension ? `${label} · ${extension}` : label;
}

function getPrimaryQuality(quality = "") {
  const normalized = String(quality || "").toLowerCase();

  if (normalized.includes("4320")) return "4320p";
  if (normalized.includes("2160")) return "2160p";
  if (normalized.includes("1440")) return "1440p";
  if (normalized.includes("1080")) return "1080p";
  if (normalized.includes("720")) return "720p";
  if (normalized.includes("480")) return "480p";
  if (normalized.includes("360")) return "360p";
  if (normalized.includes("240")) return "240p";

  return quality || "Default";
}

function getQualityRank(option = {}) {
  const quality = String(option.quality || "").toLowerCase();
  const directRank = Number(option.qualityRank || option.height || 0);

  if (directRank > 0) return directRank;
  if (quality.includes("4320") || quality.includes("8k")) return 4320;
  if (quality.includes("2160") || quality.includes("4k")) return 2160;
  if (quality.includes("1440") || quality.includes("2k")) return 1440;
  if (quality.includes("1080") || quality.includes("full hd") || quality.includes("fhd")) return 1080;
  if (quality.includes("720") || quality === "hd") return 720;
  if (quality.includes("480") || quality === "sd") return 480;
  if (quality.includes("360")) return 360;
  if (quality.includes("240")) return 240;
  if (quality.includes("144")) return 144;

  return 0;
}

function sortVideoOptions(items = []) {
  return [...items].sort((a, b) => {
    const byQuality = getQualityRank(b) - getQualityRank(a);
    if (byQuality !== 0) return byQuality;

    if (a.ext === "mp4" && b.ext !== "mp4") return -1;
    if (a.ext !== "mp4" && b.ext === "mp4") return 1;

    if (a.hasAudio && !b.hasAudio) return -1;
    if (!a.hasAudio && b.hasAudio) return 1;

    return Number(b.sizeBytes || 0) - Number(a.sizeBytes || 0);
  });
}

function getBestDefaultVideo(items = []) {
  const sortedItems = sortVideoOptions(items);

  return (
    sortedItems.find((item) => item.ext === "mp4" && item.hasAudio) ||
    sortedItems.find((item) => item.ext === "mp4") ||
    sortedItems.find((item) => item.hasAudio) ||
    sortedItems[0] ||
    null
  );
}

function isValidAspectRatio(value) {
  return ["portrait", "landscape", "square"].includes(value);
}

function inferAspectRatioFromMediaData(data = {}, forcedAspectRatio = null) {
  if (isValidAspectRatio(forcedAspectRatio)) {
    return forcedAspectRatio;
  }

  const direct =
    data.layoutAspectRatio ||
    data.previewAspectRatio ||
    data.originalAspectRatio ||
    data.aspectRatio;

  if (isValidAspectRatio(direct)) {
    return direct;
  }

  const candidates = [
    getBestDefaultVideo(data.video || []),
    ...(Array.isArray(data.video) ? data.video : []),
  ].filter(Boolean);

  for (const item of candidates) {
    const itemAspect =
      item.layoutAspectRatio ||
      item.previewAspectRatio ||
      item.originalAspectRatio ||
      item.aspectRatio;

    if (isValidAspectRatio(itemAspect)) {
      return itemAspect;
    }

    const detected = detectAspectRatioFromDimensions(item.width, item.height);
    if (detected) return detected;
  }

  return "landscape";
}

function detectAspectRatioFromDimensions(width, height) {
  const safeWidth = Number(width || 0);
  const safeHeight = Number(height || 0);

  if (!safeWidth || !safeHeight) return null;

  const ratio = safeWidth / safeHeight;

  if (ratio < 0.8) return "portrait";
  if (ratio > 1.2) return "landscape";
  return "square";
}

function detectAspectRatioFromImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }

    const image = new Image();
    let finished = false;

    const done = (value) => {
      if (finished) return;
      finished = true;
      resolve(value);
    };

    const timer = setTimeout(() => done(null), 1200);

    image.onload = () => {
      clearTimeout(timer);
      done(detectAspectRatioFromDimensions(image.naturalWidth, image.naturalHeight));
    };

    image.onerror = () => {
      clearTimeout(timer);
      done(null);
    };

    image.src = src;
  });
}

function normalizeMediaAspectData(data = {}, forcedAspectRatio = null) {
  const finalAspectRatio = inferAspectRatioFromMediaData(data, forcedAspectRatio);

  const normalizeItem = (item = {}) => {
    if (item.type === "audio" || item.aspectRatio === "audio") return item;

    return {
      ...item,
      aspectRatio: finalAspectRatio,
      layoutAspectRatio: finalAspectRatio,
      previewAspectRatio: finalAspectRatio,
    };
  };

  return {
    ...data,
    previewUrl: data.previewUrl || "",
    rawPreviewUrl: data.rawPreviewUrl || "",
    previewAudioUrl: data.previewAudioUrl || "",
    rawPreviewAudioUrl: data.rawPreviewAudioUrl || "",
    previewHasAudio: Boolean(data.previewHasAudio),
    rawPreviewHasAudio: Boolean(data.rawPreviewHasAudio),
    aspectRatio: finalAspectRatio,
    layoutAspectRatio: finalAspectRatio,
    previewAspectRatio: finalAspectRatio,
    video: Array.isArray(data.video) ? data.video.map(normalizeItem) : data.video,
    urls: Array.isArray(data.urls)
      ? data.urls.map((item) => (item?.type === "video" ? normalizeItem(item) : item))
      : data.urls,
  };
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

  if (code === "NO_AUDIO_IN_OUTPUT") {
    return "This video was processed but no audio track was found. Try another quality or another public link.";
  }

  if (code === "FINAL_MEDIA_PROCESSING_FAILED") {
    return "Video was found, but server could not convert it properly. Try another quality or another link.";
  }

  return message || "Something went wrong. Please try another video.";
}

function readCachedMedia(url) {
  const versions = [MEDIA_CACHE_VERSION, ...OLD_MEDIA_CACHE_VERSIONS];

  for (const version of versions) {
    const cacheKey = `${version}:linkflow-media:${url}`;
    const cachedRaw = sessionStorage.getItem(cacheKey);

    if (!cachedRaw) continue;

    try {
      const cached = JSON.parse(cachedRaw);
      const isFresh = Date.now() - cached.createdAt < 10 * 60 * 1000;

      if (cached.url === url && cached.data?.status === "success" && isFresh) {
        const fixedData = {
          ...cached.data,
          previewUrl: cached.data.previewUrl || "",
          rawPreviewUrl: cached.data.rawPreviewUrl || "",
          previewAudioUrl: cached.data.previewAudioUrl || "",
          rawPreviewAudioUrl: cached.data.rawPreviewAudioUrl || "",
          previewHasAudio: Boolean(cached.data.previewHasAudio),
          rawPreviewHasAudio: Boolean(cached.data.rawPreviewHasAudio),
        };

        const latestCacheKey = `${MEDIA_CACHE_VERSION}:linkflow-media:${url}`;

        sessionStorage.setItem(
          latestCacheKey,
          JSON.stringify({
            url,
            data: fixedData,
            createdAt: Date.now(),
          })
        );

        return fixedData;
      }
    } catch {
      sessionStorage.removeItem(cacheKey);
    }
  }

  return null;
}

function saveCachedMedia(url, data) {
  const cacheKey = `${MEDIA_CACHE_VERSION}:linkflow-media:${url}`;

  sessionStorage.setItem(
    cacheKey,
    JSON.stringify({
      url,
      data,
      createdAt: Date.now(),
    })
  );
}

function DownloadPreviewPage() {
  const [searchParams] = useSearchParams();

  const url = searchParams.get("url") || "";
  const shouldAutoplay = searchParams.get("autoplay") === "1";
  const aspectParam = searchParams.get("aspect") || "";
  const initialAspectRatio = isValidAspectRatio(aspectParam) ? aspectParam : null;
  const platform = useMemo(() => getDomainLabel(url), [url]);

  const videoRef = useRef(null);
  const previewAudioRef = useRef(null);
  const standaloneAudioRef = useRef(null);
  const hasFetchedRef = useRef(false);
  const hasShownErrorRef = useRef(false);
  const hasAutoplayedRef = useRef(false);
  const downloadAbortRef = useRef(null);
  const processingTimerRef = useRef(null);
  const previewToastShownRef = useRef(false);

  const initialCachedMedia = useMemo(() => {
    if (!url) return null;
    const cached = readCachedMedia(url);
    return cached ? normalizeMediaAspectData(cached, initialAspectRatio) : null;
  }, [url, initialAspectRatio]);

  const getInitialSelectedMedia = (data) => {
    if (Array.isArray(data?.video) && data.video.length > 0) {
      return getBestDefaultVideo(data.video);
    }

    if (Array.isArray(data?.audio) && data.audio.length > 0) {
      return data.audio[0];
    }

    return null;
  };

  const [format, setFormat] = useState(() =>
    Array.isArray(initialCachedMedia?.video) && initialCachedMedia.video.length > 0
      ? "video"
      : "audio"
  );
  const [videoInfo, setVideoInfo] = useState(initialCachedMedia);
  const [isLoading, setIsLoading] = useState(!initialCachedMedia);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(() => getInitialSelectedMedia(initialCachedMedia));
  const [activeDownload, setActiveDownload] = useState(null);
  const [detectedPreviewAspectRatio, setDetectedPreviewAspectRatio] = useState(null);

  const videoOptions = useMemo(
    () => sortVideoOptions(videoInfo?.video || []),
    [videoInfo?.video]
  );
  const audioOptions = videoInfo?.audio || [];
  const availableOptions = format === "video" ? videoOptions : audioOptions;

  const selectedPreview =
    format === "video"
      ? videoInfo?.previewUrl ||
        videoInfo?.rawPreviewUrl ||
        selectedMedia?.url ||
        ""
      : "";

  const audioPreviewUrl = format === "audio" ? selectedMedia?.url || "" : "";

  const separatePreviewAudioUrl =
    format === "video"
      ? videoInfo?.previewHasAudio || videoInfo?.rawPreviewHasAudio
        ? ""
        : videoInfo?.previewAudioUrl ||
          videoInfo?.rawPreviewAudioUrl ||
          selectedMedia?.audioUrl ||
          ""
      : "";

  const activeAspectRatio =
    selectedMedia?.layoutAspectRatio ||
    selectedMedia?.previewAspectRatio ||
    selectedMedia?.aspectRatio ||
    videoInfo?.layoutAspectRatio ||
    videoInfo?.previewAspectRatio ||
    videoInfo?.aspectRatio ||
    detectedPreviewAspectRatio ||
    initialAspectRatio ||
    "landscape";

  const isPortrait = activeAspectRatio === "portrait";
  const isSquare = activeAspectRatio === "square";

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !selectedPreview || format !== "video") return;

    let hls = null;

    if (!isHlsUrl(selectedPreview)) {
      return;
    }

    const proxiedHlsUrl = getHlsProxyUrl(selectedPreview);

    console.log("Original X HLS URL:", selectedPreview);
    console.log("Using proxied HLS URL:", proxiedHlsUrl);

    /**
     * Never fall back to direct video.twimg.com.
     * Direct X/Twitter CDN requests return 403 in browser.
     */
    if (!proxiedHlsUrl) {
      toast.error("Backend API URL missing. Set VITE_API_URL in frontend env.");
      return;
    }

    try {
      videoElement.pause();
      videoElement.removeAttribute("src");
      videoElement.load();
    } catch {}

    if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = proxiedHlsUrl;
      videoElement.load();
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 30,
        xhrSetup(xhr) {
          xhr.withCredentials = false;
        },
      });

      hls.loadSource(proxiedHlsUrl);
      hls.attachMedia(videoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("X.com HLS manifest loaded");
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.log("X.com HLS error:", data);

        if (data?.fatal && !previewToastShownRef.current) {
          previewToastShownRef.current = true;
          toast.info(
            "X.com preview stream could not play in this browser. Download may still work."
          );
        }
      });
    } else if (!previewToastShownRef.current) {
      previewToastShownRef.current = true;
      toast.info("This browser does not support X.com preview playback.");
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [selectedPreview, format]);

  const stopProcessingTimer = () => {
    clearInterval(processingTimerRef.current);
    processingTimerRef.current = null;
  };

  const resetPreviewMedia = () => {
    previewToastShownRef.current = false;
    setDetectedPreviewAspectRatio(null);

    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        if (!isHlsUrl(selectedPreview)) {
          videoRef.current.load();
        }
      } catch {}
    }

    if (previewAudioRef.current) {
      try {
        previewAudioRef.current.pause();
        previewAudioRef.current.currentTime = 0;
        previewAudioRef.current.load();
      } catch {}
    }

    if (standaloneAudioRef.current) {
      try {
        standaloneAudioRef.current.pause();
        standaloneAudioRef.current.currentTime = 0;
        standaloneAudioRef.current.load();
      } catch {}
    }
  };

  const forceVideoSound = () => {
    if (!videoRef.current) return;

    try {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
    } catch {}
  };

  const syncSeparatePreviewAudio = () => {
    const videoElement = videoRef.current;
    const audioElement = previewAudioRef.current;

    if (!videoElement || !audioElement || !separatePreviewAudioUrl) return;

    try {
      if (Math.abs(audioElement.currentTime - videoElement.currentTime) > 0.35) {
        audioElement.currentTime = videoElement.currentTime;
      }

      audioElement.volume = videoElement.volume;
      audioElement.muted = videoElement.muted;
    } catch {}
  };

  const handlePreviewMetadataLoaded = () => {
    forceVideoSound();

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const detected = detectAspectRatioFromDimensions(
      videoElement.videoWidth,
      videoElement.videoHeight
    );

    if (
      detected &&
      !selectedMedia?.layoutAspectRatio &&
      !selectedMedia?.previewAspectRatio &&
      !selectedMedia?.aspectRatio &&
      !videoInfo?.layoutAspectRatio &&
      !videoInfo?.previewAspectRatio &&
      !videoInfo?.aspectRatio &&
      !initialAspectRatio
    ) {
      setDetectedPreviewAspectRatio(detected);
    }

    syncSeparatePreviewAudio();
  };

  const handlePreviewPlay = async () => {
    forceVideoSound();
    syncSeparatePreviewAudio();

    const audioElement = previewAudioRef.current;
    if (!audioElement || !separatePreviewAudioUrl) return;

    try {
      await audioElement.play();
    } catch {}
  };

  const handlePreviewPause = () => {
    const audioElement = previewAudioRef.current;
    if (!audioElement || !separatePreviewAudioUrl) return;

    try {
      audioElement.pause();
    } catch {}
  };

  const handlePreviewSeeked = () => {
    syncSeparatePreviewAudio();
  };

  const handlePreviewVolumeChange = () => {
    syncSeparatePreviewAudio();
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

    const applyVideoData = (data) => {
      const normalizedData = normalizeMediaAspectData(data, initialAspectRatio);
      setVideoInfo(normalizedData);

      if (Array.isArray(normalizedData.video) && normalizedData.video.length > 0) {
        setFormat("video");
        setSelectedMedia(getBestDefaultVideo(normalizedData.video));
      } else if (Array.isArray(normalizedData.audio) && normalizedData.audio.length > 0) {
        setFormat("audio");
        setSelectedMedia(normalizedData.audio[0]);
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

        const cachedData = readCachedMedia(url);

        if (cachedData) {
          applyVideoData(cachedData);
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
          previewUrl: data.previewUrl || "",
          rawPreviewUrl: data.rawPreviewUrl || "",
          previewAudioUrl: data.previewAudioUrl || "",
          rawPreviewAudioUrl: data.rawPreviewAudioUrl || "",
          previewHasAudio: Boolean(data.previewHasAudio),
          rawPreviewHasAudio: Boolean(data.rawPreviewHasAudio),
        };

        const normalizedFixedData = normalizeMediaAspectData(fixedData);
        saveCachedMedia(url, normalizedFixedData);

        hasShownErrorRef.current = false;
        applyVideoData(normalizedFixedData);
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Video info error:", error);

        if (!hasShownErrorRef.current) {
          hasShownErrorRef.current = true;
          toast.error(getFriendlyError(error));
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
    videoInfo?.previewUrl,
    videoInfo?.rawPreviewUrl,
    selectedMedia?.url,
    selectedMedia?.audioUrl,
    separatePreviewAudioUrl,
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
          videoRef.current.muted = true;
          await videoRef.current.play();
        }
      } catch {}
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

  const handleSelectMedia = (option) => {
    resetPreviewMedia();
    setSelectedMedia(option);
  };

  const handleFormatChange = (nextFormat) => {
    resetPreviewMedia();
    setFormat(nextFormat);

    const nextOptions = nextFormat === "video" ? videoOptions : audioOptions;

    if (nextOptions.length > 0) {
      const sortedNextOptions =
        nextFormat === "video" ? sortVideoOptions(nextOptions) : nextOptions;

      const preferred =
        nextFormat === "video"
          ? sortedNextOptions.find((item) => item.ext === "mp4" && item.hasAudio) ||
            sortedNextOptions.find((item) => item.ext === "mp4") ||
            sortedNextOptions.find((item) => item.hasAudio) ||
            sortedNextOptions[0]
          : sortedNextOptions[0];

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
      if (!selectedMedia) {
        toast.error("Please select a valid download quality.");
        return;
      }

      const prettyQuality = getPrettyQuality(
        selectedMedia?.quality,
        selectedMedia?.ext
      );

      const originalUrl = videoInfo?.webpage_url || url;

      const cachedData = videoInfo
        ? {
            ...videoInfo,
            aspectRatio: activeAspectRatio,
            layoutAspectRatio: activeAspectRatio,
            previewAspectRatio: activeAspectRatio,
            video: videoOptions.map((item) =>
              item.type === "video"
                ? {
                    ...item,
                    aspectRatio: activeAspectRatio,
                    layoutAspectRatio: activeAspectRatio,
                    previewAspectRatio: activeAspectRatio,
                  }
                : item
            ),
            audio: audioOptions,
          }
        : null;

      const downloadMeta = {
        id: downloadId,
        title: videoInfo?.title || "linkflow-download",
        type: format,
        quality: prettyQuality,
        size: selectedMedia?.size || "1 MB",
        aspectRatio: format === "audio" ? "audio" : activeAspectRatio,
        layoutAspectRatio: format === "audio" ? "audio" : activeAspectRatio,
        previewAspectRatio: format === "audio" ? "audio" : activeAspectRatio,
        originalUrl,
        sourceUrl: originalUrl,
        platform: videoInfo?.platform || platform,
        durationText: videoInfo?.durationText || "--",

        previewUrl:
          format === "video"
            ? videoInfo?.previewUrl || videoInfo?.rawPreviewUrl || ""
            : "",
        audioPreviewUrl: format === "audio" ? selectedMedia?.url || "" : "",
        hasAudio: Boolean(selectedMedia?.hasAudio),

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

      const response = await downloadDirectMedia(
        {
          type: format,
          title: videoInfo?.title || "linkflow-download",

          originalUrl,
          platform: videoInfo?.platform || "",

          videoUrl: format === "video" ? selectedMedia?.url || "" : "",
          audioUrl:
            format === "audio"
              ? selectedMedia?.url || ""
              : selectedMedia?.audioUrl || "",

          videoFormatId: format === "video" ? selectedMedia?.formatId || "" : "",
          audioFormatId:
            format === "audio"
              ? selectedMedia?.formatId || ""
              : selectedMedia?.audioFormatId || "",

          hasAudio: Boolean(selectedMedia?.hasAudio),
          ext: selectedMedia?.ext || "",

          // Fallback URLs are already direct media CDN URLs.
          // Force backend to download them directly instead of using yt-dlp again.
          fallbackUsed: Boolean(videoInfo?.fallbackUsed || selectedMedia?.sourceLayer),
          sourceLayer: selectedMedia?.sourceLayer || videoInfo?.fallbackLayer || null,
          sourceProvider:
            selectedMedia?.sourceProvider || videoInfo?.fallbackProvider || "",
          preferDirectDownload: Boolean(
            videoInfo?.fallbackUsed || selectedMedia?.sourceLayer || selectedMedia?.sourceProvider
          ),
        },
        controller.signal
      );

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
      toast.error(getFriendlyError(error));
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
                  ? "h-[min(68svh,660px)] aspect-[9/16]"
                  : isSquare
                  ? "h-[min(62svh,590px)] aspect-square"
                  : "w-full max-w-[920px] aspect-video"
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
                    src={isHlsUrl(selectedPreview) ? undefined : selectedPreview}
                    poster={
                      videoInfo?.thumb
                        ? getProxyImageUrl(videoInfo.thumb)
                        : undefined
                    }
                    controls
                    playsInline
                    preload="metadata"
                    autoPlay={false}
                    muted={false}
                    onLoadedMetadata={handlePreviewMetadataLoaded}
                    onPlay={handlePreviewPlay}
                    onPause={handlePreviewPause}
                    onSeeked={handlePreviewSeeked}
                    onTimeUpdate={syncSeparatePreviewAudio}
                    onVolumeChange={handlePreviewVolumeChange}
                    onError={(event) => {
                      console.error(
                        "Preview video failed:",
                        event.currentTarget.error
                      );

                      if (!previewToastShownRef.current) {
                        previewToastShownRef.current = true;
                        toast.info(
                          "Preview stream cannot play in the browser. Try another quality or download."
                        );
                      }
                    }}
                    className="absolute inset-0 h-full w-full object-contain"
                  />

                  {separatePreviewAudioUrl && (
                    <audio
                      ref={previewAudioRef}
                      key={separatePreviewAudioUrl}
                      src={separatePreviewAudioUrl}
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
              disabled={isLoading || isDownloading || !selectedMedia}
              className="mx-auto mt-5 flex w-full max-w-[430px] cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(168,85,247,0.26)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDownloading ? (
                <Loader2 className="h-[18px] w-[18px] animate-spin" />
              ) : (
                <Download className="h-[18px] w-[18px]" />
              )}

              {isDownloading
                ? "Downloading..."
                : `Download ${getPrimaryQuality(selectedMedia?.quality)}`}
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
                      option.ext
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