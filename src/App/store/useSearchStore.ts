import { create } from "zustand";
import { initialState } from "./initialState";
import type { SearchStore } from "./types";

export const useSearchStore = create<SearchStore>()((set) => ({
  ...initialState,

  setQuery: (query) => set({ query }),
  startSearch: (searchQuery) =>
    set((state) => ({
      ...initialState,
      query: state.query,
      searchQuery,
      isLoading: Boolean(searchQuery),
    })),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setSelectedGenre: (selectedGenre) =>
    set((state) =>
      selectedGenre === state.selectedGenre
        ? state
        : { selectedGenre, currentPage: 1 },
    ),
  completeSearch: (shows) => set({ shows, hasSearched: true, isLoading: false }),
  failSearch: () => set({ hasError: true, isLoading: false }),
}));
