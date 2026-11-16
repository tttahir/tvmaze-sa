import type { Show } from "api/tvMaze/tvMaze.types";

export interface SearchState {
  query: string;
  searchQuery: string;
  shows: Show[];
  currentPage: number;
  selectedGenre: string | null;
  isLoading: boolean;
  hasError: boolean;
  hasSearched: boolean;
}

export interface SearchStore extends SearchState {
  setQuery: (query: string) => void;
  startSearch: (searchQuery: string) => void;
  setCurrentPage: (page: number) => void;
  setSelectedGenre: (genre: string | null) => void;
  completeSearch: (shows: Show[]) => void;
  failSearch: () => void;
}
