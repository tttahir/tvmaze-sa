import type { ShowCardProps } from "./types";

export function usePresenter({ show }: ShowCardProps) {
  const summary = show.summary
    ? new DOMParser().parseFromString(show.summary, "text/html").body
        .textContent
    : null;

  return {
    image: show.image?.medium ?? show.image?.original,
    genres: show.genres.join(" · "),
    summary,
  };
}
