const RECENT_DOWNLOADS_KEY = "linkflow-download-history";
const ACTIVE_DOWNLOADS_KEY = "linkflow-active-downloads";
const MAX_RECENT_DOWNLOADS = 30;

const listeners = new Set();

function safeRead(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyDownloads();
  } catch (error) {
    console.warn("Download history save failed:", error.message);
  }
}

function notifyDownloads() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      // Ignore listener errors.
    }
  });
}

export function subscribeDownloads(listener) {
  if (typeof listener !== "function") {
    return () => {};
  }

  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getRecentDownloads() {
  return safeRead(RECENT_DOWNLOADS_KEY, []);
}

export function getActiveDownloads() {
  return safeRead(ACTIVE_DOWNLOADS_KEY, []);
}

export function addRecentDownload(download) {
  if (!download?.id) return;

  const current = getRecentDownloads();
  const withoutDuplicate = current.filter((item) => item.id !== download.id);

  const next = [
    {
      ...download,
      status: download.status || "Completed",
      progress: Number(download.progress || 100),
      completedAt: download.completedAt || new Date().toISOString(),
    },
    ...withoutDuplicate,
  ].slice(0, MAX_RECENT_DOWNLOADS);

  safeWrite(RECENT_DOWNLOADS_KEY, next);
}

export function addActiveDownload(download) {
  if (!download?.id) return;

  const current = getActiveDownloads();
  const withoutDuplicate = current.filter((item) => item.id !== download.id);

  safeWrite(ACTIVE_DOWNLOADS_KEY, [
    {
      ...download,
      status: download.status || "Preparing...",
      progress: Number(download.progress || 0),
      startedAt: download.startedAt || new Date().toISOString(),
    },
    ...withoutDuplicate,
  ]);
}

export function updateActiveDownload(id, updates = {}) {
  if (!id) return;

  const current = getActiveDownloads();

  const next = current.map((item) =>
    item.id === id
      ? {
          ...item,
          ...updates,
          progress:
            updates.progress === undefined
              ? item.progress
              : Number(updates.progress || 0),
        }
      : item
  );

  safeWrite(ACTIVE_DOWNLOADS_KEY, next);
}

export function removeActiveDownload(id) {
  if (!id) return;

  const current = getActiveDownloads();

  safeWrite(
    ACTIVE_DOWNLOADS_KEY,
    current.filter((item) => item.id !== id)
  );
}

export function clearRecentDownloads() {
  safeWrite(RECENT_DOWNLOADS_KEY, []);
}

export function clearActiveDownloads() {
  safeWrite(ACTIVE_DOWNLOADS_KEY, []);
}
