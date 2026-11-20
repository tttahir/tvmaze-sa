import { Api } from "api/Api";
import type { ShowSearchResult } from "../tvMaze/tvMaze.types";

class ShowsApi {
  private readonly api = new Api();

  searchShows(
    showName: string,
    signal: AbortSignal,
  ): Promise<ShowSearchResult[]> {
    return this.api.request<ShowSearchResult[]>("/shows", {
      params: { q: showName },
      signal,
    });
  }
}

export const showsApi = new ShowsApi();
