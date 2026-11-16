import type { SearchResultsProps } from "./types";

const SHOWS_PER_PAGE = 3;

export function usePresenter(props: SearchResultsProps) {
  const { shows, currentPage, selectedGenre, loading, hasSearched } = props;
  const genres = Array.from(new Set(shows.flatMap((show) => show.genres))).sort(
    (left, right) => left.localeCompare(right),
  );
  const filteredShows =
    selectedGenre === null
      ? shows
      : shows.filter((show) => show.genres.includes(selectedGenre));
  const startIndex = (currentPage - 1) * SHOWS_PER_PAGE;
  let statusMessage = "";

  if (loading) {
    statusMessage = "Ищем шоу…";
  } else if (hasSearched) {
    statusMessage =
      shows.length === 0
        ? "Ничего не найдено. Попробуйте другое название."
        : `Найдено шоу: ${filteredShows.length}`;
  }

  return {
    genres,
    statusMessage,
    visibleShows: filteredShows.slice(startIndex, startIndex + SHOWS_PER_PAGE),
    totalPages: Math.ceil(filteredShows.length / SHOWS_PER_PAGE),
  };
}
