// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:3030";

// async function parseJsonResponse(response) {
//   const data = await response.json().catch(() => null);

//   if (!response.ok) {
//     const message =
//       data?.error ||
//       data?.message ||
//       `Request failed with status ${response.status}`;

//     throw new Error(message, {
//       cause: {
//         status: response.status,
//         data,
//       },
//     });
//   }

//   return data;
// }

// export function getApiBaseUrl() {
//   return API_BASE_URL;
// }

// export function getProxyImageUrl(imageUrl) {
//   if (!imageUrl) return "";

//   return `${API_BASE_URL}/api/v1/proxy-image?url=${encodeURIComponent(
//     imageUrl
//   )}`;
// }

// export async function fetchMediaInfo(videoUrl, signal) {
//   const response = await fetch(`${API_BASE_URL}/api/v1/media`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       urls: videoUrl,
//     }),
//     signal,
//   });

//   return parseJsonResponse(response);
// }

// export async function downloadDirectMedia(payload, signal) {
//   const response = await fetch(`${API_BASE_URL}/api/v1/download-direct`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//     signal,
//   });

//   if (!response.ok) {
//     const data = await response.json().catch(() => null);

//     throw new Error(data?.error || "Download failed. Please try again.", {
//       cause: {
//         status: response.status,
//         data,
//       },
//     });
//   }

//   return response;
// }





const RAW_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3030";

const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

async function parseJsonResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.error ||
      data?.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message, {
      cause: {
        status: response.status,
        data,
      },
    });
  }

  return data;
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function getProxyImageUrl(imageUrl) {
  if (!imageUrl) return "";

  return `${API_BASE_URL}/api/v1/proxy-image?url=${encodeURIComponent(
    imageUrl
  )}`;
}

export function getPreviewVideoUrl(videoUrl) {
  if (!videoUrl) return "";

  return `${API_BASE_URL}/api/v1/preview?url=${encodeURIComponent(videoUrl)}`;
}

export async function fetchMediaInfo(videoUrl, signal) {
  const response = await fetch(`${API_BASE_URL}/api/v1/media`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      urls: videoUrl,
    }),
    signal,
  });

  return parseJsonResponse(response);
}

export async function downloadDirectMedia(payload, signal) {
  const response = await fetch(`${API_BASE_URL}/api/v1/download-direct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.error || "Download failed. Please try again.", {
      cause: {
        status: response.status,
        data,
      },
    });
  }

  return response;
}