import type { SearchState } from "App/types";

export interface SearchResultsProps extends SearchState {
  currentPage: number;
  onPageChange: (page: number) => void;
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
}
