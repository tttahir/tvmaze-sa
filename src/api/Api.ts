import { ApiError } from "./ApiError";

interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

export interface ApiConfig extends Omit<RequestInit, "body"> {
  baseUrl: string;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: QueryParams;
  body?: unknown;
}

/** JSON API client with defaults that individual requests can override. */
export class Api {
  private readonly config: ApiConfig;

  constructor({
    baseUrl = new URL("/api", import.meta.env.API_URL).href,
    ...config
  }: Partial<ApiConfig> = {}) {
    this.config = { baseUrl, ...config };
  }

  async request<T = unknown>(
    path: string,
    { params, body, headers, ...options }: RequestOptions = {},
  ): Promise<T> {
    const { baseUrl, ...restConfig } = this.config;
    const url = new URL(
      path.replace(/^\/+/, ""),
      `${baseUrl.replace(/\/+$/, "")}/`,
    );

    for (const [key, value] of Object.entries(params ?? {})) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }

    const newHeaders = new Headers(headers);

    if (!newHeaders.has("Accept")) newHeaders.set("Accept", "application/json");
    if (body !== undefined && !newHeaders.has("Content-Type")) {
      newHeaders.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
      ...restConfig,
      ...options,
      headers: newHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) throw new ApiError(response);

    return response.json();
  }
}
