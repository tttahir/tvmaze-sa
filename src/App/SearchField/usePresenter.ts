import { useEffect, useMemo, useRef } from "react";
import type { ChangeEvent } from "react";
import debounce from "lodash/debounce";
import { TvMazeApi } from "api/tvMaze/tvMaze.api";
import {
  selectQuery,
  selectSetQuery,
  selectStartSearch,
  selectCompleteSearch,
  selectFailSearch,
} from "App/store/selectors";
import { useSearchStore } from "App/store/useSearchStore";
import type { SearchFieldProps } from "./types";

const SEARCH_DEBOUNCE_DELAY = 350;

export function usePresenter(_props: SearchFieldProps) {
  const query = useSearchStore(selectQuery);
  const setQuery = useSearchStore(selectSetQuery);
  const startSearch = useSearchStore(selectStartSearch);
  const completeSearch = useSearchStore(selectCompleteSearch);
  const failSearch = useSearchStore(selectFailSearch);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchControllerRef = useRef<AbortController | null>(null);
  const debouncedSearch = useMemo(
    () =>
      debounce(async (showName: string, signal: AbortSignal) => {
        const { searchQuery, hasSearched } = useSearchStore.getState();
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
    [startSearch, completeSearch, failSearch],
  );

  useEffect(
    () => () => {
      debouncedSearch.cancel();
      searchControllerRef.current?.abort();
    },
    [debouncedSearch],
  );

  function updateQuery(value: string) {
    const showName = value.trim();

    debouncedSearch.cancel();
    searchControllerRef.current?.abort();
    setQuery(value);

    const controller = new AbortController();
    searchControllerRef.current = controller;
    debouncedSearch(showName, controller.signal);
  }

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    updateQuery(event.target.value);
  }

  function handleClearQuery() {
    updateQuery("");
    debouncedSearch.flush();
    inputRef.current?.focus();
  }

  return {
    query,
    hasQuery: query.length > 0,
    inputRef,
    handleQueryChange,
    handleClearQuery,
  };
}
