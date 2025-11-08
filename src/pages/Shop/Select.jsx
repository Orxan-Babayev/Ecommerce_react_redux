import styles from "./Select.module.css";

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  ariaLabel,
  disabled = false,
  showAll = false,
  variant,
}) => {
  return variant === "select" ? (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || null)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <option value="">{placeholder}</option>
      {options.length > 0 ? (
        options.map((opt) => (
          <option key={opt.id} value={opt.name}>
            {opt.value ? opt.value : opt.name}
          </option>
        ))
      ) : (
        <option disabled>No options available</option>
      )}
    </select>
  ) : (
    <>
      {options.length > 0 && (
        <div aria-labelledby={`${ariaLabel}-label`}>
          <span id={`${ariaLabel}-label`} className={styles.filterLabel}>
            {ariaLabel}
          </span>
          <ul className={styles.filterList}>
            <li>
              {showAll && (
                <button
                  onClick={() => onChange("")}
                  aria-pressed={!value}
                  className={`${styles.btn} ${
                    value === "" ? styles.active : ""
                  }`}
                >
                  {placeholder}
                </button>
              )}
            </li>
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
        </div>
      )}
    </>
  );
};

export default Select;
