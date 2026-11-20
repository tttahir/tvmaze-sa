import { Button } from "uikit/Button/Button";
import type { PaginationProps } from "./types";
import { usePresenter } from "./logic/usePresenter";
import styles from "./Pagination.module.css";

export function Pagination(props: PaginationProps) {
  const { pages, isFirstPage, isLastPage, handlePreviousPage, handleNextPage } =
    usePresenter(props);

  return (
    <nav className={styles.pagination} aria-label="Страницы результатов поиска">
      <Button
        onClick={handlePreviousPage}
        disabled={isFirstPage}
        aria-controls="search-results"
      >
        Назад
      </Button>
      {pages.map((page) => (
        <Button
          key={page.number}
          onClick={page.handleClick}
          aria-label={page.label}
          aria-current={page.isCurrent ? "page" : undefined}
          aria-controls="search-results"
        >
          {page.number}
        </Button>
      ))}
      <Button
        onClick={handleNextPage}
        disabled={isLastPage}
        aria-controls="search-results"
      >
        Вперёд
      </Button>
    </nav>
  );
}
