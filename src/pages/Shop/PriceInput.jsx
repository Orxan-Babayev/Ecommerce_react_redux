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
  );
};

export default PriceInput;
