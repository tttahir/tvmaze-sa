import { SearchField } from "App/SearchField/SearchField";
import { SearchResults } from "App/SearchResults/SearchResults";
import type { AppProps } from "./types";
import { usePresenter } from "./usePresenter";
import styles from "./App.module.css";

function App(props: AppProps) {
  const {
    query,
    shows,
    currentPage,
    selectedGenre,
    loading,
    error,
    hasSearched,
    handleQueryChange,
    handlePageChange,
    handleGenreChange,
  } = usePresenter(props);

  return (
    <main className={styles.page}>
      <section className={styles.search} aria-label="TV Shows Explorer">
        <SearchField query={query} onQueryChange={handleQueryChange} />
        <SearchResults
          shows={shows}
          loading={loading}
          error={error}
          hasSearched={hasSearched}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />
      </section>
    </main>
  );
}

export default App;
