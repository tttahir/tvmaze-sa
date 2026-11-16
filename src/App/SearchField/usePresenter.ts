import { useEffect, useMemo, useRef } from "react";
import type { ChangeEvent } from "react";
import debounce from "lodash/debounce";
import { TvMazeApi } from "api/tvMaze/tvMaze.api";
import {
  selectQuery,
  selectSetQuery,
  selectCompleteSearch,
  selectFailSearch,
} from "App/store/selectors";
import { useSearchStore } from "App/store/useSearchStore";
import type { SearchFieldProps } from "./types";

const SEARCH_DEBOUNCE_DELAY = 350;

export function usePresenter(_props: SearchFieldProps) {
  const query = useSearchStore(selectQuery);
  const setQuery = useSearchStore(selectSetQuery);
  const completeSearch = useSearchStore(selectCompleteSearch);
  const failSearch = useSearchStore(selectFailSearch);
  const searchControllerRef = useRef<AbortController | null>(null);
  const debouncedSearch = useMemo(
    () =>
      debounce(async (showName: string, signal: AbortSignal) => {
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
    [completeSearch, failSearch],
  );

  useEffect(
    () => () => {
      debouncedSearch.cancel();
      searchControllerRef.current?.abort();
    },
    [debouncedSearch],
  );

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const showName = value.trim();

    debouncedSearch.cancel();
    searchControllerRef.current?.abort();
    setQuery(value);

    if (!showName) return;

    const controller = new AbortController();
    searchControllerRef.current = controller;
    debouncedSearch(showName, controller.signal);
  }

  return { query, handleQueryChange };
}
