export interface GenreFilterProps {
  genres: string[];
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
}
