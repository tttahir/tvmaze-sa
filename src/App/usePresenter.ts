import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import debounce from "lodash/debounce";
import { TvMazeApi } from "api/tvMaze/tvMaze.api";
import type { Show } from "api/tvMaze/tvMaze.types";
import { SEARCH_DEBOUNCE_DELAY } from "App/constants/searchDebounceDelay";
import { SEARCH_ERROR_MESSAGE } from "App/constants/searchErrorMessage";
import type { AppProps } from "./types";

export function usePresenter(_props: AppProps) {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState<Show[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const searchControllerRef = useRef<AbortController | null>(null);
  const [debouncedSearch] = useState(() =>
    debounce(async (showName: string, signal: AbortSignal) => {
      try {
        const results = await TvMazeApi.searchShows(showName, signal);
        if (signal.aborted) return;

        setShows(results.map(({ show }) => show));
        setHasSearched(true);
      } catch {
        if (!signal.aborted) {
          setError(SEARCH_ERROR_MESSAGE);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }, SEARCH_DEBOUNCE_DELAY),
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
    setShows([]);
    setCurrentPage(1);
    setSelectedGenre(null);
    setLoading(Boolean(showName));
    setError("");
    setHasSearched(false);

    if (!showName) return;

    const controller = new AbortController();
    searchControllerRef.current = controller;
    debouncedSearch(showName, controller.signal);
  }

  function handleGenreChange(genre: string | null) {
    if (genre === selectedGenre) return;

    setSelectedGenre(genre);
    setCurrentPage(1);
  }

  return {
    query,
    shows,
    currentPage,
    selectedGenre,
    loading,
    error,
    hasSearched,
    handleQueryChange,
    handlePageChange: setCurrentPage,
    handleGenreChange,
  };
}
