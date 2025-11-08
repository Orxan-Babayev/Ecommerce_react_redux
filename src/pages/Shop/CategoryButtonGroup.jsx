import styles from "./CategoryButtonGroup.module.css";

function CategoryButtonGroup({
  options,
  value,
  onChange,
  placeholder,
  ariaLabel,
  noOptionsMessage,
  showAll,
}) {
  return (
    <div aria-labelledby={`${ariaLabel}-label`}>
      <span id={`${ariaLabel}-label`} className={styles.label}>
        {ariaLabel}
      </span>
      {options.length > 0 ? (
        <ul className={styles.filterList}>
          {showAll && (
            <li>
              <button
                onClick={() => onChange("")}
                aria-pressed={!value}
                className={`${styles.btn} ${value === "" ? styles.active : ""}`}
              >
                {placeholder}
              </button>
            </li>
          )}
          {options.map((opt) => (
            <li key={opt.id}>
              <button
                onClick={() => onChange(opt.name)}
                aria-pressed={opt.name === value}
                className={`${styles.btn} ${
                  value === opt.name ? styles.active : ""
                }`}
              >
                {opt.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subcategories</p>
      )}
    </div>
  );
}

export default CategoryButtonGroup;
