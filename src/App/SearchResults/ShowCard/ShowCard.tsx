import { StarIcon } from "@phosphor-icons/react";
import type { ShowCardProps } from "./types";
import { usePresenter } from "./logic/usePresenter";
import styles from "./ShowCard.module.css";

export function ShowCard(props: ShowCardProps) {
  const { image, genres, summary } = usePresenter(props);

  return (
    <article className={styles.card}>
      <div className={styles.poster}>
        {image ? (
          <img
            className={styles.image}
            src={image}
            alt={`Постер шоу «${props.show.name}»`}
            loading="lazy"
            width="210"
            height="295"
          />
        ) : (
          <span className={styles.placeholder}>Нет постера</span>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2 className={styles.title}>
            <a className={styles.link} href={props.show.url}>
              {props.show.name}
            </a>
          </h2>
          {props.show.rating.average !== null && (
            <span
              className={styles.rating}
              aria-label={`Рейтинг: ${props.show.rating.average} из 10`}
            >
              <StarIcon
                className={styles.icon}
                weight="fill"
                aria-hidden="true"
              />
              {props.show.rating.average}
            </span>
          )}
        </div>
        {genres && <p className={styles.genres}>{genres}</p>}
        {summary && <p className={styles.summary}>{summary}</p>}
      </div>
    </article>
  );
}
