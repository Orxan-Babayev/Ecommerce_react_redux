import styles from "./PriceInput.module.css";

const PriceInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  min,
  ariaLabel,
  className,
}) => {
  return (
    <div className={styles.priceInputWrapper}>
      <span className={styles.currency}>$</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur ? (e) => onBlur(e.target.value) : undefined}
        placeholder={placeholder}
        min={min}
        className={className}
        aria-label={ariaLabel}
      />
    </div>
  );
};

export default PriceInput;
