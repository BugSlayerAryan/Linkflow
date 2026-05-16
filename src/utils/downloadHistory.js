const ACTIVE_KEY = "linkflow-active-downloads";
const RECENT_KEY = "linkflow-recent-downloads";
const EVENT_NAME = "linkflow-downloads-updated";

function safeParse(value, fallback = []) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function emitDownloadsUpdate() {
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function getActiveDownloads() {
  return safeParse(localStorage.getItem(ACTIVE_KEY), []);
}

export function getRecentDownloads() {
  return safeParse(localStorage.getItem(RECENT_KEY), []);
}

export function saveActiveDownloads(downloads) {
  localStorage.setItem(ACTIVE_KEY, JSON.stringify(downloads));
  emitDownloadsUpdate();
}

export function saveRecentDownloads(downloads) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(downloads));
  emitDownloadsUpdate();
}

export function addActiveDownload(download) {
  const active = getActiveDownloads();

  saveActiveDownloads([
    {
      progress: 0,
      speed: "--",
      status: "preparing",
      createdAt: Date.now(),
      ...download,
    },
    ...active.filter((item) => item.id !== download.id),
  ]);
}

export function updateActiveDownload(id, updates) {
  const active = getActiveDownloads();

  saveActiveDownloads(
    active.map((item) => (item.id === id ? { ...item, ...updates } : item))
  );
}

export function removeActiveDownload(id) {
  const active = getActiveDownloads();

  saveActiveDownloads(active.filter((item) => item.id !== id));
}

export function addRecentDownload(download) {
  const recent = getRecentDownloads();

  const nextRecent = [
    {
      completedAt: Date.now(),
      status: "completed",
      ...download,
    },
    ...recent.filter((item) => item.id !== download.id),
  ].slice(0, 20);

  saveRecentDownloads(nextRecent);
}

export function clearDownloadHistory() {
  localStorage.removeItem(ACTIVE_KEY);
  localStorage.removeItem(RECENT_KEY);
  emitDownloadsUpdate();
}

export function subscribeDownloads(callback) {
  window.addEventListener(EVENT_NAME, callback);

  return () => {
    window.removeEventListener(EVENT_NAME, callback);
  };
}