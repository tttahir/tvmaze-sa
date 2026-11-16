import type { SearchState } from "./types";

export const initialState: SearchState = {
  query: "",
  shows: [],
  currentPage: 1,
  selectedGenre: null,
  isLoading: false,
  hasError: false,
  hasSearched: false,
};
