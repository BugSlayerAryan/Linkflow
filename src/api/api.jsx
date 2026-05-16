// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "https://linkflow-server.onrender.com";

// export const getApiBaseUrl = () => API_BASE_URL.replace(/\/$/, "");

// export const getProxyImageUrl = (url) => {
//   if (!url) return "";
//   return `${getApiBaseUrl()}/api/v1/proxy-image?url=${encodeURIComponent(url)}`;
// };

// export const getPreviewVideoUrl = (url) => {
//   if (!url) return "";
//   return `${getApiBaseUrl()}/api/v1/preview?url=${encodeURIComponent(url)}`;
// };

// async function getErrorPayload(response, fallbackMessage) {
//   try {
//     const data = await response.json();
//     return {
//       data,
//       message: data.error || data.details || data.message || fallbackMessage,
//     };
//   } catch {
//     return {
//       data: null,
//       message: fallbackMessage,
//     };
//   }
// }

// async function throwApiError(response, fallbackMessage) {
//   const payload = await getErrorPayload(response, fallbackMessage);
//   const error = new Error(payload.message);
//   error.status = response.status;
//   error.data = payload.data || {};
//   throw error;
// }

// export async function fetchMediaInfo(url, signal) {
//   const response = await fetch(`${getApiBaseUrl()}/api/v1/media`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ urls: url }),
//     signal,
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.error || data.details || "Unable to fetch video details.");
//   }

//   return data;
// }

// export async function downloadDirectMedia(payload, signal) {
//   const response = await fetch(`${getApiBaseUrl()}/api/v1/download-direct`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//     signal,
//   });

//   if (!response.ok) {
//     await throwApiError(response, "Download failed.");
//   }

//   return response;
// }

// export async function downloadFallbackMedia(payload, signal) {
//   const response = await fetch(`${getApiBaseUrl()}/api/v1/download-fallback`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//     signal,
//   });

//   if (!response.ok) {
//     await throwApiError(response, "Fallback download failed.");
//   }

//   return response;
// }

// export async function downloadSingleMedia(payload, signal) {
//   const response = await fetch(`${getApiBaseUrl()}/api/v1/download-single`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//     signal,
//   });

//   if (!response.ok) {
//     await throwApiError(response, "Single media download failed.");
//   }

//   return response;
// }

// export async function getFallbackOpenMedia(payload, signal) {
//   const response = await fetch(`${getApiBaseUrl()}/api/v1/fallback-open`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//     signal,
//   });

//   if (!response.ok) {
//     await throwApiError(response, "Could not open fallback media.");
//   }

//   return response.json();
// }


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://linkflow-server.onrender.com";

export const getApiBaseUrl = () => API_BASE_URL.replace(/\/$/, "");

export const getProxyImageUrl = (url) => {
  if (!url) return "";
  return `${getApiBaseUrl()}/api/v1/proxy-image?url=${encodeURIComponent(url)}`;
};

export const getPreviewVideoUrl = (url) => {
  if (!url) return "";
  return `${getApiBaseUrl()}/api/v1/preview?url=${encodeURIComponent(url)}`;
};

async function getErrorPayload(response, fallbackMessage) {
  try {
    const data = await response.json();
    return {
      data,
      message: data.error || data.details || data.message || fallbackMessage,
    };
  } catch {
    return {
      data: null,
      message: fallbackMessage,
    };
  }
}

async function throwApiError(response, fallbackMessage) {
  const payload = await getErrorPayload(response, fallbackMessage);
  const error = new Error(payload.message);
  error.status = response.status;
  error.data = payload.data || {};
  throw error;
}

export async function fetchMediaInfo(url, signal) {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/media`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls: url }),
    signal,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.details || "Unable to fetch video details.");
  }

  return data;
}

export async function downloadDirectMedia(payload, signal) {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/download-direct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    await throwApiError(response, "Download failed.");
  }

  return response;
}

export async function downloadFallbackMedia(payload, signal) {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/download-fallback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    await throwApiError(response, "Fallback download failed.");
  }

  return response;
}

export async function downloadSingleMedia(payload, signal) {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/download-single`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    await throwApiError(response, "Single media download failed.");
  }

  return response;
}

export async function getFallbackOpenMedia(payload, signal) {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/fallback-open`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    await throwApiError(response, "Could not open fallback media.");
  }

  return response.json();
}
