import type { PaginationProps } from "../types";

export function usePresenter({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1;

    return {
      number: page,
      isCurrent: page === currentPage,
      label: `Страница ${page}`,
      handleClick: () => onPageChange(page),
    };
  });

  function handlePreviousPage() {
    onPageChange(Math.max(1, currentPage - 1));
  }

  function handleNextPage() {
    onPageChange(Math.min(totalPages, currentPage + 1));
  }

  return {
    pages,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    handlePreviousPage,
    handleNextPage,
  };
}
