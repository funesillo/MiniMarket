/* eslint-disable @typescript-eslint/ban-ts-comment */
const BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function handleRes(res: Response) {
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const error = new Error(data?.message || res.statusText || "Error en API");
    // @ts-ignore
    error.status = res.status;
    // @ts-ignore
    error.body = data;
    throw error;
  }
  return data;
}

export const api = {
  get: async (path: string) => {
    const res = await fetch(`${BASE}${path}`, {
      method: "GET",
      credentials: "include", 
      headers: { "Accept": "application/json" },
    });
    return handleRes(res);
  },

  post: async (path: string, body?: unknown) => {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
    });
    return handleRes(res);
  },

  put: async (path: string, body?: unknown) => {
    const res = await fetch(`${BASE}${path}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
    });
    return handleRes(res);
  },

  del: async (path: string) => {
    const res = await fetch(`${BASE}${path}`, {
      method: "DELETE",
      credentials: "include",
    });
    return handleRes(res);
  },
};
