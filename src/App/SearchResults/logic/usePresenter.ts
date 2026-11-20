import {
  selectShows,
  selectCurrentPage,
  selectSelectedGenre,
  selectIsLoading,
  selectHasError,
  selectHasSearched,
  selectSetCurrentPage,
  selectSetSelectedGenre,
} from "App/store/selectors";
import { useSearchStore } from "App/store/useSearchStore";
import type { SearchResultsProps } from "../types";

const SHOWS_PER_PAGE = 3;

export function usePresenter(_props: SearchResultsProps) {
  const shows = useSearchStore(selectShows);
  const currentPage = useSearchStore(selectCurrentPage);
  const selectedGenre = useSearchStore(selectSelectedGenre);
  const isLoading = useSearchStore(selectIsLoading);
  const hasError = useSearchStore(selectHasError);
  const hasSearched = useSearchStore(selectHasSearched);
  const handlePageChange = useSearchStore(selectSetCurrentPage);
  const handleGenreChange = useSearchStore(selectSetSelectedGenre);
  const genres = Array.from(new Set(shows.flatMap((show) => show.genres))).sort(
    (left, right) => left.localeCompare(right),
  );
  const filteredShows =
    selectedGenre === null
      ? shows
      : shows.filter((show) => show.genres.includes(selectedGenre));
  const startIndex = (currentPage - 1) * SHOWS_PER_PAGE;
  let statusMessage = "";

  if (isLoading) {
    statusMessage = "Ищем шоу…";
  } else if (hasSearched) {
    statusMessage =
      shows.length === 0
        ? "Ничего не найдено. Попробуйте другое название."
        : `Найдено шоу: ${filteredShows.length}`;
  }

  return {
    isLoading,
    hasError,
    currentPage,
    selectedGenre,
    handlePageChange,
    handleGenreChange,
    genres,
    statusMessage,
    visibleShows: filteredShows.slice(startIndex, startIndex + SHOWS_PER_PAGE),
    totalPages: Math.ceil(filteredShows.length / SHOWS_PER_PAGE),
  };
}
