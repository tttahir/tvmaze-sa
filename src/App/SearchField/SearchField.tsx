import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { ChangeEventHandler } from "react";
import { Input } from "uikit/Input/Input";
import styles from "./SearchField.module.css";

interface Props {
  query: string;
  onQueryChange: ChangeEventHandler<HTMLInputElement>;
}

export function SearchField({ query, onQueryChange }: Props) {
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
          id="show-search"
          type="search"
          name="q"
          placeholder="Введите название шоу…"
          value={query}
          onChange={onQueryChange}
          autoComplete="off"
          spellCheck={false}
          aria-controls="search-results"
        />
      </div>
    </div>
  );
}
