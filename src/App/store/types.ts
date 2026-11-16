import type { Show } from "api/tvMaze/tvMaze.types";

export interface SearchState {
  query: string;
  shows: Show[];
  currentPage: number;
  selectedGenre: string | null;
  isLoading: boolean;
  hasError: boolean;
  hasSearched: boolean;
}

export interface SearchStore extends SearchState {
  setQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setSelectedGenre: (genre: string | null) => void;
  completeSearch: (shows: Show[]) => void;
  failSearch: () => void;
}
