/* eslint-disable @typescript-eslint/ban-ts-comment */
const BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function handleRes(res: Response) {
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const error = new Error(data?.message || res.statusText || `API Error: ${res.status}`);
    // @ts-ignore
    error.status = res.status;
    // @ts-ignore
    error.body = data;
    throw error;
  }
  return data;
}

function handleFetchError(err: unknown, method: string, path: string): never {
  let msg = "Network error";
  if (err instanceof TypeError) {
    if (err.message.includes("Failed to fetch")) {
      msg = `Cannot reach ${BASE}${path} - Backend server not running or CORS blocked`;
    } else {
      msg = err.message;
    }
  } else if (err instanceof Error) {
    msg = err.message;
  }
  console.error(`[API ${method} ${path}] ${msg}`);
  console.error(`[API] Backend URL: ${BASE}`);
  const error = new Error(msg);
  throw error;
}

export const api = {
  get: async (path: string) => {
    try {
      const res = await fetch(`${BASE}${path}`, {
        method: "GET",
        credentials: "include", 
        headers: { "Accept": "application/json" },
      });
      return handleRes(res);
    } catch (err) {
      handleFetchError(err, "GET", path);
    }
  },

  post: async (path: string, body?: unknown) => {
    try {
      const res = await fetch(`${BASE}${path}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {}),
      });
      return handleRes(res);
    } catch (err) {
      handleFetchError(err, "POST", path);
    }
  },

  put: async (path: string, body?: unknown) => {
    try {
      const res = await fetch(`${BASE}${path}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {}),
      });
      return handleRes(res);
    } catch (err) {
      handleFetchError(err, "PUT", path);
    }
  },

  del: async (path: string) => {
    try {
      const res = await fetch(`${BASE}${path}`, {
        method: "DELETE",
        credentials: "include",
      });
      return handleRes(res);
    } catch (err) {
      handleFetchError(err, "DELETE", path);
    }
  },
};
