import styles from "./DropdownSelect.module.css";

function DropdownSelect({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
  noOptionsMessage,
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value) || null}
      aria-label={ariaLabel}
      className={styles.dropdownSelect}
    >
      <option value="">{placeholder}</option>
      {options.length > 0 ? (
        options.map((opt) => (
          <option key={opt.id} value={opt.name}>
            {opt.value ? opt.value : opt.name}
          </option>
        ))
      ) : (
        <p>{noOptionsMessage}</p>
      )}
    </select>
  );
}

export default DropdownSelect;
