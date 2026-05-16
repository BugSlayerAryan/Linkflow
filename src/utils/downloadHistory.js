const DB_NAME = "linkflow-download-cache";
const DB_VERSION = 1;
const STORE_NAME = "blobs";

/**
 * Keep this conservative. Browsers can reject very large IndexedDB writes.
 * 150 MB is enough for many shorts/reels but avoids killing storage for huge videos.
 */
export const MAX_DOWNLOAD_CACHE_BYTES = 150 * 1024 * 1024;

function openDownloadCacheDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not supported in this browser."));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error("Failed to open download cache."));
  });
}

function runStoreTransaction(mode, callback) {
  return openDownloadCacheDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, mode);
        const store = tx.objectStore(STORE_NAME);

        let requestResult;

        try {
          requestResult = callback(store);
        } catch (error) {
          db.close();
          reject(error);
          return;
        }

        tx.oncomplete = () => {
          db.close();
          resolve(requestResult?.result);
        };

        tx.onerror = () => {
          db.close();
          reject(tx.error || new Error("Download cache transaction failed."));
        };

        tx.onabort = () => {
          db.close();
          reject(tx.error || new Error("Download cache transaction aborted."));
        };
      })
  );
}

export function canCacheDownloadBlob(blob) {
  return Boolean(
    blob &&
      typeof blob.size === "number" &&
      blob.size > 0 &&
      blob.size <= MAX_DOWNLOAD_CACHE_BYTES
  );
}

export async function saveDownloadBlob({
  id,
  blob,
  fileName,
  type = "video",
  aspectRatio = "landscape",
  title = "",
}) {
  if (!id || !canCacheDownloadBlob(blob)) {
    return null;
  }

  const record = {
    id,
    blob,
    fileName,
    type,
    aspectRatio,
    title,
    size: blob.size,
    mimeType: blob.type || "",
    createdAt: Date.now(),
  };

  await runStoreTransaction("readwrite", (store) => store.put(record));

  return {
    id,
    size: blob.size,
    mimeType: blob.type || "",
    fileName,
  };
}

export async function getDownloadBlob(id) {
  if (!id) return null;

  return runStoreTransaction("readonly", (store) => store.get(id));
}

export async function deleteDownloadBlob(id) {
  if (!id) return;

  await runStoreTransaction("readwrite", (store) => store.delete(id));
}

export async function clearOldDownloadBlobs(maxAgeMs = 7 * 24 * 60 * 60 * 1000) {
  const cutoff = Date.now() - maxAgeMs;
  const db = await openDownloadCacheDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.openCursor();

    request.onsuccess = () => {
      const cursor = request.result;

      if (cursor) {
        const value = cursor.value;

        if (value?.createdAt && value.createdAt < cutoff) {
          cursor.delete();
        }

        cursor.continue();
      }
    };

    tx.oncomplete = () => {
      db.close();
      resolve();
    };

    tx.onerror = () => {
      db.close();
      reject(tx.error || new Error("Could not clean download cache."));
    };
  });
}
