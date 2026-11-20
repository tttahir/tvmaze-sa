import { useEffect, useState, useRef } from "react";
import debounce from "lodash/debounce";
import { searchShows } from "./tasks/searchShows";

const SEARCH_DEBOUNCE_DELAY = 350;

export function useSearch() {
  const controllerRef = useRef<AbortController | null>(null);

  const [debouncedSearch] = useState(() =>
    debounce(searchShows, SEARCH_DEBOUNCE_DELAY),
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
    debouncedSearch(value, controller.signal);
  }

  return { search, flushSearch: debouncedSearch.flush };
}
