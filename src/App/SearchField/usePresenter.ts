import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { SearchFieldProps } from "./types";
import { useSearch } from "./useSearch";

export function usePresenter(_props: SearchFieldProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { search, flushSearch } = useSearch();

  function updateQuery(value: string) {
    setQuery(value);
    search(value);
  }

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    updateQuery(event.target.value);
  }

  function handleClearQuery() {
    updateQuery("");
    flushSearch();
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
