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
  const optionHeaders = new Headers(options.headers);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  optionHeaders.forEach((value, key) => {
    headers[key] = value;
  });

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

  const contentType = res.headers.get("content-type") ?? "";
  const rawBody = await res.text();
  const expectsJson = contentType.includes("application/json");

  let json: ApiResponse<T> | null = null;
  if (expectsJson && rawBody) {
    try {
      json = JSON.parse(rawBody) as ApiResponse<T>;
    } catch {
      throw new Error("Server returned invalid JSON. Please restart the frontend and backend once.");
    }
  }

  if (!res.ok) {
    const apiError = json?.errors?.[0];
    const textError = rawBody.trim();
    if (apiError) {
      throw new Error(apiError);
    }
    if (textError.toLowerCase().includes("internal server error")) {
      throw new Error("Internal server error. Make sure PostgreSQL and the API server are running.");
    }
    if (textError) {
      throw new Error(textError);
    }
    throw new Error("Request failed");
  }

  if (!json) {
    if (!rawBody.trim()) {
      return undefined as T;
    }
    throw new Error("Server returned an unexpected response. Please try again.");
  }

  if (!json.success) {
    throw new Error(json.errors?.[0] ?? "Request failed");
  }
  return json.data as T;
}
