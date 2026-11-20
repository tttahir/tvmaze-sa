import type { GenreFilterProps } from "../types";

export function usePresenter(props: GenreFilterProps) {
  return {
    genres: props.genres.map((genre) => ({
      name: genre,
      isSelected: genre === props.selectedGenre,
      handleClick: () => props.onGenreChange(genre),
    })),
    isResetSelected: props.selectedGenre === null,
    handleReset: () => props.onGenreChange(null),
  };
}
