import type { SearchStore } from "./types";

export const selectQuery = (state: SearchStore) => state.query;
export const selectShows = (state: SearchStore) => state.shows;
export const selectCurrentPage = (state: SearchStore) => state.currentPage;
export const selectSelectedGenre = (state: SearchStore) => state.selectedGenre;
export const selectIsLoading = (state: SearchStore) => state.isLoading;
export const selectHasError = (state: SearchStore) => state.hasError;
export const selectHasSearched = (state: SearchStore) => state.hasSearched;

export const selectSetQuery = (state: SearchStore) => state.setQuery;
export const selectSetCurrentPage = (state: SearchStore) =>
  state.setCurrentPage;
export const selectSetSelectedGenre = (state: SearchStore) =>
  state.setSelectedGenre;
export const selectCompleteSearch = (state: SearchStore) =>
  state.completeSearch;
export const selectFailSearch = (state: SearchStore) => state.failSearch;
