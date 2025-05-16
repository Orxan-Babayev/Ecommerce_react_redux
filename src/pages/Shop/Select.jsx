import styles from "./Shop.module.scss";

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  ariaLabel,
  disabled = false,
}) => {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || null)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <option value="">{placeholder}</option>
      {options.length > 0 ? (
        options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))
      ) : (
        <option disabled>No options available</option>
      )}
    </select>
  );
};

export default Select;
