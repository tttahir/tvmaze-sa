import { Button } from "uikit/Button/Button";
import type { GenreFilterProps } from "./types";
import { usePresenter } from "./logic/usePresenter";
import styles from "./GenreFilter.module.css";

export function GenreFilter(props: GenreFilterProps) {
  const { genres, isResetSelected, handleReset } = usePresenter(props);

  return (
    <div className={styles.filter} role="group" aria-label="Фильтр по жанру">
      <Button
        className={styles.chip}
        aria-pressed={isResetSelected}
        aria-controls="search-results"
        onClick={handleReset}
      >
        Все жанры
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre.name}
          className={styles.chip}
          aria-pressed={genre.isSelected}
          aria-controls="search-results"
          onClick={genre.handleClick}
        >
          {genre.name}
        </Button>
      ))}
    </div>
  );
}
