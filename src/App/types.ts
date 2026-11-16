import type { Show } from "api/tvMaze/tvMaze.types";

export type AppProps = Record<string, never>;

export interface SearchState {
  shows: Show[];
  loading: boolean;
  error: string;
  hasSearched: boolean;
}
