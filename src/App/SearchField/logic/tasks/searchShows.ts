import { showsApi } from "api/shows/shows.api";
import { useSearchStore } from "App/store/useSearchStore";

export async function searchShows(showName: string, signal: AbortSignal) {
  const query = showName.trim();
  const { searchQuery, hasSearched, startSearch, completeSearch, failSearch } =
    useSearchStore.getState();

  if (hasSearched && query === searchQuery) return;

  startSearch(query);
  if (!query) return;

  try {
    const results = await showsApi.searchShows(query, signal);
    if (!signal.aborted) {
      completeSearch(results.map(({ show }) => show));
    }
  } catch {
    if (!signal.aborted) {
      failSearch();
    }
  }
}
