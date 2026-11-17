import { useEffect, useState, useRef } from "react";
import debounce from "lodash/debounce";
import { TvMazeApi } from "api/tvMaze/tvMaze.api";
import { useSearchStore } from "App/store/useSearchStore";

const SEARCH_DEBOUNCE_DELAY = 350;

export function useSearch() {
  const controllerRef = useRef<AbortController | null>(null);

  const [debouncedSearch] = useState(() =>
    debounce(async (showName: string, signal: AbortSignal) => {
      const {
        searchQuery,
        hasSearched,
        startSearch,
        completeSearch,
        failSearch,
      } = useSearchStore.getState();
      if (hasSearched && showName === searchQuery) return;

      startSearch(showName);
      if (!showName) return;

      try {
        const results = await TvMazeApi.searchShows(showName, signal);
        if (!signal.aborted) {
          completeSearch(results.map(({ show }) => show));
        }
      } catch {
        if (!signal.aborted) {
          failSearch();
        }
      }
    }, SEARCH_DEBOUNCE_DELAY),
  );

  useEffect(
    () => () => {
      debouncedSearch.cancel();
      controllerRef.current?.abort();
    },
    [debouncedSearch],
  );

  function search(value: string) {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    debouncedSearch(value.trim(), controller.signal);
  }

  return { search, flushSearch: debouncedSearch.flush };
}
