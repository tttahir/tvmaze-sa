import { SearchField } from "App/SearchField/SearchField";
import { SearchResults } from "App/SearchResults/SearchResults";
import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.page}>
      <section className={styles.search} aria-label="TV Shows Explorer">
        <SearchField />
        <SearchResults />
      </section>
    </main>
  );
}

export default App;
