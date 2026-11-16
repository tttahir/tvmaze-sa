import { Api } from "api/Api";
import type { ShowSearchResult } from "./tvMaze.types";

class _TvMazeApi {
  private readonly api = new Api({
    baseUrl: import.meta.env.API_BASE_URL,
  });

  searchShows(
    showName: string,
    signal: AbortSignal,
  ): Promise<ShowSearchResult[]> {
    return this.api.request<ShowSearchResult[]>("/search/shows", {
      params: { q: showName },
      signal,
    });
  }
}

export const TvMazeApi = new _TvMazeApi();
