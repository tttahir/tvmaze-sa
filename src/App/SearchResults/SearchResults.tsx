import { ShowCard } from "App/SearchResults/ShowCard/ShowCard";
import { Pagination } from "./Pagination/Pagination";
import { GenreFilter } from "./GenreFilter/GenreFilter";
import type { SearchResultsProps } from "./types";
import { usePresenter } from "./logic/usePresenter";
import styles from "./SearchResults.module.css";

export function SearchResults(props: SearchResultsProps) {
  const {
    isLoading,
    hasError,
    currentPage,
    selectedGenre,
    handlePageChange,
    handleGenreChange,
    genres,
    visibleShows,
    totalPages,
    statusMessage,
  } = usePresenter(props);

  return (
    <div id="search-results" className={styles.results} aria-busy={isLoading}>
      {genres.length > 0 && (
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />
      )}
      {statusMessage && (
        <p className={styles.message} role="status">
          {statusMessage}
        </p>
      )}
      {hasError && (
        <p className={styles.error} role="alert">
          Не удалось загрузить шоу. Проверьте соединение и повторите поиск.
        </p>
      )}
      {visibleShows.length > 0 && (
        <section className={styles.list} aria-label="Найденные шоу">
          {visibleShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </section>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
