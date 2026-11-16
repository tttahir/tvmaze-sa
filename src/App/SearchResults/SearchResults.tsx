import { ShowCard } from "App/SearchResults/ShowCard/ShowCard";
import { Pagination } from "./Pagination/Pagination";
import { GenreFilter } from "./GenreFilter/GenreFilter";
import type { SearchResultsProps } from "./types";
import { usePresenter } from "./usePresenter";
import styles from "./SearchResults.module.css";

export function SearchResults(props: SearchResultsProps) {
  const { genres, visibleShows, totalPages, statusMessage } =
    usePresenter(props);

  return (
    <div
      id="search-results"
      className={styles.results}
      aria-busy={props.loading}
    >
      {genres.length > 0 && (
        <GenreFilter
          genres={genres}
          selectedGenre={props.selectedGenre}
          onGenreChange={props.onGenreChange}
        />
      )}
      <p className={styles.message} role="status">
        {statusMessage}
      </p>
      {props.error && (
        <p className={styles.error} role="alert">
          {props.error}
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
          currentPage={props.currentPage}
          onPageChange={props.onPageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
