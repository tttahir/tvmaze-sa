import type { SearchState } from "./types";

export const initialState: SearchState = {
  query: "",
  searchQuery: "",
  shows: [],
  currentPage: 1,
  selectedGenre: null,
  isLoading: false,
  hasError: false,
  hasSearched: false,
};
