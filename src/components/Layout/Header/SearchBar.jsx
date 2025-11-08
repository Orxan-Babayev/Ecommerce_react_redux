import React, { useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import styles from "./header.module.css";

const SearchBar = React.memo(function SearchBar({
  query,
  setQuery,
  onSearch,
  onReset,
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") onSearch();
    },
    [onSearch]
  );

  return (
    <div className={styles.searchBar}>
      <CiSearch
        className={styles.icon}
        onClick={onSearch}
        aria-label="Search products"
        title="Search"
        role="button"
      />
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search products..."
        aria-label="Search products..."
      />
      {query && (
        <GrPowerReset
          className={styles.resetIcon}
          onClick={onReset}
          aria-label="Reset Search"
          disabled={!query.trim()}
          title="Reset"
          role="button"
        />
      )}
    </div>
  );
});

export default SearchBar;
