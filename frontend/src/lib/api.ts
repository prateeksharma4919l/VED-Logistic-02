export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  errors?: string[];
};

function getAuthToken() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("ved_auth");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.token ?? null;
  } catch {
    return null;
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${baseUrl}${path}`, {
      credentials: "include",
      headers,
      ...options,
    });
  } catch {
    throw new Error("Backend unavailable. Make sure PostgreSQL and the API server are running.");
  }
  const json = (await res.json()) as ApiResponse<T>;
  if (!res.ok || !json.success) {
    throw new Error(json.errors?.[0] ?? "Request failed");
  }
  return json.data as T;
}
