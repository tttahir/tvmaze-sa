import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "uikit/Button/Button";
import { Input } from "uikit/Input/Input";
import type { SearchFieldProps } from "./types";
import { usePresenter } from "./usePresenter";
import styles from "./SearchField.module.css";

export function SearchField(props: SearchFieldProps) {
  const { query, hasQuery, inputRef, handleQueryChange, handleClearQuery } =
    usePresenter(props);

  return (
    <div role="search">
      <label className={styles.label} htmlFor="show-search">
        Поиск шоу
      </label>
      <div className={styles.field}>
        <MagnifyingGlassIcon
          className={styles.icon}
          size={22}
          aria-hidden="true"
        />
        <Input
          ref={inputRef}
          id="show-search"
          type="search"
          name="q"
          placeholder="Введите название шоу…"
          value={query}
          onChange={handleQueryChange}
          autoComplete="off"
          spellCheck={false}
          aria-controls="search-results"
        />
        {hasQuery && (
          <Button
            className={styles.clearButton}
            onClick={handleClearQuery}
            aria-label="Очистить поиск"
          >
            <XIcon size={20} aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
}
